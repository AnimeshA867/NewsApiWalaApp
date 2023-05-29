import React, { Component } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
export class NavBar extends Component {
  render() {
    // let search1 = document.getElementById("searchCategory");
    let val;
    // console.log(search1.value);

    function handleSearch() {}
    return (
      <nav className="navbar-dark bg-dark navbar-expand-lg navbar">
        <div className="container-fluid">
          <Link className="navbar-brand" to={`/`}>
            NewsHero
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={`/ `}>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to={`/Science`}
                >
                  Science
                </Link>
              </li>
              <li>
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to={`/Movies`}
                >
                  Movies
                </Link>
              </li>
              <li>
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to={`/sports`}
                >
                  Sports
                </Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                id="searchCategory"
              />
              <button
                className="btn btn-outline-success"
                type="submit"
                onClick={handleSearch}
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    );
  }
}
