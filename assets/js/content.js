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
  groupSub: "Golling Group",
  institution: "Département de Physique Nucléaire et Corpusculaire, University of Geneva",

  email: "tobias.golling@unige.ch",
  address: "24 Quai Ernest-Ansermet, 1211 Geneva 4, Switzerland",

  // Footer links. Delete any line you don't want; add more in the same format.
  links: [
    { label: "GitHub",        url: "https://github.com/rodem-hep" },
    { label: "INSPIRE-HEP",   url: "https://inspirehep.net/authors/1030162" },
    { label: "UniGe DPNC",    url: "https://www.unige.ch/dpnc/en/" },
    { label: "ATLAS at CERN", url: "https://atlas.cern/" },
  ],
};


/* ---------------------------------------------------------------------------
   1b. NAVIGATION
   ------------------------------------------------------------------------
   The one place the menu is defined. Every page renders this list, so adding
   a tab is a one-line edit here rather than an edit to every HTML file.
   ------------------------------------------------------------------------ */
const NAV = [
  { label: "Home",     href: "index.html" },
  { label: "Vision",   href: "vision.html" },
  { label: "Research", href: "research.html" },
  { label: "Output",   href: "output.html" },
  { label: "Team",     href: "index.html#team" },
  { label: "News",     href: "news.html" },
  { label: "Join us",  href: "join.html" },
  { label: "Outreach", href: "outreach.html" },
];


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

   ORDER: you do not need to keep this file sorted. Each group is sorted
   automatically when the page is built — alphabetically by surname, except
   the Alumni group, which is marked  sort: "left"  and is ordered by year of
   departure, most recent first. Paste a new person anywhere in their group.
   ------------------------------------------------------------------------ */
const TEAM = [
  {
    group: "Principal Investigator",
    members: [
      {
        name: "Tobias Golling",
        role: "Professeur ordinaire",
        photo: "images/team/Tobias.png",
        blurb: "Experimental particle physics and machine learning; ATLAS experiment at CERN.",
        links: {
          cv: "cv.html",
          website: "https://www.unige.ch/dpnc/en/groups/tobias-golling/",
          email: "tobias.golling@unige.ch",
        },
      },
    ],
  },
  {
    group: "Postdoctoral Researchers",
    members: [
      {
        name: "Alexander Froch",
        role: "Postdoctoral Researcher",
        photo: "images/team/picture_Froch.jpg",
        blurb: "Flavour Tagging in ATLAS.",
        links: {},
      },
      {
        name: "Chris Scheulen",
        role: "Postdoctoral Researcher",
        photo: "images/team/Chris.jpg",
        blurb: "Foundation Models and ATLAS Pixel Operation.",
        links: {},
      },
      {
        name: "Kinga Anna Wozniak",
        role: "Postdoctoral Researcher",
        photo: "images/team/Kinga.jpg",
        photoPosition: "center top",
        blurb: "Optimal Detector Design for Future Experiments, Representation Learning and Alignment in HEP.",
        links: {},
      },
      {
        name: "André Aimé Atangana Likéné",
        role: "Postdoctoral Researcher",
        photo: "images/team/Andre.jpeg",
        blurb: "Part of the Swiss Government Excellence Scholarship. Decoding LHC exotics via amplitude analysis and deep learning.",
        links: {},
      },
      {
        name: "Gwen Gardner",
        role: "Postdoctoral Researcher",
        photo: "images/team/Gwen.jpg",
        blurb: "ATLAS ITk Upgrade Development and Boosted Higgs Analysis.",
        links: {},
      },
    ],
  },
  {
    group: "PhD Students",
    members: [
      { name: "Jona Ackerschott",   role: "PhD Student", photo: "images/team/Jona.jpg", blurb: "Anomaly Detection for Stellar Streams and Unfolding.", links: {} },
      { name: "Pradyun Hebbar",     role: "PhD Student", photo: "images/team/Pradyun.jpg", blurb: "Foundation Models and Agentic AI.", links: {} },
      { name: "Andreas Hermansen",  role: "PhD Student", photo: "images/team/Andreas.png", blurb: "AIPHY fellow. Co-supervised with Prof. Voloshynovskiy. Foundation Models and Event Reconstruction.", links: {} },
      { name: "Stephen Mulligan",   role: "PhD Student", photo: "images/team/Stephen.jpg", blurb: "Searches for New Physics and Optimal Detector Design.", links: {} },
      { name: "Ivan Oleksiyuk",     role: "PhD Student", photo: "images/team/Ivan.png", blurb: "Co-supervised with Prof. Voloshynovskiy. Searches for New Physics.", links: {} },
      { name: "Giovanni Ottaviano", role: "PhD Student", photo: "images/team/Giovanni.jpg", blurb: "AIPHY fellow. Co-supervised with Prof. Biau (Sorbonne University). Foundation Models and Agentic AI.", links: {} },
      { name: "Theresa Reisch",     role: "PhD Student", photo: "images/team/Theresa.png", blurb: "AIPHY fellow. Searches for New Physics and Flavour Tagging in ATLAS.", links: {} },
      { name: "Matej Repik",        role: "PhD Student", photo: "images/team/Matej.jpg", blurb: "ATLAS ITk Upgrade Development.", links: {} },
      { name: "Vincent Riechers",   role: "PhD Student", photo: "images/team/Vincent.jpg", blurb: "Optimal Detector Design.", links: {} },
      { name: "Franck Rothen",      role: "PhD Student", photo: "", blurb: "Uncertainty Aware Classification.", links: {} },
      { name: "Guillaume Quétant",      role: "PhD Student", photo: "images/team/Guillaume.jpg", blurb: "Co-supervised with Prof. Voloshynovskiy. Information Theory, Generative and Foundation Models.", links: {} },
    ],
  },
  {
    group: "Alumni",
    // Sorted by "left" (year of departure), most recent first, instead of by name.
    sort: "left",
    // Only the last two years are shown; everyone who left before then is
    // folded away behind the link below. Move showSince on as the years pass.
    showSince: 2024,
    moreLabel: "Earlier alumni",
    members: [
      // "left" is the year they finished/left. It is displayed automatically
      // next to the role — don't repeat it in the blurb. Use the blurb for
      // where they are now. Anyone without a "left" year is listed last.
      { name: "Malte Algren",       role: "PhD Student", photo: "images/team/Malte.png", left: 2026, blurb: "", links: {} },
      { name: "Tomke Schröer",      role: "PhD Student", photo: "images/team/Tomke.png", left: 2026, blurb: "", links: {} },
      { name: "Alexandra Kolev",      role: "Master Student", photo: "", left: 2025, blurb: " ", links: {} },
      { name: "Lucrezia Boccardo",      role: "Visiting PhD Student", photo: "", left: 2025, blurb: "PhD Student in Genoa.", links: {} },
      { name: "Yusong Tian",      role: "Postdoctoral Researcher", photo: "", left: 2025, blurb: " ", links: {} },
      { name: "Samuel Klein",       role: "PhD Student", photo: "images/team/Sam.png", left: 2025, blurb: "Now Postdoctoral Researcher at SLAC.", links: {} },
      { name: "Matthew Leigh",      role: "PhD Student", photo: "images/team/Matt.png", left: 2025, blurb: "Now ML-Researcher at Meta.", links: {} },
      { name: "Debajyoti Sengupta", role: "PhD Student", photo: "images/team/Deb.png", left: 2024, blurb: "Now Postdoctoral Researcher at EPFL.", links: {} },
      { name: "Lukas Ehrke",        role: "PhD Student", photo: "images/team/Lukas.png", left: 2023, blurb: "", links: {} },
      { name: "Johnny Raine",      role: "Postdoctoral Researcher", photo: "images/team/Johnny.png", left: 2024, blurb: " ", links: {} },
      { name: "Knut Zoch",      role: "Postdoctoral Researcher", photo: "images/team/Knut.png", left: 2023, blurb: "Now Postdoctoral Researcher at CERN.", links: {} },

      // From the DPNC former-members list. Roles, years and portraits as recorded
      // there: https://www.unige.ch/dpnc/en/groups/tobias-golling/members/former-members/
      { name: "Manuel Guth",             role: "Postdoctoral Researcher", photo: "images/team/alum-guth.jpg", left: 2023, blurb: "Feodor Lynen Research Fellow.", links: {} },
      { name: "Matthias Schlaffer",      role: "Postdoctoral Researcher", photo: "images/team/alum-schlaffer.jpg", left: 2022, blurb: "Feodor Lynen Research Fellow.", links: {} },
      { name: "Sabrina Amrouche",        role: "PhD Student",             photo: "images/team/alum-amrouche.jpg", left: 2021, blurb: "", links: {} },
      { name: "Dalila Salamani",         role: "PhD Student",             photo: "images/team/alum-salamani.jpg", left: 2021, blurb: "", links: {} },
      { name: "Takuya Nobe",             role: "Postdoctoral Researcher", photo: "", left: 2021, blurb: "JSPS Fellow.", links: {} },
      { name: "Sebastian Pina Otey",     role: "Postdoctoral Researcher", photo: "images/team/alum-pinaotey.jpg", left: 2021, blurb: "", links: {} },
      { name: "Dimitrios Proios",        role: "Master Student",          photo: "", left: 2021, blurb: "", links: {} },
      { name: "Moritz Kiehn",            role: "Postdoctoral Researcher", photo: "", left: 2020, blurb: "", links: {} },
      { name: "Oliver Majersky",         role: "PhD Student",             photo: "", left: 2020, blurb: "Cotutelle with Comenius University, Bratislava.", links: {} },
      { name: "Luiza Ciucu",             role: "Master Student",          photo: "", left: 2020, blurb: "", links: {} },
      { name: "Ece Akilli",              role: "PhD Student",             photo: "images/team/alum-akilli.jpg", left: 2019, blurb: "", links: {} },
      { name: "Marie Christine Lanfermann", role: "PhD Student",          photo: "images/team/alum-lanfermann.jpg", left: 2019, blurb: "", links: {} },
      { name: "Andrea Coccaro",          role: "Maître Assistant",        photo: "", left: 2017, blurb: "", links: {} },
      { name: "Olaf Nackenhorst",        role: "Postdoctoral Researcher", photo: "", left: 2017, blurb: "Feodor Lynen Research Fellow.", links: {} },
      { name: "Luis Ruiz",               role: "Postdoctoral Researcher", photo: "", left: 2017, blurb: "", links: {} },
      { name: "Federica Pasquali",       role: "Master Student",          photo: "", left: 2017, blurb: "", links: {} },

      // From before Geneva. He is also listed under Collaborators, because he
      // still is one.
      { name: "Dan Guest",               role: "PhD Student",             photo: "images/team/collab-guest.jpg", left: 2016, blurb: "PhD at Yale, before the group moved to Geneva. Now at Humboldt University of Berlin.", links: {} },
    ],
  },
  {
    // The principal investigators of the two networks the group belongs to:
    // AIPHY (the current MSCA doctoral network) and RODEM (the Sinergia
    // project the group is named after). Tobias Golling is a PI of both and is
    // listed at the top of this page instead of here.
    // Portraits are taken from the networks' own pages and the PIs' own sites.
    group: "Collaborators",
    members: [
      // AIPHY principal investigators. The whole network met at the Villa
      // Boninchi in February 2026, which is why they all carry that line.
      { name: "Anja Butter",       role: "Sorbonne University and CNRS",   photo: "images/team/collab-butter.jpg",   blurb: "AIPHY principal investigator. At the network week at the Villa Boninchi in Geneva.", links: {} },
      { name: "Gérard Biau",       role: "Sorbonne University",            photo: "images/team/collab-biau.jpg",     blurb: "AIPHY principal investigator. Co-supervises Giovanni Ottaviano. At the network week at the Villa Boninchi in Geneva.", links: {} },
      { name: "Stefano Carrazza",  role: "University of Milan",            photo: "images/team/collab-carrazza.jpg", blurb: "AIPHY principal investigator. At the network week at the Villa Boninchi in Geneva.", links: {} },
      { name: "Jürgen Hesser",     role: "Heidelberg University",          photo: "images/team/collab-hesser.jpg",   blurb: "AIPHY principal investigator. At the network week at the Villa Boninchi in Geneva.", links: {} },
      { name: "Troels Petersen",   role: "University of Copenhagen",       photo: "images/team/collab-petersen.jpg", blurb: "AIPHY principal investigator. At the network week at the Villa Boninchi in Geneva.", links: {} },
      { name: "Vincenzo Piuri",    role: "University of Milan",            photo: "images/team/collab-piuri.jpg",    blurb: "AIPHY principal investigator. At the network week at the Villa Boninchi in Geneva.", links: {} },
      { name: "Tilman Plehn",      role: "Heidelberg University",          photo: "images/team/collab-plehn.jpg",    blurb: "AIPHY principal investigator, in the group that coordinates the network. Spoke at the 2025 Villa Boninchi week.", links: {} },

      // RODEM principal investigators. Voloshynovskiy is a PI of both.
      { name: "Svyatoslav Voloshynovskiy", role: "University of Geneva",   photo: "images/team/collab-voloshynovskiy.jpg", blurb: "AIPHY and RODEM principal investigator, Computer Vision and Multimedia Laboratory. Co-supervises several of the group's PhD students. At the AIPHY network week at the Villa Boninchi.", links: {} },
      { name: "François Fleuret",  role: "University of Geneva",           photo: "images/team/collab-fleuret.jpg",  blurb: "RODEM principal investigator, Department of Computer Science. Co-supervises one of the group's PhD students.", links: {} },
      { name: "André Csillaghy",   role: "FHNW",                           photo: "images/team/collab-csillaghy.jpg", blurb: "RODEM principal investigator, Institute for Data Science. Solar flare analysis.", links: {} },

      // Long-standing collaborators outside the two networks. The work each one
      // is named for is the FORGE strand it belongs to on the research page.
      { name: "Michael Kagan",     role: "SLAC National Accelerator Laboratory", photo: "images/team/collab-kagan.jpg", blurb: "Co-author on the group's masked particle modelling papers. Spoke at the 2023 Villa Boninchi week.", links: {} },
      { name: "Lukas Heinrich",    role: "Technical University of Munich", photo: "images/team/collab-heinrich.jpg", blurb: "Co-author on the group's masked particle modelling papers. Spoke at the 2023 Villa Boninchi week.", links: {} },
      { name: "François Charton",  role: "Axiom Math",                     photo: "images/team/collab-charton.jpg",                                blurb: "Co-author on the group's masked particle modelling papers, and at the Villa Boninchi in Geneva.", links: {} },
      { name: "Margarita Osadchy", role: "University of Haifa",            photo: "images/team/collab-osadchy.jpg",                                blurb: "Co-author on the group's masked particle modelling papers.", links: {} },
      { name: "Sascha Caron",      role: "Radboud University and Nikhef",  photo: "images/team/collab-caron.jpg",    blurb: "Co-author on large physics models, and a speaker at the Villa Boninchi week.", links: {} },
      { name: "Jean-François Arguin", role: "Université de Montréal",      photo: "images/team/collab-arguin.jpg",   blurb: "Co-author on the group's anomalous jet tagging work and on BumpNet. Co-supervises Ethan Meszaros on the scalable discovery of new narrow resonances.", links: {} },
      { name: "Daniel Whiteson",   role: "University of California, Irvine", photo: "images/team/collab-whiteson.jpg",                              blurb: "Spoke at the 2023 Villa Boninchi week. An ongoing collaboration, with a shared doctoral student, on the scalable discovery of new narrow resonances at the LHC.", links: {} },
      { name: "Francesco Armando Di Bello", role: "University of Pisa",    photo: "",                                blurb: "Co-author on the group's optimisation work.", links: {} },
      { name: "Chris Pollard",     role: "University of Warwick",          photo: "images/team/collab-pollard.jpg",  blurb: "Co-author on the group's optimisation work.", links: {} },
      { name: "Jan Kieseler",      role: "Karlsruhe Institute of Technology", photo: "images/team/collab-kieseler.jpg",                             blurb: "Co-author on end-to-end optimal detector design, and at the Villa Boninchi in Geneva.", links: {} },
      { name: "Gaia Grosso",       role: "MIT and IAIFI",                  photo: "images/team/collab-grosso.jpg",                                blurb: "Co-author on the group's exploration work, and at the Villa Boninchi in Geneva.", links: {} },
      { name: "Ben Nachman",       role: "Lawrence Berkeley National Laboratory", photo: "images/team/collab-nachman.jpg",                         blurb: "Co-author on the group's exploration work.", links: {} },
      { name: "Dan Guest",         role: "Humboldt University of Berlin",  photo: "images/team/collab-guest.jpg", blurb: "Machine learning for flavour tagging in ATLAS. A former PhD student of the group, and at the 2023 Villa Boninchi week.", links: {} },
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
    kind: "spotlight",
    mark: "images/marks/curtain.svg",
    title: "Lifting the curtain: five years of CURTAINs",
    body: "A bump hunt needs a background estimate, and a background estimate normally needs a simulation you trust. CURTAINs, which stands for Constructing Unobserved Regions by Transforming Adjacent Intervals, does without one: it learns to transport events from the sidebands of a mass spectrum into the signal region, so the background template comes from the data itself. What began in 2022 as one method is now a family. CURTAINs F4F replaced the original transformation with a maximum-likelihood construction; FETA and TRANSIT attacked the same problem through optimal transport and fast interpolation to a new mass; SkyCURTAINs took the machinery out of particle physics entirely and pointed it at Gaia data, searching for stellar streams in the Milky Way. Along the way we compared our methods against everyone else's in a community paper on the interplay of resonant anomaly detection techniques. Nine papers from one idea, and the point of building a family of methods is that the next search does not start from zero.",
    link: "output.html?cat=e",
  },
  {
    date: "July 2026",
    title: "Hammers & Nails returns: Schloss Ringberg, 10–16 January 2027",
    body: "The next edition of Hammers & Nails will be held at Schloss Ringberg in Bavaria from 10 to 16 January 2027, a collaboration between the Weizmann Institute and the Max Planck Institute for Physics. The series began at Weizmann in 2017 and is the closest thing the field has to a place where machine learning researchers and physicists argue in the same room for a week. Tobias Golling has been on the scientific organising committee since the first edition, and led the 2023 Swiss edition at Monte Verità.",
    link: "https://conferences.weizmann.ac.il/SRitp/January2027/",
  },
  {
    date: "July 2026",
    title: "EuCAIFCon 2026: Heidelberg, 24–28 August",
    body: "The third European AI for Fundamental Physics Conference takes place at the Kirchhoff Institute for Physics in Heidelberg from 24 to 28 August 2026. EuCAIF is a joint activity of ECFA, NuPECC and APPEC; Tobias Golling was among the signatories of the founding expression of interest and co-leads its working group on foundation models. Pradyun Hebbar, Giovanni Ottaviano, Andreas Hermansen and Theresa Reisch have submitted abstracts.",
    link: "https://indico.physi.uni-heidelberg.de/event/1277/",
  },
  {
    date: "July 2026",
    title: "Group contributions to the CMS-ATLAS Flavour Tagging Workshop",
    body: "Alexander Froch gave the plenary summary of the ATLAS software and " +
          "flavour-tagging frameworks at the 2026 CMS-ATLAS Flavour Tagging Workshop " +
          "in Florence (6-10 July). Stephen Mulligan and Theresa Reisch also presented " +
          "ATLAS-internal talks at the workshop.",
    link: "https://indico.cern.ch/event/1593316/",
  },
  {
    date: "July 2026",
    title: "The group at the Nuit de la Science",
    body: "Members of the group took part in Geneva's Nuit de la Science on 4-5 July " +
          "2026 at the Parc de la Perle du Lac and the Musée d'histoire des sciences. " +
          "We ran a cloud chamber, letting visitors see cosmic-ray tracks appear in " +
          "real time, alongside a \"particle who's who\" guessing game introducing the " +
          "zoo of elementary particles. This year's edition was built around the theme " +
          "of shadows.",
    link: "https://www.geneve.ch/agenda/nuit-science-0",
  },
  {
    date: "July 2026",
    title: "New group website",
    body: "The group website is online.",
  },
  {
    date: "May 2026",
    title: "Workshop: ML opportunities for HEP in the era of agentic AI",
    body: "Tobias Golling organised a workshop on machine-learning opportunities " +
          "for high-energy physics in the era of agentic AI, held at the Villa " +
          "Boninchi in Geneva.",
  },
  {
    date: "October 2025",
    title: "G.IST workshop on computing challenges for future colliders",
    body: "Tobias Golling organised \"Computing Challenges and AI Opportunities " +
          "for Future Colliders\" for the Institut de Sciences Théoriques de " +
          "Genève (G.IST), at the Villa Boninchi in Geneva.",
  },
  {
    date: "October 2025",
    title: "Public lecture on AI and particle physics in Marseille",
    body: "Tobias Golling gave a public lecture on artificial intelligence and " +
          "high-energy physics in the CPPM conference series \"Mystères au cœur " +
          "de l'Univers et de la matière\" in Marseille.",
  },
  {
    date: "September 2025",
    title: "Build Big or Build Smart, Munich",
    body: "Tobias Golling served on the organising committee of \"Build Big or " +
          "Build Smart: Examining Scale and Domain Knowledge in Machine Learning " +
          "for Fundamental Physics\" in Munich.",
  },
  {
    date: "August 2025",
    title: "Fourth Women in Physics Career Symposium",
    body: "Tobias Golling was on the organising committee of the fourth edition " +
          "of the Women in Physics Career Symposium, held in Vienna. He has " +
          "coordinated the Swiss edition of the symposium since 2023.",
  },
  {
    date: "June 2025",
    title: "The group at EuCAIFCon 2025 in Cagliari",
    body: "Tobias Golling was on the organising committee of the second European " +
          "AI for Fundamental Physics Conference in Cagliari, where he also " +
          "organised the working group on foundation models, sat on the panel on " +
          "AI and fundamental physics, and presented \"Machine-learning-driven " +
          "anomaly detection in dijet events with ATLAS\".",
  },
  {
    date: "June 2025",
    title: "PhD school: Between Models and Reality",
    body: "Tobias Golling served on the scientific advisory committee of the " +
          "\"Between Models and Reality\" PhD school on machine learning in " +
          "physics, at the Niels Bohr Institute in Copenhagen.",
  },
  {
    date: "2025",
    title: "International Masterclasses in Geneva",
    body: "The group again hosted the International Masterclasses at the " +
          "University of Geneva, where school students spend a day analysing real " +
          "LHC data alongside physicists.",
  },
];


/* ---------------------------------------------------------------------------
   2b. CV  (shown on cv.html, linked from the PI's profile card)
   ------------------------------------------------------------------------
   Each section is a heading plus a list of { period, what, where } rows.
   "where" is optional. To add a section, copy a whole { title: ..., rows: [...] }
   block. Rows appear in the order written — newest first reads best.

   Source: CV_long.docx, the full CV supplied by Tobias in July 2026. The long
   lists below (talks, events, outreach) are the recent entries only — the full
   document has more. Everything here is copied from it, nothing invented.
   ------------------------------------------------------------------------ */
const CV = {
  name: "Tobias Golling",
  role: "Professeur ordinaire (Full Professor)",
  affiliation: "Département de Physique Nucléaire et Corpusculaire, University of Geneva",
  orcid: "0000-0001-8535-6687",

  sections: [
    {
      title: "Education",
      rows: [
        { period: "2005", what: "Ph.D. in Physics", where: "Bonn University" },
        { period: "2001", what: "Physics Diplom", where: "Heidelberg University" },
      ],
    },
    {
      title: "Appointments",
      rows: [
        { period: "since 2025", what: "Full Professor", where: "Université de Genève, DPNC" },
        { period: "2014–2025",  what: "Associate Professor", where: "Université de Genève, DPNC" },
        { period: "2014",       what: "Associate Professor", where: "Yale University, Department of Physics" },
        { period: "2009–2014",  what: "Assistant Professor", where: "Yale University, Department of Physics" },
        { period: "2005–2009",  what: "Postdoctoral Fellow", where: "Lawrence Berkeley National Laboratory" },
      ],
    },
    {
      title: "Prizes, awards and fellowships",
      rows: [
        { period: "2025",      what: "Breakthrough Prize in Fundamental Physics" },
        { period: "2013–2016", what: "Cottrell Scholar Fellow" },
        { period: "2012–2014", what: "Alfred P. Sloan Research Fellow" },
        { period: "2005–2007", what: "Feodor Lynen Research Fellow", where: "Alexander von Humboldt Foundation" },
        { period: "2006",      what: "Ph.D. prize", where: "Foundation of Physics and Astronomy in Bonn" },
        { period: "2004",      what: "Heinrich Hertz Fellowship", where: "for a research stay at Fermilab" },
      ],
    },
    {
      title: "ATLAS leadership",
      rows: [
        { period: "since 2020", what: "Team Leader", where: "Geneva ATLAS group" },
        { period: "since 2020", what: "Team Leader", where: "Geneva ATLAS ITk" },
        { period: "since 2018", what: "Institute Board representative", where: "Geneva ATLAS Pixel" },
        { period: "since 2014", what: "Editorial board chair", where: "final sign-off for ATLAS publications and notes" },
        { period: "2020–2022",  what: "Fast Simulation Chain convener" },
        { period: "2017–2019",  what: "Contact on Diversity and Inclusion" },
        { period: "2017–2018",  what: "Inner Detector alignment convener" },
        { period: "2013–2015",  what: "Exotics group convener" },
        { period: "2011–2013",  what: "Top-Exotics sub-group convener" },
        { period: "2010–2011",  what: "Data Quality coordinator" },
        { period: "2009–2010",  what: "Data Quality contact for the tracking group" },
        { period: "2008–2009",  what: "Monitoring coordinator for Inner Detector software" },
      ],
    },
    {
      title: "Service and leadership",
      rows: [
        { period: "since 2025", what: "Vice-President of the Physics Section", where: "Université de Genève" },
        { period: "since 2025", what: "President of the Conseil de Section", where: "Université de Genève" },
        { period: "since 2025", what: "Swiss National Contact for ATLAS" },
        { period: "since 2025", what: "Council Board member", where: "CHART" },
        { period: "since 2024", what: "Director", where: "Département de Physique Nucléaire et Corpusculaire" },
        { period: "since 2024", what: "WP4: AI", where: "JENA Computing" },
        { period: "since 2023", what: "Founding Board member", where: "EuCAIF, the European initiative for AI in fundamental physics" },
        { period: "since 2023", what: "Coordinator", where: "Swiss Women in Physics Career Symposium" },
        { period: "since 2022", what: "Executive Board member", where: "CHIPP" },
        { period: "since 2021", what: "Collaboration Board deputy", where: "Geneva FCC" },
        { period: "since 2021", what: "Reviewer", where: "NeurIPS" },
        { period: "since 2016", what: "Advisory board", where: "Machine Learning HEP school" },
        { period: "since 2009", what: "Journal referee", where: "PRL, EPJC, JHEP, Frontiers in AI, SciPost" },
      ],
    },
    {
      title: "Supervision and teaching",
      rows: [
        { period: "24", what: "PhD students supervised", where: "University of Geneva" },
        { period: "16", what: "Postdoctoral researchers supervised", where: "University of Geneva" },
        { period: "4",  what: "Master students supervised", where: "University of Geneva" },
        { period: "37", what: "Thesis committees, not as supervisor", where: "25 at Geneva, 12 as external member elsewhere" },
        { period: "since 2022", what: "Lecturer, Physics Applications of Artificial Intelligence", where: "master level course designed by TG" },
        { period: "since 2015", what: "Lecturer for Electrodynamique, Physique d'aujourd'hui and Physique générale", where: "bachelor level" },
      ],
    },
  ],
};


/* ---------------------------------------------------------------------------
   3b. TALKS
   ------------------------------------------------------------------------
   Grouped by year automatically (newest first) and filtered by "kind".

   Required : year, title, speaker, event
   Optional : date     free text shown next to the event, e.g. "14 March 2026"
              location "Geneva, Switzerland"
              kind     one of the labels in TALK_KINDS below — controls the
                       filter buttons and the little badge. Defaults to "Talk".
              slides / video / link   adds a button; delete what you don't have

   Copy the entry below to add a talk. An Indico link is a good "link" value.
   ------------------------------------------------------------------------ */
const TALK_KINDS = ["Invited", "Conference", "Seminar", "Lecture", "Poster"];

// The entries for Tobias Golling come from the "Selected invitations" section
// of his CV and go back to 2019; the full CV lists earlier ones too.
const TALKS = [
  {
    year: 2026,
    date: "7 July 2026",
    kind: "Conference",
    title: "Summary of software/FTAG frameworks ATLAS",
    speaker: "Alexander Froch",
    event: "2026 CMS-ATLAS Flavour Tagging Workshop",
    location: "Florence, Italy",
    link: "https://indico.cern.ch/event/1593316/timetable/?view=standard#24-summary-of-softwareftag-fra",
  },
  {
    year: 2026,
    date: "1 June 2026",
    kind: "Invited",
    title: "Seize the AI moment in HEP — an opportunity to rethink how we do physics",
    speaker: "Tobias Golling",
    event: "COMETA meeting",
    location: "Stockholm, Sweden",
  },
  {
    year: 2026,
    date: "27 April 2026",
    kind: "Seminar",
    title: "The AlphaFold moment that hasn't happened (yet) — AI meets the LHC",
    speaker: "Tobias Golling",
    event: "AISC Seminar",
    location: "Geneva, Switzerland",
  },
  {
    year: 2025,
    date: "11 October 2025",
    kind: "Invited",
    title: "AI and high-energy physics",
    speaker: "Tobias Golling",
    event: "Cycle de conférences « Mystères au cœur de l'Univers et de la matière »",
    location: "Marseille, France",
  },
  {
    year: 2025,
    date: "July 2025",
    kind: "Lecture",
    title: "Lecturer at the Como school on Advanced Artificial Intelligence for Precision HEP",
    speaker: "Tobias Golling",
    event: "Como School",
    location: "Como, Italy",
  },
  {
    year: 2025,
    date: "June 2025",
    kind: "Conference",
    title: "Machine-learning-driven anomaly detection in dijet events with ATLAS",
    speaker: "Tobias Golling",
    event: "EuCAIFCon 2025 — also panel on AI and fundamental physics, and organiser of the foundation-models working group",
    location: "Cagliari, Italy",
  },
  {
    year: 2025,
    date: "May 2025",
    kind: "Seminar",
    title: "Scientific discovery in the era of AI",
    speaker: "Tobias Golling",
    event: "UNIGE colloquium",
    location: "Geneva, Switzerland",
  },
  {
    year: 2025,
    date: "May 2025",
    kind: "Seminar",
    title: "Transformative potential of machine learning in high-energy physics",
    speaker: "Tobias Golling",
    event: "Seminar, University of Würzburg",
    location: "Würzburg, Germany",
  },
  {
    year: 2024,
    kind: "Seminar",
    title: "Scientific discovery in the era of AI",
    speaker: "Tobias Golling",
    event: "DPNC seminar",
    location: "Geneva, Switzerland",
  },
  {
    year: 2024,
    kind: "Invited",
    title: "Conditional generation — in the LHC context",
    speaker: "Tobias Golling",
    event: "PHYSTAT workshop « Statistics meets ML » in particle physics and astrophysics",
    location: "London, UK",
  },
  {
    year: 2024,
    kind: "Invited",
    title: "AI for future accelerators",
    speaker: "Tobias Golling",
    event: "Corfu 2024 workshop on future accelerators",
    location: "Corfu, Greece",
  },
  {
    year: 2024,
    kind: "Lecture",
    title: "Advanced deep learning",
    speaker: "Tobias Golling",
    event: "IN2P3 School of Statistics",
    location: "Carry-le-Rouet, France",
  },
  {
    year: 2024,
    kind: "Conference",
    title: "Working group on foundation models, and panel on AI infrastructure",
    speaker: "Tobias Golling",
    event: "EuCAIFCon 2024",
    location: "Amsterdam, Netherlands",
  },
  {
    year: 2024,
    kind: "Invited",
    title: "Accelerate discovery with AI",
    speaker: "Tobias Golling",
    event: "Symposium 20. Promotionspreis",
    location: "Bonn, Germany",
  },
  {
    year: 2023,
    kind: "Invited",
    title: "Optimal search strategy",
    speaker: "Tobias Golling",
    event: "ATLAS HDBS and Exotics 2023 workshop",
    location: "Barcelona, Spain",
  },
  {
    year: 2023,
    kind: "Seminar",
    title: "Automating and accelerating scientific discovery in HEP with generative models",
    speaker: "Tobias Golling",
    event: "Seminar, Research Center for Statistics, UNIGE",
    location: "Geneva, Switzerland",
  },
  {
    year: 2023,
    kind: "Lecture",
    title: "Bringing ML back to physics",
    speaker: "Tobias Golling",
    event: "ML in High Energy Physics Summer School",
    location: "Erice, Italy",
  },
  {
    year: 2023,
    kind: "Seminar",
    title: "Generative models — opportunities in particle physics",
    speaker: "Tobias Golling",
    event: "Seminar, University of Tokyo",
    location: "Tokyo, Japan",
  },
  {
    year: 2023,
    kind: "Invited",
    title: "Machine learning at HEP",
    speaker: "Tobias Golling",
    event: "International Conference on the Physics of the Two Infinities",
    location: "Kyoto, Japan",
  },
  {
    year: 2023,
    kind: "Invited",
    title: "Generative models in HEP",
    speaker: "Tobias Golling",
    event: "ML at HEP workshop, KEK",
    location: "Tsukuba, Japan",
  },
  {
    year: 2023,
    kind: "Lecture",
    title: "Collider physics",
    speaker: "Tobias Golling",
    event: "CHIPP Winter School of Particle Physics",
    location: "Leukerbad, Switzerland",
  },
  {
    year: 2022,
    kind: "Lecture",
    title: "Graph neural networks for HEP",
    speaker: "Tobias Golling",
    event: "Active Training Course « Advanced Deep Learning »",
    location: "Meinerzhagen, Germany",
  },
  {
    year: 2022,
    kind: "Conference",
    title: "ML in experimental HEP",
    speaker: "Tobias Golling",
    event: "ML4Jets 2022, Rutgers University",
    location: "New Jersey, USA",
  },
  {
    year: 2022,
    kind: "Invited",
    title: "Crash course in ML4HEP",
    speaker: "Tobias Golling",
    event: "ITK Weizmann workshop on machine learning and HEP",
    location: "Rehovot, Israel",
  },
  {
    year: 2022,
    kind: "Lecture",
    title: "ML at colliders",
    speaker: "Tobias Golling",
    event: "HEP graduate workshop",
    location: "Algeria",
  },
  {
    year: 2021,
    kind: "Invited",
    title: "Machine learning and particle physics",
    speaker: "Tobias Golling",
    event: "Physics Applications of AI Day, UNIGE",
    location: "Geneva, Switzerland",
  },
  {
    year: 2019,
    kind: "Invited",
    title: "Machine learning and particle physics",
    speaker: "Tobias Golling",
    event: "Computer Science Day, UNIGE",
    location: "Geneva, Switzerland",
  },
  {
    year: 2019,
    kind: "Invited",
    title: "Generative models in high energy physics",
    speaker: "Tobias Golling",
    event: "Artificial Intelligence for Science, Industry and Society",
    location: "Mexico City, Mexico",
  },
  {
    year: 2019,
    kind: "Invited",
    title: "Hashing and metric learning for track reconstruction",
    speaker: "Tobias Golling",
    event: "Artificial Intelligence for Science, Industry and Society",
    location: "Mexico City, Mexico",
  },
  {
    year: 2019,
    kind: "Invited",
    title: "Generative models in HEP",
    speaker: "Tobias Golling",
    event: "ITK Weizmann workshop on machine learning and HEP",
    location: "Rehovot, Israel",
  },
  {
    year: 2019,
    kind: "Invited",
    title: "Machine learning at ATLAS",
    speaker: "Tobias Golling",
    event: "Game of Flavours",
    location: "Dubrovnik, Croatia",
  },
  {
    year: 2019,
    kind: "Seminar",
    title: "Machine learning at ATLAS",
    speaker: "Tobias Golling",
    event: "Colloquium, University of Dortmund",
    location: "Dortmund, Germany",
  },
  {
    year: 2019,
    kind: "Seminar",
    title: "Machine learning at ATLAS",
    speaker: "Tobias Golling",
    event: "Colloquium, University of Heidelberg",
    location: "Heidelberg, Germany",
  },
];


/* ---------------------------------------------------------------------------
   3c. SEMINARS THE GROUP HOSTS
   ------------------------------------------------------------------------
   The other direction from TALKS: people the group invites to Geneva, rather
   than talks its own members give elsewhere. Grouped by year automatically,
   newest first.

   Required : year, date, title, speaker
   Optional : affiliation   shown after the speaker
              link          adds an "Event" tag pointing at the event page
              paper         adds a "Paper" tag, for a talk with an arXiv entry

   Set "link" only when the page is readable without an account. Much of the
   series lives in the department's Indico (partphys-indico.unige.ch), where
   many events are restricted; linking those would send most readers to a login
   screen, so those entries stay plain text and are reproduced here in full.
   The university's public agenda (agenda.unige.ch) is often a linkable
   alternative for the same event — prefer it when one exists.
   ------------------------------------------------------------------------ */
const SEMINARS = [
  {
    year: 2026, date: "16 March 2026",
    title: "Centaur Science: Adventures in AI+Physics",
    speaker: "Jesse Thaler", affiliation: "MIT and IAIFI",
    link: "https://agenda.unige.ch/events/view/45410",
  },
  {
    year: 2026, date: "22 January 2026",
    title: "Simulation-Based Inference",
    speaker: "Chris Pollard", affiliation: "University of Warwick",
  },
  {
    year: 2025, date: "15 December 2025",
    title: "Building the Theory-Experiment BSM Bridge",
    speaker: "Tim Cohen", affiliation: "University of Oregon",
  },
  {
    year: 2024, date: "18 June 2024",
    title: "An exploration of full-event unfolding with latent variational diffusion",
    speaker: "Kevin Greif", affiliation: "UC Irvine",
    paper: "https://arxiv.org/abs/2404.14332",
  },
  {
    year: 2023, date: "4 July 2023",
    title: "Goodness of fit by Neyman-Pearson testing " +
           "(anomaly detection, systematic uncertainties and DQM applications)",
    speaker: "Gaia Grosso", affiliation: "MIT and IAIFI",
  },
  {
    year: 2023, date: "8 June 2023",
    title: "Diffusion Generative Models in High Energy Physics",
    speaker: "Vinicius Mikuni", affiliation: "Berkeley Lab",
    paper: "https://arxiv.org/abs/2304.01266",
  },
];


/* ---------------------------------------------------------------------------
   4. PUBLICATION CATEGORIES
   ------------------------------------------------------------------------
   Papers are grouped on the page by research theme, in the order listed here.
   The "id" is the short code you write in each publication's category field.
   Add, rename or reorder freely — the filter buttons update automatically.
   ------------------------------------------------------------------------ */
const PUB_CATEGORIES = [
  { id: "f", letter: "F", name: "Foundation models",
    sub: "Pre-train once on collisions, fine-tune everywhere" },
  { id: "o", letter: "O", name: "Optimisation",
    sub: "Calibration, decorrelation, robustness, and the detector itself" },
  { id: "r", letter: "R", name: "Reconstruction",
    sub: "From detector signals to physics objects" },
  { id: "g", letter: "G", name: "Generation",
    sub: "Simulation at the speed the LHC actually needs" },
  { id: "e", letter: "E", name: "Exploration",
    sub: "Searching without knowing what to search for" },
];


/* ---------------------------------------------------------------------------
   4b. CITATION METRICS
   ------------------------------------------------------------------------
   Shown as a row of figures at the top of the publications page.

   Refresh these with:   python3 tools/update.py
   which prints the current values straight from INSPIRE-HEP.

   "Papers with 10 or fewer authors" isolates the group's own work from the
   large ATLAS Collaboration author lists.
   ------------------------------------------------------------------------ */
const METRICS = {
  updated: "August 2026",
  groups: [
    {
      label: "Papers with 10 or fewer authors",
      note: "The group's own work, excluding large collaboration author lists.",
      link: "https://inspirehep.net/literature?sort=mostrecent&size=100&page=1&q=find%20a%20tobias%20golling&author_count=10%20authors%20or%20fewer",
      stats: [
        { label: "Papers",    value: 57 },
        { label: "Citations", value: 1186 },
        { label: "h-index",   value: 18 },
      ],
    },
    {
      label: "All publications",
      note: "Including ATLAS Collaboration papers.",
      link: "https://inspirehep.net/literature?sort=mostrecent&size=25&page=1&q=find%20a%20tobias%20golling",
      stats: [
        { label: "Papers",    value: 1639 },
        { label: "Citations", value: 245544 },
        { label: "h-index",   value: 219 },
      ],
    },
  ],
};


/* ---------------------------------------------------------------------------
   5. PUBLICATIONS
   ------------------------------------------------------------------------
   Group members are bolded automatically: any author whose surname and first
   initial match someone in the TEAM list above (including Alumni) is
   highlighted. Just write the authors normally — "A. Author, T. Golling".
   To force bold for someone not on the team page, wrap them in *asterisks*.

   Required : category (an id from the list above), year, title, authors
   Optional : journal, arxiv, doi, code, bibtex
              star: true   -> marks the paper as a highlight (shows a ★)

   Within a category, papers are sorted newest first automatically.

   >>> This list was generated from INSPIRE-HEP (author T.Golling.1) and
   >>> contains real papers. Citation counts are a snapshot, not live.
   ------------------------------------------------------------------------ */
const PUBLICATIONS = [
  {
    category: "o",
    year: 2026,
    title: "On the Codesign of Scientific Experiments and Industrial Systems",
    authors: "MODE Collaboration",
    journal: "arXiv:2603.26613 (preprint)",
    citations: 2,
    arxiv: "https://arxiv.org/abs/2603.26613",
    inspire: "https://inspirehep.net/literature/3136149",
    bibtex: `@article{MODE:2026xoy,
  title   = {{On the Codesign of Scientific Experiments and Industrial Systems}},
  author  = {{MODE Collaboration}},
  year    = {2026},
  eprint  = {2603.26613},
}`,
  },
  {
    category: "e",
    year: 2026,
    title: "Strong CWoLa: binary classification without background simulation",
    authors: "S. Klein, M. Leigh, S. Mulligan, T. Golling",
    journal: "Mach.Learn.Sci.Tech. 7, 025013 (2026)",
    citations: 1,
    arxiv: "https://arxiv.org/abs/2503.14876",
    doi: "https://doi.org/10.1088/2632-2153/ae47b7",
    inspire: "https://inspirehep.net/literature/2902195",
    bibtex: `@article{Klein:2025lbj,
  title   = {{Strong CWoLa: binary classification without background simulation}},
  author  = {Klein, Samuel and Leigh, Matthew and Mulligan, Stephen and Golling, Tobias},
  journal = {Mach.Learn.Sci.Tech.},
  volume  = {7},
  year    = {2026},
  eprint  = {2503.14876},
  doi     = {10.1088/2632-2153/ae47b7},
}`,
  },
  {
    category: "r",
    year: 2026,
    title: "Transforming jet flavour tagging at ATLAS",
    authors: "ATLAS Collaboration",
    journal: "Nature Commun. 17, 541 (2026)",
    citations: 113,
    star: true,
    arxiv: "https://arxiv.org/abs/2505.19689",
    doi: "https://doi.org/10.1038/s41467-025-65059-6",
    inspire: "https://inspirehep.net/literature/2926001",
    bibtex: `@article{ATLAS:2025dkv,
  title   = {{Transforming jet flavour tagging at ATLAS}},
  author  = {{ATLAS Collaboration}},
  journal = {Nature Commun.},
  volume  = {17},
  year    = {2026},
  eprint  = {2505.19689},
  doi     = {10.1038/s41467-025-65059-6},
}`,
  },
  {
    category: "other",
    year: 2026,
    title: "Systematic study of fully heavy-flavored tetraquarks Q₁Q₂Q̄₁Q̄₂ (Q₁,₂ ∈ {b,c}): Mass spectra, threshold analysis, and confrontation with LHC data",
    authors: "A. A. Atangana Likéné, F. Rothen, D. Nga Ongodo, G. H. Ben-Bolie, T. Golling",
    journal: "Phys.Rev.D (accepted 2026)",
    citations: 0,
    doi: "https://doi.org/10.1103/y15p-jk18",
    bibtex: `@article{AtanganaLikene:2026tetra,
  title   = {{Systematic study of fully heavy-flavored tetraquarks $Q_1 Q_2 \\bar{Q}_1 \\bar{Q}_2$ ($Q_{1,2} \\in \\{b,c\\}$): Mass spectra, threshold analysis, and confrontation with LHC data}},
  author  = {Atangana Lik\\'en\\'e, A. A. and Rothen, F. and Nga Ongodo, D. and Ben-Bolie, G. H. and Golling, Tobias},
  journal = {Phys. Rev. D},
  year    = {2026},
  doi     = {10.1103/y15p-jk18},
}`,
  },
  {
    category: "f",
    year: 2025,
    title: "Is Tokenization Needed for Masked Particle Modelling?",
    authors: "M. Leigh, S. Klein, F. Charton, T. Golling, L. Heinrich, M. Kagan, I. Ochoa, M. Osadchy",
    journal: "Mach.Learn.Sci.Tech. 6, 025075 (2025)",
    citations: 30,
    arxiv: "https://arxiv.org/abs/2409.12589",
    doi: "https://doi.org/10.1088/2632-2153/addb98",
    inspire: "https://inspirehep.net/literature/2830443",
    bibtex: `@article{Leigh:2024ked,
  title   = {{Is Tokenization Needed for Masked Particle Modelling?}},
  author  = {Leigh, Matthew and Klein, Samuel and Charton, François and Golling, Tobias and Heinrich, Lukas and Kagan, Michael and Ochoa, Inês and Osadchy, Margarita},
  journal = {Mach.Learn.Sci.Tech.},
  volume  = {6},
  year    = {2025},
  eprint  = {2409.12589},
  doi     = {10.1088/2632-2153/addb98},
}`,
  },
  {
    category: "f",
    year: 2025,
    title: "Large physics models: towards a collaborative approach with large language models and foundation models",
    authors: "K. G. Barman, S. Caron, E. Sullivan, H. W. de Regt, R. R. de Austri, M. Boon, M. Färber, S. Fröse, T. Golling, L. G. Lopez, et al.",
    journal: "Eur.Phys.J.C 85, 1066 (2025)",
    citations: 17,
    arxiv: "https://arxiv.org/abs/2501.05382",
    doi: "https://doi.org/10.1140/epjc/s10052-025-14707-8",
    inspire: "https://inspirehep.net/literature/2866594",
    bibtex: `@article{Barman:2025wfb,
  title   = {{Large physics models: towards a collaborative approach with large language models and foundation models}},
  author  = {Barman, Kristian G. and Caron, Sascha and Sullivan, Emily and de Regt, Henk W. and de Austri, Roberto Ruiz and Boon, Mieke and Färber, Michael and Fröse, Stefan and Golling, Tobias and Lopez, Luis G.},
  journal = {Eur.Phys.J.C},
  volume  = {85},
  year    = {2025},
  eprint  = {2501.05382},
  doi     = {10.1140/epjc/s10052-025-14707-8},
}`,
  },
  {
    category: "o",
    year: 2025,
    title: "Mind the Gap: Navigating Inference with Optimal Transport Maps",
    authors: "M. Algren, T. Golling, F. A. Di Bello, C. Pollard",
    journal: "arXiv:2507.08867 (preprint)",
    citations: 3,
    arxiv: "https://arxiv.org/abs/2507.08867",
    inspire: "https://inspirehep.net/literature/2945883",
    bibtex: `@article{Algren:2025zff,
  title   = {{Mind the Gap: Navigating Inference with Optimal Transport Maps}},
  author  = {Algren, Malte and Golling, Tobias and Di Bello, Francesco Armando and Pollard, Christopher},
  year    = {2025},
  eprint  = {2507.08867},
}`,
  },
  {
    category: "o",
    year: 2025,
    title: "End-to-end optimal detector design with mutual information surrogates",
    authors: "K. A. Woźniak, S. Mulligan, J. Kieseler, M. Klute, F. Fleuret, T. Golling",
    journal: "Mach.Learn.Sci.Tech. 6, 045047 (2025)",
    citations: 4,
    arxiv: "https://arxiv.org/abs/2503.14342",
    doi: "https://doi.org/10.1088/2632-2153/ae1acb",
    inspire: "https://inspirehep.net/literature/2901533",
    bibtex: `@article{Wozniak:2025ttb,
  title   = {{End-to-end optimal detector design with mutual information surrogates}},
  author  = {Woźniak, Kinga Anna and Mulligan, Stephen and Kieseler, Jan and Klute, Markus and Fleuret, François and Golling, Tobias},
  journal = {Mach.Learn.Sci.Tech.},
  volume  = {6},
  year    = {2025},
  eprint  = {2503.14342},
  doi     = {10.1088/2632-2153/ae1acb},
}`,
  },
  {
    category: "o",
    year: 2025,
    title: "Enhancing generalization in high-energy physics using white-box adversarial attacks",
    authors: "F. Rothen, S. Klein, M. Leigh, T. Golling",
    journal: "Phys.Rev.D 112, 016004 (2025)",
    citations: 1,
    arxiv: "https://arxiv.org/abs/2411.09296",
    doi: "https://doi.org/10.1103/PhysRevD.112.016004",
    inspire: "https://inspirehep.net/literature/2848337",
    bibtex: `@article{Rothen:2024vro,
  title   = {{Enhancing generalization in high-energy physics using white-box adversarial attacks}},
  author  = {Rothen, Franck and Klein, Samuel and Leigh, Matthew and Golling, Tobias},
  journal = {Phys.Rev.D},
  volume  = {112},
  year    = {2025},
  eprint  = {2411.09296},
  doi     = {10.1103/PhysRevD.112.016004},
}`,
  },
  {
    category: "r",
    year: 2025,
    title: "Variational inference for pile-up removal at hadron colliders with diffusion models",
    authors: "M. Algren, T. Golling, C. Pollard, J. A. Raine",
    journal: "Phys.Rev.D 111, 116010 (2025)",
    citations: 4,
    arxiv: "https://arxiv.org/abs/2410.22074",
    doi: "https://doi.org/10.1103/PhysRevD.111.116010",
    inspire: "https://inspirehep.net/literature/2843524",
    bibtex: `@article{Algren:2024bqw,
  title   = {{Variational inference for pile-up removal at hadron colliders with diffusion models}},
  author  = {Algren, Malte and Golling, Tobias and Pollard, Christopher and Raine, John Andrew},
  journal = {Phys.Rev.D},
  volume  = {111},
  year    = {2025},
  eprint  = {2410.22074},
  doi     = {10.1103/PhysRevD.111.116010},
}`,
  },
  {
    category: "e",
    year: 2025,
    title: "TRANSIT your events into a new mass: fast background interpolation for weakly-supervised anomaly searches",
    authors: "I. Oleksiyuk, S. Voloshynovskiy, T. Golling",
    journal: "JHEP 07, 177 (2025)",
    citations: 2,
    arxiv: "https://arxiv.org/abs/2503.04342",
    doi: "https://doi.org/10.1007/JHEP07(2025)177",
    inspire: "https://inspirehep.net/literature/2897391",
    bibtex: `@article{Oleksiyuk:2025pmu,
  title   = {{TRANSIT your events into a new mass: fast background interpolation for weakly-supervised anomaly searches}},
  author  = {Oleksiyuk, Ivan and Voloshynovskiy, Svyatoslav and Golling, Tobias},
  journal = {JHEP},
  volume  = {07},
  year    = {2025},
  eprint  = {2503.04342},
  doi     = {10.1007/JHEP07(2025)177},
}`,
  },
  {
    category: "e",
    year: 2025,
    title: "Robust resonant anomaly detection with NPLM",
    authors: "G. Grosso, D. Sengupta, T. Golling, P. Harris",
    journal: "Eur.Phys.J.C 85, 1074 (2025)",
    citations: 2,
    arxiv: "https://arxiv.org/abs/2501.01778",
    doi: "https://doi.org/10.1140/epjc/s10052-025-14759-w",
    inspire: "https://inspirehep.net/literature/2864831",
    bibtex: `@article{Grosso:2025kmt,
  title   = {{Robust resonant anomaly detection with NPLM}},
  author  = {Grosso, Gaia and Sengupta, Debajyoti and Golling, Tobias and Harris, Philip},
  journal = {Eur.Phys.J.C},
  volume  = {85},
  year    = {2025},
  eprint  = {2501.01778},
  doi     = {10.1140/epjc/s10052-025-14759-w},
}`,
  },
  {
    category: "e",
    year: 2025,
    title: "Accelerating template generation in resonant anomaly detection searches with optimal transport",
    authors: "M. Leigh, D. Sengupta, B. Nachman, T. Golling",
    journal: "JHEP 12, 105 (2025)",
    citations: 9,
    arxiv: "https://arxiv.org/abs/2407.19818",
    doi: "https://doi.org/10.1007/JHEP12(2025)105",
    inspire: "https://inspirehep.net/literature/2811664",
    bibtex: `@article{Leigh:2024chm,
  title   = {{Accelerating template generation in resonant anomaly detection searches with optimal transport}},
  author  = {Leigh, Matthew and Sengupta, Debajyoti and Nachman, Benjamin and Golling, Tobias},
  journal = {JHEP},
  volume  = {12},
  year    = {2025},
  eprint  = {2407.19818},
  doi     = {10.1007/JHEP12(2025)105},
}`,
  },
  {
    category: "o",
    year: 2025,
    title: "A continuous calibration of the ATLAS flavour-tagging classifiers via optimal transportation maps",
    authors: "ATLAS Collaboration",
    journal: "Eur.Phys.J.C 85, 1272 (2025)",
    citations: 11,
    arxiv: "https://arxiv.org/abs/2505.13063",
    doi: "https://doi.org/10.1140/epjc/s10052-025-14682-0",
    inspire: "https://inspirehep.net/literature/2923234",
    bibtex: `@article{ATLAS:2025rbr,
  title   = {{A continuous calibration of the ATLAS flavour-tagging classifiers via optimal transportation maps}},
  author  = {{ATLAS Collaboration}},
  journal = {Eur.Phys.J.C},
  volume  = {85},
  year    = {2025},
  eprint  = {2505.13063},
  doi     = {10.1140/epjc/s10052-025-14682-0},
}`,
  },
  {
    category: "e",
    year: 2025,
    title: "Weakly supervised anomaly detection for resonant new physics in the dijet final state using proton-proton collisions at √s=13 TeV with the ATLAS detector",
    authors: "ATLAS Collaboration",
    journal: "Phys.Rev.D 112, 072009 (2025)",
    citations: 36,
    arxiv: "https://arxiv.org/abs/2502.09770",
    doi: "https://doi.org/10.1103/2yq5-vj59",
    inspire: "https://inspirehep.net/literature/2880274",
    bibtex: `@article{ATLAS:2025obc,
  title   = {{Weakly supervised anomaly detection for resonant new physics in the dijet final state using proton-proton collisions at <math display="inline"><msqrt><mi>s</mi></msqrt><mo>=</mo><mn>13</mn><mtext> </mtext><mtext> </mtext><mi>TeV</mi></math> with the ATLAS detector}},
  author  = {{ATLAS Collaboration}},
  journal = {Phys.Rev.D},
  volume  = {112},
  year    = {2025},
  eprint  = {2502.09770},
  doi     = {10.1103/2yq5-vj59},
}`,
  },
  {
    category: "f",
    year: 2024,
    title: "Masked particle modeling on sets: towards self-supervised high energy physics foundation models",
    authors: "T. Golling, L. Heinrich, M. Kagan, S. Klein, M. Leigh, M. Osadchy, J. A. Raine",
    journal: "Mach.Learn.Sci.Tech. 5, 035074 (2024)",
    citations: 76,
    star: true,
    arxiv: "https://arxiv.org/abs/2401.13537",
    doi: "https://doi.org/10.1088/2632-2153/ad64a8",
    inspire: "https://inspirehep.net/literature/2750977",
    bibtex: `@article{Golling:2024abg,
  title   = {{Masked particle modeling on sets: towards self-supervised high energy physics foundation models}},
  author  = {Golling, Tobias and Heinrich, Lukas and Kagan, Michael and Klein, Samuel and Leigh, Matthew and Osadchy, Margarita and Raine, John Andrew},
  journal = {Mach.Learn.Sci.Tech.},
  volume  = {5},
  year    = {2024},
  eprint  = {2401.13537},
  doi     = {10.1088/2632-2153/ad64a8},
}`,
  },
  {
    category: "f",
    year: 2024,
    title: "RODEM Jet Datasets",
    authors: "K. Zoch, J. A. Raine, D. Sengupta, T. Golling",
    journal: "arXiv:2408.11616 (preprint)",
    citations: 4,
    arxiv: "https://arxiv.org/abs/2408.11616",
    inspire: "https://inspirehep.net/literature/2820291",
    bibtex: `@article{Zoch:2024eyp,
  title   = {{RODEM Jet Datasets}},
  author  = {Zoch, Knut and Raine, John Andrew and Sengupta, Debajyoti and Golling, Tobias},
  year    = {2024},
  eprint  = {2408.11616},
}`,
  },
  {
    category: "o",
    year: 2024,
    title: "Decorrelation using optimal transport",
    authors: "M. Algren, J. A. Raine, T. Golling",
    journal: "Eur.Phys.J.C 84, 579 (2024)",
    citations: 10,
    arxiv: "https://arxiv.org/abs/2307.05187",
    doi: "https://doi.org/10.1140/epjc/s10052-024-12868-6",
    inspire: "https://inspirehep.net/literature/2675995",
    bibtex: `@article{Algren:2023spv,
  title   = {{Decorrelation using optimal transport}},
  author  = {Algren, Malte and Raine, John Andrew and Golling, Tobias},
  journal = {Eur.Phys.J.C},
  volume  = {84},
  year    = {2024},
  eprint  = {2307.05187},
  doi     = {10.1140/epjc/s10052-024-12868-6},
}`,
  },
  {
    category: "r",
    year: 2024,
    title: "Fast and improved neutrino reconstruction in multineutrino final states with conditional normalizing flows",
    authors: "J. A. Raine, M. Leigh, K. Zoch, T. Golling",
    journal: "Phys.Rev.D 109, 012005 (2024)",
    citations: 30,
    arxiv: "https://arxiv.org/abs/2307.02405",
    doi: "https://doi.org/10.1103/PhysRevD.109.012005",
    inspire: "https://inspirehep.net/literature/2674368",
    bibtex: `@article{Raine:2023fko,
  title   = {{Fast and improved neutrino reconstruction in multineutrino final states with conditional normalizing flows}},
  author  = {Raine, John Andrew and Leigh, Matthew and Zoch, Knut and Golling, Tobias},
  journal = {Phys.Rev.D},
  volume  = {109},
  year    = {2024},
  eprint  = {2307.02405},
  doi     = {10.1103/PhysRevD.109.012005},
}`,
  },
  {
    category: "g",
    year: 2024,
    title: "Faster diffusion model with improved quality for particle cloud generation",
    authors: "M. Leigh, D. Sengupta, J. A. Raine, G. Quétant, T. Golling",
    journal: "Phys.Rev.D 109, 012010 (2024)",
    citations: 45,
    arxiv: "https://arxiv.org/abs/2307.06836",
    doi: "https://doi.org/10.1103/PhysRevD.109.012010",
    inspire: "https://inspirehep.net/literature/2676593",
    bibtex: `@article{Leigh:2023zle,
  title   = {{Faster diffusion model with improved quality for particle cloud generation}},
  author  = {Leigh, Matthew and Sengupta, Debajyoti and Raine, John Andrew and Quétant, Guillaume and Golling, Tobias},
  journal = {Phys.Rev.D},
  volume  = {109},
  year    = {2024},
  eprint  = {2307.06836},
  doi     = {10.1103/PhysRevD.109.012010},
}`,
  },
  {
    category: "g",
    year: 2024,
    title: "PC-JeDi: Diffusion for particle cloud generation in high energy physics",
    authors: "M. Leigh, D. Sengupta, G. Quétant, J. A. Raine, K. Zoch, T. Golling",
    journal: "SciPost Phys. 16, 018 (2024)",
    citations: 77,
    star: true,
    arxiv: "https://arxiv.org/abs/2303.05376",
    doi: "https://doi.org/10.21468/SciPostPhys.16.1.018",
    inspire: "https://inspirehep.net/literature/2640034",
    bibtex: `@article{Leigh:2023toe,
  title   = {{PC-JeDi: Diffusion for particle cloud generation in high energy physics}},
  author  = {Leigh, Matthew and Sengupta, Debajyoti and Quétant, Guillaume and Raine, John Andrew and Zoch, Knut and Golling, Tobias},
  journal = {SciPost Phys.},
  volume  = {16},
  year    = {2024},
  eprint  = {2303.05376},
  doi     = {10.21468/SciPostPhys.16.1.018},
}`,
  },
  {
    category: "g",
    year: 2024,
    title: "Generating variable length full events from partons",
    authors: "G. Quétant, J. A. Raine, M. Leigh, D. Sengupta, T. Golling",
    journal: "Phys.Rev.D 110, 076023 (2024)",
    citations: 22,
    arxiv: "https://arxiv.org/abs/2406.13074",
    doi: "https://doi.org/10.1103/PhysRevD.110.076023",
    inspire: "https://inspirehep.net/literature/2800561",
    bibtex: `@article{Quetant:2024ftg,
  title   = {{Generating variable length full events from partons}},
  author  = {Quétant, Guillaume and Raine, John Andrew and Leigh, Matthew and Sengupta, Debajyoti and Golling, Tobias},
  journal = {Phys.Rev.D},
  volume  = {110},
  year    = {2024},
  eprint  = {2406.13074},
  doi     = {10.1103/PhysRevD.110.076023},
}`,
  },
  {
    category: "e",
    year: 2024,
    title: "skycurtains: model-agnostic search for stellar streams with Gaia data",
    authors: "D. Sengupta, S. Mulligan, D. Shih, J. A. Raine, T. Golling",
    journal: "Mon.Not.Roy.Astron.Soc. 536, 1104 (2024)",
    citations: 10,
    arxiv: "https://arxiv.org/abs/2405.12131",
    doi: "https://doi.org/10.1093/mnras/stae2570",
    inspire: "https://inspirehep.net/literature/2788773",
    bibtex: `@article{Sengupta:2024ezl,
  title   = {{skycurtains: model-agnostic search for stellar streams with Gaia data}},
  author  = {Sengupta, Debajyoti and Mulligan, Stephen and Shih, David and Raine, John Andrew and Golling, Tobias},
  journal = {Mon.Not.Roy.Astron.Soc.},
  volume  = {536},
  year    = {2024},
  eprint  = {2405.12131},
  doi     = {10.1093/mnras/stae2570},
}`,
  },
  {
    category: "e",
    year: 2024,
    title: "Cluster Scanning: a novel approach to resonance searches",
    authors: "I. Oleksiyuk, J. A. Raine, M. Krämer, S. Voloshynovskiy, T. Golling",
    journal: "JHEP 06, 163 (2024)",
    citations: 3,
    arxiv: "https://arxiv.org/abs/2402.17714",
    doi: "https://doi.org/10.1007/JHEP06(2024)163",
    inspire: "https://inspirehep.net/literature/2762114",
    bibtex: `@article{Oleksiyuk:2024hru,
  title   = {{Cluster Scanning: a novel approach to resonance searches}},
  author  = {Oleksiyuk, Ivan and Raine, John Andrew and Krämer, Michael and Voloshynovskiy, Svyatoslav and Golling, Tobias},
  journal = {JHEP},
  volume  = {06},
  year    = {2024},
  eprint  = {2402.17714},
  doi     = {10.1007/JHEP06(2024)163},
}`,
  },
  {
    category: "e",
    year: 2024,
    title: "Improving new physics searches with diffusion models for event observables and jet constituents",
    authors: "D. Sengupta, M. Leigh, J. A. Raine, S. Klein, T. Golling",
    journal: "JHEP 04, 109 (2024)",
    citations: 23,
    arxiv: "https://arxiv.org/abs/2312.10130",
    doi: "https://doi.org/10.1007/JHEP04(2024)109",
    inspire: "https://inspirehep.net/literature/2738159",
    bibtex: `@article{Sengupta:2023vtm,
  title   = {{Improving new physics searches with diffusion models for event observables and jet constituents}},
  author  = {Sengupta, Debajyoti and Leigh, Matthew and Raine, John Andrew and Klein, Samuel and Golling, Tobias},
  journal = {JHEP},
  volume  = {04},
  year    = {2024},
  eprint  = {2312.10130},
  doi     = {10.1007/JHEP04(2024)109},
}`,
  },
  {
    category: "e",
    year: 2024,
    title: "The interplay of machine learning-based resonant anomaly detection methods",
    authors: "T. Golling, G. Kasieczka, C. Krause, R. Mastandrea, B. Nachman, J. A. Raine, D. Sengupta, D. Shih, M. Sommerhalder",
    journal: "Eur.Phys.J.C 84, 241 (2024)",
    citations: 41,
    arxiv: "https://arxiv.org/abs/2307.11157",
    doi: "https://doi.org/10.1140/epjc/s10052-024-12607-x",
    inspire: "https://inspirehep.net/literature/2679275",
    bibtex: `@article{Golling:2023yjq,
  title   = {{The interplay of machine learning-based resonant anomaly detection methods}},
  author  = {Golling, Tobias and Kasieczka, Gregor and Krause, Claudius and Mastandrea, Radha and Nachman, Benjamin and Raine, John Andrew and Sengupta, Debajyoti and Shih, David and Sommerhalder, Manuel},
  journal = {Eur.Phys.J.C},
  volume  = {84},
  year    = {2024},
  eprint  = {2307.11157},
  doi     = {10.1140/epjc/s10052-024-12607-x},
}`,
  },
  {
    category: "e",
    year: 2024,
    title: "CURTAINs flows for flows: Constructing unobserved regions with maximum likelihood estimation",
    authors: "D. Sengupta, S. Klein, J. A. Raine, T. Golling",
    journal: "SciPost Phys. 17, 046 (2024)",
    citations: 50,
    star: true,
    arxiv: "https://arxiv.org/abs/2305.04646",
    doi: "https://doi.org/10.21468/SciPostPhys.17.2.046",
    inspire: "https://inspirehep.net/literature/2657626",
    bibtex: `@article{Sengupta:2023xqy,
  title   = {{CURTAINs flows for flows: Constructing unobserved regions with maximum likelihood estimation}},
  author  = {Sengupta, Debajyoti and Klein, Sam and Raine, John Andrew and Golling, Tobias},
  journal = {SciPost Phys.},
  volume  = {17},
  year    = {2024},
  eprint  = {2305.04646},
  doi     = {10.21468/SciPostPhys.17.2.046},
}`,
  },
  {
    category: "o",
    year: 2023,
    title: "Flow Away your Differences: Conditional Normalizing Flows as an Improvement to Reweighting",
    authors: "M. Algren, T. Golling, M. Guth, C. Pollard, J. A. Raine",
    journal: "arXiv:2304.14963 (preprint)",
    citations: 17,
    arxiv: "https://arxiv.org/abs/2304.14963",
    inspire: "https://inspirehep.net/literature/2655327",
    bibtex: `@article{Algren:2023qnb,
  title   = {{Flow Away your Differences: Conditional Normalizing Flows as an Improvement to Reweighting}},
  author  = {Algren, Malte and Golling, Tobias and Guth, Manuel and Pollard, Chris and Raine, John Andrew},
  year    = {2023},
  eprint  = {2304.14963},
}`,
  },
  {
    category: "r",
    year: 2023,
    title: "ν-flows: Conditional neutrino regression",
    authors: "M. Leigh, J. A. Raine, K. Zoch, T. Golling",
    journal: "SciPost Phys. 14, 159 (2023)",
    citations: 40,
    arxiv: "https://arxiv.org/abs/2207.00664",
    doi: "https://doi.org/10.21468/SciPostPhys.14.6.159",
    inspire: "https://inspirehep.net/literature/2105355",
    bibtex: `@article{Leigh:2022lpn,
  title   = {{$\\nu$-flows: Conditional neutrino regression}},
  author  = {Leigh, Matthew and Raine, John Andrew and Zoch, Knut and Golling, Tobias},
  journal = {SciPost Phys.},
  volume  = {14},
  year    = {2023},
  eprint  = {2207.00664},
  doi     = {10.21468/SciPostPhys.14.6.159},
}`,
  },
  {
    category: "r",
    year: 2023,
    title: "Topological reconstruction of particle physics processes using graph neural networks",
    authors: "L. Ehrke, J. A. Raine, K. Zoch, M. Guth, T. Golling",
    journal: "Phys.Rev.D 107, 116019 (2023)",
    citations: 24,
    arxiv: "https://arxiv.org/abs/2303.13937",
    doi: "https://doi.org/10.1103/PhysRevD.107.116019",
    inspire: "https://inspirehep.net/literature/2645705",
    bibtex: `@article{Ehrke:2023cpn,
  title   = {{Topological reconstruction of particle physics processes using graph neural networks}},
  author  = {Ehrke, Lukas and Raine, John Andrew and Zoch, Knut and Guth, Manuel and Golling, Tobias},
  journal = {Phys.Rev.D},
  volume  = {107},
  year    = {2023},
  eprint  = {2303.13937},
  doi     = {10.1103/PhysRevD.107.116019},
}`,
  },
  {
    category: "g",
    year: 2023,
    title: "EPiC-ly Fast Particle Cloud Generation with Flow-Matching and Diffusion",
    authors: "E. Buhmann, C. Ewen, D. A. Faroughy, T. Golling, G. Kasieczka, M. Leigh, G. Quétant, J. A. Raine, D. Sengupta, D. Shih",
    journal: "arXiv:2310.00049 (preprint)",
    citations: 48,
    arxiv: "https://arxiv.org/abs/2310.00049",
    inspire: "https://inspirehep.net/literature/2705220",
    bibtex: `@article{Buhmann:2023zgc,
  title   = {{EPiC-ly Fast Particle Cloud Generation with Flow-Matching and Diffusion}},
  author  = {Buhmann, Erik and Ewen, Cedric and Faroughy, Darius A. and Golling, Tobias and Kasieczka, Gregor and Leigh, Matthew and Quétant, Guillaume and Raine, John Andrew and Sengupta, Debajyoti and Shih, David},
  year    = {2023},
  eprint  = {2310.00049},
}`,
  },
  {
    category: "e",
    year: 2023,
    title: "The Mass-ive Issue: Anomaly Detection in Jet Physics",
    authors: "T. Golling, T. Nobe, D. Proios, J. A. Raine, D. Sengupta, S. Voloshynovskiy, J. F. Arguin, J. L. Martin, J. Pilette, D. B. Gupta, et al.",
    journal: "arXiv:2303.14134 (preprint)",
    citations: 10,
    arxiv: "https://arxiv.org/abs/2303.14134",
    inspire: "https://inspirehep.net/literature/2645766",
    bibtex: `@article{Golling:2023juz,
  title   = {{The Mass-ive Issue: Anomaly Detection in Jet Physics}},
  author  = {Golling, Tobias and Nobe, Takuya and Proios, Dimitrios and Raine, John Andrew and Sengupta, Debajyoti and Voloshynovskiy, Slava and Arguin, Jean-Francois and Martin, Julien Leissner and Pilette, Jacinthe and Gupta, Debottam Bakshi},
  year    = {2023},
  eprint  = {2303.14134},
}`,
  },
  {
    category: "e",
    year: 2023,
    title: "Flow-enhanced transportation for anomaly detection",
    authors: "T. Golling, S. Klein, R. Mastandrea, B. Nachman",
    journal: "Phys.Rev.D 107, 096025 (2023)",
    citations: 60,
    star: true,
    arxiv: "https://arxiv.org/abs/2212.11285",
    doi: "https://doi.org/10.1103/PhysRevD.107.096025",
    inspire: "https://inspirehep.net/literature/2617394",
    bibtex: `@article{Golling:2022nkl,
  title   = {{Flow-enhanced transportation for anomaly detection}},
  author  = {Golling, Tobias and Klein, Samuel and Mastandrea, Radha and Nachman, Benjamin},
  journal = {Phys.Rev.D},
  volume  = {107},
  year    = {2023},
  eprint  = {2212.11285},
  doi     = {10.1103/PhysRevD.107.096025},
}`,
  },
  {
    category: "e",
    year: 2023,
    title: "CURTAINs for your sliding window: Constructing unobserved regions by transforming adjacent intervals",
    authors: "J. A. Raine, S. Klein, D. Sengupta, T. Golling",
    journal: "Front.Big Data 6, 899345 (2023)",
    citations: 81,
    star: true,
    arxiv: "https://arxiv.org/abs/2203.09470",
    doi: "https://doi.org/10.3389/fdata.2023.899345",
    inspire: "https://inspirehep.net/literature/2054235",
    bibtex: `@article{Raine:2022hht,
  title   = {{CURTAINs for your sliding window: Constructing unobserved regions by transforming adjacent intervals}},
  author  = {Raine, John Andrew and Klein, Samuel and Sengupta, Debajyoti and Golling, Tobias},
  journal = {Front.Big Data},
  volume  = {6},
  year    = {2023},
  eprint  = {2203.09470},
  doi     = {10.3389/fdata.2023.899345},
}`,
  },
  {
    category: "e",
    year: 2023,
    title: "Variational autoencoders for anomalous jet tagging",
    authors: "T. Cheng, J. F. Arguin, J. Leissner-Martin, J. Pilette, T. Golling",
    journal: "Phys.Rev.D 107, 016002 (2023)",
    citations: 106,
    star: true,
    arxiv: "https://arxiv.org/abs/2007.01850",
    doi: "https://doi.org/10.1103/PhysRevD.107.016002",
    inspire: "https://inspirehep.net/literature/1805132",
    bibtex: `@article{Cheng:2020dal,
  title   = {{Variational autoencoders for anomalous jet tagging}},
  author  = {Cheng, Taoli and Arguin, Jean-François and Leissner-Martin, Julien and Pilette, Jacinthe and Golling, Tobias},
  journal = {Phys.Rev.D},
  volume  = {107},
  year    = {2023},
  eprint  = {2007.01850},
  doi     = {10.1103/PhysRevD.107.016002},
}`,
  },
  {
    category: "e",
    year: 2023,
    title: "Morphing one dataset into another with maximum likelihood estimation",
    authors: "T. Golling, S. Klein, R. Mastandrea, B. Nachman, J. A. Raine",
    journal: "Phys.Rev.D 108, 096018 (2023)",
    citations: 13,
    arxiv: "https://arxiv.org/abs/2309.06472",
    doi: "https://doi.org/10.1103/PhysRevD.108.096018",
    inspire: "https://inspirehep.net/literature/2697177",
    bibtex: `@article{Golling:2023mqx,
  title   = {{Morphing one dataset into another with maximum likelihood estimation}},
  author  = {Golling, Tobias and Klein, Samuel and Mastandrea, Radha and Nachman, Benjamin and Raine, John Andrew},
  journal = {Phys.Rev.D},
  volume  = {108},
  year    = {2023},
  eprint  = {2309.06472},
  doi     = {10.1103/PhysRevD.108.096018},
}`,
  },
  {
    category: "r",
    year: 2023,
    title: "ATLAS flavour-tagging algorithms for the LHC Run 2 pp collision dataset",
    authors: "ATLAS Collaboration",
    journal: "Eur.Phys.J.C 83, 681 (2023)",
    citations: 460,
    star: true,
    arxiv: "https://arxiv.org/abs/2211.16345",
    doi: "https://doi.org/10.1140/epjc/s10052-023-11699-1",
    inspire: "https://inspirehep.net/literature/2605177",
    bibtex: `@article{ATLAS:2022qxm,
  title   = {{ATLAS flavour-tagging algorithms for the LHC Run 2 pp collision dataset}},
  author  = {{ATLAS Collaboration}},
  journal = {Eur.Phys.J.C},
  volume  = {83},
  year    = {2023},
  eprint  = {2211.16345},
  doi     = {10.1140/epjc/s10052-023-11699-1},
}`,
  },
  {
    category: "o",
    year: 2022,
    title: "Decorrelation with conditional normalizing flows",
    authors: "S. Klein, T. Golling",
    journal: "arXiv:2211.02486 (preprint)",
    citations: 14,
    arxiv: "https://arxiv.org/abs/2211.02486",
    inspire: "https://inspirehep.net/literature/2176749",
    bibtex: `@article{Klein:2022hdv,
  title   = {{Decorrelation with conditional normalizing flows}},
  author  = {Klein, Samuel and Golling, Tobias},
  year    = {2022},
  eprint  = {2211.02486},
}`,
  },
  {
    category: "r",
    year: 2021,
    title: "Hashing and metric learning for charged particle tracking",
    authors: "S. Amrouche, M. Kiehn, T. Golling, A. Salzburger",
    journal: "arXiv:2101.06428 (preprint)",
    citations: 6,
    arxiv: "https://arxiv.org/abs/2101.06428",
    inspire: "https://inspirehep.net/literature/1841623",
    bibtex: `@article{Amrouche:2021tlm,
  title   = {{Hashing and metric learning for charged particle tracking}},
  author  = {Amrouche, Sabrina and Kiehn, Moritz and Golling, Tobias and Salzburger, Andreas},
  year    = {2021},
  eprint  = {2101.06428},
}`,
  },
  {
    category: "g",
    year: 2021,
    title: "Turbo-Sim: a generalised generative model with a physical latent space",
    authors: "G. Quétant, M. Drozdova, V. Kinakh, T. Golling, S. Voloshynovskiy",
    journal: "arXiv:2112.10629 (preprint)",
    citations: 6,
    arxiv: "https://arxiv.org/abs/2112.10629",
    inspire: "https://inspirehep.net/literature/1994574",
    bibtex: `@article{Quetant:2021hgi,
  title   = {{Turbo-Sim: a generalised generative model with a physical latent space}},
  author  = {Quétant, Guillaume and Drozdova, Mariia and Kinakh, Vitaliy and Golling, Tobias and Voloshynovskiy, Slava},
  year    = {2021},
  eprint  = {2112.10629},
}`,
  },
  {
    category: "r",
    year: 2019,
    title: "Similarity hashing for charged particle tracking",
    authors: "S. Amrouche, T. Golling, M. Kiehn, C. Plant, A. Salzburger",
    journal: "",
    citations: 9,
    doi: "https://doi.org/10.1109/BigData47090.2019.9006316",
    inspire: "https://inspirehep.net/literature/1787628",
    bibtex: `@article{Amrouche:2019yxv,
  title   = {{Similarity hashing for charged particle tracking}},
  author  = {Amrouche, Sabrina and Golling, Tobias and Kiehn, Moritz and Plant, Claudia and Salzburger, Andreas},
  year    = {2019},
  doi     = {10.1109/BigData47090.2019.9006316},
}`,
  },
  {
    category: "g",
    year: 2018,
    title: "Deep Generative Models for Fast Shower Simulation in ATLAS",
    authors: "D. Salamani, S. Gadatsch, T. Golling, G. A. Stewart, A. Ghosh, D. Rousseau, A. Hasib, J. Schaarschmidt",
    journal: "",
    citations: 8,
    doi: "https://doi.org/10.1109/eScience.2018.00091",
    inspire: "https://inspirehep.net/literature/1721180",
    bibtex: `@article{Salamani:2018uka,
  title   = {{Deep Generative Models for Fast Shower Simulation in ATLAS}},
  author  = {Salamani, Dalila and Gadatsch, Stefan and Golling, Tobias and Stewart, Graeme Andrew and Ghosh, Aishik and Rousseau, David and Hasib, Ahmed and Schaarschmidt, Jana},
  year    = {2018},
  doi     = {10.1109/eScience.2018.00091},
}`,
  },
];


/* ---------------------------------------------------------------------------
   6. RESEARCH — the five letters of FORGE
   ------------------------------------------------------------------------
   Drives research.html. `id` must match a PUB_CATEGORIES id, so each letter
   can link straight to its own filtered slice of the output page.

   The order is deliberate and should not be changed: the first four letters
   are what we build, the last is what we build them for.
   ------------------------------------------------------------------------ */
const RESEARCH = [
  {
    id: "f", letter: "F", name: "Foundation models",
    body: "Analyses at the LHC have historically started from scratch: label a training set, train a network, throw it away. That is a strange way to treat the largest dataset in the physical sciences. Instead we pre-train on the collisions themselves, masking parts of an event and asking a model to fill them in, much as language models learn from text, and then fine-tune the result for whatever a specific measurement needs. The payoff is fewer labels, better performance on small samples, and one representation that many analyses can share.",
    examples: [
      "Masked particle modeling on sets — towards self-supervised foundation models for high energy physics",
      "Is tokenization needed for masked particle modelling?",
      "The RODEM Jet Datasets — open pre-training data for the community",
    ],
  },
  {
    id: "o", letter: "O", name: "Optimisation",
    body: "The parts of a pipeline that decide whether a result can be believed. Calibrating a classifier so its output means the same thing in data as in simulation. Decorrelating a tagger from the mass it is not supposed to know about. Making a network robust to the ways simulation is subtly wrong. And, further upstream than most groups go, optimising the detector itself: if the reconstruction is differentiable, so is the geometry, and you can ask what a detector should look like rather than only what to do with the one you have.",
    examples: [
      "End-to-end optimal detector design with mutual information surrogates",
      "A continuous calibration of the ATLAS flavour-tagging classifiers via optimal transport",
      "Decorrelation using optimal transport",
    ],
  },
  {
    id: "r", letter: "R", name: "Reconstruction",
    body: "Turning detector signals into physics. Which quark started this jet, work that took transformers into ATLAS flavour tagging for the first time and ended up in Nature Communications. Where the neutrinos went, when there are two of them and the event is under-constrained. What the decay chain of a <i>b</i>-hadron actually looked like, treated as a graph rather than a list of numbers. How to find a charged particle's trajectory among a hundred thousand hits without the cost growing quadratically.",
    examples: [
      "Transforming jet flavour tagging at ATLAS",
      "Fast and improved neutrino reconstruction with conditional normalizing flows",
      "Topological reconstruction of particle physics processes using graph neural networks",
    ],
  },
  {
    id: "g", letter: "G", name: "Generation",
    body: "Simulation is the LHC's computing bottleneck: a substantial fraction of the grid exists to make fake collisions, and the High-Luminosity era needs far more of them than anyone can afford. So we learn the simulator. Diffusion and flow-matching models that generate jets as point clouds, calorimeter showers, and eventually whole events, fast enough to matter and checked hard enough that the speed is not bought with a subtly wrong distribution.",
    examples: [
      "PC-JeDi — diffusion for particle cloud generation in high energy physics",
      "EPiC-ly fast particle cloud generation with flow matching and diffusion",
      "Deep generative models for fast shower simulation in ATLAS",
    ],
  },
  {
    id: "e", letter: "E", name: "Exploration",
    mark: "images/marks/bump.svg",
    body: "The point of the other four. A conventional search asks the data whether one specific new particle is there; you have to know what you are looking for before you can look. We build searches that do not need the answer in advance: they learn what ordinary collisions look like and flag whatever does not fit, with the statistics done carefully enough that \"does not fit\" means something. This is where the CURTAINs family lives, and it is what took weakly supervised anomaly detection into an ATLAS Run 2 publication for the first time.",
    examples: [
      "Weakly supervised anomaly detection for resonant new physics in the dijet final state with ATLAS",
      "CURTAINs for your sliding window — constructing unobserved regions by transforming adjacent intervals",
      "Cluster scanning — a novel approach to resonance searches",
    ],
  },
];


/* ---------------------------------------------------------------------------
   6b. DETECTOR — the hardware frontier
   ------------------------------------------------------------------------
   FORGE describes the five things we build in software. It is not the whole
   programme. The SNSF grant below names both halves in its own title — "at
   the two upgrade frontiers: machine learning AND the ITk Pixel detector" —
   so the research page says both too.

   This is a single block rather than a sixth letter of FORGE, deliberately:
   the acronym describes the methods work, and none of the papers in
   PUBLICATIONS is ITk hardware, so a sixth category would link to an empty
   list. Set to null to hide the section entirely.

   photos: optional, shown side by side under the text. This is the one part
   of the programme that looks like something, so it is worth showing. Web
   sized like the workshop pictures — see images/events/README.md.
   ------------------------------------------------------------------------ */
const DETECTOR = {
  id: "itk",
  eyebrow: "The other frontier",
  name: "ATLAS Inner Tracker",
  body: "Assembly, construction and quality control of the Inner Tracker Pixel Outer Barrel, a new, state-of-the-art hybridised pixel detector for ATLAS operations in Run 4 and beyond. Alongside the methods above, the group helps build the instrument that will record the data.",
  funding: "Supported by SNSF grant 200020_212127, “At the two upgrade frontiers: machine learning and the ITk Pixel detector”.",
  photos: [
    {
      src: "images/detector/itk-loaded-cell-qc.jpg",
      alt: "A researcher in clean-room clothing testing a loaded cell on the probe station, with the power supplies and readout above the bench.",
      caption: "Electrical quality control on a loaded cell in the Geneva clean room.",
    },
    {
      src: "images/detector/itk-l2-ihr-integration.jpg",
      alt: "Three people in clean-room gowns leaning over a bench to work on a pre-production layer-2 inclined half-ring.",
      caption: "Integrating a pre-production layer-2 inclined half-ring.",
    },
  ],
};


/* ---------------------------------------------------------------------------
   7. POSITIONS — what a student or postdoc can actually apply for
   ------------------------------------------------------------------------
   RULE, enforced twice on purpose: a PhD entry is only shown when it has a
   real funding source AND a deadline in the future. render.js checks this at
   display time, and tools/check_positions.py fails the build if a PhD entry
   is published without one. Do not remove either check — the point is that
   this page never advertises a position that does not exist.

   level        "Master" | "PhD" | "Postdoc"
   status       "open" | "filled" | "draft"   (only "open" is displayed)
   funding      REQUIRED for PhD. A grant name, not a hope.
   deadline     REQUIRED for PhD. ISO date.
   projectUrl   optional link to the wider project or programme the position
                belongs to, shown as "Project".
   projectLabel optional link text for projectUrl (default: the URL itself).
   applyUrl     optional link to an application form, shown as "How to apply".
   applyLabel   optional link text for applyUrl (default "Application form").
   reviewed     the date a human last confirmed this is still true.
   ------------------------------------------------------------------------ */
const POSITIONS = [
  {
    id: "msc-dijet-theory-prior",
    level: "Master",
    status: "open",
    title: "What has the field actually predicted? Building a theory prior for the dijet spectrum",
    body: "Thousands of papers propose new particles that would show up as a bump in the dijet mass spectrum, and nobody has ever collected them. This project reads that literature at scale: an automated sweep of hep-ph on arXiv, with a language model pulling the claim out of each paper (what particle, what mass range, what production cross-section, what final state) and turning it into a machine-readable catalogue. The result is a map of what theorists have actually asked for, which you can then lay over what experiments have actually looked at. Expect the two to disagree, and expect the gaps to be the interesting part. Half literature archaeology and half tool-building, and genuinely nobody knows yet what the answer looks like.",
    supervisor: "Tobias Golling",
    prerequisites: "Python. Enough curiosity about phenomenology to enjoy reading abstracts. No ATLAS experience, no prior NLP experience needed.",
    reviewed: "2026-07-29",
  },
  {
    id: "phd-fundis-foundation-models",
    level: "PhD",
    status: "open",
    title: "Foundation models for scientific discovery (FUNDIS)",
    body: "FUNDIS is recruiting nine fully funded PhD students across the University of Geneva, working on foundation models, self-supervised learning, world models, explainable AI and bio-inspired AI, applied to astronomy, particle physics, climate science, digital humanities and global governance. The project in this group is the particle-physics one: pretraining on collision data and asking what a model learns about physics when nobody hands it labels. You would be one of eleven supervisors' worth of neighbours, which is the point — the methods are meant to travel between the domains, and co-supervision across two of them is normal here rather than exceptional.",
    supervisor: "Tobias Golling",
    prerequisites: "Python and a working knowledge of deep learning. A master's degree in physics, computer science, mathematics or a related field by the start date. No prior particle-physics experience needed.",
    funding: "FUNDIS — AI Foundation Models for Scientific Discovery, Fondation pour l'Université de Genève.",
    deadline: "2026-08-30",
    projectUrl: "https://fundis-unige.github.io/",
    projectLabel: "FUNDIS programme site",
    applyUrl: "https://docs.google.com/forms/d/e/1FAIpQLSew6wMjdDxXbn4n0Y9cG56Sjw3M7OMGmmEl39hufqlhUDLH3Q/viewform",
    reviewed: "2026-07-31",
  },
];


/* ---------------------------------------------------------------------------
   8. EVENTS — the workshop series Tobias Golling starts, steers or hosts
   ------------------------------------------------------------------------
   `role` is always his role, since the Output page says so once at the top of
   the section rather than repeating his name on every entry. An event nobody
   here convenes does not belong in this list, however good it was.

   Peer recognition, stated as fact rather than as claim. Every entry here is
   backed by a public page; keep it that way — `url` should be the event's own
   page (Indico wherever there is one), not a news story about it.

   Rendered on the Output page, grouped by `series`. The groups come out in the
   order the series first appear below, and entries stay in the order written,
   so keep each series together and newest first.

   Required : year, title, series, venue, role
   Optional : dates     free text shown as the date line, e.g. "10–16 January 2027"
              upcoming  true for events that have not happened yet
              body      one or two sentences, no more
              speakers  people a reader would recognise, affiliations spelled right
              url       the event page
              image     a group photograph, web-sized — see images/events/README.md
              imageAlt  what the photograph shows, for anyone who cannot see it
              imageCredit  required when the photograph is someone else's; shown
                       under it as a caption
   ------------------------------------------------------------------------ */
const EVENTS = [
  /* --- Hammers & Nails: the ML-meets-physics week, Weizmann-founded in 2017.
         Tobias Golling has been on the scientific committee of every edition
         and led the Swiss one. ------------------------------------------- */
  {
    year: 2027, title: "Hammers & Nails 2027 — Machine Learning Meets Astro & Particle Physics",
    series: "Hammers & Nails", dates: "10–16 January 2027",
    venue: "Schloss Ringberg, Germany", role: "Scientific organising committee",
    upcoming: true,
    body: "A Weizmann–Max Planck collaboration, by invitation. Agentic AI, foundation models, AI-driven design, simulation-based inference, uncertainty quantification.",
    url: "https://conferences.weizmann.ac.il/SRitp/January2027/",
  },
  {
    year: 2023, title: "Hammers & Nails 2023 — Swiss Edition",
    series: "Hammers & Nails", dates: "29 October – 3 November 2023",
    venue: "Congressi Stefano Franscini, Monte Verità, Ascona",
    role: "Lead organiser", body: "59 participants, by invitation.",
    speakers: ["Michael Bronstein (Oxford)", "Kyle Cranmer (Wisconsin–Madison)", "Taco Cohen (Qualcomm AI)", "Shirley Ho (Flatiron Institute)", "Konstantin Novoselov (NUS, Nobel Laureate 2010)", "Jesse Thaler (MIT)", "Michael Elad (Technion)"],
    url: "https://indico.cern.ch/event/1202995/",
  },
  {
    year: 2022, title: "Hammers & Nails 2022 — Machine Learning Meets Astro & Particle Physics",
    series: "Hammers & Nails", dates: "3–11 August 2022",
    venue: "Weizmann Institute of Science, Rehovot",
    role: "Scientific organising committee",
    url: "https://conferences.weizmann.ac.il/SRitp/Aug2022/",
  },
  {
    year: 2019, title: "Hammers & Nails 2019 — Machine Learning Meets Astro & Particle Physics",
    series: "Hammers & Nails", dates: "30 July – 8 August 2019",
    venue: "Weizmann Institute of Science, Rehovot",
    role: "Scientific organising committee",
    url: "https://www.weizmann.ac.il/conferences/SRitp/Aug2019/",
  },
  {
    year: 2017, title: "Hammers & Nails — Machine Learning & HEP",
    series: "Hammers & Nails", dates: "19–28 July 2017",
    venue: "Weizmann Institute of Science, Rehovot",
    role: "Scientific committee", body: "The first edition, and the start of the series.",
    url: "https://www.weizmann.ac.il/conferences/SRitp/Summer2017/hammers-and-nails-machine-learning-and-hep",
  },

  /* --- EuCAIFCon: the conference of EuCAIF, the European coalition for AI in
         fundamental physics, of which Tobias Golling is a founding board
         member. ------------------------------------------------------------ */
  {
    year: 2026, title: "EuCAIFCon 2026 — European AI for Fundamental Physics Conference",
    series: "EuCAIFCon", dates: "24–28 August 2026",
    venue: "Kirchhoff Institute for Physics, Heidelberg",
    role: "EuCAIF founding board member; foundation-models working group",
    upcoming: true,
    body: "The third edition. Sessions are organised by AI method rather than by physics question, which is the point of the series.",
    url: "https://indico.physi.uni-heidelberg.de/event/1277/",
  },
  {
    year: 2025, title: "EuCAIFCon 2025 — European AI for Fundamental Physics Conference",
    series: "EuCAIFCon", dates: "16–20 June 2025", venue: "Cagliari, Sardinia",
    role: "Organising committee; foundation-models working group; panel on AI and fundamental physics",
    url: "https://agenda.infn.it/event/43565/",
  },
  {
    year: 2024, title: "EuCAIFCon 2024 — the first European AI for Fundamental Physics Conference",
    series: "EuCAIFCon", dates: "30 April – 3 May 2024", venue: "Hotel CASA, Amsterdam",
    role: "Organising committee; foundation-models working group; panel on AI infrastructure",
    body: "Hosted by the University of Amsterdam, Nikhef and Radboud, and the first time particle, astroparticle, nuclear, gravitational-wave and accelerator physicists sat in one AI conference.",
    url: "https://indico.nikhef.nl/event/4875/",
  },

  /* --- The Geneva weeks at the Villa Boninchi, run through G·IST, the
         theoretical-sciences institute of the University of Geneva. -------- */
  {
    year: 2026, title: "ML opportunities for HEP in the era of agentic AI",
    series: "G·IST · Villa Boninchi", dates: "May 2026",
    venue: "Villa Boninchi, Geneva", role: "Organiser",
    body: "What changes about how physics gets done when the tools can write and test their own code.",
    image: "images/events/boninchi-2026.jpg",
    imageAlt: "Participants around a long lunch table on the terrace of the Villa Boninchi in the sun.",
  },
  {
    year: 2025, title: "Computing Challenges and AI Opportunities for Future Colliders",
    series: "G·IST · Villa Boninchi", dates: "20–24 October 2025",
    venue: "Villa Boninchi, Geneva", role: "Organiser",
    speakers: ["Tilman Plehn (Heidelberg)", "Sven Krippendorf (Cambridge)", "Thea Aarrestad (ETH Zurich)", "Sascha Caron (Nikhef / Radboud)"],
    url: "https://www.unige.ch/math/GIST/events/past-events/computing-challenges-and-ai-opportunities-future-colliders",
    image: "images/events/boninchi-2025.jpg",
    imageAlt: "The participants standing on the lawn above the lake in October, the far shore behind them.",
  },
  {
    year: 2024, title: "Challenges & opportunities in foundation models",
    series: "G·IST · Villa Boninchi", dates: "14–25 October 2024",
    venue: "Villa Boninchi, Geneva", role: "Co-organiser",
    body: "Opened by Yann LeCun.",
    speakers: ["Yann LeCun (Meta AI / NYU)", "Dan Alistarh (ISTA)", "Taco Cohen (Meta)", "Lucas Beyer (OpenAI)", "Hervé Jégou (FAIR)", "Emmanuel Abbe (EPFL)"],
    url: "https://www.unige.ch/math/GIST/events/past-events/liouville-quantum-gravity-continuum-discrete-1",
    image: "images/events/boninchi-2024.jpg",
    imageAlt: "The participants on the lawn in front of the Villa Boninchi on a clear October morning.",
  },
  {
    year: 2023, title: "ATLAS FTag ML Workshop",
    series: "G·IST · Villa Boninchi", dates: "20 November 2023",
    venue: "Villa Boninchi, Geneva", role: "Organiser",
    body: "A day with the ATLAS flavour-tagging group on the machine learning behind it.",
    url: "https://indico.cern.ch/event/1341246/",
  },
  {
    year: 2023, title: "Automating & Accelerating Scientific Discovery with AI",
    series: "G·IST · Villa Boninchi", dates: "25 September – 6 October 2023",
    venue: "Villa Boninchi, Geneva — inaugural UNIGE Institute of Advanced Study",
    role: "Co-director",
    body: "Included a public lecture by Konstantin Novoselov, the 2010 Nobel laureate in physics.",
    speakers: ["Konstantin Novoselov (NUS, Nobel Laureate 2010)", "Daniel Whiteson (UC Irvine)", "Anna Scaife (Manchester)", "David Shih (Rutgers)", "Michael Kagan (SLAC)", "Lukas Heinrich (TU Munich)"],
    image: "images/events/boninchi-2023.jpg",
    imageAlt: "The participants on the lawn by the lake, the Jura behind them and a small white dog in the foreground.",
    url: "https://ias-ai.unige.ch/",
  },

  /* --- AIPHY, the MSCA doctoral network the group is part of, meeting in
         Geneva. ------------------------------------------------------------ */
  {
    year: 2026, title: "AIPHY network week in Geneva",
    series: "AIPHY doctoral network", dates: "16–20 February 2026",
    venue: "Villa Boninchi, Geneva", role: "Host",
    body: "A week for the doctoral students of AIPHY — Challenging AI with Challenges from Physics, a HORIZON MSCA doctoral network coordinated from Heidelberg — and their supervisors.",
    image: "images/events/aiphy-2026.jpg",
    imageAlt: "The network standing by the lake in front of the Villa on a grey February day.",
    url: "https://www.sites.uni-heidelberg.de/en/aiphy",
  },

  /* --- The Glühwein workshop: the small December meeting on machine learning
         in high-energy physics. Heidelberg 2022, Vienna 2023, Karlsruhe 2024,
         Aachen 2025 — and Geneva next. Add `url` here as soon as the Indico
         page is up. -------------------------------------------------------- */
  {
    year: 2026, title: "Glühwein Workshop — Geneva edition",
    series: "Glühwein Workshop", dates: "14–16 December 2026",
    venue: "Geneva", role: "Initiator and host", upcoming: true,
    body: "A small meeting on the latest in machine learning and how it is being applied to high-energy physics, held over three December days. Geneva takes it on after Heidelberg 2022, Vienna 2023, Karlsruhe 2024 and Aachen 2025.",
  },
  {
    year: 2025, title: "Glühwein Workshop 2025",
    series: "Glühwein Workshop", dates: "15–17 December 2025",
    venue: "Erholungsgesellschaft, Aachen — RWTH Aachen University",
    body: "Three days on detector simulation, foundation models, unfolding and anomaly detection.",
    url: "https://indico.global/event/16087/",
  },
  {
    year: 2024, title: "Glühwein Workshop 2024",
    series: "Glühwein Workshop", dates: "16–18 December 2024",
    venue: "Karlsruhe Institute of Technology",
    body: "Kinga Anna Woźniak spoke on ML-enhanced optimal detector design with mutual information.",
    image: "images/events/gluehwein-2024.jpg",
    imageAlt: "The participants in a courtyard at dusk, seen from a balcony above, around a fire bowl and under fairy lights.",
    imageCredit: "Photograph from the Glühwein Workshop 2024 organisers, KIT.",
    url: "https://indico.kit.edu/event/4744/",
  },
];


/* ---------------------------------------------------------------------------
   8b. OUTREACH — the public-engagement record
   ------------------------------------------------------------------------
   Shown at the foot of the Outreach page, under the plain-language explainer.
   Laid out like the CV: a period on the left, the activity on the right.

   Required : period  free text, so "2016, 2017 and 2018" and "2009-2014" are
                      both fine — keep the list itself newest first, since
                      nothing here is sorted for you
              what    the activity, one line
   Optional : where   the venue, the outlet, or where to find it
              links   [{ label, url }] — a row of small buttons. Several
                      entries below are waiting for their URL; add one and it
                      shows up on the page, no other change needed.

   Source: the outreach section of CV_long.docx.
   ------------------------------------------------------------------------ */
const OUTREACH = [
  { period: "2025", what: "Public lecture on AI and high-energy physics",
    where: "Cycle de conférences du CPPM « Mystères au cœur de l'Univers et de la matière », Marseille",
    links: [{ label: "Series", url: "https://indico.in2p3.fr/category/263/" }] },
  { period: "2025", what: "Organiser, International Masterclasses", where: "University of Geneva" },

  { period: "2024", what: "Radio commentary on the Nobel Prize in Physics to Hopfield and Hinton, for their pioneering work on AI",
    where: "Echo der Zeit, 8 October, in German. Radio SRF 1 at 18:20 and SRF 2 at 19:00; the commentary starts around minute 22",
    links: [{ label: "Listen", url: "https://www.srf.ch/audio/echo-der-zeit/deutschland-ein-neuer-generalsekretaer-fuer-die-spd?id=4d8fe455-9f9c-4a31-9474-21322787a3fc" }] },
  { period: "2024", what: "Organiser of the conference \"A City on Mars\", with an invited talk by Zachary Weinersmith",
    where: "Auditoire A100, Sciences II, University of Geneva, 4 September",
    links: [{ label: "Announcement", url: "https://www.unige.ch/sciences/physique/actualites/conference-une-ville-sur-mars" }] },
  { period: "2024", what: "Podcast: Learning from Data #36, on physics and artificial intelligence",
    where: "Learning from Data, in French",
    links: [
      { label: "SoundCloud", url: "https://soundcloud.com/user-842727938/36-physique-et-intelligence-artificielle" },
      { label: "Apple Podcasts", url: "https://podcasts.apple.com/ch/podcast/learning-from-data/id1543359792?l=fr" },
      { label: "Spotify", url: "https://open.spotify.com/show/7MYk8pa3JqcvuQoxR8qHeb" },
    ] },
  { period: "2024", what: "Organiser, International Masterclasses", where: "University of Geneva" },
  { period: "2024", what: "Canadian television documentary on anomaly detection at the LHC",
    where: "Découverte, Radio-Canada; the segment starts around minute 33",
    links: [{ label: "Watch", url: "https://ici.radio-canada.ca/tele/decouverte/site/episodes/857349/scientifique-origami-intelligence-artificielle-neolithique-lion" }] },

  { period: "2023", what: "Public screening of the film \"Her\" and podium discussion on AI",
    where: "CineGlobe Film Festival, CERN" },
  { period: "2023", what: "RTS interview on the muon g−2 anomaly",
    links: [{ label: "Article", url: "https://www.rts.ch/info/sciences-tech/14241166-letrange-comportement-dune-particule-subatomique-pourrait-bouleverser-la-physique.html" }] },
  { period: "2023", what: "Organiser, International Masterclasses", where: "University of Geneva" },

  { period: "2022", what: "Data Science Seminar on graph neural networks", where: "University of Geneva" },
  { period: "2022", what: "OPEN DOORS: Physics makes its show! « L'Intelligence artificielle au service de la science — à la recherche de la particule inconnue »",
    where: "Inauguration of the Ancienne École de Médecine, University of Geneva, 1 October",
    links: [{ label: "Event", url: "https://www.unige.ch/cite/evenements/inauguration-AEM" }] },
  { period: "2022", what: "Data Science Day \"Promises of AI\": plenary talk and panel on the rise of generative modelling and anomaly detection in science",
    where: "University of Geneva",
    links: [{ label: "Programme", url: "https://datascience.unige.ch/en/research/uniges-data-science-days/uniges-data-science-days-3" }] },
  { period: "2022", what: "Consultant on AI", where: "UNIGE Data Science Competence Center" },
  { period: "2022", what: "Video capsule on machine learning and physics",
    where: "for the interdisciplinary competences in data science" },

  { period: "2021 and 2022", what: "Programme Boussole for collégiens de 4ème année: machine learning and physics" },

  { period: "2021", what: "Video linked from the page for students considering a master's in physics",
    where: "University of Geneva",
    links: [{ label: "Video", url: "https://www.youtube.com/watch?v=AwhcTDkUMAM" }] },

  { period: "2019", what: "Keynote on machine learning in high-energy physics", where: "RSA Jahresklausur, St. Gilgen" },

  { period: "2018", what: "CERN2Market hackathon", where: "CERN IdeaSquare",
    links: [{ label: "Event", url: "https://indico.cern.ch/event/731333/" }] },

  { period: "2017", what: "\"Inside CERN\", a celebration of Swiss–Israeli scientific cooperation: a « tête-à-tête » on exotic physics with Erez Etzion",
    where: "Embassy of Switzerland in Israel, at the opening of Andri Pol's photography exhibit. Jaffa Art Salon, 6 April",
    links: [{ label: "Programme", url: "https://www.academy.ac.il/SystemFiles/23207.pdf" }] },

  { period: "2016, 2017 and 2018", what: "Organiser, International Masterclasses", where: "University of Geneva" },

  { period: "2016", what: "Organiser of the two-day Nuit de la Science", where: "Geneva" },
  { period: "2016", what: "Contribution to the MOOC « Physique des particules — une introduction »" },

  { period: "2013", what: "Contribution to \"Particle Fever\" (documentary)" },

  { period: "2012", what: "Day-long October recess field trip to Brookhaven National Laboratory with 20 Yale students" },

  { period: "2010", what: "Film on the Standard Model of particle physics, with artistic animations",
    where: "more than 950,000 views on YouTube",
    links: [{ label: "Video", url: "https://www.youtube.com/watch?v=V0KjXsGRvoA" }] },

  { period: "2009–2014", what: "Summer research at CERN for more than 20 Yale undergraduates",
    where: "two months each, funded by Yale-endowed fellowships, and long-term research in the group afterwards. Several, many of them starting after their freshman year, came back for a second and third summer" },

  { period: "2009", what: "Part of an artistic study of ATLAS physicists, exhibited in Bergen, Norway" },
];


/* ---------------------------------------------------------------------------
   9. FUNDING
   ------------------------------------------------------------------------
   No amounts. They read as boasting to peers and as noise to students, and
   anyone who needs the figures can ask.
   ------------------------------------------------------------------------ */
const FUNDING = [
  { years: "2027–2030", name: "AI Foundation Models for Scientific Discovery (FUNDIS)", funder: "Fondation pour l'Université de Genève", role: "Co-applicant",
    url: "https://fundis-unige.github.io/" },
  { years: "2025–2029", name: "Machine Learning and Quantum Computing for Future Colliders", funder: "COST Action CA24146", role: "Co-applicant" },
  { years: "2025–2028", name: "CHEF", funder: "SERI and UNIGE", role: "Co-applicant" },
  { years: "2024–2028", name: "AIPHY — Challenging AI with Challenges from Physics", funder: "HORIZON MSCA Doctoral Network", role: "Co-applicant",
    url: "https://www.sites.uni-heidelberg.de/en/aiphy",
    logo: "images/funding/aiphy.png",
    summary: "Nine doctoral candidates at five 4EU+ universities, supervised by nine principal investigators and coordinated from Heidelberg, working on inverse problems, systematic uncertainties and explainable AI for LHC data. Geneva hosts one of the network weeks." },
  { years: "2022–2026", name: "At the two upgrade frontiers: machine learning and the ITk Pixel detector", funder: "SNSF 200020_212127", role: "Principal investigator" },
  { years: "2020–2024", name: "RODEM — Robust Deep Density Models for High-Energy Particle Physics and Solar Flare Analysis", funder: "SNSF Sinergia CRSII5_193716", role: "Co-applicant", note: "the group's namesake",
    url: "https://rodem.ch/",
    logo: "images/funding/rodem.png",
    summary: "A Sinergia project shared with computer science and solar astronomy, on robust density models for rare events — from LHC collisions to solar flares. It funded the first generation of students and postdocs here, and gave the group its name." },
  { years: "2018–2022", name: "Exploiting LHC data with machine learning, and preparing for the HL-LHC", funder: "SNSF 200020_181984", role: "Principal investigator" },
];
