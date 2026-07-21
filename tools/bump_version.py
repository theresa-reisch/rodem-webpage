"""
Bump the ?v= cache-busting version on the CSS and JS links in every page.

    python3 tools/bump_version.py

Run this after editing content.js, render.js or style.css, then commit and
push. Browsers cache those files for 10 minutes; changing the version number
makes them fetch the new copies immediately instead of waiting it out.
"""

import re
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
PAGES = sorted(p.name for p in pathlib.Path(__file__).resolve().parent.parent.glob("*.html"))
# Only rewrite real href="..." / src="..." attributes — never the file names
# mentioned in the HTML comments that explain where content comes from.
ASSET = re.compile(
    r'((?:href|src)="assets/(?:css/style\.css|js/(?:content|render)\.js))(\?v=(\d+))?"')


def main():
    # Find the highest version currently in use, then go one above it.
    current = 0
    for name in PAGES:
        for m in ASSET.finditer((ROOT / name).read_text()):
            if m.group(3):
                current = max(current, int(m.group(3)))
    new = current + 1

    for name in PAGES:
        path = ROOT / name
        text = path.read_text()
        updated, n = ASSET.subn(lambda m: '%s?v=%d"' % (m.group(1), new), text)
        path.write_text(updated)
        print("%-20s %d links -> ?v=%d" % (name, n, new))

    print("\nNow run:  git add -A && git commit -m 'Update site' && git push")


if __name__ == "__main__":
    main()
