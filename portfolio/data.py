from operator import itemgetter
from os import path
from typing import Any, Dict, List

import yaml


root_dir = path.dirname(path.dirname(path.abspath(__file__)))
data_dir = root_dir + "/data/"


def load_skills() -> List[str]:
    with open(data_dir + "skills.yml") as f:
        skills = yaml.load(f)
    return skills


def load_projects() -> List[Dict[str, Any]]:
    def format(work: Dict[str, Any]) -> Dict[str, Any]:
        if work["end"] is None:
            # 継続中のプロジェクトなら "YYYY-"
            work["duration"] = work["start"].strftime("%Y-")
        else:
            # 終了済みのプロジェクトなら "YYYY" または "YYYY-YYYY"
            work["duration"] = work["start"].strftime("%Y")
            if work["start"].year < work["end"].year:
                work["duration"] += "-" + work["end"].strftime("%Y")
        return work

    with open(data_dir + "projects.yml") as f:
        works = yaml.load(f)

    return [format(work) for work in works]


def load_talks() -> List[Dict[str, Any]]:
    with open(data_dir + "talks.yml") as f:
        talks = yaml.load(f)
    return talks


def load_contributions() -> List[Dict[str, Any]]:
    with open(data_dir + "contributions.yml") as f:
        contributions = yaml.load(f)
    contributions.sort(key=itemgetter("name"))
    return contributions


def load_links() -> List[Dict[str, str]]:
    with open(data_dir + "links.yml") as f:
        links = yaml.load(f)
    return links


def load_news() -> List[Dict[str, str]]:
    with open(data_dir + "news.yml") as f:
        links = yaml.load(f)
    return links
