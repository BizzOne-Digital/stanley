import type { ProcessStep } from "@/types";

export function ProcessSteps({
  steps,
  title,
  className,
}: {
  steps: ProcessStep[];
  title?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      {title && (
        <h3 className="mb-8 font-display text-xl font-bold uppercase tracking-wide text-gold md:text-2xl">
          {title}
        </h3>
      )}
      <ol className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {steps.map((step) => (
          <li
            key={step.step}
            className="flex h-full flex-col border border-gold/15 bg-carbon p-6"
          >
            <span className="font-display text-3xl font-bold leading-none text-gold/40 md:text-4xl">
              {String(step.step).padStart(2, "0")}
            </span>
            <h4 className="mt-3 font-display text-base font-bold uppercase leading-snug text-ivory md:text-lg">
              {step.title}
            </h4>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ivory/70">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
