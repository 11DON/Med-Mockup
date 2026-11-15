import { useState } from "react";
import styles from "../PhysiotherapyPage.module.css";
import modalStyles from "../../scales/modals/PhysiotherapyModal.module.css";
import Section from "./Section.jsx";
import PhysiotherapyModal from "../../scales/modals/PhysiotherapyModal.jsx";
import ScaleAssessment from "../../scales/ScaleAssessment.jsx";
import { calculateScaleScore, getInitialScaleAnswers } from "../../scales/scaleScoring.js";
import { scaleCards, scaleOptions } from "../../../../../data/Physiotherapydata.js";
import { MODAL_TITLES, MODAL_FIELDS } from "../../scales/modals/Modalconfig.js";

function ModalField({ label, name, value, onChange, multiline = false }) {
  const Control = multiline ? "textarea" : "input";
  return (
    <label className={modalStyles.field}>
      <span>{label}</span>
      <Control
        name={name}
        value={value ?? ""}
        onChange={(event) => onChange(name, event.target.value)}
        required
      />
    </label>
  );
}

function ScalePicker({ selectedIds = [], onChange }) {
  const toggle = (id, checked) =>
    onChange(checked ? [...selectedIds, id] : selectedIds.filter((x) => x !== id));

  return (
    <table className={modalStyles.scaleTable}>
      <thead>
        <tr><th colSpan="2">Scale Name</th><th>Description</th></tr>
      </thead>
      <tbody>
        {scaleOptions.map((option) => (
          <tr key={option.id}>
            <td>
              <input
                type="checkbox"
                checked={selectedIds.includes(option.id)}
                onChange={(event) => toggle(option.id, event.target.checked)}
                aria-label={`Select ${option.title}`}
              />
            </td>
            <td>{option.title}</td>
            <td>{option.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function ScalesSection() {
  const [scales, setScales] = useState(scaleCards);
  const [modalType, setModalType] = useState(null); // "scales" | "scaleAssessment" | null
  const [values, setValues] = useState({});

  const openModal = (type, initialValues) => {
    setValues(initialValues);
    setModalType(type);
  };
  const closeModal = () => setModalType(null);
  const updateValue = (name, value) => setValues((current) => ({ ...current, [name]: value }));

  const saveScales = ({ selectedScaleIds = [] }) =>
    setScales((items) =>
      selectedScaleIds.map(
        (id) =>
          items.find((scale) => scale.id === id) ??
          { ...scaleOptions.find((option) => option.id === id), score: "Not assessed" },
      ),
    );

  const saveAssessment = ({ id, answers }) => {
    const { label } = calculateScaleScore(id, answers);
    setScales((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, answers, score: label, description: answers.comment?.trim() || item.description }
          : item,
      ),
    );
  };

  const handleSave = () => {
    if (modalType === "scales") saveScales(values);
    else saveAssessment(values);
    closeModal();
  };

  const modalTitle =
    modalType === "scaleAssessment"
      ? values.title || MODAL_TITLES.scaleAssessment
      : MODAL_TITLES[modalType];

  return (
    <Section
      id="scales-heading"
      title="Scales"
      action="Add New Scale"
      onAction={() => openModal("scales", { selectedScaleIds: scales.map((s) => s.id) })}
    >
      <div className={styles.scaleGrid}>
        {scales.map((scale) => (
          <article className={styles.scaleCard} key={scale.id}>
            <h3>{scale.title}</h3>
            <strong>{scale.score}</strong>
            <p>{scale.description}</p>
            <button
              type="button"
              className={styles.settings}
              aria-label={`Edit ${scale.title}`}
              onClick={() =>
                openModal("scaleAssessment", {
                  ...scale,
                  answers: scale.answers ?? getInitialScaleAnswers(scale.id),
                })
              }
            >
              ⚙
            </button>
          </article>
        ))}
      </div>

      {modalType && (
        <PhysiotherapyModal
          title={modalTitle}
          className={modalType === "scaleAssessment" && ["gmfm", "rom"].includes(values.id)
            ? modalStyles.wideAssessmentDialog
            : ""}
          onClose={closeModal}
          onSave={handleSave}
        >
          {modalType === "scales" && (
            <ScalePicker
              selectedIds={values.selectedScaleIds}
              onChange={(ids) => updateValue("selectedScaleIds", ids)}
            />
          )}

          {modalType === "scaleAssessment" && (
            <ScaleAssessment
              scale={values}
              answers={values.answers ?? {}}
              onAnswerChange={(name, value) =>
                setValues((current) => ({
                  ...current,
                  answers: { ...current.answers, [name]: value },
                }))
              }
            />
          )}

          {MODAL_FIELDS[modalType]?.map((field) => (
            <ModalField
              key={field.name}
              {...field}
              value={values[field.name]}
              onChange={updateValue}
            />
          ))}
        </PhysiotherapyModal>
      )}
    </Section>
  );
}