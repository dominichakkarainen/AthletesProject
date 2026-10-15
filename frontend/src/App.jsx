import AddAthlete from "./components/AddAthlete.jsx";
import { AthletesProvider } from "./context/AthletesContext.jsx";
import AthleteList from "./components/AthleteList";

function App() {
  return (
    <AthletesProvider>
      <div className="container py-4">
        <h1 className="text-center mb-4">Athlete Management</h1>
        <AddAthlete />
        <AthleteList />
      </div>
    </AthletesProvider>
  );
}

export default App;
