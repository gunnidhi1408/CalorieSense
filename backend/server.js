/**
 * CalorieSense – Express Backend API
 * Proxies prediction requests to the Python Flask ML service.
 */

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 5000;
const ML_SERVICE = "https://caloriesense-bwkm.onrender.com";

app.use(cors());
app.use(express.json());

// ── Validation helpers ──────────────────────────────────────────────
const FIELDS = [
  { name: "Age",        min: 10,  max: 100 },
  { name: "Gender",     min: 0,   max: 1   },
  { name: "Height",     min: 100, max: 250 },
  { name: "Weight",     min: 20,  max: 250 },
  { name: "Duration",   min: 1,   max: 300 },
  { name: "Heart_Rate", min: 40,  max: 220 },
  { name: "Body_Temp",  min: 35,  max: 42  },
];

function validate(body) {
  const errors = [];
  for (const f of FIELDS) {
    if (body[f.name] === undefined || body[f.name] === null || body[f.name] === "") {
      errors.push(`${f.name} is required`);
    } else {
      const v = Number(body[f.name]);
      if (isNaN(v)) errors.push(`${f.name} must be a number`);
      else if (v < f.min || v > f.max)
        errors.push(`${f.name} must be between ${f.min} and ${f.max}`);
    }
  }
  return errors;
}

// ── Routes ──────────────────────────────────────────────────────────
app.post("/api/predict", async (req, res) => {
  const errors = validate(req.body);
  if (errors.length) return res.status(400).json({ error: errors.join("; ") });

  try {
    const { data } = await axios.post(`${ML_SERVICE}/predict`, req.body);
    res.json(data);
  } catch (err) {
    const msg =
      err.response?.data?.error ||
      "ML service unavailable. Make sure predict_server.py is running.";
    res.status(502).json({ error: msg });
  }
});

app.get("/api/meta", async (_req, res) => {
  try {
    const { data } = await axios.get(`${ML_SERVICE}/meta`);
    res.json(data);
  } catch (err) {
    res.status(502).json({ error: "Could not fetch model metadata." });
  }
});

app.get("/api/health", async (_req, res) => {
  try {
    const { data } = await axios.get(`${ML_SERVICE}/health`);
    res.json({ backend: "ok", ml_service: data.status });
  } catch {
    res.json({ backend: "ok", ml_service: "unreachable" });
  }
});

app.listen(PORT, () => {
  console.log(`\n  CalorieSense API  →  http://localhost:${PORT}`);
  console.log(`  ML Service target →  ${ML_SERVICE}\n`);
});
