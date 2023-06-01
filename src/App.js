// import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import { NavBar } from "./components/NavBar";
// import News from "./components/News";
import { Outlet } from "react-router-dom";
export default class App extends Component {
  c = "John";
  render() {
    return (
      <>
        <NavBar />;
        <Outlet />
      </>
    );
  }
}
