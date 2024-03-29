import { getYear } from "date-fns";
import React from "react";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import type { Project } from "../data/types";

interface Props {
  project: Project;
}

interface SrcSet {
  src: string;
  source: { srcSet: string; type: string }[];
}

const Image = styled("img")({
  width: "100%",
  aspectRatio: 384 / 240,
});

function createSrcSets(file: string | null | undefined): SrcSet | null {
  const imagePrefix = "/static/images/projects/";
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

export default function ProjectCard({ project }: Props) {
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
  const links: ([string, string])[] = Object.entries(project.links ? project.links : {});
  return (
    <Card>
      <picture>
        { source.map((s) => <source key={s.srcSet} srcSet={s.srcSet} type={s.type} />) }
        {/* Use next/image but needs to learn more about it to do that. */}
        <Image
          src={src}
          alt={project.title}
          title={project.title}
          loading="lazy"
        />
      </picture>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Typography component="h3" sx={{ fontSize: "24px" }}>
          {project.title}
        </Typography>
        <Typography color="textSecondary" sx={{ marginBottom: "8px" }}>
          {tags.join(" / ")}
        </Typography>
        <Typography>
          {project.description}
        </Typography>
      </CardContent>
      <CardActions>
        {
          links.map(([title, url]) => <Button key={url} size="small" color="primary" href={url} target="_blank" rel="noopener">{title}</Button>)
        }
      </CardActions>
    </Card>
  );
}
