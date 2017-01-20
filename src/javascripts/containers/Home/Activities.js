import { connect } from "react-redux";

import { selectTalk } from "../../actions/talks";
import Activities from "../../components/Home/Activities";

const mapStateToProps = state => ({
  talks: state.talks.talks,
});

const mapDispatchToProps = dispatch => ({
  onTalkSelected: talk => dispatch(selectTalk(talk)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Activities);
