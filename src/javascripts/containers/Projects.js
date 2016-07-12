import { connect } from "react-redux";

import { addProjectTag, removeProjectTag } from "../actions";
import Projects from "../components/Projects";

const mapStateToProps = (state) => ({
  projects: state.projects,
  selectedTags: state.selectedProjectTags
});

const mapDispatchToProps = (dispatch) => ({
  onTagSelected: (tag) => dispatch(addProjectTag(tag)),
  onTagDeleted: (tag) => dispatch(removeProjectTag(tag))
});

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
