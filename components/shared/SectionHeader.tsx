import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type SectionHeaderProps = {
  /** Small label rendered above the title (often in the JP accent font). */
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

/**
 * Standard section heading: eyebrow + title + supporting copy.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <span className="font-jp text-sm uppercase tracking-[0.35em] text-gold">
          {eyebrow}
        </span>
      ) : null}

      <h2 className="text-balance text-4xl leading-[1.2] text-pearl md:text-5xl">
        {title}
      </h2>

      {description ? (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
