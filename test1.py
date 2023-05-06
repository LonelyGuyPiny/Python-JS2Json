import json

# Define the JavaScript object
js_obj = {
    "name": "John",
    "age": 30,
    "city": "New York",
    "test": {
        "name": "job",
        "age": 30
    }
}

# Convert the JavaScript object to a JSON string
json_str = json.dump(js_obj)

# Write the JSON string to a file
with open('output.json', 'w') as f:
    f.write(json_str)