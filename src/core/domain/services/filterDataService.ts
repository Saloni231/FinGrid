import { GridFilters, GridValue } from "../../../core/domain/models/types";

export const filterDataOnFields = (
  filters: GridFilters,
  rowData: GridValue[]
): GridValue[] => {

  const {ISIN, CFICode, Venue, ContractSize} = filters

  const isin = ISIN.toLowerCase();
  const cfi = CFICode.toLowerCase();
  const venue = Venue.toLowerCase();
  const contractSize = parseFloat(ContractSize);

  return rowData.filter(({ ISIN, CFICode, Venue, ContractSize }) => {
    const matchesISIN = ISIN.toLowerCase().includes(isin);
    const matchesCFI = CFICode.toLowerCase().includes(cfi);
    const matchesVenue = Venue.toLowerCase().includes(venue);
    const matchesContractSize =
      !contractSize || (parseFloat(ContractSize) > contractSize);

    return matchesISIN && matchesCFI && matchesVenue && matchesContractSize;
  });
};
