import moment from "moment";
import { PropTypes } from "react";

const Contribution = PropTypes.shape({
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
});

const Misc = PropTypes.shape({
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(moment).isRequired,
  link: PropTypes.string.isRequired,
});

const Project = PropTypes.shape({
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  image: PropTypes.string,
  start: PropTypes.instanceOf(moment).isRequired,
  end: PropTypes.instanceOf(moment),
  tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  description: PropTypes.string.isRequired,
});

const Talk = PropTypes.shape({
  title: PropTypes.string.isRequired,
  event: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(moment).isRequired,
  link: PropTypes.string,
  slide: PropTypes.string,
});

export default {
  Contribution,
  Misc,
  Project,
  Talk,
};
