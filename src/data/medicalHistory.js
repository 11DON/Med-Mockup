
export const medicalHistory = {

  "P-1001": {
    allergies: ["Penicillin"],
    chronicConditions: ["Asthma"],
    currentMedications: [
      { name: "Salbutamol inhaler", dose: "100 mcg", frequency: "As needed" },
    ],
    immunizations: [
      { vaccine: "MMR", date: "12/10/2019", status: "Completed" },
      { vaccine: "DTP booster", date: "05/03/2023", status: "Completed" },
      { vaccine: "Influenza", date: "10/10/2025", status: "Completed" },
    ],
    pastVisits: [
      {
        date: "14/06/2026",
        doctor: "Dr. Sara Hassan",
        department: "Pediatrics",
        diagnosis: "Seasonal asthma flare-up",
        notes: "Prescribed inhaler, follow-up in 3 months",
      },
      {
        date: "02/02/2026",
        doctor: "Dr. Sara Hassan",
        department: "Pediatrics",
        diagnosis: "Routine check-up",
        notes: "Growth and development within normal range",
      },
    ],
    growth: [
      { date: "14/06/2026", heightCm: 124, weightKg: 24 },
      { date: "02/02/2026", heightCm: 122, weightKg: 23 },
    ],
    familyHistory: ["Father: asthma"],
    lastUpdated: "14/06/2026",
  },

  "P-1002": {
    allergies: ["Dust mites"],
    chronicConditions: [],
    currentMedications: [],
    immunizations: [
      { vaccine: "MMR", date: "20/08/2021", status: "Completed" },
      { vaccine: "DTP booster", date: "18/02/2025", status: "Completed" },
      { vaccine: "Hepatitis A", date: "15/08/2022", status: "Completed" },
    ],
    pastVisits: [
      {
        date: "09/07/2026",
        doctor: "Dr. Khaled Fathy",
        department: "ENT",
        diagnosis: "Recurrent otitis media",
        notes: "Hearing test advised, review in 4 weeks",
      },
      {
        date: "11/01/2026",
        doctor: "Dr. Sara Hassan",
        department: "Pediatrics",
        diagnosis: "Upper respiratory infection",
        notes: "Rest and fluids, no antibiotics needed",
      },
    ],
    growth: [
      { date: "09/07/2026", heightCm: 116, weightKg: 20 },
      { date: "11/01/2026", heightCm: 113, weightKg: 19 },
    ],
    familyHistory: ["Mother: allergic rhinitis"],
    lastUpdated: "09/07/2026",
  },

  "P-1003": {
    allergies: ["Peanuts"],
    chronicConditions: [],
    currentMedications: [],
    immunizations: [
      { vaccine: "MMR", date: "12/02/2023", status: "Completed" },
      { vaccine: "DTP booster", date: "14/05/2023", status: "Completed" },
    ],
    pastVisits: [
      {
        date: "03/09/2026",
        doctor: "Dr. Sara Hassan",
        department: "Pediatrics",
        diagnosis: "Speech delay screening",
        notes: "Referred for full assessment",
      },
    ],
    growth: [{ date: "03/09/2026", heightCm: 106, weightKg: 17 }],
    familyHistory: [],
    lastUpdated: "03/09/2026",
  },

  "P-1004": {
    allergies: [],
    chronicConditions: ["Eczema"],
    currentMedications: [
      {
        name: "Hydrocortisone cream 1%",
        dose: "Thin layer",
        frequency: "Twice daily",
      },
    ],
    immunizations: [
      { vaccine: "MMR", date: "20/02/2023", status: "Completed" },
      { vaccine: "DTP booster", date: "22/05/2023", status: "Completed" },
    ],
    pastVisits: [
      {
        date: "21/08/2026",
        doctor: "Dr. Mona Adel",
        department: "Dermatology",
        diagnosis: "Eczema flare-up",
        notes: "Follow-up in 6 weeks",
      },
    ],
    growth: [{ date: "21/08/2026", heightCm: 105, weightKg: 16.5 }],
    familyHistory: ["Mother: eczema"],
    lastUpdated: "21/08/2026",
  },
};

export function getMedicalHistory(patientId) {
  return medicalHistory[patientId] ?? null;
}