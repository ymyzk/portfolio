from datetime import date
from operator import itemgetter
from os import path
import sys
from typing import Any, Dict, List, Tuple

from jinja2 import Environment, FileSystemLoader
import yaml


root_dir = path.dirname(path.abspath(__file__))
data_dir = root_dir + "/data/"
output_dir = root_dir + "/output/"
loader = FileSystemLoader(root_dir + "/source", encoding="utf-8")
env = Environment(loader=loader)


def load_skills() -> List[str]:
    with open(data_dir + "skills.yml") as f:
        skills = yaml.load(f)
    return skills


def load_works() -> List[Dict[str, Any]]:
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

    with open(data_dir + "works.yml") as f:
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


def load_links() -> Tuple[List[Dict[str, str]], List[Dict[str, str]]]:
    with open(data_dir + "links.yml") as f:
        links, links2 = yaml.load_all(f)
    return links, links2


def calc_age() -> int:
    today = date.today()
    born = date(1993, 10, 25)
    return (today.year -
            born.year -
            int((today.month, today.day) < (born.month, born.day)))


def calc_copyright_years() -> Dict[str, int]:
    return {
        "start": 2013,
        "end": date.today().year
    }


def minify_html(html: str) -> str:
    lines = map(lambda l: l.strip(), html.split("\n"))
    lines = filter(lambda l: l != "", lines)
    return "\n".join(lines)


def index(debug: bool=False):
    filename = "index.html"
    template = env.get_template(filename)
    context = {
        "debug": debug,
        "age": calc_age(),
        "skills": load_skills(),
        "works": load_works(),
        "talks": load_talks(),
        "contributions": load_contributions(),
        "links": load_links()[0],
        "links2": load_links()[1],
        "copyright_years": calc_copyright_years()
    }
    html = template.render(**context)

    if not debug:
        html = minify_html(html)

    with open(output_dir + filename, "w") as f:
        f.write(html)


def main() -> int:
    production = "--production" in sys.argv
    debug = not production
    index(debug=debug)
    return 0


if __name__ == "__main__":
    sys.exit(main())
