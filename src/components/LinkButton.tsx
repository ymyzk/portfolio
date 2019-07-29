import React from "react";

// fab represents all brand icons
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { faGlobe } from "@fortawesome/free-solid-svg-icons/faGlobe";
import { faRss } from "@fortawesome/free-solid-svg-icons/faRss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import Fab from "@material-ui/core/Fab";
import {
  createStyles, Theme, WithStyles, withStyles,
} from "@material-ui/core/styles";
import SvgIcon from "@material-ui/core/SvgIcon";
import Tooltip from "@material-ui/core/Tooltip";

import { Link } from "../data/types";

// Use list of icons instead of faBrands for efficiency
library.add(fab, faEnvelope, faGlobe, faRss);

const styles = ({ spacing }: Theme) => createStyles({
  button: {
    color: "white",
    margin: spacing(0.5),
    marginTop: 0,
  },
});

function SpeakerDeckIcon(props: any) {
  return (
    <SvgIcon viewBox="0 0 32 32" {...props}>
      <path d="M13.37,18.5H6.25A6.25,6.25,0,0,1,6.25,6h8.3a2.5,2.5,0,0,1,0,5H6.12a1.25,1.25,0,0,0,0,2.5h7.12a6.25,6.25,0,0,1,0,12.5H2.5a2.5,2.5,0,0,1,0-5H13.37a1.25,1.25,0,0,0,0-2.5ZM18.63,26a7.5,7.5,0,0,0,3.19-5h4a1.24,1.24,0,0,0,1.22-1.25v-7.5A1.24,1.24,0,0,0,25.86,11H18.53a3.79,3.79,0,0,0,0-5h8.55A5,5,0,0,1,32,11V21a5,5,0,0,1-4.92,5Z" />
    </SvgIcon>
  );
}

interface Props extends WithStyles<typeof styles> {
  link: Link;
}

const LinkButton = ({ classes, link }: Props) => {
  let icon;
  if (link.icon) {
    switch (link.icon) {
      case "custom-speakerdeck":
        icon = <SpeakerDeckIcon />;
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
        className={classes.button}
        color="primary"
        href={link.url}
        target="_blank"
        rel="noopener"
        style={{ backgroundColor: link.color }}
      >
        { icon }
      </Fab>
    </Tooltip>
  );
};

export default withStyles(styles)(LinkButton);
