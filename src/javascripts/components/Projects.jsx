import Card from '../../../node_modules/material-ui/lib/card/card';
import CardActions from '../../../node_modules/material-ui/lib/card/card-actions';
import CardText from '../../../node_modules/material-ui/lib/card/card-text';
import CardTitle from '../../../node_modules/material-ui/lib/card/card-title';
import FlatButton from '../../../node_modules/material-ui/lib/flat-button';
import React from 'react';
import { Link } from 'react-router';

import { loadProjects } from './../data';

class Projects extends React.Component {
  render() {
    const ProjectsList = loadProjects();
    return (
      <div className="container">
        <h2>Projects</h2>
        <div className="grid">
          {
            ProjectsList.map((p) => (
              <div className="cell cell-sm-6 cell-md-4" key={p.title}>
                <ProjectCard project={p} />
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

class ProjectCard extends React.Component {
  render() {
    const project = this.props.project;
    const tags = [project.duration].concat(project.tags).reduce((l, r) => `${l}・${r}`);
    return (
      <Card className="project">
        <CardTitle title={project.title} />
        <CardText>
          {project.description}
        </CardText>
        <CardText>
          {tags}
        </CardText>
        <CardActions>
          <FlatButton label="Detail"
                      primary={true}
                      linkButton={true}
                      href={project.link} />
        </CardActions>
      </Card>
    );
  }
}

export default Projects;
