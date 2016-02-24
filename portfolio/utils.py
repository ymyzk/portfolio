from datetime import date
from typing import Dict


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
