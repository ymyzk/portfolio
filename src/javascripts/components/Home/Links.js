import FloatingActionButton from "material-ui/FloatingActionButton";
import FontIcon from "material-ui/FontIcon";
import React from "react";

const floatingButtonStyle = {
  margin: "0 6px 6px",
};

const Links = ({ links }) => (
  <section className="grid">
    <div className="cell-sm-12">
      <h2>Links</h2>
      <div className="text-center">
        {
          links.map(l => (
            <FloatingActionButton
              linkButton
              href={l.url}
              target="_blank"
              style={floatingButtonStyle}
              backgroundColor={l.color}
            >
              <FontIcon className={`fa fa-${l.icon ? l.icon : "globe"}`} />
            </FloatingActionButton>
          ))
        }
      </div>
    </div>
  </section>
);

Links.propTypes = {
  links: React.PropTypes.arrayOf(React.PropTypes.object.isRequired).isRequired,
};

export default Links;
