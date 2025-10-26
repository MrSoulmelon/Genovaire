import joblib
import numpy as np

def get_kmers(seq, k=3):
    return ' '.join([seq[i:i+k] for i in range(len(seq) - k + 1)])

def predict_adverse(dna_sequence, drug):
    # load artifacts
    clf = joblib.load("seq_drug_model.pkl")
    vectorizer = joblib.load("vectorizer.pkl")
    le_drug = joblib.load("drug_encoder.pkl")

    # prepare input
    dna_sequence = dna_sequence.strip().upper()
    kmers = get_kmers(dna_sequence)
    X_seq = vectorizer.transform([kmers])
    try:
        drug_enc = le_drug.transform([drug])[0]
    except ValueError:
        print("⚠️ Drug not found in training data.")
        return None

    X = np.hstack((X_seq.toarray(), [[drug_enc]]))
    prob = clf.predict_proba(X)[0]
    # prob[1] is probability of class “adverse = 1”
    return prob[1]

if __name__ == "__main__":
    dna_seq = input("Enter DNA sequence: ")
    drug = input("Enter drug name: ")
    p = predict_adverse(dna_seq, drug)
    if p is not None:
        print(f"Probability of adverse reaction to {drug}: {p*100:.2f}%")
