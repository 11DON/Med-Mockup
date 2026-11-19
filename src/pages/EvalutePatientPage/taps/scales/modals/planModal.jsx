import { useState } from "react";
import styles from "../modals/PlanModal.module.css";
import ReactQuill from "react-quill-new";

export const initialPlan = {
  frequencyCount: 2,
  frequencyUnit: "week",
  durationCount: 12,
  durationUnit: "weeks",
  diagnosis: "Spastic diplegic cerebral palsy (ICD-10 code G80.1)",
  interventions:
    "<p>Neuromuscular re-education, functional strengthening, dynamic balance activities, therapeutic stretching, and caregiver training for a home exercise program (HEP).</p>",
};

const modules = {
  toolbar: [
    ["bold", "italic", "underline"],
    [{ align: "" }, { align: "center" }, { align: "right" }],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ],
};

const range = (n) => Array.from({ length: n }, (_, i) => i + 1);

function Select({ value, onChange, options }) {
  return (
    <select className={styles.select} value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <option key={option} value={option} >{option}</option>
      ))}
    </select>
  )
}

export default function PlanModal({
  plan,
  onSave,
  onCancel,
  modalScale = 1,
}) {
  const [values, setValues] = useState(plan);
const set = (name, value) => setValues((current) => ({ ...current, [name]: value }));
  const modalClassNames = [
    styles.modal,
    modalScale !== 1 && styles.assessmentSize,
  ].filter(Boolean);
  const modalClassName = modalClassNames.join(" ");
const modalStyle =
  modalScale !== 1 ? { zoom: modalScale, "--font-scale": 1 } : undefined;
  return (
    <div className={styles.overlay}>
    <div className={styles.modal} style={modalStyle} role="dialog" aria-label="Edit Plan">        <header className={styles.header}>Edit Plan</header>

        <div className={styles.body}>
          <div className={styles.row}>
            <label>Frequency:</label>
            <Select
              value={values.frequencyCount}
              options={range(7)}
              onChange={(v) => set("frequencyCount", Number(v))}
            />
            <span>times per</span>
            <Select
              value={values.frequencyUnit}
              options={["day", "week", "month"]}
              onChange={(v) => set("frequencyUnit", v)}
            />
          </div>

          <div className={styles.row}>
            <label>Duration:</label>
            <Select
              value={values.durationCount}
              options={range(24)}
              onChange={(v) => set("durationCount", Number(v))}
            />
            <Select
              value={values.durationUnit}
              options={["weeks", "months"]}
              onChange={(v) => set("durationUnit", v)}
            />
          </div>

          <div className={styles.row}>
            <label>Diagnosis:</label>
            <div className={styles.search}>
              <input
                value={values.diagnosis}
                onChange={(e) => set("diagnosis", e.target.value)}
              />
              <span aria-hidden="true">🔍</span>
            </div>
          </div>

          <label className={styles.editorLabel}>Interventions</label>
          <ReactQuill
            className={styles.editor}
            theme="snow"
            modules={modules}
            value={values.interventions}
            onChange={(html) => set("interventions", html)}
          />
        </div>

        <footer className={styles.footer}>
          <button type="button" className={styles.cancel} onClick={onCancel}>Cancel</button>
          <button type="button" className={styles.save} onClick={() => onSave(values)}>Save</button>
        </footer>
      </div>
    </div>
  )
}