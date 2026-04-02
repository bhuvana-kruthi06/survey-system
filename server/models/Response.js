const mongoose = require("mongoose");
 
// ── Response schema ──
const responseSchema = new mongoose.Schema({
  surveyId: {
    type:     mongoose.Schema.Types.ObjectId,
    ref:      "Survey",
    required: true,
  },
  // answers stored as { q1: "Option A", q2: ["A","B"], q3: 8, q4: "Some text" }
  answers: [
    {
      questionIndex: { type: Number },
      answer: { type: String }
    }
  ],
  submittedAt: {
    type:    Date,
    default: Date.now,
  },
});
 
module.exports = mongoose.model("Response", responseSchema);