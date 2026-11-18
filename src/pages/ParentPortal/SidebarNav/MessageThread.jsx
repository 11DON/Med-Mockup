import { Navigate, useOutletContext, useParams } from "react-router-dom";
import styles from "./MessageCenter.module.css";

export default function MessageThread() {
  const { id } = useParams();
  const { threads } = useOutletContext();
  const thread = threads.find((t) => t.id === id);

  if (!thread) return <Navigate to="/parent-portal/message-center" replace />;

  return (
    <div className={styles.thread}>
      <div className={styles.threadHead}>
        <span><b>Title:</b> {thread.title}</span>
        <span><b>Category:</b> {thread.category}</span>
      </div>

      {thread.messages.map((m) => (
        <div key={m.id} className={m.from === "me" ? styles.rowMe : styles.rowClinic}>
          <div className={styles.meta}><b>{m.name}</b> {m.at}</div>
          <div
  className={`${styles.bubble} ${m.from === "me" ? "" : styles.bubbleClinic}`}
>
  {m.text}
</div>
        </div>
      ))}
    </div>
  );
}