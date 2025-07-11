import {
  numericValueComparator,
  stringValueComparator,
} from "@core/utils/comparators";

describe("numericValueComparator", () => {
  it("returns positive when first number is greater", () => {
    expect(numericValueComparator("20", "10")).toBeGreaterThan(0);
  });
  it("returns negative when first number is smaller", () => {
    expect(numericValueComparator("5", "10")).toBeLessThan(0);
  });
  it("returns 0 when both numbers are equal", () => {
    expect(numericValueComparator("5", "5")).toBe(0);
  });
  it("handles negative numbers", () => {
    expect(numericValueComparator("5", "-10")).toBeGreaterThan(0);
  });
  it("returns NaN for non-numeric valus", () => {
    expect(numericValueComparator("5", "abc")).toBeNaN();
  });
});

describe("stringValueComparator", () => {
  it("returns negative when values are in alphabetical order", () => {
    expect(stringValueComparator("apple", "ball")).toBeLessThan(0);
  });
  it("returns positive when values are not in alphabetical order", () => {
    expect(stringValueComparator("ball", "apple")).toBeGreaterThan(0);
  });
  it("returns 0 when values are in same (case-insensitive)", () => {
    expect(stringValueComparator("apple", "Apple")).toBe(0);
  });
});
