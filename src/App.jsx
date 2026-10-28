import { useEffect, useState } from "react";
import { Group, Panel, Separator } from "react-resizable-panels";
import { patients } from "./data/TaskList/patients.js";
import TaskList from "./components/TaskCard/TaskList.jsx";
import DetailsPanel from "./components/DetailsPanel/DetailsPanel.jsx";
import styles from "./App.module.css";

// a Helper function to keep the stacked version of the tasks list on the smaller screens (removes the draggable bar between the two panels)
function useIsMobile(breakpoint = 800) {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia(`(max-width: ${breakpoint}px)`).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [breakpoint]);

  return isMobile;
}

export default function App() {
  const [selectedId, setSelectedId] = useState(patients[0].id);
  const selected = patients.find((p) => p.id === selectedId);
  const isMobile = useIsMobile();

  const taskList = (
    <TaskList tasks={patients} selectedId={selectedId} onSelect={setSelectedId} />
  );
  const details = <DetailsPanel patient={selected?.patient} />;

  return (
    <>
      <h1 className={styles.mainTitle}>Pediatric Rehabilitation Management System</h1>
      <h1 className={styles.pageTitle}>Inbox</h1>

      <div className={styles.gridContainer}>
        {isMobile ? (
          // Small screens: plain stacked layout, no divider
          <div className={styles.stacked}>
            {taskList}
            {details}
          </div>
        ) : (
          // Larger screens: resizable split
          <Group orientation="horizontal" style={{ height: "auto" }}>
            <Panel defaultSize="25%" minSize="18%" maxSize="50%">
              {taskList}
            </Panel>

            <Separator className={styles.divider} />

            <Panel minSize="40%">{details}</Panel>
          </Group>
        )}
      </div>
    </>
  );
}