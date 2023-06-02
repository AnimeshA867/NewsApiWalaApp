// import logo from "./logo.svg";
import "./App.css";
import ErrorPage from "./components/ErrorPage";
import React, { Component } from "react";
import { NavBar } from "./components/NavBar";
import News from "./components/News";
import { Outlet } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
export default class App extends Component {
  c = "John";

  constructor() {
    super();

    this.state = {
      progress: 0,
    };
    this.root = this.root.bind(this);
  }
  setProgress = (progress) => {
    this.setState({ progress: progress });
  };
  root = () => {
    return (
      <>
        <LoadingBar
          color="#fff"
          progress={this.state.progress}
          onLoaderFinished={() => this.setProgress(0)}
        />
        <NavBar />;
        <Outlet />
      </>
    );
  };
  render() {
    let router = createBrowserRouter([
      {
        path: "/",
        element: this.root(),
        errorElement: <ErrorPage />,
        children: [
          { path: "", element: <News setProgress={this.setProgress} /> },
          {
            path: "science",
            element: <News setProgress={this.setProgress} search="science" />,
          },
          {
            path: "sports",
            element: <News setProgress={this.setProgress} search="sports" />,
          },
          {
            path: "entertainment",
            element: (
              <News setProgress={this.setProgress} search="entertainment" />
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
}
