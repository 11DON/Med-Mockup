import styles from "../PhysiotherapyPage.module.css";

// Section with a title and an optional action button.
export default function Section({
  id,
  title,
  action,
  onAction,
  secondaryAction,
  onSecondaryAction,
  className = "",
  children,
}) {
  return (
    <section className={`${styles.section} ${className}`} aria-labelledby={id}>
      <div className={styles.sectionHeader}>
        <h2 id={id}>{title}</h2>
        {(action || secondaryAction) && (
          <div className={styles.sectionActions}>
            {action && (
              <button type="button" className={styles.addButton} onClick={onAction}>
                <span aria-hidden="true">+</span> {action}
              </button>
            )}
            {secondaryAction && (
              <button type="button" className={styles.addButton} onClick={onSecondaryAction}>
                <span aria-hidden="true">+</span> {secondaryAction}
              </button>
            )}
          </div>
        )}
      </div>
      {children}
    </section>
  );
}