import RaisedButton from "material-ui/RaisedButton";
import React from "react";
import Helmet from "react-helmet";

const PageNotFound = () => {
  const title = "404 - Page not found";
  return (
    <div className="container">
      <Helmet title={title} />
      <h2>{title}</h2>
      <div style={{ textAlign: "center", marginTop: 50, marginBottom: 50, width: "100%" }}>
        <RaisedButton label="Back to the Home Page" href="/" primary />
      </div>
    </div>
  );
};

export default PageNotFound;
