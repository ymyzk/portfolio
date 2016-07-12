import { connect } from "react-redux";

import Talks from "../components/Talks";

const mapStateToProps = (state) => ({
  talks: state.talks
});

export default connect(mapStateToProps)(Talks);
