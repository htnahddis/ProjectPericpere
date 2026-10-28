import { CONTACT_HREF } from "@/lib/data";

/** Copy extracted from PerciServe decks / product guide — no invented metrics. */
export const PERCISERVE = {
  slug: "perciserve",
  name: "PerciServe",
  eyebrow: "AI-powered SAP support",
  headline: "Instant L1. Context-rich escalation when it matters.",
  support:
    "PerciServe answers routine SAP questions from your connected documentation, SOPs, and ticket knowledge—and when it can’t, it escalates with the full conversation attached.",
  ctaLabel: "Talk through your support journey",
  ctaHref: CONTACT_HREF,
  problem: {
    title: "Reactive support repeats the same work",
    points: [
      "The same questions are answered again and again.",
      "Fixes stay buried in closed tickets instead of teaching the next response.",
      "Context is lost at every handoff, so L2/L3 start from a thin ticket.",
      "Consultant time is spent on routine queries that never needed a specialist.",
    ],
  },
  solution: {
    title: "Resolve what you can. Escalate what you must—fully briefed.",
    text: "Connect approved SAP knowledge sources so business users get verified answers in plain language. Unresolved cases become tickets with conversation context for deeper investigation.",
  },
  capabilities: [
    {
      title: "Instant L1 from your sources",
      text: "Answers draw on SAP documentation, SOPs, training material, and ticket knowledge—not a generic chatbot.",
    },
    {
      title: "Connected ticketing",
      text: "Unresolved issues become tickets in your platform with the full conversation attached.",
    },
    {
      title: "Context-rich escalation",
      text: "Specialists receive a briefed handoff—conversation, suggested direction, and connected context—not a blank page.",
    },
    {
      title: "Learning loop",
      text: "Resolutions feed back so similar questions can be handled at L1 the next time.",
    },
  ],
  workflow: [
    { step: "01", title: "Question", text: "A business user asks in plain language—or submits via email / portal." },
    { step: "02", title: "Answer", text: "PerciServe searches connected knowledge and returns a verified response when it can." },
    { step: "03", title: "Escalate", text: "If not, a ticket opens with conversation context for IT or a specialist." },
    { step: "04", title: "Resolve & reuse", text: "The fix fills the knowledge gap so the next similar query stays at L1." },
  ],
  outcomes: [
    { title: "Faster routine answers", text: "Users get instant help on how-to questions instead of waiting in a queue." },
    { title: "Consultant time protected", text: "Only complex issues reach specialists." },
    { title: "Handoffs that travel", text: "Full conversation context moves with every escalation." },
    { title: "Knowledge that compounds", text: "Each resolution strengthens the next L1 response." },
  ],
  note: "Deeper L2/L3 investigation can continue with PerciXpert’s support path and FUTUROOT process context—PerciServe keeps the front door clear.",
} as const;
