import { Link, useOutletContext } from "react-router-dom";
import { Plus } from "lucide-react";
import styles from "./HomeExercise.module.css";
import { formatDate, goalsFor } from "./homeExerciseUtils.js";

// Screen 1: logged activities + "Add New Activity"
export default function ActivityLogList() {
  const { logs } = useOutletContext();

  return (
    <div>
      <div className={styles.topBar}>
        <Link to="new" className={styles.addLink}>
          <Plus size="1.1em" /> Add New Activity
        </Link>
      </div>

      {logs.map((log) => {
        const { ltg, stg } = goalsFor(log.activity);
        return (
          <div key={log.id} className={styles.card}>
            <div><span>Title:</span> <em className={styles.orange}>{log.activity}</em></div>
            <div><span>Date:</span> {formatDate(log.date)}</div>
            <div className={styles.red}><span>Long Term Goal:</span> {ltg}</div>
            <div className={styles.blue}><span>Short Term Goal:</span> {stg}</div>
          </div>
        );
      })}
    </div>
  );
}