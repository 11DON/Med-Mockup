import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ViewSchedule from "./ViewSchedule.jsx";
import RejectReasonModal from "./RejectReasonModal.jsx";
import { useScheduleReview } from "./ScheduleReviewContext.jsx";
import styles from "./ReviewSchedule.module.css";

// Reuses the ViewSchedule page (calendar + details) and swaps Cancel for Reject / Approve.
export default function ReviewSchedule() {
  const navigate = useNavigate();
  const { review, approve, reject } = useScheduleReview();
  const [rejecting, setRejecting] = useState(false);

  const pending = review.status === "pending";

  const onApprove = () => {
    approve();
    navigate("/parent-portal");
  };

  const onConfirmReject = (reason) => {
    reject(reason);
    setRejecting(false);
    navigate("/parent-portal");
  };

  return (
    <>
      <ViewSchedule
        actions={
          pending ? (
            <>
              <button type="button" className={styles.purple} onClick={() => setRejecting(true)}>Reject</button>
              <button type="button" className={styles.purple} onClick={onApprove}>Approve</button>
            </>
          ) : (
            <span className={styles.status}>This schedule was {review.status}.</span>
          )
        }
      />

      {rejecting && (
        <RejectReasonModal onCancel={() => setRejecting(false)} onConfirm={onConfirmReject} />
      )}
    </>
  );
}