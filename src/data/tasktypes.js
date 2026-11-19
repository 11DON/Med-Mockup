export const taskTypes = {
  evaluate: {
    label: "Evaluate Patient",
    path: (t) => `/patients/${t.id}/evaluate`,
    openOnSelect: true,
    extraTabs: ["evaluate"],
  },
  assess: {
    label: "Assess Patient",
    path: (t) => `/patients/${t.id}/assess`,
    openOnSelect: true,   // added
    extraTabs: ["evaluate", "assess"],
  },
  manage: {
    label: "Manage Tasks",
    path: (t) => `/patients/${t.id}/tasks`,
    openOnSelect: true,   // added
    extraTabs: ["evaluate", "assess", "tasks"],
  },
};