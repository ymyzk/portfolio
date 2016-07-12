import React from "react";
import Helmet from "react-helmet";

import ProjectCard from "./Projects/ProjectCard";
import ProjectTag from "./Projects/ProjectTag";

class Projects extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    projects: React.PropTypes.array.isRequired,
    onTagSelected: React.PropTypes.func,
    onTagDeleted: React.PropTypes.func,
    selectedTags: React.PropTypes.arrayOf(React.PropTypes.string.isRequired).isRequired
  };

  static defaultProps = {
    title: "Projects"
  };

  render() {
    const filterTagsStyle = {
      display: "flex",
      flexWrap: "wrap",
      // Followings are workaround for animating 'height' property
      maxHeight: this.props.selectedTags.length === 0 ? 0 : 300,
      transition: "max-height 1s"
    };
    const isActive = (project) =>
      this.props.selectedTags
        .map(t => project.tags.includes(t))
        .reduce((p, c) => p && c, true);
    return (
      <div className="container">
        <Helmet title={this.props.title} />
        <h2>{this.props.title}</h2>
        <div className="grid">
          <div className="cell-sm-12">
            <div style={filterTagsStyle}>
              {
                this.props.selectedTags.map((tag) => (
                  <ProjectTag key={tag} tag={tag} onRequestDelete={this.props.onTagDeleted} />
                ))
              }
            </div>
          </div>
          {
            this.props.projects.map((p) => (
              <div className="cell-sm-6 cell-md-4" key={p.title}>
                <ProjectCard
                  project={p}
                  isActive={isActive(p)}
                  onTagSelected={this.props.onTagSelected}
                />
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default Projects;
