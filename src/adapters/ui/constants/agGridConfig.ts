import { ColDef } from "ag-grid-community";
import {
  numericValueComparator,
  stringValueComparator,
} from "../../../core/utils/comparators";

export const GridHeader: ColDef[] = [
  {
    field: "ISIN",
    headerName: "ISIN",
    comparator: stringValueComparator,
  },
  {
    field: "CFICode",
    headerName: "CFICode",
    comparator: stringValueComparator,
  },
  {
    field: "Venue",
    headerName: "Venue",
    comparator: stringValueComparator,
  },
  {
    field: "ContractSize",
    headerName: "ContractSize",
    comparator: numericValueComparator,
  },
];

export const defaultColDef = { sortable: true, suppressMovable: true };

export const paginationPageSize = 20;
