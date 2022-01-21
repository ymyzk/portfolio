import dynamic from "next/dynamic";
import React from "react";

import { styled } from "@mui/material/styles";

import { Link } from "../data/types";

const LinkButton = dynamic(() => import("./LinkButton"));

const Root = styled("div")({
  textAlign: "center",
});

interface Props {
  links: Link[];
}

export default function Links({ links }: Props) {
  return (
    <Root>
      { links.map((l) => <LinkButton key={l.url} link={l} />) }
    </Root>
  );
}
