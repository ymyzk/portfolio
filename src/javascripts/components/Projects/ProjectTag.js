import Chip from "material-ui/Chip";
import PropTypes from "prop-types";
import React from "react";

const projectTagStyle = {
  margin: 4,
};

const ProjectTag = (props) => {
  const { tag, onClick, onRequestDelete, ...otherProps } = props;
  const additionalProps = {};
  if (onClick !== null) {
    additionalProps.onClick = () => onClick(tag);
  }
  if (onRequestDelete !== null) {
    additionalProps.onRequestDelete = () => onRequestDelete(tag);
  }
  return (<Chip {...otherProps} {...additionalProps} style={projectTagStyle}>{tag}</Chip>);
};

ProjectTag.propTypes = {
  tag: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onRequestDelete: PropTypes.func,
};

ProjectTag.defaultProps = {
  onClick: null,
  onRequestDelete: null,
};

export default ProjectTag;
