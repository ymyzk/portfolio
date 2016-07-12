import { connect } from "react-redux";

import Contributions from "../components/Contributions";

const mapStateToProps = (state) => ({
  contributions: state.contributions
});

export default connect(mapStateToProps)(Contributions);
