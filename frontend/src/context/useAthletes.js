import { useContext } from "react";
import { AthletesContext } from "./AthletesContext";

export const useAthletes = () => useContext(AthletesContext);
