import { connect } from "react-redux";

import WorkExperience from "../../components/Home/WorkExperience";

const mapStateToProps = state => ({
  works: state.default.works,
});

export default connect(mapStateToProps)(WorkExperience);
