import { useState } from "react";
import { STEPS, validators, StepContent, EXTRA_TABS } from "../AddPatientPage/steps/PatientSteps.jsx";
import { createPatient } from "../../data/patients.js";
import styles from "./Evaluate.module.css";
import PatientCard from "../../components/PatientCard/PatientCard.jsx";
import PhysiotherapyPage from "./taps/PhysiotherapyPage.jsx";

export default function EvalutePatientPage({
  form, set, onCancel, onFinish, onBack, extraKeys = [], initialTab = 0, subpage,
}) {
  const [tab, setTab] = useState(initialTab);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const tabNames = [...STEPS, ...extraKeys.map((k) => EXTRA_TABS[k].label)];
  const isExtra = tab >= STEPS.length;
  const activeExtraKey = isExtra ? extraKeys[tab - STEPS.length] : null;

  // save() stays exactly as it is
  const save = async () => {
    for (let i = 0; i < validators.length; i++) {
      const message = validators[i](form);   // fixed: call the validator
      if (message) {
        setTab(i);
        return setError(message);
      }
    }
    setError("");
    
    setSaving(true);
    try {
      await createPatient(form);
      onFinish?.();
    } catch {
      setError("Could not save the patient. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Evaluate Patient</h1>
      <PatientCard patient={{ ...form.main, birthDate: form.main.birthDate }} />

      <div className={styles.tabs} role="tablist">
        {tabNames.map((name, i) => (
          <button
            key={name}
            type="button"
            role="tab"
            aria-selected={tab === i}
            onClick={() => setTab(i)}
            className={styles.tab}
          >
            {name}
          </button>
        ))}
      </div>

      <fieldset className={styles.box} role="tabpanel">
        {subpage === "physiotherapy" ? (
          <PhysiotherapyPage onBack={onBack} />
        ) : isExtra
          ? EXTRA_TABS[activeExtraKey].render(form)
          : <StepContent index={tab} form={form} set={set} />}
        {!subpage && error && <p className={styles.error}>{error}</p>}
        {!subpage && activeExtraKey !== "evaluate" && (
          <div className={styles.buttons}>
            <button className={styles.cancel} onClick={onCancel} disabled={saving}>Send</button>
            {!isExtra && (
            <button className={styles.finish} onClick={save} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </button>
            )}
          </div>
        )}
      </fieldset>
    </div>
  );
}