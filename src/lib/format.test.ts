import { describe, expect, it } from "vitest";
import { formatNok } from "./format";

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
