# BioSync Backend - AI Drug Response Digital Twin

This is the backend API server for BioSync, an AI-powered system that predicts adverse drug reactions based on DNA sequences using machine learning.

## 🧬 What It Does

BioSync analyzes DNA sequences and drug names to predict the probability of adverse drug reactions. The system uses:

- **DNA k-mer analysis**: Converts DNA sequences into 3-base k-mers for machine learning
- **Drug encoding**: Encodes drug names as numerical features
- **Random Forest Classifier**: Predicts adverse reaction probability
- **RESTful API**: Provides endpoints for frontend integration

## 🚀 Quick Start

### Option 1: Using the startup script (Recommended)
```bash
cd backend
python start_backend.py
```

### Option 2: Manual setup
```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Start the server
python app.py
```

The API will be available at `http://localhost:5000`

## 📊 API Endpoints

### Health Check
```
GET /api/health
```
Returns server status and model loading status.

### Get Available Drugs
```
GET /api/drugs
```
Returns list of drugs available for prediction.

### Single Drug Prediction
```
POST /api/predict
Content-Type: application/json

{
  "dna_sequence": "ATGCGATCG...",
  "drug": "Paracetamol"
}
```

### Multiple Drug Simulation
```
POST /api/simulate
Content-Type: application/json

{
  "dna_sequence": "ATGCGATCG...",
  "drugs": ["Paracetamol", "Ibuprofen", "Amoxicillin"]
}
```

### Model Statistics
```
GET /api/stats
```
Returns statistics about the training data and model.

## 🗂️ Project Structure

```
backend/
├── app.py                 # Main Flask application
├── start_backend.py       # Startup script
├── requirements.txt       # Python dependencies
├── README.md             # This file
└── Hackathon/            # ML model files
    ├── seq_drug_model.pkl    # Trained Random Forest model
    ├── vectorizer.pkl        # DNA k-mer vectorizer
    ├── drug_encoder.pkl      # Drug name encoder
    ├── your_data.csv         # Training dataset
    ├── train_sequence_model.py  # Model training script
    └── predict_with_sequence.py # Original prediction script
```

## 🧪 Model Details

- **Algorithm**: Random Forest Classifier
- **Features**: DNA k-mers (3-base sequences) + drug encoding
- **Training Data**: 500+ samples with DNA sequences and drug interactions
- **Output**: Probability of adverse reaction (0-100%)

## 🔧 Development

### Training a New Model
```bash
cd Hackathon
python train_sequence_model.py
```

### Testing Predictions
```bash
cd Hackathon
python predict_with_sequence.py
```

## 🌐 Frontend Integration

The backend is designed to work with the React frontend. Make sure both servers are running:

1. **Backend**: `http://localhost:5000`
2. **Frontend**: `http://localhost:5173` (or 5174/5175)

## 📈 Performance

- **Prediction Time**: < 100ms per request
- **Concurrent Users**: Supports multiple simultaneous predictions
- **Memory Usage**: ~50MB for model loading
- **Accuracy**: Varies by drug and DNA sequence complexity

## 🛠️ Troubleshooting

### Common Issues

1. **Models not loading**: Check that all .pkl files exist in Hackathon/
2. **CORS errors**: Frontend and backend must be on different ports
3. **Drug not found**: Use `/api/drugs` to see available drugs
4. **Invalid DNA sequence**: Only A, T, G, C characters allowed

### Logs

The server provides detailed logging for debugging:
- Model loading status
- Prediction requests and responses
- Error messages and stack traces

## 🔒 Security Notes

- This is a development/demo version
- No authentication or rate limiting implemented
- Input validation is basic
- For production use, add proper security measures

## 📝 License

This project is part of the BioSync AI Drug Response Digital Twin system.
