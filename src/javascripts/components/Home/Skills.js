import Chip from "material-ui/Chip";
import React from "react";

const SkillsCard = ({ skills }) => (
  <section className="grid">
    <div className="cell-sm-12">
      <h2>Skills</h2>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {
          skills.map(s => (
            <Chip key={s} style={{ margin: 4 }}>{s}</Chip>
          ))
        }
      </div>
    </div>
  </section>
);

SkillsCard.propTypes = {
  skills: React.PropTypes.arrayOf(React.PropTypes.string.isRequired).isRequired,
};

export default SkillsCard;
