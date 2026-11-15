import { Link, useOutletContext } from "react-router-dom";
import { Plus } from "lucide-react";
import styles from "./MessageCenter.module.css";

export default function MessageList() {
  const { threads } = useOutletContext();

  return (
    <div>
      <div className={styles.topBar}>
        <Link to="new" className={styles.addLink}>
          <Plus size={18} /> Add New Message
        </Link>
      </div>

      {threads.map((t) => (
        <Link key={t.id} to={t.id} className={styles.card}>
          <div><span>Title:</span> {t.title}</div>
          <div><span>Opened at:</span> {t.openedAt}</div>
          <div><span>Status:</span> {t.status}</div>
          <div><span>Category:</span> {t.category}</div>
          <div><span>Closed at:</span> {t.closedAt}</div>
        </Link>
      ))}
    </div>
  );
}