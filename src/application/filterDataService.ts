import { GridValue } from "../domain/types";

export const filterDataOnFields = (
  ISINFilter: string,
  CFICodeFilter: string,
  VenueFilter: string,
  contractSizeFilter: string,
  rowData: GridValue[]
): GridValue[] => {
  const isin = ISINFilter.toLowerCase();
  const cfi = CFICodeFilter.toLowerCase();
  const venue = VenueFilter.toLowerCase();
  const contractSize = parseFloat(contractSizeFilter);

  return rowData.filter(({ ISIN, CFICode, Venue, ContractSize }) => {
    const matchesISIN = ISIN.toLowerCase().includes(isin);
    const matchesCFI = CFICode.toLowerCase().includes(cfi);
    const matchesVenue = Venue.toLowerCase().includes(venue);
    const matchesContractSize =
      !contractSizeFilter || parseFloat(ContractSize) > contractSize;

    return matchesISIN && matchesCFI && matchesVenue && matchesContractSize;
  });
};
