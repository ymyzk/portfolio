import { connect } from "react-redux";

import Contributions from "../components/Contributions";

const mapStateToProps = state => ({
  contributions: state.default.contributions,
});

export default connect(mapStateToProps)(Contributions);
