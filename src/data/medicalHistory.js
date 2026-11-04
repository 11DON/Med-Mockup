export const medicalHistory = {
  "P-1001": {
    conditions: ["allergiesAsthma"],
    surgeries: [],
    associatedDisorders: { mentalRetardation: ["Speech", "Vision"], other: "" },
    labs: ["xray", "cbc"],
  },
  "P-1002": {
    conditions: ["earInfections"],
    surgeries: [],
    associatedDisorders: { mentalRetardation: [], other: "" },
    labs: [],
  },
  "P-1003": {
    conditions: ["skin"],
    surgeries: [],
    associatedDisorders: { mentalRetardation: [], other: "" },
    labs: [],
  },
};

export function getMedicalHistory(patientId) {
  return medicalHistory[patientId] ?? null;
}