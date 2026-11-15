import { useNavigate } from "react-router-dom";
import { useRole } from "../PortalLayout/RoleContext.jsx";
import styles from "./loginPage.module.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const { chooseRole } = useRole();

  const openTherapistPortal = () => {
    chooseRole("Therapist");
    navigate("/therapist-portal");
  };

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="login-title">
        <h1 id="login-title">Welcome</h1>
        <p>Choose how you would like to continue.</p>
        <div className={styles.options}>
          <button
            className={styles.option}
            onClick={() => navigate("/roles")}
          >
            Evaluator
          </button>
          <button
            className={styles.option}
            onClick={() => navigate("/parent-portal")}
          >
            Parent
          </button>
          <button className={styles.option} onClick={openTherapistPortal}>
            Therapist
          </button>
        </div>
      </section>
    </main>
  );
}