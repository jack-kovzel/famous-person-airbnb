import calendar
import os
import sys
import time
from collections import ChainMap
from enum import Enum


class Category(Enum):
    FAMOUS_PERSONS = 'famous_persons'


def get_env_var(name, required=True):
    env_var = os.environ.get(name)

    if env_var is None and required is True:
        print(f'The following env var should be provided: {name}')
        sys.exit()

    return env_var


def create_config_from_args(args) -> ChainMap:
    gmt = time.gmtime()

    # ts stores timestamp
    ts = calendar.timegm(gmt)

    new_es_index = f"{args.category_to_parse}_{ts}"

    config = {
        'parser': {
            'category_to_parse': args.category_to_parse,
            'xml_ns': '{http://www.mediawiki.org/xml/export-0.10/}',
            'es_index': args.es_index if args.es_index is not None else new_es_index
        },
        'es': {
            'host': get_env_var('ELASTICSEARCH_HOST'),
            'user_name': get_env_var('ELASTICSEARCH_USERNAME'),
            'password': get_env_var('ELASTICSEARCH_PASSWORD'),
            'index_settings': {
                "index": {
                  "sort.field": "name.raw",
                  "sort.order": "asc"
                },
            },
            'index_mapping': {
                "properties": {
                    "birth_date": {
                        "type": "date"
                    },
                    "birth_place": {
                        "properties": {
                            "location": {
                                "type": "geo_point"
                            },
                            "place": {
                                "type": "text",
                                "fields": {
                                    "keyword": {
                                        "type": "keyword",
                                        "ignore_above": 256
                                    }
                                }
                            },
                            "present_day_place": {
                                "type": "text",
                                "fields": {
                                    "keyword": {
                                        "type": "keyword",
                                        "ignore_above": 256
                                    }
                                }
                            }
                        },
                    },
                    "death_date": {
                        "type": "date"
                    },
                    "name": {
                        "type": "text",
                        "fields": {
                            "raw": {
                                "type": "keyword",
                                "doc_values": True,
                            }
                        },
                    },
                    "image_url": {
                        "type": "text",
                    },
                    "short_description": {
                        "type": "text",
                    },
                    "page_text": {
                        "type": "text",
                        "fields": {
                            "keyword": {
                                "type": "keyword",
                                "ignore_above": 256
                            }
                        }
                    }
                }
            }
        }
    }

    return ChainMap(config)
