import { connect } from "react-redux";

import SkillsCard from "../../components/Home/SkillsCard";

const mapStateToProps = (state) => ({
  skills: state.default.skills
});

export default connect(mapStateToProps)(SkillsCard);
