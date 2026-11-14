import { createContext, useContext, useState } from "react";
import { roles } from "../../data/roles.js";

const RoleContext = createContext(null);

export function RoleProvider({ children }) {
const [role, setRole] = useState(() => {
  const saved = sessionStorage.getItem("role");
  return roles[saved] ? saved : null;
});
  const chooseRole = (r) => {
    sessionStorage.setItem("role", r);
    setRole(r);
  };

  return (
    <RoleContext.Provider value={{ role, chooseRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export const useRole = () => useContext(RoleContext);