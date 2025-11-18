# Using KNN Model
import pickle
import json
# import ollama
from transformers import pipeline


MODEL_PATH = "../model_weights/best_model.pkl"
stress_labels = ['Distress (Negative Stress) - Stress that causes anxiety and impairs well-being.',
        'Eustress (Positive Stress) - Stress that motivates and enhances performance.',
        'No Stress - Currently experiencing minimal to no stress.']

response_analyzer = pipeline("zero-shot-classification",
                      model="facebook/bart-large-mnli")

with open('../sample_response.json', 'r', encoding='utf-8') as f:
  user_response = json.load(f)

with open('../topic_labels.json', 'r', encoding='utf-8') as g:
  topic_label_json = json.load(g)


def print_label_class_response(model, topic_json_data, topic_key, topic_response):
  labelling_result = model(topic_response, candidate_labels=topic_json_data[topic_key])

  label_numeric = topic_json_data[topic_key].index(labelling_result['labels'][0]) + 1

  print(f"Response: {topic_response} | Related to: {topic_key}")
  print(f"Label in Numeric: {label_numeric} | Label Text: {topic_json_data[topic_key][label_numeric-1]}\n")

  return label_numeric

def get_feature_vector(response, topic_label_json):
    response_numeric = [int(response['gender']['response']), int(response['age']['response'])]

    for key in user_response:
        if key != "age" and key != "gender":
            label_numeric = print_label_class_response(model=response_analyzer,
                                                   topic_json_data=topic_label_json,
                                                   topic_key=key,
                                                   topic_response=user_response[key]['response'])
            response_numeric.append(label_numeric)
    print(response_numeric)
    return response_numeric
def build_feature_vector_json(feature_vector, responses):
    # Extract key of responses
    # Build dictionary of (key: feature_vector[i] for i, key in enumerate(responses.keys())
    pass

def get_prediction(sample):
    with open(MODEL_PATH, 'rb') as f:
        best_model = pickle.load(f)

    numeric_label = best_model.predict(sample)

    return numeric_label


def get_llm_suggestions(feature_vector_json, stress_type):
    with open("../response_schema.json", 'r') as f:
        stress_response_schema = json.load(f)

    response = ollama.generate(model='llama3:8b',
                    format="json",
                    prompt=f'Give some stress advice on the basis of the user conditions and follow this response schema {stress_response_schema}. Factor status is given as this {feature_vector_json} and stress is classified as {stress_type}')

    return response

# get_feature_vector(user_response, topic_label_json)