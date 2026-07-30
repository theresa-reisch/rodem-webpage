#!/usr/bin/env python3
"""Audit the site for things that have quietly gone stale.

Run weekly by .github/workflows/freshness.yml. It writes ONE issue —
"Website freshness: N items need attention" — and edits that same issue every
week rather than opening a new one. A nagging system that is itself noisy gets
muted within a month.

    python3 tools/freshness.py            # print the report
    python3 tools/freshness.py --issue    # also create/update the GitHub issue
"""
import argparse, datetime, json, os, pathlib, sys, urllib.request

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import _content                                                    # noqa: E402

TODAY = datetime.date.today()
TITLE = "Website freshness"

NEWS_MAX_DAYS = 60      # a site with no news for two months reads as abandoned
TOPIC_MAX_DAYS = 274    # nine months
PR_NUDGE_DAYS = 7
PR_ESCALATE_DAYS = 14


def _age_days(value):
    for fmt in ("%Y-%m-%d", "%B %Y", "%b %Y", "%Y"):
        try:
            d = datetime.datetime.strptime(str(value).strip(), fmt).date()
            return (TODAY - d).days
        except ValueError:
            continue
    return None


def audit():
    d = _content.load(["NEWS", "POSITIONS", "TEAM", "PUBLICATIONS"])
    items = []

    news_ages = [a for a in (_age_days(n.get("date")) for n in d.get("NEWS", [])) if a is not None]
    if not news_ages:
        items.append("No news item carries a parsable date.")
    elif min(news_ages) > NEWS_MAX_DAYS:
        items.append("No news published for %d days — the site is starting to look abandoned."
                     % min(news_ages))

    for p in d.get("POSITIONS", []):
        where = "%s (%s)" % (p.get("title", "?")[:60], p.get("id", "no id"))
        if p.get("status") == "draft":
            items.append("Draft position still has TODOs and is invisible to applicants: %s" % where)
        if p.get("level") == "PhD" and p.get("status") == "open":
            if not p.get("funding"):
                items.append("PhD position published with no funding source: %s" % where)
            if p.get("deadline") and p["deadline"] < TODAY.isoformat():
                items.append("PhD deadline has passed — flip status to \"filled\": %s" % where)
        age = _age_days(p.get("reviewed"))
        if p.get("status") == "open" and age is not None and age > TOPIC_MAX_DAYS:
            items.append("Position not reviewed for %d days, is it still true? %s" % (age, where))

    for group in d.get("TEAM", []):
        for m in group.get("members", []):
            if group.get("group", "").lower().startswith("alumni"):
                continue
            if not m.get("photo"):
                items.append("No photo: %s" % m.get("name"))
            if not (m.get("blurb") or "").strip():
                items.append("No blurb: %s" % m.get("name"))

    items += _stale_pull_requests()
    return items


def _api(path, method="GET", payload=None):
    token, repo = os.environ.get("GITHUB_TOKEN"), os.environ.get("GITHUB_REPOSITORY")
    if not (token and repo):
        return None
    req = urllib.request.Request(
        "https://api.github.com/repos/%s%s" % (repo, path), method=method,
        data=json.dumps(payload).encode() if payload else None,
        headers={"Authorization": "Bearer " + token, "Accept": "application/vnd.github+json",
                 "Content-Type": "application/json", "User-Agent": "rodem-freshness"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read() or "null")


def _stale_pull_requests():
    try:
        prs = _api("/pulls?state=open&per_page=50") or []
    except Exception:                                              # noqa: BLE001
        return []
    out = []
    for pr in prs:
        if not any(l["name"] == "needs-author-review" for l in pr.get("labels", [])):
            continue
        age = (TODAY - datetime.date.fromisoformat(pr["created_at"][:10])).days
        if age >= PR_ESCALATE_DAYS:
            out.append("Pull request #%d has been waiting %d days — reassign it to the PI: %s"
                       % (pr["number"], age, pr["title"][:60]))
        elif age >= PR_NUDGE_DAYS:
            out.append("Pull request #%d is %d days old and still unreviewed: %s"
                       % (pr["number"], age, pr["title"][:60]))
    return out


def sync_issue(items):
    body = ("Checked automatically every Monday by `tools/freshness.py`. "
            "This issue is edited in place — it is never reopened as a new one.\n\n")
    body += ("\n".join("- [ ] %s" % i for i in items) if items
             else "Nothing stale. Close this issue if you like; it will come back when "
                  "something needs attention.\n")
    body += "\n\n_Last checked %s._\n" % TODAY.isoformat()
    title = "%s: %d item%s need attention" % (TITLE, len(items), "" if len(items) == 1 else "s")

    existing = _api("/issues?state=open&per_page=50") or []
    mine = next((i for i in existing if i["title"].startswith(TITLE) and "pull_request" not in i), None)
    if mine:
        _api("/issues/%d" % mine["number"], "PATCH", {"title": title, "body": body})
        print("updated issue #%d" % mine["number"])
    elif items:
        _api("/issues", "POST", {"title": title, "body": body, "labels": ["housekeeping"]})
        print("opened a new freshness issue")
    else:
        print("nothing stale, and no open issue to update")


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--issue", action="store_true", help="create or update the GitHub issue")
    a = ap.parse_args()
    found = audit()
    print("\n".join("- " + i for i in found) if found else "nothing stale")
    if a.issue:
        sync_issue(found)
