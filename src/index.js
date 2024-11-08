import React from "react";
import "./styles/index.scss";
import ReactDOM from "react-dom/client";
import Layout from "./components/Layout.jsx";
import Posts, { loader as postsLoader } from "./pages/Posts";
import PostDetails, {
  loader as postDetailsLoader,
} from "./components/PostDetails";
import Comments, { loader as commentsLoader } from "./pages/Comments";
import CommentDetails, {
  loader as commentDetailsLoader,
} from "./components/CommentDetails";
import Loading from "./pages/Loading";
import ErrorPage from "./pages/ErrorPage";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    loadingElement: <Loading />,
    children: [
      {
        path: "/",
        element: <Navigate to="/posts" replace />,
      },
      {
        path: "/posts",
        element: <Posts />,
        loader: postsLoader,
      },
      {
        path: "/posts/:postId",
        element: <PostDetails />,
        loader: postDetailsLoader,
      },
      {
        path: "/comments",
        element: <Comments />,
        loader: commentsLoader,
      },
      {
        path: "/comments/:commentId",
        element: <CommentDetails />,
        loader: commentDetailsLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
