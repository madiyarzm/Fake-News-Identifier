#Main Python Script for Fake News Identifying
import ssl
import nltk

#bypass SSL certificate verification for NLTK downloads
try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

#download stopwords
nltk.download('stopwords')

import pandas as pd
df = pd.read_csv('fake-news/train.csv')

#print(df.head())

#to get independent features 
X = df.drop('label', axis = 1)
print(X.head())

#now getting dependent features (REAL/FAKE)
Y = df['label']
print(Y.head())

#needed libraries for counting vectors, TFIDFvectorizing
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer, HashingVectorizer

#drop all N/A and empty records
df = df.dropna()

#reset index, to fill the gap after dropping N/As
messages = df.copy()
messages.reset_index(inplace=True)

#library to identify stopwords("is", "and")
import re
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
ps = PorterStemmer()
corpus = []
for i in range(0, len(messages)):
    #removes all non letters
    review = re.sub('[^a-zA-Z]', ' ', messages['title'][i])
    review = review.lower()
    review = review.split()

    #ps.stem -> makes running -> run
    review = [ps.stem(word) for word in review if not word in stopwords.words('english')]
    review = ' '.join(review)
    corpus.append(review)

from sklearn.feature_extraction.text import TfidfVectorizer
#limiting tokens(words), to reduce dimensionality
#ngram = uniword, bigram (1 word, 2 words)
cv = TfidfVectorizer(max_features=10000, ngram_range=(1,3))
X = cv.fit_transform(corpus).toarray()

Y = messages['label']

#gets module that automatically splits dataset into train and test sets
from sklearn.model_selection import train_test_split 
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size = 0.33, random_state = 0) #33% of set will be test

#fitting data, all unique words = features
cv.fit(corpus)
#print(cv.get_feature_names_out()[:20])

#Naive Bayes algo, classifies and counts freqs
from sklearn.naive_bayes import MultinomialNB
classifier = MultinomialNB()

from sklearn import metrics
import numpy as np
import itertools

classifier.fit(X_train, Y_train)
pred = classifier.predict(X_test)
score = metrics.accuracy_score(Y_test, pred)

import matplotlib.pyplot as plt
#to know the accuracy % through checking how much test set correctly predicted
def plot_confusion_matrix(cm, classes, normalize = False, title = 'Confusion matrix', cmap = plt.cm.Blues): #correct/all
    plt.imshow(cm, interpolation = 'nearest', cmap = cmap)
    plt.title(title)
    plt.colorbar()
    tick_marks = np.arange(len(classes))
    plt.xticks(tick_marks, classes, rotation = 45)
    plt.yticks(tick_marks, classes)

    if normalize:
        cm = cm.astype('float') / cm.sum(axis = 1)[:, np.newaxis]
        print("Normalized confusion matrix")
    
    else:
        print("Confusion matrix, without normalization")

    thresh = cm.max() / 2. #50% threshold, by Naive Bayes <50%

    for i, j in itertools.product(range(cm.shape[0]), range(cm.shape[1])):
        plt.text(j, i, cm[i, j],
            horizontalalignment = "center",
            color = "white" if cm[i, j] > thresh else "black")
    
    plt.tight_layout()
    plt.ylabel("True label")
    plt.xlabel("Predicted label")

print("accuracy:    %0.3f" % score)
cm  = metrics.confusion_matrix(Y_test, pred)
plot_confusion_matrix(cm, classes = ['FAKE', 'REAL'])
plt.show()

from sklearn.linear_model import PassiveAggressiveClassifier
linear_clf = PassiveAggressiveClassifier(max_iter = 100)

linear_clf.fit(X_train, Y_train)
pred = linear_clf.predict(X_test)
score = metrics.accuracy_score(Y_test, pred)
print("accuracy:   %0.3f" % score)
cm = metrics.confusion_matrix(Y_test, pred)
plot_confusion_matrix(cm, classes=['FAKE Data', 'REAL Data'])
plt.show()
