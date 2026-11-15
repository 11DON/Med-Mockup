import { useState } from "react";
import styles from "./ViewSchedule.module.css";
import { useNavigate } from "react-router-dom";

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

const INFO = { therapist: "Amro Mahmoud", room: "Room 3", duration: "30 minutes", time: "10 AM to 10:30 AM" };

export default function ViewSchedule() {
  const [selected, setSelected] = useState("2026-11-19");
  const [view, setView] = useState({ y: 2026, m: 10 }); // month is 0-based: 10 = November
  const navigate = useNavigate();
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

  return (
    <div className={styles.wrapper}>

   
    <div className={styles.page}>
        
      <div className={styles.calendar}>
       
        <div className={styles.head}>
          <button type="button" onClick={() => changeMonth(-1)}>◀</button>
          <span>{monthName} {String(view.y).slice(2)}</span>
          <button type="button" onClick={() => changeMonth(1)}>▶</button>
        </div>

        <div className={styles.grid}>
          {WEEKDAYS.map((d, i) => <div key={i}>{d}</div>)}
          {cells.map((day, i) => {
            if (!day) return <div key={`e${i}`} />;
            const key = toKey(view.y, view.m, day);
            const ses = sessions[key];
            const cls = [ses && styles[ses.tone], key === selected && styles.selected].filter(Boolean).join(" ");
            return (
              <button type="button" key={key} className={cls} onClick={() => setSelected(key)}>
                {day}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.details}>
        {s ? (
          <>
            <p><span>Date:</span> {longDate}</p>
            <p><span>Session No.:</span> #{s.no}</p>
            <p><span>Therapist:</span> {INFO.therapist}</p>
            <p><span>Room:</span> {INFO.room}</p>
            <p><span>Duration:</span> {INFO.duration} &nbsp; From: {INFO.time}</p>
            <p className={styles.red}><span>Long Term Goal:</span> {s.ltg}</p>
            <p className={styles.blueText}><span>Short Term Goal:</span> {s.stg}</p>
            <p className={styles.greenText}>
              <span>Tasks:</span> {s.tasks.map((t) => <em key={t}>{t}</em>)}
            </p>
          </>
        ) : (
          <p>No session on {longDate}</p>
        )}
      </div>
     
    </div>
     <div className={styles.buttons}>
        <button type="button" className={styles.cancel} onClick={() => navigate("/parent-portal")}>
          Cancel
        </button>
      </div>
     </div>
  );
}