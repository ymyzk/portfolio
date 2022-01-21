import React from "react";

import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";

interface Props {
  skills: string[];
}

const Root = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
});

export default function Skills({ skills }: Props) {
  return (
    <Root>
      {
        skills.map((s) => (
          <Chip label={s} key={s} sx={{ margin: 0.5 }} />
        ))
      }
    </Root>
  );
}
