import calendar
import hashlib
import re
import sys
import time

from lxml import etree
from progress.bar import Bar
from elasticsearch import Elasticsearch

from extractors import extract_birth_date, extract_birth_place, extract_death_date, extract_short_description, \
    extract_image
from config import Category


class ProcessedBar(Bar):
    width = 1
    suffix = '%(index)d pages'
    bar_prefix = ''
    bar_suffix = ''
    fill = ''
    color = True


class PersonDataIsMissing(Exception):
    pass


def extract_person_data_from_page(element, ns) -> dict:
    title_node = element.find(f'{ns}title')
    text_node = element.find(f'{ns}revision/{ns}text')

    if title_node is None:
        raise PersonDataIsMissing

    birth_date = extract_birth_date(text_node.text)
    birth_place = extract_birth_place(text_node.text)
    short_description = extract_short_description(text_node.text)
    # image_url = extract_image(text_node.text)

    if birth_place is None or birth_date is None:
        raise PersonDataIsMissing

    if birth_place['geo_points'] is None:
        raise PersonDataIsMissing

    if short_description is None:
        raise PersonDataIsMissing

    return {
        'name': title_node.text,
        'image_url': f'https://i.pravatar.cc/150?u={title_node.text}',
        'birth_date': birth_date,
        'birth_place': birth_place,
        'death_date': extract_death_date(text_node.text),
        'short_description': short_description,
        'page_text': text_node.text
    }


def insert_person_data_to_index(es, person_data, es_index):
    # insert a document
    document = {
        'name': person_data['name'],
        'birth_date': person_data['birth_date'],
        'birth_place': {
            'place': person_data['birth_place']['place'],
            'present_day_place': person_data['birth_place']['present_day_place'],
            'location': {
                "lat": float(person_data['birth_place']['geo_points']['lat']),
                "lon": float(person_data['birth_place']['geo_points']['lng'])
            },
        },
        'death_date': person_data['death_date'],
        'page_text': person_data['page_text'],
        'short_description': person_data['short_description'],
        'image_url': person_data['image_url']
    }

    data = f"{document['name']}{document['birth_date']}{document['birth_place']}{time.time_ns()}"

    # create a new SHA-256 hash object
    sha256 = hashlib.sha256()

    # update the hash object with the bytes of the data
    sha256.update(data.encode())

    # get the hexadecimal representation of the hash
    hash_hex = sha256.hexdigest()

    es.index(index=es_index, id=hash_hex, body=document)


category_arg_to_category_regexp = {
    Category.FAMOUS_PERSONS.value: 'Category:People from.*'
}


def parse_xml(file, config):
    category_to_parse = config['parser']['category_to_parse']
    regexp_for_page_filtering = category_arg_to_category_regexp[category_to_parse]

    # Compile the regular expression
    regex = re.compile(regexp_for_page_filtering)

    ns = config['parser']['xml_ns']

    # Create an ElementTree iterator
    context = etree.iterparse(file, tag=f'{ns}page')

    bar = ProcessedBar(f'Parsing {file}, pages processed: ')

    es_index = config['parser']['es_index']

    es = Elasticsearch(hosts=config['es']['host'], basic_auth=(config['es']['user_name'], config['es']['password'])
                       )

    # Check if the index already exists
    if not es.indices.exists(index=es_index):
        # Create the index
        es.indices.create(index=es_index,
                          body={"mappings": config['es']['index_mapping'], "settings": config['es']['index_settings']})

    # Iterate through the elements of the XML file
    for event, elem in context:
        text = elem.find(f'{ns}revision/{ns}text')
        if text is not None and regex.search(text.text):
            try:
                person_data = extract_person_data_from_page(elem, ns)
                insert_person_data_to_index(es, person_data, es_index)
            except PersonDataIsMissing:
                continue
            bar.next()
            # Clear the element to save memory
            elem.clear()
    bar.finish()
