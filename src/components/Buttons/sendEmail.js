export const sendPatientEmail = (patient) => {
    if (!patient) return;

    const email = "doctor@gmail.com"
    const subject = `Patient Details : ${patient.nameEn}`
    const body = `Patient Information Summary:\n\n` +
        `Name (EN): ${patient.nameEn}\n` +
        `Name (AR): ${patient.nameAr}\n` +
        `Age/Gender: ${patient.age} / ${patient.gender}\n` +
        `Passport/National ID: ${patient.nationalId}\n` +
        `Nationality: ${patient.nationality}`;

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;}