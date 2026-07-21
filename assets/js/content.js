/* ============================================================================
   CONTENT FILE  —  edit this file to update the site.
   ----------------------------------------------------------------------------
   This is the only file you need to touch to add a team member, a paper,
   or a news item. Keep the punctuation exactly as it appears: every entry is
   wrapped in { curly braces }, every field is "quoted", and entries are
   separated by commas.

   After editing, save and reload the page in your browser to check it.

   NOTE: the team list below was taken from the old DPNC page and may be out
   of date — please check names, roles and who has since left.
   ========================================================================== */


/* ---------------------------------------------------------------------------
   1. SITE BASICS — name, contact details, footer links.
   ------------------------------------------------------------------------ */
const SITE = {
  groupName: "RODEM",
  groupFull: "Robust Deep-learning for Experimental Machine-learning",
  tagline: "Machine learning for experimental particle physics at the LHC.",
  institution: "Département de Physique Nucléaire et Corpusculaire, University of Geneva",

  email: "rodem.unige@gmail.com",
  address: "24 quai Ernest-Ansermet, 1211 Geneva 4, Switzerland",

  // Footer links. Delete any line you don't want; add more in the same format.
  links: [
    { label: "GitHub",       url: "https://github.com/rodem-hep" },
    { label: "UniGe DPNC",   url: "https://www.unige.ch/dpnc/en/" },
    { label: "ATLAS at CERN", url: "https://atlas.cern/" },
  ],
};


/* ---------------------------------------------------------------------------
   2. TEAM
   ------------------------------------------------------------------------
   Members are shown grouped, in the order the groups appear below.

   photo: put image files in  images/team/  and write the filename here,
          e.g. "images/team/tobias-golling.jpg".
          Leave it as "" and the site shows a neat circle with the person's
          initials instead — so the page always looks finished, even with
          no photos yet. Square images around 600x600px work best.

   links: optional. Any of website / scholar / github / email / arxiv.
   ------------------------------------------------------------------------ */
const TEAM = [
  {
    group: "Principal Investigator",
    members: [
      {
        name: "Tobias Golling",
        role: "Professeur ordinaire",
        photo: "",
        blurb: "Experimental particle physics and machine learning; ATLAS experiment at CERN.",
        links: {
          website: "https://www.unige.ch/dpnc/en/groups/tobias-golling/",
          email: "tobias.golling@unige.ch",
        },
      },
    ],
  },
  {
    group: "Senior Researchers",
    members: [
      {
        name: "Johnny Raine",
        role: "Maître-assistant",
        photo: "",
        blurb: "Anomaly detection and data-driven background estimation for new physics searches.",
        links: {},
      },
    ],
  },
  {
    group: "Postdoctoral Researchers",
    members: [
      {
        name: "Kinga Anna Wozniak",
        role: "Postdoctoral Researcher",
        photo: "",
        blurb: "Unsupervised and anomaly-detection methods for collider data.",
        links: {},
      },
      {
        name: "Shohei Shirabe",
        role: "Postdoctoral Researcher",
        photo: "",
        blurb: "ATLAS physics analysis and detector performance.",
        links: {},
      },
    ],
  },
  {
    group: "PhD Students",
    members: [
      { name: "Malte Algren",      role: "PhD Student", photo: "", blurb: "Co-supervised with Prof. Voloshynovskiy.", links: {} },
      { name: "Mariia Drozdova",   role: "PhD Student", photo: "", blurb: "Co-supervised with Prof. Voloshynovskiy.", links: {} },
      { name: "Lukas Ehrke",       role: "PhD Student", photo: "", blurb: "", links: {} },
      { name: "Daigo Harada",      role: "PhD Student", photo: "", blurb: "", links: {} },
      { name: "Samuel Klein",      role: "PhD Student", photo: "", blurb: "Co-supervised with Prof. Voloshynovskiy.", links: {} },
      { name: "Matthew Leigh",     role: "PhD Student", photo: "", blurb: "", links: {} },
      { name: "Bálint Máté",       role: "PhD Student", photo: "", blurb: "Co-supervised with Prof. Fleuret.", links: {} },
      { name: "Ivan Oleksiyuk",    role: "PhD Student", photo: "", blurb: "Co-supervised with Prof. Voloshynovskiy.", links: {} },
      { name: "Guillaume Quétant", role: "PhD Student", photo: "", blurb: "Co-supervised with Prof. Voloshynovskiy.", links: {} },
      { name: "Tomke Schröer",     role: "PhD Student", photo: "", blurb: "Co-supervised with Prof. Voloshynovskiy.", links: {} },
    ],
  },
  {
    group: "Alumni",
    members: [
      // Alumni entries can keep it short — role doubles as "where they are now".
      { name: "Debajyoti Sengupta", role: "PhD, former group member", photo: "", blurb: "", links: {} },
    ],
  },
];


/* ---------------------------------------------------------------------------
   3. NEWS
   ------------------------------------------------------------------------
   Newest first. date is free text — "March 2026" or "2026-03-14" both fine.
   link is optional; delete the line if there's nothing to link to.
   ------------------------------------------------------------------------ */
const NEWS = [
  {
    date: "July 2026",
    title: "New group website",
    body: "The RODEM group website is online. Replace this item with your first real update.",
  },
  {
    date: "June 2026",
    title: "Example: new paper on arXiv",
    body: "A one- or two-sentence summary of the result, written for a general physics audience.",
    link: "https://arxiv.org/",
  },
  {
    date: "May 2026",
    title: "Example: new group member",
    body: "Welcome to our new PhD student, who will work on generative models for detector simulation.",
  },
];


/* ---------------------------------------------------------------------------
   4. PUBLICATIONS
   ------------------------------------------------------------------------
   Newest first. Put the group's authors in bold by wrapping the name in
   *asterisks*, e.g.  "A. Author, *T. Golling*, B. Author".

   Optional fields: journal, arxiv, doi, code. Delete any you don't need.

   These are EXAMPLES — replace them with the group's real papers, or link
   out to INSPIRE-HEP instead and delete the list entirely.
   ------------------------------------------------------------------------ */
const PUBLICATIONS = [
  {
    year: 2026,
    title: "Example: Robust anomaly detection for new physics searches",
    authors: "A. Author, B. Author, *T. Golling*",
    journal: "Physical Review D 000, 000000 (2026)",
    arxiv: "https://arxiv.org/",
    code: "https://github.com/rodem-hep",
  },
  {
    year: 2025,
    title: "Example: Generative models for fast calorimeter simulation",
    authors: "C. Author, *T. Golling*, D. Author",
    journal: "SciPost Physics (2025)",
    arxiv: "https://arxiv.org/",
  },
  {
    year: 2025,
    title: "Example: A third paper with no journal reference yet",
    authors: "*T. Golling*, E. Author",
    arxiv: "https://arxiv.org/",
  },
];
