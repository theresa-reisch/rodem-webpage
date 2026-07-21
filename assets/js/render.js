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

  return `<div class="member">
      ${avatar}
      <p class="name">${esc(m.name)}</p>
      ${m.role ? `<p class="role">${esc(m.role)}</p>` : ""}
      ${m.blurb ? `<p class="blurb">${esc(m.blurb)}</p>` : ""}
      ${links ? `<div class="links">${links}</div>` : ""}
    </div>`;
}

function renderTeam(target) {
  const host = el(target);
  if (!host || typeof TEAM === "undefined") return;

  // Skip any group that has no members yet, so empty headings never show.
  host.innerHTML = TEAM
    .filter((g) => g.members && g.members.length)
    .map((g) => `<section class="team-group">
        <h3>${esc(g.group)}</h3>
        <div class="grid-team">${g.members.map(memberHTML).join("")}</div>
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

function renderPublications(target) {
  const host = el(target);
  if (!host || typeof PUBLICATIONS === "undefined") return;

  if (!PUBLICATIONS.length) { host.innerHTML = `<p class="empty">No publications listed yet.</p>`; return; }

  // Group by year, newest year first.
  const byYear = new Map();
  for (const p of PUBLICATIONS) {
    if (!byYear.has(p.year)) byYear.set(p.year, []);
    byYear.get(p.year).push(p);
  }
  const years = [...byYear.keys()].sort((a, b) => b - a);

  host.innerHTML = years.map((year) => {
    const items = byYear.get(year).map((p) => {
      const tags = [
        p.arxiv && `<a class="tag" href="${esc(p.arxiv)}">arXiv</a>`,
        p.doi   && `<a class="tag" href="${esc(p.doi)}">DOI</a>`,
        p.code  && `<a class="tag" href="${esc(p.code)}">Code</a>`,
      ].filter(Boolean).join("");

      return `<li>
          <p class="title">${esc(p.title)}</p>
          <p class="authors">${bold(p.authors)}</p>
          ${p.journal ? `<p class="journal">${esc(p.journal)}</p>` : ""}
          ${tags ? `<div class="tags">${tags}</div>` : ""}
        </li>`;
    }).join("");

    return `<h2 class="pub-year">${esc(year)}</h2><ul class="pub-list">${items}</ul>`;
  }).join("");
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
