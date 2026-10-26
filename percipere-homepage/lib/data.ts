// All copy lives here so it can be swapped for the project's real content.
export const NAV = [
  { label: "Products", items: [
    { label: "PerciXpert", href: "/products/percixpert" },
    { label: "PerciServe", href: "/products/perciserve" },
    { label: "PerciHub", href: "/products/percihub" },
    { label: "PerciSuite", href: "/products/percisuite" },
    { label: "FUTUROOT", href: "/products/futuroot" },
  ]},
  { label: "Company", items: [
    { label: "About", href: "/company" },
    { label: "Team", href: "/company/team" },
    { label: "Contact", href: "/contact" },
  ]},
  { label: "Resources", items: [
    { label: "Insights", href: "/resources/insights" },
    { label: "Guides", href: "/resources/guides" },
    { label: "Case studies", href: "/resources/case-studies" },
  ]},
];

export const PRODUCTS = [
  { name: "PerciXpert", tag: "Implementation intelligence · 2 min demo", href: "/products/percixpert",
    img: "/images/percixpert.svg", video: "/media/products/percixpert.mp4", poster: "/images/products/percixpert.jpg", desc: "Investigate dumps, transports and config drift with AI that knows your landscape." },
  { name: "PerciServe", tag: "Smarter SAP support · 2 min demo", href: "/products/perciserve",
    img: "/images/perciserve.svg", video: "/media/products/perciserve.mp4", poster: "/images/products/perciserve.jpg", desc: "Resolve routine queries and escalate with full context, automatically." },
  { name: "PerciHub", tag: "Context-aware agents · 2 min demo", href: "/products/percihub",
    img: "/images/percihub.svg", video: "/media/products/percihub.mp4", poster: "/images/products/percihub.jpg", desc: "Deploy agents that act on live enterprise context across finance, supply chain and service." },
  { name: "PerciSuite", tag: "Focused applications · 2 min demo", href: "/products/percisuite",
    img: "/images/percisuite.svg", video: "/media/products/percisuite.mp4", poster: "/images/products/percisuite.jpg", desc: "A suite of focused applications built for enterprise execution." },
  { name: "FUTUROOT", tag: "Process intelligence · 2 min demo", href: "/products/futuroot",
    img: "/images/futuroot.svg", video: "/media/products/futuroot.mp4", poster: "/images/products/futuroot.jpg", desc: "See how work actually flows through your organisation." },
];

export const FOOTER = [
  { title: "Products", links: PRODUCTS.map(p => ({ label: p.name, href: p.href })) },
  { title: "Company", links: [{label:"About",href:"/company"},{label:"Team",href:"/company/team"},{label:"Contact",href:"/contact"}] },
  { title: "Resources", links: [{label:"Insights",href:"/resources/insights"},{label:"Guides",href:"/resources/guides"},{label:"Case studies",href:"/resources/case-studies"}] },
  { title: "Legal", links: [{label:"Privacy",href:"/legal/privacy"},{label:"Terms",href:"/legal/terms"}] },
];
export const DEMO_HREF = "/contact?intent=demo"; // point at your real booking route
