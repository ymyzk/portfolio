import getYear from "date-fns/get_year";
import React from "react";
import LazyLoad from "react-lazyload";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { Project } from "../data/types";
import { getAssetPrefix } from "../utils";

const styles = createStyles({
  image: {
    width: "100%",
  },
  content: {
    paddingBottom: 0,
  },
  title: {
    fontSize: 24,
  },
  tags: {
    marginBottom: 8,
  },
});

interface Props extends WithStyles<typeof styles> {
  project: Project;
}

interface SrcSet {
  src: string;
  source: { srcSet: string; type: string }[];
}

function createSrcSets(file: string | null | undefined): SrcSet | null {
  const imagePrefix = `${getAssetPrefix()}/static/images/projects/`;
  if (file === undefined || file === null) return { src: `${imagePrefix}placeholder.svg`, source: [] };
  const image1x = `${imagePrefix}${file}`;
  const image2x = image1x.replace(/\.jpg$/, "@2x.jpg").replace(/\.png$/, "@2x.png");
  // eslint-disable-next-line no-nested-ternary
  const type = file.endsWith(".jpg") ? "image/jpeg" : (file.endsWith(".png") ? "image/png" : null);
  if (type === null) return null;
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

const ProjectCard = ({ classes, project }: Props) => {
  // TODO Disallow undefined in projects.yml
  const srcset = createSrcSets(project.image);
  if (srcset == null) return null;
  const { src, source } = srcset;

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
          { source.map((s) => <source key={s.srcSet} srcSet={s.srcSet} type={s.type} />) }
          <img
            className={classes.image}
            src={src}
            alt={project.title}
            title={project.title}
          />
        </picture>
      </LazyLoad>
      <CardContent className={classes.content}>
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
        {
          Object
            .entries(project.links ? project.links : {})
            .map(([title, url]) => <Button key={url} size="small" color="primary" href={url} target="_blank" rel="noopener">{title}</Button>)
        }
      </CardActions>
    </Card>
  );
};

export default withStyles(styles)(ProjectCard);
