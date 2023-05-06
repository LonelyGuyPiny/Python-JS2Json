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
        lines = f.readlines()

        data = ''
        for line in lines:
            if not line.startswith('//'):
                data = data + line

    pattern = r"([\w]+\'[\w]+)"
    matches = re.findall(pattern, data)
    matches = set(matches)

    for match in matches:
        data = data.replace(match, match.replace("\'", "\\'"))

    # Extract all JS objects using chompjs
    js_objects = chompjs.parse_js_object(data)

    return js_objects

def convert_string(string):
    # Use regex to find all occurrences of a string in the format key: 'value'
    pattern = r"([\w]+):\s*"
    matches = re.findall(pattern, string)
    matches = set(matches)

    # Replace each match with the key-value pair in the format 'key': 'value'
    for match in matches:
        if match.count('\'') == 0 and not match in ['size', 'family', 'right', 'align', 'color', 'border', 'margin', 'padding'] :  
          string = string.replace(match, f"\"{match}\"")

    return string

def simple_convert(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

        data = ''
        for line in lines:
            if not line.strip(' ').startswith('//'):
                data = data + line
    
    data = data.strip(' ')
    data = data.replace('`', '\"')
    #data = data.replace('\'', '\"')

    # Remove 'export default' from the beginning of the text
    data = data.replace('export default', '', 1).lstrip()

    # Remove the semicolon if it's the last non-spacing character
    if data[-1] == ';':
        data = data[:-1].rstrip()

    data = convert_string(data)
    return data

def other_convert(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

        data = ''
        for line in lines:
            if not line.strip(' ').startswith('//'):
                data = data + line
    
    data = data.strip(' ')
    data = data.replace('\"', '\\"')
    data = data.replace('`', '\"')
    data = data.replace('\n', '')

    pattern = r"([\w]+\"[\w]+)"
    matches = re.findall(pattern, data)
    matches = set(matches)

    for match in matches:
        data = data.replace(match, match.replace('\"', '\\"'))

    pattern = r"([\w]+\'[\w]+)"
    matches = re.findall(pattern, data)
    matches = set(matches)

    for match in matches:
        data = data.replace(match, match.replace("\'", "\\'"))

    pattern = r"(>[\s]+)"
    matches = re.findall(pattern, data)
    matches = set(matches)
    #print(data)

    for match in matches:
        data = data.replace(match, match[:1] + '\\n ')
    #print(data)    
    
    json_objects = chompjs.parse_js_object(data)

    return json_objects

def convert_translation(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

        data = ''
        for line in lines:
            if not line.strip(' ').startswith('//'):
                data = data + line
    
    data = data.strip(' ')
    #data = data.replace('\"', '\\"')
    #data = data.replace("\'", "\\'")
    #data = data.replace('`', '\"')
    data = data.replace('\n', '')

    #pattern = r"([\w]+\"[\w]+)"
    #matches = re.findall(pattern, data)
    #matches = set(matches)

    #for match in matches:
    #    data = data.replace(match, match.replace('\"', '\\"'))

    #pattern = r"([\w]+\'[\w]+)"
    #matches = re.findall(pattern, data)
    #matches = set(matches)

    #for match in matches:
    #    data = data.replace(match, match.replace("\'", "\\'"))
    #print(data + '\n')

    #print(data)    
    
    json_objects = chompjs.parse_js_object(data)
    #print(json_objects)

    return json_objects


def convert_settings(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

        data = ''
        for line in lines:
            if line.startswith('export'):
                break
            if not line.startswith('//'):
                data = data + line            
    
    data = data.replace('const ', '')
    data = data.replace('}', '},')
    data = data.replace(' =', ':')
    data = '{' + data + '}'
    json_object = chompjs.parse_js_object(data)

    return json_object


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
                        json_file = os.path.join(output_folder, os.path.splitext(file)[0] + '.json')
                        
                        if file == 'appHeader.js':
                            js_objects = extract_js_objects(js_file)
                            
                            js_objects[0]['appLogo'] = root.split('\\')[-2] + '.png'

                            parser = MyHTMLParser() 
                            with open(os.path.join(root, 'public', 'index.html'), 'r', encoding='utf-8') as f:
                                data = f.read()
                                parser.feed(data)                            

                            js_objects[0]['tabTitle'] = parser.title

                            # Save JS objects to JSON file in output folder
                            with open(json_file, 'w', encoding='utf-8') as f:
                                f.write(json.dumps(js_objects, indent=2, ensure_ascii=False))

                        elif file == 'settings.js':
                            js_objects = convert_settings(js_file)
                            with open(json_file, 'w', encoding='utf-8') as f:
                                json.dump(js_objects, f, indent=2, ensure_ascii=False)

                        elif file == 'translation.js' :
                            #js_objects = simple_convert(js_file)
                            #with open(json_file, 'w', encoding='utf-8') as f:
                            #    f.write(js_objects)
                            js_objects = convert_translation(js_file)
                            with open(json_file, 'w', encoding='utf-8') as f:
                                json.dump(js_objects, f, indent=2, ensure_ascii=False)

                        elif file != 'linksSupport.js':
                            try:
                                js_objects = extract_js_objects(js_file)
                                with open(json_file, 'w', encoding='utf-8') as f:
                                    json.dump(js_objects, f, indent=2, ensure_ascii=False)
                            except:
                                js_objects = other_convert(js_file)
                                with open(json_file, 'w', encoding='utf-8') as f:
                                    json.dump(js_objects, f, indent=2, ensure_ascii=False)



def main():
    # Accept input folder path from user
    input_path = input('Enter input folder path: ').strip()
    #input_path = 'apps'

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