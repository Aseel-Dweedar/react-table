import { useEffect, useState } from "react";
import DataGrid from "../components/DataGrid";
import { useAPI } from "../hooks/useAPI.js";
import { createColumnHelper } from "@tanstack/react-table";
import { Link, useParams } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage.jsx";
import Loading from "../pages/Loading.jsx";

function Posts() {
  const { PostId } = useParams();

  const { apiCall, error, loading } = useAPI();

  const columnHelper = createColumnHelper();

  const [data, setData] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => (
        <div className="d-flex align-items-center gap-20">
          {!PostId && (
            <Link to={`${info.getValue()}`}>
              <img
                src="show.png"
                alt="view post"
                width="30px"
                className="filter-white"
              ></img>
            </Link>
          )}
          <span>{info.getValue()}</span>
        </div>
      ),
      header: "ID",
      filterFn: "equalsString",
    }),
    {
      accessorKey: PostId ? "name" : "title",
      header: "Title",
      filterFn: "includesString",
    },
    ...(PostId
      ? [
          {
            accessorKey: "email",
            header: "Email",
            filterFn: "includesString",
          },
        ]
      : []),
    {
      accessorKey: "body",
      header: "Content",
      filterFn: "includesString",
    },
  ];

  useEffect(() => {
    apiCall(!PostId ? "posts" : "posts/" + PostId, "GET").then((response) => {
      if (!PostId) {
        setCurrentPost(null);
        setData(response.data);
      } else {
        setCurrentPost(response.data);
        apiCall("posts/" + PostId + "/comments", "GET").then(
          (commentsResponse) => {
            setData(commentsResponse.data);
          }
        );
      }
    });
  }, [PostId]);

  if (loading) return <Loading />;
  if (error) return <ErrorPage errorMsg={error} />;

  return (
    <div>
      <h1 className="mb-30">{PostId ? `POST#${PostId}` : "POSTS LIST"}</h1>
      {currentPost && <p className="mb-30">{currentPost.body}</p>}
      {data.length && (
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
