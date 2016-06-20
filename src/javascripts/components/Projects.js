import { Card, CardActions, CardText, CardTitle } from "material-ui/Card";
import Chip from "material-ui/Chip";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ActionExitToTop from "material-ui/svg-icons/action/exit-to-app";
import React from "react";
import Helmet from "react-helmet";

import { loadProjects } from "./../data";

const Projects = () => {
  const title = "Projects";
  const ProjectsList = loadProjects();
  return (
    <div className="container">
      <Helmet title={title} />
      <h2>{title}</h2>
      <div className="grid">
        {
          ProjectsList.map((p) => (
            <div className="cell-sm-6 cell-md-4" key={p.title}>
              <ProjectCard project={p} />
            </div>
          ))
        }
      </div>
    </div>
  );
};

const floatingButtonWrapperStyle = {
  position: "relative",
  height: 64
};

const floatingButtonStyle = {
  position: "absolute",
  bottom: 12,
  right: 12
};

const ProjectCard = ({ project }) => (
  <Card className="project">
    <CardTitle title={project.title} href={project.link} />
    <CardText>
      {project.description}
    </CardText>
    <CardActions>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Chip style={{ margin: 4 }}>{project.duration}</Chip>
        {
          project.tags.map(tag => (<Chip key={tag} style={{ margin: 4 }}>{tag}</Chip>))
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

ProjectCard.propTypes = {
  project: React.PropTypes.object.isRequired
};

export default Projects;
