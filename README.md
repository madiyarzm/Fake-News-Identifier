# Fake News Identifier  
Empowering you to distinguish fact from fiction in the digital age.

<img width="1257" alt="image" src="https://github.com/user-attachments/assets/f493606d-91c0-4bfd-a555-06df6f979bc2" />

## Overview  
Fake News Identifier is an AI-powered web tool designed to analyze and classify news headlines as **real** or **fake** using machine learning. It combines the predictive strengths of both **Naive Bayes** and **Passive-Aggressive** classifiers, enhanced with a **weighted voting ensemble method** for high-accuracy detection.
Leverages cutting-edge natural language processing (NLP) techniques and machine learning models to evaluate content credibility.


## 📂 Dataset  
- Source: [`train.csv`](fake-news/train.csv) from a fake news dataset
- Labels:  
  - `1` → Fake News  
  - `0` → Real News

---

## 🛠️ Features & Workflow  

1. **Data Preprocessing**  
   - Missing values handled and rows dropped.
   - Text cleaned, lowercased, and tokenized.
   - Stopwords removed and words stemmed with `PorterStemmer`.

2. **Text Vectorization**  
   - TF-IDF Vectorizer with 1–3 n-gram range and max 10,000 features.

3. **Model Training**  
   - **Naive Bayes Classifier** trained on TF-IDF features.  
   - **Passive-Aggressive Classifier** trained with confidence scores.

4. **Weighted Ensemble**  
   - Combines outputs from both models with weighted voting:  
     - Naive Bayes (65% weight)  
     - Passive-Aggressive (35% weight)  
   - Converts weighted score to final binary classification.

5. **Evaluation**  
   - Confusion Matrix and Accuracy Score plotted for:
     - Naive Bayes
     - Passive-Aggressive
     - Ensemble Method

6. **Model Persistence**  
   - Saves TF-IDF vectorizer and trained models using `joblib`.

---

## 🎯 Accuracy  
- **Naive Bayes:** ~88%
![MB Naive bayes accuracy](https://github.com/user-attachments/assets/f3f32a73-db8b-4e5c-a2c8-232b53d090e7)
  
- **Passive-Aggressive:** ~92.5% 
<img width="649" alt="PassiveAggressiveClassifier accuracy" src="https://github.com/user-attachments/assets/06f410e4-0cca-4906-92ca-7f666a562154" />
   
- **Ensemble (Weighted Voting):** Highest balanced accuracy
![Weighted Voting (Bayes + PAC) accuracy](https://github.com/user-attachments/assets/91fcaacb-5b6d-4176-ad2d-40946df2843e)

-Logistic Regression (Naive Bayes + Passive Aggresive Classifier)
![Logistic Regression (Naive Bayes + PAC stacking)](https://github.com/user-attachments/assets/840c747c-e0c2-4ba1-9068-ceaa870e2052)

---

## 📦 Requirements  
Install dependencies using:

```bash
pip install numpy pandas matplotlib scikit-learn nltk joblib
```

You may also need to run:

```python
import nltk
nltk.download('stopwords')
```

---

## 💾 Saved Models  
- `tfidf_vectorizer.pkl`  
- `nb_model.pkl`  
- `pac_model.pkl`  

---

## Future Enhancements  
- Add deep learning (LSTM or BERT-based classifier)  
- Improve UI with streamlit or Flask for full interactivity  
- Support article body (not just headline)

---




