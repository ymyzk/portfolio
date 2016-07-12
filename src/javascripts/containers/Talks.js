import { connect } from "react-redux";

import Talks from "../components/Talks";

const mapStateToProps = (state) => ({
  talks: state.default.talks
});

export default connect(mapStateToProps)(Talks);
