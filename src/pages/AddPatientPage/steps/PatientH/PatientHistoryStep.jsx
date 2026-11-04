import Field from "../../Field";
import styles from "./PatientHistoryStep.module.css";

function updateGroup(value, onChange, group, name, nextValue) {
  onChange({
    ...value,
    [group]: { ...value[group], [name]: nextValue },
  });
}

function TextAreaField({ label, value, onChange, className = "" }) {
  return (
    <Field
      label={label}
      className={`${styles.historyField} ${className}`}
      labelClassName={styles.historyLabel}
    >
      <textarea value={value ?? ""} onChange={(event) => onChange(event.target.value)} />
    </Field>
  );
}

function NumberField({ label, value, onChange }) {
  return (
    <Field label={label} className={styles.compactField} labelClassName={styles.compactLabel}>
      <input
        type="number"
        min="0"
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        
      />
    </Field>
  );
}

function CheckField({ label, checked, onChange }) {
  return (
    <label className={styles.checkField}>
      <span>{label}</span>
      <input type="checkbox" checked={!!checked} onChange={onChange} />
    </label>
  );
}

export default function PatientHistoryStep({ value, onChange }) {
  const { baseSituation = {}, familyHistory = {}, obstetric = {}, postnatal = {} } = value;
  const set = (group) => (name) => (nextValue) =>
    updateGroup(value, onChange, group, name, nextValue);
  const toggle = (group, name) => (event) =>
    updateGroup(value, onChange, group, name, event.target.checked);
  const updateText = (group, name) => (event) =>
    updateGroup(value, onChange, group, name, event.target.value);

  return (
    <div className={styles.historyForm}>
      <fieldset className={`${styles.section} ${styles.baseSituation}`}>
        <legend>Present History</legend>
        <TextAreaField
          label="Reason of referral:"
          value={baseSituation.reasonOfReferral}
          onChange={set("baseSituation")("reasonOfReferral")}
        />
        <TextAreaField
          label="Chief Complaint:"
          value={baseSituation.chiefComplaint}
          onChange={set("baseSituation")("chiefComplaint")}
        />
        <TextAreaField
          label="History:"
          value={baseSituation.history}
          onChange={set("baseSituation")("history")}
        />
      </fieldset>

      <fieldset className={`${styles.section} ${styles.familyHistory}`}>
        <legend>Family History</legend>
        <div className={styles.familyGrid}>
          <CheckField
            label="Consanguinity:"
            checked={familyHistory.consanguinity}
            onChange={toggle("familyHistory", "consanguinity")}
          />
          <TextAreaField
            label="Heredofamilial Disease:"
            value={familyHistory.heredofamilialDisease}
            onChange={set("familyHistory")("heredofamilialDisease")}
            className={styles.familyDisease}
          />
          <NumberField
            label="Number of siblings:"
            value={familyHistory.siblings}
            onChange={set("familyHistory")("siblings")}
          />
          <NumberField
            label="Order of the patient:"
            value={familyHistory.patientOrder}
            onChange={set("familyHistory")("patientOrder")}
          />
          <CheckField
            label="Similar Conditions:"
            checked={familyHistory.similarConditions}
            onChange={toggle("familyHistory", "similarConditions")}
          />
        </div>
      </fieldset>

      <fieldset className={styles.section}>
        <legend>Obstetric History</legend>
        <div className={styles.obstetricGrid}>
          <TextAreaField
            label="Prenatal:"
            value={obstetric.prenatal}
            onChange={set("obstetric")("prenatal")}
          />
          <TextAreaField
            label="Perinatal:"
            value={obstetric.perinatal}
            onChange={set("obstetric")("perinatal")}
          />
          <CheckField
            label="Type of Labor (Is Cesarean):"
            checked={obstetric.isCesarean}
            onChange={toggle("obstetric", "isCesarean")}
          />
          <Field label="Assistance:" className={styles.compactField} labelClassName={styles.compactLabel}>
            <select value={obstetric.assistance ?? ""} onChange={updateText("obstetric", "assistance")}>
              <option value="">Select...</option>
              <option>None</option>
              <option>Forceps/Vacuum</option>
            </select>
          </Field>
          <Field label="Type of presentation:" className={styles.compactField} labelClassName={styles.compactLabel}>
            <select value={obstetric.presentationType ?? ""} onChange={updateText("obstetric", "presentationType")}>
              <option value="">Select...</option>
              <option>Head</option>
              <option>Breech</option>
              <option>Other</option>
            </select>
          </Field>
          <Field label="Reason:" className={styles.compactField} labelClassName={styles.compactLabel}>
            <input value={obstetric.cesareanReason ?? ""} onChange={updateText("obstetric", "cesareanReason")} />
          </Field>
          <NumberField
            label="Duration of labor:"
            value={obstetric.laborDuration}
            onChange={set("obstetric")("laborDuration")}
          />
          <Field label="Time of delivery:" className={styles.compactField} labelClassName={styles.compactLabel}>
            <select value={obstetric.deliveryTime ?? ""} onChange={updateText("obstetric", "deliveryTime")}>
              <option value="">Select...</option>
              <option>Preterm</option>
              <option>Term</option>
            </select>
          </Field>
          <NumberField
            label="Week of delivery:"
            value={obstetric.deliveryWeek}
            onChange={set("obstetric")("deliveryWeek")}
          />
          <NumberField
            label="Birth Weight:"
            value={obstetric.birthWeight}
            onChange={set("obstetric")("birthWeight")}
          />
        </div>
      </fieldset>

      <fieldset className={styles.section}>
        <legend>Postnatal</legend>
        <div className={styles.postnatalGrid}>
          <CheckField
            label="Hospitalization:"
            checked={postnatal.hospitalization}
            onChange={toggle("postnatal", "hospitalization")}
          />
          <NumberField
            label="Duration:"
            value={postnatal.hospitalizationDuration}
            onChange={set("postnatal")("hospitalizationDuration")}
          />
          <CheckField
            label="Convulsions:"
            checked={postnatal.convulsions}
            onChange={toggle("postnatal", "convulsions")}
          />
          <CheckField
            label="Is Controlled:"
            checked={postnatal.convulsionsControlled}
            onChange={toggle("postnatal", "convulsionsControlled")}
          />
          <Field
            label="Other Conditions:"
            className={styles.otherConditions}
            labelClassName={styles.compactLabel}
          >
            <input value={postnatal.otherConditions ?? ""} onChange={updateText("postnatal", "otherConditions")} />
          </Field>
        </div>
      </fieldset>
    </div>
  );
}
