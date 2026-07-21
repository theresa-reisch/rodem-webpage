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
 # anomaly detection & searches
 ("Strong CWoLa",                                   "anomaly"),
 ("TRANSIT your events",                            "anomaly"),
 ("Robust resonant anomaly detection with NPLM",    "anomaly"),
 ("Accelerating template generation",               "anomaly"),
 ("skycurtains",                                    "anomaly"),
 ("Cluster Scanning",                               "anomaly"),
 ("Improving new physics searches with diffusion",  "anomaly"),
 ("interplay of machine learning-based resonant",   "anomaly"),
 ("CURTAINs flows for flows",                       "anomaly"),
 ("The Mass-ive Issue",                             "anomaly"),
 ("Flow-enhanced transportation",                   "anomaly"),
 ("CURTAINs for your sliding window",               "anomaly"),
 ("Variational autoencoders for anomalous jet",     "anomaly"),
 ("Morphing one dataset into another",              "anomaly"),
 # generative models & simulation
 ("EPiC-ly Fast Particle Cloud Generation",         "generative"),
 ("Faster diffusion model with improved quality",   "generative"),
 ("PC-JeDi",                                        "generative"),
 ("Generating variable length full events",         "generative"),
 ("Turbo-Sim",                                      "generative"),
 ("Deep Generative Models for Fast Shower",         "generative"),
 ("Variational inference for pile-up removal",      "generative"),
 # foundation models & representation learning
 ("Is Tokenization Needed for Masked Particle",     "foundation"),
 ("Masked particle modeling on sets",               "foundation"),
 ("Large physics models",                           "foundation"),
 ("RODEM Jet Datasets",                             "foundation"),
 ("Mind the Gap",                                   "foundation"),
 # reconstruction, tagging & detector
 ("Fast and improved neutrino reconstruction",      "recon"),
 (r"\nu$-flows",                                    "recon"),
 ("Topological reconstruction of particle physics", "recon"),
 ("Hashing and metric learning",                    "recon"),
 ("Similarity hashing",                             "recon"),
 ("Decorrelation using optimal transport",          "recon"),
 ("Decorrelation with conditional normalizing",     "recon"),
 ("End-to-end optimal detector design",             "recon"),
 ("Enhancing generalization in high-energy",        "recon"),
 ("Flow Away your Differences",                     "recon"),
]

# ---- ATLAS papers the user asked for, by INSPIRE record id -----------------
ATLAS_IDS = {
 2926001: "recon",     # Transforming jet flavour tagging at ATLAS
 2923234: "recon",     # continuous calibration of flavour-tagging via optimal transport
 2605177: "recon",     # ATLAS flavour-tagging algorithms Run 2
 2880274: "anomaly",   # weakly supervised AD, dijet final state
}

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

def journal_str(m):
    pi = (m.get('publication_info') or [{}])[0]
    jt = pi.get('journal_title')
    if not jt:
        ap = m.get('arxiv_eprints')
        return "arXiv:%s (preprint)" % ap[0]['value'] if ap else ""
    s = jt
    if pi.get('journal_volume'): s += " %s" % pi['journal_volume']
    pg = pi.get('artid') or pi.get('page_start')
    if pg: s += ", %s" % pg
    if pi.get('year'): s += " (%s)" % pi['year']
    return s

def bibtex(m, key):
    pi = (m.get('publication_info') or [{}])[0]
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
    if m.get('dois'): lines.append("  doi     = {%s}," % m['dois'][0]['value'])
    lines.append("}")
    return "\n".join(lines)

def entry(m, cat, rid):
    ap = m.get('arxiv_eprints')
    cites = m.get('citation_count', 0)
    key = (m.get('texkeys') or ["inspire%d" % rid])[0]
    e = {
      "category": cat,
      "year": int((((m.get('publication_info') or [{}])[0].get('year')) or m.get('earliest_date','0')[:4])),
      "title": delatex(m["titles"][0]["title"]),
      "authors": authors_str(m),
      "journal": journal_str(m),
      "citations": cites,
      "inspire": "https://inspirehep.net/literature/%d" % rid,
      "bibtex": bibtex(m, key),
    }
    if cites >= 50: e["star"] = True
    if ap: e["arxiv"] = "https://arxiv.org/abs/%s" % ap[0]['value']
    if m.get('dois'): e["doi"] = "https://doi.org/%s" % m['dois'][0]['value']
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
