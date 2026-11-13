import { useState } from "react";
import ModalShell, { Control, CheckCard } from "./ModalShell.jsx";
import styles from "./modalShared.module.css";

const range = (n) => Array.from({ length: n }, (_, i) => i + 1);

/**
 * goalTitle:   "STG 1.1: Ankle Flexibility"
 * suggestions: [{ id, title, description }]
 * onSave(activities)  ->  [{ title, frequency, dosage, setup }]  one per ticked suggestion
 */
export default function ActivityModal({ goalTitle, suggestions, onSave, onCancel }) {
  const [checked, setChecked] = useState([]);
  const [values, setValues] = useState({
    freqCount: 1,
    freqUnit: "day",
    durCount: "20",
    durUnit: "minutes",
    dosage: "",
  });

  const set = (name, value) => setValues((current) => ({ ...current, [name]: value }));
  const toggle = (id) =>
    setChecked((current) =>
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id],
    );

  const save = () =>
    onSave(
      suggestions
        .filter((s) => checked.includes(s.id))
        .map((s) => ({
          title: s.title,
          frequency: `${values.freqCount} times per ${values.freqUnit}, ${values.durCount} ${values.durUnit} total.`,
          dosage: values.dosage,
          setup: s.description,
        })),
    );

  return (
    <ModalShell
      title="Add Activity"
      onCancel={onCancel}
      onSave={save}
      saveDisabled={checked.length === 0}
    >
      <h3 className={styles.subtitle}>{goalTitle}</h3>

      <div className={styles.twoPane}>
        <section>
          <h4 className={styles.sectionTitle}>Suggested Activities</h4>
          <div className={`${styles.box} ${styles.list}`}>
            {suggestions.map((item) => (
              <CheckCard
                key={item.id}
                item={item}
                checked={checked.includes(item.id)}
                onToggle={() => toggle(item.id)}
              />
            ))}
          </div>
        </section>

        <section>
          <h4 className={styles.sectionTitle}>Parameters</h4>
          <div className={`${styles.box} ${styles.params}`}>
            <div className={styles.inlineRow}>
              <span>Frequency:</span>
              <Control value={values.freqCount} options={range(7)} onChange={(v) => set("freqCount", v)} />
              <span>times per</span>
              <Control value={values.freqUnit} options={["day", "week", "month"]} onChange={(v) => set("freqUnit", v)} />
            </div>

            <div className={styles.inlineRow}>
              <span>Duration:</span>
              <Control type="number" value={values.durCount} onChange={(v) => set("durCount", v)} />
              <Control value={values.durUnit} options={["minutes", "hours"]} onChange={(v) => set("durUnit", v)} />
            </div>

            <div className={styles.inlineRow}>
              <span>Dosage:</span>
              <Control className={styles.grow} value={values.dosage} onChange={(v) => set("dosage", v)} />
            </div>
          </div>
        </section>
      </div>
    </ModalShell>
  );
}