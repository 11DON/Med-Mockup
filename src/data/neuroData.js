// Initial data shown in the Neuro-Musculoskeletal Module screenshot.

export const scaleCards = [
  {
    id: "mas",
    title: "Modified Ashworth Scale (MAS)",
    score: "Score: 3",
    description:
      "Considerable increase in muscle tone; passive movement difficult.",
  },
  {
    id: "gmfm",
    title: "Gross Motor Function Measure-66 (GMFM-66)",
    score: "Score: 26",
    description: "Percent: 18%",
  },
  {
    id: "pdms",
    title: "Peabody Developmental Motor Scales (PDMS-2)",
    score: "Score: 20",
    description: "Poor - Standard clinical delay",
  },
];

export const scaleOptions = [
  {
    id: "mas",
    title: "Modified Ashworth Scale (MAS)",
    description:
      "A clinical tool used to measure increased muscle tone and spasticity (velocity-dependent resistance to passive stretch) in patients with upper motor neuron lesions.",
  },
  {
    id: "gmfm",
    title: "Gross Motor Function Measure-66 (GMFM-66)",
    description:
      "A standardized observational clinical tool designed to measure changes in gross motor function over time in children with cerebral palsy (typically aged 5 months to 16 years).",
  },
  {
    id: "pdms",
    title: "Peabody Developmental Motor Scales (PDMS-2)",
    description:
      "A standardized assessment tool used to evaluate the gross and fine motor development of children from birth through 5 years of age (0 to 71 months).",
  },
];

export const initialSummary =
  "Jana is a 6-year-old female with a diagnosis of spastic cerebral palsy. She presents with decreased lower-extremity range of motion, increased muscle tone, and reduced postural control, which impact her ability to stand, walk, and participate independently in daily activities. Physical therapy is recommended to address mobility, flexibility, balance, and functional strength through a play-based program.";

export const initialPlan = {
  frequencyCount: 2,
  frequencyUnit: "week",
  durationCount: 12,
  durationUnit: "weeks",
  diagnosis: "Spastic diplegic cerebral palsy (ICD-10 code G80.1)",
  interventions:
    "<p>Neuromuscular re-education, functional strengthening, dynamic balance activities, therapeutic stretching, and caregiver training for a home exercise program (HEP).</p>",
};

export const initialObservations = [
  {
    title: "Systems Review",
    points: [
      "Neuromuscular: impaired, hypotonic presentation and bilateral weakness.",
      "Musculoskeletal: impaired. Decreased range of motion at bilateral ankles.",
      "Cardiopulmonary: no relevant abnormalities noted.",
      "Integumentary: skin intact, no redness or pressure areas.",
    ],
  },
  {
    title: "Range of Motion (ROM) & Joint Integrity",
    points: [
      "Hip flexion: actively limited to 100° (right) and 105° (left).",
      "Knee extension: actively limited to -10° with bilateral hamstring tightness.",
      "Ankle dorsiflexion: (-5°) (right), neutral (left), with knee extended.",
    ],
  },
  {
    title: "Muscle Tone & Spasticity",
    points: [
      "Hip adductors: Modified Ashworth Scale 1+ (right), 1 (left).",
      "Knee flexors: Modified Ashworth Scale 1 bilaterally.",
      "Ankle plantar flexors: Modified Ashworth Scale 2 bilaterally.",
    ],
  },
];

const defaultGoalDetails = [
  "Duration: 12 weeks.",
  "Baseline: walks with assistance and needs support on uneven surfaces.",
  "Criteria: walk across 30 centimeters of uneven surface with a normalized heel-toe pattern.",
  "Full Description: Jana will demonstrate independent functional mobility for 30 feet with minimal assistance and no falls in 3 consecutive sessions.",
];

export const initialGoals = [
  {
    title: "LTG 1: Independent Mobility (Target: 12 Weeks)",
    children: [
      "STG 1.1: Active Flexibility (Target: 4 Weeks)",
      "Task A: Ankle Mobility Walks",
      "Task B: Incline Board Play",
      "STG 1.2: Static Standing Balance (Target: 6 Weeks)",
      "Task A: Balloon Tap",
      "Task B: High-Low Toy Sorting",
    ],
    details: defaultGoalDetails,
  },
  {
    title: "LTG 2: Goal-directed Transitions (Target: 12 Weeks)",
    children: [
      "STG 2.1: Transitional Strength (Target: 6 Weeks)",
      "Task A: Sit-to-Stand Treasure Hunt",
      "Task B: Bench Push-to-Stand",
    ],
    details: defaultGoalDetails,
  },
];

export const taskCatalog = [
  {
    id: "knight",
    title: "Knight Treasure Hunt",
    description:
      "A gamified multi-step obstacle course where the patient follows sequential clues to locate hidden tokens while maintaining stability over uneven surfaces.",
  },
  {
    id: "bench",
    title: "Bench Push-to-Stand",
    description:
      "The patient transitions from a seated position on a backless bench to a fully upright standing position, using their upper extremities on the bench for initial leverage.",
  },
  {
    id: "balloon",
    title: "Balloon Tap",
    description:
      "The patient uses their hands, feet, or an implement to repeatedly tap a balloon into the air, preventing it from touching the ground.",
  },
  {
    id: "toys",
    title: "High-Low Toy Sorting",
    description:
      "The patient categorizes and places objects onto shelves or targets placed at alternating high and low vertical planes.",
  },
];

const defaultActivityDetails = {
  frequency: "2 to 3 times weekly, 15–20 minutes total.",
  dosage: "2 sets of 5 jumps across the living room rug.",
  safetyReminder:
    "Always stay within arm’s reach during standing activities to prevent unintentional falls.",
  setup:
    "Make a safe hopscotch area. Lead the fun when she loses her balance and give clear, simple cues.",
};

export const initialActivities = [
  "Activity 1: Frog Jumps & Duck Walks",
  "Activity 2: Inside Marble Run",
  "Activity 3: Sitting & Standing Balance",
  "Activity 4: Balloon Toy Sort",
  "Activity 5: The Knight’s Treasure Hunt",
].map((title) => ({ title, ...defaultActivityDetails }));

export const suggestedActivities = [
    {
    id: "frog",
    title: "Activity 1: Frog Jumps & Duck Walks",
    frequency: "1x Daily (approx. 15–20 minutes total).",
    dosage: "2 sets of 5 jumps across the living room rug.",
    safetyReminder:
      "Always stay within arm's reach of Liam during standing activities to prevent unassisted falls.",
    parentTip:
      "Make sure her heels aren't lifting off the floor when she drops down into the squat!",
    howTo:
      "Have Jana crouch down low to the floor like a frog. Encourage her to keep her feet flat on the floor as she bends his knees. Ask her to jump forward to catch a toy. Alternatively, have her waddle like a duck keeping her heels as close to the floor as possible.",
      
  },
  {
    id: "marble",
    title: "Incline Marble Run",
    description:
      "The patient stands on an incline board while guiding marbles through a track to stretch the ankles.",
  },
];
