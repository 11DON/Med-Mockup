import { useState } from "react";
import { STEPS, validators, StepContent } from "../AddPatientPage/steps/PatientSteps.jsx"
import { createPatient } from "../../data/TaskList/patients.js";
import { div } from "motion/react-client";
import styles from "../AddPatientPage/AddPatientPage.module.css";
import PatientCard from "../../components/PatientCard/PatientCard.jsx"

export default function EvalutePatientPage({ form, set, onCancel, onFinish }) {
    const [tab, setTab] = useState(0);
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    const save = async () => {
        for (let i = 0; i < validators.length; i++) {
            const message = validators[i][form];
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
        } catch (err) {
            setError("Could not save the patient. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Evaluate Patient</h1>
            <div>
                <PatientCard patient={{ ...form.main, birthDate: form.main.birthDate }} />
            </div>
            <div className={styles.tabs}>
                {STEPS.map((name, i) => (
                    <button key={name} onClick={() => setTab(i)} className={styles.tab} >
                        {name}
                    </button>
                ))}
            </div>
            <fieldset className={styles.box}>
                <StepContent index={tab} form={form} set={set} />
                {error && <p className={styles.error}>{error}</p>}
                <div className={styles.buttons}>
                    <button className={styles.cancel} onClick={onCancel} disabled={saving}>Cancel</button>
                    <button className={styles.finish} onClick={save} disabled={saving}>
                        {saving ? "Saving..." : "Save"}
                    </button>
                </div>
            </fieldset>
        </div>
    )
}