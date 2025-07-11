import { GridValue } from "@ui/models/types";

export const contractSizeService = (
  isIncrement: boolean,
  rowData: GridValue[],
  filterData: GridValue[]
): GridValue[] => {
  const key = (data: GridValue) => `${data.ISIN}-${data.CFICode}-${data.Venue}`;
  const filterMap = new Map(filterData.map((item) => [key(item), true]));

  return rowData.map((data) => {
    const shouldUpdate = filterMap.has(key(data));
    let size = parseFloat(data.ContractSize);

    if (shouldUpdate) {
      if (isIncrement) {
        size += 10;
      } else if (size > 9) {
        size -= 10;
      }
    }

    return { ...data, ContractSize: size.toFixed(1) };
  });
};
