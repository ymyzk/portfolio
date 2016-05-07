import React from "react";
import Helmet from "react-helmet";

class PageNotFound extends React.Component {
  render() {
    const title = "404 - Page not found";
    return (
      <div className="container">
        <Helmet title={title} />
        <h2>{title}</h2>
      </div>
    );
  }
}

export default PageNotFound;
