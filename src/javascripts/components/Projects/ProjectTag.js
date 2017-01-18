import Chip from "material-ui/Chip";
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
  tag: React.PropTypes.string.isRequired,
  onTouchTap: React.PropTypes.func,
  onRequestDelete: React.PropTypes.func,
};

ProjectTag.defaultProps = {
  onTouchTap: null,
  onRequestDelete: null,
};

export default ProjectTag;
