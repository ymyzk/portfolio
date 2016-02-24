from functools import partial
import sys

from portfolio import data
from portfolio.views import html_view as _html_view
from portfolio.utils import calc_age


production = "--production" in sys.argv
debug = not production

html_view = partial(_html_view, debug=debug)


def main() -> int:
    views = [
        html_view("index.html")(lambda: {
            "age": calc_age(),
            "skills": data.load_skills(),
            "links": data.load_links()
        }),
        html_view("projects.html")(lambda: {"projects": data.load_projects()}),
        html_view("talks.html")(lambda: {"talks": data.load_talks()}),
        html_view("contributions.html")(lambda: {
            "contributions": data.load_contributions()
        }),
        html_view("news.html")(lambda: {"news": data.load_news()}),
        html_view("sitemap.xml")(lambda: {
            "paths": [
                "projects.html",
                "talks.html",
                "contributions.html",
                "news.html"
            ]
        })
    ]
    [view() for view in views]
    return 0


if __name__ == "__main__":
    sys.exit(main())
