import styles from "../Evaluations/PhysiotherapyPage.module.css";
import ScalesSection from "./components/Scalessection.jsx";
import ObservationSection from "./components/Observationsection.jsx";
import PlanSection from "./components/Plansection.jsx";
import GoalsSection from "./components/Goalssection.jsx";
import ActivitiesSection from "./components/Activitiessection.jsx";
import EvaluationSectionNav from "./components/EvaluationSectionNav.jsx";

export default function PhysiotherapyPage() {
  return (
    <main className={styles.page}>
      <div className={styles.pageHeading}>
        <h1>Physiotherapy (PT)</h1>
      </div>
      <div className={styles.moduleLayout}>
        <EvaluationSectionNav />
        <div className={styles.moduleContent}>
          <ScalesSection />
          <ObservationSection />
          <PlanSection />
          <GoalsSection />
          <ActivitiesSection />
        </div>
      </div>
    </main>
  );
}