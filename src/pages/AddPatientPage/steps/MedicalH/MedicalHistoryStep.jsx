import Field from "../../Field";
import styles from "./MedicalHistory.module.css";

const CONDITIONS = [
  "Frequent Colds/Respiratory illness/lung conditions",
  "Frequent Strep throat/sore throat, Tonsil or adenoid removal",
  "Hormonal problem",
  "Frequent Ear Infections Loss/Ear disorder",
  "Allergies or asthma",
  "Heart condition",
  "Anemia/blood disorder",
  "Musculoskeletal disorders (Muscles, joint or bone)",
  "Skin disorder/skin problems (eczema)",
  "Stomach disorder/stomach pain Vomiting/constipation",
  "Any communicable diseases (CMV, MRSA, HIV, etc)",
  "Head injuries or concussions",
  "Kidney/Urinary problems/infections",
  "Any major childhood illness (pox, croup, measles, mumps, meningitis, Fifth's disease, etc)",
];

const LABS = ["X-ray", "CT scan", "EEG", "VEP", "CBC", "Fecal analysis", "MRI", "EMG/NCV",
  "CT-scanogram", "ABR", "ERG", "Genetic investigations", "Urine analysis"];

const DISORDERS = ["Vision", "Hearing", "Speech", "Convulsions"];

function CheckGroup({ items, checked, onToggle, className = "" }) {
  return (
    <div className={`${styles.checkGrid} ${className}`}>
      {items.map((item) => (
        <label key={item} className={styles.check}>
          <span>{item}</span>
          <input
            type="checkbox"
            checked={!!checked[item]}
            onChange={() => onToggle(item)}
          />
        </label>
      ))}
    </div>
  );
}

export default function MedicalHistoryStep({ value, onChange }) {
  const toggle = (group) => (item) =>
    onChange({ ...value, [group]: { ...value[group], [item]: !value[group][item] } });

  const updateSurgery = (i, e) =>
    onChange({
      ...value,
      surgeries: value.surgeries.map((s, idx) => (idx === i ? { ...s, [e.target.name]: e.target.value } : s)),
    });

  const addSurgery = () => onChange({ ...value, surgeries: [...value.surgeries, { name: "", cause: "" }] });

  const toggleDisorder = (d) =>
    onChange({
      ...value,
      disorders: value.disorders.includes(d) ? value.disorders.filter((x) => x !== d) : [...value.disorders, d],
    });

  const selectedDisorders = value.disorders.length ? value.disorders.join(", ") : "Select disorders";

  return (
    <div className={styles.form}>
      <fieldset className={`${styles.section} ${styles.conditionsSection}`}>
        <legend>Medical Conditions</legend>
        <CheckGroup
          items={CONDITIONS}
          checked={value.conditions}
          onToggle={toggle("conditions")}
        />
      </fieldset>

      <fieldset className={`${styles.section} ${styles.surgerySection}`}>
        <legend>Surgical History</legend>
        <div className={styles.surgeryList}>
          {value.surgeries.map((s, i) => (
            <div className={styles.surgery} key={i}>
              <Field label="Name of the surgery:" className={styles.surgeryField}>
                <input name="name" value={s.name} onChange={(e) => updateSurgery(i, e)} />
              </Field>
              <Field label="Causes for the surgery:" className={styles.surgeryField}>
                <input name="cause" value={s.cause} onChange={(e) => updateSurgery(i, e)} />
              </Field>
            </div>
          ))}
        </div>
        <button type="button" className={styles.link} onClick={addSurgery}>
          <span aria-hidden="true">+</span> Add Another Surgery
        </button>
      </fieldset>

      <fieldset className={`${styles.section} ${styles.disordersSection}`}>
        <legend>Associate Disorders</legend>
        <div className={styles.disordersGrid}>
          <Field label="Mental Retardation:" className={styles.disorderField}>
            <details className={styles.multiSelect}>
              <summary>{selectedDisorders}</summary>
              <div className={styles.disorderOptions}>
                {DISORDERS.map((disorder) => (
                  <label key={disorder}>
                    <input
                      type="checkbox"
                      checked={value.disorders.includes(disorder)}
                      onChange={() => toggleDisorder(disorder)}
                    />
                    {disorder}
                  </label>
                ))}
              </div>
            </details>
          </Field>
          <Field label="Other:" className={`${styles.disorderField} ${styles.otherField}`}>
            <input value={value.other} onChange={(e) => onChange({ ...value, other: e.target.value })} />
          </Field>
        </div>
      </fieldset>

      <fieldset className={`${styles.section} ${styles.labsSection}`}>
        <legend>Labs &amp; Investigations</legend>
        <CheckGroup items={LABS} checked={value.labs} onToggle={toggle("labs")} />
      </fieldset>
    </div>
  );
}
