// All copy lives here so it can be swapped for the project's real content.

/** Live contact destination used by primary conversion CTAs. */
export const CONTACT_HREF = "https://percipere.co/contact-us/";
/** Alias kept for existing imports (nav, footer CTAs). */
export const DEMO_HREF = CONTACT_HREF;

export const NAV = [
  { label: "Products", items: [
    { label: "PerciXpert", href: "/products/percixpert" },
    { label: "PerciServe", href: "/products/perciserve" },
    { label: "PerciHub", href: "/#product-percihub" },
    { label: "PerciSuite", href: "/#product-percisuite" },
    { label: "FUTUROOT", href: "/#product-futuroot" },
  ]},
  { label: "Company", items: [
    { label: "About PerciVerse", href: "/#ecosystem" },
    { label: "Contact", href: CONTACT_HREF },
  ]},
  { label: "Explore", items: [
    { label: "SAP transformation", href: "/#transformation" },
    { label: "Next steps", href: "/#next-steps" },
  ]},
];

export const PRODUCTS = [
  { name: "PerciXpert", tag: "ERP assessment & decisions", href: "/products/percixpert",
    img: "/images/percixpert.svg", video: "/media/products/percixpert.mp4", poster: "/images/products/percixpert.jpg",
    desc: "Evidence-led assessment: discovery, AS-IS, requirements, Fit-Gap, ERP comparison, and RFP-ready structure." },
  { name: "PerciServe", tag: "Operations & support", href: "/products/perciserve",
    img: "/images/perciserve.svg", video: "/media/products/perciserve.mp4", poster: "/images/products/perciserve.jpg",
    desc: "Instant L1 from connected knowledge—and context-rich escalation when a specialist is needed." },
  { name: "PerciHub", tag: "Context-aware agents", href: "/#product-percihub",
    img: "/images/percihub.svg", video: "/media/products/percihub.mp4", poster: "/images/products/percihub.jpg",
    desc: "Deploy agents that act on live enterprise context across finance, supply chain, and service." },
  { name: "PerciSuite", tag: "Focused applications", href: "/#product-percisuite",
    img: "/images/percisuite.svg", video: "/media/products/percisuite.mp4", poster: "/images/products/percisuite.jpg",
    desc: "A suite of focused applications built for enterprise execution." },
  { name: "FUTUROOT", tag: "Process intelligence layer", href: "/#product-futuroot",
    img: "/images/futuroot.svg", video: "/media/products/futuroot.mp4", poster: "/images/products/futuroot.jpg",
    desc: "The process intelligence layer that gives every suite shared enterprise context." },
];

export const ECOSYSTEM_NODES = [
  { label: "PerciXpert", accent: "#00B7FF" },
  { label: "PerciServe", accent: "#FF00B7" },
  { label: "PerciHub", accent: "#1B1466" },
  { label: "PerciSuite", accent: "#00B7FF" },
];

export const SAP_PHASES = [
  {
    label: "Discover",
    title: "See the landscape clearly",
    text: "Establish shared process and system context before transformation work begins.",
  },
  {
    label: "Prepare",
    title: "Align teams and scope",
    text: "Bring implementation, operations, and support onto one intelligible signal layer.",
  },
  {
    label: "Explore",
    title: "Design with live context",
    text: "Surface dependencies, risks, and relevant history while solutions take shape.",
  },
  {
    label: "Realize",
    title: "Deliver and keep learning",
    text: "Turn approved actions into outcomes—and feed every resolution back into the ecosystem.",
  },
];

export const FOOTER = [
  { title: "Products", links: PRODUCTS.map(p => ({ label: p.name, href: p.href })) },
  { title: "Company", links: [{label:"About PerciVerse",href:"/#ecosystem"},{label:"Contact",href:CONTACT_HREF}] },
  { title: "Explore", links: [{label:"SAP transformation",href:"/#transformation"},{label:"Next steps",href:"/#next-steps"}] },
  { title: "Contact", links: [{label:"Talk to our team",href:CONTACT_HREF},{label:"Review the suites",href:"/#suites"}] },
];
