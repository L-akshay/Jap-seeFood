import type { InfoPage as InfoPageData } from "@/lib/legal-pages";

export function InfoPage({ page }: { page: InfoPageData }) {
  return (
    <main className="section">
      <div className="container-narrow">
        <div className="max-w-4xl">
          <span className="font-jp text-sm uppercase tracking-[0.35em] text-gold">
            {page.eyebrow}
          </span>
          <h1 className="mt-5 text-balance text-4xl leading-[1.12] text-pearl md:text-6xl">
            {page.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-soft-blue/80">
            {page.description}
          </p>
          {page.updated ? (
            <p className="mt-4 text-sm text-muted-foreground">{page.updated}</p>
          ) : null}
        </div>

        {page.highlights ? (
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {page.highlights.map(({ title, description, icon: Icon }) => (
              <article key={title} className="glass-card p-5">
                <span className="flex size-11 items-center justify-center rounded-lg border border-gold/25 bg-gold/10 text-gold">
                  <Icon className="size-5" />
                </span>
                <h2 className="mt-5 text-xl text-pearl">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </article>
            ))}
          </div>
        ) : null}

        <div className="mt-12 grid gap-6">
          {page.sections.map((section) => (
            <section key={section.title} className="glass-card p-6 md:p-8">
              <h2 className="text-2xl text-pearl">{section.title}</h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
