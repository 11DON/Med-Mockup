const janaPatient = {
  patientId: "P-1001",
  nameEn: "Jana Mohamed Ismail",
  nameAr: "جنا محمد إسماعيل",
  nationality: "Egypt",
  nationalId: "1234567890123",
  birthDate: "12/5/2023",
  age: "3 years, 6 months",
  gender: "Female",
  avatar: "female.jpeg"
};

export const patients = [
  {
    id: 1,
    taskType: "Evaluate Patient",
    icon: "lookup.jpeg",
    urgent: false,
    patient: janaPatient,
    type:"evaluate"
  },
  {
    id: 7,
    taskType: "Evaluate Patient",
    icon: "lookup.jpeg",
    urgent: false,
    patient: {
      patientId: "P-1002",
      nameEn: "Ahmed Mostafa Nagy",
      nameAr: "أحمد مصطفى ناجي",
      nationality: "Egypt",
      nationalId: "1234567890124",
      birthDate: "15/08/2020",
      age: "6 years, 2 months",
      gender: "Male",
      avatar: "male.jpeg"
    },
    type: "evaluate"
  },
  {
    id: 5,
    taskType: "Assess Patient",
    icon: "todo.jpeg",
    urgent: false,
    patient: janaPatient,
    type: "assess"
  },
  {
    id: 6,
    taskType: "Manage Tasks",
    icon: "time.jpeg",
    urgent: false,
    patient: janaPatient,
    type: "manage"
  },
  {
    id: 2,
    taskType: "Assess Patient",
    icon: "todo.jpeg",
    urgent: false,
    patient: {
      patientId: "P-1002",
      nameEn: "Ahmed Mostafa Nagy",
      nameAr: "أحمد مصطفى ناجي",
      nationality: "Egypt",
      nationalId: "1234567890124",
      birthDate: "15/08/2020",
      age: "6 years, 2 months",
      gender: "Male",
      avatar: "male.jpeg"
    },
    type:"assess"
  },
  {
    id: 3,
    taskType: "Assess Patient",
    icon: "up.jpeg",
    urgent: true,
    patient: {
      patientId: "P-1003",
      nameEn: "Omar Ali Abo Elkheir",
      nameAr: "عمر علي أبو الخير",
      nationality: "Egypt",
      nationalId: "1234567890125",
      birthDate: "12/11/2021",
      age: "4 years, 11 months",
      gender: "Male",
      avatar: "male.jpeg"
    },
    
    type:"assess"
  },
  {
    id: 4,
    taskType: "Manage Tasks",
    icon: "time.jpeg",
    urgent: false,
    patient: {
      patientId: "P-1004",
      nameEn: "Omar Ali Abo Elkheir",
      nameAr: "عمر علي أبو الخير",
      nationality: "Egypt",
      nationalId: "1234567890125",
      birthDate: "12/11/2021",
      age: "4 years, 11 months",
      gender: "Male",
      avatar: "male.jpeg"

    },
    type:"manage"
  },
];

export function createPatient(form){
  patients.push({id:Date.now(),...form});
}