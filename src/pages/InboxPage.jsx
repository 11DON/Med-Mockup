import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Group, Panel, Separator } from "react-resizable-panels";
import { patients } from "../data/patients.js";
import { taskTypes } from "../data/taskTypes.js";
import { roles } from "../data/roles.js";
import { useRole } from "../pages/PortalLayout/RoleContext.jsx";
import { useIsMobile } from "../pages/hooks/useIsMobile.js";
import TaskList from "../components/TaskCard/TaskList.jsx";
import DetailsPanel from "../components/DetailsPanel/DetailsPanel.jsx";
import styles from "./InboxPage.module.css";

export default function InboxPage() {
  const { role, logout } = useRole();

  const visible = patients.filter(
    (p) => p.type && p.type === roles[role]?.taskType
  );

  const [selectedId, setSelectedId] = useState(visible[0]?.id);
  const selected = visible.find((p) => p.id === selectedId);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const selectedTaskType = taskTypes[selected?.type];
  const handleDetails = selected && selectedTaskType
    ? () => navigate(selectedTaskType.path(selected))
    : undefined;

  const handleSelect = (id) => {
    const task = visible.find((p) => p.id === id);
    const type = taskTypes[task?.type];
    if (type?.openOnSelect) navigate(type.path(task));
    else setSelectedId(id);
  };

  const taskList = (
    <TaskList tasks={visible} selectedId={selectedId} onSelect={handleSelect} />
  );
  const details = (
    <DetailsPanel patient={selected?.patient} onDetails={handleDetails} />
  );

  return (
    <>
      <div className={styles.gridContainer}>
        {isMobile ? (
          <div className={styles.stacked}>
            {taskList}
            {details}
          </div>
        ) : (
          <Group orientation="horizontal" style={{ height: "auto" }}>
            <Panel defaultSize="40%" minSize="18%" maxSize="50%">
              {taskList}
            </Panel>
            <Separator className={styles.divider} />
            <Panel minSize="60%">{details}</Panel>
          </Group>
        )}
      </div>
      <button
        type="button"
        className={styles.logoutButton}
        onClick={() => {
          logout();
          navigate("/");
        }}
      >
        Logout
      </button>
    </>
  );
}