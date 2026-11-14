import MainDataStep from "../steps/MainData/MainDataStep.jsx";
import GuardiansStep, { emptyGuardian } from "../steps/Guardians/GuardiansStep.jsx";
import PatientHistoryStep from "../steps/PatientH/PatientHistoryStep.jsx";
import MedicalHistoryStep from "../steps/MedicalH/MedicalHistoryStep.jsx";
import IepSchedule from "../../PatientCardPage/PatientInfoTabs/tabs/Iep/IepScheduleTab.jsx";
import { validateSchedule } from "../formUtils.js";
import EvaluateTab from "../../EvalutePatientPage/taps/EvaluateTab.jsx";
import AssessmentTab from "../../EvalutePatientPage/taps/AssessmentTab.jsx";
import ManageTasksTab from "../../EvalutePatientPage/taps/ManageTasksTab.jsx"
export const STEPS = [
    "Main Data",
    "Guardians",
    "Patient History",
    "Medical History",
    "IEP Schedule"
];

export const validators = [
    (f) => (!f.main.nameEn || !f.main.nationalId || !f.main.birthdate
        ? "Please fill in the name, ID and birthdate."
        : ""),
    (f) => (f.guardians.some((g) => !g.nameEn || !g.phone)
        ? "Each guardian needs a name and a phone number."
        : ""),
    () => "",
    () => "",
    (f) => validateSchedule(f.iep),
];

export function StepContent({ index, form, set }) {
    return [
        <MainDataStep value={form.main} onChange={set("main")} />,
        <GuardiansStep value={form.guardians} onChange={set("guardians")} />,
        <PatientHistoryStep value={form.history} onChange={set("history")} />,
        <MedicalHistoryStep value={form.medical} onChange={set("medical")} />,
        <IepSchedule value={form.iep} onChange={set("iep")} />
    ][index];
}

export const EXTRA_TABS = {
    evaluate: { label: "Evaluate", render: (form) => <EvaluateTab patient={form.main} /> },
    assess: { label: "Assessment", render: (_form, page) => <AssessmentTab page={page} /> },
    tasks: { label: "Manage Tasks", render: () => <ManageTasksTab /> },
};