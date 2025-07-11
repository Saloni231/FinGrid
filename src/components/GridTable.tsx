import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  GridReadyEvent,
  ModuleRegistry,
  AllCommunityModule,
} from "ag-grid-community";

import {
  defaultColDef,
  GridHeader,
  paginationPageSize,
} from "../utils/agGridConfig";

import { GridValue } from "../domain/types";
import { isNumeric } from "../domain/validator";

import { handleCSVRead } from "../application/csvReaderService";
import { filterDataOnFields } from "../application/filterDataService";
import { contractSizeService } from "../application/contractSizeService";

import FilterBox from "./FilterBox";
import ContractSizeButtons from "./ContractSizeButtons";

import styles from "../styles/grid-table.module.scss";

ModuleRegistry.registerModules([AllCommunityModule]);

const GridTable: React.FC = () => {
  const [data, setData] = useState<GridValue[]>([]);
  const [filterData, setFilterData] = useState<GridValue[]>([]);
  const [filters, setFilters] = useState({
    ISIN: "",
    CFICode: "",
    Venue: "",
    ContractSize: "",
  });

  const handleFilterChange = (field: keyof typeof filters, value: string) => {
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
    const filteringResult = filterDataOnFields(
      filters.ISIN,
      filters.CFICode,
      filters.Venue,
      filters.ContractSize,
      data
    );
    setFilterData(filteringResult);
  }, [filters, data]);

  useEffect(() => {
    const fetchData = async () => {
      const csvData = await handleCSVRead();
      setData(csvData);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className={styles.filterGroup}>
        <div>
          <FilterBox
            filterValue={filters.ISIN}
            label="Filter ISIN"
            handleInputChange={(e) =>
              handleFilterChange("ISIN", e.target.value)
            }
          />
          <FilterBox
            filterValue={filters.CFICode}
            label="Filter CFICode"
            handleInputChange={(e) =>
              handleFilterChange("CFICode", e.target.value)
            }
          />
          <FilterBox
            filterValue={filters.Venue}
            label="Filter Venue"
            handleInputChange={(e) =>
              handleFilterChange("Venue", e.target.value)
            }
          />
        </div>
        <div>
          <FilterBox
            filterValue={filters.ContractSize}
            label="Contract Size >"
            handleInputChange={handleContractSizeFilter}
          />
          <ContractSizeButtons
            increment={() => handleContractSizeChange(true)}
            decrement={() => handleContractSizeChange(false)}
          />
        </div>
      </div>

      <AgGridReact
        rowData={filterData}
        columnDefs={GridHeader}
        onGridReady={onGridReady}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={paginationPageSize}
        domLayout="autoHeight"
      />
    </>
  );
};

export default GridTable;
