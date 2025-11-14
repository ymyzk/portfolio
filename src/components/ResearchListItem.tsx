import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import type { Research } from "../data/types";

interface Props {
  research: Research;
}

export default function ResearchListItem({ research }: Props) {
  const tags = research.tags.join(" / ");
  return (
    // @ts-expect-error link could be null
    <ListItemButton component="a" href={research.link} target="_blank" rel="noopener">
      <ListItemText
        sx={{ fontSize: ".9rem" }}
        primary={research.title}
        secondary={tags}
      />
    </ListItemButton>
  );
}
