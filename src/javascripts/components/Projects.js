import React from "react";
import Helmet from "react-helmet";

import ProjectCard from "./Projects/ProjectCard";
import ProjectTag from "./Projects/ProjectTag";
import { loadProjects } from "./../data";

class Projects extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    projects: React.PropTypes.array.isRequired
  };

  static defaultProps = {
    title: "Projects",
    projects: loadProjects()
  };

  constructor(props) {
    super(props);
    this.handleTagSelected = this.handleTagSelected.bind(this);
    this.handleTagDeleted = this.handleTagDeleted.bind(this);
  }

  state = {
    selectedTags: []
  };

  handleTagSelected(tag) {
    const tags = this.state.selectedTags;
    this.setState({
      selectedTags: tags.includes(tag) ? tags : tags.concat([tag])
    });
  }

  handleTagDeleted(tag) {
    this.setState({
      selectedTags: this.state.selectedTags.filter((t) => t !== tag)
    });
  }

  render() {
    const filterTagsStyle = {
      display: "flex",
      flexWrap: "wrap",
      // Followings are workaround for animating 'height' property
      maxHeight: this.state.selectedTags.length === 0 ? 0 : 300,
      transition: "max-height 1s"
    };
    const isActive = (project) =>
      this.state.selectedTags
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
                this.state.selectedTags.map((tag) => (
                  <ProjectTag
                    key={tag}
                    tag={tag}
                    onRequestDelete={this.handleTagDeleted}
                  />
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
                  onTagSelected={this.handleTagSelected}
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
