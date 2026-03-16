"""
CalorieSense – ML Model Training Script
Generates synthetic calorie-burn data and trains a Random Forest Regressor.
"""

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_absolute_error
import joblib
import os

np.random.seed(42)

NUM_SAMPLES = 5000

def generate_synthetic_data(n=NUM_SAMPLES):
    """Generate realistic synthetic exercise calorie-burn data."""
    age = np.random.randint(18, 65, n)
    gender = np.random.choice([0, 1], n)  # 0 = Female, 1 = Male
    height = np.random.normal(170, 10, n).clip(140, 210)  # cm
    weight = np.random.normal(72, 15, n).clip(40, 150)  # kg
    duration = np.random.uniform(5, 120, n)  # minutes
    heart_rate = np.random.normal(110, 20, n).clip(60, 190)  # bpm
    body_temp = np.random.normal(38.5, 0.8, n).clip(36.5, 41.0)  # °C

    # Calorie formula (physics-inspired with realistic noise)
    bmr_factor = 0.5 * weight + 0.3 * height - 0.2 * age + 5 * gender
    intensity = (heart_rate - 60) / 130  # normalized intensity
    temp_boost = (body_temp - 37) * 15
    calories = (
        bmr_factor * 0.05
        + duration * intensity * 8.5
        + temp_boost
        + duration * 0.8
        + np.random.normal(0, 8, n)  # noise
    ).clip(5, None)

    df = pd.DataFrame({
        "Age": age,
        "Gender": gender,
        "Height": np.round(height, 1),
        "Weight": np.round(weight, 1),
        "Duration": np.round(duration, 1),
        "Heart_Rate": np.round(heart_rate, 1),
        "Body_Temp": np.round(body_temp, 2),
        "Calories": np.round(calories, 2),
    })
    return df


def train_model():
    print("=" * 55)
    print("  CalorieSense – Model Training")
    print("=" * 55)

    # Generate data
    df = generate_synthetic_data()
    print(f"\n✓ Generated {len(df)} synthetic samples")
    print(f"  Features : Age, Gender, Height, Weight, Duration, Heart_Rate, Body_Temp")
    print(f"  Target   : Calories burned\n")

    X = df.drop("Calories", axis=1)
    y = df["Calories"]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    # Train Random Forest
    model = RandomForestRegressor(
        n_estimators=200,
        max_depth=15,
        min_samples_split=5,
        random_state=42,
        n_jobs=-1,
    )
    model.fit(X_train, y_train)

    # Evaluate
    y_pred = model.predict(X_test)
    r2 = r2_score(y_test, y_pred)
    mae = mean_absolute_error(y_test, y_pred)

    print(f"  R² Score           : {r2:.4f}")
    print(f"  Mean Abs Error     : {mae:.2f} kcal")
    print(f"  Training samples   : {len(X_train)}")
    print(f"  Test samples       : {len(X_test)}")

    # Feature importances
    importances = dict(zip(X.columns, model.feature_importances_))
    print("\n  Feature Importances:")
    for feat, imp in sorted(importances.items(), key=lambda x: -x[1]):
        bar = "█" * int(imp * 40)
        print(f"    {feat:<12} {imp:.3f}  {bar}")

    # Save
    model_path = os.path.join(os.path.dirname(__file__), "model.pkl")
    joblib.dump(model, model_path)
    print(f"\n✓ Model saved to {model_path}")

    # Save metadata for the About page
    meta = {
        "r2_score": round(r2, 4),
        "mae": round(mae, 2),
        "n_samples": NUM_SAMPLES,
        "n_estimators": 200,
        "max_depth": 15,
        "features": list(X.columns),
        "feature_importances": {k: round(v, 4) for k, v in importances.items()},
    }
    import json
    meta_path = os.path.join(os.path.dirname(__file__), "model_meta.json")
    with open(meta_path, "w") as f:
        json.dump(meta, f, indent=2)
    print(f"✓ Metadata saved to {meta_path}\n")

    return model, meta


if __name__ == "__main__":
    train_model()
