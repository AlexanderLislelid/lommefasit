import JsonLd from "@/components/JsonLd";

export type FaqItem = { question: string; answer: string };

export default function Faq({
  items,
  title = "Vanlige spørsmål",
}: {
  items: FaqItem[];
  title?: string;
}) {
  return (
    <section className="mt-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />
      <h2 className="font-display text-2xl font-semibold tracking-tight text-gray-900">
        {title}
      </h2>
      <div className="mt-6 grid gap-3">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-gray-900">
              {item.question}
              <span
                aria-hidden
                className="text-gray-400 transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 leading-relaxed text-gray-600">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
