#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
每日增量推送：把一个球员站的新闻文件推送到 GitHub Pages。
配合该球员的 scripts/update_news.py 使用：
  1. cd players/<slug> && python3 scripts/update_news.py   # 抓取最新新闻（更新本地文件）
  2. python3 scripts/sync_news.py <slug>                   # 只把新闻两个文件增量推到线上

用法：
  GH_TOKEN=ghp_xxx python3 scripts/sync_news.py stephen-curry
"""
import base64, json, os, sys, urllib.request, urllib.error
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TOKEN = os.environ.get("GH_TOKEN")
OWNER = "mango23"
REPO = "nba-legends"
BRANCH = "main"
API = "https://api.github.com"

if len(sys.argv) < 2:
    print("用法: python3 scripts/sync_news.py <player-slug>", file=sys.stderr)
    sys.exit(1)
SLUG = sys.argv[1]
FILES = [f"players/{SLUG}/data/news.json", f"players/{SLUG}/js/news-data.js"]

if not TOKEN:
    print("[error] 请先设置环境变量 GH_TOKEN=<github personal access token>", file=sys.stderr)
    sys.exit(1)


def req(method, path, body=None):
    r = urllib.request.Request(
        API + path, data=json.dumps(body).encode("utf-8") if body is not None else None,
        method=method,
        headers={
            "Authorization": f"Bearer {TOKEN}",
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
            "User-Agent": "nba-legends-sync/1.0",
        },
    )
    try:
        with urllib.request.urlopen(r, timeout=120) as resp:
            return resp.status, json.loads(resp.read())
    except urllib.error.HTTPError as e:
        try:
            err = json.loads(e.read())
        except Exception:
            err = {}
        return e.code, err


def push(rel):
    p = ROOT / rel
    if not p.exists():
        print(f"[skip] {rel} 不存在")
        return
    content_b64 = base64.b64encode(p.read_bytes()).decode("ascii")
    code, info = req("GET", f"/repos/{OWNER}/{REPO}/contents/{rel}?ref={BRANCH}")
    sha = info.get("sha") if code == 200 else None
    body = {"message": f"chore(news): daily update {SLUG}", "content": content_b64, "branch": BRANCH}
    if sha:
        body["sha"] = sha
    code2, res = req("PUT", f"/repos/{OWNER}/{REPO}/contents/{rel}", body)
    if code2 in (200, 201):
        print(f"[ok] {rel} 推送到 {OWNER}/{REPO}@main")
    else:
        print(f"[FAIL {code2}] {rel}: {res}")


def main():
    for rel in FILES:
        push(rel)
    print(f"\n下次刷新即可在 https://{OWNER}.github.io/{REPO}/players/{SLUG}/ 看到新新闻。")


if __name__ == "__main__":
    main()
