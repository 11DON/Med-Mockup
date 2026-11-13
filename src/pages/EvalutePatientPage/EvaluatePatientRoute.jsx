import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { patients } from "../../data/patients";
import { taskTypes } from "../../data/taskTypes";
import { initialForm } from "../AddPatientPage/AddPatientPage";
import { STEPS } from "../AddPatientPage/steps/PatientSteps.jsx";
import EvalutePatientPage from "./EvaluatePatientPage";

export default function EvalutePatientRoute() {
  const { id, tab, "*": subpage } = useParams();
  const navigate = useNavigate();
  const task = patients.find((p) => String(p.id) === id);

  // hooks first, before any early return
  const [form, setForm] = useState({
    ...initialForm,
    main: { ...initialForm.main, ...task?.patient },
  });
  const set = (key) => (val) => setForm((prev) => ({ ...prev, [key]: val }));

  const type = taskTypes[task?.type];
  if (!task || !type) return <p>Patient not found.</p>;

  // the URL tab must be one of this task's tabs
  if (!type.extraTabs.includes(tab)) {
    return <Navigate to={type.path(task)} replace />;
  }

  const initialTab = STEPS.length + type.extraTabs.indexOf(tab);

  return (
    <EvalutePatientPage
      form={form}
      set={set}
      extraKeys={type.extraTabs}
      initialTab={initialTab}
      subpage={subpage}
      onBack={() => navigate(`/patients/${id}/${tab}`)}
      onCancel={() => navigate("/")}
      onFinish={() => navigate("/")}
    />
  );
}