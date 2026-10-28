import { CONTACT_HREF } from "@/lib/data";

export default function ProductCta({
  href = CONTACT_HREF,
  label = "Talk to our team",
  tone = "dark",
}: {
  href?: string;
  label?: string;
  tone?: "dark" | "line";
}) {
  return (
    <a href={href} className={`btn ${tone === "dark" ? "btn-dark" : "btn-line"}`}>
      {label}
    </a>
  );
}
