import Card from "material-ui/Card/Card";
import CardActions from "material-ui/Card/CardActions";
import CardText from "material-ui/Card/CardText";
import CardTitle from "material-ui/Card/CardTitle";
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

const ProjectCard = ({ project, isActive, onTagSelected }) => {
  const style = {
    opacity: isActive ? 1.0 : 0.35,
    transition: "opacity 1s"
  };
  return (
    <Card className="project" style={style}>
      <CardTitle title={project.title} href={project.link} target="_blank" style={{ wordWrap: "break-word" }} />
      <CardText>
        {project.description}
      </CardText>
      <CardActions>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <ProjectTag tag={project.duration} />
          {
            project.tags.map(tag => (
              <ProjectTag key={tag} tag={tag} onTouchTap={() => onTagSelected(tag)} />
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
};

ProjectCard.propTypes = {
  project: React.PropTypes.object.isRequired,
  isActive: React.PropTypes.bool,
  onTagSelected: React.PropTypes.func
};

ProjectCard.defaultProps = {
  isActive: true
};

export default ProjectCard;
