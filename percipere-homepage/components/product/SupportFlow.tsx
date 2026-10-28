"use client";

/** Visual: question → answer or expert escalation. */
export default function SupportFlow() {
  return (
    <div className="support-flow" aria-hidden="true">
      <div className="support-card is-query">
        <small>User</small>
        <strong>How do I…?</strong>
      </div>
      <div className="support-branch">
        <div className="support-card is-answer">
          <small>L1 · PerciServe</small>
          <strong>Verified answer</strong>
          <span>From docs, SOPs & ticket knowledge</span>
        </div>
        <div className="support-or">or</div>
        <div className="support-card is-escalate">
          <small>Escalation</small>
          <strong>Briefed ticket</strong>
          <span>Full conversation attached</span>
        </div>
      </div>
    </div>
  );
}
