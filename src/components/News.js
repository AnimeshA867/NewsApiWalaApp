import React, { useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";

let News = (props) => {
  const [articles, setArticles] = useState([""]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const [remainingArticles, setRemainingArticles] = useState(1);
  let pageSize = 15;

  let fetchData = async () => {
    try {
      props.setProgress(10);

      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apikey}&page=${page}&category=${props.search}&pageSize=${pageSize}`;

      console.log(url);
      setLoading(true);

      let data = await fetch(url);
      props.setProgress(40);
      let parsedData = await data.json();
      props.setProgress(70);
      console.log(parsedData);
      setArticles(parsedData.articles);
      setTotalArticles(parsedData.totalResults);

      props.setProgress(100);
    } finally {
      setLoading(false);

      // Set loading state to false after data is fetched
    }
  };
  // async componentDidMount() {
  //   // console.log(props.apikey.slice(1, props.apikey.length - 2));

  //   fetchData(page);
  // }
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    // eslint-disable-next-line
    fetchData();
    //eslint-disable-next-line
    const str = props.search;
    const str2 = str.charAt(0).toUpperCase() + str.slice(1);

    document.title = `NewsHero- ${str2}`;
    console.log("Second useEffect");
    // eslint-disable-next-line
  }, [props.search]);

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&apiKey=037b4d47f210425889376c7f97f11591&page=${page + 1}&category=${
      props.search
    }&pageSize=${pageSize}`;

    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData + "from fetchMoer Data");
    setArticles(articles.concat(parsedData.articles));
    setRemainingArticles(totalArticles - articles.length);
    setPage(page + 1);
    console.log(articles);
  };
  return (
    <>
      <div className="container-fluid">
        {props.search && (
          <h2 className="text-center my-3 ">
            NewsHero- Top Headlines On {props.search}
          </h2>
        )}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={
            remainingArticles !== 0
            // articles.length <= totalArticles
          }
          loader={<Spinner />}
        >
          {loading && <Spinner />}
          <div className="container d-flex justify-content-between">
            <div className="row mx-auto">
              {!loading &&
                articles.map((element) => {
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
};
export default News;
News.defaultProps = {
  country: "in",
  search: "General",
};
News.propTypes = {
  country: PropTypes.string,
  search: PropTypes.string,
  category: PropTypes.string,
};
