import { fireEvent, render, screen } from "@testing-library/react";
import { GridValue } from "../../../../core/domain/models/types";
import GridTable from "../../../../adapters/ui/components/GridTable";

const getMockCSVData = (): GridValue[] => [
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
  handleCSVRead: () => Promise.resolve(getMockCSVData())
}));

describe("GridTable Component", () => {
  it("renders grid with CSV data", async () => {
    render(<GridTable />);

    expect(await screen.findByText("DE000C4SA5W8")).toBeInTheDocument();
    expect(await screen.findByText("PL0GF0019331")).toBeInTheDocument();
    expect(await screen.findByText("100.0")).toBeInTheDocument();
  });

  it("renders all filter input boxes", async () => {
    render(<GridTable />);

    expect(
      await screen.findByPlaceholderText("Filter ISIN")
    ).toBeInTheDocument();
    expect(
      await screen.findByPlaceholderText("Filter CFICode")
    ).toBeInTheDocument();
    expect(
      await screen.findByPlaceholderText("Filter Venue")
    ).toBeInTheDocument();
    expect(
      await screen.findByPlaceholderText("Contract Size >")
    ).toBeInTheDocument();
  });

  it("filters grid when ISIN input is typed", async () => {
    render(<GridTable />);

    const input = await screen.findByPlaceholderText("Filter ISIN");
    fireEvent.change(input, { target: { value: "DE000C4SA5W8" } });

    expect(await screen.findByText("DE000C4SA5W8")).toBeInTheDocument();
    expect(screen.queryByText("PL0GF0019331")).not.toBeInTheDocument();
  });

  it("filters grid when CFICode input is typed", async () => {
    render(<GridTable />);

    const input = await screen.findByPlaceholderText("Filter CFICode");
    fireEvent.change(input, { target: { value: "OCASPS" } });

    expect(screen.queryByText("DE000C4SA5W8")).not.toBeInTheDocument();
    expect(await screen.findByText("PL0GF0019331")).toBeInTheDocument();
  });

  it("filters grid when Venue input is typed", async () => {
    render(<GridTable />);

    const input = await screen.findByPlaceholderText("Filter Venue");
    fireEvent.change(input, { target: { value: "XEUR" } });

    expect(await screen.findByText("DE000C4SA5W8")).toBeInTheDocument();
    expect(screen.queryByText("PL0GF0019331")).not.toBeInTheDocument();
  });

  it("should display No Rows found when filter doesn't match", async () => {
    render(<GridTable />);

    const input = await screen.findByPlaceholderText("Filter Venue");
    fireEvent.change(input, { target: { value: "abcd" } });

    expect(screen.queryByText("DE000C4SA5W8")).not.toBeInTheDocument();
    expect(screen.queryByText("PL0GF0019331")).not.toBeInTheDocument();
  });

  it("Filters grid when contract size is typed (greater than)", async () => {
    render(<GridTable />);

    const input = await screen.findByPlaceholderText("Contract Size >");
    fireEvent.change(input, { target: { value: "60" } });

    expect(screen.queryByText("DE000C4SA5W8")).not.toBeInTheDocument();
    expect(await screen.findByText("PL0GF0019331")).toBeInTheDocument();
  });

  it("should not accept alphabets in Contract Size input", async () => {
    render(<GridTable />);

    const input = await screen.findByPlaceholderText("Contract Size >");
    fireEvent.change(input, { target: { value: "abcs" } });

    expect((input as HTMLInputElement).value).toBe("");
  });

  it("increments contract size for filtered rows", async () => {
    render(<GridTable />);

    const input = await screen.findByPlaceholderText("Contract Size >");
    fireEvent.change(input, { target: { value: "10" } });

    fireEvent.click(await screen.findByText("Increment Contract Size"));

    expect(await screen.findByText("60.0")).toBeInTheDocument();
  });

  it("decrements contract size for filtered rows", async () => {
    render(<GridTable />);

    const input = await screen.findByPlaceholderText("Contract Size >");
    fireEvent.change(input, { target: { value: "10" } });

    fireEvent.click(await screen.findByText("Decrement Contract Size"));

    expect(await screen.findByText("40.0")).toBeInTheDocument();
  });
});
