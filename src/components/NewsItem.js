import React, { Component } from "react";

export class NewsItem extends Component {
  constructor() {
    super();
    console.log("News Item's Constructor");
  }
  render() {
    let { title, imgUrl, imgAlt, url } = this.props;
    return (
      <div className="my-3">
        <div className="card" style={{ width: "18rem", height: "22rem" }}>
          <img
            src={imgUrl}
            className="card-img-top img-fluid"
            alt={imgAlt}
            style={{ height: "10rem" }}
          />
          <div className="card-body text-center align-bottom">
            <h5 className="card-title">{title}</h5>
            <a
              href={url}
              className="btn btn-primary btn-sm align-bottom"
              target="blank"
            >
              Read full article
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
