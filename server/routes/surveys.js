const express = require('express');
const router = express.Router();
const Survey = require("../models/Survey");
 
// ── GET all surveys ──
router.get("/", async (req, res) => {
  try {
    const surveys = await Survey.find().sort({ createdAt: -1 });
    res.json(surveys);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
 
// ── GET one survey by ID ──
router.get("/:id", async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id);
    if (!survey) return res.status(404).json({ error: "Survey not found" });
    res.json(survey);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
 
// ── POST create a new survey ──
router.post("/", async (req, res) => {
  try {
    const survey = new Survey(req.body);
    const saved  = await survey.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
 
// ── PUT update an existing survey ──
router.put("/:id", async (req, res) => {
  try {
    const updated = await Survey.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "Survey not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
 
// ── DELETE a survey ──
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Survey.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Survey not found" });
    res.json({ message: "Survey deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
 
module.exports = router;