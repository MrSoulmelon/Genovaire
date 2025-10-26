#!/usr/bin/env python3
"""
BioSync Backend Startup Script
This script starts the Flask API server for the BioSync AI Drug Response Digital Twin.
"""

import os
import sys
import subprocess

def check_python_version():
    """Check if Python version is compatible."""
    if sys.version_info < (3, 8):
        print("❌ Python 3.8 or higher is required.")
        print(f"Current version: {sys.version}")
        return False
    print(f"✅ Python version: {sys.version}")
    return True

# Note: dependency installation at runtime has been removed.
# Install required packages before running this script with:
#    pip install -r requirements.txt

def check_model_files():
    """Check if required model files exist."""
    required_files = [
        "Hackathon/seq_drug_model.pkl",
        "Hackathon/vectorizer.pkl", 
        "Hackathon/drug_encoder.pkl",
        "Hackathon/your_data.csv"
    ]
    
    missing_files = []
    for file in required_files:
        if not os.path.exists(file):
            missing_files.append(file)
    
    if missing_files:
        print("❌ Missing required files:")
        for file in missing_files:
            print(f"   - {file}")
        return False
    
    print("✅ All required model files found!")
    return True

def start_server():
    """Start the Flask server."""
    print("🚀 Starting BioSync API Server...")
    print("🌐 Server will be available at: http://localhost:5000")
    print("📊 API endpoints:")
    print("   - GET  /api/health")
    print("   - GET  /api/drugs")
    print("   - POST /api/predict")
    print("   - POST /api/simulate")
    print("   - GET  /api/stats")
    print("\n" + "="*50)
    
    try:
        subprocess.run([sys.executable, "app.py"])
    except KeyboardInterrupt:
        print("\n👋 Server stopped by user")
    except Exception as e:
        print(f"❌ Error starting server: {e}")

def main():
    """Main startup function."""
    print("🧬 BioSync AI Drug Response Digital Twin - Backend")
    print("="*50)
    
    # Check Python version
    if not check_python_version():
        sys.exit(1)
    
    # Check model files
    if not check_model_files():
        print("\n💡 Make sure you're running this script from the backend directory")
        print("   and that all model files are present in the Hackathon folder.")
        sys.exit(1)
    # Dependencies must be installed ahead of time using requirements.txt
    # For example: pip install -r requirements.txt
    # Start server
    start_server()

if __name__ == "__main__":
    main()
