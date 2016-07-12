import { connect } from "react-redux";

import Misc from "../components/Misc";

const mapStateToProps = (state) => ({
  misc: state.misc
});

export default connect(mapStateToProps)(Misc);
