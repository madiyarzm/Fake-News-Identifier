from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)  # Allow frontend to make requests

# Load saved models
tfidf_vectorizer = joblib.load('tfidf_vectorizer.pkl')
nb_classifier = joblib.load('nb_model.pkl')
pac_classifier = joblib.load('pac_model.pkl')

# Prediction function
def predict_fake_news(text):
    text_tfidf = tfidf_vectorizer.transform([text]).toarray()

    # Naive Bayes & PAC Predictions
    prob_nb = nb_classifier.predict_proba(text_tfidf)[:, 1]  
    score_pac = pac_classifier.decision_function(text_tfidf)

    # Weighted Voting 
    weight_nb = 0.65
    weight_pac = 0.35
    final_score = (weight_nb * prob_nb) + (weight_pac * score_pac)
    weighted_pred = "FAKE" if final_score > 0.5 else "REAL"

    return {"Prediction": weighted_pred}

# API Endpoint
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    news_text = data.get("text", "")

    if not news_text:
        return jsonify({"error": "No text provided"}), 400

    prediction = predict_fake_news(news_text)
    return jsonify(prediction)

if __name__ == '__main__':
    app.run(debug=True)
