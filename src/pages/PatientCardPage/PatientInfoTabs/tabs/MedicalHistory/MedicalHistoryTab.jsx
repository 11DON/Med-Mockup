import { getMedicalHistory } from "../../../../../data/medicalHistory.js";
import { Section } from "../shared.jsx";
import styles from "../MedicalHistory/medicalHistory.module.css"


const CONDITIONS = [
  ["frequentColds", "Frequent Colds/Respiratory illness/lung conditions"],
  ["frequentStrep", "Frequent Strep throat/sore throat, Tonsil or adenoid removal"],
  ["hormonal", "Hormonal problem"],
  ["earInfections", "Frequent Ear Infections Loss/Ear disorder"],
  ["allergiesAsthma", "Allergies or asthma"],
  ["heart", "Heart condition"],
  ["anemia", "Anemia/blood disorder"],
  ["musculoskeletal", "Musculoskeletal disorders (Muscles, joint or bone)"],
  ["skin", "Skin disorder/skin problems (eczema)"],
  ["stomach", "Stomach disorder/stomach pain Vomiting/constipation"],
  ["communicable", "Any communicable diseases (CMV, MRSA, HIV, etc)"],
  ["headInjuries", "Head injuries or concussions"],
  ["kidney", "Kidney/Urinary problems/infections"],
  ["childhoodIllness", "Any major childhood illness (pox, croup, measles, mumps, meningitis, Fifth's disease, etc)"],
];

const LABS = [
  ["xray", "X-ray"], ["ctScan", "CT scan"], ["eeg", "EEG"], ["vep", "VEP"],
  ["cbc", "CBC"], ["fecal", "Fecal analysis"], ["mri", "MRI"], ["emgNcv", "EMG/NCV"],
  ["ctScanogram", "CT-scanogram"], ["abr", "ABR"], ["erg", "ERG"],
  ["genetic", "Genetic investigations"], ["urine", "Urine analysis"],
];

function CheckRow({ label, checked }) {
  return (
    <label className={styles.checkRow}>
      <span>{label} :</span>
      <input type="checkbox" checked={!!checked} readOnly disabled />
    </label>
  )
}


function Row({ label, value }) {
  return (
    <div className={styles.row}>
      <span className={styles.label}>{label}:</span>
      <div className={styles.box}>{value ?? ""}</div>
    </div>
  );
}


export default function MedicalHistoryTab({ patient }) {
  const h = getMedicalHistory(patient.patientId);
  if (!h) return <p>No medical history on file.</p>;

  const conditions = h.conditions ?? [];
  const surgeries = h.surgeries ?? [];
  const labs = h.labs ?? [];
  const disorders = h.associatedDisorders ?? { mentalRetardation: [], other: "" };

  return (
    <>
      <div className={styles.scroll}>
        {/* Medical Conditions */}
        <Section title="Medical Conditions">
          <div className={styles.grid}>
            {CONDITIONS.map(([key, label]) => (
              <CheckRow key={key} label={label} checked={conditions.includes(key)} />
            ))}
          </div>

        </Section>


        {/* Surgical History */}
        <Section title="Surgical History">
          {surgeries.length === 0 ? (
            <>
              <Row label="Name of the surgery" value="" />
              <Row label="Causes for the surgery" value="" />
            </>
          ) : (
            surgeries.map((s, i) => (
              <div key={i} className={styles.surgery}>
                <Row label="Name of the surgery" value={s.name} />
                <Row label="Causes for the surgery" value={s.cause} />
              </div>
            ))
          )}
        </Section>


        {/* Associate Disorders */}
        <Section title="Associate Disorders">
          <Row
            label="Mental Retardation"
            value={(disorders.mentalRetardation ?? []).join(", ")}
          />
          <Row label="Other" value={disorders.other} />
        </Section>


        {/* Labs & Investigations */}
        <Section title="Labs & Investigations" >
          <div className={styles.grid}>
            {LABS.map(([key, label]) => (
              <CheckRow key={key} label={label} checked={labs.includes(key)} />
            ))}
          </div>

        </Section>
      </div>
    </>
  );
}