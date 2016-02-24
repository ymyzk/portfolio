from functools import partial
import sys

from portfolio.views import Context, html_view as _html_view
from portfolio.utils import (calc_age, load_contributions, load_links,
                             load_projects, load_skills, load_talks)


production = "--production" in sys.argv
debug = not production

html_view = partial(_html_view, debug=debug)


@html_view("index.html")
def index() -> Context:
    return {
        "age": calc_age(),
        "skills": load_skills(),
        "links": load_links()[0]
    }


@html_view("projects.html")
def projects() -> Context:
    return {
        "projects": load_projects()
    }


@html_view("talks.html")
def talks() -> Context:
    return {
        "talks": load_talks()
    }


@html_view("contributions.html")
def contributions() -> Context:
    return {
        "contributions": load_contributions()
    }


@html_view("news.html")
def news() -> Context:
    return {
        "news": load_links()[1]
    }


@html_view("sitemap.xml")
def sitemap() -> Context:
    return {
        "paths": [
            "projects.html",
            "talks.html",
            "contributions.html",
            "news.html"
        ]
    }


def main() -> int:
    views = [
        index,
        projects,
        talks,
        contributions,
        news,
        sitemap
    ]
    [view() for view in views]
    return 0


if __name__ == "__main__":
    sys.exit(main())
