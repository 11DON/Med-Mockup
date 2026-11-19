import { useState } from "react";
import { Outlet } from "react-router-dom";
import styles from "./HomeExercise.module.css";

const initialLogs = [
  { id: "1", activity: "Frog Jumps & Duck Walks", date: "2026-11-17", difficulty: "easy", comment: "" },
];


export default function HomeExercise() {
  const [logs, setLogs] = useState(initialLogs);

  const addLog = (log) =>
    setLogs((prev) => [{ id: String(Date.now()), ...log }, ...prev]);

  return (
    <div className={styles.root}>
      <Outlet context={{ logs, addLog }} />
    </div>
  );
}