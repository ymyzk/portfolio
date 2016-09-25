import { connect } from "react-redux";

import { selectTalk, deselectTalk } from "../../actions/talks";
import Talks from "../../components/Talks/Talks";

const mapStateToProps = state => ({
  isDialogOpen: state.talks.isDialogOpen,
  talks: state.talks.talks,
  selectedTalk: state.talks.selectedTalk
});

const mapDispatchToProps = dispatch => ({
  onTalkSelected: talk => dispatch(selectTalk(talk)),
  onTalkDeselected: () => dispatch(deselectTalk())
});

export default connect(mapStateToProps, mapDispatchToProps)(Talks);
