import { connect } from "react-redux";

import Links from "../../components/Home/Links";

const mapStateToProps = state => ({
  links: state.default.links,
});

export default connect(mapStateToProps)(Links);
