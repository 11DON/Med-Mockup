export const taskTypes = {
  evaluate: { label: "Evaluate Patient", path: (t) => `/patients/${t.id}/evaluate` },
  assess:   { label: "Assess Patient",   path: (t) => `/patients/${t.id}/assess/${t.module}` },
  manage:   { label: "Manage Tasks",     path: (t) => `/patients/${t.id}/tasks` },
};