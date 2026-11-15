import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./PhysiotherapyModal.module.css";

export default function PhysiotherapyModal({
  title,
  children,
  onSave,
  onClose,
  className = "",
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    if (!dialog.open) dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, []);

  const submit = (event) => {
    event.preventDefault();
    onSave();
  };

  return createPortal(
    <dialog
      ref={dialogRef}
      className={`${styles.dialog} ${className}`}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <form className={styles.form} onSubmit={submit}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.body}>{children}</div>
        <div className={styles.actions}>
          <button type="button" className={styles.cancel} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={styles.save}>Save</button>
        </div>
      </form>
    </dialog>,
    document.body,
  );
}
