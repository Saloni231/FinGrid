import { fireEvent, render, screen } from "@testing-library/react";
import ContractSizeButtons from "@ui/components/ContractSizeButtons";

describe("ContractSizeButtons Component", () => {
  const mockIncrement = jest.fn();
  const mockDecrement = jest.fn();

  beforeEach(() => {
    mockIncrement.mockClear();
    mockDecrement.mockClear();
  });

  it("call increment callback when button clicked", () => {
    render(
      <ContractSizeButtons
        increment={mockIncrement}
        decrement={mockDecrement}
      />
    );
    fireEvent.click(screen.getByText("Increment Contract Size"));
    expect(mockIncrement).toHaveBeenCalledTimes(1);
  });

  it("call decrement callback when button clicked", () => {
    render(
      <ContractSizeButtons
        increment={mockIncrement}
        decrement={mockDecrement}
      />
    );
    fireEvent.click(screen.getByText("Decrement Contract Size"));
    expect(mockDecrement).toHaveBeenCalledTimes(1);
  });
});
