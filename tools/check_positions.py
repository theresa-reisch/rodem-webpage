#!/usr/bin/env python3
"""Refuse to publish a PhD position that does not exist.

Run on every pull request by .github/workflows/checks.yml. render.js applies
the same rule at display time; this is the second lock, so that a well-meaning
edit to the renderer cannot quietly start advertising unfunded positions.

A page that collects applications for a position with no money behind it costs
somebody a week of their life. Please leave both checks in place.
"""
import datetime, pathlib, sys

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import _content                                                    # noqa: E402

TODAY = datetime.date.today().isoformat()
LEVELS = {"Master", "PhD", "Postdoc"}
STATUSES = {"open", "filled", "draft"}
REQUIRED = ("id", "level", "status", "title", "body")


def main():
    positions = _content.load(["POSITIONS"]).get("POSITIONS", [])
    problems, ids = [], set()

    for i, p in enumerate(positions):
        where = p.get("id") or "entry %d" % (i + 1)

        for field in REQUIRED:
            if not str(p.get(field, "")).strip():
                problems.append("%s: missing required field '%s'" % (where, field))
        if p.get("level") not in LEVELS:
            problems.append("%s: level must be one of %s" % (where, sorted(LEVELS)))
        if p.get("status") not in STATUSES:
            problems.append("%s: status must be one of %s" % (where, sorted(STATUSES)))
        if p.get("id") in ids:
            problems.append("%s: duplicate id" % where)
        ids.add(p.get("id"))

        if p.get("status") == "open":
            if p.get("level") in ("PhD", "Postdoc"):
                if not str(p.get("funding", "")).strip():
                    problems.append("%s: an open %s position needs a real funding source, not a "
                                    "hope. Set status to \"draft\" until the money is confirmed."
                                    % (where, p["level"]))
                if not str(p.get("deadline", "")).strip():
                    problems.append("%s: an open %s position needs a deadline."
                                    % (where, p["level"]))
                elif p["deadline"] < TODAY:
                    problems.append("%s: the deadline (%s) has passed — set status to \"filled\"."
                                    % (where, p["deadline"]))
            if not str(p.get("supervisor", "")).strip():
                problems.append("%s: an open position needs a named supervisor to write to." % where)
            if "TODO" in (p.get("title", "") + p.get("body", "")):
                problems.append("%s: still contains TODO but is marked open." % where)

    if problems:
        print("POSITIONS check failed:\n")
        for p in problems:
            print("  ✗ " + p)
        print("\nSee the comment above POSITIONS in assets/js/content.js.")
        return 1

    live = sum(1 for p in positions if p.get("status") == "open")
    print("POSITIONS check passed — %d entries, %d live." % (len(positions), live))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
