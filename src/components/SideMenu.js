import Drawer from "material-ui/Drawer";
import List, { ListItem, ListItemText } from "material-ui/List";
import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";

// TODO: Migration of trailing slash in URLs
const SideMenu = ({ open, onClose }) => (
  <Drawer anchor="left" open={open} onClose={onClose}>
    <List>
      <Link href="/">
        <ListItem button>
          <ListItemText primary="Home" />
        </ListItem>
      </Link>
      <Link href="/projects">
        <ListItem button>
          <ListItemText primary="Projects" />
        </ListItem>
      </Link>
      <Link href="/talks">
        <ListItem button>
          <ListItemText primary="Talks" />
        </ListItem>
      </Link>
      <Link href="/contributions">
        <ListItem button>
          <ListItemText primary="Contributions" />
        </ListItem>
      </Link>
      <Link href="/misc">
        <ListItem button>
          <ListItemText primary="Misc" />
        </ListItem>
      </Link>
    </List>
  </Drawer>
);

SideMenu.defaultProps = {
  onClose: () => {},
};

SideMenu.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};

export default SideMenu;
