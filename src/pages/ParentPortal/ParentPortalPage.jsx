import { Outlet } from "react-router-dom";
import styles from "./ParentPortalPage.module.css";
import Sidebar from "./components/sideBar.jsx";

export default function ParentPortalPage() {
  return (
    <div className={styles.page}>
      <Sidebar>
        <Outlet />
      </Sidebar>
    </div>
  );
}

export function ParentPortalHome() {
  return (
    <section className={styles.home} aria-label="Patient card">
    
    </section>
  );
}
