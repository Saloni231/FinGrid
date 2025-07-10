import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  defaultColDef,
  GridHeader,
  paginationPageSize,
} from "../utils/agGridConfig";
import { GridValue } from "../domain/types";
import {
  GridReadyEvent,
  ModuleRegistry,
  AllCommunityModule,
} from "ag-grid-community";
import "../styles/ag-custom.scss";
import { handleCSVRead } from "../application/csvReaderService";
import FilterBox from "./FilterBox";
import {
  filterDataOnFields,
} from "../application/filterDataService";
import ContractSizeButtons from "./ContractSizeButtons";
import { contractSizeService } from "../application/contractSizeService";
import { isNumeric } from "../domain/validator";

ModuleRegistry.registerModules([AllCommunityModule]);

const GridTable: React.FC = () => {
  const [data, setData] = useState<GridValue[]>([]);
  const [filterData, setFilterData] = useState<GridValue[]>([]);
  const [contractSizeFilter, setContractSizeFilter] = useState("");
  const [ISINFilter, setISINFilter] = useState("");
  const [CFICodeFilter, setCFICodeFilter] = useState("");
  const [VenueFilter, setVenueFilter] = useState("");

  const onGridReady = (params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
  };

  const handleIncrement = () => {
    setData(contractSizeService(true, data, filterData));
  };

  const handleDecrement = () => {
    setData(contractSizeService(false, data, filterData));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isNumeric(value)) {
      setContractSizeFilter(value);
    }
  };

  useEffect(() => {

    const filteringResult = filterDataOnFields(
      ISINFilter,
      CFICodeFilter,
      VenueFilter,
      contractSizeFilter,
      data
    );

    setFilterData(filteringResult);
  }, [ISINFilter, CFICodeFilter, VenueFilter, contractSizeFilter, data]);

  useEffect(() => {
    const fetchData = async () => {
      const csvData = await handleCSVRead();
      setData(csvData);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="filter-group">
        <div>
          <FilterBox
            filterValue={ISINFilter}
            label="Filter ISIN"
            handleInputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setISINFilter(e.target.value)
            }
          />
          <FilterBox
            filterValue={CFICodeFilter}
            label="Filter CFICode"
            handleInputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCFICodeFilter(e.target.value)
            }
          />
          <FilterBox
            filterValue={VenueFilter}
            label="Filter Venue"
            handleInputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setVenueFilter(e.target.value)
            }
          />
        </div>
        <div>
          <FilterBox
            filterValue={contractSizeFilter}
            label="Contract Size >"
            handleInputChange={handleInputChange}
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
