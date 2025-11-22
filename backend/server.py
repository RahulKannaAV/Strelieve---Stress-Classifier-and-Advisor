from flask import Flask, jsonify
from flask_cors import CORS
from classify_stress import get_prediction, get_feature_vector, get_llm_suggestions, build_feature_vector_json
import json
from flask import request

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

@app.route("/section-question", methods=['GET'])
def get_section_questions():
    section = request.args.get("section")
    print(section)

    return question_section_dict[section]
@app.route("/get-questions", methods=['GET'])
def get_survey_questions():
    with open('../sample_response.json', 'r', encoding='utf-8') as f:
        sample_response_data = json.load(f)
    print(sample_response_data)
    return jsonify(sample_response_data)

@app.route("/load-sample-res", methods=['GET'])
def load_sample_response():
    response_dict = dict()
    with open("../sample_response.json", 'r', encoding='utf-8') as f:
        response_data = json.load(f)

    for key in response_data:
        response_dict[key] = response_data[key]['response']

    return response_dict

@app.route("/generate-suggestion", methods=["POST"])
def send_suggestions():
    responses = request.form["user_response"]

    with open('../topic_labels.json', 'r', encoding='utf-8') as f:
        topic_label_json = json.load(f)

    feature_vector = get_feature_vector(responses, topic_label_json)
    stress_type = get_prediction(feature_vector)

    feature_vector_json = build_feature_vector_json(feature_vector, responses)

    llm_response = get_llm_suggestions(feature_vector_json, stress_type)

if __name__ == "__main__":
    app.run(debug=True, port=1234, host="localhost")