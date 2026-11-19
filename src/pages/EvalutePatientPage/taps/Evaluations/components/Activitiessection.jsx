import { useEffect, useState } from "react";
import styles from "../PhysiotherapyPage.module.css";
import { useLocation } from "react-router-dom";
import Section from "./Section.jsx";
import ActivityModal from "../../scales/modals/ActivityModal.jsx";
import * as physioData from "../../../../../data/Physiotherapydata.js";
import * as neuroData from "../../../../../data/neuroData.js";
const STG_1_1_ACTIVITY_COUNT = 2;
const STG_1_2_ACTIVITY_COUNT = 2;

const getActivityName = (title = "") => title.replace(/^Activity \d+:\s*/, "");

export default function ActivitiesSection() {

  const { pathname } = useLocation();
  const isNeuroPage = pathname.includes("/sensory-perceptual");
  const pageData = isNeuroPage ? neuroData : physioData;
  const pageActivities = isNeuroPage
    ? neuroData.suggestedActivities
    : physioData.initialActivities;

  const [activities, setActivities] = useState(() => pageActivities);
  const [activeActivity, setActiveActivity] = useState(0);
  const [detailTitle, setDetailTitle] = useState(() =>
    getActivityName(pageActivities[0]?.title),
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setActivities(pageActivities);
    setActiveActivity(0);
    setDetailTitle(getActivityName(pageActivities[0]?.title));
  }, [pageActivities]);

  const selectedActivity = activities[activeActivity] ?? activities[0];

  const renderActivityButton = (activity, index) => (
    <li className={styles.exerciseTask} key={`${activity.title}-${index}`}>
      <button
        type="button"
        className={styles.activity}
        onClick={() => {
          setActiveActivity(index);
          setDetailTitle(getActivityName(activity.title));
        }}
      >
        {activity.title}
      </button>
    </li>
  );

  return (
    <Section
      id="hep-heading"
      title="Home Exercise Program"
      action="Add Activity"
      onAction={() => setIsOpen(true)}
    >
      <div className={styles.exerciseLayout}>
        <div className={styles.exerciseTree}>
          <h3 className={styles.exerciseGoal}>LTG 1: Independent Mobility (Target: 12 Weeks)</h3>
          <ul className={styles.goalChildren}>
            <li className={styles.exerciseSubgoal}>STG 1.1: Ankle Flexibility (Target: 4 Weeks)</li>
            {activities
              .slice(0, STG_1_1_ACTIVITY_COUNT)
              .map((activity, i) => renderActivityButton(activity, i))}
            <li className={styles.exerciseSubgoal}>STG 1.2: Static Standing Balance (Target: 6 Weeks)</li>
            {activities
              .slice(STG_1_1_ACTIVITY_COUNT, STG_1_1_ACTIVITY_COUNT + STG_1_2_ACTIVITY_COUNT)
              .map((activity, i) => renderActivityButton(activity, i + STG_1_1_ACTIVITY_COUNT))}
          </ul>

          <h3 className={styles.exerciseGoal}>LTG 2: Goal-directed Transitions (Target: 12 Weeks)</h3>
          <ul className={styles.goalChildren}>
            <li className={styles.exerciseSubgoal}>STG 2.1: Transitional Strength (Target: 6 Weeks)</li>
            {activities
              .slice(STG_1_1_ACTIVITY_COUNT + STG_1_2_ACTIVITY_COUNT)
              .map((activity, i) =>
                renderActivityButton(
                  activity,
                  i + STG_1_1_ACTIVITY_COUNT + STG_1_2_ACTIVITY_COUNT,
                ))}
          </ul>
        </div>

        <article className={styles.exerciseDetail}>
          <h3 className={styles.tile}><span className={styles.detailsLabel}>Title:</span> {detailTitle}</h3>
          {selectedActivity.frequency && (
            <p><span className={styles.detailsLabel}>Frequency:</span> {selectedActivity.frequency}</p>
          )}
          {selectedActivity.dosage && (
            <p><span className={styles.detailsLabel}>Dosage:</span> {selectedActivity.dosage}</p>
          )}
          {selectedActivity.safetyReminder && (
            <p>
              <span className={styles.detailsLabel}>Safety Reminder:</span>
                {selectedActivity.safetyReminder}
            </p>
          )}
          {selectedActivity.parentTip && (
            <p><span className={styles.detailsLabel}>Parent Tip:</span> {selectedActivity.parentTip}</p>
          )}
          {(selectedActivity.howTo || selectedActivity.setup || selectedActivity.description) && (
            <p>
              <span className={styles.detailsLabel}>
                {selectedActivity.howTo || selectedActivity.description ? "How to do it:" : "Setup:"}
              </span>{" "}
              {selectedActivity.howTo || selectedActivity.setup || selectedActivity.description}
            </p>
          )}
        </article>
      </div>

      {isOpen && (
        <ActivityModal
          goalTitle="STG 1.1: Ankle Flexibility"
          suggestions={pageData.suggestedActivities}
          onCancel={() => setIsOpen(false)}
          onSave={(newActivities) => {
            setActivities((items) => [...items, ...newActivities]);
            setActiveActivity(activities.length);
            if (newActivities[0]) {
              setDetailTitle(getActivityName(newActivities[0].title));
            }
            setIsOpen(false);
          }}
        />
      )}
    </Section>
  );
}