import styles from './DetailsPanel.module.css';
import { useNavigate } from "react-router-dom";
export default function DetailsPanel({ patient, onDetails }) {
      const navigate = useNavigate();

    if (!patient) {
        return (
            <section className={styles.panel}>
                <h2 className={styles.sectionTitle}>Details</h2>
                <div className={styles.column} />
            </section>
        );
    }



    return (
        <section className={styles.panel}>
            <h2 className={styles.sectionTitle}>Details</h2>
            <div className={styles.column}>
                <div className={styles.patientHeader}>
                    <div className={styles.nameRow}>
                        <h3 className={styles.patientName}>{patient.nameEn}</h3>
                        <h3 className={styles.patientName} dir="rtl" lang="ar">{patient.nameAr}</h3>
                    </div>

                    <div className={styles.infoRow}>
                        <span className={styles.nationality}>Nationality: {patient.nationality}</span>
                        <span className={styles.nationality}>National/Passport ID: {patient.nationalId}</span>
                    </div>
                    <div className={styles.infoRow}>
                        <span className={styles.age}>Birth date: {patient.birthDate}</span>
                        <span className={styles.age}>Age: {patient.age}</span>
                        <span className={styles.gender}>Gender: {patient.gender}</span>
                    </div>
                </div>
                <div className={styles.actions}>
                    <button className={`${styles.btn} ${styles.btnSend}`} onClick={() => navigate("/")}>Send</button>
                    <button className={`${styles.btn} ${styles.btnDetails}`} onClick={onDetails}>
                        Details
                    </button>
                </div>
            </div>
            
        </section>
    )
}