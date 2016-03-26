from datetime import date
from typing import Tuple


def calc_age() -> int:
    today = date.today()
    born = date(1993, 10, 25)
    return (today.year -
            born.year -
            int((today.month, today.day) < (born.month, born.day)))


def calc_copyright_years() -> Tuple[int, int]:
    return 2013, date.today().year
