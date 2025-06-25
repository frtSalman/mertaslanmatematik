import { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

import { useDispatch } from "react-redux";

let rawData;

const defaultColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Adı Soyadı", width: 130 },
  { field: "grade", headerName: "Sınıfı", width: 130 },
];

export default function StudentList({
  rows,
  columns = defaultColumns,
  onRowSelectionChange,
  selectedRows = [],
  ...props
}) {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const handleRowSelection = (newSelection) => {
    onRowSelectionChange?.(newSelection);
  };

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        initialState={{
          sorting: {
            sortModel: [{ field: "id", sort: "asc" }],
          },
        }}
        rows={rows}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        checkboxSelection
        rowSelectionModel={selectedRows}
        onRowSelectionModelChange={handleRowSelection}
        disableRowSelectionOnClick
        components={{ Toolbar: GridToolbar }}
        sx={{
          border: 0,
          "& .MuiDataGrid-row:nth-of-type(even)": {
            backgroundColor: "#fafafa",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f5f5f5",
          },
          fontSize: 12,
          fontFamily: "'Poppins',sans-serif",
          "& .MuiDataGrid-footerContainer": {
            fontFamily: "'Poppins', sans-serif",
            "& .MuiTablePagination-selectLabel": {
              fontSize: 12,
            },
            "& .MuiInputBase-root": {
              fontSize: 12,
            },
            "& .MuiTablePagination-displayedRows": {
              fontSize: 12,
            },
            "& .MuiButtonBase-root": {
              fontSize: 12,
              "&:disabled": {
                opacity: 0.5,
              },
            },
          },
        }}
        {...props}
      />
    </Paper>
  );
}
