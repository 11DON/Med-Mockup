import styles from "./PatientHistory.module.css";
import { getPatientHistory } from "../../../../../data/patientHistory.js";
import { CheckEntry } from "../shared.jsx";
function TextEntry({ label, value, multiline = false }) {
  const isNumeric = typeof value === "number";

  return (
    <div className={`${styles.entry} ${multiline ? styles.multilineEntry : ""}`}>
      <span className={styles.label}>{label}</span>
      <div className={`${styles.value} ${multiline ? styles.multiline : ""} ${isNumeric ? styles.numericValue : ""}`}>
        {value ?? "-"}
      </div>
    </div>
  );
}



export default function PatientHistoryTab({ patient }) {
  const history = getPatientHistory(patient.patientId);
  if (!history) return <p>No history on file.</p>;

  const { baseSituation, familyHistory, obstetric, postnatal } = history;

  return (
    <div className={styles.history}>
      <fieldset className={`${styles.section} ${styles.baseSituation}`}>
        <legend>Base Situation</legend>
        <TextEntry label="Reason of referral:" value={baseSituation.reasonOfReferral} multiline />
        <TextEntry label="Chief Complaint:" value={baseSituation.chiefComplaint} multiline />
        <TextEntry label="History:" value={baseSituation.history} multiline />
      </fieldset>

      <fieldset className={styles.section}>
        <legend>Family History</legend>
        <div className={styles.familyGrid}>
          <CheckEntry className={styles.checkEntry} labelClassName={styles.label} label="Consanguinity:" checked={familyHistory.consanguinity} />
          <TextEntry label="Heredofamilial Disease:" value={familyHistory.heredofamilialDisease} multiline />
            <TextEntry label="Number of siblings:" value={familyHistory.siblings} />
            <TextEntry label="Order of the patient:" value={familyHistory.patientOrder} />
            <CheckEntry className={styles.checkEntry} labelClassName={styles.label} label="Similar Conditions:" checked={familyHistory.similarConditions} /></div>

      </fieldset>

      <fieldset className={styles.section}>
        <legend>Obstetric History</legend>
        <div className={styles.birthHistoryGrid}>
          <TextEntry label="Prenatal:" value={obstetric.prenatal} multiline />
          <TextEntry label="Perinatal:" value={obstetric.perinatal} multiline />
          <CheckEntry className={styles.checkEntry} labelClassName={styles.label} label="Type of Labor (Is Cesarean):" checked={obstetric.isCesarean} />

          <TextEntry label="Assistance:" value={obstetric.assistance} />
          <TextEntry label="Type of presentation:" value={obstetric.presentationType} />
          <TextEntry label="Reason:" value={obstetric.cesareanReason} />
          <TextEntry label="Duration of labor:" value={obstetric.laborDuration} />
          <TextEntry label="Time of delivery:" value={obstetric.deliveryTime} />
          <TextEntry label="Week of delivery:" value={obstetric.deliveryWeek} />
          <TextEntry label="Birth Weight:" value={obstetric.birthWeight} />
        </div>
      </fieldset>

      <fieldset className={styles.section}>
        <legend>Postnatal</legend>
        <div className={styles.postnatalGrid}>
          <CheckEntry className={styles.checkEntry} labelClassName={styles.label} label="Hospitalization:" checked={postnatal.hospitalization} />
          <TextEntry label="Duration:" value={postnatal.hospitalizationDuration} />
          <CheckEntry className={styles.checkEntry} labelClassName={styles.label} label="Convulsions:" checked={postnatal.convulsions} />
          <CheckEntry className={styles.checkEntry} labelClassName={styles.label} label="Is Controlled:" checked={postnatal.convulsionsControlled} />
          <TextEntry label="Other Conditions:" value={postnatal.otherConditions} />
        </div>
      </fieldset>
    </div>
  );
}
