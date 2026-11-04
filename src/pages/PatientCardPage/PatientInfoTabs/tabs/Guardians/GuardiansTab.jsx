import styles from "./guardians.module.css";
import { Section } from "../shared.jsx";

export default function GuardiansTab({ patient }) {
  const guardians = patient.guardians ?? [];
  if (guardians.length === 0) return <p>No guardians on file.</p>;

  return (
    <div className={styles.guardians}>
      {guardians.map((guardian) => (
        <Section
          key={guardian.nationalId + guardian.relationship}
          title={guardian.relationship}
        >
          <div className={styles.fields}>
            <div className={styles.column}>
              <p ><span>Guardian Name (English):</span> {guardian.nameEn}</p>
              <p className={styles.info}><span>Nationality:</span> {guardian.nationality}</p>
              <p  className={styles.info}><span>Birthdate:</span> {guardian.birthDate}</p>
              <p  className={styles.info}><span>Phone No.:</span> {guardian.phone}</p>
            </div>
            <div className={styles.column}>
              <p dir="rtl"><span>اسم ولي الأمر (العربي):</span> {guardian.nameAr}</p>
              <p><span>National/Passport ID:</span> {guardian.nationalId}</p>
              <p><span>Relationship Type:</span> {guardian.relationship}</p>
              <label className={styles.access}>
                <span>Can Access System:</span>
                <input type="checkbox" checked={!!guardian.canAccessSystem} readOnly disabled />
              </label>
            </div>
          </div>
        </Section>
      ))}
    </div>
  );
}