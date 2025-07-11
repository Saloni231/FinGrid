import { fireEvent, render, screen } from "@testing-library/react";
import FilterBox from "../../components/FilterBox";

describe("FilterBox Component", () => {
  const mockInputChange = jest.fn();

  beforeEach(() => {
    mockInputChange.mockClear();
  });

  it("renders with provided label and input value", () => {
    render(
      <FilterBox
        label="ISIN"
        filterValue="ISINValue"
        handleInputChange={mockInputChange}
      />
    );

    expect(screen.getByLabelText("ISIN")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("ISIN")).toBeInTheDocument();
  });

  it("calls handleInputChange on user input", () => {
    render(
      <FilterBox
        label="ISIN"
        filterValue="ISINValue"
        handleInputChange={mockInputChange}
      />
    );

    const input = screen.getByPlaceholderText("ISIN");
    fireEvent.change(input, { target: { value: "ABCD" } });

    expect(mockInputChange).toHaveBeenCalledTimes(1);
    expect(mockInputChange).toHaveBeenCalledWith(expect.any(Object));
  });
});
