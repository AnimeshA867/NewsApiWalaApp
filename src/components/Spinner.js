import React, { Component } from "react";
import loader from "./loader.gif";
export class spinner extends Component {
  render() {
    return (
      <div className="text-center position-relative top-50 start-50 translate-middle z-3">
        <img src={loader} alt="Loading" style={{ width: "100px" }} />
      </div>
    );
  }
}

export default spinner;
