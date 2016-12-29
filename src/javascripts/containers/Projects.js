import { connect } from "react-redux";

import { selectTag, deselectTag } from "../actions/projects";
import Projects from "../components/Projects";

const mapStateToProps = state => ({
  projects: state.projects.projects,
  selectedTags: state.projects.selectedTags,
});

const mapDispatchToProps = dispatch => ({
  onTagSelected: (selectedTags, tag) => dispatch(selectTag(selectedTags, tag)),
  onTagDeleted: (selectedTags, tag) => dispatch(deselectTag(selectedTags, tag)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
