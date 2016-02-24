from functools import partial
import sys

from portfolio import data
from portfolio.views import Context, html_view as _html_view
from portfolio.utils import calc_age


production = "--production" in sys.argv
debug = not production

html_view = partial(_html_view, debug=debug)


@html_view("index.html")
def index() -> Context:
    return {
        "age": calc_age(),
        "skills": data.load_skills(),
        "links": data.load_links()
    }


@html_view("projects.html")
def projects() -> Context:
    return {
        "projects": data.load_projects()
    }


@html_view("talks.html")
def talks() -> Context:
    return {
        "talks": data.load_talks()
    }


@html_view("contributions.html")
def contributions() -> Context:
    return {
        "contributions": data.load_contributions()
    }


@html_view("news.html")
def news() -> Context:
    return {
        "news": data.load_news()
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
