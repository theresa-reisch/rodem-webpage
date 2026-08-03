# What changed, and why

This branch turns the draft site into the one described in *Title page — parts 1
to 3*. It is deliberately additive: the architecture you built (static HTML +
`content.js` + `render.js` + a daily INSPIRE refresh) is untouched, because it
was the right architecture. Almost everything below is either a new page, a new
array in `content.js`, or a new renderer that follows the pattern of the
existing ones.

Nothing here needs a build step, a framework, or an install. It is still
`git push` and it is live.

---

## The short version

| | |
|---|---|
| **Name** | The group is **RODEM**; "Golling Group" stays visible under it on every page. |
| **Nav** | Publications + Talks merged into **Output**. New: **Vision**, **Research**, **Join us**, **Outreach**. The menu now collapses behind a button below 860 px. |
| **Research** | Five themes instead of four, named so they spell **FORGE** — Foundation models · Optimisation · Reconstruction · Generation · Exploration. All 40 papers reassigned. |
| **New pages** | `vision.html`, `research.html`, `join.html`, `outreach.html`, `output.html` |
| **Automation** | A watcher that drafts news items and student projects, a weekly freshness audit, and a CI check that refuses to advertise a position that does not exist. |
| **Logo** | Traced from a real ATLAS event display. |

---

## 1. One structural change worth knowing about first

**The menu is now built from `NAV` in `content.js`.** Every page has an empty
`<nav class="site-nav">` that `renderChrome()` fills in. Adding a tab used to
mean editing five files; it is now one line.

The trade-off is that the menu needs JavaScript. That was already true of the
team list, the news, the publications and the talks, so it does not change what
a visitor with JS disabled sees in practice — but it is a real trade-off, and if
you would rather have the nav in the HTML, delete the block in `renderChrome()`
and paste the list back into each page.

---

## 2. Name and landing page

`SITE.groupName` is now `"RODEM"`, with a new `SITE.groupSub` of
`"Golling Group"` rendered small underneath it in the header (`[data-site-sub]`).

Reviewers and prospective students search for the PI's name, not for a
five-letter word they have never seen — so the name stays visible everywhere,
and the page `<title>`s carry both.

`index.html` now leads with the slogan rather than a description:

> **Beyond the Standard Model, beyond supervised learning.**

The keywords moved into `<title>` and `<meta name="description">`, so nothing is
lost to search. Under the hero are **three doors** — outreach, students,
colleagues — because a prospective master's student and a grant panel want
different pages and should not have to guess which is which.

The old research cards moved to `research.html`; what remains on the home page is
a five-letter teaser and the event display.

---

## 3. FORGE

`PUB_CATEGORIES` now has five entries with ids `f`, `o`, `r`, `g`, `e`, in that
order. **Do not reorder them.** The order is doing narrative work: the first four
letters are what the group builds, the last is what it builds them for, so
reading down the research page walks from tooling to discovery.

`tools/update.py` has been re-labelled to match — that matters, because the daily
job rewrites `content.js` from `SELECT`, so a hand edit to `content.js` alone
would be overwritten within 24 hours.

All 40 papers were reassigned: **F 4 · O 7 · R 8 · G 6 · E 15.**

Two moved on judgement rather than mechanically, and both are marked with a
comment in `update.py` so nobody silently "fixes" them:

* **Mind the Gap** was *foundation*, now **O** — it is about optimal-transport
  maps for inference, not about pre-training.
* **Variational inference for pile-up removal** was *generative*, now **R** — the
  method is a diffusion model, but the deliverable is a cleaned event. Sorting by
  what a paper is *for* keeps G honestly meaning "we make simulated data".

The 15/4 split between E and F is not a flaw to correct: it is an accurate
picture of a mature search programme and a two-year-old foundation-model
programme, which is a good story rather than a bad one.

`research.html` renders from the new `RESEARCH` array, and each letter deep-links
to its own slice of the output page (`output.html?cat=e`).

---

## 4. New content arrays in `content.js`

All of them are rendered by small functions in `render.js` that follow the
existing `renderNews()` pattern.

| Array | Drives | Notes |
|---|---|---|
| `NAV` | the menu | one line per tab |
| `RESEARCH` | `research.html` | the five letters |
| `POSITIONS` | `join.html` | see the funding rule below |
| `EVENTS` | Output → *Workshops started and run* | grouped by `series`, in the order the series first appear; every entry is backed by a public page |
| `FUNDING` | Vision → *Funded research* | no amounts, on purpose |

News items can now carry `kind: "spotlight"` and a `mark:` image. A spotlight is
a longer piece about a whole line of work rather than a single event; it renders
tinted, with the mark in the corner. The CURTAINs item is the first one. Two more
are ripe whenever you want them: the ν-flows family, and particle-cloud
generation (PC-JeDi, PC-Droid, EPiC-ly fast, PIPPIN).

---

## 5. Keeping the site current

Three moving parts. All of them fail safe: if a network call breaks, nothing is
published and nothing is lost.

### `tools/watch.py` — daily, opens a pull request

Asks INSPIRE and arXiv what is new, drops anything already in `state/seen.json`,
and for each genuinely new paper writes a draft news item **and** a draft
master's project, then opens a pull request containing exactly those edits.

**Merging the pull request is the approval.** Edit the diff to disagree; delete a
block and merge to say "not newsworthy". That is why this is a PR and not an
email loop: one click to approve, no new infrastructure, and a permanent record
of who decided what.

Guards, all of which exist because the naive version misbehaves:

* First run **seeds** `state/seen.json` and opens no pull request — switching it
  on does not produce a 40-item PR.
* At most **4 drafts per run**, and it says so in the PR when it holds some back.
  A pull request nobody can read is a pull request nobody merges.
* Papers with **more than 20 authors** are skipped: a 3000-author ATLAS paper is
  not a group news item.
* Anything **older than 400 days** is skipped, because a search that suddenly
  returns something from 2009 has gone wrong, not made a discovery.

The draft news body ends with an HTML comment: `<!-- TODO: replace this second
sentence with why it matters. -->`. That is the one sentence a machine cannot
write, and leaving the marker visible is deliberate.

> **Draft quality decides whether this works.** A bad draft costs the author more
> time than no draft, and after three bad ones people stop opening the PRs. Run
> `python3 tools/watch.py --dry-run` against the last few papers first, and be
> willing to let it draft only the news item if the project ideas come out
> generic.

### `tools/freshness.py` — weekly, one issue

Audits the site and maintains a **single** issue, edited in place: positions past
their deadline, drafts nobody finished, PRs nobody reviewed after 7 and 14 days,
sixty days with no news, members with no photo or blurb.

One issue, not seven new ones a week — a nagging system that is itself noisy gets
muted within a month, and then nothing gets nagged about at all.

### `tools/check_positions.py` — every pull request

Refuses to publish a PhD or postdoc position without a funding source and a
deadline in the future. `render.js` applies the same rule at display time; the CI
check is the second lock, so a well-meaning edit to the renderer cannot quietly
start advertising positions that do not exist.

The bot *may* propose PhD topics — they enter as `status: "draft"` and cannot
reach the page until a human writes a real grant line into the entry.

### Talks stay manual, on purpose

There is no public API that reliably answers "what did this person present
recently". Indico's search does not reach external institutions and most agendas
are not machine-readable. Automating it produces a scraper that half-works and
rots. Instead: `.github/ISSUE_TEMPLATE/add-talk.yml`, which is about fifteen
seconds of work, plus a monthly round-up nudge.

### The heartbeat

`update-publications.yml` now writes a timestamp to `.github/heartbeat` and
commits it. This is not decoration: **GitHub disables scheduled workflows after
60 days without repository activity**, so over a quiet summer every job here
would switch itself off silently — precisely the failure this whole setup exists
to prevent.

---

## 6. The logo

`images/logo/rodem-mark.svg` is **traced from a real event**: the ATLAS candidate
`pp → H(→bb) + W(→µν)`, Run 338712, Event 335908183. The 23 track angles and the
muon direction were measured from the pixels of the official display, not drawn
freehand — the comment at the top of the SVG records which event.

The story it tells is the group's method in one picture: a detector seen end-on,
tracks radiating from the collision point, and one track — the muon, already red
in the official display, and claret in ours — that is not like the others and
leaves the detector entirely.

| File | Use |
|---|---|
| `rodem-mark.svg` | full detail, 3 rings, 23 tracks — hero and print |
| `rodem-mark-small.svg` | 7 tracks, bolder — the site header, anything under 48 px |
| `rodem-wordmark.svg` | R · mark · DEM, for slides and posters |
| `rodem-mark-mono.svg` | inherits `currentColor` — for one-colour contexts |
| `favicon.svg` | rounded tile |

The other logo concepts survive as section marks in `images/marks/`: the curtain
on the CURTAINs spotlight, the spectrum on Exploration, and `coverage.svg` and
`forge.svg` unused so far.

**Two caveats.** The wordmark uses live `<text>` with a serif stack, so it will
render slightly differently on a machine without Iowan Old Style — fine for the
web, but convert the letters to outlines before sending it to a printer. And at
16 px the mark is at the edge of legibility; if you want a true favicon-scale
version, drop it to five tracks.

Image credit and licence note: `images/hero/CREDIT.md`. **Confirm the licence on
the ATLAS public-results page for this event display before going live.** ATLAS
public images are normally CC-BY-4.0, which this use satisfies, but the specific
record should be checked.

---

## 7. Housekeeping done along the way

* `.claude/settings.local.json` **removed from the repository** and `.claude/`
  added to `.gitignore`. It was a developer's local permission list, with
  absolute paths from their machine, in a public repo.
* `tools/__pycache__/*.pyc` removed and ignored.
* The stale instruction above `METRICS` (`tools/update_publications.py`) now
  points at `tools/update.py`.
* `publications.html` and `talks.html` are now redirect stubs to `output.html`,
  so existing links, bookmarks and search results keep working.
* `.github/workflows/checks.yml` validates the JS, the categories, the positions
  and every internal link on each pull request.

---

## 8. Still to do — things only you can do

1. **Photos for the ten people who have none.** `tools/freshness.py` lists them.
   This is the single largest visual upgrade left, and it matters most to
   students deciding whether this looks like a place with people in it.
2. **Workshop photographs.** One wide shot per workshop would carry the
   *Convening the field* section better than any list of names.
3. **Two or three more master's projects.** There is one in `POSITIONS` now; three
   to six makes the Join page real, and gives the bot examples to imitate.
4. **GitHub handles** in `TEAM`, so the watcher can request review from the right
   author instead of leaving the PR unassigned.
5. **A `SLACK_WEBHOOK` secret**, if you want the ping as well as the email.
6. **Decide about the repo name** — `rodem-webpage` under a personal account.
   Moving it to the `rodem-hep` organisation would make the branding consistent
   and survive people leaving.
