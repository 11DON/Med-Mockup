import { useState } from "react";
import DOMPurify from "dompurify";
import styles from "./PhysiotherapyPage.module.css";
import modalStyles from "./scales/modals/PhysiotherapyModal.module.css";
import PhysiotherapyModal from "./scales/modals/PhysiotherapyModal.jsx";
import ObservationModal from "./scales/modals/ObservationModal.jsx";
import ScaleAssessment from "./scales/ScaleAssessment.jsx";
import { calculateScaleScore, getInitialScaleAnswers } from "./scales/scaleScoring.js";
import GoalModal from "./scales/modals/GoalModal.jsx";
import AssignTasksModal from "./scales/modals/AssignTasksModal.jsx";
import ActivityModal from "./scales/modals/ActivityModal.jsx";
import {
  scaleCards,
  scaleOptions,
  initialSummary,
  initialPlan,
  initialObservations,
  initialGoals,
  initialActivities,
  taskCatalog,          
  suggestedActivities,  
} from "./scales/modals/Physiotherapydata.js";
import { MODAL_TITLES, MODAL_FIELDS, emptyValues } from "./scales/modals/Modalconfig.js";
import PlanModal from "./scales/modals/PlanModal.jsx";
const STG_1_1_ACTIVITY_COUNT = 2;

function Section({
  id,
  title,
  action,
  onAction,
  showPlus = true,
  className = "",
  children,
}) {
  return (
    <section className={`${styles.section} ${className}`} aria-labelledby={id}>
      <div className={styles.sectionHeader}>
        <h2 id={id}>{title}</h2>
        <button type="button" className={styles.addButton} onClick={onAction}>
          {showPlus && <span aria-hidden="true">+</span>} {action}
        </button>
      </div>
      {children}
    </section>
  );
}
const CUSTOM_MODALS = ["observation", "plan", "goal", "assignTasks", "activity"];

function RichText({ html }) {
  return (
    <div
      className="ql-editor"
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
    />
  );
}

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

export default function PhysiotherapyPage({ onBack }) {
  const [scaleItems, setScaleItems] = useState(scaleCards);
  // Observations are stored as { id, title, html } for the rich text editor
  const [observationItems, setObservationItems] = useState(() =>
    initialObservations.map(({ title, points }, i) => ({
      id: `obs-${i}`,
      title,
      html: `<ul>${points.map((p) => `<li>${p}</li>`).join("")}</ul>`,
    })),
  );


  const [summary, setSummary] = useState(initialSummary);
  const [plan, setPlan] = useState(initialPlan);
  const [goalItems, setGoalItems] = useState(initialGoals);
  const [activeGoal, setActiveGoal] = useState(0);
  const [activityItems, setActivityItems] = useState(initialActivities);
  const [activeActivity, setActiveActivity] = useState(0);
  const [modalType, setModalType] = useState(null);
  const [modalValues, setModalValues] = useState({});

  const openModal = (type, values = {}) => {
    setModalValues(values);
    setModalType(type);
  };



  const updateModalValue = (name, value) =>
    setModalValues((current) => ({ ...current, [name]: value }));

  // What happens on "Save" for each simple modal type
  // (observation + summary are handled by ObservationModal)
  const saveHandlers = {
    scales: ({ selectedScaleIds = [] }) => {
      setScaleItems((items) =>
        selectedScaleIds.map((id) =>
          items.find((scale) => scale.id === id) ??
          { ...scaleOptions.find((option) => option.id === id), score: "Not assessed" },
        ),
      );
    },

    scaleAssessment: ({ id, answers }) => {
      const { label } = calculateScaleScore(id, answers);
      setScaleItems((items) =>
        items.map((item) =>
          item.id === id
            ? {
              ...item,
              answers,
              score: label,
              description: answers.comment?.trim() || item.description,
            }
            : item,
        ),
      );
    },

    plan: ({ frequency, duration, diagnosis, interventions }) =>
      setPlan({ frequency, duration, diagnosis, interventions }),

    goal: ({ title, duration, baseline, criteria, description }) => {
      const details = [
        `Duration: ${duration}.`,
        `Baseline: ${baseline}`,
        `Criteria: ${criteria}`,
        `Full Description: ${description}`,
      ];
      setGoalItems((items) => [...items, { title, children: [], details }]);
      setActiveGoal(goalItems.length);
    },

    activity: ({ title, frequency, dosage, setup }) => {
      setActivityItems((items) => [...items, { title, frequency, dosage, setup }]);
      setActiveActivity(activityItems.length);
    },
  };

  const saveModal = () => {
    saveHandlers[modalType](modalValues);
    setModalType(null);
  };

  const selectedGoal = goalItems[activeGoal] ?? goalItems[0];
  const selectedActivity = activityItems[activeActivity] ?? activityItems[0];

  const renderActivityButton = (activity, index) => (
    <li key={`${activity.title}-${index}`}>
      <button
        type="button"
        className={styles.activity}
        onClick={() => setActiveActivity(index)}
      >
        {activity.title}
      </button>
    </li>
  );

  return (
    <main className={styles.page}>
      <div className={styles.pageHeading}>
        <h1>Physiotherapy (PT)</h1>
        <button type="button" className={styles.backButton} onClick={onBack}>
          Back to Evaluate
        </button>
      </div>

      <Section
        id="scales-heading"
        title="Scales"
        action="Add New Scale"
        onAction={() => openModal("scales", { selectedScaleIds: scaleItems.map((s) => s.id) })}
      >
        <div className={styles.scaleGrid}>
          {scaleItems.map((scale) => (
            <article className={styles.scaleCard} key={scale.id}>
              <h3>{scale.title}</h3>
              <strong>{scale.score}</strong>
              <p>{scale.description}</p>
              <button
                type="button"
                className={styles.settings}
                aria-label={`Edit ${scale.title}`}
                onClick={() => openModal("scaleAssessment", {
                  ...scale,
                  answers: scale.answers ?? getInitialScaleAnswers(scale.id),
                })}
              >
                ⚙
              </button>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="observation-heading"
        title="Clinical Observation"
        action="Edit Observations And Summary"
        onAction={() => setModalType("observation")}
      >
        <div className={styles.observationList}>
          {observationItems.map((o) => (
            <article className={styles.observation} key={o.id}>
              <h3>{o.title}</h3>
              <RichText html={o.html} />
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="summary-heading"
        title="Summary"
        // action="Edit Summary"
        onAction={() => setModalType("observation")}
        showPlus={false}
        className={styles.summary}
      >
        <RichText html={summary} />
      </Section>

      <Section
        id="plan-heading"
        title="Plan"
        action="Edit Plan"
        className={styles.plan}
        onAction={() => setModalType("plan")}
      >
        <dl>
          <div><dt>Frequency:</dt><dd>{plan.frequencyCount} times per {plan.frequencyUnit}.</dd></div>
          <div><dt>Duration:</dt><dd>{plan.durationCount} {plan.durationUnit}.</dd></div>
          <div><dt>Diagnosis:</dt><dd>{plan.diagnosis}</dd></div>
          <div><dt>Interventions:</dt><dd><RichText html={plan.interventions} /></dd></div>
        </dl>
      </Section>

      <Section
        id="goals-heading"
        title="Goals"
        action="Add Goal"
        onAction={() => setModalType("goal")}
      >
        <div className={styles.goalsLayout}>
          <div className={styles.goalTree}>
            {goalItems.map((goal, index) => (
              <div className={styles.goalGroup} key={goal.title}>
                <button
                  type="button"
                  className={`${styles.goal} ${activeGoal === index ? styles.activeGoal : ""}`}
                  aria-pressed={activeGoal === index}
                  onClick={() => setActiveGoal(index)}
                >
                  <span aria-hidden="true">▸</span> {goal.title}
                </button>
                <ul>
                  {goal.children.map((child) => <li key={child}>{child}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <article className={styles.goalDetail}>
            <h3>{selectedGoal.title.replace(/^LTG \d: /, "")}</h3>
            <ul>
              {selectedGoal.details.map((detail) => <li key={detail}>{detail}</li>)}
            </ul>
            <ul>
              {(selectedGoal.taskIds ?? []).map((id) => (
                <li key={id}>Task: {taskCatalog.find((t) => t.id === id)?.title}</li>
              ))}
            </ul>
            <button type="button" className={styles.addButton} onClick={() => setModalType("assignTasks")}>
              Assign Tasks
            </button>
          </article>
        </div>
      </Section>

      <Section
        id="hep-heading"
        title="Home Exercise Program"
        action="Add Activity"
        onAction={() => setModalType("activity")}
      >
        <div className={styles.exerciseLayout}>
          <div className={styles.exerciseTree}>
            <h3>LTG 1: Independent Mobility (Target: 12 Weeks)</h3>
            <ul>
              <li>STG 1.1: Ankle Flexibility</li>
              {activityItems
                .slice(0, STG_1_1_ACTIVITY_COUNT)
                .map((activity, i) => renderActivityButton(activity, i))}
              <li>STG 1.2: Static Standing Balance</li>
              {activityItems
                .slice(STG_1_1_ACTIVITY_COUNT)
                .map((activity, i) => renderActivityButton(activity, i + STG_1_1_ACTIVITY_COUNT))}
            </ul>
            <h3>LTG 2: Goal-directed Transitions (Target: 12 Weeks)</h3>
            <ul>
              <li>STG 2.1: Transitional Strength</li>
              <li>Activity: Sit-to-Stand Treasure Hunt</li>
              <li>Activity: Bench Push-to-Stand</li>
            </ul>
          </div>
          <article className={styles.exerciseDetail}>
            <h3>Program: {selectedActivity.title}</h3>
            <p><strong>Frequency:</strong> {selectedActivity.frequency}</p>
            <p><strong>Dosage:</strong> {selectedActivity.dosage}</p>
            <p><strong>Setup:</strong> {selectedActivity.setup}</p>
          </article>
        </div>
      </Section>

      {/* Observation + summary have their own modal (own header, Cancel, Save) */}
      {modalType === "observation" && (
        <ObservationModal
          sections={observationItems}
          summary={summary}
          onCancel={() => setModalType(null)}
          onSave={({ sections, summary }) => {
            setObservationItems(sections);
            setSummary(summary);
            setModalType(null);
          }}
        />
      )}

      {modalType === "plan" && (
        <PlanModal
          plan={plan}
          onCancel={() => setModalType(null)}
          onSave={(newPlan) => {
            setPlan(newPlan);
            setModalType(null);
          }}
        />
      )}
      {modalType === "goal" && (
        <GoalModal
          parentGoals={goalItems.map((g) => g.title)}
          onCancel={() => setModalType(null)}
          onSave={(goal) => {
            setGoalItems((items) =>
              items.map((g, i) =>
                i === goal.parentIndex
                  ? {
                    ...g,
                    children: [...g.children, `STG: ${goal.title} (Target: ${goal.timeframe})`],
                    details: [...g.details, `${goal.title}: ${goal.description}`],
                  }
                  : g,
              ),
            );
            setActiveGoal(goal.parentIndex);
            setModalType(null);
          }}
        />
      )}

      {modalType === "assignTasks" && (
        <AssignTasksModal
          goalTitle={selectedGoal.title}
          tasks={taskCatalog}
          assignedIds={selectedGoal.taskIds ?? []}
          onCancel={() => setModalType(null)}
          onSave={(ids) => {
            setGoalItems((items) => items.map((g, i) => (i === activeGoal ? { ...g, taskIds: ids } : g)));
            setModalType(null);
          }}
        />
      )}

      {modalType === "activity" && (
        <ActivityModal
          goalTitle="STG 1.1: Ankle Flexibility"
          suggestions={suggestedActivities}
          onCancel={() => setModalType(null)}
          onSave={(newActivities) => {
            setActivityItems((items) => [...items, ...newActivities]);
            setActiveActivity(activityItems.length);
            setModalType(null);
          }}
        />
      )}
      {/* Every other modal uses the shared PhysiotherapyModal */}
      {modalType && !CUSTOM_MODALS.includes(modalType) && (
        <PhysiotherapyModal
          title={
            modalType === "scaleAssessment"
              ? modalValues.title || MODAL_TITLES.scaleAssessment
              : MODAL_TITLES[modalType]
          }
          onClose={() => setModalType(null)}
          onSave={saveModal}
        >
          {modalType === "scales" && (
            <ScalePicker
              selectedIds={modalValues.selectedScaleIds}
              onChange={(ids) => updateModalValue("selectedScaleIds", ids)}
            />
          )}

          {modalType === "scaleAssessment" && (
            <ScaleAssessment
              scale={modalValues}
              answers={modalValues.answers ?? {}}
              onAnswerChange={(name, value) =>
                setModalValues((current) => ({
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
              value={modalValues[field.name]}
              onChange={updateModalValue}
            />
          ))}

        </PhysiotherapyModal>
      )}
    </main>
  );
}