import { GridValue } from "../domain/types";

export const contractSizeService = (
  isIncrement: boolean,
  rowData: GridValue[],
  filterData: GridValue[]
): GridValue[] => {
  const filterMap = new Map(filterData.map((item) => [item.ISIN, true]));

  return rowData.map((data) => {
    const shouldUpdate = filterMap.has(data.ISIN);
    let size = parseFloat(data.ContractSize);

    if (shouldUpdate) {
      size = isIncrement ? size + 10 : Math.max(0, size - 10);
    }

    return { ...data, ContractSize: size.toFixed(2) };
  });
};
