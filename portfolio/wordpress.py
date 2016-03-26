from typing import Any, Dict, Iterator, Optional

import requests


def load_posts(endpoint: str) -> Optional[Iterator[Dict[str, Any]]]:
    """Load WordPress posts using WordPress REST API v2"""
    url = endpoint + "wp/v2/posts"
    response = requests.get(url)
    if response.status_code != 200:
        return None

    def _format(post):
        # TODO: Format here
        return post

    return map(_format, response.json())
