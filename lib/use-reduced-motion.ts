"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void): () => void {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

/**
 * SSR-safe `prefers-reduced-motion` hook.
 *
 * `useSyncExternalStore` uses the server snapshot (`false`) during hydration so
 * the first client render matches the server, then re-renders with the real
 * value — no hydration mismatch, even though the value comes from `matchMedia`.
 * (Motion's own `useReducedMotion` reads the query synchronously on the client,
 * which can mismatch when used in render-time props.)
 */
export function useReducedMotionSafe(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
