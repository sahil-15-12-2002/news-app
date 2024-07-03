import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    document.title = `${this.props.category} -Top Head Lines`;
  }
  async componentDidMount() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0cbdb96173004c4aaae0b3dcc309cfcd&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(40);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  // handlePreviousClick = async () => {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //     this.props.country
  //   }&category=${
  //     this.props.category
  //   }&apiKey=0cbdb96173004c4aaae0b3dcc309cfcd&page=${
  //     this.state.page - 1
  //   }&pageSize=${this.props.pageSize}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   this.setState({
  //     page: this.state.page - 1,
  //     articles: parsedData.articles,
  //     loading: false,
  //   });
  // };

  // handleNextClick = async () => {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //     this.props.country
  //   }&category=${
  //     this.props.category
  //   }&apiKey=0cbdb96173004c4aaae0b3dcc309cfcd&page=${
  //     this.state.page + 1
  //   }&pageSize=${this.props.pageSize}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   this.setState({
  //     page: this.state.page + 1,
  //     articles: parsedData.articles,
  //     loading: false,
  //   });
  // };
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=0cbdb96173004c4aaae0b3dcc309cfcd&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">Daily {this.props.category} News</h1>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((Element) => {
                return (
                  <div className="col-md-4" key={Element.url}>
                    <Newsitem
                      title={Element.title ? Element.title.slice(0, 45) : " "}
                      description={
                        Element.description
                          ? Element.description.slice(0, 85)
                          : " "
                      }
                      imageUrl={
                        Element.urlToImage
                          ? Element.urlToImage
                          : "data:image/png;base64,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"
                      }
                      newsUrl={Element.url ? Element.url : " "}
                      author={Element.author ? Element.author : "Unknown"}
                      date={Element.publishedAt ? Element.publishedAt : ""}
                      source={Element.source.name ? Element.source.name : " "}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between my-4">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePreviousClick}
          >
            &larr; previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark "
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </div>
    );
  }
}
// 0cbdb96173004c4aaae0b3dcc309cfcd
