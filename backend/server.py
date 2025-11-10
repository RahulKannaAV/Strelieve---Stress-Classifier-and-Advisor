from flask import Flask
import json

question_section_dict = {'Demographic': ["gender", "age"],
                         'Emotional and Stress Indicators': ["experienced_stress", "rapid_heartbeats", "anxiety", "sleep_problems", "concentration_trouble", "tension", "sadness", "irritated", "isolated" ],
                         'Physical and Health Indicators': ["headaches", "illness", "gain_loss_weight" ],
                         'Academic and Environment Stressors': ["academic_workload", "competition", "confidence_lack", "subject_confidence_lack", "conflict_acad_cocurr_activities", "attend_classes", "difficulties_with_professors", "stressful_workplace", "hostel_environment_difficulty"],
                         'Social and Relationship Factors': ["relationships", "relaxation_time_amount" ]}

with open('../sample_response.json', 'r') as f:
    sample_response_data = json.load(f)

sections = list(question_section_dict.keys())
print(sections)
