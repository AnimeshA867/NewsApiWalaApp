// import logo from "./logo.svg";
import "./App.css";
import ErrorPage from "./components/ErrorPage";
import React from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { Outlet } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

export default function App() {
  const apiKey = process.env.REACT_APP_NEWS_API;
  console.log(apiKey);
  const [progress, setProgress] = useState(0);
  let root = () => {
    return (
      <>
        <LoadingBar
          color="#fff"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <NavBar />;
        <Outlet />
      </>
    );
  };

  let router = createBrowserRouter([
    {
      path: "/",
      element: root(),
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <News apikey={apiKey} setProgress={setProgress} />,
        },
        {
          path: "science",
          element: (
            <News apikey={apiKey} setProgress={setProgress} search="science" />
          ),
        },
        {
          path: "sports",
          element: (
            <News apikey={apiKey} setProgress={setProgress} search="sports" />
          ),
        },
        {
          path: "entertainment",
          element: (
            <News
              apikey={apiKey}
              setProgress={setProgress}
              search="entertainment"
            />
          ),
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
