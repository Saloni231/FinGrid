import { GridValue } from "../../../../core/domain/models/types";
import { filterDataOnFields } from "../../../../core/domain/services/filterDataService";


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
    const result = filterDataOnFields(
      { ISIN: "", CFICode: "", Venue: "", ContractSize: "" },
      mockData
    );
    expect(result).toHaveLength(2);
    expect(result).toEqual(mockData);
  });

  it("filters by ISIN substring (case-insensitive)", () => {
    const result = filterDataOnFields(
      { ISIN: "pl0gf", CFICode: "", Venue: "", ContractSize: "" },
      mockData
    );
    expect(result).toHaveLength(1);
    expect(result[0].ISIN).toBe("PL0GF0019331");
  });

  it("filters by CFICode substring (case-insensitive)", () => {
    const result = filterDataOnFields(
      { ISIN: "", CFICode: "ff", Venue: "", ContractSize: "" },
      mockData
    );
    expect(result).toHaveLength(1);
    expect(result[0].CFICode).toBe("FFICSX");
  });

  it("filters by Venue substring (case-insensitive)", () => {
    const result = filterDataOnFields(
      { ISIN: "", CFICode: "", Venue: "wde", ContractSize: "" },
      mockData
    );
    expect(result).toHaveLength(1);
    expect(result[0].Venue).toBe("WDER");
  });

  it("filters by ContractSize greater than given number", () => {
    const result = filterDataOnFields(
      { ISIN: "", CFICode: "", Venue: "", ContractSize: "60" },
      mockData
    );
    expect(result).toHaveLength(1);
    expect(result[0].ContractSize).toBe("100.0");
  });

  it("filters by all fields combined", () => {
    const result = filterDataOnFields(
      { ISIN: "de000", CFICode: "fficsx", Venue: "xeur", ContractSize: "40" },
      mockData
    );
    expect(result).toHaveLength(1);
    expect(result[0].ISIN).toBe("DE000C4SA5W8");
  });

  it("returns empty array if no data matches filters", () => {
    const result = filterDataOnFields(
      { ISIN: "xyz", CFICode: "abc", Venue: "sada", ContractSize: "1000" },
      mockData
    );
    expect(result).toHaveLength(0);
  });
});
