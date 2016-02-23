from copy import deepcopy
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


def index(context: Dict[str, Any]):
    filename = "index.html"
    template = env.get_template(filename)
    context.update({
        "age": calc_age(),
        "skills": load_skills(),
        "links": load_links()[0]
    })
    html = template.render(**context)

    if not context["debug"]:
        html = minify_html(html)

    with open(output_dir + filename, "w") as f:
        f.write(html)


def projects(context: Dict[str, Any]):
    filename = "projects.html"
    template = env.get_template(filename)
    context.update({
        "projects": load_projects()
    })
    html = template.render(**context)

    if not context["debug"]:
        html = minify_html(html)

    with open(output_dir + filename, "w") as f:
        f.write(html)


def talks(context: Dict[str, Any]):
    filename = "talks.html"
    template = env.get_template(filename)
    context.update({
        "talks": load_talks()
    })
    html = template.render(**context)

    if not context["debug"]:
        html = minify_html(html)

    with open(output_dir + filename, "w") as f:
        f.write(html)


def contributions(context: Dict[str, Any]):
    filename = "contributions.html"
    template = env.get_template(filename)
    context.update({
        "contributions": load_contributions()
    })
    html = template.render(**context)

    if not context["debug"]:
        html = minify_html(html)

    with open(output_dir + filename, "w") as f:
        f.write(html)


def news(context: Dict[str, Any]):
    filename = "news.html"
    template = env.get_template(filename)
    context.update({
        "news": load_links()[1]
    })
    html = template.render(**context)

    if not context["debug"]:
        html = minify_html(html)

    with open(output_dir + filename, "w") as f:
        f.write(html)


def sitemap():
    filename = "sitemap.xml"
    template = env.get_template(filename)
    context = {
        "paths": [
            "projects.html",
            "talks.html",
            "contributions.html",
            "news.html"
        ]
    }
    html = template.render(**context)

    with open(output_dir + filename, "w") as f:
        f.write(html)


def main() -> int:
    production = "--production" in sys.argv
    debug = not production
    context = {
        "debug": debug,
        "copyright_years": calc_copyright_years()
    }
    index(deepcopy(context))
    projects(deepcopy(context))
    talks(deepcopy(context))
    contributions(deepcopy(context))
    news(deepcopy(context))
    sitemap()
    return 0


if __name__ == "__main__":
    sys.exit(main())
