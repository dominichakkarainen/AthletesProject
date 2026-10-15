const Athlete = require("../models/athleteModel");

const getAllAthletes = async (req, res) => {
  try {
    const athletes = await Athlete.getAllAthletes();
    res.json(athletes);
  } catch (error) {
    console.error("Error fetching athletes:", error);
    res.status(500).json({ message: "Failed to fetch athletes!" });
  }
};

const getAthleteById = async (req, res) => {
  try {
    const athlete = await Athlete.getAthleteById(req.params.id);

    if (!athlete) {
      return res.status(404).json({ message: "Athlete not found!" });
    }

    res.json(athlete);
  } catch (error) {
    console.error("Error fetching athlete:", error);
    res.status(500).json({ message: "Failed to fetch athlete!" });
  }
};

const createAthlete = async (req, res) => {
  try {
    const { first_name, last_name } = req.body;

    if (!first_name || !last_name) {
      return res.status(400).json({
        message: "First name and last name are required!",
      });
    }

    const athlete = await Athlete.createAthlete(req.body);
    res.status(201).json(athlete);
  } catch (error) {
    console.error("Error creating athlete:", error);
    res.status(500).json({ message: "Failed to create athlete!" });
  }
};

const updateAthlete = async (req, res) => {
  try {
    const { first_name, last_name } = req.body;

    if (!first_name || !last_name) {
      return res.status(400).json({
        message: "First name and last name are required!",
      });
    }

    const athlete = await Athlete.updateAthlete(req.params.id, req.body);

    if (!athlete) {
      return res.status(404).json({ message: "Athlete not found!" });
    }

    res.json(athlete);
  } catch (error) {
    console.error("Error updating athlete:", error);
    res.status(500).json({ message: "Failed to update athlete!" });
  }
};

const deleteAthlete = async (req, res) => {
  try {
    const deleted = await Athlete.deleteAthlete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Athlete not found!" });
    }

    res.json({ message: "Athlete deleted successfully!" });
  } catch (error) {
    console.error("Error deleting athlete:", error);
    res.status(500).json({ message: "Failed to delete athlete" });
  }
};

module.exports = {
  getAllAthletes,
  getAthleteById,
  createAthlete,
  updateAthlete,
  deleteAthlete,
};
