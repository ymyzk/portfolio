import { format } from "date-fns";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import type { Talk } from "../data/types";

interface Props {
  talk: Talk;
}

export default function TalkListItem({ talk }: Props) {
  const dateString = format(talk.date, "yyyy-M-d");
  const dateIso = format(talk.date, "yyyy-MM-dd");
  const href = talk.slide ? talk.slide : (talk.link ? talk.link : "#");
  return (
    <ListItemButton
      component="a"
      href={href}
    >
      <ListItemText
        primary={talk.title}
        secondary={(
          <span>
            <time dateTime={dateIso}>
              {dateString}
            </time>
            &nbsp;—&nbsp;
            {talk.event}
          </span>
        )}
      />
    </ListItemButton>
  );
}
