import React from "react";

// Avoid importing "fab" as it imports all brand icons
import {
  faAmazon,
  faFacebook,
  faGithub,
  faLinkedin,
  faSlideshare,
  faSpeakerDeck,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { faGlobe } from "@fortawesome/free-solid-svg-icons/faGlobe";
import { faRss } from "@fortawesome/free-solid-svg-icons/faRss";
import Fab from "@mui/material/Fab";
import SvgIcon from "@mui/material/SvgIcon";
import Tooltip from "@mui/material/Tooltip";

import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { Link } from "../data/types";

// Stopped using react-fontawesome due to an issue with React 18 + react-fontawesome.
// https://github.com/FortAwesome/react-fontawesome/issues/525

// Pre-define  a list of icons instead of adding all icons in fab for bundle size
const icons: { [key: string]: IconDefinition } = {
  faAmazon,
  faEnvelope,
  faFacebook,
  faGithub,
  faGlobe,
  faLinkedin,
  faSlideshare,
  faSpeakerDeck,
  faTwitter,
  faRss,
};

interface Props {
  link: Link;
}

function getIconDefinition([prefix, name]: [string, string]): IconDefinition {
  const key: string = [
    prefix,
    ...name.split("-").map((v) => v.charAt(0).toUpperCase() + v.slice(1)),
  ].join("");
  return icons[key] || faGlobe;
}

function CustomFontAwesomeIcon({ icon }: { icon: [string, string] }): JSX.Element {
  const iconDefinition = getIconDefinition(icon);
  const width = iconDefinition.icon[0];
  const height = iconDefinition.icon[1];
  const pathData = iconDefinition.icon[4];
  const paths: string[] = (typeof pathData === "string") ? [pathData] : pathData;
  return (
    <SvgIcon viewBox={`0 0 ${width} ${height}`}>
      {/* eslint-disable-next-line react/no-array-index-key */}
      {paths.map((path, index) => <path key={index} d={path} />)}
    </SvgIcon>
  );
}

export default function LinkButton({ link }: Props): JSX.Element {
  return (
    <Tooltip title={link.title}>
      <Fab
        color="primary"
        href={link.url}
        target="_blank"
        rel="noopener"
        style={{ backgroundColor: link.color }}
        sx={{
          color: "white",
          margin: (theme) => theme.spacing(0.5),
          marginTop: 0,
        }}
      >
        <CustomFontAwesomeIcon icon={link.icon ? link.icon : ["fa", "global"]} />
      </Fab>
    </Tooltip>
  );
}
