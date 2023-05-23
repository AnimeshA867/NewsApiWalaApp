import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imgUrl, imgAlt, url } = this.props;

    return (
      <div>
        <div className="card" style={{ width: "18rem" }}>
          <img src="..." className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">{this.props.description}</p>
            <a href={`{url}`} className="btn btn-primary">
              Read full article
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
