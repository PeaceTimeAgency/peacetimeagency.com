import json

with open('lint_report_v2.json', 'r', encoding='utf-16le' if open('lint_report_v2.json', 'rb').read(2) == b'\xff\xfe' else 'utf-8') as f:
    try:
        data = json.load(f)
    except Exception as e:
        print(f"Error loading JSON: {e}")
        exit(1)

rule_to_find = 'react-compiler/no-set-state-in-effect'
results = []
for file_data in data:
    for message in file_data['messages']:
        if message.get('ruleId') == rule_to_find:
            results.append({
                'file': file_data['filePath'],
                'line': message['line'],
                'message': message['message']
            })

for res in results:
    print(f"{res['file']}:{res['line']} - {res['message']}")
