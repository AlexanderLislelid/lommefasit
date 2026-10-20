import { describe, expect, it } from "vitest";
import { basicAmount, calculateHolidayPay } from "./holidayPay";

describe("calculateHolidayPay", () => {
  it("bruker 10,2 % som standard", () => {
    expect(calculateHolidayPay(500_000, "standard", false).total).toBeCloseTo(
      51_000,
    );
  });

  it("bruker 12 % ved fem ukers ferie", () => {
    expect(calculateHolidayPay(500_000, "fiveWeeks", false).total).toBeCloseTo(
      60_000,
    );
  });

  it("gir 2,3 % ekstra over 60 år", () => {
    const pay = calculateHolidayPay(500_000, "standard", true);
    expect(pay.extra).toBeCloseTo(11_500);
    expect(pay.total).toBeCloseTo(62_500);
  });

  it("begrenser ekstra feriepenger til 6G", () => {
    const pay = calculateHolidayPay(1_000_000, "fiveWeeks", true);
    expect(pay.extra).toBeCloseTo(6 * basicAmount * 0.023);
  });

  it("gir null for negativt grunnlag", () => {
    expect(calculateHolidayPay(-1, "standard", true).total).toBe(0);
  });
});
