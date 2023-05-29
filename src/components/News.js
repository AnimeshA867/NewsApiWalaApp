import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  nav = document.getElementById("navigation");
  static defaultProps = {
    country: "Np",
    search: "tesla",
  };
  static propTypes = {
    country: PropTypes.string,
    search: PropTypes.string,
    category: PropTypes.string,
  };

  articles1 = [
    {
      source: { id: "bbc-sport", name: "BBC Sport" },
      author: null,
      title: "Twenty years on - how Anderson was shaped for greatness",
      description:
        "From Burnley Cricket Club to becoming England's greatest fast bowler, James Anderson reflects on his career 20 years on from his Test debut.",
      url: "http://www.bbc.co.uk/sport/cricket/65656784",
      urlToImage:
        "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/18446/production/_129789399_microsoftteams-image-4.png",
      publishedAt: "2023-05-22T06:22:22.8642434Z",
      content:
        "In a career laced with records, landmarks and achievements, James Anderson has hit another milestone.\r\nMonday marks exactly 20 years since England's most prolific fast bowler made his Test debut.\r\nWh… [+6546 chars]",
    },
    {
      source: { id: "espn-cric-info", name: "ESPN Cric Info" },
      author: null,
      title:
        "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
      description:
        "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
      url: "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
      urlToImage:
        "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
      publishedAt: "2020-04-27T11:41:47Z",
      content:
        "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]",
    },
    {
      source: { id: "espn-cric-info", name: "ESPN Cric Info" },
      author: null,
      title:
        "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
      description:
        "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
      url: "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
      urlToImage:
        "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
      publishedAt: "2020-03-30T15:26:05Z",
      content:
        "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]",
    },
  ];

  constructor() {
    super();

    this.state = {
      articles: this.articles1,
      loading: false,
      page: 1,
      pageSize: 3,
    };
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
  }
  async componentDidMount() {
    this.fetchData();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.search !== this.props.search) {
      this.fetchData();
    }
  }
  async fetchData() {
    try {
      let url = `https://newsapi.org/v2/everything?q=${this.props.search}&pageSize=${this.state.pageSize}&from=2023-04-29&sortBy=publishedAt&apiKey=51d77784425046338feac36930392e1a&page=${this.state.page}`;
      this.setState({ loading: true });

      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        articles: parsedData.articles,
        page: this.state.page,
        totalArticles: parsedData.totalResults,
      });
      console.log(this.state.articles);
      console.log(this.state.totalArticles);
    } finally {
      this.setState({ loading: false });

      // Set loading state to false after data is fetched
    }
  }
  async handlePreviousClick() {
    console.log("Previous");
    let url = `https://newsapi.org/v2/everything?q=${
      this.props.search
    }&pageSize=${
      this.state.pageSize
    }&from=2023-04-29&sortBy=publishedAt&apiKey=51d77784425046338feac36930392e1a&page=${
      this.state.page - 1
    }`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1,
      loading: false,
    });
    console.log(this.state.articles);
  }
  async handleNextClick() {
    console.log("Next");
    if (
      Math.floor(this.state.totalArticles / this.state.pageSize) >
      this.state.page
    ) {
      let url = `https://newsapi.org/v2/everything?q=${
        this.props.search
      }&pageSize=${
        this.state.pageSize
      }&from=2023-04-29&sortBy=publishedAt&apiKey=51d77784425046338feac36930392e1a&page=${
        this.state.page + 1
      }`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false,
      });
      // this.setState({ articles: parsedData.articles });
      console.log(this.state.articles);
    } else {
      let nextBtn = document.getElementById("nextBTN");
      nextBtn.disabled = true;
    }
  }
  render() {
    console.log("This is being rendered.");
    console.log(`  ${this.props.search}`);
    return (
      <>
        <div className="container mb-3">
          <h2>NewsHero- Top Headlines</h2>

          {
            <div className="container d-flex justify-content-between">
              <div className="row mx-auto">
                {this.state.loading && <Spinner />}
                {!this.state.loading &&
                  this.state.articles.map((element) => {
                    return (
                      <div className="col-md-4 d-flex justify-content-center ">
                        <NewsItem
                          title={!element.title ? "" : element.title}
                          imgUrl={element.urlToImage}
                          url={element.url}
                          imgAlt={element.title}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          }
          <div
            className="d-flex container justify-content-between"
            id="navigation"
          >
            <button
              disabled={this.state.page <= 1}
              type="button"
              class="btn btn-primary"
              onClick={this.handlePreviousClick}
            >
              Previous
            </button>
            <button
              type="button"
              class="btn btn-primary"
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
