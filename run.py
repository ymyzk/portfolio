# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from datetime import date
from os import path
import sys

from jinja2 import Environment, FileSystemLoader


works = [
    {
        "title": "京大マップ",
        "link": "http://www.kyodaimap.net/",
        "tags": ["Android", "iOS", "Web"]
    },
    {
        "title": "鶉野マップ",
        "link": "https://geo.itunes.apple.com/jp/app/chun-yemappu/id655525538?mt=8",
        "tags": ["iOS"]
    },
    {
        "title": "YMNetworkActivityManager",
        "link": "https://github.com/ymyzk/YMNetworkActivityManager",
        "tags": ["iOS", "Library"]
    },
    {
        "title": "itcdownloader",
        "link": "https://github.com/ymyzk/itcdownloader",
        "tags": ["Utility"]
    },
    {
        "title": "sasm",
        "link": "https://github.com/ymyzk/sasm",
        "tags": ["Python", "Web"]
    },
    {
        "title": "iOS Compatibility Chart",
        "link": "http://ioschart.herokuapp.com/",
        "tags": ["Web"]
    },
    {
        "title": "YMCalendarActivity",
        "link": "http://ymyzk.github.io/YMCalendarActivity/",
        "tags": ["iOS", "Library"]
    },
    {
        "title": "RTConnect",
        "link": "http://cran.r-project.org/web/packages/RTConnect/index.html",
        "tags": ["R"]
    },
    {
        "title": "django-channels",
        "link": "https://github.com/ymyzk/django-channels",
        "tags": ["Library", "Python"]
    },
    {
        "title": "python-gyazo",
        "link": "https://github.com/ymyzk/python-gyazo",
        "tags": ["Library", "Python"]
    }
]

talks = [
    {
        "title": "iOS 開発のいま",
        "event": "ADF2015 LT会",
        "date": date(2015, 3, 8),
        "link": "http://www.slideshare.net/yusukemiy/ios-adf2015"
    },
    {
        "title": "Swift の問題点",
        "event": "CAMPHOR- x KMC 合同LT会",
        "date": date(2014, 10, 25),
        "link": "http://www.slideshare.net/yusukemiy/20141025-camphor-ltswift"
    },
    {
        "title": "iOS 開発のいま",
        "event": "CAMPHOR- x KMC 合同LT会",
        "date": date(2014, 10, 25),
        "link": "http://www.slideshare.net/yusukemiy/20150324-camphor-ltios"
    },
    {
        "title": "最新の iOS に対応したアプリの開発",
        "event": "CAMPHOR- x KMC 合同LT会",
        "date": date(2014, 10, 25),
        "link": "http://www.slideshare.net/yusukemiy/20141025-camphor-ios"
    },
    {
        "title": "コンピューターネットワーク入門",
        "event": "CAMPHOR- 土曜講座",
        "date": date(2014, 10, 11),
        "link": "http://www.slideshare.net/yusukemiy/ss-40165347"
    },
    {
        "title": "WWDC14 レポート + α",
        "event": "CAMPHOR- 土曜講座",
        "date": date(2014, 6, 28),
        "link": "https://atnd.org/events/52473"
    },
    {
        "title": "Python プログラミング入門",
        "event": "CAMPHOR-",
        "date": date(2014, 4, 20),
        "link": "https://atnd.org/events/49435"
    },
    {
        "title": "サーバー構築入門",
        "event": "CAMPHOR- 土曜講座",
        "date": date(2014, 3, 22),
        "link": "https://atnd.org/events/48404"
    },
    {
        "title": "HTML初心者講座",
        "event": "CAMPHOR- 土曜講座",
        "date": date(2013, 11, 15),
        "link": "http://www.slideshare.net/yusukemiy/html4beginners"
    }
]

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
    source_dir = path.dirname(path.abspath(__file__)) + "/source"
    output_dir = path.dirname(path.abspath(__file__)) + "/output/"
    loader = FileSystemLoader(source_dir, encoding="utf-8")
    env = Environment(loader=loader)

    filename = "index.html"
    template = env.get_template(filename)
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


if __name__ == "__main__":
    debug = "--debug" in sys.argv
    main(debug=debug)
