import Card from "material-ui/Card/Card";
import CardActions from "material-ui/Card/CardActions";
import CardMedia from "material-ui/Card/CardMedia";
import CardText from "material-ui/Card/CardText";
import CardTitle from "material-ui/Card/CardTitle";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ActionExitToTop from "material-ui/svg-icons/action/exit-to-app";
import React from "react";

import ProjectPlaceholder from "../../../images/project-placeholder.svg";
import PropTypes from "../../utils/PropTypes";
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
  const image = (() => {
    if (project.image === undefined || project.image === null) {
      return (<img src={ProjectPlaceholder} role="presentation" />);
    }
    const imageSrc = `/media/projects/${project.image}`;
    const imageSrc2 = imageSrc.replace(".png", "@2x.png").replace(".jpg", "@2x.jpg");
    if (imageSrc === imageSrc2) {
      return (<img src={imageSrc} alt={project.title} />);
    }
    return (<img src={imageSrc} srcSet={`${imageSrc2} 2x`} alt={project.title} />);
  })();
  return (
    <Card className="project" style={style}>
      <CardTitle title={project.title} href={project.link} target="_blank" style={{ wordWrap: "break-word" }} />
      <CardMedia>{image}</CardMedia>
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
  project: PropTypes.Project.isRequired,
  isActive: React.PropTypes.bool,
  onTagSelected: React.PropTypes.func
};

ProjectCard.defaultProps = {
  isActive: true
};

export default ProjectCard;
