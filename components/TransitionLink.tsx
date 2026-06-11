"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

type Props = ComponentProps<typeof Link>;

/**
 * Link that runs the navigation inside a View Transition when supported,
 * enabling shared-element morphs (portraits, posters) for elements that
 * share a `view-transition-name`. Falls back to a normal client navigation
 * (and the CSS default cross-fade) when the API is missing or the user
 * prefers reduced motion.
 */
export function TransitionLink({ href, onClick, ...rest }: Props) {
  const router = useRouter();

  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => {
        finished: Promise<void>;
        ready: Promise<void>;
        updateCallbackDone: Promise<void>;
      };
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!doc.startViewTransition || reduce) return; // let <Link> navigate normally

    e.preventDefault();
    const vt = doc.startViewTransition(() => {
      router.push(typeof href === "string" ? href : href.toString());
    });
    // aborted transitions (hidden tab, rapid navigation) are fine
    vt.ready.catch(() => {});
    vt.updateCallbackDone.catch(() => {});
    vt.finished.catch(() => {});
  };

  return <Link href={href} onClick={handle} {...rest} />;
}
