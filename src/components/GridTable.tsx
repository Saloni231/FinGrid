import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  defaultColDef,
  GridHeader,
  paginationPageSize,
} from "../utils/agGridConfig";
import { GridValue } from "../domain/types";
import {
  GridApi,
  GridReadyEvent,
  ModuleRegistry,
  AllCommunityModule,
} from "ag-grid-community";
import "../styles/ag-custom.scss";
import { handleCSVRead } from "../application/csvReaderService";

ModuleRegistry.registerModules([AllCommunityModule]);

const GridTable: React.FC = () => {
  const [data, setData] = useState<GridValue[]>([]);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  };

  useEffect(() => {
    const fetchData = async () => {
      const csvData = await handleCSVRead();
      setData(csvData);
    };

    fetchData();
  }, []);

  return (
    <AgGridReact
      rowData={data}
      columnDefs={GridHeader}
      onGridReady={onGridReady}
      defaultColDef={defaultColDef}
      pagination={true}
      paginationPageSize={paginationPageSize}
      domLayout="autoHeight"
    />
  );
};

export default GridTable;
