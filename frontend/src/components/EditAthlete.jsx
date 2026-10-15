import { useState } from "react";
import { useAthletes } from "../context/useAthletes";

function EditAthlete({ athlete, onClose }) {
  const { updateAthlete } = useAthletes();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState(() => ({
    first_name: athlete.first_name || "",
    last_name: athlete.last_name || "",
    nickname: athlete.nickname || "",
    birth_date: athlete.birth_date
      ? String(athlete.birth_date).slice(0, 10)
      : "",
    weight: athlete.weight ?? "",
    image_url: athlete.image_url || "",
    sport: athlete.sport || "",
    achievements: athlete.achievements || "",
  }));

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (!formData.first_name.trim() || !formData.last_name.trim()) {
      setMessage("First name and last name are required.");
      return;
    }

    const athleteData = {
      ...formData,
      first_name: formData.first_name.trim(),
      last_name: formData.last_name.trim(),
      nickname: formData.nickname.trim() || null,
      birth_date: formData.birth_date || null,
      weight: formData.weight === "" ? null : Number(formData.weight),
      image_url: formData.image_url.trim() || null,
      sport: formData.sport.trim() || null,
      achievements: formData.achievements.trim() || null,
    };

    setSaving(true);

    try {
      const success = await updateAthlete(athlete.id, athleteData);

      if (success) {
        onClose();
      } else {
        setMessage("Failed to update athlete.");
      }
    } catch {
      setMessage("An unexpected error occurred.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card shadow-sm mb-4 border-primary">
      <div className="card-body">
        <h2 className="h4 mb-3">
          Edit {athlete.first_name} {athlete.last_name}
        </h2>

        {message && (
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="edit-first-name" className="form-label">
                First name *
              </label>
              <input
                id="edit-first-name"
                name="first_name"
                className="form-control"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="edit-last-name" className="form-label">
                Last name *
              </label>
              <input
                id="edit-last-name"
                name="last_name"
                className="form-control"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="edit-nickname" className="form-label">
                Nickname
              </label>
              <input
                id="edit-nickname"
                name="nickname"
                className="form-control"
                value={formData.nickname}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="edit-birth-date" className="form-label">
                Birth date
              </label>
              <input
                id="edit-birth-date"
                name="birth_date"
                type="date"
                className="form-control"
                value={formData.birth_date}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="edit-weight" className="form-label">
                Weight (kg)
              </label>
              <input
                id="edit-weight"
                name="weight"
                type="number"
                min="0"
                step="0.01"
                className="form-control"
                value={formData.weight}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="edit-sport" className="form-label">
                Sport
              </label>
              <input
                id="edit-sport"
                name="sport"
                className="form-control"
                value={formData.sport}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <label htmlFor="edit-image-url" className="form-label">
                Image URL
              </label>
              <input
                id="edit-image-url"
                name="image_url"
                type="url"
                className="form-control"
                value={formData.image_url}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <label htmlFor="edit-achievements" className="form-label">
                Achievements
              </label>
              <textarea
                id="edit-achievements"
                name="achievements"
                className="form-control"
                rows="3"
                value={formData.achievements}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 d-flex gap-2">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save changes"}
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
                disabled={saving}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditAthlete;
