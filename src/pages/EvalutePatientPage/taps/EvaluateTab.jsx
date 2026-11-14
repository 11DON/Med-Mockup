import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRole } from "../../PortalLayout/RoleContext.jsx";
import { sendPatientEmail } from "../../../components/Buttons/sendEmail.js";
import styles from "./EvaluateTab.module.css";

const evaluationAreas = [
  { id: "physiotherapy", label: "Physiotherapy (PT)", checked: true },
  { id: "sensory-perceptual", label: "Sensory-Perceptual (OT)", checked: true },
  { id: "speech-language", label: "Speech-Language Pathology (SLP)" },
  { id: "occupational-therapy", label: "Occupational Therapy (OT)" },
  {
    id: "behavioral",
    label: "Behavioral, Emotional, & Social-Adaptive",
    checked: true,
  },
  {
    id: "assistive-technology",
    label: "Assistive Technology & Environmental Module",
  },
];

export default function EvaluateTab({ patient }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { role } = useRole();
  const IsNotParctitioner = role === "specialist" || role === "moderator";
  const [selectedAreas, setSelectedAreas] = useState(
    () => new Set(evaluationAreas.filter((area) => area.checked).map((area) => area.id)),
  );
  const [comment, setComment] = useState("");

  const toggleArea = (id) => {
    setSelectedAreas((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleAreaClick = (areaId) => {
    navigate(`/patients/${id}/assess/${areaId}`);
  };

  return (
    <div className={styles.content}>
      <div className={styles.areas} role="group" aria-label="Evaluation areas">
        {evaluationAreas.map(({ id: areaId, label }) => {
          const isLinkedArea =
            areaId === "physiotherapy" || areaId === "sensory-perceptual";

          return (
            <div className={styles.area} key={areaId}>
              <input
                type="checkbox"
                checked={selectedAreas.has(areaId)}
                onChange={() => toggleArea(areaId)}
                aria-label={`Select ${label}`}
              />

              {isLinkedArea && IsNotParctitioner ? (
                <button
                  type="button"
                  className={styles.areaLink}
                  onClick={() => handleAreaClick(areaId)}
                >
                  {label}
                </button>
              ) : (
                <span>{label}</span>
              )}
            </div>
          );
        })}
      </div>

      <fieldset className={styles.commentField}>
        <legend>Comment</legend>
        <textarea
          aria-label="Comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder={"<Free multi-line Text>\n<Line 2>\n<Line 3>\n<Line 4>"}
        />
      </fieldset>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.send}
          onClick={() => sendPatientEmail(patient)}
        >
          Send
        </button>
        <button type="button" className={styles.save}>
          Save
        </button>
      </div>
    </div>
  );
}
