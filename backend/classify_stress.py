# Using KNN Model
import pickle
import json
import ollama
from transformers import pipeline
from AdviceClass import StressAdvice


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
    response_numeric = [int(response['gender']), int(response['age'])]

    for key in response:
        if key != "age" and key != "gender":
            label_numeric = print_label_class_response(model=response_analyzer,
                                                   topic_json_data=topic_label_json,
                                                   topic_key=key,
                                                   topic_response=response[key])
            response_numeric.append(label_numeric)
    print(response_numeric)
    return response_numeric
def build_feature_vector_json(feature_vector, responses):
    # Extract key of responses
    fv_dict = {key: feature_vector[i] for i, key in enumerate(responses.keys())}
    return fv_dict

def get_prediction(sample):
    with open(MODEL_PATH, 'rb') as f:
        best_model = pickle.load(f)

    numeric_label = best_model.predict([sample])

    return numeric_label


def get_llm_suggestions(feature_vector_json, stress_type):


    response = ollama.generate(model='llama3:8b',
                    format=StressAdvice.model_json_schema(),
                    prompt=f'Give some stress advice on the basis of the user conditions and follow the format {StressAdvice.model_json_schema()}. Factor status is given as this {feature_vector_json} and stress is classified as {stress_labels[stress_type[0]]}')

    response_structured = StressAdvice.model_validate_json(response['response'])
    return response_structured

# get_feature_vector(user_response, topic_label_json)