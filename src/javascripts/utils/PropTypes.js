import moment from "moment";
import { PropTypes } from "react";

const Talk = PropTypes.shape({
  title: PropTypes.string.isRequired,
  event: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(moment).isRequired,
  link: PropTypes.string
});

export default {
  Talk
};
