import { useState } from "react";
import ModalShell, { Field } from "./ModalShell.jsx";
import styles from "./modalShared.module.css";

const CATEGORY_SKILLS = {
  "Gait & Ambulation": [
    "Independent Indoor Walking",
    "Walking on Uneven Surfaces",
    "Stair Climbing",
  ],
  Balance: ["Static Standing Balance", "Dynamic Standing Balance"],
  Transfers: ["Sit-to-Stand", "Floor-to-Stand"],
};

const PARAMETERS = [
  {
    key: "ASSISTANCE_LEVEL",
    label: "Assistance Level",
    options: ["independently", "with minimal assistance", "with moderate assistance"],
  },
  {
    key: "SURFACE_TYPE",
    label: "Surface Type",
    options: ["level indoor", "uneven", "outdoor"],
  },
  { key: "DISTANCE_VALUE", label: "Distance Value", type: "number" },
  { key: "DISTANCE_UNIT", label: "Distance Unit", options: ["feet", "meters"] },
  {
    key: "GAIT_PATTERN",
    label: "Gait Pattern",
    options: ["normalized heel-strike pattern", "reciprocal gait pattern", "step-to pattern"],
  },
  {
    key: "SAFETY_CRITERIA",
    label: "Safety Criteria",
    options: ["no falls", "no loss of balance", "with minimal assistance"],
  },
  {
    key: "SUCCESS_RATE",
    label: "Success Rate",
    options: ["2 consecutive", "3 consecutive", "4 consecutive", "5 consecutive"],
  },
  {
    key: "TIMEFRAME",
    label: "Timeframe",
    options: ["4 weeks", "6 weeks", "8 weeks", "12 weeks"],
  },
];

const TEMPLATE =
  "In [TIMEFRAME], Child will ambulate [ASSISTANCE_LEVEL] on [SURFACE_TYPE] surfaces for [DISTANCE_VALUE] [DISTANCE_UNIT] with a [GAIT_PATTERN] and [SAFETY_CRITERIA] in [SUCCESS_RATE] sessions.";

const fillTemplate = (template, params) =>
  template.replace(/\[(\w+)\]/g, (_, key) => params[key] ?? `[${key}]`);

export default function GoalsModalstg({ parentGoals, onSave, onCancel }) {
  const [form, setForm] = useState({
    title: "Independent Mobility",
    parentGoal: parentGoals[0] ?? "",
    category: "Gait & Ambulation",
    skill: CATEGORY_SKILLS["Gait & Ambulation"][0],
  });
  const [params, setParams] = useState({
    ASSISTANCE_LEVEL: "independently",
    SURFACE_TYPE: "level indoor",
    DISTANCE_VALUE: 30,
    DISTANCE_UNIT: "feet",
    GAIT_PATTERN: "normalized heel-strike pattern",
    SAFETY_CRITERIA: "no falls",
    SUCCESS_RATE: "3 consecutive",
    TIMEFRAME: "12 weeks",
  });
  const [changedParams, setChangedParams] = useState(() => new Set());

  const setField = (name, value) =>
    setForm((current) => ({ ...current, [name]: value }));
  const setParam = (name, value) => {
    setParams((current) => ({ ...current, [name]: value }));
    setChangedParams((current) => new Set(current).add(name));
  };
  const templatePreview = TEMPLATE.replace(/\[(\w+)\]/g, (_, key) =>
    changedParams.has(key) ? params[key] : `[${key}]`,
  );
  const save = () =>
    onSave({
      ...form,
      parentIndex: parentGoals.indexOf(form.parentGoal),
      timeframe: params.TIMEFRAME,
      description: fillTemplate(TEMPLATE, params),
    });

  return (
    <ModalShell
      title="Add New Goal"
      onCancel={onCancel}
      onSave={save}
      saveDisabled={!form.title.trim()}
    >
      <div className={`${styles.box} ${styles.formGrid}`}>
        <Field label="Therapy Area" value="Physiotherapy (PT)" disabled />
        <Field
          label="Functional Category"
          value={form.category}
          options={Object.keys(CATEGORY_SKILLS)}
          onChange={(value) =>
            setForm((current) => ({
              ...current,
              category: value,
              skill: CATEGORY_SKILLS[value][0],
            }))
          }
        />
        <Field label="Title" value={form.title} onChange={(value) => setField("title", value)} />
        <Field
          label="Functional Skill"
          value={form.skill}
          options={CATEGORY_SKILLS[form.category]}
          onChange={(value) => setField("skill", value)}
        />
        <Field
          label="Parent Goal"
          value={form.parentGoal}
          options={parentGoals}
          onChange={(value) => setField("parentGoal", value)}
        />
      </div>

      <section>
        <h4 className={styles.sectionTitle}>Template:</h4>
        <div className={`${styles.box} ${styles.template}`}>{templatePreview}</div>
      </section>

      <section>
        <h4 className={styles.sectionTitle}>Parameters:</h4>
        <div className={`${styles.box} ${styles.formGrid}`}>
          {PARAMETERS.map(({ key, label, options, type }) => (
            <Field
              key={key}
              label={label}
              value={params[key]}
              options={options}
              type={type}
              onChange={(value) => setParam(key, value)}
            />
          ))}
        </div>
      </section>
    </ModalShell>
  );
}