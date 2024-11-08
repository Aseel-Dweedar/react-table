import { useState } from "react";
import DataGrid from "../components/DataGrid";
import { useLoaderData } from "react-router-dom";

function Posts() {
  const data = useLoaderData();
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      filterFn: "includesString",
    },
    {
      accessorKey: "title",
      header: "Title",
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
      <h1 className="color-bright mb-30">POSTS LIST</h1>
      {data && (
        <DataGrid
          data={data}
          columns={columns}
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          redirectPath="/posts/"
          globalFilterFn="includesString"
        />
      )}
    </div>
  );
}

export async function loader() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  return data;
}

export default Posts;
