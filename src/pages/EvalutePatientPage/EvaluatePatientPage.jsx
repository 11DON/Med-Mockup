import { useState } from "react";
import { STEPS, validators, StepContent, EXTRA_TABS } from "../AddPatientPage/steps/PatientSteps.jsx";
import { createPatient } from "../../data/patients.js";
import styles from "./Evaluate.module.css";
import PatientCard from "../../components/PatientCard/PatientCard.jsx";

export default function EvalutePatientPage({
  form, set, onCancel, onFinish, onNavigateTab, assessmentPage, extraKeys = [], initialTab = 0,
}) {
  const [stepSelection, setStepSelection] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const tab = stepSelection?.baseTab === initialTab
    ? stepSelection.index
    : initialTab;
  const tabNames = [...STEPS, ...extraKeys.map((k) => EXTRA_TABS[k].label)];
  const isExtra = tab >= STEPS.length;
  const activeExtraKey = isExtra ? extraKeys[tab - STEPS.length] : null;
  const selectTab = (index) => {
    if (index >= STEPS.length) {
      setStepSelection(null);
      onNavigateTab?.(extraKeys[index - STEPS.length]);
    } else {
      setStepSelection({ baseTab: initialTab, index });
    }
  };

  // save() stays exactly as it is
  const save = async () => {
    for (let i = 0; i < validators.length; i++) {
      const message = validators[i](form);   // fixed: call the validator
      if (message) {
        setStepSelection({ baseTab: initialTab, index: i });
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
            onClick={() => selectTab(i)}
            className={styles.tab}
          >
            {name}
          </button>
        ))}
      </div>

      <fieldset className={styles.box} role="tabpanel">
        {isExtra
          ? EXTRA_TABS[activeExtraKey].render(form, assessmentPage)
          : <StepContent index={tab} form={form} set={set} />}
        {!isExtra && error && <p className={styles.error}>{error}</p>}
        {activeExtraKey !== "evaluate" &&
          activeExtraKey !== "physiotherapy" &&
          activeExtraKey !== "tasks" && (
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