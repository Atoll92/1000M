import type { ReactNode } from "react";

/**
 * One stripe of the annotated-page layout: a margin rail (left, hairline-
 * separated on md+) holding the metadata, and the body. Stack sections flush
 * so the rail's hairline reads as one continuous rule down the page.
 * On mobile the rail collapses to an annotation row above the body.
 */
export function RailSection({
  rail,
  children,
  className = "",
  railClassName = "",
  bodyClassName = "",
}: {
  rail?: ReactNode;
  children: ReactNode;
  className?: string;
  railClassName?: string;
  bodyClassName?: string;
}) {
  return (
    <section className={`rail-section ${className}`}>
      <div className={`rail-cell ${railClassName}`}>{rail}</div>
      <div className={`rail-body min-w-0 ${bodyClassName}`}>{children}</div>
    </section>
  );
}
