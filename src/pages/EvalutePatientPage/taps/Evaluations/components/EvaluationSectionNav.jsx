import styles from "../PhysiotherapyPage.module.css";

const sections = [
  { id: "scales-heading", label: "Scales" },
  { id: "observation-heading", label: "Clinical Observation" },
  { id: "summary-heading", label: "Summary" },
  { id: "plan-heading", label: "Plan" },
  { id: "goals-heading", label: "Goals" },
  { id: "hep-heading", label: "Home Exercise Program" },
];

export default function EvaluationSectionNav() {
  return (
    <div className={styles.sectionNavContainer}>
      <nav className={styles.sectionNav} aria-label="Evaluation sections">
        {sections.map(({ id, label }) => (
          <a className={styles.sectionNavLink} href={`#${id}`} key={id}>
            {label}
          </a>
        ))}
      </nav>
    </div>
  );
}