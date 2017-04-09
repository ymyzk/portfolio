import PropTypes from "prop-types";
import React from "react";
import Helmet from "react-helmet";

import CustomPropTypes from "../../utils/PropTypes";
import TalkDialog from "./TalkDialog";
import TalkList from "./TalkList";

const Talks = ({ talks, isDialogOpen, selectedTalk, onTalkSelected, onTalkDeselected }) => {
  const title = "Talks";
  return (
    <div className="container">
      <Helmet title={title} />
      <h2>{title}</h2>
      <div className="grid">
        <div className="cell-xs-without-gutter cell-sm-12">
          <TalkList talks={talks} onTalkSelected={onTalkSelected} />
          <TalkDialog open={isDialogOpen} talk={selectedTalk} onClose={onTalkDeselected} />
        </div>
      </div>
    </div>
  );
};

Talks.propTypes = {
  talks: PropTypes.arrayOf(CustomPropTypes.Talk.isRequired).isRequired,
  isDialogOpen: PropTypes.bool.isRequired,
  selectedTalk: CustomPropTypes.Talk,
  onTalkSelected: PropTypes.func.isRequired,
  onTalkDeselected: PropTypes.func.isRequired,
};

Talks.defaultProps = {
  selectedTalk: null,
};

export default Talks;
