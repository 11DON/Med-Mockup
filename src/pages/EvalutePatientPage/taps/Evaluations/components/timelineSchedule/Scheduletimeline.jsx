import { useRef } from "react";
import styles from "./Scheduletimeline.module.css";

// header shade for each week (cycles if totalWeeks > 18)
const WEEK_SHADES = [
  "#d0d0d0", "#b5b5b5", "#9a9a9a", "#7a7a7a", "#4a4a4a", "#3a3a3a",
  "#3a3a3a", "#3a3a3a", "#7e7e7e", "#a0a0a0", "#c4c4c4", "#dedede",
  "#dedede", "#c4c4c4", "#a0a0a0", "#6a6a6a", "#4a4a4a", "#3a3a3a",
];

const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

// items: [{ id, label, type: "ltg" | "stg", start: 1-based week, weeks: length }]
export default function ScheduleTimeline({ items, onChange, totalWeeks = 18 }) {
  const gridRef = useRef(null);
  const drag = useRef(null);

  const moveTo = (item, start) => {
  const parent = items.find((i) => i.id === item.parentId);

  // an STG stays inside its LTG, anything else stays inside the grid
  const min = parent ? parent.start : 1;
  const max = parent
    ? Math.max(min, parent.start + parent.weeks - item.weeks)
    : totalWeeks - item.weeks + 1;

  const safeStart = clamp(start, min, max);
  if (safeStart === item.start) return;
  const delta = safeStart - item.start;

  onChange(
    items.map((i) => {
      if (i.id === item.id) return { ...i, start: safeStart };
      if (i.parentId === item.id) return { ...i, start: i.start + delta }; // STGs follow their LTG
      return i;
    }),
  );
};

  const handlePointerDown = (e, item) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { id: item.id, startX: e.clientX, startWeek: item.start };
  };

  const handlePointerMove = (e, item) => {
    if (drag.current?.id !== item.id) return;
    const weekWidth = gridRef.current.offsetWidth / totalWeeks;
    const shift = Math.round((e.clientX - drag.current.startX) / weekWidth);
    moveTo(item, drag.current.startWeek + shift);
  };

  const handleKeyDown = (e, item) => {
    if (e.key === "ArrowLeft") moveTo(item, item.start - 1);
    if (e.key === "ArrowRight") moveTo(item, item.start + 1);
  };

  return (
    <section className={styles.panel}>
      <h2 className={styles.title}>Overall Schedule</h2>

      <div
        ref={gridRef}
        className={styles.grid}
        style={{ gridTemplateColumns: `repeat(${totalWeeks}, 1fr)` }}
      >
        {Array.from({ length: totalWeeks }, (_, i) => (
          <div
            key={i}
            className={styles.week}
            style={{ background: WEEK_SHADES[i % WEEK_SHADES.length] }}
          >
            W{i + 1}
          </div>
        ))}

        {items.map((item, index) => (
          <div
            key={item.id}
            className={`${styles.bar} ${item.type === "ltg" ? styles.ltg : styles.stg}`}
            style={{
              gridColumn: `${item.start} / span ${item.weeks}`,
              gridRow: index + 2,
            }}
            tabIndex={0}
            title={`${item.label} (drag, or use the arrow keys)`}
            onPointerDown={(e) => handlePointerDown(e, item)}
            onPointerMove={(e) => handlePointerMove(e, item)}
            onPointerUp={() => (drag.current = null)}
            onKeyDown={(e) => handleKeyDown(e, item)}
          >
            {item.label}
          </div>
        ))}
      </div>
    </section>
  );
}