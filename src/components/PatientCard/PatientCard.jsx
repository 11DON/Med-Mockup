import styles from './PatientCard.module.css';
import { Link } from "react-router-dom";

export default function PatientCard({ patient }) {
  const name = patient?.nameEn || patient?.nameAr || patient?.patientId || 'Patient';
  return (
    <div className={styles.card}>
      <img
        src={`/images/${patient?.avatar || 'female.jpeg'}`}
        alt={`${name} avatar`}
        className={styles.face}
      />

      <div className={styles.info}>
        {patient?.patientId ? (
  <Link to={`/patients/${patient.patientId}`} className={styles.name}>{name}</Link>
) : (
  <span className={styles.name}>{name}</span>
)}
        <p className={styles.nationality}>Egypt: {patient?.nationalId || 'ID'}</p>
        <div className={styles.row}>
          <p className={styles.age}>{patient?.birthDate || 'BirthDate'}</p>
          <p className={styles.gender}>{patient?.gender || 'Gender'}</p>
        </div>
      </div>
    </div>
  );
}