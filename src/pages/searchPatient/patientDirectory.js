import { patients as tasks } from "../../data/patients.js";
import { patientDetails } from "../../data/patientDetails.js";

function buildDirectory(taskList){
    const byNationalId = new Map();
    for(const task of taskList){
        const p = task.patient
        if(!byNationalId.has(p.nationalId)){
            byNationalId.set(p.nationalId,p)
        }
    }
    return[...byNationalId.values()]
}
export const patientDirectory = buildDirectory(tasks);

export function searchPatients(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return patientDirectory.filter(
    (p) =>
      p.nameEn.toLowerCase().includes(q) ||
      p.nameAr.includes(q) ||
      p.nationalId.includes(q) ||
      p.patientId.toLowerCase().includes(q)
  );
}

export function getPatientById(patientId){
    const base = patientDirectory.find((p)=> p.patientId===patientId);
    if(!base) return null;
    return {...base,...(patientDetails[patientId] ?? {})}
}