import csv
import re

# Initialize an empty list to store the rows
world_cities_rows = []

# Open the CSV file
# TODO: Open file remotely instead of local access
with open('assets/worldcities.csv', 'r') as file:
    reader = csv.reader(file)
    # Iterate over the rows in the CSV file
    for row in reader:
        # Append each row to the list
        world_cities_rows.append(row)

def extract_image(text):
    pattern = r"\|\s*image\s*=\s*(.+?)\n"

    match = re.search(pattern, text)

    if match:
        result = match.group(1)
        result = result.replace(" ", "_")
        return result
    else:
        return None

def extract_short_description(text):
    pattern = r"\{\{short description\|(.+?)\}\}"
    match = re.search(pattern, text)

    if match:
        result = match.group(1)
        return result
    else:
        return None

def extract_birth_date(text):
    # TODO: Parse the following format as well: | date   = 28 February 1690
    return extract_date(text, r'\|\s*birth.*\|(\d{4})\|(\d{1,2})\|(\d{1,2})\|')


def extract_death_date(text):
    return extract_date(text, r'\|\s*death.*\|(\d{4})\|(\d{1,2})\|(\d{1,2})\|')


def extract_date(text, regexp):
    r_date = re.compile(regexp)

    date = re.search(r_date, text)

    if date is None:
        return None

    return f"{date.group(1)}-{date.group(2).zfill(2)}-{date.group(3).zfill(2)}"


def extract_birth_place(text):
    place_match = re.search(r'\|\s*birth_place\s*=\s*(.*)', text)
    present_day_place = None
    if place_match:
        present_day_match = re.search(r'present-day\s\[\[(\w+)', place_match.group(1))

        if present_day_match:
            present_day_place = format_place(
                present_day_match.group(1)
            )

        place = format_place(place_match.group(1))

        if present_day_place:
            geo_points = get_geo_for_place(present_day_place)
        else:
            geo_points = get_geo_for_place(place)

        return {'place': format_place(place_match.group(1)),
                'present_day_place': present_day_place,
                'geo_points': geo_points
                }

    return None


def get_geo_for_place(place):
    main_place, *other = place.split(',')

    if main_place is None:
        return None

    appropriate_csv_row = find_place_row_in_world_cities_db(main_place)

    if appropriate_csv_row is None:
        return None

    return get_geo_points_from_csv_row(appropriate_csv_row)


def find_place_row_in_world_cities_db(place):
    # Iterate over the rows in the CSV file
    for row in world_cities_rows:
        # Use the re module to search for a match in the row
        match = re.search(place, row[0])
        # If a match is found, print the row
        if match:
            return row

    return None


def get_geo_points_from_csv_row(row):
    city, city_ascii, lat, lng, *other = row

    if lat is not None and lng is not None:
        return {
            'lat': lat,
            'lng': lng
        }

    return None


def format_place(text):
    places = re.findall(r'(\w+)', text)

    return ", ".join(places)
