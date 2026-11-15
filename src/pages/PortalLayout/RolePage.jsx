import { useNavigate } from "react-router-dom";
import { roles } from "../../data/roles.js";
import { useRole } from "../PortalLayout/RoleContext.jsx";
import styles from "./RolePage.module.css";

export default function RolePage() {
  const { chooseRole } = useRole();
  const navigate = useNavigate();

  const pick = (key) => {
    chooseRole(key);
    navigate(key === "Therapist" ? "/therapist-portal" : "/inbox");
  };

  return (
    <div className={styles.page}>
      <h1>Choose your role</h1>
      {Object.entries(roles).map(([key, r]) => (
        <button key={key} className={styles.roleBtn} onClick={() => pick(key)}>
          {r.label}
        </button>
      ))}
    </div>
  );
}