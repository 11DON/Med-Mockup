import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./TherapistSessionPage.module.css";

export default function TherapistSessionPage() {
  const [params] = useSearchParams();
  const sessionNo = Number(params.get("session")) || 2;
  const [duration, setDuration] = useState("4");
  const previousDuration = 2;
  const [trialComplete, setTrialComplete] = useState(true);
  const [saved, setSaved] = useState(false);
  const durationDifference = (Number(duration) || 0) - previousDuration;
  const differenceLabel = durationDifference > 0
    ? `+${durationDifference}`
    : String(durationDifference);
  const changeClass = durationDifference > 0
    ? styles.changePositive
    : durationDifference < 0
      ? styles.changeNegative
      : styles.changeNeutral;

  const saveSession = (event) => {
    event.preventDefault();
    setSaved(true);
  };

  return (
    <form className={styles.page} onSubmit={saveSession}>
      <fieldset className={styles.patient}>
        <legend>Patient Data</legend>
        <img src="/images/female.jpeg" alt="" />
        <div>
          <h2>Jana Mohamed Ismail</h2>
          <p>Age: 3 years, 6 months</p>
        </div>
        <p className={styles.gender}>Gender: Female</p>
        <p className={styles.arabic} lang="ar" dir="rtl">جنا محمد إسماعيل</p>
      </fieldset>

      <fieldset className={styles.panel}>
        <legend>Plan Data</legend>
        <div className={styles.plan}>
          <p><span>Frequency:</span> 2 times per week</p>
          <p><span>Duration:</span> 4 weeks</p>
          <p className={styles.ltg}><span>Long Term Goal:</span> LTG 1: Independent Mobility</p>
          <p className={styles.tasks}>
            <span>Tasks:</span>
            <span className={styles.taskList}>Task A: Animal Walks<br />Task B: Incline Board Play</span>
          </p>
          <p className={styles.stg}><span>Short Term Goal:</span> STG 1.1: Ankle Flexibility</p>
          <div className={styles.description}>
            <span>Description:</span>
            <p>
              By 8 weeks, the child will maintain static standing balance with a narrow base of support (feet together) for 10 seconds independent without upper extremity support, in 3 out of 3 trials.
            </p>
          </div>
        </div>
      </fieldset>

      <fieldset className={styles.panel}>
        <legend>Session Data</legend>
        <div className={styles.session}>
          <p><span>Session No.:</span> #{sessionNo}</p>
          <p><span>Week No.:</span> #{sessionNo}</p>
          <div className={styles.sessionDuration}>
            <span>Duration:</span>
            <ProgressBar value={Math.min(100, Math.round((sessionNo / 16) * 100))} label="Session duration" />
          </div>
        </div>
      </fieldset>

      <fieldset className={styles.panel}>
        <legend>Goals Data</legend>
        <div className={styles.goals}>
          <span className={styles.columnHeading}>Current</span>
          <span className={styles.columnHeading}>Previous</span>
          <span aria-hidden="true" />
          <label htmlFor="current-duration">Duration:</label>
          <input
            id="current-duration"
            className={styles.currentValue}
            type="number"
            min="0"
            value={duration}
            onChange={(event) => {
              setDuration(event.target.value);
              setSaved(false);
            }}
          />
          <input
            className={styles.previousValue}
            type="number"
            value={previousDuration}
            readOnly
            aria-label="Previous duration"
          />
          <span
            className={`${styles.change} ${changeClass}`}
            aria-label={`Duration difference ${differenceLabel}`}
          >
            {durationDifference > 0 ? "↑ " : durationDifference < 0 ? "↓ " : ""}
            {differenceLabel}
          </span>
          <span>Trials:</span>
          <input
            type="checkbox"
            checked={trialComplete}
            onChange={(event) => {
              setTrialComplete(event.target.checked);
              setSaved(false);
            }}
            aria-label="Current trial complete"
          />
          <input type="checkbox" checked readOnly aria-label="Previous trial complete" />
          <span className={styles.check} aria-label="Trial completed">✓</span>
          <span>Progress:</span>
          <div className={styles.goalProgress}>
            <ProgressBar value={trialComplete ? 45 : 0} label="Goal progress" />
          </div>
        </div>
      </fieldset>

      <div className={styles.actions}>
        {saved && <span className={styles.saved} role="status">Session saved.</span>}
        <button type="submit">Save</button>
      </div>
    </form>
  );
}

function ProgressBar({ value, label }) {
  return (
    <div
      className={styles.progressTrack}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
    >
      <div className={styles.progressFill} style={{ width: `${value}%` }} />
    </div>
  );
}
