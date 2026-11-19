import { IdCard, Mail, LogOut} from "lucide-react";
import { NavLink, Outlet, useLocation,useNavigate  } from "react-router-dom";
import styles from "./TherapistNav.module.css";

const navigation = [
  { label: "Search Patient", to: "search-patient" },
  { label: "View Schedule", to: "view-schedule" },
  { label: "Message Center", to: "message-center" },
];

export default function TherapistNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className={styles.portalShell}>
      <header className={styles.header}>
        <h1 className={styles.title}>Physician Portal</h1>
        <div className={styles.account}>
          <div className={styles.headerIcons}>
            <NavLink
              to="message-center"
              className={styles.mail}
              aria-label="Messages (1 unread)"
            >
              <Mail size={28} strokeWidth={1.5} aria-hidden="true" />
              <span className={styles.badge}>1</span>
            </NavLink>
            <button type="button" className={styles.profile} aria-label="Therapist profile">
              <IdCard size={28} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
          <small>Logged in as Therapist</small>
        </div>
      </header>

      <div className={styles.body}>
        <nav className={styles.sidebar} aria-label="Therapist portal navigation">
          {navigation.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `${styles.navItem} ${
                  isActive || (to === "search-patient" && pathname.includes("/patients/"))
                    ? styles.active
                    : ""
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
      <div className={styles.bottomBar}>
        <button
          type="button"
          className={styles.logout}
          onClick={() => navigate("/")}
        >
                    <LogOut size={20}  strokeWidth={2} />

        </button>
      </div>
    </div>
  );
}
