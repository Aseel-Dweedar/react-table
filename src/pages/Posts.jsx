import { useEffect, useState } from "react";
import DataGrid from "../components/DataGrid";
import { useAPI } from "../hooks/useAPI.js";

function Posts() {
  const { apiCall, data, error, loading } = useAPI();

  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      filterFn: "equalsString",
    },
    { accessorKey: "title", header: "Title", filterFn: "includesString" },
    {
      accessorKey: "body",
      header: "Post",
      filterFn: "includesString",
    },
  ];

  useEffect(() => {
    apiCall("posts", "GET");
  }, [apiCall]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {data && (
        <DataGrid
          data={data}
          columns={columns}
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          globalFilterFn="includesString"
        />
      )}
    </div>
  );
}

export default Posts;
