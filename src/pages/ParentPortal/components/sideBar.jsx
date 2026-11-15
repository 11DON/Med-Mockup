import { NavLink } from "react-router-dom";
import styles from "./sidebar.module.css";
import { IdCard, Mail } from "lucide-react";
const parentActions = ["Review Schedule", "Fill Scale Request"];
const navigation = [
  { label: "View Schedule", to: "/parent-portal/view-shedule" },
  { label: "Progress", to: "/parent-portal/progress-chart" },
  { label: "Milestones" , to: "/parent-portal/milestones-page"},
{ label: "Add New Patient", to: "/parent-portal/add-patient" },
  { label: "Message Center", to: "/parent-portal/message-center" },
  { label: "Home Exercise Program" },
  { label: "Active Child" },
  { label: "FAQs" },
];

export default function Sidebar({ children }) {
  return (
    <div className={styles.portalShell}>
      <header className={styles.header}>
        <h1 className={styles.title}>Parent Portal</h1>
        <div className={styles.account}>
          <div className={styles.headerIcons}>
            <div className={styles.mailMenu}>
              <button type="button" className={styles.iconButton} aria-label="Parent portal actions">
                <Mail size={28} strokeWidth={1.5} aria-hidden="true" />
              </button>
              <div className={styles.menu} aria-label="Parent portal actions">
                {parentActions.map((action) => (
                  <button type="button" className={styles.menuItem} key={action}>
                    {action}
                  </button>
                ))}
              </div>
            </div>
            <button type="button" className={styles.iconButton} aria-label="Parent profile">
              <IdCard size={28} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
          <small>Logged in as Parent</small>
        </div>
      </header>

      <section className={styles.patient} aria-label="Active child">
        <img src="/images/female.jpeg" alt="" className={styles.avatar} />
        <div className={styles.patientInfo}>
          <span className={styles.patientName}>Jana Mohamed Ismail</span>
          <span className={styles.age}>Age: 3 years, 6 months</span>
        </div>
        <span className={styles.gender}>Gender: Female</span>
        <span className={styles.arabicName} lang="ar" dir="rtl">جنا محمد إسماعيل</span>
      </section>

      <div className={styles.body}>
        <nav className={styles.sidebar} aria-label="Parent portal navigation">
          {navigation.map(({ label, to }) => (
            to ? (
              <NavLink
                to={to}
                end
                className={({ isActive }) =>
                  `${styles.navItem} ${isActive ? styles.active : ""}`
                }
                key={label}
              >
                {label}
              </NavLink>
            ) : (
              <button type="button" className={styles.navItem} key={label}>
                {label}
              </button>
            )
          ))}
        </nav>
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
