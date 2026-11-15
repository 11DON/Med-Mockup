import { useState } from "react";
import styles from "../PhysiotherapyPage.module.css";
import Section from "./Section.jsx";
import GoalsModalstg from "../../scales/modals/GoalsModalstg.jsx";
import AssignTasksModal from "../../scales/modals/AssignTasksModal.jsx";
import { initialGoals, taskCatalog } from "../../../../../data/Physiotherapydata.js";
import GoalModal from "../../scales/modals/GoalModal.jsx";
import { hasLtgOverlap } from "./timelineSchedule/scheduleUtils.js";
// One "Label: value" line in the goal detail panel
function GoalDetailItem({ detail, readOnly = false,
  milestoneId,
  renderDetailsFooter, }) {
  const separator = detail.indexOf(":");
  if (separator === -1) return <li>{detail}</li>;

  const label = detail.slice(0, separator);
  const value = detail.slice(separator + 1).trim();
  const isFullDescription = label.toLowerCase() === "full description";
  const isDuration = label.toLowerCase() === "duration";

  const valueClass = [
    styles.goalDetailValue,
    isDuration && styles.durationValue,
    isFullDescription && styles.fullDescriptionValue,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <li className={isFullDescription ? styles.fullDescription : ""}>
      <span className={styles.goalDetailLabel}>{label}:</span>
      {isFullDescription && <br />}
      <span className={valueClass}>{value}</span>
    </li>
  );
}

const getTargetWeeks = (title) => {
  const match = title.match(/\(Target:\s*(\d+)\s*Weeks?\)/i);
  return match ? Number(match[1]) : 1;
};

export default function GoalsSection({
  scheduleItems = [],
  onScheduleChange,
  totalWeeks = 18,
  showManagementActions = true,
  className = "",
  renderDetailsFooter
}) {
  const [goals, setGoals] = useState(initialGoals);
  const [activeGoal, setActiveGoal] = useState(0);
  const [activeChildIndex, setActiveChildIndex] = useState(null);
  const [startWeek, setStartWeek] = useState(1);
  const [modal, setModal] = useState(null);

  const selectedGoal = goals[activeGoal] ?? goals[0];
  const selectedChild = activeChildIndex === null
    ? null
    : selectedGoal.children[activeChildIndex];
  const closeModal = () => setModal(null);

  const selectedTitle = selectedChild ?? selectedGoal.title;
  const goalTitle = selectedTitle
    .replace(/^LTG \d:\s*/, "")
    .replace(/^STG(?:\s+[^:]+)?:\s*/, "")
    .replace(/\s*\(Target:[^)]+\)/, "");
  const scheduleId = selectedChild
    ? `stg-${activeGoal}-${activeChildIndex}`
    : `ltg-${activeGoal}`;
  const scheduleType = selectedChild ? "stg" : "ltg";
  const scheduleLabel = selectedTitle.replace(/\s*\(Target:[^)]+\)/, "");
  const nextSubgoalIndex = selectedChild
    ? selectedGoal.children.findIndex(
      (child, index) => index > activeChildIndex && child.startsWith("STG"),
    )
    : -1;
  const subgoalTasks = selectedChild
    ? selectedGoal.children
      .slice(activeChildIndex + 1, nextSubgoalIndex < 0 ? undefined : nextSubgoalIndex)
      .filter((child) => child.startsWith("Task"))
    : [];
  const assignedTasks = (selectedGoal.taskIds ?? [])
    .map((id) => taskCatalog.find((task) => task.id === id)?.title)
    .filter(Boolean);
  const scheduleTasks = selectedChild && subgoalTasks.length
    ? subgoalTasks
    : assignedTasks;
  const scheduleWeeks = Math.min(getTargetWeeks(selectedTitle), totalWeeks);
  const [scheduleError, setScheduleError] = useState("");
  const scheduledItem = scheduleItems.find((item) => item.id === scheduleId);
  const parentScheduledItem = scheduleType === "stg"
    ? scheduleItems.find((item) => item.id === `ltg-${activeGoal}`)
    : null;
  const minStartWeek = parentScheduledItem?.start ?? 1;
  const maxStartWeek = Math.min(
    totalWeeks - scheduleWeeks + 1,
    parentScheduledItem
      ? parentScheduledItem.start + parentScheduledItem.weeks - scheduleWeeks + 1
      : totalWeeks - scheduleWeeks + 1,
  );
  const canFitInParent = maxStartWeek >= minStartWeek;
  const lastStartWeek = Math.max(minStartWeek, maxStartWeek);
  const selectedStartWeek = Math.max(
    minStartWeek,
    Math.min(scheduledItem?.start ?? startWeek, lastStartWeek),
  );
  const selectGoal = (goalIndex, childIndex = null) => {
    setActiveGoal(goalIndex);
    setActiveChildIndex(childIndex);
    const id = childIndex === null
      ? `ltg-${goalIndex}`
      : `stg-${goalIndex}-${childIndex}`;
    const parent = childIndex === null
      ? null
      : scheduleItems.find((item) => item.id === `ltg-${goalIndex}`);
    setStartWeek(
      scheduleItems.find((item) => item.id === id)?.start ??
      parent?.start ??
      1,
    );
    setScheduleError("");
  };

  const addToSchedule = () => {
    if (!onScheduleChange) return;
    const parentId = `ltg-${activeGoal}`;
    const parent = scheduleItems.find((item) => item.id === parentId);
    if (scheduleType === "stg" && !parent) {
      setScheduleError("Add the LTG to the schedule first.");
      return;
    }
    if (scheduleType === "stg" && !canFitInParent) {
      setScheduleError("This STG is longer than its scheduled LTG.");
      return;
    }

    const item = {
      id: scheduleId,
      label: scheduleLabel,
      type: scheduleType,
      parentId: scheduleType === "stg" ? parentId : undefined,
      start: selectedStartWeek,
      weeks: scheduleWeeks,
      tasks: scheduleTasks,
    };
    if (hasLtgOverlap(scheduleItems, item)) {
      setScheduleError(`This ${scheduleType.toUpperCase()} overlaps another scheduled ${scheduleType.toUpperCase()}.`);
      return;
    }

    setScheduleError("");
    onScheduleChange([
      ...scheduleItems.filter((scheduled) => scheduled.id !== scheduleId),
      item,
    ]);
  };

  const removeFromSchedule = () => {
    onScheduleChange?.(scheduleItems.filter((item) =>
      item.id !== scheduleId && item.parentId !== scheduleId,
    ));
    setScheduleError("");
  };

  const changeStartWeek = (week) => {
    const candidate = {
      id: scheduleId,
      type: scheduleType,
      start: week,
      weeks: scheduleWeeks,
    };
    if (scheduleType === "stg" && parentScheduledItem && !canFitInParent) {
      setScheduleError("This STG is longer than its scheduled LTG.");
      return;
    }
    const delta = scheduledItem ? week - scheduledItem.start : 0;
    const movingItems = scheduleType === "ltg" && scheduledItem
      ? scheduleItems
        .filter((item) => item.id === scheduleId || item.parentId === scheduleId)
        .map((item) => ({
          ...item,
          start: item.id === scheduleId ? week : item.start + delta,
        }))
      : [candidate];
    const movingIds = new Set(movingItems.map((item) => item.id));
    if (movingItems.some((item) => hasLtgOverlap(scheduleItems, item, movingIds))) {
      setScheduleError(`This ${scheduleType.toUpperCase()} overlaps another scheduled ${scheduleType.toUpperCase()}.`);
      return;
    }

    setScheduleError("");
    setStartWeek(week);
    if (scheduledItem) {
      onScheduleChange(
        scheduleItems.map((item) => {
          if (!movingIds.has(item.id)) return item;
          return {
            ...item,
            start: item.id === scheduleId ? week : item.start + delta,
          };
        }),
      );
    }
  };

  const addSubGoal = (goal) => {
    setGoals((items) =>
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
    closeModal();
  };

  const assignTasks = (ids) => {
    setGoals((items) => items.map((g, i) => (i === activeGoal ? { ...g, taskIds: ids } : g)));
    const scheduledGoalId = `ltg-${activeGoal}`;
    if (scheduleItems.some((item) => item.id === scheduledGoalId)) {
      const tasks = ids
        .map((id) => taskCatalog.find((task) => task.id === id)?.title)
        .filter(Boolean);
      onScheduleChange?.(scheduleItems.map((item) =>
        item.id === scheduledGoalId ? { ...item, tasks } : item,
      ));
    }
    closeModal();
  };

  return (
    <Section
      id="goals-heading"
      title="Goals"
      className={className}
      action={showManagementActions ? "Add Goal" : undefined}
      onAction={showManagementActions ? () => setModal("goal") : undefined}
      secondaryAction={showManagementActions ? "Add STG" : undefined}
      onSecondaryAction={showManagementActions ? () => setModal("stg") : undefined}
    >
      <div className={styles.goalsLayout}>
        <div className={styles.goalTree}>
          {goals.map((goal, index) => (
            <div className={styles.goalGroup} key={goal.title}>
              <button
                type="button"
                className={`${styles.goal} ${activeGoal === index ? styles.activeGoal : ""}`}
                aria-pressed={activeGoal === index && activeChildIndex === null}
                onClick={() => selectGoal(index)}
              >
                <span aria-hidden="true">▸</span> {goal.title}
              </button>
              <ul className={styles.goalChildren}>
                {goal.children.map((child, childIndex) => (
                  <li
                    key={`${child}-${childIndex}`}
                    className={child.startsWith("STG") ? styles.subgoal : styles.goalTask}
                  >
                    {child.startsWith("STG") ? (
                      <button
                        type="button"
                        className={`${styles.goalChildButton} ${activeGoal === index && activeChildIndex === childIndex
                          ? styles.activeGoal
                          : ""
                          }`}
                        aria-pressed={activeGoal === index && activeChildIndex === childIndex}
                        onClick={() => selectGoal(index, childIndex)}
                      >
                        {child}
                      </button>
                    ) : child}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <article className={styles.goalDetail}>
          <ul className={styles.goalDetailsList}>
            <GoalDetailItem detail={`Title: ${goalTitle}`} />
            {selectedGoal.details.map((detail) => (
              <GoalDetailItem key={detail} detail={detail} />
            ))}
          </ul>
          <ul>
            {(selectedGoal.taskIds ?? []).map((id) => (
              <li key={id}>Task: {taskCatalog.find((t) => t.id === id)?.title}</li>
            ))}
          </ul>
          {renderDetailsFooter?.({ id: scheduleId, title: scheduleLabel })}
          {showManagementActions && (
            <button type="button" className={styles.addButton} onClick={() => setModal("assignTasks")}>
              Assign Tasks
            </button>
          )}
          {onScheduleChange && (
            <div className={styles.scheduleControls}>
              <label htmlFor="goal-start-week">Start at:</label>
              <select
                id="goal-start-week"
                value={selectedStartWeek}
                onChange={(event) => changeStartWeek(Number(event.target.value))}
                disabled={!canFitInParent}
              >
                {Array.from(
                  { length: lastStartWeek - minStartWeek + 1 },
                  (_, index) => minStartWeek + index,
                ).map((week) => (
                  <option key={week} value={week}>Week {week}</option>
                ))}
              </select>
              <div className={styles.scheduleActions}>
                <button type="button" className={styles.scheduleAction} onClick={addToSchedule}>
                  <span aria-hidden="true">+</span> Add to Schedule
                </button>
                <button
                  type="button"
                  className={styles.scheduleAction}
                  onClick={removeFromSchedule}
                  disabled={!scheduledItem}
                >
                  <span aria-hidden="true">×</span> Remove from Schedule
                </button>
              </div>
              {scheduleError && <p className={styles.scheduleError} role="alert">{scheduleError}</p>}
            </div>
          )}
        </article>
      </div>

      {modal === "goal" && (
        <GoalModal
          parentGoals={goals.map((g) => g.title)}
          onCancel={closeModal}
          onSave={addSubGoal}
        />
      )}

      {modal === "stg" && (
        <GoalsModalstg
          parentGoals={goals.map((g) => g.title)}
          onCancel={closeModal}
          onSave={addSubGoal}
        />
      )}

      {modal === "assignTasks" && (
        <AssignTasksModal
          goalTitle={selectedGoal.title}
          tasks={taskCatalog}
          assignedIds={selectedGoal.taskIds ?? []}
          onCancel={closeModal}
          onSave={assignTasks}
        />
      )}
    </Section>
  );
}
