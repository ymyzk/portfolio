import { connect } from "react-redux";

import SkillsCard from "../../components/Home/SkillsCard";

const mapStateToProps = (state) => ({
  skills: state.skills
});

export default connect(mapStateToProps)(SkillsCard);
