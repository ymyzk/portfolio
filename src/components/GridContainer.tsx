import React from "react";

import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";

interface Props {
  children: React.ReactNode;
}

export default function GridContainer({ children }: Props) {
  const theme = useTheme();
  return (
    <Grid container justifyContent="center">
      <Grid
        container
        sx={{
          width: {
            sm: theme.breakpoints.values.sm,
            md: theme.breakpoints.values.md,
            lg: theme.breakpoints.values.lg,
          },
        }}
      >
        { children }
      </Grid>
    </Grid>
  );
}
