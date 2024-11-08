import { useState } from "react";
import DataGrid from "../components/DataGrid";
import { useLoaderData } from "react-router-dom";

function PostDetails() {
  const { postData, commentData } = useLoaderData();

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
      <h1 className="color-bright mb-30">POST#{postData.id}</h1>
      {postData && <p className="mb-30">{postData.body}</p>}
      {commentData && (
        <DataGrid
          data={commentData}
          columns={columns}
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          redirectPath="/comments/"
          globalFilterFn="includesString"
        />
      )}
    </div>
  );
}

export async function loader({ params }) {
  const postRes = await fetch(
    "https://jsonplaceholder.typicode.com/posts/" + params.postId
  );
  const postData = await postRes.json();

  const commentRes = await fetch(
    "https://jsonplaceholder.typicode.com/posts/" + params.postId + "/comments"
  );
  const commentData = await commentRes.json();

  return { postData, commentData };
}

export default PostDetails;