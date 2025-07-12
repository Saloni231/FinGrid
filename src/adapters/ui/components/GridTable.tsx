import React from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";

import FilterBox from "./FilterBox";
import ContractSizeButtons from "./ContractSizeButtons";

import {
  defaultColDef,
  GridHeader,
  paginationPageSize,
} from "../constants/agGridConfig";

import { useGridData } from "../hooks/useGridData";

import styles from "../styles/grid-table.module.scss";

ModuleRegistry.registerModules([AllCommunityModule]);

const GridTable: React.FC = () => {
  const {
    filters,
    filterData,
    onGridReady,
    handleContractSizeChange,
    handleContractSizeFilter,
    handleFilterChange,
  } = useGridData();

  const handleIncrement = () => handleContractSizeChange(true);
  const handleDecrement = () => handleContractSizeChange(false);

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
            increment={handleIncrement}
            decrement={handleDecrement}
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
