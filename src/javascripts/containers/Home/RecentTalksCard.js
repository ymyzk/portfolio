import { connect } from "react-redux";

import RecentTalksCard from "../../components/Home/RecentTalksCard";

const NUMBER_OF_RECENT_TALKS = 3;

const mapStateToProps = (state) => ({
  talks: state.talks.talks.slice(0, NUMBER_OF_RECENT_TALKS)
});

export default connect(mapStateToProps)(RecentTalksCard);
