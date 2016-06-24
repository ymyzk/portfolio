import { Card, CardActions, CardText, CardTitle } from "material-ui/Card";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ActionExitToTop from "material-ui/svg-icons/action/exit-to-app";
import React from "react";

import ProjectTag from "./ProjectTag";

const floatingButtonWrapperStyle = {
  position: "relative",
  height: 64
};

const floatingButtonStyle = {
  position: "absolute",
  bottom: 12,
  right: 12
};

class ProjectCard extends React.Component {
  static propTypes = {
    project: React.PropTypes.object.isRequired,
    isActive: React.PropTypes.bool,
    onTagSelected: React.PropTypes.func
  };

  static defaultProps = {
    isActive: true
  };

  constructor(props) {
    super(props);
    this.handleTagTouchTap = this.handleTagTouchTap.bind(this);
  }

  handleTagTouchTap(tag) {
    if (this.props.onTagSelected !== undefined) {
      this.props.onTagSelected(tag);
    }
  }

  render() {
    const project = this.props.project;
    const style = {
      opacity: this.props.isActive ? 1.0 : 0.35,
      transition: "opacity 1s"
    };
    return (
      <Card className="project" style={style}>
        <CardTitle title={project.title} href={project.link} />
        <CardText>
          {project.description}
        </CardText>
        <CardActions>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <ProjectTag tag={project.duration} />
            {
              project.tags.map(tag => (
                <ProjectTag key={tag} tag={tag} onTouchTap={this.handleTagTouchTap} />
              ))
            }
          </div>
        </CardActions>
        <div style={floatingButtonWrapperStyle}>
          <FloatingActionButton linkButton href={project.link} target="_blank" style={floatingButtonStyle}>
            <ActionExitToTop />
          </FloatingActionButton>
        </div>
      </Card>
    );
  }
}

export default ProjectCard;
