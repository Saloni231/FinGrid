import { GridReadyEvent } from "ag-grid-community";
import { useEffect, useState } from "react";

import { GridFilters, GridValue } from "../../../core/domain/models/types";
import { contractSizeService } from "../../../core/domain/services/contractSizeService";
import { filterDataOnFields } from "../../../core/domain/services/filterDataService";
import { isNumeric } from "../../../core/utils/validator";

import { handleCSVRead } from "../../../infrastructure/csv/csvReaderService";

export const useGridData = () => {
  const [data, setData] = useState<GridValue[]>([]);
  const [filterData, setFilterData] = useState<GridValue[]>([]);
  const [filters, setFilters] = useState<GridFilters>({
    ISIN: "",
    CFICode: "",
    Venue: "",
    ContractSize: "",
  });

  const handleFilterChange = (field: keyof GridFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const onGridReady = (params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
  };

  const handleContractSizeChange = (isIncrement: boolean) => {
    const updatedRows = contractSizeService(isIncrement, data, filterData);
    setData([...updatedRows]);
  };

  const handleContractSizeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isNumeric(value)) {
      setFilters((prev) => ({ ...prev, ContractSize: value }));
    }
  };

  useEffect(() => {
    const filteringResult = filterDataOnFields(filters, data);
    setFilterData([...filteringResult]);
  }, [filters, data]);

  useEffect(() => {
    const fetchData = async () => {
      const csvData = await handleCSVRead();
      setData(csvData);
    };

    fetchData();
  }, []);

  return {
    data,
    filters,
    filterData,
    handleFilterChange,
    onGridReady,
    handleContractSizeChange,
    handleContractSizeFilter,
  };
};
