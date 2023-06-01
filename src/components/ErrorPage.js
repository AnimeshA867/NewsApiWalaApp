import React, { Component } from "react";

export default class ErrorPage extends Component {
  render() {
    return (
      <div className="container-fluid d-flex justify-content-center align-items-center vh-100 flex-column ">
        <div className="fs-1 text d-block p-3">Error!</div>
        <div className="fw-medium fs-3 d-block">Unexpected Error Happened!</div>
      </div>
    );
  }
}
