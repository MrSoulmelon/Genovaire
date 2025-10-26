import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import joblib

def get_kmers(seq, k=3):
    """Convert a DNA seq into a space-separated string of k-mers."""
    return ' '.join([seq[i:i+k] for i in range(len(seq) - k + 1)])

def main():
    # load data
<<<<<<< HEAD
    df = pd.read_csv("your_data.csv")
=======
    df = pd.read_csv("synthetic_protein_train.csv")
>>>>>>> 85741825f965f6bf917b1790f9d7f7f84c586bd5
    # optional: drop or filter any bad rows
    df = df.dropna()

    # convert DNA sequences to k-mers
    df["kmers"] = df["dna_sequence"].apply(get_kmers)

    # vectorize the kmers
    vectorizer = CountVectorizer()  # consider tweaking ngram_range etc
    X_seq = vectorizer.fit_transform(df["kmers"])

    # encode drug names
    le_drug = LabelEncoder()
    df["drug_enc"] = le_drug.fit_transform(df["drug"])

    # combine features: DNA features + drug encoding
    # we’ll append drug_enc as a numeric feature
    X = np.hstack((X_seq.toarray(), df["drug_enc"].values.reshape(-1, 1)))
    y = df["adverse_label"].values

    # train/test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # model
    clf = RandomForestClassifier(n_estimators=100, random_state=42)
    clf.fit(X_train, y_train)

    # evaluate
    from sklearn.metrics import classification_report, accuracy_score
    y_pred = clf.predict(X_test)
    print("Accuracy:", accuracy_score(y_test, y_pred))
    print(classification_report(y_test, y_pred))

    # save model + vectorizer + label encoder
    joblib.dump(clf, "seq_drug_model.pkl")
    joblib.dump(vectorizer, "vectorizer.pkl")
    joblib.dump(le_drug, "drug_encoder.pkl")
    print("Model, vectorizer, and encoder saved.")

if __name__ == "__main__":
    main()
