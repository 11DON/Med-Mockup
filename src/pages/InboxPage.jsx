import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Group, Panel, Separator } from "react-resizable-panels";
import { patients } from "../data/patients.js";
import { taskTypes } from "../data/taskTypes.js";
import { useIsMobile } from "../pages/hooks/useIsMobile.js";
import TaskList from "../components/TaskCard/TaskList.jsx";
import DetailsPanel from "../components/DetailsPanel/DetailsPanel.jsx";
import styles from "./InboxPage.module.css";

export default function InboxPage() {
  const [selectedId, setSelectedId] = useState(patients[0].id);
  const selected = patients.find((p) => p.id === selectedId);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const taskType = taskTypes[selected?.type];
  const handleDetails = taskType
    ? () => navigate(taskType.path(selected))
    : undefined;

  const taskList = (
    <TaskList tasks={patients} selectedId={selectedId} onSelect={setSelectedId} />
  );
  const details = (
    <DetailsPanel patient={selected?.patient} onDetails={handleDetails} />
  );

  return (
    <>
      <h1 className={styles.pageTitle}>Inbox</h1>

      <div className={styles.gridContainer}>
        {isMobile ? (
          <div className={styles.stacked}>
            {taskList}
            {details}
          </div>
        ) : (
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