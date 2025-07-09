import Papa from "papaparse";
import { GridValue } from "../domain/types";

export const handleCSVRead = async (): Promise<GridValue[]> => {
  const response = await fetch("/ReactDataTest_Input.csv");
  const text = await response.text();

  const result = Papa.parse<GridValue>(text, {
    header: true,
    skipEmptyLines: true,
  });
  return result.data;
};
