import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  nav = document.getElementById("navigation");
  static defaultProps = {
    country: "in",
    search: "General",
  };
  static propTypes = {
    country: PropTypes.string,
    search: PropTypes.string,
    category: PropTypes.string,
  };

  constructor() {
    super();

    this.state = {
      articles: [""],
      loading: false,
      page: 1,
      pageSize: 4,
      totalArticles: 0,
    };
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
  }
  async componentDidMount() {
    this.fetchData(this.state.page);
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.search !== this.props.search) {
      this.fetchData(this.state.page);
      const str = this.props.search;
      const str2 = str.charAt(0).toUpperCase() + str.slice(1);

      document.title = `NewsHero- ${str2}`;
    }
  }
  async fetchData(page) {
    try {
      // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=39bd93a959024639b14640804c146c86&page=${page}&category=${this.props.search}&pageSize=${this.state.pageSize}`;
      let url =
        "https://newsapi.org/v2/everything?q=bitcoin&apiKey=39bd93a959024639b14640804c146c86";
      console.log(url);
      this.setState({ loading: true });

      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        articles: parsedData.articles,
        totalArticles: parsedData.totalResults,
      });
    } finally {
      this.setState({ loading: false });

      // Set loading state to false after data is fetched
    }
  }
  async handlePreviousClick() {
    console.log("Previous");
    this.setState({ page: this.state.page - 1 }, () => {
      this.fetchData(this.state.page);
    });
  }
  async handleNextClick() {
    console.log("Next");
    if (
      Math.floor(this.state.totalArticles / this.state.pageSize) >
      this.state.page
    ) {
      console.log(this.state.page);
      this.setState({ page: this.state.page + 1 }, () => {
        this.fetchData(this.state.page);
      });
    } else {
      let nextBtn = document.getElementById("nextBTN");
      nextBtn.disabled = true;
    }
  }
  fetchMoreData = () => {
    this.setState({ page: this.state.page + 1 });
    this.fetchData();
  };
  render() {
    return (
      <>
        <div className="container-fluid">
          {this.props.search && (
            <h2 className="text-center my-3 ">
              NewsHero- Top Headlines On {this.props.search}
            </h2>
          )}

          <div className="container d-flex justify-content-between">
            <div className="row mx-auto">
              {/* {this.state.loading && <Spinner />} */}

              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-3 d-flex justify-content-evenly ">
                    <NewsItem
                      title={!element.title ? "" : element.title}
                      imgUrl={element.urlToImage}
                      url={element.url}
                      imgAlt={element.description}
                      description={element.description}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className="d-flex container justify-content-between my-4"
            id="navigation"
          >
            <button
              disabled={this.state.page <= 1}
              type="button"
              class="btn btn-dark"
              onClick={this.handlePreviousClick}
            >
              Previous
            </button>
            <button
              type="button"
              class="btn btn-dark"
              id="nextBTN"
              onClick={this.handleNextClick}
            >
              Next
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default News;
