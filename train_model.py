import pandas as pd
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, roc_auc_score, precision_score, recall_score, f1_score
import json

df = pd.read_csv('cardio_train.csv', sep=';')

# Clean
df['age_years'] = (df['age'] / 365.25)
df = df[(df['ap_hi'] > 60) & (df['ap_hi'] < 240)]
df = df[(df['ap_lo'] > 40) & (df['ap_lo'] < 180)]
df = df[df['ap_hi'] >= df['ap_lo']]
df = df[(df['height'] > 130) & (df['height'] < 210)]
df = df[(df['weight'] > 35) & (df['weight'] < 180)]

df['bmi'] = df['weight'] / ((df['height']/100) ** 2)
df['pulse_pressure'] = df['ap_hi'] - df['ap_lo']

features = ['age_years','gender','bmi','ap_hi','ap_lo','pulse_pressure','cholesterol','gluc','smoke','alco','active']
X = df[features]
y = df['cardio']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

scaler = StandardScaler()
X_train_s = scaler.fit_transform(X_train)
X_test_s = scaler.transform(X_test)

model = LogisticRegression(max_iter=1000)
model.fit(X_train_s, y_train)

pred = model.predict(X_test_s)
proba = model.predict_proba(X_test_s)[:,1]

metrics = {
    "accuracy": round(accuracy_score(y_test, pred), 4),
    "precision": round(precision_score(y_test, pred), 4),
    "recall": round(recall_score(y_test, pred), 4),
    "f1": round(f1_score(y_test, pred), 4),
    "roc_auc": round(roc_auc_score(y_test, proba), 4),
    "n_samples_after_cleaning": int(len(df)),
    "n_train": int(len(X_train)),
    "n_test": int(len(X_test)),
}

out = {
    "features": features,
    "means": scaler.mean_.tolist(),
    "stds": scaler.scale_.tolist(),
    "coefficients": model.coef_[0].tolist(),
    "intercept": float(model.intercept_[0]),
    "metrics": metrics
}

with open('model_params.json', 'w') as f:
    json.dump(out, f, indent=2)

print(json.dumps(metrics, indent=2))
print("\nCoefficients:")
for f, c in zip(features, model.coef_[0]):
    print(f"  {f}: {c:.4f}")
