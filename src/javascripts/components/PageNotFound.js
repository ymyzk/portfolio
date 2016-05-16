import RaisedButton from "material-ui/RaisedButton";
import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router";

class PageNotFound extends React.Component {
  render() {
    const title = "404 - Page not found";
    return (
      <div className="container">
        <Helmet title={title} />
        <h2>{title}</h2>
        <div style={{ textAlign: "center", marginTop: 50, marginBottom: 50, width: "100%" }}>
          <RaisedButton label="Back to the Home Page" primary containerElement={<Link to="/" />} />
        </div>
      </div>
    );
  }
}

export default PageNotFound;
