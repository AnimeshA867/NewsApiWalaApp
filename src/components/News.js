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
      pageSize: 14,
      totalArticles: 0,
    };
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
      this.props.setProgress(10);

      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=037b4d47f210425889376c7f97f11591&page=${page}&category=${this.props.search}&pageSize=${this.state.pageSize}`;

      console.log(url);
      this.setState({ loading: true });

      let data = await fetch(url);
      this.props.setProgress(40);
      let parsedData = await data.json();
      this.props.setProgress(70);
      console.log(parsedData);
      this.setState({
        articles: parsedData.articles,
        totalArticles: parsedData.totalResults,
      });
      this.props.setProgress(100);
    } finally {
      this.setState({ loading: false });

      // Set loading state to false after data is fetched
    }
  }

  fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&apiKey=037b4d47f210425889376c7f97f11591&page=${
      this.state.page + 1
    }&category=${this.props.search}&pageSize=${this.state.pageSize}`;

    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData + "from fetchMoer Data");
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      remainingArticles: this.state.totalArticles - this.state.articles.length,
      page: this.state.page + 1,
    });
    console.log(this.state.articles.length);
    console.log(this.state.articles);
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

          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={
              this.state.remainingArticles !== 0
              // this.state.articles.length <= this.state.totalArticles
            }
            loader={<Spinner />}
          >
            {this.state.loading && <Spinner />}
            <div className="container d-flex justify-content-between">
              <div className="row mx-auto">
                {!this.state.loading &&
                  this.state.articles.map((element) => {
                    return (
                      <div className="col-md-4 d-flex justify-content-evenly my-2 ">
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
          </InfiniteScroll>
        </div>
      </>
    );
  }
}

export default News;
