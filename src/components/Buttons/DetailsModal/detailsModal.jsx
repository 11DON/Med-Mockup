import { useEffect, useRef } from "react";
import { getMedicalHistory } from "../../../data/medicalHistory.js";
import styles from "./detailsModal.module.css";

export default function DetailsModal({ patient, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (patient && !dialog.open) dialog.showModal();
    if (!patient && dialog.open) dialog.close();
  }, [patient]);

  const history = patient ? getMedicalHistory(patient.patientId) : null;

  // ?? [] so a missing field renders "None recorded" instead of throwing
  const list = (arr) => arr ?? [];

  const sections = history && [
    { title: "Allergies", items: list(history.allergies) },
    { title: "Chronic conditions", items: list(history.chronicConditions) },
    {
      title: "Current medications",
      items: list(history.currentMedications).map(
        (m) => `${m.name}, ${m.dose}, ${m.frequency}`
      ),
    },
    {
      title: "Immunizations",
      items: list(history.immunizations).map(
        (v) => `${v.vaccine}: ${v.date} (${v.status})`
      ),
    },
    {
      title: "Past visits",
      items: list(history.pastVisits).map(
        (v) => `${v.date}: ${v.diagnosis} (${v.doctor}, ${v.department}). ${v.notes}`
      ),
    },
    {
      title: "Growth",
      items: list(history.growth).map(
        (g) => `${g.date}: ${g.heightCm} cm, ${g.weightKg} kg`
      ),
    },
    { title: "Family history", items: list(history.familyHistory) },
  ];

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && ref.current.close()}
    >
      {patient && (
        <div className={styles.content}>
          <h2>{patient.nameEn}</h2>
          <h2 dir="rtl" lang="ar">{patient.nameAr}</h2>
          <p className={styles.sub}>{patient.age}, {patient.gender}</p>

          {!history && <p>No medical history on record.</p>}

          {sections?.map((s) => (
            <section key={s.title}>
              <h3>{s.title}</h3>
              {s.items.length ? (
                <ul>
                  {s.items.map((item, i) => (
                    <li key={`${i}-${item}`}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className={styles.none}>None recorded</p>
              )}
            </section>
          ))}

          {history && (
            <p className={styles.sub}>Last updated {history.lastUpdated}</p>
          )}

          <form method="dialog">
            <button className={styles.btn}>Close</button>
          </form>
        </div>
      )}
    </dialog>
  );
}