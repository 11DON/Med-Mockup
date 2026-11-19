import { Fragment, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./ViewSheduleModal.module.css";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const pad = (n) => String(n).padStart(2, "0");
const toKey = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;
const SAMPLE_SESSION_DATES = [
  "2026-11-16",
  "2026-11-19",
  "2026-11-23",
  "2026-11-26",
  "2026-11-30",
];
const SAMPLE_SESSIONS = Object.fromEntries(
  SAMPLE_SESSION_DATES.map((date, index) => [
    date,
    {
      sessionNo: index + 1,
      therapist: "Amro Mahmoud",
      room: "Room 3",
      duration: 30,
      from: "10 AM",
      to: "10:30 AM",
      ltg: "LTG 1: Independent Mobility",
      stgs: [{
        id: "stg-1-1",
        label: "STG 1.1: Ankle Flexibility",
        tasks: ["Task A: Animal Walks", "Task B: Incline Board Play"],
      }],
      tasks: [],
    },
  ]),
);

export default function ScheduleModal({
  open,
  onClose,
  onChangeDate,
}) {
  const [view, setView] = useState({ y: 2026, m: 10 });
  const [selected, setSelected] = useState("2026-11-19");

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const monthName = new Date(view.y, view.m).toLocaleString("en-US", { month: "long" });
  const firstWeekday = new Date(view.y, view.m, 1).getDay();
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();

  const cells = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const changeMonth = (delta) =>
    setView(({ y, m }) => {
      const d = new Date(y, m + delta, 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    });

  const session = SAMPLE_SESSIONS[selected];
  const longDate = new Date(selected + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Schedule">
        <div className={styles.header}>Schedule</div>

        <div className={styles.body}>
          {/* ---------- Calendar ---------- */}
          <div className={styles.calendar}>
            <div className={styles.calHead}>
              <button type="button" className={styles.nav} onClick={() => changeMonth(-1)}>◀</button>
              <span>{monthName} {String(view.y).slice(2)}</span>
              <button type="button" className={styles.nav} onClick={() => changeMonth(1)}>▶</button>
            </div>

            <div className={styles.grid}>
              {WEEKDAYS.map((d, i) => (
                <div key={i} className={styles.weekday}>{d}</div>
              ))}

              {cells.map((day, i) => {
                if (!day) return <div key={i} />;
                const key = toKey(view.y, view.m, day);
                const daySession = SAMPLE_SESSIONS[key];
                const isInScheduledRange = key >= "2026-11-16" && key <= "2026-11-30";
                const cls = [
                  styles.day,
                  isInScheduledRange ? styles.greenDay : "",
                  daySession ? styles.blueDay : "",
                  key === selected ? styles.selected : "",
                ].join(" ");
                return (
                  <button
                    type="button"
                    key={i}
                    className={cls}
                    title={daySession ? `Session #${daySession.sessionNo}` : ""}
                    onClick={() => setSelected(key)}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ---------- Details ---------- */}
          <div className={styles.details}>
            {session ? (
              <dl>
                <Row label="Date" value={longDate} />
                <Row label="Session No." value={`#${session.sessionNo}`} />
                <Row label="Therapist" value={session.therapist} />
                <Row label="Room" value={session.room} />
                <Row
                  label="Duration"
                  value={`${session.duration} minutes`}
                  extra={`From: ${session.from} to ${session.to}`}
                />
                <Row label="Long Term Goal" value={session.ltg} labelClass={styles.red} valueClass={styles.red} />
                {session.stgs.length ? (
                  session.stgs.map((stg) => (
                    <Fragment key={stg.id}>
                      <Row
                        label="Short Term Goal"
                        value={stg.label}
                        labelClass={styles.blueText}
                        valueClass={styles.blueText}
                      />
                      <TaskRow tasks={stg.tasks} />
                    </Fragment>
                  ))
                ) : (
                  <TaskRow tasks={session.tasks} />
                )}
                {session.stgs.length > 0 && session.tasks.length > 0 && (
                  <TaskRow label="LTG Tasks" tasks={session.tasks} />
                )}
              </dl>
            ) : (
              <p className={styles.empty}>No session on {longDate}</p>
            )}
          </div>
        </div>

        <div className={styles.footer}>
          <button type="button" className={styles.btn} onClick={() => onChangeDate?.(selected)}>
            Change Date
          </button>
          <button type="button" className={styles.btn} onClick={onClose}>OK</button>
        </div>
      </div>
    </div>,
    document.body
  );
}

function Row({ label, value, extra, labelClass = "", valueClass = "" }) {
  return (
    <div className={styles.row}>
      <dt className={`${styles.label} ${labelClass}`}>{label}:</dt>
      <dd className={`${styles.value} ${valueClass}`}>
        {value}
        {extra && <span className={styles.extra}>{extra}</span>}
      </dd>
    </div>
  );
}

function TaskRow({ label = "Tasks", tasks }) {
  return (
    <Row
      label={label}
      labelClass={styles.greenText}
      valueClass={styles.greenText}
      value={tasks.length
        ? tasks.map((task, index) => <div key={`${task}-${index}`}>{task}</div>)
        : "No tasks assigned"}
    />
  );
}