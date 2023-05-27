import React, { Component } from "react";

export class NewsItem extends Component {
  constructor() {
    super();
    console.log("News Item's Constructor");
  }
  render() {
    let { title, description, imgUrl, imgAlt, url } = this.props;
    return (
      <div className="my-3">
        <div className="card" style={{ width: "18rem" }}>
          <img
            src={imgUrl}
            className="card-img-top img-fluid"
            alt={imgAlt}
            style={{ width: "200px" }}
          />
          <div className="card-body">
            <h5 className="card-title">{title}..</h5>
            <p className="card-text text-truncate">{description}...</p>
            <a href={url} className="btn btn-primary btn-sm" target="blank">
              Read full article
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
