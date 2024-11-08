import CustomInput from "./CustomInput";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";

const DataGrid = ({
  data,
  columns,
  columnFilters,
  globalFilter,
  setColumnFilters,
  setGlobalFilter,
  globalFilterFn,
  redirectPath
}) => {
  const navigate = useNavigate();
  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn,
  });

  function handleRowClick(row) {
    navigate(redirectPath + row.original.id );
  }

  return (
    <div className="table-wrapper">
      <div className="d-flex justify-content-between mb-30">
        <div className="custom-search-input">
          <CustomInput
            value={globalFilter}
            onChange={table.setGlobalFilter}
            placeholder="Search..."
            type="text"
          />
        </div>
        <div className="d-flex align-items-center gap-10">
          <button
            className={`${
              !table.getCanPreviousPage() ? "disabled-pagination-button" : ""
            } pagination-button font-family-cursive`}
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className={`${
              !table.getCanPreviousPage() ? "disabled-pagination-button" : ""
            } pagination-button`}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"Previous"}
          </button>
          <input
            type="number"
            min="1"
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="form-control"
          />
          <span className="">of {table.getPageCount()}</span>
          <button
            className={`${
              !table.getCanNextPage() ? "disabled-pagination-button" : ""
            } pagination-button`}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {"Next"}
          </button>
          <button
            className={`${
              !table.getCanNextPage() ? "disabled-pagination-button" : ""
            } pagination-button font-family-cursive`}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
        </div>
      </div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  <div
                    className="mb-10"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {(() => {
                      const sortState = header.column.getIsSorted();
                      const sortIcons = {
                        asc: <button className="btn-asc sorting-btn" />,
                        desc: <button className="btn-desc sorting-btn" />,
                      };
                      return (
                        sortIcons[sortState] ?? (
                          <button className="btn-default-sort sorting-btn" />
                        )
                      );
                    })()}
                  </div>
                  <div>
                    <CustomInput
                      value={header.column.getFilterValue()}
                      onChange={header.column.setFilterValue}
                      placeholder="Search..."
                      type="text"
                      customStyle={{
                        width:
                          header.column.columnDef.header === "ID"
                            ? "50px"
                            : "auto",
                      }}
                    />
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr onClick={() => handleRowClick(row)} key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataGrid;
