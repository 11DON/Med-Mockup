import styles from "./modalShared.module.css";

// The blue window: header, body, Cancel / Save
export default function ModalShell({ title, onCancel, onSave, saveDisabled = false, children }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal} role="dialog" aria-label={title}>
        <header className={styles.header}>{title}</header>
        <div className={styles.body}>{children}</div>
        <footer className={styles.footer}>
          <button type="button" className={styles.cancel} onClick={onCancel}>Cancel</button>
          <button type="button" className={styles.save} onClick={onSave} disabled={saveDisabled}>
            Save
          </button>
        </footer>
      </div>
    </div>
  );
}

// A select (when `options` is given) or an input
export function Control({ value, onChange, options, type = "text", disabled = false, className = "" }) {
  const cls = `${styles.control} ${className}`;
  if (options) {
    return (
      <select className={cls} value={value} disabled={disabled} onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    );
  }
  return (
    <input
      className={cls}
      type={type}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

// "Label: [control]"
export function Field({ label, ...controlProps }) {
  return (
    <label className={styles.field}>
      <span>{label}:</span>
      <Control {...controlProps} />
    </label>
  );
}

// A checkbox card with a green title and a small description
export function CheckCard({ item, checked, onToggle }) {
  return (
    <div className={`${styles.card} ${checked ? styles.cardChecked : ""}`}>
      <label className={styles.cardTitle}>
        <input type="checkbox" checked={checked} onChange={onToggle} /> {item.title}
      </label>
      <p className={styles.cardDesc}>{item.description}</p>
    </div>
  );
}