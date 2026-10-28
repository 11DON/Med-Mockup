import TaskCard from './TaskCard';
import styles from './TaskList.module.css';

export default function TaskList({ tasks, selectedId, onSelect }) {
  return (
    <section className={styles.panel}>
      <h2 className={styles.sectionTitle}>Tasks</h2>
      <div className={styles.column}>
        <div className={styles.tasksCards}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              isSelected={task.id === selectedId}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </section>
  );
}