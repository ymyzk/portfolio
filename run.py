# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from datetime import date
from operator import itemgetter
from os import path
import sys

from jinja2 import Environment, FileSystemLoader
import yaml


root_dir = path.dirname(path.abspath(__file__))
data_dir = root_dir + "/data/"
output_dir = root_dir + "/output/"
loader = FileSystemLoader(root_dir + "/source", encoding="utf-8")
env = Environment(loader=loader)


def load_skills():
    with open(data_dir + "skills.yml") as f:
        skills = yaml.load(f)
    return skills


def load_works():
    def format(work):
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


def load_talks():
    with open(data_dir + "talks.yml") as f:
        talks = yaml.load(f)
    return talks


def load_contributions():
    with open(data_dir + "contributions.yml") as f:
        contributions = yaml.load(f)
    contributions.sort(key=itemgetter("name"))
    return contributions


def load_links():
    with open(data_dir + "links.yml") as f:
        links, links2 = yaml.load_all(f)
    return links, links2


def calc_age():
    today = date.today()
    born = date(1993, 10, 25)
    return (today.year
            - born.year
            - int((today.month, today.day) < (born.month, born.day)))


def calc_copyright_years():
    return {
        "start": 2013,
        "end": date.today().year
    }


def minify_html(html):
    lines = html.split("\n")
    lines = map(lambda l: l.strip(), lines)
    lines = filter(lambda l: l != "", lines)
    return "\n".join(lines)


def index(debug=False):
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
        f.write(html.encode("utf-8"))


def main():
    debug = "--debug" in sys.argv
    index(debug=debug)
    return 0


if __name__ == "__main__":
    sys.exit(main())
