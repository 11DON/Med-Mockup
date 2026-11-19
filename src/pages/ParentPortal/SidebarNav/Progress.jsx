import ProgressChart from "./ProgressChart";
import GoalsSection from "../../EvalutePatientPage/taps/Evaluations/components/Goalssection.jsx";
import styles from "./Progress.module.css";

const data = [
  { session: 1, date: "16/11", value: 2 },
  { session: 2, date: "19/11", value: 4 },
  { session: 3, date: "23/11", value: 5.3 },
  { session: 4, date: "26/11", value: 5.3 },
  { session: 5, date: "30/11", value: 6 },
  { session: 6, date: "03/12", value: 7.1 },
  { session: 7, date: "07/12", value: 8 },
];

export default function Progress() {
  return (
    <div className={styles.progressPage}>
      <GoalsSection
        className={styles.goals}
        showManagementActions={false}
      />
      <section className={styles.chartPanel} aria-label="Progress chart">
        <div className={styles.chart}>
          <ProgressChart
            data={data}
            dates={{ 8: "10/12", 9: "14/12" }}
            totalSessions={9}
            target={10}
            height={360}
          />
        </div>
      </section>
    </div>
  );
}