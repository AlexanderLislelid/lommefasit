import { describe, expect, it } from "vitest";
import { calculateOvertimePay, toHourlyWage } from "./overtime";

describe("toHourlyWage", () => {
  it("bruker timelønn direkte", () => {
    expect(toHourlyWage(300, "hourly")).toBe(300);
  });

  it("regner om årslønn med 1950 timer", () => {
    expect(toHourlyWage(585_000, "yearly")).toBeCloseTo(300);
  });

  it("regner om månedslønn med 1950 timer", () => {
    expect(toHourlyWage(48_750, "monthly")).toBeCloseTo(300);
  });

  it("gir null for negativ lønn", () => {
    expect(toHourlyWage(-1, "yearly")).toBe(0);
  });
});

describe("calculateOvertimePay", () => {
  it("gir 50 % tillegg", () => {
    const pay = calculateOvertimePay(300, 10, 0);
    expect(pay.total).toBeCloseTo(4_500);
    expect(pay.supplement).toBeCloseTo(1_500);
  });

  it("gir 100 % tillegg", () => {
    expect(calculateOvertimePay(300, 0, 5).total).toBeCloseTo(3_000);
  });

  it("summerer begge satser", () => {
    const pay = calculateOvertimePay(300, 10, 5);
    expect(pay.base).toBeCloseTo(4_500);
    expect(pay.supplement).toBeCloseTo(3_000);
    expect(pay.total).toBeCloseTo(7_500);
  });

  it("ignorerer negative timer", () => {
    expect(calculateOvertimePay(300, -2, -2).total).toBe(0);
  });
});
