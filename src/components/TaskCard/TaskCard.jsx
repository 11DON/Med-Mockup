import styles from './TaskCard.module.css';

export default function TaskCard({ task, isSelected, onSelect }) {
  const { patient } = task;

// className variable is for giving the patient urgent red border , flaged from the data 
  const className = [styles.card, isSelected && styles.selected, task.urgent && styles.urgent]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={className} onClick={() => onSelect(task.id)}>
      <img src={`/images/${patient.avatar}`} alt="Patient avatar" className={styles.face} />

      <div className={styles.info}>
        <p className={styles.title}>{task.taskType}</p>
        <p className={styles.title}>{patient.nameEn}</p>
        <p className={styles.nationality}>Nationality: {patient.nationality}</p>
        <p className={styles.age}>Age: {patient.age}</p>
      </div>

      <div className={styles.side}>
        <img src={`/images/${task.icon}`} alt={task.taskType} className={styles.rightImg} />
        <p className={styles.gender}>Gender: {patient.gender}</p>
      </div>
    </div>
  );
}