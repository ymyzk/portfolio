import Chip from "material-ui/Chip";
import PropTypes from "prop-types";
import React from "react";

const projectTagStyle = {
  margin: 4,
};

const ProjectTag = (props) => {
  const { tag, onTouchTap, onRequestDelete, ...otherProps } = props;
  const additionalProps = {};
  if (onTouchTap !== null) {
    additionalProps.onTouchTap = () => onTouchTap(tag);
  }
  if (onRequestDelete !== null) {
    additionalProps.onRequestDelete = () => onRequestDelete(tag);
  }
  return (<Chip {...otherProps} {...additionalProps} style={projectTagStyle}>{tag}</Chip>);
};

ProjectTag.propTypes = {
  tag: PropTypes.string.isRequired,
  onTouchTap: PropTypes.func,
  onRequestDelete: PropTypes.func,
};

ProjectTag.defaultProps = {
  onTouchTap: null,
  onRequestDelete: null,
};

export default ProjectTag;
