import styles from "./GuardiansStep.module.css";
import Field from "../../Field"


export const emptyGuardian = {
  nameEn: "",
  nameAr: "",
  nationality: "Egypt",
  nationalId: "",
  birthdate: "", 
  relationship: "",
  phone: "",
  canAccess: false,
};

export default function GuardiansStep({ value, onChange }) {
  const update = (i, e) => {
    const { name, type, value: v, checked } = e.target;
    onChange(value.map((g, idx) => (idx === i ? { ...g, [name]: type === "checkbox" ? checked : v } : g)));
  };

  const add = () => onChange([...value, emptyGuardian]);
  const remove = (i) => onChange(value.filter((_, idx) => idx !== i));

  return (
    <div className={styles.guardianForm}>
      {value.map((g, i) => (
        <div className={styles.guardianGrid} key={i}>
          <Field label="Guardian Name (English)">
            <input name="nameEn" value={g.nameEn} onChange={(e) => update(i, e)} />
          </Field>
          <Field label="Guardian Name (Arabic)" direction="rtl">
            <input name="nameAr" dir="rtl" value={g.nameAr} onChange={(e) => update(i, e)} />
          </Field>

          <Field label="Nationality">
            <select name="nationality" value={g.nationality} onChange={(e) => update(i, e)}>
              <option>Egypt</option>
              <option>Other</option>
            </select>
          </Field>
          <Field label="National/Passport ID">
            <input name="nationalId" value={g.nationalId} onChange={(e) => update(i, e)} />
          </Field>

          <Field label="Birthdate">
            <input type="date" name="birthdate" value={g.birthdate} onChange={(e) => update(i, e)} />
          </Field>
          <Field label="Relationship Type">
            <select name="relationship" value={g.relationship} onChange={(e) => update(i, e)}>
              <option value="">Select...</option>
              <option>Father</option>
              <option>Mother</option>
              <option>Other</option>
            </select>
          </Field>

          <Field label="Phone No.">
            <input name="phone" value={g.phone} onChange={(e) => update(i, e)} />
          </Field>
          <Field label="Can Access System">
            <input
              className={styles.checkbox}
              type="checkbox"
              name="canAccess"
              checked={g.canAccess}
              onChange={(e) => update(i, e)}
            />
          </Field>

          {i > 0 && (
            <button
              type="button"
              className={styles.removeButton}
              onClick={() => remove(i)}
            >
              Remove guardian
            </button>
          )}
        </div>
      ))}

      <button type="button" className={styles.addButton} onClick={add}>
        <span className={styles.add}>+</span> Add Another Guardian
      </button>
    </div>
  );
}