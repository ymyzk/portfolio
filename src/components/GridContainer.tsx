import React, { ReactNode } from "react";

import Grid from "@mui/material/Grid";

interface Props {
  children: ReactNode;
}

const GridContainer = ({ children }: Props) => (
  <Grid container justifyContent="center">
    <Grid
      container
      sx={{
        width: {
          sm: 576, // theme.breakpoints.up("sm")
          md: 936, // theme.breakpoints.up("md")
          lg: 1200, // theme.breakpoints.up("lg")
        },
      }}
    >
      { children }
    </Grid>
  </Grid>
);

export default GridContainer;
