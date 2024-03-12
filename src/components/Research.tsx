import React from "react";

import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import type { Research } from "../data/types";
import ResearchListItem from "./ResearchListItem";

const Root = styled("div")({
  paddingLeft: 12,
  paddingRight: 12,
});

interface Props {
  research: Research[];
}

export default function Research({ research }: Props) {
  return (
    <Root>
      <Grid container justifyContent="center" spacing={4}>
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Typography variant="body1">
            Received my Masters of Informatics and Bachelor of Engineering from Kyoto University
            in 2018 and 2016, respectively. Worked on programming language theory including
            gradual typing, type inference, delimited continuations (shift/reset).
          </Typography>
        </Grid>
      </Grid>
      <List>
        {
          research.map((r) => <ResearchListItem research={r} key={r.id} />)
        }
      </List>
    </Root>
  );
}
