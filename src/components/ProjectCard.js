// @flow
import getYear from "date-fns/get_year";
import PropTypes from "prop-types";
import React from "react";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Chip from "@material-ui/core/Chip";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = {
  media: {
    height: 0,
    paddingTop: `${100 * 222 / 360}%`, // 360x222
  },
  title: {
    fontSize: 24,
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
  },
  tag: {
    margin: 3,
  },
};

type Props = {
  classes: Classes,
  project: Project,
};

const ProjectCard = ({ classes, project }: Props) => {
  const image = (project.image === undefined || project.image === null) ? "placeholder.svg" : project.image;
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
      <CardContent>
        <Typography component="h3" className={classes.title}>
          {project.title}
        </Typography>
      </CardContent>
      <CardMedia
        className={classes.media}
        image={`/static/images/projects/${image}`}
        title={project.title}
      />
      <CardContent>
        <Typography component="p">
          {project.description}
        </Typography>
      </CardContent>
      <CardActions>
        <div className={classes.tags}>
          {
            tags.map(t => <Chip className={classes.tag} label={t} key={t} />)
          }
        </div>
      </CardActions>
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
