import { useNavigate } from "react-router-dom";
import styles from "./loginPage.module.css";
import { roles } from "../../data/roles.js";
import { useRole } from "../PortalLayout/RoleContext.jsx";

export default function LoginPage() {
  const navigate = useNavigate();
  const { chooseRole } = useRole();
  const pick = (key) => {
    chooseRole(key);

    if (key === "Therapist") {
      navigate("/therapist-portal");
      return;
    }

    if (key === "ExternalPhysician") {
      navigate("/external-physician-portall");
      return;
    }

    navigate("/inbox");
  };


  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="login-title">
        <h1 id="login-title">Welcome</h1>
        <p>Choose how you would like to continue.</p>
        <div className={styles.options}>
          {Object.entries(roles).map(([key, r]) => (
            <button key={key} className={styles.option} onClick={() => pick(key)}>
              {r.label}
            </button>
          ))}
          <button
            className={styles.option}
            onClick={() => navigate("/parent-portal")}
          >
            Parent
          </button>
        </div>
      </section>
    </main>
  );
}