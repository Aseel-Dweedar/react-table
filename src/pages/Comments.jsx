import { useState } from "react";
import DataGrid from "../components/DataGrid";
import { useLoaderData } from "react-router-dom";

function Comments() {
  const data = useLoaderData();

  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      filterFn: "equalsString",
    },
    {
      accessorKey: "name",
      header: "Title",
      filterFn: "includesString",
    },
    {
      accessorKey: "email",
      header: "Email",
      filterFn: "includesString",
    },
    {
      accessorKey: "body",
      header: "Content",
      filterFn: "includesString",
    },
  ];

  return (
    <div>
      <h1 className="color-bright mb-30">COMMENTS LIST</h1>
      {data && (
        <DataGrid
          data={data}
          columns={columns}
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          globalFilterFn="includesString"
          redirectPath="/comments/"
        />
      )}
    </div>
  );
}

export async function loader() {
  const res = await fetch("https://jsonplaceholder.typicode.com/comments");
  const data = await res.json();
  return data;
}

export default Comments;
