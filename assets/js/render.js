/* ============================================================================
   RENDERING  —  you should not need to edit this file.
   It reads the data in content.js and builds the team / news / publication
   lists. To change what the site *says*, edit content.js instead.
   ========================================================================== */

/* Escape text before putting it into HTML, so a stray < or & in a name or
   title can't break the page. */
function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

/* Body text in content.js may use a few inline tags, and only these, for
   particle notation: <i>b</i>-hadron, B<sub>c</sub>, fb<sup>-1</sup>.
   Physics convention sets particle symbols in italic, and <i> rather than <em>
   is the right tag: it marks a technical term, not spoken emphasis, so screen
   readers do not add stress where none is meant.

   Everything is escaped first and only these four tags are let back in, so a
   stray "<script>" in content.js still cannot become markup. Use esc() for
   anything that is not body copy. */
function richText(s) {
  return esc(s).replace(/&lt;(\/?)(i|em|sub|sup)&gt;/g, "<$1$2>");
}

/* Strip accents and case so "Schröer" and "Schroer" compare equal. */
function fold(s) {
  return String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

/* Everyone who has ever been in the group, indexed as
   surname -> set of first initials. Built once, from TEAM, so the author
   highlighting in the publication list follows the team list automatically:
   add someone to TEAM and their papers bold themselves.
   Alumni are included — they were group members when the work was done. */
let _teamIndex = null;
function teamIndex() {
  if (_teamIndex) return _teamIndex;
  _teamIndex = new Map();
  if (typeof TEAM === "undefined") return _teamIndex;

  for (const group of TEAM) {
    for (const m of group.members || []) {
      const parts = String(m.name).trim().split(/\s+/);
      if (parts.length < 2) continue;
      const last = fold(parts[parts.length - 1]);
      const initial = fold(parts[0]).charAt(0);
      if (!_teamIndex.has(last)) _teamIndex.set(last, new Set());
      _teamIndex.get(last).add(initial);
    }
  }
  return _teamIndex;
}

/* Is "K. A. Wozniak" one of ours? Match on surname AND first initial, so an
   unrelated author who happens to share a surname is not bolded by mistake. */
function isTeamAuthor(author) {
  const parts = author.trim().split(/\s+/);
  if (parts.length < 2) return false;

  const last = fold(parts[parts.length - 1]);
  const initials = teamIndex().get(last);
  if (!initials) return false;

  const first = fold(parts[0]).charAt(0);
  return initials.has(first);
}

/* Bold the group's own authors in a comma-separated author list.
   Wrapping a name in *asterisks* still forces bold, for the occasional
   collaborator who should be highlighted but is not on the team page. */
function bold(s) {
  return String(s == null ? "" : s)
    .split(/,\s*/)
    .map((author) => {
      const forced = /^\*.*\*$/.test(author);
      const clean = author.replace(/\*/g, "");
      return (forced || isTeamAuthor(clean))
        ? `<strong>${esc(clean)}</strong>`
        : esc(clean);
    })
    .join(", ");
}

/* "Tobias Golling" -> "TG"  (used when a member has no photo) */
function initials(name) {
  const parts = String(name).trim().split(/\s+/);
  const first = parts[0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1] : "";
  return (first.charAt(0) + last.charAt(0)).toUpperCase();
}

function el(id) { return document.getElementById(id); }

/* ------------------------------------------------------------------ team --- */

const LINK_LABELS = {
  cv: "CV", website: "Website", scholar: "Scholar", github: "GitHub",
  arxiv: "arXiv", email: "Email",
};

function memberHTML(m) {
  // photoPosition tunes the circular crop when the face is not dead centre.
  const pos = m.photoPosition
    ? ` style="object-position: ${esc(m.photoPosition)}"`
    : "";
  const avatar = m.photo
    ? `<img class="avatar" src="${esc(m.photo)}" alt="${esc(m.name)}" loading="lazy"${pos}>`
    : `<div class="avatar" aria-hidden="true">${esc(initials(m.name))}</div>`;

  const links = Object.entries(m.links || {})
    .filter(([, url]) => url)
    .map(([key, url]) => {
      const href = key === "email" ? `mailto:${esc(url)}` : esc(url);
      const label = LINK_LABELS[key] || key;
      return `<a href="${href}">${esc(label)}</a>`;
    })
    .join("");

  // For alumni the departure year is shown next to the role, so it never has
  // to be written into the blurb by hand.
  const role = [m.role, m.left].filter(Boolean).map(esc).join(" &middot; ");

  // Treat a blank or whitespace-only blurb as absent, so it leaves no gap.
  const blurb = (m.blurb || "").trim();

  return `<div class="member">
      ${avatar}
      <p class="name">${esc(m.name)}</p>
      ${role ? `<p class="role">${role}</p>` : ""}
      ${blurb ? `<p class="blurb">${esc(blurb)}</p>` : ""}
      ${links ? `<div class="links">${links}</div>` : ""}
    </div>`;
}

/* Surname = last word of the name, so "Kinga Anna Wozniak" sorts under W.
   localeCompare keeps accented names (Schröer, Máté) in the right place. */
function surname(name) {
  const parts = String(name).trim().split(/\s+/);
  return parts[parts.length - 1] || "";
}

function byName(a, b) {
  return surname(a.name).localeCompare(surname(b.name), "en", { sensitivity: "base" });
}

/* Alumni order: most recent departure first. Anyone with no `left` year goes
   to the end rather than disappearing or sorting as year zero. */
function byDeparture(a, b) {
  const x = a.left, y = b.left;
  if (x == null && y == null) return byName(a, b);
  if (x == null) return 1;
  if (y == null) return -1;
  if (x !== y) return y - x;
  return byName(a, b);
}

function sortMembers(group) {
  const members = group.members.slice();  // never reorder the source array
  return members.sort(group.sort === "left" ? byDeparture : byName);
}

function renderTeam(target) {
  const host = el(target);
  if (!host || typeof TEAM === "undefined") return;

  // Skip any group that has no members yet, so empty headings never show.
  host.innerHTML = TEAM
    .filter((g) => g.members && g.members.length)
    .map((g) => `<section class="team-group">
        <h3>${esc(g.group)}</h3>
        <div class="grid-team">${sortMembers(g).map(memberHTML).join("")}</div>
      </section>`)
    .join("");
}

/* ------------------------------------------------------------------ news --- */

function renderNews(target, limit) {
  const host = el(target);
  if (!host || typeof NEWS === "undefined") return;

  const items = limit ? NEWS.slice(0, limit) : NEWS;
  if (!items.length) { host.innerHTML = `<p class="empty">No news yet.</p>`; return; }

  // A "spotlight" item is a longer piece about a whole line of work rather
  // than a single event. It gets a tint, a mark, and no date-first framing.
  host.innerHTML = items.map((n) => {
    const spot = n.kind === "spotlight";
    const mark = spot && n.mark
      ? `<img class="news-mark" src="${esc(n.mark)}" alt="" aria-hidden="true">` : "";
    return `<li${spot ? ` class="spotlight"` : ""}>
      ${mark}
      <p class="date">${esc(n.date)}${spot ? ` &middot; Method spotlight` : ""}</p>
      <h3>${n.link ? `<a href="${esc(n.link)}">${esc(n.title)}</a>` : esc(n.title)}</h3>
      <p>${richText(n.body)}</p>
    </li>`;
  }).join("");
}

/* ---------------------------------------------------------- publications --- */

/* 243350 -> "243,350". Done by hand rather than with toLocaleString so the
   grouping does not depend on the browser's locale or Intl being available. */
function thousands(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/* Citation metrics, shown as a row of figures rather than a chart: these are
   six headline numbers with no trend behind them, so a plot would add nothing.
   Values stay in normal text colour — the figures carry the emphasis by size. */
function metricsHTML() {
  if (typeof METRICS === "undefined" || !METRICS.groups) return "";

  const groups = METRICS.groups.map((g) => {
    const tiles = (g.stats || []).map((s) => `<div class="kpi">
        <div class="kpi-value">${esc(thousands(s.value))}</div>
        <div class="kpi-label">${esc(s.label)}</div>
      </div>`).join("");

    const heading = g.link
      ? `<a href="${esc(g.link)}">${esc(g.label)}</a>`
      : esc(g.label);

    return `<section class="kpi-group">
        <h3 class="kpi-group-title">${heading}</h3>
        ${g.note ? `<p class="kpi-note">${esc(g.note)}</p>` : ""}
        <div class="kpi-row">${tiles}</div>
      </section>`;
  }).join("");

  return `<div class="metrics">
      ${groups}
      <p class="metrics-source">Source: INSPIRE-HEP${METRICS.updated ? ", " + esc(METRICS.updated) : ""}.</p>
    </div>`;
}

function pubItemHTML(p) {
  const tags = [
    p.arxiv && `<a class="tag" href="${esc(p.arxiv)}">arXiv</a>`,
    p.doi   && `<a class="tag" href="${esc(p.doi)}">DOI</a>`,
    p.code  && `<a class="tag" href="${esc(p.code)}">Code</a>`,
    p.inspire && `<a class="tag" href="${esc(p.inspire)}">INSPIRE</a>`,
    p.bibtex && `<button class="tag tag-btn" type="button" data-bib>BibTeX</button>`,
    (p.citations > 0) && `<span class="cites">${esc(p.citations)} citation${p.citations === 1 ? "" : "s"}</span>`,
  ].filter(Boolean).join("");

  // The BibTeX record is rendered hidden and revealed by the button above.
  const bib = p.bibtex
    ? `<pre class="bibtex" hidden>${esc(p.bibtex)}</pre>`
    : "";

  const star = p.star
    ? `<span class="star" title="Selected publication" aria-label="Selected publication">&#9733;</span> `
    : "";

  return `<li>
      <p class="title">${star}${esc(p.title)}</p>
      <p class="authors">${bold(p.authors)}</p>
      ${p.journal ? `<p class="journal">${esc(p.journal)}</p>` : ""}
      ${tags ? `<div class="tags">${tags}</div>` : ""}
      ${bib}
    </li>`;
}

function renderPublications(target) {
  const host = el(target);
  if (!host || typeof PUBLICATIONS === "undefined") return;

  if (!PUBLICATIONS.length) {
    host.innerHTML = `<p class="empty">No publications listed yet.</p>`;
    return;
  }

  // Category order comes from PUB_CATEGORIES; anything with an unknown or
  // missing category falls into a trailing "Other" group so nothing vanishes.
  const cats = (typeof PUB_CATEGORIES !== "undefined" ? PUB_CATEGORIES : []).slice();
  const known = new Set(cats.map((c) => c.id));
  if (PUBLICATIONS.some((p) => !known.has(p.category))) {
    cats.push({ id: "__other", name: "Other" });
  }

  const sections = cats.map((c) => {
    const items = PUBLICATIONS
      .filter((p) => (c.id === "__other" ? !known.has(p.category) : p.category === c.id))
      .sort((a, b) => b.year - a.year);

    if (!items.length) return "";  // skip empty categories

    return `<section class="pub-cat" data-cat="${esc(c.id)}">
        <h2 class="pub-cat-title">${esc(c.name)}</h2>
        <ul class="pub-list">${items.map(pubItemHTML).join("")}</ul>
      </section>`;
  }).filter(Boolean).join("");

  // Filter buttons — only for categories that actually have papers.
  const present = cats.filter((c) =>
    PUBLICATIONS.some((p) => (c.id === "__other" ? !known.has(p.category) : p.category === c.id)));

  const filters = `<div class="pub-filters" role="group" aria-label="Filter publications by topic">
      <button class="chip is-active" type="button" data-filter="all">All</button>
      ${present.map((c) => `<button class="chip" type="button" data-filter="${esc(c.id)}">${esc(c.name)}</button>`).join("")}
    </div>`;

  const note = `<p class="pub-stats">Showing <strong>${PUBLICATIONS.length}</strong>
      selected papers, grouped by topic.</p>`;

  host.innerHTML = metricsHTML() + note + filters + sections;
  wirePublications(host);

  // Deep link: output.html?cat=e opens with only that letter shown, so the
  // research page can point straight at one slice.
  const wanted = new URLSearchParams(location.search).get("cat");
  if (wanted) {
    const btn = host.querySelector(`[data-filter="${CSS.escape(wanted)}"]`);
    if (btn) btn.click();
  }
}

function wirePublications(host) {
  // Category filtering: show or hide whole sections.
  host.querySelectorAll("[data-filter]").forEach((btn) => {
    btn.addEventListener("click", function () {
      const want = btn.dataset.filter;
      host.querySelectorAll("[data-filter]").forEach((b) => b.classList.toggle("is-active", b === btn));
      host.querySelectorAll(".pub-cat").forEach((sec) => {
        sec.hidden = !(want === "all" || sec.dataset.cat === want);
      });
    });
  });

  // BibTeX show/hide.
  host.querySelectorAll("[data-bib]").forEach((btn) => {
    btn.addEventListener("click", function () {
      const pre = btn.closest("li").querySelector(".bibtex");
      if (!pre) return;
      pre.hidden = !pre.hidden;
      btn.classList.toggle("is-active", !pre.hidden);
    });
  });
}

/* ----------------------------------------------------------------- talks --- */

function talkHTML(t) {
  const kind = t.kind || "Talk";
  const links = [
    t.slides && `<a class="tag" href="${esc(t.slides)}">Slides</a>`,
    t.video  && `<a class="tag" href="${esc(t.video)}">Video</a>`,
    t.link   && `<a class="tag" href="${esc(t.link)}">Event</a>`,
  ].filter(Boolean).join("");

  // Speaker is bolded when they are on the team page, same rule as the
  // publication author list.
  const speaker = isTeamAuthor(t.speaker) || teamFullName(t.speaker)
    ? `<strong>${esc(t.speaker)}</strong>` : esc(t.speaker);

  const where = [t.event, t.location].filter(Boolean).map(esc).join(" &middot; ");

  return `<li data-kind="${esc(kind)}">
      <p class="talk-meta"><span class="kind">${esc(kind)}</span>${t.date ? esc(t.date) : ""}</p>
      <p class="title">${esc(t.title)}</p>
      <p class="authors">${speaker}</p>
      ${where ? `<p class="journal">${where}</p>` : ""}
      ${links ? `<div class="tags">${links}</div>` : ""}
    </li>`;
}

/* Talks list speakers by full name ("Tobias Golling"), not initials, so match
   those directly against the team list too. */
function teamFullName(name) {
  if (typeof TEAM === "undefined" || !name) return false;
  const target = fold(name).replace(/\s+/g, " ").trim();
  return TEAM.some((g) => (g.members || []).some((m) => fold(m.name).replace(/\s+/g, " ").trim() === target));
}

function renderTalks(target) {
  const host = el(target);
  if (!host || typeof TALKS === "undefined") return;

  if (!TALKS.length) { host.innerHTML = `<p class="empty">No talks listed yet.</p>`; return; }

  const years = [...new Set(TALKS.map((t) => t.year))].sort((a, b) => b - a);
  const sections = years.map((y) => {
    const items = TALKS.filter((t) => t.year === y);
    return `<section class="pub-cat" data-year="${esc(y)}">
        <h2 class="pub-cat-title">${esc(y)}</h2>
        <ul class="pub-list talk-list">${items.map(talkHTML).join("")}</ul>
      </section>`;
  }).join("");

  // Filter buttons, but only for kinds that actually occur.
  const kinds = (typeof TALK_KINDS !== "undefined" ? TALK_KINDS : [])
    .filter((k) => TALKS.some((t) => (t.kind || "Talk") === k));

  const filters = `<div class="pub-filters" role="group" aria-label="Filter talks by kind">
      <button class="chip is-active" type="button" data-kind-filter="all">All</button>
      ${kinds.map((k) => `<button class="chip" type="button" data-kind-filter="${esc(k)}">${esc(k)}</button>`).join("")}
    </div>`;

  host.innerHTML = filters + sections;
  wireTalks(host);
}

function wireTalks(host) {
  host.querySelectorAll("[data-kind-filter]").forEach((btn) => {
    btn.addEventListener("click", function () {
      const want = btn.dataset.kindFilter;
      host.querySelectorAll("[data-kind-filter]").forEach((b) => b.classList.toggle("is-active", b === btn));

      host.querySelectorAll("li[data-kind]").forEach((li) => {
        li.hidden = !(want === "all" || li.dataset.kind === want);
      });
      // Hide a year heading once every talk under it is filtered out.
      host.querySelectorAll("[data-year]").forEach((sec) => {
        const any = [...sec.querySelectorAll("li[data-kind]")].some((li) => !li.hidden);
        sec.hidden = !any;
      });
    });
  });
}

/* -------------------------------------------------------------------- cv --- */

function renderCV(target) {
  const host = el(target);
  if (!host || typeof CV === "undefined") return;

  host.innerHTML = (CV.sections || []).map((sec) => {
    const rows = (sec.rows || []).map((r) => `<div class="cv-row">
        <div class="cv-period">${esc(r.period || "")}</div>
        <div class="cv-what">
          <span class="cv-title">${esc(r.what || "")}</span>
          ${r.where ? `<span class="cv-where">${esc(r.where)}</span>` : ""}
        </div>
      </div>`).join("");

    return `<section class="cv-section">
        <h2 class="pub-cat-title">${esc(sec.title)}</h2>
        ${rows}
      </section>`;
  }).join("");

  // Fill the heading block at the top of the page.
  const name = el("cv-name");
  if (name) name.textContent = CV.name || "";
  const role = el("cv-role");
  if (role) {
    const orcid = CV.orcid
      ? `<a href="https://orcid.org/${esc(CV.orcid)}">ORCID ${esc(CV.orcid)}</a>` : "";
    role.innerHTML = [CV.role, CV.affiliation, orcid]
      .filter(Boolean).map((s) => (s === orcid ? s : esc(s))).join(" &middot; ");
  }
}


/* -------------------------------------------------------------- research --- */
/* The five letters of FORGE. Order comes from RESEARCH and is deliberate:
   the first four are what we build, the last is what we build them for. */
function renderResearch(target) {
  const host = el(target);
  if (!host || typeof RESEARCH === "undefined") return;

  host.innerHTML = RESEARCH.map((r) => {
    const examples = (r.examples || [])
      .map((e) => `<li>${esc(e)}</li>`).join("");
    const mark = r.mark
      ? `<img class="letter-mark" src="${esc(r.mark)}" alt="" aria-hidden="true">` : "";
    return `<section class="letter" id="${esc(r.id)}">
        <div class="letter-head">
          <span class="letter-glyph" aria-hidden="true">${esc(r.letter)}</span>
          <h2>${esc(r.name)}</h2>
        </div>
        <div class="letter-body">
          <p>${richText(r.body)}</p>
          ${examples ? `<ul class="letter-examples">${examples}</ul>` : ""}
          <p class="letter-more">
            <a href="output.html?cat=${esc(r.id)}">All ${esc(r.name.toLowerCase())} papers &rarr;</a>
          </p>
        </div>
        ${mark}
      </section>`;
  }).join("");
}

/* -------------------------------------------------------------- detector --- */
/* The hardware half of the programme. One block, not a sixth letter of FORGE:
   see the comment above DETECTOR in content.js. Silently renders nothing if
   DETECTOR is absent or null, so removing it from content.js is enough. */
function renderDetector(target) {
  const host = el(target);
  if (!host || typeof DETECTOR === "undefined" || !DETECTOR) return;

  const funding = DETECTOR.funding
    ? `<p class="letter-more">${esc(DETECTOR.funding)}</p>` : "";

  host.innerHTML = `<section class="letter is-detector" id="${esc(DETECTOR.id || "detector")}">
      ${DETECTOR.eyebrow ? `<p class="eyebrow">${esc(DETECTOR.eyebrow)}</p>` : ""}
      <div class="letter-head">
        <h2>${esc(DETECTOR.name)}</h2>
      </div>
      <div class="letter-body">
        <p>${richText(DETECTOR.body)}</p>
        ${funding}
      </div>
    </section>`;
}

/* ------------------------------------------------------------- positions --- */
/* A PhD entry only ever reaches the page if it has a funding source and a
   deadline that has not passed. tools/check_positions.py enforces the same
   rule in CI — please keep both. */
function positionIsLive(p) {
  if (p.status !== "open") return false;
  if (p.level !== "PhD") return true;
  if (!p.funding || !p.deadline) return false;
  return new Date(p.deadline) >= new Date(new Date().toDateString());
}

function renderPositions(target, level) {
  const host = el(target);
  if (!host || typeof POSITIONS === "undefined") return;

  const items = POSITIONS.filter((p) => p.level === level && positionIsLive(p));
  if (!items.length) {
    host.innerHTML = `<p class="empty">${esc(host.dataset.empty || "Nothing open at the moment.")}</p>`;
    return;
  }

  host.innerHTML = items.map((p) => `<article class="position">
      <h3>${esc(p.title)}</h3>
      <p>${richText(p.body)}</p>
      <dl class="position-meta">
        <dt>Supervisor</dt><dd>${esc(p.supervisor)}</dd>
        <dt>You should already have</dt><dd>${esc(p.prerequisites)}</dd>
        ${p.funding  ? `<dt>Funded by</dt><dd>${esc(p.funding)}</dd>` : ""}
        ${p.deadline ? `<dt>Apply by</dt><dd>${esc(p.deadline)}</dd>` : ""}
        ${p.applyUrl ? `<dt>How to apply</dt><dd><a href="${esc(p.applyUrl)}">${esc(p.applyLabel || "Application form")}</a></dd>` : ""}
      </dl>
    </article>`).join("");
}

/* ------------------------------------------------------------- workshops --- */
// EVENTS grouped by series, because a series read as one block says more than
// the same entries scattered through a single list of years. Group order is the
// order the series first appear in EVENTS, so the author decides it there.
function renderWorkshops(target) {
  const host = el(target);
  if (!host || typeof EVENTS === "undefined") return;

  if (!EVENTS.length) {
    host.innerHTML = `<p class="empty">No workshops listed yet.</p>`;
    return;
  }

  const order = [];
  const bySeries = new Map();
  for (const e of EVENTS) {
    const key = e.series || "Other";
    if (!bySeries.has(key)) { bySeries.set(key, []); order.push(key); }
    bySeries.get(key).push(e);
  }

  host.innerHTML = order.map((series) => `<section class="event-series">
      <h3 class="event-series-title">${esc(series)}</h3>
      ${bySeries.get(series).map(eventHTML).join("")}
    </section>`).join("");
}

function eventHTML(e) {
  const speakers = (e.speakers || []).length
    ? `<p class="event-speakers"><span>Among the speakers</span> ${e.speakers.map(esc).join(" &middot; ")}</p>` : "";
  const title = e.url
    ? `<a href="${esc(e.url)}">${esc(e.title)}</a>` : esc(e.title);
  return `<article class="event${e.upcoming ? " is-upcoming" : ""}">
      <p class="event-year">${esc(e.dates || e.year)}${e.upcoming ? ` &middot; upcoming` : ""}</p>
      <h4>${title}</h4>
      <p class="event-where">${esc(e.venue || "")}
         ${e.role ? `&middot; <em>${esc(e.role)}</em>` : ""}</p>
      ${e.body ? `<p>${richText(e.body)}</p>` : ""}
      ${speakers}
    </article>`;
}

/* --------------------------------------------------------------- funding --- */
function renderFunding(target) {
  const host = el(target);
  if (!host || typeof FUNDING === "undefined") return;

  host.innerHTML = `<ul class="funding-list">${FUNDING.map((f) => `<li>
      <span class="funding-years">${esc(f.years)}</span>
      <span class="funding-what"><strong>${esc(f.name)}</strong>
        <span class="funding-who">${esc(f.funder)} &middot; ${esc(f.role)}${f.note ? " &middot; " + esc(f.note) : ""}</span>
      </span>
    </li>`).join("")}</ul>`;
}

/* ------------------------------------------------- shared header / footer --- */

function renderChrome() {
  if (typeof SITE === "undefined") return;

  document.querySelectorAll("[data-site-name]").forEach((n) => { n.textContent = SITE.groupName; });
  document.querySelectorAll("[data-site-sub]").forEach((n) => { n.textContent = SITE.groupSub || ""; });

  // The menu is built from NAV in content.js, so adding a tab is a one-line
  // edit there rather than an edit to every HTML file.
  const here = (location.pathname.split("/").pop() || "index.html");
  document.querySelectorAll("nav.site-nav").forEach((nav) => {
    if (typeof NAV === "undefined") return;
    nav.innerHTML = NAV.map((i) => {
      const target = i.href.split("#")[0];
      const current = target === here && (!i.href.includes("#") || here !== "index.html")
        ? ` aria-current="page"` : "";
      return `<a href="${esc(i.href)}"${current}>${esc(i.label)}</a>`;
    }).join("");
  });

  // Narrow screens: collapse the menu behind a button rather than wrapping it
  // onto three lines.
  const toggle = el("nav-toggle");
  const header = document.querySelector(".site-header");
  if (toggle && header) {
    toggle.addEventListener("click", function () {
      const open = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  document.querySelectorAll("[data-site-email]").forEach((n) => {
    n.textContent = SITE.email;
    n.setAttribute("href", "mailto:" + SITE.email);
  });
  document.querySelectorAll("[data-site-address]").forEach((n) => { n.textContent = SITE.address; });
  document.querySelectorAll("[data-site-institution]").forEach((n) => { n.textContent = SITE.institution; });

  const links = el("footer-links");
  if (links && SITE.links) {
    links.innerHTML = SITE.links
      .map((l) => `<a href="${esc(l.url)}">${esc(l.label)}</a>`)
      .join("");
  }

  const year = el("footer-year");
  if (year) year.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", function () {
  renderChrome();
  renderTeam("team-root");
  renderNews("news-root", el("news-root") && el("news-root").dataset.limit);
  renderPublications("publications-root");
  renderTalks("talks-root");
  renderCV("cv-root");
  renderResearch("research-root");
  renderDetector("detector-root");
  renderPositions("positions-master", "Master");
  renderPositions("positions-phd", "PhD");
  renderPositions("positions-postdoc", "Postdoc");
  renderWorkshops("workshops-root");
  renderFunding("funding-root");
});
