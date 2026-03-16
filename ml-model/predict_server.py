"""
CalorieSense – Flask Prediction Micro-Service
Serves the trained Random Forest model on port 5001.
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os

app = Flask(__name__)
CORS(app)

MODEL_PATH = os.path.join(os.path.dirname(__file__), "model.pkl")
model = None


def load_model():
    global model
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(
            "model.pkl not found. Run train_model.py first."
        )
    model = joblib.load(MODEL_PATH)
    print(f"✓ Model loaded from {MODEL_PATH}")


FEATURE_ORDER = ["Age", "Gender", "Height", "Weight", "Duration", "Heart_Rate", "Body_Temp"]

VALIDATION_RULES = {
    "Age":        (10, 100),
    "Gender":     (0, 1),
    "Height":     (100, 250),
    "Weight":     (20, 250),
    "Duration":   (1, 300),
    "Heart_Rate": (40, 220),
    "Body_Temp":  (35, 42),
}


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json(force=True)

        # Validate all required fields
        missing = [f for f in FEATURE_ORDER if f not in data]
        if missing:
            return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400

        # Validate ranges
        for feat, (lo, hi) in VALIDATION_RULES.items():
            val = float(data[feat])
            if val < lo or val > hi:
                return jsonify({
                    "error": f"{feat} must be between {lo} and {hi}. Got {val}."
                }), 400

        # Build feature vector in the correct order
        features = np.array([[float(data[f]) for f in FEATURE_ORDER]])
        prediction = model.predict(features)[0]

        return jsonify({
            "calories": round(float(prediction), 2),
            "unit": "kcal",
            "inputs": {f: float(data[f]) for f in FEATURE_ORDER},
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "model_loaded": model is not None})


@app.route("/meta", methods=["GET"])
def meta():
    import json
    meta_path = os.path.join(os.path.dirname(__file__), "model_meta.json")
    if os.path.exists(meta_path):
        with open(meta_path) as f:
            return jsonify(json.load(f))
    return jsonify({"error": "No metadata found. Train the model first."}), 404


# Load model once on startup
load_model()

if __name__ == "__main__":
    print("CalorieSense Prediction Server running on http://localhost:5001")
    app.run(host="0.0.0.0", port=5001, debug=False)

