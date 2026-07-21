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

/* Turn *asterisks* into bold, after escaping. Used for author lists. */
function bold(s) {
  return esc(s).replace(/\*([^*]+)\*/g, "<strong>$1</strong>");
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
  website: "Website", scholar: "Scholar", github: "GitHub",
  arxiv: "arXiv", email: "Email",
};

function memberHTML(m) {
  const avatar = m.photo
    ? `<img class="avatar" src="${esc(m.photo)}" alt="${esc(m.name)}" loading="lazy">`
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

  host.innerHTML = items.map((n) => `<li>
      <p class="date">${esc(n.date)}</p>
      <h3>${n.link ? `<a href="${esc(n.link)}">${esc(n.title)}</a>` : esc(n.title)}</h3>
      <p>${esc(n.body)}</p>
    </li>`).join("");
}

/* ---------------------------------------------------------- publications --- */

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

  // Summary line: selected papers here, versus the full record on INSPIRE.
  let stats = "";
  if (typeof PUB_STATS !== "undefined") {
    stats = `<p class="pub-stats">
        Showing <strong>${PUBLICATIONS.length}</strong> selected papers.
        The group's full record lists <strong>${esc(PUB_STATS.total)}</strong> publications,
        including <strong>${esc(PUB_STATS.atlas)}</strong> ATLAS Collaboration papers
        (INSPIRE-HEP, ${esc(PUB_STATS.updated)}).
      </p>`;
  }

  host.innerHTML = stats + filters + sections;
  wirePublications(host);
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

/* ------------------------------------------------- shared header / footer --- */

function renderChrome() {
  if (typeof SITE === "undefined") return;

  document.querySelectorAll("[data-site-name]").forEach((n) => { n.textContent = SITE.groupName; });
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
});
