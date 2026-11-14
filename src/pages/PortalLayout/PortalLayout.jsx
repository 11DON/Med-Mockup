import { NavLink, Outlet, Navigate, Link, useMatch } from "react-router-dom";
import { roles } from "../../data/roles.js"
import { useRole } from "../PortalLayout/RoleContext.jsx";
import { patients } from "../../data/patients.js";
import styles from "./PortalLayout.module.css";

const links = [
  { to: "/patients", label: "Search Patient" },
  { to: "/addPatinets", label: "Add Patient" },
  { to: "/schedule", label: "View Schedule" },
  { to: "/messages", label: "Message Center" },
];

export default function PortalLayout() {
  const { role } = useRole();
  if (!roles[role]) return <Navigate to="/" replace />
  const unread = patients.filter((p) => p.type === roles[role].taskType).length;

  const isPatientInfoPage = useMatch({
    path: "/patients/:id",
    end: true,
  });
  const isEvaluatePatientPage = useMatch("/patients/:id/:tab/*");
  const hideSidebar = isPatientInfoPage || isEvaluatePatientPage;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>{roles[role].label} Portal</h1>

        <div className={styles.user}>
          <div className={styles.icons}>
            <Link to="/inbox" className={styles.mail}>
              ✉
              {unread > 0 && <span className={styles.badge}>{unread}</span>}
            </Link>
            <span>👤</span>
          </div>
          <small>Logged in as {roles[role].label}</small>
        </div>
      </header>

      <div className={`${styles.body} ${hideSidebar ? styles.bodyNoSidebar : ""}`}>
  {!hideSidebar && (
    <nav className={styles.sidebar}>
      {links.map((l) => (
        <NavLink
          key={l.to}
          to={l.to}
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          {l.label}
        </NavLink>
      ))}
    </nav>
  )}

  <main className={styles.content}>
    <Outlet />
  </main>
</div>
    </div>
  );
}