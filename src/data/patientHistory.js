export const patientHistory = {
  "P-1001": {
    baseSituation: {
      reasonOfReferral: "Evaluation of global developmental delay and recurrent seizures",
      chiefComplaint: "Delayed speech and motor milestones with recurrent seizures since infancy",
      history:
        "Male child, first seizure at 6 months. Sat unsupported at 12 months, not yet walking independently at 22 months. Only a few single words. Poor feeding and frequent chest infections in the first year.",
    },
    familyHistory: {
      consanguinity: true,
      heredofamilialDisease: "Maternal cousin with epilepsy and intellectual disability",
      siblings: 2,
      patientOrder: 2,
      similarConditions: true,
    },
    obstetric: {
      prenatal:
        "Mother had gestational hypertension and a urinary tract infection in the second trimester, treated with antibiotics",
      perinatal: "Preterm delivery at 32 weeks, delayed cry at birth, required oxygen support",
      isCesarean: true,
      assistance: "Forceps/Vacuum",
      presentationType: "Head",
      cesareanReason: "Fetal distress and failure to progress",
      laborDuration: 8,
      deliveryTime: "Preterm",
      deliveryWeek: 32,
      birthWeight: 2,
    },
    postnatal: {
      hospitalization: true,
      hospitalizationDuration: 8,
      convulsions: true,
      convulsionsControlled: true,
      otherConditions: "Neonatal jaundice treated with phototherapy; feeding difficulties",
    },
  },

  "P-1002": {
    baseSituation: {
      reasonOfReferral: "Speech delay and difficulty with social interaction",
      chiefComplaint: "Not speaking in sentences at age 3, limited eye contact",
      history:
        "Female child, 3 years old. Normal motor development, walked at 13 months. Says about 10 words, does not combine words, rarely responds to her name, and prefers playing alone. Repetitive hand-flapping noted by parents.",
    },
    familyHistory: {
      consanguinity: false,
      heredofamilialDisease: "None reported",
      siblings: 1,
      patientOrder: 1,
      similarConditions: false,
    },
    obstetric: {
      prenatal: "Uneventful pregnancy, regular follow-up, folic acid supplementation",
      perinatal: "Spontaneous labor at term, immediate cry, Apgar 9/10",
      isCesarean: false,
      assistance: "None",
      presentationType: "Head",
      cesareanReason: "N/A",
      laborDuration: 6,
      deliveryTime: "Term",
      deliveryWeek: 39,
      birthWeight: 3.2,
    },
    postnatal: {
      hospitalization: false,
      hospitalizationDuration: 0,
      convulsions: false,
      convulsionsControlled: false,
      otherConditions: "Recurrent otitis media in the first 2 years; hearing test normal",
    },
  },

  "P-1003": {
    baseSituation: {
      reasonOfReferral: "Uncontrolled seizures despite two antiepileptic drugs",
      chiefComplaint: "Frequent generalized tonic-clonic seizures, several per week",
      history:
        "Male child, 5 years old. Seizures started at 2 years, initially febrile then afebrile. Currently on valproate and levetiracetam with poor response. Mild regression in language and attention over the last 6 months.",
    },
    familyHistory: {
      consanguinity: true,
      heredofamilialDisease: "Paternal uncle with epilepsy",
      siblings: 3,
      patientOrder: 3,
      similarConditions: true,
    },
    obstetric: {
      prenatal: "Mild anemia treated with iron; no infections or medication exposure reported",
      perinatal: "Elective-urgent cesarean at term, cord around the neck, Apgar 6/8",
      isCesarean: true,
      assistance: "None",
      presentationType: "Breech",
      cesareanReason: "Breech presentation with fetal heart rate decelerations",
      laborDuration: 4,
      deliveryTime: "Term",
      deliveryWeek: 38,
      birthWeight: 2.9,
    },
    postnatal: {
      hospitalization: true,
      hospitalizationDuration: 5,
      convulsions: true,
      convulsionsControlled: false,
      otherConditions: "Transient hypoglycemia in the first 24 hours; sleep disturbance",
    },
  },

  "P-1004": {
    baseSituation: {
      reasonOfReferral: "Motor delay and abnormal muscle tone",
      chiefComplaint: "Stiff legs and difficulty walking, toe-walking",
      history:
        "Female child, 4 years old, born preterm. Rolled at 8 months, sat at 14 months, walks with support only. Increased tone in both legs with scissoring on assisted standing. Cognition appears age-appropriate.",
    },
    familyHistory: {
      consanguinity: false,
      heredofamilialDisease: "None reported",
      siblings: 0,
      patientOrder: 1,
      similarConditions: false,
    },
    obstetric: {
      prenatal: "Threatened preterm labor at 30 weeks managed with bed rest and antenatal steroids",
      perinatal: "Preterm vaginal delivery with instrumental assistance, weak cry, brief resuscitation",
      isCesarean: false,
      assistance: "Forceps/Vacuum",
      presentationType: "Head",
      cesareanReason: "N/A",
      laborDuration: 12,
      deliveryTime: "Preterm",
      deliveryWeek: 34,
      birthWeight: 1.9,
    },
    postnatal: {
      hospitalization: true,
      hospitalizationDuration: 21,
      convulsions: false,
      convulsionsControlled: false,
      otherConditions: "Respiratory distress syndrome requiring ventilation; intraventricular hemorrhage grade II",
    },
  },
};

export const getPatientHistory = (id) => patientHistory[id] ?? null;