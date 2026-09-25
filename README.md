# Systole — Cardiovascular Telemetry Console

A React frontend for a cardiovascular disease screening tool. A logistic
regression model was trained offline on `cardio_train.csv` (70,000 records,
the Kaggle/UCI "Cardiovascular Disease" dataset) and its coefficients are
embedded directly in `src/model.js`, so risk assessment runs instantly in
the browser with no backend required.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

## What's inside

- `src/model.js` — the trained logistic regression (standardization means/
  stds, coefficients, intercept) and the `assessRisk()` function that scores
  a patient and ranks which factors drove the result.
- `src/components/IntakeForm.jsx` — patient chart entry (age, sex, height,
  weight, blood pressure, cholesterol, glucose, lifestyle toggles).
- `src/components/RiskDashboard.jsx` — risk %, category, BMI, blood pressure
  category, and a ranked breakdown of the top contributing factors.
- `src/components/PulseWave.jsx` — an animated ECG waveform whose speed and
  amplitude scale with the computed risk.
- `src/components/History.jsx` — a log of past assessments (persisted to
  `localStorage`) with a trend chart of systolic/diastolic BP and risk %.
- `train_model.py` — the training script used to produce the coefficients in
  `model.js`. Re-run it against a fresh CSV export to retrain.

## Data source

`cardio_train.csv` (from the ML Project notebook set) now lives in this repo
root and is what `train_model.py` reads. Re-running training against it
reproduces the exact coefficients already embedded in `src/model.js`,
confirming the two are in sync.

## Retraining the model

```bash
pip install pandas scikit-learn
python3 train_model.py
```

This regenerates `model_params.json`. Copy the `features`, `means`, `stds`,
`coefficients`, `intercept`, and `metrics` values into `src/model.js`.

## Model performance (current build)

| Metric | Value |
|---|---|
| Accuracy | 72.6% |
| Precision | 74.9% |
| Recall | 67.2% |
| F1 | 70.8% |
| ROC-AUC | 78.9% |

Trained on 54,818 rows, tested on 13,705 rows, after removing physiologically
implausible blood-pressure and height/weight outliers (~1,500 rows dropped).

## Disclaimer

This is a screening/educational tool built from a statistical model on
population survey data. It is **not a medical diagnosis** and should not
replace consultation with a physician.
