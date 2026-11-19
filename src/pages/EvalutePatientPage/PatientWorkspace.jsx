import { Navigate, useNavigate, useParams } from "react-router-dom";
import { patients } from "../../data/patients";
import { taskTypes, tabLabels } from "../../data/tasktypes";
import EvalutePatientRoute from "../EvalutePatientPage/EvaluatePatientRoute";

export default function PatientWorkspace() {
  const { id, tab } = useParams();
  const navigate = useNavigate();

  const task = patients.find((p) => String(p.id) === id);
  const type = taskTypes[task?.type];
  if (!task || !type) return <p>Patient not found.</p>;

  // tab not allowed for this task? go to its own tab
  if (!type.tabs.includes(tab)) {
    return <Navigate to={type.path(task)} replace />;
  }

  // the URL for each tab
  const tabPath = (key) => taskTypes[key === "tasks" ? "manage" : key].path(task);

  return (
    <div>
      <div role="tablist">
        {type.tabs.map((key) => (
          <button
            key={key}
            role="tab"
            aria-selected={tab === key}
            onClick={() => navigate(tabPath(key))}
          >
            {tabLabels[key]}
          </button>
        ))}
      </div>

      {tab === "evaluate" && <EvalutePatientRoute/>}
      {tab === "assess" && <p>Assessment page goes here</p>}
      {tab === "tasks" && <p>Manage Tasks page goes here</p>}
    </div>
  );
}