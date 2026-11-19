import styles from "./IepSchedule.module.css";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;
const pad = (v) => String(v).padStart(2, "0");

// call this in the wizard's validators
export function validateSchedule(value) {
  for (const s of value) {
    if (!TIME.test(s.from) || !TIME.test(s.to)) return `${s.day}: enter a valid time (HH:mm).`;
    if (s.to <= s.from) return `${s.day}: "To" must be after "From".`;
  }
  return "";
}

function TimeBox({ value, max, disabled, readOnly, onChange }) {
  const handleChange = (e) => {
    const v = e.target.value;
    if (v !== "" && Number(v) > max) return; // ignore values above the limit
    onChange(v);
  };

  return (
    <input
      type="number"
      min="0"
      max={max}
      className={styles.box}
      value={value}
      disabled={disabled}
      readOnly={readOnly}
      onChange={handleChange}
      onBlur={(e) => e.target.value && onChange(pad(e.target.value))}
    />
  );
}

export default function IepSchedule({ value = [], onChange, readOnly = false }) {
  const slotOf = (day) => value.find((s) => s.day === day);

  const toggle = (day) => {
    if (slotOf(day)) onChange(value.filter((s) => s.day !== day));
    else onChange([...value, { day, from: "", to: "" }]);
  };

  // key = "from" or "to", part = 0 (hours) or 1 (minutes)
  const setPart = (day, key, part, v) => {
    const parts = slotOf(day)[key].split(":");
    parts[part] = v;
    const time = `${parts[0] || ""}:${parts[1] || ""}`;
    onChange(value.map((s) => (s.day === day ? { ...s, [key]: time } : s)));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <span />
        <span className={styles.header}>Day</span>
        <span className={styles.header}>From<br />HH:mm</span>
        <span className={styles.header}>To<br />HH:mm</span>
      </div>

      {DAYS.map((day) => {
        const slot = slotOf(day);
        const [fromH = "", fromM = ""] = slot ? slot.from.split(":") : [];
        const [toH = "", toM = ""] = slot ? slot.to.split(":") : [];

        const box = (key, part, val, max) => (
          <TimeBox
            value={val}
            max={max}
            disabled={!slot}
            readOnly={readOnly}
            onChange={(v) => setPart(day, key, part, v)}
          />
        );

        return (
          <div className={styles.row} key={day}>
            <input
              type="checkbox"
              className={styles.check}
              checked={!!slot}
              disabled={readOnly}
              onChange={() => toggle(day)}
            />
            <span className={styles.day}>{day}</span>
            <div className={styles.group}>
              {box("from", 0, fromH, 23)}
              {box("from", 1, fromM, 59)}
            </div>
            <div className={styles.group}>
              {box("to", 0, toH, 23)}
              {box("to", 1, toM, 59)}
            </div>
          </div>
        );
      })}
    </div>
  );
}