from flask import Flask, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

question_section_dict = {'Demographic': ["gender", "age"],
                         'Emotional and Stress Indicators': ["experienced_stress", "rapid_heartbeats", "anxiety", "sleep_problems", "concentration_trouble", "tension", "sadness", "irritated", "isolated" ],
                         'Physical and Health Indicators': ["headaches", "illness", "gain_loss_weight" ],
                         'Academic and Environment Stressors': ["academic_workload", "competition", "confidence_lack", "subject_confidence_lack", "conflict_acad_cocurr_activities", "attend_classes", "difficulties_with_professors", "stressful_workplace", "hostel_environment_difficulty"],
                         'Social and Relationship Factors': ["relationships", "relaxation_time_amount" ]}


@app.route("/get-sections", methods=['GET'])
def get_timeline_sections():
    sections = list(question_section_dict.keys())
    return jsonify(sections)

@app.route("/get-questions", methods=['GET'])
def get_survey_questions():
    with open('../sample_response.json', 'r') as f:
        sample_response_data = json.load(f)
    print(sample_response_data)
    return jsonify(sample_response_data)


if __name__ == "__main__":
    app.run(debug=True, port=1234, host="localhost")