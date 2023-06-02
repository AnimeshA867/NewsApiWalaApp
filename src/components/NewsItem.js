import React from "react";

export default function NewsItem(props) {
  let { title, imgUrl, imgAlt, url, description } = props;
  return (
    <div className="card" style={{ width: "24rem" }}>
      {imgUrl && (
        <img
          src={imgUrl}
          className="card-img-top img-fluid"
          alt={imgAlt}
          style={{ minHeight: "12rem", objectFit: "contain" }}
          data-toggle="tooltip"
          data-placement="top"
          title={description}
        />
      )}
      {!imgUrl && (
        <div
          style={{ minHeight: "12rem" }}
          className="text-center d-flex justify-content-center align-items-center fs-1 fw-bold"
        >
          Picture Not Availabe{" "}
        </div>
      )}
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
