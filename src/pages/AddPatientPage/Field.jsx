
import styles from "./Field.module.css";

export default function Field({ label, children, className = "", labelClassName = "", direction }) {
  const fieldClassName = direction === "rtl" ? styles.rtl : "";

  return (
    <label className={`${styles.field} ${fieldClassName} ${className}`}>
      <span className={`${styles.label} ${labelClassName}`}>{label}</span>
      {children}
    </label>
  );
}
