import ContributionsList from '../data/contributions';
import ProjectsList from '../data/projects';
import TalksList from '../data/talks';

const contributions = (() => {
  ContributionsList.sort();
  return ContributionsList;
})();

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
    if (startYear === endYear) {
      return `${p.start.getFullYear()}`;
    } else {
      return `${startYear}-${endYear}`;
    }
  })();
  return p;
});

const talks = TalksList.map((t) => {
  t.date = new Date(t.date);
  return t;
});

function loadContributions() {
  return contributions;
}

function loadProjects() {
  return projects;
}

function loadTalks () {
  return talks;
}

export { loadContributions, loadProjects, loadTalks };
