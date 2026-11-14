import styles from "../AddPatientPage/AddPatientPage.module.css"
import { emptyGuardian } from "./steps/Guardians/GuardiansStep.jsx";
import { useState,Fragment  } from "react";
import { MoveRight } from "lucide-react";
import { STEPS, validators, StepContent } from "./steps/PatientSteps.jsx";
import EvalutePatientPage from "../EvalutePatientPage/EvaluatePatientPage.jsx";

// The Steps in the wizard
// Empty form to start the wizard with
export const initialForm = {
  main: {
    nameEn: "", nameAr: "", nationality: "Egypt", nationalId: "",
    birthdate: "", gender: "", country: "Egypt", governorate: "",
    area: "", school: "", grade: "",
  },
  guardians: [emptyGuardian],
  history: {
    baseSituation: { reasonOfReferral: "", chiefComplaint: "", history: "" },
    familyHistory: {
      consanguinity: false,
      heredofamilialDisease: "",
      siblings: "",
      patientOrder: "",
      similarConditions: false,
    },
    obstetric: {
      prenatal: "",
      perinatal: "",
      isCesarean: false,
      assistance: "",
      presentationType: "",
      cesareanReason: "",
      laborDuration: "",
      deliveryTime: "",
      deliveryWeek: "",
      birthWeight: "",
    },
    postnatal: {
      hospitalization: false,
      hospitalizationDuration: "",
      convulsions: false,
      convulsionsControlled: false,
      otherConditions: "",
    },
  },
  medical: { conditions: {}, labs: {}, surgeries: [{ name: "", cause: "" }], disorders: [], other: "" },
  iep: [],
};



export default function AddPatientPage({ onCancel, onFinish }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [reviewing, setReviewing] = useState(false);


  const isLast = step === STEPS.length - 1;
  // Returns a function that updates only the specified section of the form.
  const set = (key) => (val) => setForm((prev) => ({ ...prev, [key]: val }));


  // Validates the current step, navigates to the next step, and saves the patient on the final step.
  const next = async () => {
    const message = validators[step](form);
    if (message) return setError(message);
    setError("");

    if (!isLast) return setStep(step + 1);

    setReviewing(true)
  };


  const previous = () => {
    setError("");
    setStep(step - 1);
  };
// Last step done: hand the form over to the Evaluate page
  if (reviewing){
    return <EvalutePatientPage form ={form} set={set} onCancel={onCancel} onFinish={onFinish}/>
  }
  return (
    <>
    <div className={styles.page}>
      <h1 className={styles.title}>Add New Patient</h1>

<ol className={styles.stepper}>
  {STEPS.map((name, i) => (
    <Fragment key={name}>
      <li className={i === step ? styles.active : i < step ? styles.done : ""}>
        <span className={styles.circle}>
          {i < step && <span className={styles.tickDis}>✓</span>}
          {i === step && <span className={styles.tick}>✓</span>}
        </span>
        {name}
      </li>

      {i < STEPS.length - 1 && (
        <li className={styles.arrow} aria-hidden="true">
          <MoveRight size={64} strokeWidth={1.5} />
        </li>
      )}
    </Fragment>
  ))}
</ol>

      <fieldset className={styles.box}>
        <legend>Step {step + 1}: {STEPS[step]}</legend>

        <StepContent index={step} form={form} set={set} />

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={onCancel}>Cancel</button>
          <button className={styles.previous} onClick={previous} disabled={step === 0}>Previous</button>
          <button className={isLast ? styles.finish : styles.next} onClick={next}>
            {isLast ? "Finish" : "Next"}
          </button>
        </div>
      </fieldset>
    </div>
    </>
  )
}