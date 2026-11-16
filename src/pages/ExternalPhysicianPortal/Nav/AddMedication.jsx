import { useState } from "react";
import { Plus } from "lucide-react";
import styles from "../ExternalPhysician.module.css";

export default function AddMedicationForm() {
    const [showForm, setShowForm] = useState(true);

    return (
        <div className={styles.medicationPage}>

 
            {/* Search */}
            <div className={styles.searchRow}>
                <div className={styles.searchGroup}>
                    <label className={styles.formLabel} htmlFor="medNationality">Nationality:</label>
                    <div className={`${styles.control} ${styles.selectWrap}`}>
                        <select id="medNationality" className={styles.formSelect} defaultValue="Egypt">
                            <option value="Egypt">Egypt</option>
                            <option value="Jordan">Jordan</option>
                            <option value="Saudi Arabia">Saudi Arabia</option>
                        </select>
                    </div>
                </div>

                <div className={styles.searchGroup}>
                    <label className={styles.formLabel} htmlFor="medPassportId">National/Passport ID:</label>
                    <div className={`${styles.control} ${styles.idControl}`}>
                        <input id="medPassportId" className={styles.formInput} type="text" defaultValue="318241024010514" />
                    </div>
                </div>

                <button type="button" className={styles.saveButton}>Search</button>
            </div>

            {/* Results */}
            <fieldset className={styles.resultsBox}>
                <legend>Results</legend>
                <div className={styles.resultsGrid}>
                    <div className={styles.resultItem}>
                        <span className={styles.resultLabel}>Patient Name: </span>
                        <span>Jana Mohamed Isamil</span>
                    </div>
                    <div className={`${styles.resultItem} ${styles.resultItemRight}`} lang="ar" dir="rtl">
                        <span className={styles.resultLabel}>إسم المريض:</span>
                        <span>جنا محمد إسماعيل</span>
                    </div>

                    <div className={styles.resultItem}>
                        <span className={styles.resultLabel}>Birthdate: </span>
                        <span>12/05/2023</span>
                    </div>
                    <div className={`${styles.resultItem} ${styles.resultItemRight}`} dir="rtl">
                        <span className={styles.resultLabel}>Gender:</span>
                        <span>Female</span>
                    </div>
                </div>
            </fieldset>

            <button
                type="button"
                className={styles.addMedicineLink}
                onClick={() => setShowForm((v) => !v)}
                aria-expanded={showForm}
            >
                <Plus size={22} strokeWidth={3} aria-hidden="true" />
                Add New Medicine
            </button>

            {/* Add medicine panel */}
            {showForm && (
                <div className={styles.medicineForm}>
                    <div className={styles.formHeader}>Add New Medicine</div>

                    <div className={styles.medicineBody}>
                        <div className={styles.medicineFields}>
                            <label className={`${styles.medicineField} ${styles.nameField}`}>
                                <span className={styles.fieldLabel}>Medicine Name</span>
                                <input className={styles.formInput} type="text" defaultValue="Panadol" />
                            </label>

                            <label className={`${styles.medicineField} ${styles.doseField}`}>
                                <span className={styles.fieldLabel}>Dosage:</span>
                                <input className={styles.formInput} type="text" defaultValue="2 tablets per day" />
                            </label>
                        </div>

                        <div className={styles.formActions}>
                            <button type="button" className={styles.saveButton}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}