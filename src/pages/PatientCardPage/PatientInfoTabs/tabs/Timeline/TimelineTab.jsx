import styles from "./Timeline.module.css";

const EVENTS = [
  { date: "05-Aug-26", title: "Patient Onboarding", type: "onboarding" },
  { date: "07-Aug-26", title: "Patient Assessment", type: "assessment" },
  { date: "15-Aug-26", title: "Session 1",  sub: "Sensory Integration", type: "session" },
  { date: "19-Aug-26", title: "Session 2",  sub: "Sensory Integration", type: "session" },
  { date: "23-Aug-26", title: "Session 3",  sub: "Hydrotherapy",        type: "session" },
  { date: "03-Sep-26", title: "Session 4",  sub: "Sensory Integration", type: "session" },
  { date: "07-Sep-26", title: "Session 5",  sub: "Sensory Integration", type: "session" },
  { date: "11-Sep-26", title: "Session 6",  sub: "Hydrotherapy",        type: "session" },
  { date: "19-Sep-26", title: "Session 7",  sub: "Sensory Integration", type: "session" },
  { date: "23-Sep-26", title: "Session 8",  sub: "Sensory Integration", type: "session" },
  { date: "27-Sep-26", title: "Session 9",  sub: "Hydrotherapy",        type: "session" },
  { date: "05-Oct-26", title: "Session 10", sub: "Sensory Integration", type: "session" },
  { date: "09-Oct-26", title: "Session 11", sub: "Sensory Integration", type: "session" },
  { date: "13-Oct-26", title: "Session 12", sub: "Hydrotherapy",        type: "session" },
  { date: "21-Oct-26", title: "Session 13", sub: "Sensory Integration", type: "session" },
  { date: "25-Oct-26", title: "Session 14", sub: "Sensory Integration", type: "session" },
  { date: "29-Oct-26", title: "Session 15", sub: "Hydrotherapy",        type: "session" },
  { date: "01-Nov-26", title: "Patient Assessment", type: "assessment" },
];

export default function Timeline() {
  return (
    <div className={styles.scroll}>
      <div className={styles.timeline}>
        {EVENTS.map((e, i) => (
          <div
            key={i}
            className={`${styles.item} ${i % 2 === 0 ? styles.up : styles.down} ${styles[e.type]}`}
          >
            <div className={styles.label}>
              <div className={styles.date}>{e.date}</div>
              <div className={styles.title}>{e.title}</div>
              {e.sub && <div className={styles.sub}>{e.sub}</div>}
            </div>
            <span className={styles.stem} />
            <span className={styles.marker}>✕</span>
          </div>
        ))}
      </div>
    </div>
  );
}