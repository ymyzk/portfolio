import { connect } from "react-redux";

import Affiliation from "../../components/Home/Affiliation";

const mapStateToProps = state => ({
  affiliation: state.default.affiliation,
});

export default connect(mapStateToProps)(Affiliation);
