import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, X } from "lucide-react";
import styles from "./NotificationBell.module.css";
import { useScheduleReview } from "./ScheduleReviewContext.jsx";

export default function NotificationBell() {
  const { review } = useScheduleReview();
  const [open, setOpen] = useState(false);

  const items = [
    { id: "scale-request", label: "Fill Scale Request", to: "/parent-portal/fill-scale-request" },
    ...(review.status === "pending"
      ? [{ id: "review", label: "Review Schedule", to: "/parent-portal/review-schedule" }]
      : []),
  ];

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={styles.bell}
        aria-label={`Notifications (${items.length})`}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <Mail size={28} strokeWidth={1.5} aria-hidden="true" />
        {items.length > 0 && <span className={styles.badge}>{items.length}</span>}
      </button>

      {open && (
        <div className={styles.popup} role="dialog" aria-label="Notifications">
          <div className={styles.head}>
            <span>Notifications</span>
            <button type="button" className={styles.close} aria-label="Close" onClick={() => setOpen(false)}>
              <X size={14} />
            </button>
          </div>

          {items.length ? (
            <ul className={styles.list}>
              {items.map((n) => (
                <li key={n.id}>
                  <Link to={n.to} onClick={() => setOpen(false)}>{n.label}</Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.empty}>No notifications</p>
          )}
        </div>
      )}
    </div>
  );
}