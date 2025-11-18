# Using KNN Model
import pickle

MODEL_PATH = "../model_weights/best_model.pkl"
stress_labels = ['Distress (Negative Stress) - Stress that causes anxiety and impairs well-being.',
        'Eustress (Positive Stress) - Stress that motivates and enhances performance.',
        'No Stress - Currently experiencing minimal to no stress.']

def get_feature_vector(response, topic_label_json):
    pass

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
    pass