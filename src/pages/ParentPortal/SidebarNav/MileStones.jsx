import { useState } from "react";
import GoalsSection from "../../EvalutePatientPage/taps/Evaluations/components/Goalssection.jsx";
import styles from "./MilestonesPage.module.css";

const MILESTONES = [
  { id: "m1", label: "Milestone 1 From (15/11/2026) to (10/02/2027)" },
  { id: "m2", label: "Milestone 2 From (11/02/2027) to (10/05/2027)" },
];

export default function MilestonesPage() {
  const [milestone, setMilestone] = useState(MILESTONES[0].id);

  return (
    <div>
      <div className={styles.top}>
        <label htmlFor="milestone">Milestones:</label>
        <select id="milestone" value={milestone} onChange={(e) => setMilestone(e.target.value)}>
          {MILESTONES.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
        </select>
      </div>

      <GoalsSection
        className={styles.goals}
        showManagementActions={false}
        milestoneId={milestone}
        renderDetailsFooter={(goal) => <ProgressBar label="Achieved" percent={goal.achieved ??85} />
      
      }
      />
    </div>
  );
}
function ProgressBar({ label, percent }) {
  return (
    <div className={styles.progress}>
      <span>{label}:</span>
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${percent}%` }} />
      </div>
      <span>{percent}%</span>
    </div>
  );
}