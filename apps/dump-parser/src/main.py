import argparse
import sys

from lxml import etree

from parser import parse_xml
from config import create_config_from_args, Category


def validate_file(file):
    context = etree.iterparse(file)
    for event, elem in context:
        if "Wikipedia" != elem.text:
            print("The file is not a Wikipedia dump.")
            sys.exit()
        break


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Script for parsing wikipedia xml dump and populating Elasticsearch '
                                                 'index.')
    parser.add_argument('--dump-file', required=True, type=str, help='Path to xml dump file (or files separated by '
                                                                     'comma).')
    parser.add_argument('--category-to-parse', required=True, type=str, choices=[color.value for color in Category],
                        help='Category of pages to parse')
    parser.add_argument('--es-index', type=str,
                        help='Index to use. Otherwise a new index will be created in format: "{category_to_parse}_{'
                             'timestamp}"')

    args = parser.parse_args()

    # get the file path from the command-line argument
    xml_file_path = args.dump_file

    config = create_config_from_args(args)

    files_to_parse = args.dump_file.split(',')

    for xml_file_path in files_to_parse:
        validate_file(xml_file_path)
        parse_xml(xml_file_path, config)
