import { useState } from "react";
import GoalsSection from "./Evaluations/components/Goalssection";
import PlanSection from "./Evaluations/components/Plansection";
import ScheduleTimeline from "./Evaluations/components/timelineSchedule/Scheduletimeline";
import { useRole } from "../../PortalLayout/RoleContext.jsx";
import styles from "./ManageTasksTab.module.css";
import ScheduleModal from "./scales/modals/ViewSheduleModal.jsx";
import { initialPlan } from "../../../data/Physiotherapydata.js";
import { useNavigate } from "react-router-dom";
const TOTAL_SCHEDULE_WEEKS = 18;
const THERAPISTS = ["Amro Mahmoud"];

export default function ManageTasksTab({ page }) {
  const [schedule, setSchedule] = useState([]);
  const [domain, setDomain] = useState(
    page === "sensory-perceptual" ? page : "physiotherapy",
  );
  const [startDate, setStartDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [therapist, setTherapist] = useState(THERAPISTS[0]);
  const [plan, setPlan] = useState(initialPlan);
  const { role } = useRole();
  const [showSchedule, setShowSchedule] = useState(false);
  const navigate = useNavigate();

  const updateSchedule = (items) => {
    setSchedule(items);
  };

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

      <PlanSection plan={plan} onPlanChange={setPlan}modalScale={1.75}  />
      <GoalsSection
        scheduleItems={schedule}
        onScheduleChange={updateSchedule}
        totalWeeks={TOTAL_SCHEDULE_WEEKS}
        showManagementActions={false}
      />
      <ScheduleTimeline
        items={schedule}
        onChange={updateSchedule}
        totalWeeks={TOTAL_SCHEDULE_WEEKS}
      />
      <div className={styles.actions}>
        <button type="button" className={styles.send} onClick={() => navigate("/")}>
          Send
        </button>        <button type="button" className={styles.viewSchedule} onClick={() => setShowSchedule(true)}>View Schedule</button>
      </div>
      <ScheduleModal
        open={showSchedule}
        onClose={() => setShowSchedule(false)}
      />
    </div>
  );
}