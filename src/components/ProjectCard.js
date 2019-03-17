// @flow
import getYear from "date-fns/get_year";
import PropTypes from "prop-types";
import React from "react";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { getAssetPrefix } from "../utils";

const styles = {
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

const ProjectCard = ({ classes, project }) => {
  // TODO Disallow undefined in projects.yml
  const imageFileName1x = (project.image === undefined || project.image === null) ? "placeholder.svg" : project.image;
  const imageFileName2x = imageFileName1x.replace(".png", "@2x.png").replace(".jpg", "@2x.jpg");
  const imagePrefix = `${getAssetPrefix()}/static/images/projects/`;
  const imageSrc = `${imagePrefix}${imageFileName1x}`;
  const imageSrcSet = imageFileName1x === imageFileName2x ? null : `${imageSrc} 1x,${imagePrefix}${imageFileName2x} 2x`;

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
      <img
        src={imageSrc}
        srcSet={imageSrcSet}
        alt={project.title}
        title={project.title}
      />
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
