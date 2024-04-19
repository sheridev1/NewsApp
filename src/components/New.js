import React from "react";
import NewItem from "./NewItem";
import Spinner from "./spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from "react";

const New = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, settotalResults] = useState(0);

  const capitilized = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updatefunction = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=527ad95401624446a51d53dbd3c713a9&page=${page}&pageSize=${props.pageSize}`;
    props.setProgress(30);

    setLoading(true);
    let data = await fetch(url);
    let parseData = await data.json();
    props.setProgress(70);
    console.log(parseData);
    setArticles(parseData.articles);
    settotalResults(parseData.totalResults);
    setLoading(false);

    props.setProgress(100);
  };

  useEffect(() => {
    updatefunction();
    document.title=`${capitilized(props.category)} - NewsMonkey`;
    //eslint-disable-nect-line
  }, []);

  

  const handlerprevButton = async () => {
    setPage(page - 1);
    updatefunction();
  };

  const handlernextButton = async () => {
    setPage(page + 1);
    updatefunction();
  };

  const fetchMoreData = async () => {
    setPage(page + 1);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=527ad95401624446a51d53dbd3c713a9&page=${page+1}&pageSize=${props.pageSize}`;
     setPage(page + 1);
    setLoading(true);
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    setArticles(articles.concat(parseData.articles));
    settotalResults(parseData.totalResults);
    setLoading(false);
  };

  return (
    <div className="container my-3">
      <h1 className="text-center" style={{margin:'35px 0px ', marginTop:'90px'}}>
        NewsMonkey - Top {capitilized(props.category)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="row">
          {articles.map((event) => {
            return (
              <div className="col-md-4" key={event.url}>
                <NewItem
                  title={event.title ? event.title.slice(0, 45) : ""}
                  description={
                    event.description ? event.description.slice(0, 88) : ""
                  }
                  imageUrl={event.urlToImage}
                  newsUrl={event.url}
                  author={event.author}
                  date={event.publishedAt}
                  source={event.source.name}
                />
              </div>
            );
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
};

New.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

New.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default New;
