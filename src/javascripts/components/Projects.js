import { Card, CardActions, CardText, CardTitle } from "material-ui/Card";
import Chip from "material-ui/Chip";
import FlatButton from "material-ui/FlatButton";
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

const ProjectCard = ({ project }) => (
  <Card className="project">
    <CardTitle title={project.title} />
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
    <CardActions>
      <FlatButton label="Detail" primary linkButton href={project.link} />
    </CardActions>
  </Card>
);

ProjectCard.propTypes = {
  project: React.PropTypes.object.isRequired
};

export default Projects;
