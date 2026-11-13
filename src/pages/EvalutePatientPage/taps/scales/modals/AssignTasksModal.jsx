import { useState } from "react";
import ModalShell, { CheckCard } from "./ModalShell.jsx";
import styles from "./modalShared.module.css";

/**
 * goalTitle:   "STG 1.1: Ankle Flexibility"
 * tasks:       [{ id, title, description }]  every task that exists
 * assignedIds: ids already assigned to this goal
 * onSave(ids)
 */
export default function AssignTasksModal({ goalTitle, tasks, assignedIds, onSave, onCancel }) {
  const [assigned, setAssigned] = useState(assignedIds);
  const [marked, setMarked] = useState([]); // ticked checkboxes, in either list

  const available = tasks.filter((task) => !assigned.includes(task.id));
  const selected = tasks.filter((task) => assigned.includes(task.id));

  const toggleMark = (id) =>
    setMarked((current) =>
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id],
    );

  // → move the ticked tasks from Available to Selected
  const moveRight = () => {
    const moving = available.filter((t) => marked.includes(t.id)).map((t) => t.id);
    setAssigned((current) => [...current, ...moving]);
    setMarked((current) => current.filter((id) => !moving.includes(id)));
  };

  // ← move the ticked tasks from Selected back to Available
  const moveLeft = () => {
    const moving = selected.filter((t) => marked.includes(t.id)).map((t) => t.id);
    setAssigned((current) => current.filter((id) => !moving.includes(id)));
    setMarked((current) => current.filter((id) => !moving.includes(id)));
  };

  const renderList = (list) =>
    list.map((task) => (
      <CheckCard
        key={task.id}
        item={task}
        checked={marked.includes(task.id)}
        onToggle={() => toggleMark(task.id)}
      />
    ));

  return (
    <ModalShell title="Assign Tasks to Goals" onCancel={onCancel} onSave={() => onSave(assigned)}>
      <h3 className={styles.subtitle}>{goalTitle}</h3>

      <div className={styles.taskLayout}>
        <section>
          <h4 className={styles.sectionTitle}>Available Tasks</h4>
          <div className={`${styles.box} ${styles.list}`}>{renderList(available)}</div>
        </section>

        <div className={styles.arrows}>
          <button type="button" className={styles.arrowButton} onClick={moveRight} aria-label="Assign selected tasks">
            →
          </button>
          <button type="button" className={styles.arrowButton} onClick={moveLeft} aria-label="Remove selected tasks">
            ←
          </button>
        </div>

        <section>
          <h4 className={styles.sectionTitle}>Selected Tasks</h4>
          <div className={`${styles.box} ${styles.list}`}>{renderList(selected)}</div>
        </section>
      </div>
    </ModalShell>
  );
}