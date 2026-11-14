import { useNavigate, useParams } from "react-router-dom";
import { useRole } from "../../PortalLayout/RoleContext.jsx";
import NeuroMusculoskeletal from "./Evaluations/NeuroMusculoskeletal.jsx";
import PhysiotherapyPage from "./Evaluations/PhysiotherapyPage.jsx";
import styles from "./Evaluations/PhysiotherapyPage.module.css";

export default function AssessmentTab({ page }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const { role } = useRole();
    const currentDomain = page === "sensory-perceptual" ? page : "physiotherapy";

    return (
        <div>
            {role === "moderator" && (
                <div className={styles.serviceDomain}>
                    <label htmlFor="assessment-service-domain">Service Domain:</label>
                    <select
                        id="assessment-service-domain"
                        value={currentDomain}
                        onChange={(event) =>
                            navigate(`/patients/${id}/assess/${event.target.value}`)
                        }
                    >
                        <option value="physiotherapy">Physiotherapy (PT)</option>
                        <option value="sensory-perceptual">Neuro-Musculoskeletal (PT/OT)</option>
                    </select>
                </div>
            )}
            {currentDomain === "sensory-perceptual"
                ? <NeuroMusculoskeletal />
                : <PhysiotherapyPage />}
        </div>
    );
}