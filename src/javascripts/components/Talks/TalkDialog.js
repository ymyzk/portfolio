import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import PropTypes from "prop-types";
import React from "react";

import CustomPropTypes from "../../utils/CustomPropTypes";

const TalkDialog = ({ open, talk, onClose }) => {
  if (talk === null) {
    return (<div />);
  }

  const actions = [
    <FlatButton
      label="Event Page"
      primary
      href={talk.link}
      target="_blank"
      disabled={talk.link === null}
    />,
    <FlatButton
      label="Show Slide"
      primary
      href={talk.slide}
      target="_blank"
      disabled={talk.slide === null}
    />,
    <FlatButton
      label="Close"
      primary
      onTouchTap={onClose}
    />,
  ];

  const dateString = talk.date.format("YYYY-M-D");
  const dateIso = talk.date.format("YYYY-MM-DD");

  return (
    <Dialog
      title={talk.title}
      actions={actions}
      modal={false}
      open={open}
    >
      {talk.event} - <time dateTime={dateIso}>{dateString}</time>
    </Dialog>
  );
};

TalkDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  talk: CustomPropTypes.Talk,
  onClose: PropTypes.func,
};

TalkDialog.defaultProps = {
  talk: null,
  onClose: () => {},
};

export default TalkDialog;
