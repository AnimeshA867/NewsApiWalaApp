import React, { Component } from "react";
import "./spinner.css";
export class spinner extends Component {
  render() {
    return (
      <>
        <div id="loading-bar-spinner" class="spinner">
          <div class="spinner-icon"></div>
        </div>
      </>
    );
  }
}

export default spinner;
