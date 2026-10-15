import { useState } from "react";
import { useAthletes } from "../context/useAthletes";
import EditAthlete from "./EditAthlete";

function AthleteList() {
  const { athletes, loading, error, deleteAthlete } = useAthletes();
  const [editingAthlete, setEditingAthlete] = useState(null);

  if (loading) {
    return <p className="text-center">Loading athletes...</p>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (athletes.length === 0) {
    return (
      <div className="alert alert-info text-center">
        No athletes found. Add an athlete to get started!
      </div>
    );
  }

  return (
    <>
      {editingAthlete && (
        <EditAthlete
          key={editingAthlete.id}
          athlete={editingAthlete}
          onClose={() => setEditingAthlete(null)}
        />
      )}

      <div className="row g-4">
        {athletes.map((athlete) => (
          <div className="col-12 col-md-6 col-lg-4" key={athlete.id}>
            <div className="card h-100 shadow-sm">
              {athlete.image_url && (
                <img
                  src={athlete.image_url}
                  className="card-img-top"
                  alt={`${athlete.first_name} ${athlete.last_name}`}
                  style={{ height: "220px", objectFit: "cover" }}
                />
              )}

              <div className="card-body d-flex flex-column">
                <h2 className="card-title h5">
                  {athlete.first_name} {athlete.last_name}
                </h2>

                {athlete.nickname && (
                  <p className="text-muted mb-2">"{athlete.nickname}"</p>
                )}

                <p className="card-text">
                  <strong>Sport:</strong> {athlete.sport || "Not specified"}
                </p>

                <p className="card-text">
                  <strong>Birth date:</strong>{" "}
                  {athlete.birth_date
                    ? String(athlete.birth_date).slice(0, 10)
                    : "Not specified"}
                </p>

                <p className="card-text">
                  <strong>Weight:</strong>{" "}
                  {athlete.weight != null
                    ? `${athlete.weight} kg`
                    : "Not specified"}
                </p>

                <p className="card-text">
                  <strong>Achievements:</strong>{" "}
                  {athlete.achievements || "None listed"}
                </p>

                <div className="d-flex gap-2 mt-auto">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setEditingAthlete(athlete)}
                  >
                    Muokkaa
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      const confirmed = window.confirm(
                        `Haluatko varmasti poistaa urheilijan ${athlete.first_name} ${athlete.last_name}?`,
                      );

                      if (confirmed) {
                        deleteAthlete(athlete.id);
                      }
                    }}
                  >
                    Poista
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default AthleteList;
