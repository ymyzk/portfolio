# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from datetime import date
import json
from os import path
import sys

from jinja2 import Environment, FileSystemLoader


links = [
    {
        "title": "Blog",
        "link": "https://blog.ymyzk.com/"
    },
    {
        "title": "Facebook",
        "link": "https://www.facebook.com/yusuke.miy"
    },
    {
        "title": "GitHub",
        "link": "https://github.com/ymyzk"
    },
    {
        "title": "LinkedIn",
        "link": "http://www.linkedin.com/profile/view?id=265164037"
    },
    {
        "title": "Twitter",
        "link": "https://twitter.com/ymyzk"
    },
    {
        "title": "Wantedly",
        "link": "https://www.wantedly.com/users/2289515"
    }
]

links2 = [
    {
        "title": "株式会社Unimap、アカリクVALUATORを引受先とした第三者割当増資を実施 (@Press, 2014-04-02)",
        "link": "http://www.atpress.ne.jp/view/44784"
    },
    {
        "title": "「鶉野飛行場」スマホで案内　京大生のアプリ好評 (神戸新聞朝刊 北播版, 2014-01-14)",
        "link": "http://www.kobe-np.co.jp/news/hokuban/201401/0006636797.shtml"
    }
]

def main(debug=False):
    root_dir = path.dirname(path.abspath(__file__))
    data_dir = root_dir + "/data/"
    output_dir = root_dir + "/output/"
    loader = FileSystemLoader(root_dir + "/source", encoding="utf-8")
    env = Environment(loader=loader)

    def index():
        filename = "index.html"
        template = env.get_template(filename)

        with open(data_dir + "works.json") as f:
            works = json.load(f)
        with open(data_dir + "talks.json") as f:
            talks = json.load(f)

        with open(output_dir + filename, "w") as f:
            today = date.today()
            born = date(1993, 10, 25)
            age = (today.year
                   - born.year
                   - int((today.month, today.day) < (born.month, born.day)))
            context = {
                "debug": debug,
                "age": age,
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
