import CalculatorCard from "@/components/CalculatorCard";
import { calculators } from "@/lib/calculators";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-16">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {calculators
          .filter((calc) => calc.status !== "soon")
          .map((calc) => (
            <CalculatorCard key={calc.slug} calc={calc} />
          ))}
      </div>
    </main>
  );
}
