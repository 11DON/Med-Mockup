import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { RoleProvider } from "./pages/PortalLayout/RoleContext.jsx";
import PortalLayout from "./pages/PortalLayout/PortalLayout.jsx";
import RolePage from "./pages/PortalLayout/RolePage.jsx";
import LoginPage from "./pages/Login/loginPage.jsx";
import ParentPortalPage, { ParentPortalHome } from "./pages/ParentPortal/ParentPortalPage.jsx";
import InboxPage from "./pages/InboxPage.jsx";
import SearchPatientPage from "./pages/searchPatient/SearchPatientPage.jsx";
import PatientCardPage from "./pages/PatientCardPage/PatientCardPage.jsx";
import AddPatientPage from "./pages/AddPatientPage/AddPatientPage.jsx";
import EvalutePatientRoute from "./pages/EvalutePatientPage/EvaluatePatientRoute.jsx";
import ViewSchedule from "./pages/ParentPortal/SidebarNav/ViewSchedule.jsx";
import ProgressChart from "./pages/ParentPortal/SidebarNav/Progress.jsx";
import MilestonesPage from "./pages/ParentPortal/SidebarNav/MileStones.jsx";
import MessageCenter from "./pages/ParentPortal/SidebarNav/MessageCenter.jsx";
import MessageList from "./pages/ParentPortal/SidebarNav/MessageList.jsx";
import NewMessage from "./pages/ParentPortal/SidebarNav/NewMessage.jsx";
import MessageThread from "./pages/ParentPortal/SidebarNav/MessageThread.jsx";
import HomeExercise from "./pages/ParentPortal/SidebarNav/HomeExercise.jsx";
import ActivityLogList from "./pages/ParentPortal/SidebarNav/ActivityLogList.jsx";
import NewActivityLog from "./pages/ParentPortal/SidebarNav/NewActivityLog.jsx";
import { ScheduleReviewProvider } from "./pages/ParentPortal/SidebarNav/ScheduleReviewContext.jsx";
import ReviewSchedule from "./pages/ParentPortal/SidebarNav/ReviewSchedule.jsx";
import FillScaleRequest from "./pages/ParentPortal/SidebarNav/FillScaleRequest.jsx";
import TherapistNav from "./pages/TherapistPortal/therapistNav.jsx";
import TherapistSessionPage from "./pages/TherapistPortal/TherapistSessionPage.jsx";
function AddPatientInPortal() {
  const navigate = useNavigate();
  return (
    <AddPatientPage
      onCancel={() => navigate("/parent-portal")}
      onFinish={(patient) => {
        console.log("Patient", patient);
        navigate("/parent-portal");
      }}
    />
  )
}

function TherapistSchedule() {
  const navigate = useNavigate();
  return (
    <ViewSchedule
      onSession={({ date, session }) =>
        navigate(`/therapist-portal/session?date=${date}&session=${session.no}`)
      }
      onDetails={() => navigate("/therapist-portal/patients/P-1001")}
    />
  );
}

export default function App() {
  return (
    <RoleProvider>
            <ScheduleReviewProvider>

      <Routes>
        {/* entry pages: no header or sidebar */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/roles" element={<RolePage />} />
        <Route path="/therapist-portal" element={<TherapistNav />}>
          <Route index element={<Navigate to="view-schedule" replace />} />
          <Route path="search-patient" element={<SearchPatientPage />} />
          <Route path="patients/:id" element={<PatientCardPage />} />
          <Route path="view-schedule" element={<TherapistSchedule />} />
          <Route path="session" element={<TherapistSessionPage />} />
          <Route path="message-center" element={<MessageCenter />}>
            <Route index element={<MessageList />} />
            <Route path="new" element={<NewMessage />} />
            <Route path=":id" element={<MessageThread />} />
          </Route>
        </Route>
        <Route path="/parent-portal" element={<ParentPortalPage />}>
          <Route index element={<ParentPortalHome />} />
          <Route path="message-center" element={<MessageCenter />}>
            <Route index element={<MessageList />} />
            <Route path="new" element={<NewMessage />} />
            <Route path=":id" element={<MessageThread />} />
          </Route>
          <Route path="view-shedule" element={<ViewSchedule />} />
          <Route path="progress-chart" element={<ProgressChart />} />
          <Route path="milestones-page" element={<MilestonesPage />} />
          <Route path="add-patient" element={<AddPatientInPortal />} />
          <Route path="home-exercise" element={<HomeExercise />}>
            <Route index element={<ActivityLogList />} />
            <Route path="new" element={<NewActivityLog />} />
          </Route>
            <Route path="review-schedule" element={<ReviewSchedule />} />   {/* new */}
          <Route path="fill-scale-request" element={<FillScaleRequest />} />

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
            </ScheduleReviewProvider>

    </RoleProvider>
  );
}