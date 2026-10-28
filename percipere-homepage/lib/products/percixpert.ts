import { CONTACT_HREF } from "@/lib/data";

/** Copy extracted from ERP assessment / PerciXpert decks — no invented metrics. */
export const PERCIXPERT = {
  slug: "percixpert",
  name: "PerciXpert",
  eyebrow: "ERP assessment & decision-making",
  headline: "Evidence in. Defensible ERP decisions out.",
  support:
    "PerciXpert turns workshop evidence and process insight into structured requirements, Fit-Gap, ERP comparison, and RFP-ready inputs—so selection is traceable, not a deck of opinions.",
  ctaLabel: "Talk through an assessment",
  ctaHref: CONTACT_HREF,
  distinction: {
    futuroot: "FUTUROOT shows where to look—how processes actually run.",
    percixpert: "PerciXpert decides what to do—requirements, Fit-Gap, and platform comparison.",
  },
  problem: {
    title: "Workshop-first assessment burns time before issues are clear",
    points: [
      "Documents are re-read and processes redrawn by hand for every engagement.",
      "Notes, maps, requirement lists, and ERP comparisons live in separate files.",
      "Fit-Gap results are hard to trace back to the requirement, process, and source.",
    ],
  },
  solution: {
    title: "One evidence base from discovery to partner choice",
    text: "Connect process intelligence with ERP expertise so findings carry through Fit-Gap, comparison, and RFP—without rebuilding the story at every step.",
  },
  capabilities: [
    {
      title: "Process discovery & pinpointing",
      text: "Locate issues by process and level (L0–L1 and deeper), with a clear share of what is affected—so workshops stay focused.",
    },
    {
      title: "AS-IS flows & process repository",
      text: "Generate reviewable AS-IS flows from workshop material and organise processes in an L0–L3 hierarchy with sources attached.",
    },
    {
      title: "Structured requirements",
      text: "Capture functional and non-functional needs with MoSCoW priority so critical requirements weight the Fit-Gap.",
    },
    {
      title: "Fit-Gap, compare & RFP",
      text: "Rate FIT / Partial / GAP across platforms on the same requirements, then prepare RFP inputs and partner selection support.",
    },
  ],
  workflow: [
    { step: "01", title: "Connect & analyse", text: "FUTUROOT maps how processes run so you see where to look first." },
    { step: "02", title: "Investigate", text: "Pinpoint issues by process and level before broad workshop rounds." },
    { step: "03", title: "Fit-Gap", text: "Turn validated insight into requirements and solution options." },
    { step: "04", title: "Compare ERPs", text: "Evaluate fit across platforms on one shared requirement set." },
    { step: "05", title: "RFP & partner", text: "Leave with RFP-ready requirements and partner selection support." },
  ],
  outcomes: [
    { title: "Process clarity", text: "See which process and level carries the issue." },
    { title: "Focused workshops", text: "Discuss specific issues, backed by evidence—not open-ended fishing." },
    { title: "Traceable decisions", text: "Requirements, Fit-Gap, comparison, and RFP stay linked to the same base." },
    { title: "ERP-ready path", text: "Move from assessment to partner choice without rebuilding the narrative." },
  ],
} as const;
