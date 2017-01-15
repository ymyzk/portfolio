import Chip from "material-ui/Chip";
import React from "react";

const projectTagStyle = {
  margin: 4,
};

const ProjectTag = (props) => {
  const { tag, onTouchTap, onRequestDelete, ...otherProps } = props;
  const additionalProps = {};
  if (onTouchTap !== undefined) {
    additionalProps.onTouchTap = () => onTouchTap(tag);
  }
  if (onRequestDelete !== undefined) {
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
  onTouchTap: () => {},
  onRequestDelete: () => {},
};

export default ProjectTag;
