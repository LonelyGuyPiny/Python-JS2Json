import os
import json
import re
import chompjs
from html.parser import HTMLParser

class MyHTMLParser(HTMLParser):
    def __init__(self):
        HTMLParser.__init__(self)
        self.match = False
        self.title = ''

    def handle_starttag(self, tag, attrs):
        self.match = tag == 'title'

    def handle_data(self, data):
        if self.match:
            self.title = data
            self.match = False


def extract_js_objects(file_path):
    """
    Extracts all JS objects from the given file path and returns them as a list
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        data = f.read()
        data = data.replace('\n', ' ')
        data = data.replace('\r', ' ')
        data = data.replace('\"', '\\"')
        data = data.replace('`', '\"')
        print(data)

    # Extract all JS objects using regex
    #js_objects = re.findall(r'{[\s\S]*?}', data)
    js_objects = chompjs.parse_js_object(data)
    #print(json.dumps(js_objects))

    return js_objects


def convert_js_to_json(input_path, output_path):
    """
    Converts all JS files in the given input path to JSON files and saves them to the given output path
    """
    # Traverse through all subfolders in the input path, two levels down
    for root, dirs, files in os.walk(input_path):
        if root.count(os.sep) - input_path.count(os.sep) == 2:
            # Check if the current folder contains /src/config
            if 'src' in dirs and os.path.isdir(os.path.join(root, 'src', 'config')):
                config_folder = os.path.join(root, 'src', 'config')
                output_folder = os.path.join(output_path, os.path.relpath(root, input_path))

                # Create output folder if it does not exist
                os.makedirs(output_folder, exist_ok=True)

                # Extract all JS objects from all JS files in the config folder
                for file in os.listdir(config_folder):
                    if file.endswith('.js'):
                        js_file = os.path.join(config_folder, file)
                        js_objects = extract_js_objects(js_file)
                        
                        if file == 'appHeader.js':
                            js_objects[0]['appLogo'] = root.split('\\')[-2] + '.png'

                            parser = MyHTMLParser() 
                            with open(os.path.join(root, 'public', 'index.html'), 'r', encoding='utf-8') as f:
                                data = f.read()
                                parser.feed(data)                            

                            js_objects[0]['tabTitle'] = parser.title

                        # Save JS objects to JSON file in output folder
                        json_file = os.path.join(output_folder, os.path.splitext(file)[0] + '.json')
                        with open(json_file, 'w') as f:
                            json.dump(js_objects, f, indent=4)


def main():
    # Accept input folder path from user
    #input_path = input('Enter input folder path: ').strip()
    input_path  = 'apps'

    # Check if input path is valid
    if not os.path.isdir(input_path):
        print('Error: Invalid input folder path')
        return

    # Create output folder path
    output_path = os.path.join(os.path.dirname(input_path), 'output')

    # Convert all JS files in input path to JSON files in output path
    convert_js_to_json(input_path, output_path)

    print('Conversion complete.')

if __name__ == '__main__':
    main()