import { describe, expect, it } from "vitest";
import { formatNok, formatNumber, parseNumber } from "./format";

// Intl bruker hardt mellomrom (U+00A0), så "kr" ikke brytes til ny linje
const nbsp = " ";

describe("formatNok", () => {
  it("formaterer med tusenskilje og kr", () => {
    expect(formatNok(1234567)).toBe(`1${nbsp}234${nbsp}567${nbsp}kr`);
  });

  it("runder av til hele kroner", () => {
    expect(formatNok(99.6)).toBe(`100${nbsp}kr`);
  });
});

describe("formatNumber", () => {
  it("bruker komma og maks to desimaler", () => {
    expect(formatNumber(12.3456)).toBe("12,35");
  });

  it("dropper desimaler for heltall", () => {
    expect(formatNumber(1500)).toBe(`1${nbsp}500`);
  });
});

describe("parseNumber", () => {
  it("bruker komma som desimaltegn på norsk", () => {
    expect(parseNumber("1 234,5")).toBe(1234.5);
  });

  it("bruker komma som tusenskilje på engelsk", () => {
    expect(parseNumber("550,000", "en")).toBe(550_000);
    expect(parseNumber("1,234.5", "en")).toBe(1234.5);
  });

  it("gir null for ugyldig tekst", () => {
    expect(parseNumber("abc")).toBe(0);
  });
});

describe("formatNok på engelsk", () => {
  it("bruker NOK og komma som tusenskilje", () => {
    expect(formatNok(51_000, "en")).toBe(`NOK${nbsp}51,000`);
  });
});
