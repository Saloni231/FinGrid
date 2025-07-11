import { isNumeric } from "@core/utils/validator";

describe("isNumeric", () => {
  it("returns true for valid integers", () => {
    expect(isNumeric("0")).toBe(true);
    expect(isNumeric("123")).toBe(true);
  });

  it("returns true for valid decimals", () => {
    expect(isNumeric("5.0")).toBe(true);
    expect(isNumeric("5.")).toBe(true);
    expect(isNumeric("123.456")).toBe(true);
  });

  it("returns false for invalid numbers", () => {
    expect(isNumeric("5..")).toBe(false);
    expect(isNumeric("5.0.0")).toBe(false);
    expect(isNumeric("abc")).toBe(false);
    expect(isNumeric("12a")).toBe(false);
    expect(isNumeric("..5")).toBe(false);
  });

  it("returns true for empty string", () => {
    expect(isNumeric("")).toBe(true);
  });

  it("returns false for special characters", () => {
    expect(isNumeric("$%")).toBe(false);
    expect(isNumeric("-5")).toBe(false);
  });
});
