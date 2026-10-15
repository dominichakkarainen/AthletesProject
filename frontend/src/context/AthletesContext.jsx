import { useEffect, useReducer } from "react";
import axios from "axios";
import { AthletesContext } from "./AthletesContext";

const API_URL = "http://localhost:3001/api/athletes";

const initialState = {
  athletes: [],
  loading: false,
  error: null,
};

const athleteReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_ATHLETES":
      return {
        ...state,
        athletes: action.payload,
        loading: false,
        error: null,
      };

    case "ADD_ATHLETE":
      return {
        ...state,
        athletes: [action.payload, ...state.athletes],
        error: null,
      };

    case "UPDATE_ATHLETE":
      return {
        ...state,
        athletes: state.athletes.map((athlete) =>
          athlete.id === action.payload.id ? action.payload : athlete,
        ),
        error: null,
      };

    case "DELETE_ATHLETE":
      return {
        ...state,
        athletes: state.athletes.filter(
          (athlete) => athlete.id !== action.payload,
        ),
        error: null,
      };

    case "SET_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const AthletesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(athleteReducer, initialState);

  const fetchAthletes = async () => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const response = await axios.get(API_URL);
      dispatch({ type: "SET_ATHLETES", payload: response.data });
    } catch {
      dispatch({
        type: "SET_ERROR",
        payload: "Failed to load athletes. Check that the backend is running.",
      });
    }
  };

  const addAthlete = async (athleteData) => {
    try {
      const response = await axios.post(API_URL, athleteData);
      dispatch({ type: "ADD_ATHLETE", payload: response.data });
      return true;
    } catch {
      dispatch({
        type: "SET_ERROR",
        payload: "Failed to add athlete.",
      });
      return false;
    }
  };

  const updateAthlete = async (id, athleteData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, athleteData);
      dispatch({ type: "UPDATE_ATHLETE", payload: response.data });
      return true;
    } catch {
      dispatch({
        type: "SET_ERROR",
        payload: "Failed to update athlete.",
      });
      return false;
    }
  };

  const deleteAthlete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      dispatch({ type: "DELETE_ATHLETE", payload: id });
      return true;
    } catch {
      dispatch({
        type: "SET_ERROR",
        payload: "Failed to delete athlete.",
      });
      return false;
    }
  };

  useEffect(() => {
    fetchAthletes();
  }, []);

  return (
    <AthletesContext.Provider
      value={{
        athletes: state.athletes,
        loading: state.loading,
        error: state.error,
        fetchAthletes,
        addAthlete,
        updateAthlete,
        deleteAthlete,
      }}
    >
      {children}
    </AthletesContext.Provider>
  );
};
