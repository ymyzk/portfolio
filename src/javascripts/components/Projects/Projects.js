import React from "react";
import Helmet from "react-helmet";

import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";

const Projects = ({ title, projects, selectedTags, onTagSelected, onTagDeleted }) => {
  const filterTagsStyle = {
    display: "flex",
    flexWrap: "wrap",
    // Followings are workaround for animating 'height' property
    maxHeight: selectedTags.length === 0 ? 0 : 300,
    transition: "max-height 1s"
  };
  const isActive = (project) =>
    selectedTags
      .map(t => project.tags.includes(t))
      .reduce((p, c) => p && c, true);
  return (
    <div className="container">
      <Helmet title={title} />
      <h2>{title}</h2>
      <div className="grid">
        <div className="cell-sm-12">
          <div style={filterTagsStyle}>
            {
              selectedTags.map((tag) => (
                <ProjectTag key={tag} tag={tag} onRequestDelete={onTagDeleted} />
              ))
            }
          </div>
        </div>
        {
          projects.map((p) => (
            <div className="cell-sm-6 cell-md-4" key={p.title}>
              <ProjectCard project={p} isActive={isActive(p)} onTagSelected={onTagSelected} />
            </div>
          ))
        }
      </div>
    </div>
  );
};

Projects.propTypes = {
  title: React.PropTypes.string.isRequired,
  projects: React.PropTypes.array.isRequired,
  onTagSelected: React.PropTypes.func,
  onTagDeleted: React.PropTypes.func,
  selectedTags: React.PropTypes.arrayOf(React.PropTypes.string.isRequired).isRequired
};

Projects.defaultProps = {
  title: "Projects"
};

export default Projects;