import { useState } from "react";
import styles from "../PhysiotherapyPage.module.css";
import Section from "./Section.jsx";
import RichText from "./RichText.jsx";
import PlanModal from "../../scales/modals/planModal.jsx";
import { initialPlan } from "../../../../../data/Physiotherapydata.js";

export default function PlanSection({ plan: controlledPlan, onPlanChange }) {
  const [localPlan, setLocalPlan] = useState(initialPlan);
  const [isOpen, setIsOpen] = useState(false);
  const plan = controlledPlan ?? localPlan;
  const updatePlan = onPlanChange ?? setLocalPlan;

  return (
    <Section
      id="plan-heading"
      title="Plan"
      action="Edit Plan"
      className={styles.plan}
      onAction={() => setIsOpen(true)}
    >
      <dl>
        <div>
          <dt>Frequency:</dt>
          <dd>
            <span className={styles.times}>{plan.frequencyCount} times</span> per{" "}
            <span className={styles.frequencyUnit}>{plan.frequencyUnit}</span>.
          </dd>
        </div>
        <div>
          <dt>Duration:</dt>
          <dd>
            <span className={styles.frequencyUnit}>
              {plan.durationCount} {plan.durationUnit}
            </span>
            .
          </dd>
        </div>
        <div>
          <dt>Diagnosis:</dt>
          <dd>{plan.diagnosis}</dd>
        </div>
        <div>
          <dt>Interventions:</dt>
          <dd><RichText html={plan.interventions} /></dd>
        </div>
      </dl>

      {isOpen && (
        <PlanModal
          plan={plan}
          onCancel={() => setIsOpen(false)}
          onSave={(newPlan) => {
            updatePlan(newPlan);
            setIsOpen(false);
          }}
        />
      )}
    </Section>
  );
}