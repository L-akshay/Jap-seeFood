import { cn } from "@/lib/utils";

/**
 * Fixed, non-interactive decorative backdrop for the whole page:
 *   1. Radial gold + soft-blue glows
 *   2. A faint ocean grain/noise film
 *   3. A soft wave-line pattern (drawn via .wave-lines pseudo elements)
 *
 * Render once near the top of the layout. It sits behind all content.
 */
export function Background({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      {/* Radial glows (lighter blur on mobile for performance) */}
      <div className="absolute -left-1/4 -top-1/3 h-[70vh] w-[70vh] rounded-full bg-gold/10 blur-3xl md:blur-[120px]" />
      <div className="absolute -right-1/4 top-0 h-[55vh] w-[55vh] rounded-full bg-soft-blue/6 blur-3xl md:blur-[120px]" />
      <div className="absolute bottom-[-20%] left-1/2 h-[60vh] w-[80vh] -translate-x-1/2 rounded-full bg-navy/60 blur-3xl md:blur-[140px]" />

      {/* Soft wave lines top + bottom */}
      <div className="wave-lines absolute inset-0" />

      {/* Ocean grain film */}
      <div className="bg-grain absolute inset-0" />
    </div>
  );
}
