import { Routes, Route, NavLink } from "react-router-dom";
import InboxPage from "./pages/InboxPage.jsx";
import SearchPatientPage from "./pages/searchPatient/SearchPatientPage.jsx";
import PatientCardPage from "./pages/PatientCardPage/PatientCardPage.jsx"
import styles from "./App.module.css";
import AddPatientPage from "./pages/AddPatientPage/AddPatientPage.jsx";
import EvalutePatientRoute from "./pages/EvalutePatientPage/EvaluatePatientRoute.jsx"
export default function App() {
  return (
    <>
      <h1 className={styles.mainTitle}>Pediatric Rehabilitation Management System</h1>

      <nav className={styles.nav}>
        <NavLink to="/" end className={({ isActive }) => isActive ? styles.navActive : styles.navLink}>
          Inbox
        </NavLink>
        <NavLink to="/patients" end className={({ isActive }) => isActive ? styles.navActive : styles.navLink}>
          Search Patient
        </NavLink>
        <NavLink to="/addPatinets" end className={({ isActive }) => isActive ? styles.navActive : styles.navLink}>
          Add Patient
        </NavLink>

      </nav>

      <Routes>
        <Route path="/" element={<InboxPage />} />
        <Route path="/patients" element={<SearchPatientPage />} />
        <Route path="/patients/:id" element={<PatientCardPage />} />
        <Route path="/addPatinets" element={<AddPatientPage
          onCancel={() => console.log("cancelled")}
          onFinish={(patient) => console.log("Patient")
          }

        />} />
        <Route path="/patients/:id/:tab/*" element={<EvalutePatientRoute />} />    </Routes>
    </>
  );
}