import { useParams } from "react-router-dom";
import { getPatientById } from "../searchPatient/patientDirectory.js";
import styles from "../PatientCardPage/PatientCardPage.module.css"
import { useState } from "react";
import { TABS } from "./PatientInfoTabs/index.js"


export default function PatientCardPage() {

    const { id } = useParams();
    const patient = getPatientById(id);
    const name = patient?.nameEn || patient?.nameAr || patient?.patientId || 'Patient';
    const [activeKey, setActiveKey] = useState(TABS[0].key);

    if (!patient) {
        return (
            <>
                <main className={styles.page}>
                    <h1 className={styles.title}>Patient Card</h1>
                    <p>Patient Card Not Found</p>
                </main>
            </>
        );
    }
    const Active = TABS.find((t) => t.key === activeKey).Component;

    return (

        <main className={styles.page}>
                <h1 className={styles.title}>Patient Card</h1>
                <div className={styles.card}>
                    <img
                        src={`/images/${patient?.avatar || 'female.jpeg'}`}
                        alt={`${name} avatar`}
                        className={styles.face}
                    />

                    <div className={styles.info}>
                        <p className={styles.name}>{name}</p>
                        <p className={styles.arabicName} dir="rtl">{patient.nameAr}</p>
                        <p className={styles.nationality}>Nationality: {patient.nationality}</p>
                        <p className={styles.nationalId}>National/Passport ID: {patient.nationalId}</p>
                        <p className={styles.birthDate}>Birth date: {patient.birthDate}</p>
                        <p className={styles.age}>Age: {patient.age}</p>
                        <p className={styles.gender}>Gender: {patient.gender}</p>
                    </div>
                </div>

            <div className={styles.tabs} role="tablist" aria-label="Patient information">
                {TABS.map((tab) => (
                    <button
                        key={tab.key}
                        id={`patient-tab-${tab.key}`}
                        role="tab"
                        aria-selected={tab.key === activeKey}
                        aria-controls="patient-tab-panel"
                        className={styles.tab}
                        onClick={() => setActiveKey(tab.key)}
                    >
                        {tab.label}
                    </button>
                ))}

            </div>
            <section
                className={styles.panel}
                id="patient-tab-panel"
                role="tabpanel"
                aria-labelledby={`patient-tab-${activeKey}`}
            >
                <Active patient={patient} />
            </section>
        </main>


    );
}