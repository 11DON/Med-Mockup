import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./RejectReasonModal.module.css";

// Render it only while it should be visible, e.g. {rejecting && <RejectReasonModal ... />}
export default function RejectReasonModal({ onCancel, onConfirm }) {
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onCancel();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel]);

  const ok = () => {
    if (!reason.trim()) {
      setError("Please enter a reason.");
      return;
    }
    onConfirm(reason.trim());
  };

  return createPortal(
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Reject Reason" onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>Reject Reason</div>

        <div className={styles.body}>
          <label htmlFor="reject-reason">Reason:</label>
          <textarea
            id="reject-reason"
            rows={4}
            placeholder="The reason for rejection"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            autoFocus
          />
          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.buttons}>
            <button type="button" className={styles.cancel} onClick={onCancel}>Cancel</button>
            <button type="button" className={styles.ok} onClick={ok}>OK</button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}