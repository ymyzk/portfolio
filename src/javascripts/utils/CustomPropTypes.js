import moment from "moment";
import PropTypes from "prop-types";

const Contribution = PropTypes.shape({
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
});

const Link = PropTypes.shape({
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  icon: PropTypes.string,
  text: PropTypes.string,
  color: PropTypes.string,
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
  Link,
  Misc,
  Project,
  Talk,
};