import "./App.css";
import About from "./components/About";
import NavBar from "./components/NavBar";
import News from "./components/News";
import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
export default class App extends Component {
  numberOfPages = 9;
  state = {
    progress: 0,
  };
  setProgress = (progress) => {
    this.setState({ progress: progress });
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <NavBar />
          <LoadingBar
            color="#f11946"
            height={3}
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path="/about" element={<About />} />
            <Route
              exact
              path="/"
              element={
                <News
                  setProgress={this.setProgress}
                  key="General"
                  pageSize={this.numberOfPages}
                  country="in"
                  category="General"
                />
              }
            />
            <Route
              exact
              path="/Business"
              element={
                <News
                  setProgress={this.setProgress}
                  key="Business"
                  pageSize={this.numberOfPages}
                  country="in"
                  category="Business"
                />
              }
            />
            <Route
              exact
              path="/Entertainment"
              element={
                <News
                  setProgress={this.setProgress}
                  key="Entertainment"
                  pageSize={this.numberOfPages}
                  country="in"
                  category="Entertainment"
                />
              }
            />
            <Route
              exact
              path="/Science"
              element={
                <News
                  setProgress={this.setProgress}
                  key="Science"
                  pageSize={this.numberOfPages}
                  country="in"
                  category="Science"
                />
              }
            />
            <Route
              exact
              path="/General"
              element={
                <News
                  setProgress={this.setProgress}
                  key="General"
                  pageSize={this.numberOfPages}
                  country="in"
                  category="General"
                />
              }
            />
            <Route
              exact
              path="/health"
              element={
                <News
                  setProgress={this.setProgress}
                  key="health"
                  pageSize={this.numberOfPages}
                  country="in"
                  category="health"
                />
              }
            />
            <Route
              exact
              path="/Sports"
              element={
                <News
                  setProgress={this.setProgress}
                  key="Sports"
                  pageSize={this.numberOfPages}
                  country="in"
                  category="Sports"
                />
              }
            />
            <Route
              exact
              path="/Technology"
              element={
                <News
                  setProgress={this.setProgress}
                  key="Technology"
                  pageSize={this.numberOfPages}
                  country="in"
                  category="Technology"
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
