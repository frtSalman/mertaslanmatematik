import { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const defaultColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
    valueFormatter: (value) => value ?? "N/A",
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

const defaultRows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function Students({
  rows = defaultRows,
  columns = defaultColumns,
  onRowSelectionChange,
  ...props
}) {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowSelection = (newSelection) => {
    setSelectedRows(newSelection);
    onRowSelectionChange?.(newSelection);
  };

  return (
    <Paper
      sx={{
        height: "100%",
        width: "100%",
        p: 1,
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        onRowSelectionModelChange={handleRowSelection}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
        components={{
          Toolbar: GridToolbar,
        }}
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
          // Pagination styling
          "& .MuiDataGrid-footerContainer": {
            // Pagination section font size
            fontFamily: "'Poppins', sans-serif",

            // Target specific pagination elements
            "& .MuiTablePagination-selectLabel": {
              // "Rows per page" text
              fontSize: 12,
            },
            "& .MuiInputBase-root": {
              // Page size dropdown
              fontSize: 12,
            },
            "& .MuiTablePagination-displayedRows": {
              // "1-5 of 10" text
              fontSize: 12,
            },
            "& .MuiButtonBase-root": {
              // Pagination buttons
              fontSize: 12,
              "&:disabled": {
                opacity: 0.5,
              },
            },
          },
        }}
        onCellClick={(params) => console.log("Cell clicked:", params)}
        onColumnHeaderClick={(params) =>
          console.log("Column header clicked:", params)
        }
        {...props}
      />
    </Paper>
  );
}
