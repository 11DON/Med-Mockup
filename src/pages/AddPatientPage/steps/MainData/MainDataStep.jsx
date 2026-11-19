import styles from "./MainDataStep.module.css";
import { fieldHandler } from "../../formUtils";
import Field from "../../Field"

const COUNTRIES = ["Egypt", "Saudi Arabia", "UAE", "Other"];

export default function MainDataStep({ value, onChange }) {
  const set = fieldHandler(value, onChange);
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className={styles.form}>
      <div className={styles.identityGrid}>
        <Field label="Patient Name (English)">
          <input name="nameEn" value={value.nameEn} onChange={set} />
        </Field>
        <Field label="اسم المريض (العربي)" direction="rtl">
          <input name="nameAr" dir="rtl" value={value.nameAr} onChange={set} />
        </Field>

        <Field label="Nationality">
          <select name="nationality" value={value.nationality} onChange={set}>
            {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="National/Passport ID">
          <input name="nationalId" value={value.nationalId} onChange={set} />
        </Field>

        <Field label="Birthdate">
          <input type="date" name="birthdate" value={value.birthdate} onChange={set} />
        </Field>
        <Field label="Gender">
          <select name="gender" value={value.gender} onChange={set}>
            <option value="">Select...</option>
            <option>Female</option>
            <option>Male</option>
          </select>
        </Field>
      </div>

      <div className={styles.addressGrid}>
        <h3 className={styles.sectionTitle}>Address:</h3>
        <Field label="Onboarding Date" className={styles.onboardingField}>
          <input value={today} disabled />
        </Field>
        <Field label="Country">
          <select name="country" value={value.country} onChange={set}>
            {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="School Name">
          <input name="school" value={value.school} onChange={set} />
        </Field>
        <Field label="Governorate">
          <input name="governorate" value={value.governorate} onChange={set} />
        </Field>
        <Field label="Grade">
          <input name="grade" value={value.grade} onChange={set} />
        </Field>
        <Field label="Area">
          <input name="area" value={value.area} onChange={set} />
        </Field>
      </div>
    </div>
  );
}