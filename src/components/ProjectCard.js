// @flow
import getYear from "date-fns/get_year";
import PropTypes from "prop-types";
import React from "react";
import LazyLoad from "react-lazyload";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { getAssetPrefix } from "../utils";

const styles = {
  image: {
    width: "100%",
  },
  title: {
    fontSize: 24,
  },
  tags: {
    marginBottom: 8,
  },
};

// type Props = {
//   classes: Classes,
//   project: Project,
// };

function createSrcSets(file) {
  const imagePrefix = `${getAssetPrefix()}/static/images/projects/`;
  if (file === undefined || file === null) return { src: `${imagePrefix}placeholder.svg`, source: [] };
  const image1x = `${imagePrefix}${file}`;
  const image2x = image1x.replace(/\.jpg$/, "@2x.jpg").replace(/\.png$/, "@2x.png");
  const type = file.endsWith(".jpg") ? "image/jpeg" : (file.endsWith(".png") ? "image/png" : null);
  return {
    src: image1x,
    source: [
      {
        srcSet: `${image1x.replace(/\.jpg$/, ".webp")}, ${image2x.replace(/\.jpg$/, ".webp")} 2x`,
        type: "image/webp",
      },
      {
        srcSet: `${image1x}, ${image2x} 2x`,
        type,
      },
    ],
  };
}

const ProjectCard = ({ classes, project }) => {
  // TODO Disallow undefined in projects.yml
  const { src, source } = createSrcSets(project.image);

  const durationTag = (() => {
    const startYear = getYear(project.start);
    if (project.end === null) {
      // 継続中
      return `${startYear}–`;
    }
    const endYear = getYear(project.end);
    // 終了済み
    return startYear === endYear ? `${startYear}` : `${startYear}–${endYear}`;
  })();
  const tags = [durationTag].concat(project.tags);
  return (
    <Card>
      {/* Known bug?: https://github.com/twobin/react-lazyload/issues/189 */}
      <LazyLoad height={240} offset={300} once>
        <picture>
          { source.map(s => <source key={s.srcSet} srcSet={s.srcSet} type={s.type} />) }
          <img
            className={classes.image}
            src={src}
            alt={project.title}
            title={project.title}
          />
        </picture>
      </LazyLoad>
      <CardContent>
        <Typography component="h3" className={classes.title}>
          {project.title}
        </Typography>
        <Typography color="textSecondary" className={classes.tags}>
          {tags.join(" / ")}
        </Typography>
        <Typography>
          {project.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" href={project.link}>
          Project Page
        </Button>
      </CardActions>
    </Card>
  );
};

ProjectCard.propTypes = {
  classes: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProjectCard);
