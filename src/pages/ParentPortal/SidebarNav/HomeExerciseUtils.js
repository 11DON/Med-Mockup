const pad = (n) => String(n).padStart(2, "0");

// "Activity 1: Frog Jumps & Duck Walks" -> "Frog Jumps & Duck Walks"
export const shortTitle = (title) => title.replace(/^Activity \d+:\s*/, "");

// "2026-11-17" -> "17/11/2026"
export const formatDate = (key) => {
  const [y, m, d] = key.split("-");
  return `${d}/${m}/${y}`;
};

// local-time "YYYY-MM-DD" for the date input's default
export const todayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

// Which goal each activity belongs to (keyed by the short title)
const LTG1 = "LTG 1: Independent Mobility";
const LTG2 = "LTG 2: Goal-directed Transitions";
export const ACTIVITY_GOALS = {
  "Frog Jumps & Duck Walks": { ltg: LTG1, stg: "STG 1.1: Ankle Flexibility" },
  "Inside Marble Run": { ltg: LTG1, stg: "STG 1.1: Ankle Flexibility" },
  "Sitting & Standing Balance": { ltg: LTG1, stg: "STG 1.2: Static Standing Balance" },
  "Balloon Toy Sort": { ltg: LTG1, stg: "STG 1.2: Static Standing Balance" },
  "The Knight’s Treasure Hunt": { ltg: LTG2, stg: "STG 2.1: Transitional Strength" },
};
export const goalsFor = (title) => ACTIVITY_GOALS[title] ?? { ltg: "", stg: "" };

export const DIFFICULTY = [
  { id: "easy", emoji: "😄", label: "Easy" },
  { id: "medium", emoji: "😐", label: "Medium" },
  { id: "hard", emoji: "😓", label: "Hard" },
];