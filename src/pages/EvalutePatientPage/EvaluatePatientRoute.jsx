import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { patients } from "../../data/patients";
import { taskTypes } from "../../data/taskTypes";
import { roles } from "../../data/roles.js";
import { useRole } from "../PortalLayout/RoleContext.jsx";
import { initialForm } from "../AddPatientPage/AddPatientPage";
import { STEPS } from "../AddPatientPage/steps/PatientSteps.jsx";
import EvalutePatientPage from "./EvaluatePatientPage";

export default function EvalutePatientRoute() {
  const { id, tab, "*": subpage } = useParams();
  const navigate = useNavigate();
  const { role } = useRole();
  const task = patients.find((p) => String(p.id) === id);
  const [selectedAssessmentPage, setSelectedAssessmentPage] = useState(null);

  // hooks first, before any early return
  const [form, setForm] = useState({
    ...initialForm,
    main: { ...initialForm.main, ...task?.patient },
  });
  const set = (key) => (val) => setForm((prev) => ({ ...prev, [key]: val }));

  const type = taskTypes[task?.type];
  if (!task || !type) return <p>Patient not found.</p>;
  if (roles[role]?.taskType !== task.type) {
    return <Navigate to="/inbox" replace />;
  }

  // the URL tab must be one of this task's tabs
  if (!type.extraTabs.includes(tab)) {
    return <Navigate to={type.path(task)} replace />;
  }
  if (subpage && (tab !== "assess" || !["physiotherapy", "sensory-perceptual"].includes(subpage))) {
    return <Navigate to={`/patients/${id}/${tab}`} replace />;
  }

  const initialTab = STEPS.length + type.extraTabs.indexOf(tab);
  const assessmentPage = subpage || selectedAssessmentPage;

  return (
    <EvalutePatientPage
      form={form}
      set={set}
      extraKeys={type.extraTabs}
      initialTab={initialTab}
      assessmentPage={assessmentPage}
      onNavigateTab={(key) => {
        const selectedPage = subpage || selectedAssessmentPage;
        if (subpage) setSelectedAssessmentPage(subpage);
        const path =
          key === "assess" && selectedPage
            ? `/patients/${id}/assess/${selectedPage}`
            : `/patients/${id}/${key}`;
        navigate(path);
      }}
      onCancel={() => navigate("/")}
      onFinish={() => navigate("/")}
    />
  );
}