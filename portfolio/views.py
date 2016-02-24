from functools import wraps
from os import path
from typing import Any, Callable, Dict

from jinja2 import Environment, FileSystemLoader

from portfolio.utils import calc_copyright_years


Context = Dict[str, Any]

root_dir = path.dirname(path.dirname(path.abspath(__file__)))
output_dir = root_dir + "/output/"
loader = FileSystemLoader(root_dir + "/source", encoding="utf-8")
env = Environment(loader=loader)


def minify_html(html: str) -> str:
    lines = map(lambda l: l.strip(), html.split("\n"))
    lines = filter(lambda l: l != "", lines)
    return "\n".join(lines)


def html_view(filename: str, debug: bool = True):
    template = env.get_template(filename)
    context = {
        "debug": debug,
        "copyright_years": calc_copyright_years()
    }

    def decorator(view: Callable[..., Context]) -> Callable[..., Context]:
        @wraps(view)
        def wrapper(*args, **kwargs) -> Callable[..., Context]:
            context.update(view(*args, **kwargs))
            html = template.render(**context)
            if not debug:
                html = minify_html(html)
            with open(output_dir + filename, "w") as f:
                f.write(html)
        return wrapper
    return decorator
