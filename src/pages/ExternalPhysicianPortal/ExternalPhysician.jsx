import { useState } from "react";
import styles from "./ExternalPhysician.module.css";
import { Mail, Menu } from "lucide-react";
import AddPatientForm from "./Nav/AddNewPatient.jsx"
import AddMedicationForm from "./Nav/AddMedication.jsx"
const navItems = [
  { key: "addPatient", label: "Add New Patient" },
  { key: "addMedication", label: "Add Medication" },
];





export default function ExternalPhysician() {
  const [activeTab, setActiveTab] = useState("addPatient");

  return (
    <div className={styles.portalShell}>
      <header className={styles.header}>
        <h1 className={styles.title}>External Physician Portal</h1>

        <div className={styles.account}>
          <div className={styles.headerIcons}>
            <button type="button" className={styles.iconButton} aria-label="Messages">
              <Mail size={24} strokeWidth={1.6} aria-hidden="true" />
            </button>
            <button type="button" className={styles.iconButton} aria-label="Profile menu">
              <Menu size={24} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
          <small>Logged in as External Physician</small>
        </div>
      </header>
      {activeTab === "addMedication" && (<section className={styles.patient} aria-label="Active child">
                <img src="/images/female.jpeg" alt="" className={styles.avatar} />

                <div className={styles.patientInfo}>
                    <span className={styles.patientName}>Jana Mohamed Ismail</span>
                    <span className={styles.age}>Age: 3 years, 6 months</span>
                </div>

                <span className={styles.gender}>Gender: Female</span>
                <span className={styles.arabicName} lang="ar" dir="rtl">جنا محمد إسماعيل</span>
            </section>)}
           

      <div className={styles.body}>
        <nav className={styles.sidebar} aria-label="External physician navigation">
          {navItems.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              className={`${styles.navItem} ${activeTab === key ? styles.active : ""}`}
              onClick={() => setActiveTab(key)}
            >
              {label}
            </button>
          ))}
        </nav>

        <main className={styles.content}>
          {activeTab === "addPatient" ? <AddPatientForm /> : <AddMedicationForm />}
        </main>
      </div>
    </div>
  );
}