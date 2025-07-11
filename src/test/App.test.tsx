import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders Filter ISIN label", () => {
  render(<App />);
  expect(screen.getByText(/Filter ISIN/i)).toBeInTheDocument();
});
