import { useState } from "react";
import ModalShell, { Field } from "./ModalShell.jsx";
import styles from "./modalShared.module.css";

const range = (n) => Array.from({ length: n }, (_, i) => i + 1);

const PARENT_GOAL_PLACEHOLDER = "<long term goal>";

const TEMPLATE =
  "By [TIMEFRAME], the child will maintain [POSTURE] with a [CONDITION] for [DURATION] seconds [ASSISTANCE], in [SUCCESS_TRIALS] out of [TOTAL_TRIALS] trials.";

// Functional Skill options depend on the Functional Category
const CATEGORY_SKILLS = {
  "Gait & Ambulation": ["Independent Indoor Walking", "Walking on Uneven Surfaces", "Stair Climbing"],
  Balance: ["Static Standing Balance", "Dynamic Standing Balance"],
  Transfers: ["Sit-to-Stand", "Floor-to-Stand"],
};

// key = the [PLACEHOLDER] in the template. Rendered row by row in 2 columns.
const PARAMS = [
  { key: "POSTURE", label: "Posture", options: ["static standing balance", "sitting balance", "kneeling", "walking"] },
  { key: "CONDITION", label: "Condition", options: ["narrow base of support (feet together)", "wide base of support", "uneven surface"] },
  { key: "DURATION", label: "Duration", type: "number" },
  { key: "ASSISTANCE", label: "Assistance", options: ["independent without upper extremity support", "with minimal assistance", "with upper extremity support"] },
  { key: "SUCCESS_TRIALS", label: "Success Trials", options: range(10) },
  { key: "TOTAL_TRIALS", label: "Total Trials", options: range(10) },
  { key: "TIMEFRAME", label: "Timeframe", options: ["4 weeks", "6 weeks", "8 weeks", "12 weeks"] },
];

// Each parameter starts as its own key name (e.g. "TIMEFRAME"), meaning "not set yet".
// Number fields can't hold text, so they start empty and show the key as a placeholder.
const initialParams = () =>
  Object.fromEntries(
    PARAMS.map(({ key, type }) => [key, type === "number" ? "" : key]),
  );

/**
 * parentGoals: ["LTG 1: Independent Mobility ...", ...]
 * onSave({ title, parentGoal, parentIndex, category, skill, timeframe, description })
 */
export default function GoalModal({ parentGoals, onSave, onCancel }) {
  const [form, setForm] = useState({
    title: "Independent Mobility",
    parentGoal: PARENT_GOAL_PLACEHOLDER,
    category: "Gait & Ambulation",
    skill: CATEGORY_SKILLS["Gait & Ambulation"][0],
  });
  const [params, setParams] = useState(initialParams);

  const isSet = (key) => params[key] !== "" && params[key] !== key;

  const setField = (name, value) => setForm((current) => ({ ...current, [name]: value }));
  const setParam = (name, value) => setParams((current) => ({ ...current, [name]: value }));

  const buildDescription = () =>
    TEMPLATE.replace(/\[(\w+)\]/g, (_, key) => (isSet(key) ? params[key] : `[${key}]`));

  const save = () =>
    onSave({
      ...form,
      parentIndex: parentGoals.indexOf(form.parentGoal),
      timeframe: isSet("TIMEFRAME") ? params.TIMEFRAME : "",
      description: buildDescription(),
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
            setForm((current) => ({ ...current, category: value, skill: CATEGORY_SKILLS[value][0] }))
          }
        />
        <Field label="Title" value={form.title} onChange={(v) => setField("title", v)} />
        <Field
          label="Functional Skill"
          value={form.skill}
          options={CATEGORY_SKILLS[form.category]}
          onChange={(v) => setField("skill", v)}
        />
        <Field
          label="Parent Goal"
          value={form.parentGoal}
          options={[PARENT_GOAL_PLACEHOLDER, ...parentGoals]}
          onChange={(v) => setField("parentGoal", v)}
        />
      </div>

      <section>
        <h4 className={styles.sectionTitle}>Template:</h4>
        <div className={`${styles.box} ${styles.template}`}>{buildDescription()}</div>
      </section>

      <section>
        <h4 className={styles.sectionTitle}>Parameters:</h4>
        <div className={`${styles.box} ${styles.formGrid}`}>
          {PARAMS.map(({ key, label, options, type }) => (
            <Field
              key={key}
              label={label}
              value={params[key]}
              options={options ? [key, ...options] : undefined}
              type={type}
              placeholder={key}
              onChange={(value) => setParam(key, value)}
            />
          ))}
        </div>
      </section>
    </ModalShell>
  );
}