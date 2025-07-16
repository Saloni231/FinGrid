export interface GridValue {
  ISIN: string;
  CFICode: string;
  Venue: string;
  ContractSize: string;
}

export type GridFilters = {
  ISIN: string;
  CFICode: string;
  Venue: string;
  ContractSize: string;
};
