import styles from "./ScaleAssessment.module.css";
import {
  calculateScaleScore,
  gmfmDimensions,
  gmfmRatings,
  masMuscles,
  masRatings,
  pdmsSubtests,
  romSections,
} from "./scaleScoring.js";

function RatingOptions({ name, value, options, onChange, ariaLabel }) {
  return (
    <div className={styles.ratings} role="radiogroup" aria-label={ariaLabel}>
      {options.map(([rating, label, description]) => (
        <label className={styles.rating} key={rating} title={description ?? label}>
          <input
            type="radio"
            name={name}
            value={rating}
            checked={String(value) === String(rating)}
            onChange={() => onChange(name, rating)}
          />
          <span>{label}</span>
        </label>
      ))}
    </div>
  );
}

function GrossMotorForm({ answers, onAnswerChange }) {
  const score = calculateScaleScore("gmfm", answers);
  return (
    <>
      <p className={styles.note}>
        Rate each item from 0 to 3. The displayed score is the raw sum of the
        items shown here, not the official GMFM-66 composite score.
      </p>
      <div className={styles.gmfmList}>
        {gmfmDimensions.map((dimension) => {
          const dimensionScore = score.dimensions.find((entry) => entry.id === dimension.id)?.score ?? 0;
          return (
            <section className={styles.dimension} key={dimension.id}>
              <header className={styles.dimensionHeader}>
                <h3>{dimension.title}</h3>
                <strong>Score: {dimensionScore}</strong>
              </header>
              {dimension.items.map(([number, description], index) => {
                const name = `gmfm-${number}`;
                return (
                  <div className={styles.gmfmRow} key={number}>
                    <span className={styles.itemDescription}>
                      {number}. {description}
                    </span>
                    <RatingOptions
                      name={name}
                      value={answers[name] ?? "0"}
                      options={gmfmRatings}
                      onChange={onAnswerChange}
                      ariaLabel={`GMFM item ${number}`}
                    />
                    {index === dimension.items.length - 1 && (
                      <span className={styles.ellipsis} aria-hidden="true">⋮</span>
                    )}
                  </div>
                );
              })}
            </section>
          );
        })}
      </div>
      <label className={styles.comment}>
        <span>Comment</span>
        <textarea
          value={answers.comment ?? ""}
          onChange={(event) => onAnswerChange("comment", event.target.value)}
          rows="3"
        />
      </label>
      <ScoreSummary label={score.label} />
    </>
  );
}

function ModifiedAshworthForm({ answers, onAnswerChange }) {
  const score = calculateScaleScore("mas", answers);
  return (
    <>
      <p className={styles.note}>
        Select a Modified Ashworth grade for each muscle group. Grade labels
        include descriptions for reference; interpret results clinically.
      </p>
      <div className={styles.masList}>
        <section className={styles.dimension}>
          <header className={styles.dimensionHeader}>
            <h3>Muscle Group</h3>
            <strong>{score.label}</strong>
          </header>
          {masMuscles.map((muscle, index) => {
            const name = `mas-${index}`;
            return (
              <div className={`${styles.gmfmRow} ${styles.masAssessmentRow}`} key={muscle}>
                <span className={styles.itemDescription}>{muscle}</span>
                <RatingOptions
                  name={name}
                  value={answers[name] ?? "0"}
                  options={masRatings.map(([grade, label, points]) => [
                    String(points),
                    grade,
                    label,
                  ])}
                  onChange={onAnswerChange}
                  ariaLabel={`${muscle} Modified Ashworth grade`}
                />
              </div>
            );
          })}
        </section>
      </div>
      <label className={styles.comment}>
        <span>Comment</span>
        <textarea
          value={answers.comment ?? ""}
          onChange={(event) => onAnswerChange("comment", event.target.value)}
          rows="3"
        />
      </label>
      <ScoreSummary label={score.label} />
    </>
  );
}

function RangeOfMotionForm({ answers, onAnswerChange }) {
  const score = calculateScaleScore("rom", answers);
  return (
    <>
      <div className={styles.romList}>
        {romSections.map((section) => (
          <section className={styles.romSection} key={section.id}>
            <h3>{section.title}</h3>
            {section.movements.map((movement) => {
              const name = `rom-${movement.id}`;
              return (
                <label className={styles.romRow} key={movement.id}>
                  <span>{movement.label}</span>
                  <input
                    type="number"
                    step="1"
                    value={answers[name] ?? ""}
                    aria-label={`${movement.label} in degrees`}
                    onChange={(event) => onAnswerChange(name, event.target.value)}
                  />
                </label>
              );
            })}
          </section>
        ))}
      </div>
      <label className={styles.comment}>
        <span>Comment</span>
        <textarea
          value={answers.comment ?? ""}
          onChange={(event) => onAnswerChange("comment", event.target.value)}
          rows="3"
        />
      </label>
      <ScoreSummary label={score.label} />
    </>
  );
}

function PeabodyForm({ answers, onAnswerChange }) {
  const score = calculateScaleScore("pdms", answers);
  return (
    <>
      <p className={styles.note}>
        Enter raw subtest scores. This form totals entered values only; it does
        not convert raw scores to age-standardized scores or percentiles.
      </p>
      <div className={styles.pdmsList}>
        {pdmsSubtests.map((subtest, index) => {
          const name = `pdms-${index}`;
          return (
            <label className={styles.pdmsRow} key={subtest}>
              <span>{subtest}</span>
              <input
                type="number"
                min="0"
                step="1"
                value={answers[name] ?? "0"}
                onChange={(event) => onAnswerChange(name, event.target.value)}
              />
            </label>
          );
        })}
      </div>
      <label className={styles.comment}>
        <span>Comment</span>
        <textarea
          value={answers.comment ?? ""}
          onChange={(event) => onAnswerChange("comment", event.target.value)}
          rows="3"
        />
      </label>
      <ScoreSummary label={score.label} />
    </>
  );
}

function ScoreSummary({ label }) {
  return (
    <div className={styles.scoreSummary} aria-live="polite">
      {label}
    </div>
  );
}

export default function ScaleAssessment({ scale, answers, onAnswerChange }) {
  if (scale.id === "gmfm") {
    return <GrossMotorForm answers={answers} onAnswerChange={onAnswerChange} />;
  }
  if (scale.id === "mas") {
    return <ModifiedAshworthForm answers={answers} onAnswerChange={onAnswerChange} />;
  }
  if (scale.id === "rom") {
    return <RangeOfMotionForm answers={answers} onAnswerChange={onAnswerChange} />;
  }
  if (scale.id === "pdms") {
    return <PeabodyForm answers={answers} onAnswerChange={onAnswerChange} />;
  }
  return <p className={styles.note}>No assessment form is available for this scale.</p>;
}
