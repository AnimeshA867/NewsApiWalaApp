import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, imgUrl, imgAlt, url, description } = this.props;
    return (
      <div className="card" style={{ width: "24rem" }}>
        <img
          src={imgUrl}
          className="card-img-top img-fluid"
          alt={imgAlt}
          style={{ height: "10rem" }}
          data-toggle="tooltip"
          data-placement="top"
          title={description}
        />
        <div className="card-body d-flex flex-column justify-content-between align-items-center text-center">
          <h5 className="card-title">{title}</h5>
          <a
            href={url}
            className="btn btn-dark btn-sm align-bottom w-50"
            target="blank"
          >
            Read full article
          </a>
        </div>
      </div>
    );
  }
}

export default NewsItem;
