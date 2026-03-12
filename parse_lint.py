import json

with open('lint_report.json', 'r') as f:
    data = json.load(f)

errors = []
for file_data in data:
    for message in file_data['messages']:
        if message['severity'] == 2:
            errors.append({
                'filePath': file_data['filePath'],
                'line': message['line'],
                'column': message['column'],
                'ruleId': message['ruleId'],
                'message': message['message']
            })

for error in errors:
    print(f"{error['filePath']}:{error['line']}:{error['column']} - {error['ruleId']} - {error['message']}")
