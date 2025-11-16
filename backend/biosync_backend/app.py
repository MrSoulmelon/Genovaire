from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Global variables to store loaded models
clf = None
vectorizer = None
le_drug = None
available_drugs = None

def get_kmers(seq, k=3):
    """Convert a DNA sequence into a space-separated string of k-mers."""
    return ' '.join([seq[i:i+k] for i in range(len(seq) - k + 1)])

def load_models():
    """Load the trained ML models and data."""
    global clf, vectorizer, le_drug, available_drugs
    
    try:
        # Load models
        clf = joblib.load("Hackathon/seq_drug_model.pkl")
        vectorizer = joblib.load("Hackathon/vectorizer.pkl")
        le_drug = joblib.load("Hackathon/drug_encoder.pkl")
        
        # Load data to get available drugs
        df = pd.read_csv("Hackathon/your_data.csv")
        available_drugs = sorted(df['drug'].unique().tolist())
        
        print("Models loaded successfully!")
        print(f"Available drugs: {len(available_drugs)}")
        return True
    except Exception as e:
        print(f"Error loading models: {str(e)}")
        return False

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({
        "status": "healthy",
        "message": "BioSync API is running",
        "models_loaded": clf is not None
    })

@app.route('/api/drugs', methods=['GET'])
def get_drugs():
    """Get list of available drugs with optional search."""
    if available_drugs is None:
        return jsonify({"error": "Models not loaded"}), 500
    
    search_query = request.args.get('search', '').strip().lower()
    
    if search_query:
        filtered_drugs = [drug for drug in available_drugs if search_query in drug.lower()]
    else:
        filtered_drugs = available_drugs
    
    return jsonify({
        "drugs": filtered_drugs,
        "count": len(filtered_drugs),
        "total_count": len(available_drugs),
        "search_query": search_query
    })

@app.route('/api/predict', methods=['POST'])
def predict_adverse_reaction():
    """Predict adverse drug reaction based on DNA sequence and drug."""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "No JSON data provided"}), 400
        
        dna_sequence = data.get('dna_sequence', '').strip()
        drug = data.get('drug', '').strip()
        
        if not dna_sequence:
            return jsonify({"error": "DNA sequence is required"}), 400
        
        if not drug:
            return jsonify({"error": "Drug name is required"}), 400
        
        if clf is None or vectorizer is None or le_drug is None:
            return jsonify({"error": "Models not loaded"}), 500
        
        # Validate DNA sequence (basic validation)
        valid_bases = {'A', 'T', 'G', 'C'}
        if not all(base in valid_bases for base in dna_sequence.upper()):
            return jsonify({"error": "Invalid DNA sequence. Only A, T, G, C are allowed"}), 400
        
        # Check if drug is available
        if drug not in available_drugs:
            return jsonify({
                "error": "Drug not found in training data",
                "available_drugs": available_drugs[:10]  # Show first 10 for reference
            }), 400
        
        # Prepare input
        dna_sequence = dna_sequence.upper()
        kmers = get_kmers(dna_sequence)
        X_seq = vectorizer.transform([kmers])
        
        # Encode drug
        drug_enc = le_drug.transform([drug])[0]
        
        # Combine features
        X = np.hstack((X_seq.toarray(), [[drug_enc]]))
        
        # Make prediction
        prob = clf.predict_proba(X)[0]
        adverse_probability = prob[1]  # Probability of adverse reaction
        
        # Get prediction confidence
        prediction = clf.predict(X)[0]
        
        # Risk level classification
        if adverse_probability < 0.3:
            risk_level = "Low"
            risk_color = "green"
        elif adverse_probability < 0.7:
            risk_level = "Medium"
            risk_color = "yellow"
        else:
            risk_level = "High"
            risk_color = "red"
        
        return jsonify({
            "success": True,
            "prediction": {
                "adverse_probability": round(adverse_probability * 100, 2),
                "prediction": int(prediction),
                "risk_level": risk_level,
                "risk_color": risk_color,
                "confidence": round(max(prob) * 100, 2)
            },
            "input": {
                "dna_sequence": dna_sequence,
                "drug": drug,
                "sequence_length": len(dna_sequence)
            },
            "model_info": {
                "model_type": "Random Forest",
                "features_used": "DNA k-mers + drug encoding"
            }
        })
        
    except Exception as e:
        return jsonify({
            "error": f"Prediction failed: {str(e)}"
        }), 500

@app.route('/api/simulate', methods=['POST'])
def simulate_multiple_drugs():
    """Simulate drug responses for multiple drugs with the same DNA sequence."""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "No JSON data provided"}), 400
        
        dna_sequence = data.get('dna_sequence', '').strip()
        drugs = data.get('drugs', [])
        
        if not dna_sequence:
            return jsonify({"error": "DNA sequence is required"}), 400
        
        if not drugs or not isinstance(drugs, list):
            return jsonify({"error": "List of drugs is required"}), 400
        
        if clf is None or vectorizer is None or le_drug is None:
            return jsonify({"error": "Models not loaded"}), 500
        
        # Validate DNA sequence
        valid_bases = {'A', 'T', 'G', 'C'}
        if not all(base in valid_bases for base in dna_sequence.upper()):
            return jsonify({"error": "Invalid DNA sequence. Only A, T, G, C are allowed"}), 400
        
        results = []
        dna_sequence = dna_sequence.upper()
        kmers = get_kmers(dna_sequence)
        X_seq = vectorizer.transform([kmers])
        
        for drug in drugs:
            if drug not in available_drugs:
                results.append({
                    "drug": drug,
                    "error": "Drug not found in training data",
                    "adverse_probability": None
                })
                continue
            
            try:
                # Encode drug
                drug_enc = le_drug.transform([drug])[0]
                
                # Combine features
                X = np.hstack((X_seq.toarray(), [[drug_enc]]))
                
                # Make prediction
                prob = clf.predict_proba(X)[0]
                adverse_probability = prob[1]
                
                # Risk level classification
                if adverse_probability < 0.3:
                    risk_level = "Low"
                    risk_color = "green"
                elif adverse_probability < 0.7:
                    risk_level = "Medium"
                    risk_color = "yellow"
                else:
                    risk_level = "High"
                    risk_color = "red"
                
                results.append({
                    "drug": drug,
                    "adverse_probability": round(adverse_probability * 100, 2),
                    "risk_level": risk_level,
                    "risk_color": risk_color,
                    "confidence": round(max(prob) * 100, 2)
                })
                
            except Exception as e:
                results.append({
                    "drug": drug,
                    "error": f"Prediction failed: {str(e)}",
                    "adverse_probability": None
                })
        
        return jsonify({
            "success": True,
            "dna_sequence": dna_sequence,
            "results": results,
            "summary": {
                "total_drugs": len(drugs),
                "successful_predictions": len([r for r in results if 'error' not in r]),
                "failed_predictions": len([r for r in results if 'error' in r])
            }
        })
        
    except Exception as e:
        return jsonify({
            "error": f"Simulation failed: {str(e)}"
        }), 500

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Get statistics about the model and data."""
    try:
        if available_drugs is None:
            return jsonify({"error": "Models not loaded"}), 500
        
        # Load data for statistics
        df = pd.read_csv("Hackathon/your_data.csv")
        
        stats = {
            "total_samples": len(df),
            "total_drugs": len(available_drugs),
            "adverse_reactions": int(df['adverse_label'].sum()),
            "adverse_rate": round((df['adverse_label'].sum() / len(df)) * 100, 2),
            "avg_sequence_length": round(df['dna_sequence'].str.len().mean(), 2),
            "drug_distribution": df['drug'].value_counts().to_dict()
        }
        
        return jsonify({
            "success": True,
            "statistics": stats
        })
        
    except Exception as e:
        return jsonify({
            "error": f"Failed to get statistics: {str(e)}"
        }), 500

if __name__ == '__main__':
    print("Starting BioSync API Server...")
    
    # Load models on startup
    if load_models():
        port = int(os.environ.get('PORT', 5000))
        debug = os.environ.get('FLASK_ENV') == 'development'
        print(f"Starting Flask server on http://0.0.0.0:{port}")
        app.run(debug=debug, host='0.0.0.0', port=port)
    else:
        print("Failed to load models. Please check the model files.")
