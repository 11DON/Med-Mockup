import { useId, useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const navId = useId();

  return (
    <div className={styles.sectionNavContainer}>
      <button
        className={styles.sectionNavToggle}
        type="button"
        aria-expanded={isOpen}
        aria-controls={navId}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className={styles.hamburgerIcon} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        Sections
      </button>
      <nav
        className={`${styles.sectionNav} ${isOpen ? styles.sectionNavExpanded : styles.sectionNavCollapsed}`}
        id={navId}
        aria-label="Evaluation sections"
      >
        {sections.map(({ id, label }) => (
          <a
            className={styles.sectionNavLink}
            href={`#${id}`}
            key={id}
            onClick={() => setIsOpen(false)}
          >
            {label}
          </a>
        ))}
      </nav>
    </div>
  );
}
