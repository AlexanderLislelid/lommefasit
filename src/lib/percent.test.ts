import { describe, expect, it } from "vitest";
import { amountOf, applyDiscount, percentChange, percentOf } from "./percent";

describe("percentOf", () => {
  it("regner ut andel i prosent", () => {
    expect(percentOf(25, 200)).toBeCloseTo(12.5);
  });

  it("gir null når helheten er null", () => {
    expect(percentOf(5, 0)).toBeNull();
  });
});

describe("amountOf", () => {
  it("regner ut prosent av et tall", () => {
    expect(amountOf(15, 400)).toBeCloseTo(60);
  });
});

describe("percentChange", () => {
  it("gir positiv endring ved økning", () => {
    expect(percentChange(80, 100)).toBeCloseTo(25);
  });

  it("gir negativ endring ved nedgang", () => {
    expect(percentChange(100, 80)).toBeCloseTo(-20);
  });

  it("håndterer negativt utgangspunkt", () => {
    expect(percentChange(-50, -25)).toBeCloseTo(50);
  });

  it("gir null når utgangspunktet er null", () => {
    expect(percentChange(0, 10)).toBeNull();
  });
});

describe("applyDiscount", () => {
  it("trekker fra rabatten", () => {
    const discount = applyDiscount(499, 20);
    expect(discount.saved).toBeCloseTo(99.8);
    expect(discount.price).toBeCloseTo(399.2);
  });
});
