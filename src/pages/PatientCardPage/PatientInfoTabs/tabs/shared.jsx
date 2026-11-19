

import styles from "./shared.module.css"
export function Section({ title, children }) {
    return (
        <fieldset className={styles.field}>
            <legend className={styles.legend}>
                {title}
            </legend>
            {children}
        </fieldset>
    );
}

export function Field({ label, value }) {
    return (
        <p className={styles.p}>
            {label} : {value === "" || value == null ? "-" : value}
        </p>
    )
}

export function Check({ label, checked }) {
  return (
    <label style={{ display: "block" }}>
      <input type="checkbox" checked={!!checked} readOnly disabled /> {label}
    </label>
  );
}

export function CheckEntry({ label, checked, className = "", labelClassName = "" }) {
  return (
    <label className={[styles.checkEntry, className].filter(Boolean).join(" ")}>
      <span className={labelClassName}>{label}</span>
      <input type="checkbox" checked={!!checked} readOnly disabled />
    </label>
  );
}

export function TextEntry({ label, value, multiline = false }) {
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

