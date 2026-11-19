import { useState } from "react";
import styles from "../PhysiotherapyPage.module.css";
import Section from "./Section.jsx";
import RichText from "./RichText.jsx";
import ObservationModal from "../../scales/modals/ObservationModal.jsx";
import { initialObservations, initialSummary } from "../../../../../data/Physiotherapydata.js";

// Observations are stored as { id, title, html } for the rich text editor
const toRichItems = (observations) =>
  observations.map(({ title, points }, i) => ({
    id: `obs-${i}`,
    title,
    html: `<ul>${points.map((p) => `<li>${p}</li>`).join("")}</ul>`,
  }));

// Observations and summary share one modal, so they live in one component.
export default function ObservationSection() {
  const [observations, setObservations] = useState(() => toRichItems(initialObservations));
  const [summary, setSummary] = useState(initialSummary);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Section
        id="observation-heading"
        title="Clinical Observation"
        action="Edit Observations And Summary"
        onAction={() => setIsOpen(true)}
      >
        <div className={styles.observationList}>
          {observations.map((o) => (
            <article className={styles.observation} key={o.id}>
              <h3>{o.title}</h3>
              <RichText html={o.html} />
            </article>
          ))}
        </div>
      </Section>

      <Section id="summary-heading" title="Summary" className={styles.summary}>
        <RichText html={summary} />
      </Section>

      {isOpen && (
        <ObservationModal
          sections={observations}
          summary={summary}
          onCancel={() => setIsOpen(false)}
          onSave={({ sections, summary }) => {
            setObservations(sections);
            setSummary(summary);
            setIsOpen(false);
          }}
        />
      )}
    </>
  );
}