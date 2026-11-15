import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Check } from "lucide-react";
import styles from "./HomeExercise.module.css";
// adjust this path to where your data file lives
import { initialActivities } from "../../../data/Physiotherapydata.js";
import { DIFFICULTY, goalsFor, shortTitle, todayKey } from "./homeExerciseUtils.js";

// Screen 2: log an activity
export default function NewActivityLog() {
  const { addLog } = useOutletContext();
  const navigate = useNavigate();

  const [activityTitle, setActivityTitle] = useState(initialActivities[0].title);
  const [date, setDate] = useState(todayKey());
  const [difficulty, setDifficulty] = useState(null);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const activity = initialActivities.find((a) => a.title === activityTitle);
  const name = shortTitle(activity.title);
  const { ltg, stg } = goalsFor(name);

  const save = () => {
    if (!difficulty) {
      setError("Please choose how hard it was.");
      return;
    }
    addLog({ activity: name, date, difficulty, comment: comment.trim() });
    navigate("/parent-portal/home-exercise");
  };

  return (
    <div>
      <div className={styles.formTop}>
        <div className={styles.field}>
          <label htmlFor="activity">Activity:</label>
          <select id="activity" value={activityTitle} onChange={(e) => setActivityTitle(e.target.value)}>
            {initialActivities.map((a) => (
              <option key={a.title} value={a.title}>{shortTitle(a.title)}</option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="date">Date:</label>
          <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
      </div>

      <div className={styles.goalsRow}>
        <span className={styles.red}>Long Term Goal: {ltg}</span>
        <span className={styles.blue}>Short Term Goal: {stg}</span>
      </div>

      <div className={styles.detailsBox}>
        <p><span>Title:</span> <em className={styles.orange}>{name}</em></p>
        <p><span>Frequency:</span> {activity.frequency}</p>
        <p><span>Dosage:</span> {activity.dosage}</p>
        <p><span>Safety Reminder:</span> {activity.safetyReminder}</p>
        {activity.parentTip && <p><span>Parent Tip:</span> {activity.parentTip}</p>}
        {activity.howTo && (
          <>
            <p><span>How to do it:</span></p>
            <p>{activity.howTo}</p>
          </>
        )}
      </div>

      <h3 className={styles.question}>How hard was it for Jana to complete the exercises today?</h3>
      <div className={styles.faces}>
        {DIFFICULTY.map((d) => (
          <div key={d.id} className={styles.faceWrap}>
            <span className={styles.tick}>{difficulty === d.id && <Check size="1.4em" />}</span>
            <button
              type="button"
              className={styles.face}
              aria-label={d.label}
              aria-pressed={difficulty === d.id}
              onClick={() => setDifficulty(d.id)}
            >
              {d.emoji}
            </button>
          </div>
        ))}
      </div>

      <h3 className={styles.question}>Tell us about any wins or barriers you faced today.</h3>
      <textarea
        className={styles.comment}
        rows={5}
        placeholder="Parent Comment Here"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.buttons}>
        <button type="button" className={styles.save} onClick={save}>Save</button>
      </div>
    </div>
  );
}