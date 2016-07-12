import ProjectsList from "../data/projects";

const projects = ProjectsList.map((p) => {
  if (p.start !== null) {
    // TODO: Error
    p.start = new Date(p.start);
  }
  if (p.end !== null) {
    p.end = new Date(p.end);
  }
  p.duration = (() => {
    const startYear = p.start.getFullYear();
    if (p.end === null) {
      // 継続中
      return `${startYear}-`;
    }
    const endYear = p.end.getFullYear();
    // 終了済み
    return startYear === endYear ? `${p.start.getFullYear()}` : `${startYear}-${endYear}`;
  })();
  return p;
});

function loadProjects() {
  return projects;
}

export { loadProjects };
