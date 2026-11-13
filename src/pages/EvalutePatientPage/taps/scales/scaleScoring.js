export const gmfmDimensions = [
  {
    id: "lying",
    title: "Dimension A: Lying and Rolling",
    items: [
      ["1", "SUPINE: Turns head with limbs symmetrical"],
      ["2", "SUPINE: Brings hands to midline, fingers interlocked"],
      ["3", "SUPINE: Lifts head 45°"],
      ["4", "SUPINE: Flexes right hip and knee through full range of motion"],
    ],
  },
  {
    id: "sitting",
    title: "Dimension B: Sitting",
    items: [
      ["18", "SUPINE: Hands pulled by therapist to sit, maintains head control"],
      ["19", "SUPINE: Rolls to right side, transitions into sitting position"],
      ["20", "SUPINE: Rolls to left side, transitions into sitting position"],
      ["21", "SITTING ON MAT: Supported by therapist at thorax, holds head upright for 3 seconds"],
    ],
  },
  {
    id: "crawling",
    title: "Dimension C: Crawling and Kneeling",
    items: [
      ["38", "PRONE: Creeps forward 1.8 meters (6 feet) on stomach"],
      ["39", "FOUR-POINT STANCE: Weight bears on hands and knees for 5 seconds"],
      ["40", "FOUR-POINT STANCE: Transitions to sitting on mat without hand support"],
      ["41", "PRONE: Transitions into four-point stance, weight bears on hands and knees"],
    ],
  },
];

export const gmfmRatings = [
  ["0", "Does Not Initiate"],
  ["1", "Initiate"],
  ["2", "Partially Completes"],
  ["3", "Fully Completes"],
];

export const masMuscles = [
  "Hip adductors",
  "Hamstrings",
  "Quadriceps",
  "Ankle plantar flexors",
];

export const masRatings = [
  ["0", "No increase in muscle tone", 0],
  ["1", "Slight increase; catch and release", 1],
  ["1+", "Slight increase; catch followed by minimal resistance", 1.5],
  ["2", "More marked increase through most of range", 2],
  ["3", "Considerable increase; passive movement difficult", 3],
  ["4", "Affected part rigid in flexion or extension", 4],
];

export const romSections = [
  {
    id: "cervical",
    title: "Cervical Spine (Neck)",
    movements: [
      { id: "neck-flexion", label: "Neck Flexion", value: "45" },
      { id: "neck-extension", label: "Neck Extension", value: "50" },
      { id: "neck-lateral-left", label: "Neck Lateral Flexion (Left)", value: "40" },
      { id: "neck-lateral-right", label: "Neck Lateral Flexion (Right)", value: "42" },
    ],
  },
  {
    id: "upper",
    title: "Upper Extremities",
    movements: [
      { id: "shoulder-flexion-left", label: "Shoulder Flexion (Left)", value: "170" },
      { id: "shoulder-flexion-right", label: "Shoulder Flexion (Right)", value: "160" },
      { id: "shoulder-extension-left", label: "Shoulder Extension (Left)", value: "50" },
      { id: "shoulder-extension-right", label: "Shoulder Extension (Right)", value: "50" },
    ],
  },
  {
    id: "lower",
    title: "Lower Extremities",
    movements: [
      { id: "hip-flexion-left", label: "Hip Flexion (Left)", value: "125" },
      { id: "hip-flexion-right", label: "Hip Flexion (Right)", value: "125" },
      { id: "hip-extension-left", label: "Hip Extension (Left)", value: "15" },
      { id: "hip-extension-right", label: "Hip Extension (Right)", value: "15" },
    ],
  },
];

export const pdmsSubtests = [
  "Reflexes",
  "Stationary",
  "Locomotion",
  "Object Manipulation",
  "Grasping",
  "Visual-Motor Integration",
];

export function getInitialScaleAnswers(scaleId) {
  if (scaleId === "gmfm") {
    return Object.fromEntries(
      gmfmDimensions.flatMap((dimension) =>
        dimension.items.map(([number]) => [`gmfm-${number}`, "0"]),
      ),
    );
  }
  if (scaleId === "mas") {
    return Object.fromEntries(masMuscles.map((_, index) => [`mas-${index}`, "0"]));
  }
  if (scaleId === "rom") {
    return Object.fromEntries(
      romSections.flatMap((section) =>
        section.movements.map((movement) => [`rom-${movement.id}`, movement.value]),
      ),
    );
  }
  if (scaleId === "pdms") {
    return Object.fromEntries(pdmsSubtests.map((_, index) => [`pdms-${index}`, "0"]));
  }
  return {};
}

export function calculateScaleScore(scaleId, answers = {}) {
  if (scaleId === "gmfm") {
    const dimensions = gmfmDimensions.map((dimension) => ({
      id: dimension.id,
      title: dimension.title,
      score: dimension.items.reduce(
        (sum, [number]) => sum + Number(answers[`gmfm-${number}`] ?? 0),
        0,
      ),
    }));
    return {
      label: `Raw item score: ${dimensions.reduce((sum, dimension) => sum + dimension.score, 0)}/${dimensions.length * 12}`,
      dimensions,
    };
  }

  if (scaleId === "mas") {
    const rawScore = masMuscles.reduce(
      (sum, _, index) => sum + Number(answers[`mas-${index}`] ?? 0),
      0,
    );
    return { label: `Raw sum: ${Number.isInteger(rawScore) ? rawScore : rawScore.toFixed(1)}` };
  }

  if (scaleId === "rom") {
    const movementCount = romSections.reduce(
      (count, section) => count + section.movements.length,
      0,
    );
    const recordedCount = romSections.reduce(
      (count, section) => count + section.movements.filter(
        (movement) => answers[`rom-${movement.id}`] !== "",
      ).length,
      0,
    );
    return { label: `Movements recorded: ${recordedCount}/${movementCount}` };
  }

  if (scaleId === "pdms") {
    const rawTotal = pdmsSubtests.reduce((sum, _, index) => {
      const score = Number(answers[`pdms-${index}`] || 0);
      return sum + (Number.isFinite(score) ? score : 0);
    }, 0);
    return { label: `Raw subtest total: ${rawTotal}` };
  }

  return { label: "Not assessed" };
}
