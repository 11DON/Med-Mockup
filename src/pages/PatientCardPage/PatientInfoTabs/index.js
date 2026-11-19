import MainDataTab from "./tabs/MainData/MainDataTab.jsx";
import GuardiansTab from "./tabs/Guardians/GuardiansTab.jsx";
import PatientHistoryTab from "./tabs/PatientHistory/PatientHistoryTab.jsx";
import MedicalHistoryTab from "./tabs/MedicalHistory/MedicalHistoryTab.jsx";
import IepScheduleTab from "./tabs/Iep/IepScheduleTab.jsx";
import TimelineTab from "./tabs/Timeline/TimelineTab.jsx";
import CurrentStatusTab from "./tabs/CurrentStatusTab.jsx";

export const TABS = [
  { key: "main", label: "Main Data", Component: MainDataTab },
  { key: "guardians", label: "Guardians", Component: GuardiansTab },
  { key: "patient-history", label: "Patient History", Component: PatientHistoryTab },
  { key: "medical-history", label: "Medical History", Component: MedicalHistoryTab },
  { key: "iep", label: "IEP Schedule", Component: IepScheduleTab },
  { key: "timeline", label: "Timeline", Component: TimelineTab },
  { key: "status", label: "Current Status", Component: CurrentStatusTab },
];