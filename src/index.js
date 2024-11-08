import React from "react";
import "./styles/index.scss";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/posts" replace />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/posts",
    element: <App />,
    children: [
      {
        path: "/posts/:PostId",
        element: <App />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
