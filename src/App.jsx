import { Routes, Route,useNavigate } from "react-router-dom";
import { RoleProvider } from "./pages/PortalLayout/RoleContext.jsx";
import PortalLayout from "./pages/PortalLayout/PortalLayout.jsx";
import RolePage from "./pages/PortalLayout/RolePage.jsx";
import LoginPage from "./pages/Login/loginPage.jsx";
import ParentPortalPage, { ParentPortalHome } from "./pages/ParentPortal/ParentPortalPage.jsx";
import MessageCenter from "./pages/ParentPortal/SidebarNav/MessageCenter.jsx";
import InboxPage from "./pages/InboxPage.jsx";
import SearchPatientPage from "./pages/searchPatient/SearchPatientPage.jsx";
import PatientCardPage from "./pages/PatientCardPage/PatientCardPage.jsx";
import AddPatientPage from "./pages/AddPatientPage/AddPatientPage.jsx";
import EvalutePatientRoute from "./pages/EvalutePatientPage/EvaluatePatientRoute.jsx";
import ViewSchedule from "./pages/ParentPortal/SidebarNav/ViewSchedule.jsx";
import ProgressChart from "./pages/ParentPortal/SidebarNav/Progress.jsx";
import MilestonesPage from "./pages/ParentPortal/SidebarNav/MileStones.jsx";

function AddPatientInPortal(){
  const navigate = useNavigate();
  return(
    <AddPatientPage
    onCancel={()=> navigate("/parent-portal")}
    onFinish={(patient)=> {
      console.log("Patient",patient);
      navigate("/parent-portal");
    }}
    />
  )
}

export default function App() {
  return (
    <RoleProvider>
      <Routes>
        {/* entry pages: no header or sidebar */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/roles" element={<RolePage />} />
        <Route path="/parent-portal" element={<ParentPortalPage />}>
          <Route index element={<ParentPortalHome />} />
          <Route path="message-center" element={<MessageCenter />} />
          <Route path="view-shedule" element={<ViewSchedule />} />
          <Route path="progress-chart" element={<ProgressChart />} />
          <Route path="milestones-page" element={<MilestonesPage />} />
          <Route path="add-patient" element={<AddPatientInPortal />} />
        </Route>

        {/* everything else lives inside the portal layout */}
        <Route element={<PortalLayout />}>
          <Route path="/inbox" element={<InboxPage />} />
          <Route path="/patients" element={<SearchPatientPage />} />
          <Route path="/patients/:id" element={<PatientCardPage />} />
          <Route
            path="/addPatinets"
            element={
              <AddPatientPage
                onCancel={() => console.log("cancelled")}
                onFinish={(patient) => console.log("Patient", patient)}
              />
            }
          />
          <Route path="/patients/:id/:tab/*" element={<EvalutePatientRoute />} />
        </Route>
      </Routes>
    </RoleProvider>
  );
}