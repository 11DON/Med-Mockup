export const MODAL_TITLES = {
  scales: "Add Scale",
  scaleAssessment: "Scale Assessment",
  observation: "Add New Observation",
  summary: "Add Summary",
  plan: "Edit Plan",
  goal: "Add Goal",
  activity: "Add Activity",
};

// Each modal that is a simple form lists its fields here.
export const MODAL_FIELDS = {
  observation: [
    { name: "title", label: "Observation Name" },
    { name: "description", label: "Observation Details", multiline: true },
  ],
  summary: [
    { name: "summary", label: "Summary", multiline: true },
  ],
  plan: [
    { name: "frequency", label: "Frequency" },
    { name: "duration", label: "Duration" },
    { name: "diagnosis", label: "Diagnosis" },
    { name: "interventions", label: "Interventions", multiline: true },
  ],
  goal: [
    { name: "title", label: "Goal" },
    { name: "duration", label: "Duration" },
    { name: "baseline", label: "Baseline" },
    { name: "criteria", label: "Criteria" },
    { name: "description", label: "Full Description", multiline: true },
  ],
  activity: [
    { name: "title", label: "Activity Name" },
    { name: "frequency", label: "Frequency" },
    { name: "dosage", label: "Dosage", multiline: true },
    { name: "setup", label: "Setup", multiline: true },
  ],
};

export const initialPlan = {
  frequencyCount: 2,
  frequencyUnit: "week",
  durationCount: 12,
  durationUnit: "weeks",
  diagnosis: "Spastic diplegic cerebral palsy (ICD-10 code G80.1)",
  interventions:
    "<p>Neuromuscular re-education, functional strengthening, dynamic balance activities, therapeutic stretching, and caregiver training for a home exercise program (HEP).</p>",
};

// { title: "", duration: "", ... } for a blank "add" form
export const emptyValues = (type) =>
  Object.fromEntries(MODAL_FIELDS[type].map(({ name }) => [name, ""]));