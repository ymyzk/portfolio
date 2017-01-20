import { connect } from "react-redux";

import Skills from "../../components/Home/Skills";

const mapStateToProps = state => ({
  skills: state.default.skills,
});

export default connect(mapStateToProps)(Skills);
