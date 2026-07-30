# Golling Group website

A plain static website — HTML, CSS and a little JavaScript. There is no build
step, no framework and nothing to install. Open `index.html` in a browser and it
works.

## What changed in this branch

The site was extended in July 2026: the group is now branded **RODEM**, research
is organised around five themes that spell **FORGE**, and there are new Vision,
Research, Join us and Outreach pages, plus an automated watcher that drafts news
items for new papers.

**Read [`IMPLEMENTATION.md`](IMPLEMENTATION.md) first** — it explains what moved,
what is new, and the handful of rules worth not breaking (the order of the five
letters, and the funding gate on PhD positions).

Two quick orientation notes for anyone editing:

* The **menu** is built from `NAV` in `assets/js/content.js`. Adding a tab is one
  line there, not an edit to every page.
* Publication **categories** live in `tools/update.py`, not `content.js`. The
  daily job rewrites `content.js` from that file, so an edit made only in
  `content.js` disappears within 24 hours.

## Files

```
index.html            Home: hero, three doors, research teaser, team, news, contact
vision.html           The Learning Collider — the group's argument, events, funding
research.html         FORGE: the five things we build, letter by letter
output.html           Publications (by letter) and talks, on one page
join.html             Master's projects, PhD openings, fellowship routes
outreach.html         "Teaching machines to be surprised" — for a general reader
news.html             Full news list, including method spotlights
cv.html               The PI's CV (not in the nav; linked from his profile card)
publications.html     Redirect to output.html (kept so old links still work)
talks.html            Redirect to output.html#talks
assets/css/style.css  All styling (colours are set at the top)
assets/js/content.js  <- EDIT THIS: nav, team, news, talks, positions, events, …
assets/js/render.js   Turns content.js into the pages. No need to touch.
tools/update.py       Refresh publications + metrics from INSPIRE (one command)
tools/watch.py        Notice new papers and draft the entries for approval
tools/freshness.py    Weekly audit of what has gone stale
tools/check_positions.py  Refuses to advertise a position that does not exist
tools/bump_version.py Force browsers to pick up changed CSS/JS
images/team/          Member photos go here
images/logo/          The mark, traced from a real ATLAS event
images/marks/         Small section illustrations
images/hero/          Event displays (see CREDIT.md)
state/seen.json       What the watcher has already reported. Do not hand-edit.
```

## How to edit the site

**The menu**
→ edit `NAV` in `assets/js/content.js`. One line per tab; every page renders it.

**Team members, news, talks, positions, events, funding, the CV, contact details**
→ edit `assets/js/content.js`. Everything is commented; copy an existing entry
and change the values. Keep the commas and quotes as they are.

**The headline and the three doors**
→ edit `index.html` directly. They live in the HTML, not `content.js`, so that
search engines index them.

**The five research themes**
→ edit `RESEARCH` in `content.js` for the words on `research.html`, and
`tools/update.py` for which papers land under which letter. Categories are
*not* edited in `content.js`: the daily job rewrites that file from
`update.py`, so an edit made only there disappears within 24 hours.

**Master's projects and PhD openings**
→ edit `POSITIONS` in `content.js`. A PhD entry needs a real funding source and
a future deadline or it will not be displayed, and CI will fail the build. That
is deliberate — see `IMPLEMENTATION.md`.

**Colours and fonts**
→ edit the `:root` block at the top of `assets/css/style.css`. Change
`--accent` to change the highlight colour across the whole site. A dark-mode
palette is right below it and applies automatically for visitors whose system
is set to dark.

### Adding a photo

1. Put a square image (about 600×600 px) in `images/team/`.
2. In `content.js`, set that person's `photo` field:
   `photo: "images/team/tobias-golling.jpg",`

Members without a photo show a circle with their initials, so the page always
looks complete.

## Previewing locally

Just double-click `index.html` — it opens in your browser and everything works,
including the team and publication lists.

If you prefer a local server:

```bash
python3 -m http.server 8000     # then open http://localhost:8000
```

## Making changes show up immediately

GitHub tells browsers to cache the CSS and JS for 10 minutes, so after a push
you can still see the old page. The asset links carry a version tag
(`style.css?v=16`) to defeat this. Bump it whenever you change `content.js`,
`render.js` or `style.css`:

```bash
python3 tools/bump_version.py
git add -A && git commit -m "Update site" && git push
```

(`tools/update.py` bumps the version for you, so you only need this when you
have edited content by hand.)

Visitors then get the new files straight away. If you forget, the change still
appears — just up to 10 minutes later, or after a hard refresh
(**Ctrl + Shift + R**).

## Publishing on GitHub Pages

The site is already published. These steps are here in case it ever needs to
be set up again from scratch.

1. Create a repository on GitHub — naming it `<username>.github.io` gives the
   cleanest URL.
2. Push these files to it:

   ```bash
   cd /home/theresa/webpage
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<org-or-user>/<repo>.git
   git push -u origin main
   ```

3. On GitHub: **Settings → Pages → Source: Deploy from a branch**, choose
   `main` and folder `/ (root)`. Save.
4. Wait a minute, then visit the URL GitHub shows you.

Every later `git push` updates the live site automatically.

The `.nojekyll` file tells GitHub Pages to publish the files as-is rather than
running them through Jekyll. Leave it in place.

## Publications and metrics

Both come from INSPIRE-HEP (author `T.Golling.1`), not hand-typed. To refresh
everything — the paper list, the citation counts, the h-index figures and the
cache-busting version — run one command:

```bash
python3 tools/update.py
```

It rewrites the `PUBLICATIONS` and `METRICS` blocks in `assets/js/content.js`
in place and bumps every page's asset version. Check it with `git diff`, then:

```bash
git add -A && git commit -m "Refresh publications" && git push
```

### Automatic updates

`.github/workflows/update-publications.yml` runs that same command on GitHub's
servers once a day at 06:00 UTC, and commits only if INSPIRE actually returned
something new. Your machine does not need to be on, and the live site updates itself.

**One-time setup, needed before it can push:**
GitHub → the repo → **Settings → Actions → General → Workflow permissions** →
select **Read and write permissions** → Save.

You can watch it, or trigger it by hand, from the repo's **Actions** tab.

To change how often it runs, edit the `cron:` line in that file. Weekly and
hourly alternatives are written in a comment right above it.

Two things to know about GitHub's scheduler: runs can be delayed by a few
minutes when GitHub is busy, and **scheduled workflows are switched off
automatically after 60 days without activity in the repository**. If updates
ever stop, check the Actions tab — re-enabling is one click.

**The publications page** groups papers by research theme with filter buttons,
marks papers with 50+ citations with a ★, and links arXiv / DOI / INSPIRE /
BibTeX for each. Group members' names are bolded automatically by matching
against the `TEAM` list, so there is a single source of truth for who is in
the group.

**The metrics row** shows two groupings: papers with 10 or fewer authors (the
group's own work) and all publications including ATLAS Collaboration papers.

**To add a paper**, add a distinctive fragment of its title to the `SELECT`
list in `tools/update.py` with its category, then re-run. For an ATLAS paper,
add its INSPIRE record id to `ATLAS_IDS`. You can also hand-write an entry
directly in `content.js` — but it will be overwritten next time you run the
updater, so prefer `SELECT`.

## Still to do

- [ ] Add member photos — `images/team/` is empty, so everyone shows initials
- [ ] Rewrite the four research cards in `index.html` in the group's own words
- [ ] Check the 40 selected papers and the theme each one sits in
- [ ] Blurbs for the alumni who have none
- [ ] Decide whether the group name change means renaming the repo / GitHub org
