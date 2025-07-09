import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { AgGridReact } from "ag-grid-react";
import { GridHeader } from "../utils/GridHeader";
import { GridValue } from "../domain/data";
import {
  GridApi,
  GridReadyEvent,
  ModuleRegistry,
  AllCommunityModule,
} from "ag-grid-community";
import "../styles/ag-custom.scss";

ModuleRegistry.registerModules([AllCommunityModule]);

const GridTable: React.FC = () => {
  const [data, setData] = useState<GridValue[]>([]);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);

  const handleCSVRead = () => {
    fetch("/ReactDataTest_Input.csv")
      .then((res) => res.text())
      .then((text) => {
        const result = Papa.parse<GridValue>(text, {
          header: true,
          skipEmptyLines: true,
        });
        setData(result.data);
      });
  };

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  };

  useEffect(() => {
    handleCSVRead();
  }, []);

  return (

      <AgGridReact
        rowData={data}
        columnDefs={GridHeader}
        onGridReady={onGridReady}
        defaultColDef={{ sortable: true }}
        pagination={true}
        paginationPageSize={20}
        domLayout="autoHeight"
      />

  );
};

export default GridTable;
