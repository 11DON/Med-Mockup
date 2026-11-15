import { useState } from "react";
import styles from "./ViewSchedule.module.css";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const pad = (n) => String(n).padStart(2, "0");
const toKey = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;

// One entry per date: "YYYY-MM-DD" -> session. Replace with your own data.
const task = ["Task A: Animal Walks", "Task B: Incline Board Play"];
const sessions = {
  "2026-11-17": { no: 1, ltg: "LTG 1: Independent Mobility", stg: "STG 1.1: Ankle Flexibility", tasks: task, tone: "green" },
  "2026-11-19": { no: 2, ltg: "LTG 1: Independent Mobility", stg: "STG 1.1: Ankle Flexibility", tasks: task, tone: "blue" },
  "2026-11-24": { no: 3, ltg: "LTG 1: Independent Mobility", stg: "STG 1.1: Ankle Flexibility", tasks: task, tone: "green" },
  "2026-11-26": { no: 4, ltg: "LTG 1: Independent Mobility", stg: "STG 1.1: Ankle Flexibility", tasks: task, tone: "blue" },
};

const INFO = {
  patient: "Jana Mohamed Ismail",
  patientArabic: "جنا محمد إسماعيل",
  age: "3 years, 6 months",
  gender: "Female",
  room: "Room 3",
  duration: "30 minutes",
  time: "10 AM to 10:30 AM",
  frequency: "2 times per week",
  planDuration: "4 weeks",
  ltg: "LTG 1: Independent Mobility",
  stg: "STG 1.1: Ankle Flexibility",
};

export default function ViewSchedule({
  actions,
  onNoShow,
  onSession,
  onDetails,
}) {
  const [selected, setSelected] = useState("2026-11-19");
  const [view, setView] = useState({ y: 2026, m: 10 }); // month is 0-based: 10 = November
  const monthName = new Date(view.y, view.m).toLocaleString("en-US", { month: "long" });
  const firstWeekday = new Date(view.y, view.m, 1).getDay();
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  const cells = [...Array(firstWeekday).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  const changeMonth = (delta) => {
    const d = new Date(view.y, view.m + delta, 1);
    setView({ y: d.getFullYear(), m: d.getMonth() });
  };

  const s = sessions[selected];
  const longDate = new Date(`${selected}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  const progress = s ? Math.round((s.no / 8) * 100) : 0;

  return (
      <div className={styles.wrapper}>
        <div className={styles.page}>
          <section className={styles.calendarPanel} aria-label="Calendar">
            <h2 className={styles.calendarTitle}>Calendar</h2>
            <div className={styles.calendar}>
              <div className={styles.head}>
                <button type="button" aria-label="Previous month" onClick={() => changeMonth(-1)}>◀</button>
                <span>{monthName} {String(view.y).slice(2)}</span>
                <button type="button" aria-label="Next month" onClick={() => changeMonth(1)}>▶</button>
              </div>

              <div className={styles.grid}>
                {WEEKDAYS.map((day, index) => <div key={`${day}-${index}`}>{day}</div>)}
                {cells.map((day, index) => {
                  if (!day) return <div key={`empty-${index}`} />;
                  const key = toKey(view.y, view.m, day);
                  const scheduledSession = sessions[key];
                  const className = [
                    scheduledSession && styles[scheduledSession.tone],
                    key === selected && styles.selected,
                  ].filter(Boolean).join(" ");
                  return (
                    <button
                      type="button"
                      key={key}
                      className={className}
                      aria-pressed={key === selected}
                      onClick={() => setSelected(key)}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          <div className={styles.details}>
            <fieldset className={styles.dataPanel}>
              <legend>Patient Data</legend>
              <div className={styles.patientData}>
                <div>
                  <p className={styles.patientName}>{INFO.patient}</p>
                  <p className={styles.age}>Age: {INFO.age}</p>
                </div>
                <div className={styles.patientExtra}>
                  <p className={styles.patientArabic} lang="ar" dir="rtl">{INFO.patientArabic}</p>
                  <p className={styles.gender}>Gender: {INFO.gender}</p>
                </div>
              </div>
            </fieldset>

            <fieldset className={styles.dataPanel}>
              <legend>Session Data</legend>
              {s ? (
                <div className={styles.sessionData}>
                  <p><span>Date:</span>{longDate}</p>
                  <p><span>Session No.:</span>#{s.no}</p>
                  <p><span>Duration:</span>{INFO.duration}</p>
                  <p><span>From:</span>{INFO.time}</p>
                  <p><span>Room:</span>{INFO.room}</p>
                </div>
              ) : (
                <p className={styles.noSession}>No session on {longDate}</p>
              )}
            </fieldset>

            <fieldset className={styles.dataPanel}>
              <legend>Plan Data</legend>
              <div className={styles.planData}>
                <p><span>Frequency:</span>{INFO.frequency}</p>
                <p><span>Duration:</span>{INFO.planDuration}</p>
                <p className={styles.red}><span>Long Term Goal:</span>{s?.ltg ?? INFO.ltg}</p>
                <p className={styles.greenText}>
                  <span>Tasks:</span>
                  <span className={styles.taskList}>{(s?.tasks ?? task).map((item) => <em key={item}>{item}</em>)}</span>
                </p>
                <p className={styles.blueText}><span>Short Term Goal:</span>{s?.stg ?? INFO.stg}</p>
                <div className={styles.progressRow}>
                  <span>Current Progress:</span>
                  <div
                    className={styles.progressTrack}
                    role="progressbar"
                    aria-label="Current progress"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={progress}
                  >
                    <div className={styles.progressFill} style={{ width: `${progress}%` }} />
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>

        <div className={styles.buttons}>
          {actions ?? (
            <>
              <button type="button" className={styles.noShow} onClick={onNoShow}>No Show</button>
              <button
                type="button"
                className={styles.action}
                disabled={!s}
                onClick={() => onSession?.({ date: selected, session: s })}
              >
                Session
              </button>
              <button
                type="button"
                className={styles.action}
                onClick={onDetails}
              >
                Details
              </button>
            </>
          )}
        </div>
      </div>
    );
}