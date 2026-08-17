"""
Update the publication list and citation metrics from INSPIRE-HEP.

    python3 tools/update.py

Rewrites the PUBLICATIONS and METRICS blocks in assets/js/content.js in place,
then bumps the cache-busting version on every page. Nothing to copy or paste:
check the result with `git diff`, then commit and push.

To add a paper, add a distinctive fragment of its title to SELECT below with
its category. For an ATLAS paper, add its INSPIRE record id to ATLAS_IDS (the
number at the end of its inspirehep.net/literature/ URL). Then re-run.
"""
import datetime, json, re, urllib.request, urllib.parse, pathlib

AUTHOR = "T.Golling.1"

def _q(query, size=1, fields="titles"):
    url = "https://inspirehep.net/api/literature?" + urllib.parse.urlencode(
        {"q": query, "sort": "mostrecent", "size": size, "fields": fields})
    with urllib.request.urlopen(url, timeout=60) as r:
        return json.load(r)["hits"]

_own = _q("a %s not cn ATLAS" % AUTHOR, 250,
          "titles,authors,publication_info,arxiv_eprints,dois,earliest_date,"
          "citation_count,texkeys,collaborations")
OWN = _own["hits"]

def _citations(query):
    """Every citation count for a query, paging until exhausted."""
    out, page = [], 1
    while True:
        url = "https://inspirehep.net/api/literature?" + urllib.parse.urlencode(
            {"q": query, "size": 1000, "page": page, "fields": "citation_count"})
        with urllib.request.urlopen(url, timeout=120) as r:
            hits = json.load(r)["hits"]
        out += [h["metadata"].get("citation_count", 0) for h in hits["hits"]]
        if len(out) >= hits["total"] or not hits["hits"]:
            return out, hits["total"]
        page += 1


def _hindex(counts):
    h = 0
    for i, n in enumerate(sorted(counts, reverse=True), 1):
        if n < i:
            break
        h = i
    return h


def metrics():
    """The numbers behind the METRICS block in content.js."""
    out = {}
    for key, query in [("small", "a %s and ac 1->10" % AUTHOR), ("all", "a %s" % AUTHOR)]:
        counts, total = _citations(query)
        out[key] = {"papers": total, "citations": sum(counts), "hindex": _hindex(counts)}
    return out

# ---- curated selection: title fragment -> category -------------------------
# Only the group's own ML work (no D0-era, no FCC/hardware reports).
SELECT = [
 # ---- F: foundation models -------------------------------------------------
 ("Is Tokenization Needed for Masked Particle",     "f"),
 ("Masked particle modeling on sets",               "f"),
 ("Large physics models",                           "f"),
 ("RODEM Jet Datasets",                             "f"),
 # ---- O: optimisation — calibration, decorrelation, robustness, design ------
 ("Mind the Gap",                                   "o"),   # OT maps for inference, not pre-training
 ("End-to-end optimal detector design",             "o"),
 ("Codesign of Scientific Experiments",             "o"),   # hardware and analysis optimised together
 ("Enhancing generalization in high-energy",        "o"),
 ("Decorrelation using optimal transport",          "o"),
 ("Decorrelation with conditional normalizing",     "o"),
 ("Flow Away your Differences",                     "o"),
 # ---- R: reconstruction ----------------------------------------------------
 ("Pairton",                                        "r"),
 ("Fast and improved neutrino reconstruction",      "r"),
 (r"\nu$-flows",                                    "r"),
 ("Topological reconstruction of particle physics", "r"),
 ("Hashing and metric learning",                    "r"),
 ("Similarity hashing",                             "r"),
 ("Variational inference for pile-up removal",      "r"),   # diffusion method, but it delivers a cleaned event
 # ---- G: generation --------------------------------------------------------
 ("EPiC-ly Fast Particle Cloud Generation",         "g"),
 ("Faster diffusion model with improved quality",   "g"),
 ("PC-JeDi",                                        "g"),
 ("Generating variable length full events",         "g"),
 ("Turbo-Sim",                                      "g"),
 ("Deep Generative Models for Fast Shower",         "g"),
 # ---- E: exploration -------------------------------------------------------
 ("Strong CWoLa",                                   "e"),
 ("TRANSIT your events",                            "e"),
 ("Robust resonant anomaly detection with NPLM",    "e"),
 ("Accelerating template generation",               "e"),
 ("skycurtains",                                    "e"),
 ("Cluster Scanning",                               "e"),
 ("Improving new physics searches with diffusion",  "e"),
 ("interplay of machine learning-based resonant",   "e"),
 ("CURTAINs flows for flows",                       "e"),
 ("The Mass-ive Issue",                             "e"),
 ("Flow-enhanced transportation",                   "e"),
 ("CURTAINs for your sliding window",               "e"),
 ("Variational autoencoders for anomalous jet",     "e"),
 ("Morphing one dataset into another",              "e"),
]

# ---- ATLAS papers the user asked for, by INSPIRE record id -----------------
ATLAS_IDS = {
 2926001: "r",     # Transforming jet flavour tagging at ATLAS  (Nature Communications)
 2923234: "o",     # continuous calibration of flavour tagging via optimal transport
 2605177: "r",     # ATLAS flavour-tagging algorithms, Run 2
 2880274: "e",     # weakly supervised anomaly detection, dijet final state
}

# ---- journal references INSPIRE has not caught up with ---------------------
# INSPIRE sometimes leaves a record marked as a preprint months after the
# journal has published it, which would show the paper here as a preprint too.
# An entry below fills that gap, keyed by INSPIRE record id. It applies *only*
# while INSPIRE itself still has neither publication_info nor a DOI, so each
# one falls away by itself on the day INSPIRE catches up.
# The keys are INSPIRE's own, so each entry stands in for the publication_info
# block the record is missing.
PUBLISHED = {
 2830443: {                                  # Is Tokenization Needed for MPM?
   "journal_title": "Mach.Learn.Sci.Tech.",
   "journal_volume": "6",
   "artid": "025075",
   "year": 2025,
   "doi": "10.1088/2632-2153/addb98",
 },
}

# ---- preprints under review ------------------------------------------------
# A paper INSPIRE still lists as a preprint may already be with a journal.
# An entry here names that journal, so the paper reads "(submitted to ...)"
# instead of "(preprint)", keyed by INSPIRE record id. Like PUBLISHED it
# applies only while INSPIRE has neither publication_info nor a DOI, so it
# falls away by itself once the paper is accepted.
SUBMITTED = {
 3191164: "Phys. Rev. D",    # Pairton: Iterative Reconstruction of Short-Lived Particles
}

# ---- papers INSPIRE does not have at all -----------------------------------
# Everything above is looked up on INSPIRE, which cannot work for a paper that
# has no INSPIRE record and no arXiv preprint — accepted straight at a journal.
# An entry here is written out verbatim alongside the fetched ones, so it
# survives this script rewriting the PUBLICATIONS block.
# Use the same keys entry() produces. Delete an entry once INSPIRE has the
# record and add its title fragment to SELECT instead, which then keeps the
# citation count and the BibTeX key up to date by itself.
EXTRAS = [
 {
   "category": "other",   # no id in PUB_CATEGORIES: renders under "Other"
   "year": 2026,
   "title": "Systematic study of fully heavy-flavored tetraquarks Q₁Q₂Q̄₁Q̄₂ "
            "(Q₁,₂ ∈ {b,c}): Mass spectra, threshold analysis, and "
            "confrontation with LHC data",
   "authors": "A. A. Atangana Likéné, F. Rothen, D. Nga Ongodo, "
              "G. H. Ben-Bolie, T. Golling",
   "journal": "Phys.Rev.D (accepted 2026)",
   "citations": 0,
   "doi": "https://doi.org/10.1103/y15p-jk18",
   "bibtex": """@article{AtanganaLikene:2026tetra,
  title   = {{Systematic study of fully heavy-flavored tetraquarks $Q_1 Q_2 \\bar{Q}_1 \\bar{Q}_2$ ($Q_{1,2} \\in \\{b,c\\}$): Mass spectra, threshold analysis, and confrontation with LHC data}},
  author  = {Atangana Lik\\'en\\'e, A. A. and Rothen, F. and Nga Ongodo, D. and Ben-Bolie, G. H. and Golling, Tobias},
  journal = {Phys. Rev. D},
  year    = {2026},
  doi     = {10.1103/y15p-jk18},
}""",
 },
]

def fetch(rid):
    url = ("https://inspirehep.net/api/literature/%d?fields=titles,authors,"
           "publication_info,arxiv_eprints,dois,earliest_date,citation_count,texkeys,collaborations" % rid)
    with urllib.request.urlopen(url, timeout=30) as r:
        return json.load(r)['metadata']

GREEK = {"nu":"ν","mu":"μ","tau":"τ","pi":"π","gamma":"γ","alpha":"α","beta":"β",
         "eta":"η","phi":"φ","psi":"ψ","Upsilon":"Υ","Lambda":"Λ","sigma":"σ",
         "ell":"ℓ","to":"→","times":"×","pm":"±","infty":"∞"}

def demathml(s):
    """Some journal-supplied titles arrive as MathML; flatten them to text."""
    if "<math" not in s:
        return s
    s = re.sub(r"<msqrt>(.*?)</msqrt>", lambda m: "√" + re.sub(r"<[^>]+>", "", m.group(1)), s, flags=re.S)
    s = re.sub(r"<[^>]+>", "", s)
    return re.sub(r"\s+", " ", s)

def delatex(s):
    """Turn INSPIRE's LaTeX titles into readable plain text."""
    s = demathml(s)
    s = s.replace("\\sqrt{s}", "√s").replace("\\sqrt s", "√s")
    s = re.sub(r"\\text(rm|it|bf)?\{([^}]*)\}", r"\2", s)
    s = re.sub(r"\\mathrm\{([^}]*)\}", r"\1", s)
    s = re.sub(r"\\bar\{([^}]*)\}", r"\1̄", s)
    s = re.sub(r"\\bar\s*(\w)", r"\1̄", s)
    for k, v in GREEK.items():
        s = re.sub(r"\\%s\b" % k, v, s)
    s = re.sub(r"\^\{?\+\}?", "⁺", s)
    s = re.sub(r"\^\{?-\}?", "⁻", s)
    s = re.sub(r"_\{?([0-9])\}?", lambda m: "₀₁₂₃₄₅₆₇₈₉"[int(m.group(1))], s)
    s = s.replace("~", " ").replace("\\,", " ").replace("\\;", " ")
    s = s.replace("$", "").replace("{", "").replace("}", "").replace("\\", "")
    return re.sub(r"\s+", " ", s).strip()

def short_author(full):
    # "Golling, Tobias" -> "T. Golling"
    if "," in full:
        last, first = [x.strip() for x in full.split(",", 1)]
    else:
        parts = full.split(); last, first = parts[-1], " ".join(parts[:-1])
    inits = " ".join(p[0] + "." for p in re.split(r"[\s\-]+", first) if p)
    # No highlighting markup here: the website bolds group members by matching
    # against the TEAM list in content.js, so there is one source of truth.
    return (inits + " " + last).strip()

def collaboration(m):
    """The collaboration that authored this, if any — never inferred from the
    number of authors (large multi-author papers are not collaboration papers)."""
    for c in m.get('collaborations', []):
        if c.get('value'):
            return "%s Collaboration" % c['value']
    return None

def authors_str(m):
    collab = collaboration(m)
    if collab:
        return collab
    names = [short_author(a['full_name']) for a in m.get('authors', [])]
    if len(names) > 10:
        names = names[:10] + ["et al."]
    return ", ".join(names)

def journal_str(m, fix=None, sub=None):
    pi = (m.get('publication_info') or [{}])[0]
    jt = pi.get('journal_title')
    if not jt and fix:
        pi, jt = fix, fix["journal_title"]
    if not jt:
        ap = m.get('arxiv_eprints')
        state = "submitted to %s" % sub if sub else "preprint"
        return "arXiv:%s (%s)" % (ap[0]['value'], state) if ap else ""
    s = jt
    if pi.get('journal_volume'): s += " %s" % pi['journal_volume']
    pg = pi.get('artid') or pi.get('page_start')
    if pg: s += ", %s" % pg
    if pi.get('year'): s += " (%s)" % pi['year']
    return s

def bibtex(m, key, fix=None):
    pi = (m.get('publication_info') or [{}])[0] or {}
    if not pi.get('journal_title') and fix:
        pi = fix
    title = m['titles'][0]['title'].replace("{","").replace("}","")
    collab = collaboration(m)
    auth = ("{%s}" % collab) if collab else \
           " and ".join(a['full_name'] for a in m.get('authors', [])[:10])
    lines = ["@article{%s," % key,
             "  title   = {{%s}}," % title,
             "  author  = {%s}," % auth]
    if pi.get('journal_title'): lines.append("  journal = {%s}," % pi['journal_title'])
    if pi.get('journal_volume'): lines.append("  volume  = {%s}," % pi['journal_volume'])
    yr = pi.get('year') or (m.get('earliest_date','')[:4])
    if yr: lines.append("  year    = {%s}," % yr)
    ap = m.get('arxiv_eprints')
    if ap: lines.append("  eprint  = {%s}," % ap[0]['value'])
    doi = m['dois'][0]['value'] if m.get('dois') else (fix or {}).get('doi')
    if doi: lines.append("  doi     = {%s}," % doi)
    lines.append("}")
    return "\n".join(lines)

def entry(m, cat, rid):
    ap = m.get('arxiv_eprints')
    cites = m.get('citation_count', 0)
    key = (m.get('texkeys') or ["inspire%d" % rid])[0]
    # Stands in only while INSPIRE has nothing of its own to say — see PUBLISHED.
    fix = PUBLISHED.get(rid) if not (m.get('publication_info') or m.get('dois')) else None
    sub = SUBMITTED.get(rid) if not (m.get('publication_info') or m.get('dois')) else None
    e = {
      "category": cat,
      "year": int((((m.get('publication_info') or [{}])[0].get('year'))
                   or (fix or {}).get('year') or m.get('earliest_date','0')[:4])),
      "title": delatex(m["titles"][0]["title"]),
      "authors": authors_str(m),
      "journal": journal_str(m, fix, sub),
      "citations": cites,
      "inspire": "https://inspirehep.net/literature/%d" % rid,
      "bibtex": bibtex(m, key, fix),
    }
    if cites >= 50: e["star"] = True
    if ap: e["arxiv"] = "https://arxiv.org/abs/%s" % ap[0]['value']
    doi = m['dois'][0]['value'] if m.get('dois') else (fix or {}).get('doi')
    if doi: e["doi"] = "https://doi.org/%s" % doi
    return e

# ---- assemble --------------------------------------------------------------
entries, used = [], set()
for frag, cat in SELECT:
    hit = None
    for h in OWN:
        t = h['metadata']['titles'][0]['title']
        if frag.lower() in t.lower() and h['id'] not in used:
            hit = h; break
    if not hit:
        print("!! NOT FOUND:", frag); continue
    used.add(hit['id'])
    entries.append(entry(hit['metadata'], cat, int(hit['id'])))

for rid, cat in ATLAS_IDS.items():
    entries.append(entry(fetch(rid), cat, rid))

entries += EXTRAS

entries.sort(key=lambda e: -e["year"])
print("total entries:", len(entries))
from collections import Counter
print(Counter(e["category"] for e in entries))
print("starred:", sum(1 for e in entries if e.get("star")))

def js(e):
    out = ["  {"]
    for k in ["category","year","title","authors","journal","citations","star",
              "arxiv","doi","inspire"]:
        if k not in e: continue
        v = e[k]
        if isinstance(v, bool): out.append("    %s: true," % k)
        elif isinstance(v, int): out.append("    %s: %d," % (k, v))
        else: out.append('    %s: %s,' % (k, json.dumps(v, ensure_ascii=False)))
    out.append("    bibtex: `%s`," % e["bibtex"].replace("\\","\\\\").replace("`","\\`").replace("${","\\${"))
    out.append("  },")
    return "\n".join(out)

ROOT = pathlib.Path(__file__).resolve().parent.parent
CONTENT = ROOT / "assets/js/content.js"

SMALL_URL = ("https://inspirehep.net/literature?sort=mostrecent&size=100&page=1"
             "&q=find%20a%20tobias%20golling&author_count=10%20authors%20or%20fewer")
ALL_URL = ("https://inspirehep.net/literature?sort=mostrecent&size=25&page=1"
           "&q=find%20a%20tobias%20golling")


def splice(text, marker, new_block, closer):
    """Replace `const NAME = ...` from its marker up to and including `closer`."""
    i = text.index(marker)
    j = text.index(closer, i) + len(closer)
    return text[:i] + new_block + text[j:]


def metrics_group(label, note, link, d):
    lines = [
        "    {",
        '      label: "%s",' % label,
        '      note: "%s",' % note,
        '      link: "%s",' % link,
        "      stats: [",
        '        { label: "Papers",    value: %d },' % d["papers"],
        '        { label: "Citations", value: %d },' % d["citations"],
        '        { label: "h-index",   value: %d },' % d["hindex"],
        "      ],",
        "    },",
    ]
    return "\n".join(lines)


def metrics_block(m, stamp):
    return "\n".join([
        "const METRICS = {",
        '  updated: "%s",' % stamp,
        "  groups: [",
        metrics_group("Papers with 10 or fewer authors",
                      "The group's own work, excluding large collaboration author lists.",
                      SMALL_URL, m["small"]),
        metrics_group("All publications", "Including ATLAS Collaboration papers.",
                      ALL_URL, m["all"]),
        "  ],",
        "};",
    ])


m = metrics()
stamp = datetime.date.today().strftime("%B %Y")

before = CONTENT.read_text()
text = splice(before, "const PUBLICATIONS = [",
              "const PUBLICATIONS = [\n" + "\n".join(js(e) for e in entries) + "\n];",
              "\n];")
text = splice(text, "const METRICS = {", metrics_block(m, stamp), "\n};")

# The date stamp alone changes every month, so compare everything except it —
# otherwise an unattended hourly run would churn out commits with no new data.
def _without_stamp(t):
    return re.sub(r'\n  updated: "[^"]*",', "", t)

if _without_stamp(text) == _without_stamp(before):
    print()
    print("no change — INSPIRE data is identical, leaving content.js alone")
    raise SystemExit(0)

CONTENT.write_text(text)

print()
print("content.js updated")
print("  publications        : %d selected papers" % len(entries))
print("  10 or fewer authors : %d papers, %d citations, h-index %d"
      % (m["small"]["papers"], m["small"]["citations"], m["small"]["hindex"]))
print("  all publications    : %d papers, %d citations, h-index %d"
      % (m["all"]["papers"], m["all"]["citations"], m["all"]["hindex"]))
print("  dated               : %s" % stamp)

# Bump the cache-busting version so the change reaches browsers straight away.
print()
import bump_version
bump_version.main()
