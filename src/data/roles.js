import { label } from "motion/react-client";

export const roles = {
  moderator: { label: "Moderator", taskType: "manage" },
  specialist: { label: "Specialist", taskType: "assess" },
  practitioner: { label: "Practitioner", taskType: "evaluate" },
  Therapist:{label:"Therapist",taskType:"therapist"},
  ExternalPhysician:{label:"External Physician",taskType:"externalP"}
};