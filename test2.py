import re

def convert_string(string):
    # Use regex to find all occurrences of a string in the format key: 'value'
    pattern = r"([\w]+):"
    matches = re.findall(pattern, string)
    matches = set(matches)
    print(matches)

    # Replace each match with the key-value pair in the format 'key': 'value'
    for match in matches:   
        string = string.replace(match, f"'{match}'")

    return string

with open('feed.js', 'r', encoding='utf-8') as f:
    data = f.read()
    data = convert_string(data)
    print(data)