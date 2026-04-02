const express = require('express');
const router = express.Router();
const Response = require("../models/Response");
 
// ── POST submit a survey response ──
router.post("/", async (req, res) => {
  try {
    const response = new Response(req.body);
    const saved    = await response.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
 
// ── GET all responses for a specific survey ──
router.get("/:surveyId", async (req, res) => {
  try {
    const responses = await Response.find({ surveyId: req.params.surveyId });
    res.json(responses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
 
// ── GET response count for a survey ──
router.get("/:surveyId/count", async (req, res) => {
  try {
    const count = await Response.countDocuments({ surveyId: req.params.surveyId });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
 
module.exports = router;