import { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import styles from "./ObservationModal.module.css";

// Bold, italic, 3 align buttons, text color, highlight color, clear formatting
const modules = {
  toolbar: [
    ["bold", "italic","underline"],
    [{ align: "" }, { align: "center" }, { align: "right" }],
    [{ color: [] }, { background: [] }],
   
  ],
};


export default function ObservationModal({ sections, summary, onSave, onCancel }) {
  const [items, setItems] = useState(sections);
  const [summaryHtml, setSummaryHtml] = useState(summary ?? "");
  const [activeId, setActiveId] = useState(sections[0]?.id);

  const active = items.find((s) => s.id === activeId);

  const updateActive = (html) =>
    setItems((list) => list.map((s) => (s.id === activeId ? { ...s, html } : s)));

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} role="dialog" aria-label="Add New Observation">
        <header className={styles.header}>Add New Observation</header>

        <div className={styles.body}>
          {/* Row 1: section list + editor for the selected section */}
          <nav className={styles.list}>
            {items.map((section, index) => (
              <button
                key={section.id}
                type="button"
                className={section.id === activeId ? styles.activeItem : styles.item}
                onClick={() => setActiveId(section.id)}
              >
                {String.fromCharCode(65 + index)}. {section.title}
              </button>
            ))}
          </nav>
          <ReactQuill
            key={activeId}
            className={styles.editor}
            theme="snow"
            modules={modules}
            value={active?.html ?? ""}
            onChange={updateActive}
          />

          {/* Row 2: summary */}
          <div className={styles.list}>
            <span className={styles.item}>Summary</span>
          </div>
          <ReactQuill
            className={styles.editor}
            theme="snow"
            modules={modules}
            value={summaryHtml}
            onChange={setSummaryHtml}
          />
        </div>

        <footer className={styles.footer}>
          <button type="button" className={styles.cancel} onClick={onCancel}>Cancel</button>
          <button
            type="button"
            className={styles.save}
            onClick={() => onSave({ sections: items, summary: summaryHtml })}
          >
            Save
          </button>
        </footer>
      </div>
    </div>
  );
}