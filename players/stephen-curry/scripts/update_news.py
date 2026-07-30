#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
斯蒂芬·库里主题站 · 新闻每日自动更新脚本
从公开 RSS 源抓取最新库里/勇士新闻，重写：
  - data/news.json      （数据存档）
  - js/news-data.js     （网站直接加载）
用法: python3 scripts/update_news.py
仅使用标准库，无需安装依赖。
"""
import json, re, html, sys, urllib.request, xml.etree.ElementTree as ET
from datetime import datetime, timezone, timedelta
from email.utils import parsedate_to_datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
NEWS_JSON = ROOT / "data" / "news.json"
NEWS_JS = ROOT / "js" / "news-data.js"
MAX_ITEMS = 12
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"

FEEDS = [
    ("Google 新闻", "https://news.google.com/rss/search?q=%E6%96%AF%E8%92%82%E8%8A%AC%C2%B7%E5%BA%93%E9%87%8C&hl=zh-CN&gl=CN&ceid=CN:zh-Hans"),
    ("Google News", "https://news.google.com/rss/search?q=Stephen+Curry&hl=en-US&gl=US&ceid=US:en"),
    ("ESPN NBA", "https://www.espn.com/espn/rss/nba/news"),
]

KEYWORDS = ["stephen curry", "斯蒂芬·库里", "库里", "warriors", "勇士", "golden state", "splash brothers"]

def fetch(url, timeout=30):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()

def clean(text, limit=220):
    text = re.sub(r"<[^>]+>", " ", text or "")
    text = html.unescape(re.sub(r"\s+", " ", text)).strip()
    return text[:limit] + ("…" if len(text) > limit else "")

def guess_tag(title):
    for tag, words in [
        ("签约", ["签约", "加盟", "sign", "contract", "合同", "trade", "交易"]),
        ("伤病", ["伤", "injur", "缺席", "缺阵", " sidelined", " out vs", " out against"]),
        ("里程碑", ["纪录", "里程碑", "record", "milestone", "超越", "突破", "第1", "第一"]),
        ("季后赛", ["季后赛", "playoff", "总决赛", "finals"]),
        ("全明星", ["全明星", "all-star", "all star"]),
        ("数据", ["分", "篮板", "助攻", "points", "triple-double", "三双"]),
    ]:
        if any(w.lower() in title.lower() for w in words):
            return tag
    return "动态"

def parse_feed(name, url):
    items = []
    try:
        raw = fetch(url)
        root = ET.fromstring(raw)
        for it in root.iter("item"):
            title = clean(it.findtext("title", ""), 160)
            link = (it.findtext("link") or "").strip()
            desc = clean(it.findtext("description", ""))
            pub = it.findtext("pubDate") or ""
            if not title or not any(k in title.lower() for k in KEYWORDS):
                continue
            try:
                dt = parsedate_to_datetime(pub).astimezone(timezone(timedelta(hours=8)))
                date = dt.strftime("%Y-%m-%d")
                ts = dt.timestamp()
            except Exception:
                date, ts = datetime.now().strftime("%Y-%m-%d"), 0
            items.append({"date": date, "tag": guess_tag(title + desc), "title": title,
                          "desc": desc or title, "url": link, "_ts": ts, "_src": name})
    except Exception as e:
        print(f"[warn] 源 {name} 抓取失败: {e}", file=sys.stderr)
    return items

def main():
    existing = {"items": []}
    if NEWS_JSON.exists():
        try:
            existing = json.loads(NEWS_JSON.read_text("utf-8"))
        except Exception:
            pass

    pool = []
    for name, url in FEEDS:
        pool += parse_feed(name, url)

    seen = set()
    merged = []
    # 新抓取的优先，其次旧的存档（保留人工校准内容）
    for n in sorted(pool, key=lambda x: x.get("_ts", 0), reverse=True) + existing.get("items", []):
        key = re.sub(r"\W+", "", n["title"])[:40]
        if key in seen:
            continue
        seen.add(key)
        n.pop("_ts", None); n.pop("_src", None)
        merged.append(n)
        if len(merged) >= MAX_ITEMS:
            break

    now = datetime.now().strftime("%Y-%m-%d %H:%M")
    data = {"updatedAt": now, "source": "每日自动更新 · Google News / ESPN RSS / NBA.com + 人工校准", "items": merged}

    NEWS_JSON.write_text(json.dumps(data, ensure_ascii=False, indent=2), "utf-8")
    NEWS_JS.write_text(
        "/* 新闻数据（由 scripts/update_news.py 每日自动生成，请勿手改） */\n"
        "const NEWS_DATA = " + json.dumps(data, ensure_ascii=False, indent=2) + ";\n",
        "utf-8")
    print(f"[ok] {now} 更新完成，共 {len(merged)} 条新闻（新增抓取 {len(pool)} 条）")

if __name__ == "__main__":
    main()
