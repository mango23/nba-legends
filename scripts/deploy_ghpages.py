#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
一键部署：将整个工作区（NBA Legends 聚合站）推送到 GitHub Pages。
- 采用 Git Blobs + Tree + Commit API（突破 Contents API 1MB 单文件限制）
- 自动创建仓库（首次），启用 Pages
- 结构：根目录 hub + players/<slug>/ 各球员站 + shared/ 共享资源

用法：
  GH_TOKEN=ghp_xxx python3 scripts/deploy_ghpages.py
"""
import base64, json, os, sys, time, urllib.request, urllib.error
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TOKEN = os.environ.get("GH_TOKEN")
OWNER = "mango23"
REPO = "nba-legends"
BRANCH = "main"
API = "https://api.github.com"

SKIP_DIRS = {".git", ".workbuddy", "generated-videos", "node_modules", "__pycache__"}
SKIP_FILES = {".DS_Store"}

if not TOKEN:
    print("[error] 请先设置环境变量 GH_TOKEN=<github personal access token>", file=sys.stderr)
    sys.exit(1)


def req(method, path, body=None, _retries=3):
    url = API + path
    data = json.dumps(body).encode("utf-8") if body is not None else None
    last_err = None
    for attempt in range(1, _retries + 1):
        r = urllib.request.Request(
            url, data=data, method=method,
            headers={
                "Authorization": f"Bearer {TOKEN}",
                "Accept": "application/vnd.github+json",
                "X-GitHub-Api-Version": "2022-11-28",
                "User-Agent": "nba-legends-deploy/1.0",
            },
        )
        try:
            with urllib.request.urlopen(r, timeout=180) as resp:
                return resp.status, json.loads(resp.read())
        except urllib.error.HTTPError as e:
            try:
                err = json.loads(e.read())
            except Exception:
                err = {}
            return e.code, err
        except (urllib.error.URLError, TimeoutError, OSError) as e:
            last_err = e
            if attempt < _retries:
                wait = 2 ** attempt
                print(f"     [retry {attempt}/{_retries-1}] 网络异常：{e}; {wait}s 后重试")
                time.sleep(wait)
                continue
            raise
    raise last_err  # pragma: no cover


def ensure_repo():
    code, res = req("POST", "/user/repos",
                    {"name": REPO,
                     "description": "NBA Legends · 传奇球员专属主页聚合站（每位球员一个文件夹）",
                     "private": False,
                     "auto_init": True})
    if code == 201:
        print(f"[repo] created {OWNER}/{REPO}")
    elif code == 422 and "name already exists" in (res.get("message", "") + str(res.get("errors", ""))):
        print(f"[repo] {OWNER}/{REPO} 已存在，复用")
    elif code != 201 and code != 422:
        print(f"[repo] status {code}: {res}")
        sys.exit(1)
    time.sleep(2)  # 等 auto_init 的 main 分支就绪


def get_head_sha():
    code, res = req("GET", f"/repos/{OWNER}/{REPO}/git/ref/heads/{BRANCH}")
    if code == 200:
        return res["object"]["sha"]
    return None


def create_blob(content_bytes):
    b64 = base64.b64encode(content_bytes).decode("ascii")
    code, res = req("POST", f"/repos/{OWNER}/{REPO}/git/blobs",
                    {"content": b64, "encoding": "base64"})
    if code == 201 and "sha" in res:
        return res["sha"]
    print(f"[blob FAIL {code}] {res}")
    return None


def create_tree(entries):
    code, res = req("POST", f"/repos/{OWNER}/{REPO}/git/trees", {"tree": entries})
    if code == 201 and "sha" in res:
        return res["sha"]
    print(f"[tree FAIL {code}] {res}")
    return None


def create_commit(message, tree_sha, parent_sha):
    body = {"message": message, "tree": tree_sha}
    if parent_sha:
        body["parents"] = [parent_sha]
    code, res = req("POST", f"/repos/{OWNER}/{REPO}/git/commits", body)
    if code == 201 and "sha" in res:
        return res["sha"]
    print(f"[commit FAIL {code}] {res}")
    return None


def update_ref(commit_sha):
    code, res = req("PATCH", f"/repos/{OWNER}/{REPO}/git/refs/heads/{BRANCH}",
                    {"sha": commit_sha, "force": True})
    if code in (200, 201):
        return True
    print(f"[ref FAIL {code}] {res}")
    return False


def enable_pages():
    code, res = req("POST", f"/repos/{OWNER}/{REPO}/pages",
                    {"source": {"branch": BRANCH, "path": "/"},
                     "build_type": "legacy"})
    if code in (201, 204):
        print("[pages] 启用成功")
    elif code == 409 or (isinstance(res, dict) and "already enabled" in str(res).lower()):
        print("[pages] 已启用过，跳过")
    else:
        print(f"[pages] status {code}: {res}")


def main():
    print("[1/4] 确保仓库存在 ...")
    ensure_repo()

    print("[2/4] 收集文件并创建 blobs ...")
    files = []
    for root, dirs, fns in os.walk(ROOT):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS and not d.startswith(".")]
        for fn in fns:
            if fn in SKIP_FILES or fn.startswith(".") or fn.endswith(".pyc"):
                continue
            full = Path(root) / fn
            rel = str(full.relative_to(ROOT)).replace(os.sep, "/")
            files.append(rel)
    files.sort()
    if not files:
        print("[warn] 没有可上传的文件")
        return
    print(f"     共 {len(files)} 个文件")

    entries = []
    for i, rel in enumerate(files, 1):
        p = ROOT / rel
        sha = create_blob(p.read_bytes())
        if not sha:
            print(f"[skip] {rel}（blob 失败）")
            continue
        entries.append({"path": rel, "mode": "100644", "type": "blob", "sha": sha})
        print(f"[{i}/{len(files)}] blob {rel}")

    print("[3/4] 组装 tree + commit ...")
    parent = get_head_sha()
    tree_sha = create_tree(entries)
    if not tree_sha:
        sys.exit(1)
    commit_sha = create_commit(f"deploy: NBA Legends site ({len(entries)} files)", tree_sha, parent)
    if not commit_sha or not update_ref(commit_sha):
        print("[error] 提交或更新引用失败")
        sys.exit(1)
    print("     commit 已创建并推送")

    print("[4/4] 启用 GitHub Pages ...")
    enable_pages()
    print(f"\n✅ 部署完成：https://{OWNER}.github.io/{REPO}/")


if __name__ == "__main__":
    main()
