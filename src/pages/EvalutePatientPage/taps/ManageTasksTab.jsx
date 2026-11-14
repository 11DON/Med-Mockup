import { useState } from "react";
import GoalsSection from "./Evaluations/components/Goalssection";
import PlanSection from "./Evaluations/components/Plansection";
import ScheduleTimeline from "./Evaluations/components/timelineSchedule/Scheduletimeline";
import { useRole } from "../../PortalLayout/RoleContext.jsx";
import styles from "./ManageTasksTab.module.css";

const TOTAL_SCHEDULE_WEEKS = 18;
const THERAPISTS = ["Amro Mahmoud"]; // replace with your real list

export default function ManageTasksTab({ page }) {
  const [schedule, setSchedule] = useState([]);
  const [domain, setDomain] = useState(
    page === "sensory-perceptual" ? page : "physiotherapy",
  );
  const [startDate, setStartDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [therapist, setTherapist] = useState(THERAPISTS[0]);
  const { role } = useRole();

  return (
    <div className={styles.manageTasks}>
      {role === "moderator" && (
        <div className={styles.toolbar}>
          <div className={styles.field}>
            <label htmlFor="service-domain">Service Domain:</label>
            <select
              id="service-domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            >
              <option value="physiotherapy">Physiotherapy (PT)</option>
              <option value="sensory-perceptual">Neuro-Musculoskeletal (PT/OT)</option>
            </select>
          </div>


          <div className={styles.field}>
            <label htmlFor="start-date">Start Date:</label>
            <input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="therapist">Therapist:</label>
            <select
              id="therapist"
              value={therapist}
              onChange={(e) => setTherapist(e.target.value)}
            >
              {THERAPISTS.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>         
        </div>
      )}

      <PlanSection />
      <GoalsSection
        scheduleItems={schedule}
        onScheduleChange={setSchedule}
        totalWeeks={TOTAL_SCHEDULE_WEEKS}
      />
      <ScheduleTimeline
        items={schedule}
        onChange={setSchedule}
        totalWeeks={TOTAL_SCHEDULE_WEEKS}
      />
      <div className={styles.actions}>
        <button type="button" className={styles.send}>Send</button>
        <button type="button" className={styles.viewSchedule}>View Schedule</button>
      </div>
    </div>
  );
}