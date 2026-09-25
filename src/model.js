// Logistic regression trained offline on cardio_train.csv (70,000 records, UCI/Kaggle
// "Cardiovascular Disease" dataset). Standardized features -> sigmoid(w·x + b).
// Retrain by re-running train.py against a fresh export of the dataset.

export const FEATURES = [
  'age_years', 'gender', 'bmi', 'ap_hi', 'ap_lo',
  'pulse_pressure', 'cholesterol', 'gluc', 'smoke', 'alco', 'active'
]

export const MEANS = [
  53.27188491996751, 1.3493378087489512, 27.443249016631402, 126.6384034441242,
  81.31507898865337, 45.32332445547083, 1.362855266518297, 1.2232843226677368,
  0.08852931518844176, 0.052847604801342624, 0.8041884052683426
]

export const STDS = [
  6.762068383728268, 0.4767608458414264, 5.202268986862272, 16.677974923573345,
  9.414494732856086, 11.635928103081492, 0.6777374605875667, 0.568182993873546,
  0.28406315414130584, 0.22372915649978148, 0.39682416017715283
]

export const COEFFICIENTS = [
  0.34631816744801647, 0.022430029693613136, 0.14585578964138976, 0.4519139199886753,
  0.37684612177680665, 0.3428341221499814, 0.3318235331954193, -0.07004789706882662,
  -0.04654681725219807, -0.04428321773935983, -0.10282747954607939
]

export const INTERCEPT = 0.028884480921163896

export const METRICS = {
  accuracy: 0.7263,
  precision: 0.7488,
  recall: 0.6721,
  f1: 0.7084,
  rocAuc: 0.7888,
  nTrain: 54818,
  nTest: 13705
}

const FEATURE_LABELS = {
  age_years: 'Age',
  gender: 'Sex',
  bmi: 'BMI',
  ap_hi: 'Systolic BP',
  ap_lo: 'Diastolic BP',
  pulse_pressure: 'Pulse pressure',
  cholesterol: 'Cholesterol',
  gluc: 'Glucose',
  smoke: 'Smoking',
  alco: 'Alcohol intake',
  active: 'Physical activity'
}

function sigmoid(z) {
  return 1 / (1 + Math.exp(-z))
}

/**
 * patient: {
 *   ageYears, gender (1=female,2=male), heightCm, weightKg,
 *   apHi, apLo, cholesterol (1-3), gluc (1-3),
 *   smoke (0/1), alco (0/1), active (0/1)
 * }
 */
export function assessRisk(patient) {
  const bmi = patient.weightKg / ((patient.heightCm / 100) ** 2)
  const pulsePressure = patient.apHi - patient.apLo

  const raw = {
    age_years: patient.ageYears,
    gender: patient.gender,
    bmi,
    ap_hi: patient.apHi,
    ap_lo: patient.apLo,
    pulse_pressure: pulsePressure,
    cholesterol: patient.cholesterol,
    gluc: patient.gluc,
    smoke: patient.smoke,
    alco: patient.alco,
    active: patient.active
  }

  let z = INTERCEPT
  const contributions = []

  FEATURES.forEach((f, i) => {
    const standardized = (raw[f] - MEANS[i]) / STDS[i]
    const contribution = standardized * COEFFICIENTS[i]
    z += contribution
    contributions.push({
      feature: f,
      label: FEATURE_LABELS[f],
      contribution
    })
  })

  const probability = sigmoid(z)

  let category = 'low'
  if (probability >= 0.66) category = 'high'
  else if (probability >= 0.4) category = 'moderate'

  contributions.sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution))

  return {
    probability,
    category,
    bmi,
    pulsePressure,
    topFactors: contributions.slice(0, 5)
  }
}

export function bpCategory(apHi, apLo) {
  if (apHi < 90 || apLo < 60) return 'Low'
  if (apHi < 120 && apLo < 80) return 'Normal'
  if (apHi < 130 && apLo < 80) return 'Elevated'
  if (apHi < 140 || apLo < 90) return 'Stage 1 hypertension'
  return 'Stage 2 hypertension'
}
