import { useState } from "react";
import { useAthletes } from "../context/useAthletes";

const initialForm = {
  first_name: "",
  last_name: "",
  nickname: "",
  birth_date: "",
  weight: "",
  image_url: "",
  sport: "",
  achievements: "",
};

function AddAthlete() {
  const [formData, setFormData] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const { addAthlete } = useAthletes();

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
      const success = await addAthlete(athleteData);

      if (success) {
        setFormData(initialForm);
        setMessage("Athlete added successfully!");
      } else {
        setMessage("Failed to add athlete. Please check the backend.");
      }
    } catch {
      setMessage("An unexpected error occurred.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h2 className="h4 mb-3">Add a new athlete</h2>

        {message && (
          <div className="alert alert-info" role="status">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="first_name" className="form-label">
                First name *
              </label>
              <input
                id="first_name"
                name="first_name"
                className="form-control"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="last_name" className="form-label">
                Last name *
              </label>
              <input
                id="last_name"
                name="last_name"
                className="form-control"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="nickname" className="form-label">
                Nickname
              </label>
              <input
                id="nickname"
                name="nickname"
                className="form-control"
                value={formData.nickname}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="birth_date" className="form-label">
                Birth date
              </label>
              <input
                id="birth_date"
                name="birth_date"
                type="date"
                className="form-control"
                value={formData.birth_date}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="weight" className="form-label">
                Weight (kg)
              </label>
              <input
                id="weight"
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
              <label htmlFor="sport" className="form-label">
                Sport
              </label>
              <input
                id="sport"
                name="sport"
                className="form-control"
                value={formData.sport}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <label htmlFor="image_url" className="form-label">
                Image URL
              </label>
              <input
                id="image_url"
                name="image_url"
                type="url"
                className="form-control"
                value={formData.image_url}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <label htmlFor="achievements" className="form-label">
                Achievements
              </label>
              <textarea
                id="achievements"
                name="achievements"
                className="form-control"
                rows="3"
                value={formData.achievements}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={saving}
              >
                {saving ? "Saving..." : "Add athlete"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddAthlete;
