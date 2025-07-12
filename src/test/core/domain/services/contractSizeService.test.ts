import { GridValue } from "../../../../core/domain/models/types";
import { contractSizeService } from "../../../../core/domain/services/contractSizeService";

const baseMockRowData: GridValue[] = [
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

const baseMockFilterData: GridValue[] = [
  {
    ISIN: "PL0GF0019331",
    CFICode: "OCASPS",
    Venue: "WDER",
    ContractSize: "100.0",
  },
];

describe("contractSizeService", () => {
  it("increments contract size by 10 for filtered items", () => {
    const result = contractSizeService(
      true,
      baseMockRowData,
      baseMockFilterData
    );
    expect(result[0]).toEqual(baseMockRowData[0]);
    expect(result[1]).toEqual({ ...baseMockRowData[1], ContractSize: "110.0" });
  });

  it("decrements contract size by 10 for filtered items", () => {
    const result = contractSizeService(
      false,
      baseMockRowData,
      baseMockFilterData
    );
    expect(result[0]).toEqual(baseMockRowData[0]);
    expect(result[1]).toEqual({ ...baseMockRowData[1], ContractSize: "90.0" });
  });

  it("leaves data untouched when filterData is empty", () => {
    const result = contractSizeService(false, baseMockRowData, []);
    expect(result).toEqual(baseMockRowData);
  });

  it("does not decrement if ContractSize ≤ 9", () => {
    const rowData: GridValue[] = [
      baseMockRowData[0],
      { ...baseMockFilterData[0], ContractSize: "5.0" },
    ];
    const filterData = [rowData[1]];
    const result = contractSizeService(false, rowData, filterData);
    expect(result[1].ContractSize).toBe("5.0");
  });

  it("decrements ContractSize from 10.0 to 0.0", () => {
    const rowData: GridValue[] = [
      baseMockRowData[0],
      { ...baseMockFilterData[0], ContractSize: "10.0" },
    ];
    const filterData = [rowData[1]];
    const result = contractSizeService(false, rowData, filterData);

    expect(result[1].ContractSize).toBe("0.0");
  });

  it("does not update records with same ISIN but different CFICode/Venue", () => {
    const rowData: GridValue[] = [
      baseMockRowData[0],
      baseMockRowData[1],
      {
        ISIN: "PL0GF0019331",
        CFICode: "DIFFERENT",
        Venue: "WDER",
        ContractSize: "5.0",
      },
    ];
    const result = contractSizeService(true, rowData, baseMockFilterData);
    expect(result[2].ContractSize).toBe("5.0");
  });

  it("updates all matching ISIN + CFICode + Venue entries", () => {
    const rowData: GridValue[] = [
      baseMockRowData[0],
      baseMockRowData[1],
      { ...baseMockFilterData[0], ContractSize: "5.0" },
    ];
    const result = contractSizeService(true, rowData, baseMockFilterData);

    expect(result[1].ContractSize).toBe("110.0");
    expect(result[2].ContractSize).toBe("15.0");
  });
});
