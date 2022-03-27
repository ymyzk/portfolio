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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import Fab from "@mui/material/Fab";
import SvgIcon from "@mui/material/SvgIcon";
import Tooltip from "@mui/material/Tooltip";

import { Link } from "../data/types";

// Use list of icons instead of adding all icons in fab for bundle size
library.add(
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
);

function CustomIcon(props: any) {
  return (
    <SvgIcon viewBox="0 0 32 32" {...props}>
      <path d="..." />
    </SvgIcon>
  );
}

interface Props {
  link: Link;
}

export default function LinkButton({ link }: Props) {
  let icon;
  if (link.icon) {
    switch (link.icon) {
      case "custom-icon":
        icon = <CustomIcon />;
        break;
      default:
        icon = (
          <span style={{ fontSize: 24 }}>
            <FontAwesomeIcon icon={link.icon as any} />
          </span>
        );
    }
  } else {
    icon = (
      <span style={{ fontSize: 24 }}>
        <FontAwesomeIcon icon="globe" />
      </span>
    );
  }
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
        { icon }
      </Fab>
    </Tooltip>
  );
}
