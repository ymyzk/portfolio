import { Card, CardActions, CardTitle } from "material-ui/Card";
import Chip from "material-ui/Chip";
import React from "react";

const SkillsCard = ({ skills }) => (
  <Card>
    <CardTitle title="Skills" />
    <CardActions>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {
          skills.map((s) => (
            <Chip key={s} style={{ margin: 4 }}>{s}</Chip>
          ))
        }
      </div>
    </CardActions>
  </Card>
);

SkillsCard.propTypes = {
  skills: React.PropTypes.arrayOf(React.PropTypes.string.isRequired).isRequired
};

export default SkillsCard;
