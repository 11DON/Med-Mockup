import { Outlet, useNavigate } from "react-router-dom";
import styles from "./ParentPortalPage.module.css";
import Sidebar from "./components/sideBar.jsx";
import { LogOut  } from 'lucide-react';
export default function ParentPortalPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <Sidebar>
        <Outlet />
      </Sidebar>

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

export function ParentPortalHome() {
  return (
    <section className={styles.home} aria-label="Patient card">

    </section>
  );
}