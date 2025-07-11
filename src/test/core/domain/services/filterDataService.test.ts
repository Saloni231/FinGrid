import { filterDataOnFields } from "@core/domain/services/filterDataService";
import { GridValue } from "@ui/models/types";

const mockData: GridValue[] = [
  {
    ISIN: "DE000C4SA5W8",
    CFICode: "FFICSX",
    Venue: "XEUR",
    ContractSize: "50.0",
  },
  {
    ISIN: "PL0GF0019331",
    CFICode: "OCASPS",
    Venue: "WDER",
    ContractSize: "100.0",
  },
];

describe("filterDataOnFields", () => {
  it("returns all data when all filters are empty", () => {
    const result = filterDataOnFields("", "", "", "", mockData);
    expect(result).toHaveLength(2);
    expect(result).toEqual(mockData);
  });

  it("filters by ISIN substring (case-insensitive)", () => {
    const result = filterDataOnFields("pl0gf", "", "", "", mockData);
    expect(result).toHaveLength(1);
    expect(result[0].ISIN).toBe("PL0GF0019331");
  });

  it("filters by CFICode substring (case-insensitive)", () => {
    const result = filterDataOnFields("", "ff", "", "", mockData);
    expect(result).toHaveLength(1);
    expect(result[0].CFICode).toBe("FFICSX");
  });

  it("filters by Venue substring (case-insensitive)", () => {
    const result = filterDataOnFields("", "", "wde", "", mockData);
    expect(result).toHaveLength(1);
    expect(result[0].Venue).toBe("WDER");
  });

  it("filters by ContractSize greater than given number", () => {
    const result = filterDataOnFields("", "", "", "60", mockData);
    expect(result).toHaveLength(1);
    expect(result[0].ContractSize).toBe("100.0");
  });

  it("filters by all fields combined", () => {
    const result = filterDataOnFields(
      "de000",
      "fficsx",
      "xeur",
      "40",
      mockData
    );
    expect(result).toHaveLength(1);
    expect(result[0].ISIN).toBe("DE000C4SA5W8");
  });

  it("returns empty array if no data matches filters", () => {
    const result = filterDataOnFields("xyz", "abc", "zzz", "1000", mockData);
    expect(result).toHaveLength(0);
  });
});
