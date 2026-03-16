# CalorieSense – AI Calories Burn Prediction System

A full-stack web application that uses machine learning to predict calories burned during exercise.

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React 18, Vite, Tailwind CSS 3, Framer Motion, Recharts |
| Backend | Node.js, Express.js, Axios |
| ML Model | Python, Scikit-learn (Random Forest), Flask |

## Quick Start

### 1. Train the ML Model

```bash
cd ml-model
pip install -r requirements.txt
python train_model.py
```

### 2. Start the Python Prediction Server

```bash
cd ml-model
python predict_server.py
# Runs on http://localhost:5001
```

### 3. Start the Node.js Backend

```bash
cd backend
npm install
npm start
# Runs on http://localhost:5000
```

### 4. Start the Frontend

```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:3000
```

### 5. Open in Browser

Navigate to **http://localhost:3000**

## Pages

- **Landing** (`/`) – Hero section with animated energy visuals
- **Predict** (`/predict`) – Input body metrics, get AI calorie prediction
- **AI Insights** (`/insights`) – How the ML model works
- **Visualize** (`/visualize`) – Prediction history charts
- **About** (`/about`) – Model details, dataset, accuracy

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/predict` | Send body metrics, receive calorie prediction |
| GET | `/api/meta` | Get model metadata (accuracy, features) |
| GET | `/api/health` | Health check |
