# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from datetime import date, datetime
from os import path
import sys

from jinja2 import Environment, FileSystemLoader
import yaml


def main(debug=False):
    root_dir = path.dirname(path.abspath(__file__))
    data_dir = root_dir + "/data/"
    output_dir = root_dir + "/output/"
    loader = FileSystemLoader(root_dir + "/source", encoding="utf-8")
    env = Environment(loader=loader)

    def index():
        filename = "index.html"
        template = env.get_template(filename)

        with open(data_dir + "skills.yml") as f:
            skills = yaml.load(f)
        with open(data_dir + "works.yml") as f:
            works = yaml.load(f)
            for work in works:
                if work["end"] is None:
                    work["duration"] = work["start"].strftime("%Y -")
                elif work["start"].year == work["end"].year:
                    work["duration"] = work["start"].strftime("%Y")
                else:
                    work["duration"] = (
                        work["start"].strftime("%Y")
                        + " - "
                        + work["end"].strftime("%Y"))
        with open(data_dir + "talks.yml") as f:
            talks = yaml.load(f)
        with open(data_dir + "links.yml") as f:
            links, links2 = yaml.load_all(f)

        with open(output_dir + filename, "w") as f:
            today = date.today()
            born = date(1993, 10, 25)
            age = (today.year
                   - born.year
                   - int((today.month, today.day) < (born.month, born.day)))
            context = {
                "debug": debug,
                "age": age,
                "skills": skills,
                "works": works,
                "talks": talks,
                "links": links,
                "links2": links2
            }
            f.write(template.render(**context).encode("utf-8"))

    index()


if __name__ == "__main__":
    debug = "--debug" in sys.argv
    main(debug=debug)
