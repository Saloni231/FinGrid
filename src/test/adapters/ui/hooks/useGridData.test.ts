import { act, renderHook, waitFor } from "@testing-library/react";
import { useGridData } from "../../../../adapters/ui/hooks/useGridData";
import { GridValue } from "../../../../core/domain/models/types";

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

jest.mock("../../../../infrastructure/csv/csvReaderService", () => ({
  handleCSVRead: jest.fn(() => Promise.resolve(mockData)),
}));

describe("useGridData hook", () => {
  it("loads CSV data on mount", async () => {
    const { result } = renderHook(() => useGridData());

    await waitFor(() => expect(result.current.filterData).toHaveLength(2));

    expect(result.current.filterData[0].ISIN).toBe("DE000C4SA5W8");
  });

  it("filters by ISIN", async () => {
    const { result } = renderHook(() => useGridData());

    await waitFor(() => expect(result.current.filterData.length).toBe(2));

    act(() => {
      result.current.handleFilterChange("ISIN", "DE000");
    });

    await waitFor(() => expect(result.current.filterData).toHaveLength(1));
    expect(result.current.filterData[0].ISIN).toBe("DE000C4SA5W8");
  });

  it("filters by Contract size", async () => {
    const { result } = renderHook(() => useGridData());

    await waitFor(() => expect(result.current.filterData.length).toBe(2));

    act(() => {
      result.current.handleContractSizeFilter({
        target: { value: "60" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    await waitFor(() => expect(result.current.filterData).toHaveLength(1));
  });

  it("increments contract size", async () => {
    const { result } = renderHook(() => useGridData());

    await waitFor(() => expect(result.current.filterData.length).toBe(2));

    act(() => {
      result.current.handleContractSizeChange(true);
    });

    await waitFor(() => {
      const incrementedRow = result.current.filterData[0];
      expect(incrementedRow?.ContractSize).toBe("60.0");
    });
  });

  it("decrements contract size", async () => {
    const { result } = renderHook(() => useGridData());

    await waitFor(() => expect(result.current.filterData.length).toBe(2));

    act(() => {
      result.current.handleContractSizeChange(false);
    });

    await waitFor(() => {
      const incrementedRow = result.current.filterData[0];
      expect(incrementedRow?.ContractSize).toBe("40.0");
    });
  });

  it("rejects non‑numeric contract‑size input", async () => {
    const { result } = renderHook(() => useGridData());
    await waitFor(() => expect(result.current.filterData.length).toBe(2));

    act(() => {
      result.current.handleContractSizeFilter({
        target: { value: "abc" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.filters.ContractSize).toBe("");
  });
});
