from copy import deepcopy
from os import path
import sys
from typing import Any, Dict

from jinja2 import Environment, FileSystemLoader

from portfolio.utils import (calc_age, calc_copyright_years,
                             load_contributions, load_links, load_projects,
                             load_skills, load_talks)


root_dir = path.dirname(path.abspath(__file__))
data_dir = root_dir + "/data/"
output_dir = root_dir + "/output/"
loader = FileSystemLoader(root_dir + "/source", encoding="utf-8")
env = Environment(loader=loader)


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
