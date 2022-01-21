import React from "react";

import Grid from "@mui/material/Grid";

interface Props {
  children: React.ReactNode;
}

export default function GridContainer({ children }: Props) {
  return (
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
}
