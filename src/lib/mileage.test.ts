import { describe, expect, it } from "vitest";
import { calculateMileageAllowance } from "./mileage";

describe("calculateMileageAllowance", () => {
  it("bruker statens sats som standard", () => {
    const pay = calculateMileageAllowance(100, 0);
    expect(pay.total).toBeCloseTo(530);
    expect(pay.taxFree).toBeCloseTo(350);
    expect(pay.taxable).toBeCloseTo(180);
  });

  it("gir skattefritt passasjertillegg", () => {
    const pay = calculateMileageAllowance(100, 2);
    expect(pay.passengers).toBeCloseTo(200);
    expect(pay.total).toBeCloseTo(730);
    expect(pay.taxable).toBeCloseTo(180);
  });

  it("er helt skattefri når satsen er under trekkfri sats", () => {
    const pay = calculateMileageAllowance(100, 0, 3);
    expect(pay.total).toBeCloseTo(300);
    expect(pay.taxable).toBeCloseTo(0);
  });

  it("gir null for negative verdier", () => {
    expect(calculateMileageAllowance(-10, -1, -5).total).toBe(0);
  });
});
