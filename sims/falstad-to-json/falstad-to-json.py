import json

def falstad_to_json(falstad_text):
    lines = falstad_text.strip().split("\n")
    json_data = {"components": []}
    
    for line in lines:
        parts = line.split()
        if parts[0] == 'r':  # Resistor
            json_data["components"].append({
                "type": "resistor",
                "x1": int(parts[1]),
                "y1": int(parts[2]),
                "x2": int(parts[3]),
                "y2": int(parts[4]),
                "resistance": float(parts[6])
            })
        elif parts[0] == 'g':  # Ground
            json_data["components"].append({
                "type": "ground",
                "x1": int(parts[1]),
                "y1": int(parts[2]),
                "x2": int(parts[3]),
                "y2": int(parts[4])
            })
        elif parts[0] == 'w':  # Wire
            json_data["components"].append({
                "type": "wire",
                "x1": int(parts[1]),
                "y1": int(parts[2]),
                "x2": int(parts[3]),
                "y2": int(parts[4])
            })
        elif parts[0] == '172':  # Voltage source
            json_data["components"].append({
                "type": "voltage_source",
                "x1": int(parts[1]),
                "y1": int(parts[2]),
                "x2": int(parts[3]),
                "y2": int(parts[4]),
                "value": float(parts[5]),
                "name": "Voltage"
            })

    return json.dumps(json_data, indent=4)

# Example usage with your provided data:
falstad_data = '''$ 1 5.0E-6 10.391409633455755 50 5.0 50
r 256 176 256 304 0 100.0
172 304 176 304 128 0 6 5.0 5.0 0.0 0.0 0.5 Voltage
g 256 336 256 352 0
w 256 304 256 336 1
r 352 176 352 304 0 1000.0
w 352 304 352 336 1
g 352 336 352 352 0
w 304 176 352 176 0
w 256 176 304 176 0'''

json_output = falstad_to_json(falstad_data)
print(json_output)
