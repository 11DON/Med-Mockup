import { Fragment, useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import styles from "./ViewSheduleModal.module.css";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const pad = (n) => String(n).padStart(2, "0");
const toKey = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;
const dayToneStyles = {
  green: styles.greenDay,
  blue: styles.blueDay,
};

function getItemsForWeek(scheduleItems, week) {
  return scheduleItems.filter(
    (item) => week >= item.start && week < item.start + item.weeks,
  );
}

function buildCalendarSessions({
  scheduleItems,
  startDate,
  therapist,
  room,
  duration,
  from,
  to,
}) {
  const [year, month, day] = (startDate ?? "").split("-").map(Number);
  if (!year || !month || !day) return {};

  const lastWeek = Math.max(
    0,
    ...scheduleItems.map((item) => item.start + item.weeks - 1),
  );
  const sessions = {};
  let sessionNo = 0;

  for (let week = 1; week <= lastWeek; week += 1) {
    const items = getItemsForWeek(scheduleItems, week);
    if (!items.length) continue;

    const longTermGoal = items.find((item) => item.type === "ltg");
    const shortTermGoals = items
      .filter((item) => item.type === "stg")
      .map((item) => ({
        id: item.id,
        label: item.label,
        tasks: [...new Set(item.tasks ?? [])],
      }));

    for (let dayInWeek = 0; dayInWeek < 7; dayInWeek += 1) {
      const date = new Date(year, month - 1, day + (week - 1) * 7 + dayInWeek);
      const dateKey = toKey(date.getFullYear(), date.getMonth(), date.getDate());
      sessionNo += 1;
      sessions[dateKey] = {
        sessionNo,
        week,
        therapist,
        room,
        duration,
        from,
        to,
        ltg: longTermGoal?.label ?? "",
        stgs: shortTermGoals,
        tasks: [...new Set(longTermGoal?.tasks ?? [])],
        tone: dayInWeek % 2 === 0 ? "green" : "blue",
      };
    }
  }

  return sessions;
}

export default function ScheduleModal({
  open,
  onClose,
  scheduleItems = [],
  startDate,
  therapist = "Amro Mahmoud",
  room = "Room 3",
  duration = 30,
  from = "10 AM",
  to = "10:30 AM",
  onChangeDate,
}) {
  const today = new Date();
  const [view, setView] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const [selected, setSelected] = useState(toKey(today.getFullYear(), today.getMonth(), today.getDate()));
  const sessions = useMemo(
    () => buildCalendarSessions({
      scheduleItems,
      startDate,
      therapist,
      room,
      duration,
      from,
      to,
    }),
    [scheduleItems, startDate, therapist, room, duration, from, to],
  );

  useEffect(() => {
    if (!open) return;
    const sessionDates = Object.keys(sessions).sort();
    if (sessionDates.length) {
      const selectedDate = sessionDates[Math.min(1, sessionDates.length - 1)];
      setSelected(selectedDate);
      const [year, month] = selectedDate.split("-").map(Number);
      setView({ y: year, m: month - 1 });
    }
  }, [open, sessions]);

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

  const session = sessions[selected];
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
                const daySession = sessions[key];
                const cls = [
                  styles.day,
                  daySession ? dayToneStyles[daySession.tone] : "",
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