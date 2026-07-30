"""Read the arrays out of assets/js/content.js as ordinary Python data.

content.js is JavaScript, not JSON, so the honest way to read it is to let
node evaluate it and print JSON back. node is available anywhere this repo is
already being worked on, and in GitHub Actions.
"""
import json, pathlib, subprocess, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
CONTENT = ROOT / "assets" / "js" / "content.js"

NAMES = ["SITE", "NAV", "TEAM", "NEWS", "TALKS", "TALK_KINDS", "PUB_CATEGORIES",
         "PUBLICATIONS", "METRICS", "RESEARCH", "POSITIONS", "EVENTS", "FUNDING"]


def load(names=None):
    """Return {name: value} for the arrays that exist in content.js."""
    names = names or NAMES
    picker = ", ".join('%s: (typeof %s === "undefined" ? null : %s)' % (n, n, n) for n in names)
    script = (
        "const fs=require('fs');"
        "const src=fs.readFileSync(%r,'utf8');"
        "const out=new Function(src+';return {%s};')();"
        "process.stdout.write(JSON.stringify(out));" % (str(CONTENT), picker)
    )
    try:
        raw = subprocess.run(["node", "-e", script], check=True,
                             capture_output=True, text=True).stdout
    except FileNotFoundError:
        sys.exit("node is required to read content.js (install Node, or run this in CI)")
    except subprocess.CalledProcessError as exc:
        sys.exit("content.js did not evaluate — it is probably missing a comma:\n" + exc.stderr)
    return {k: v for k, v in json.loads(raw).items() if v is not None}


def text():
    return CONTENT.read_text(encoding="utf-8")


def write(new_text):
    CONTENT.write_text(new_text, encoding="utf-8")
