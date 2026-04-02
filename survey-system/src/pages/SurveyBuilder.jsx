import API from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import QuestionCard from "../components/QuestionCard";
import "./SurveyBuilder.css";
 
const QUESTION_TYPES = [
  { type: "radio",    label: "Single choice",   icon: "◉", desc: "Pick one option" },
  { type: "checkbox", label: "Multiple choice",  icon: "☑", desc: "Pick many options" },
  { type: "rating",   label: "Rating scale",     icon: "★", desc: "Number 1–10" },
  { type: "textarea", label: "Open text",        icon: "✎", desc: "Free-form answer" },
];
 
function makeQuestion(type) {
  const base = {
    id: `q_${Date.now()}`,
    type,
    text: "",
    required: true,
  };
  if (type === "radio" || type === "checkbox") {
    return { ...base, options: ["", ""] };
  }
  if (type === "rating") {
    return { ...base, min: 1, max: 10, lowLabel: "Not satisfied", highLabel: "Very satisfied" };
  }
  return { ...base, placeholder: "Type your answer here…" };
}
 
export default function SurveyBuilder() {

  const navigate = useNavigate();
  const { user } = useAuth();
 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("2 min");
  const [questions, setQuestions] = useState([]);
  const [saved, setSaved] = useState(false);
  const [showTypeMenu, setShowTypeMenu] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
 
  // ── Question operations ──
  const addQuestion = (type) => {
    const q = makeQuestion(type);
    setQuestions((prev) => [...prev, q]);
    setExpandedId(q.id);
    setShowTypeMenu(false);
  };
 
  const updateQuestion = (id, changes) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, ...changes } : q))
    );
  };
 
  const deleteQuestion = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
    if (expandedId === id) setExpandedId(null);
  };
 
  const moveQuestion = (id, dir) => {
    setQuestions((prev) => {
      const idx = prev.findIndex((q) => q.id === id);
      const next = [...prev];
      const swap = idx + dir;
      if (swap < 0 || swap >= next.length) return prev;
      [next[idx], next[swap]] = [next[swap], next[idx]];
      return next;
    });
  };
 
  const duplicateQuestion = (id) => {
    setQuestions((prev) => {
      const idx = prev.findIndex((q) => q.id === id);
      const copy = { ...prev[idx], id: `q_${Date.now()}` };
      const next = [...prev];
      next.splice(idx + 1, 0, copy);
      return next;
    });
  };
 
  // ── Validation ──
  const errors = [];
  if (!title.trim()) errors.push("Survey title is required.");
  questions.forEach((q, i) => {
    if (!q.text.trim()) errors.push(`Question ${i + 1} is missing a question text.`);
    if ((q.type === "radio" || q.type === "checkbox") && q.options.some((o) => !o.trim())) {
      errors.push(`Question ${i + 1} has empty options.`);
    }
  });
 
  // ── Save ──
  const handleSave = async () => {
  if (errors.length > 0) return;
  try {
    const survey = {
      title,
      description,
      estimatedTime,
      questions,
      createdBy: user?.name,
    };
    await API.post("/surveys", survey);
    setSaved(true);
setTimeout(() => {
  setSaved(false);
  navigate("/dashboard");
}, 2000);
  } catch (err) {
    alert("Failed to save. Make sure server is running on port 5000.");
  }
};
 
 const handlePreview = () => {
  alert("Save the survey first, then navigate to it using its real ID.");
};
 
 
  return (
    <div className="builder-page">
      {/* Header */}
      
 
      <div className="builder-layout">
        {/* ── Left sidebar: survey meta ── */}
        <aside className="builder-sidebar">
          <div className="sidebar-section">
            <h3 className="sidebar-heading">Survey details</h3>
 
            <div className="sb-field">
              <label className="sb-label">Title <span className="sb-required">*</span></label>
              <input
                className="sb-input"
                placeholder="e.g. Customer Feedback 2025"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={80}
              />
            </div>
 
            <div className="sb-field">
              <label className="sb-label">Description</label>
              <textarea
                className="sb-textarea"
                placeholder="Tell respondents what this survey is about…"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                maxLength={200}
              />
            </div>
 
            <div className="sb-field">
              <label className="sb-label">Estimated time</label>
              <select
                className="sb-select"
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(e.target.value)}
              >
                <option>1 min</option>
                <option>2 min</option>
                <option>3 min</option>
                <option>5 min</option>
                <option>10 min</option>
                <option>15 min</option>
              </select>
            </div>
          </div>
 
          {/* Stats */}
          <div className="sidebar-section sidebar-stats">
            <h3 className="sidebar-heading">Summary</h3>
            <div className="stats-grid">
              <div className="stat-box">
                <span className="stat-val">{questions.length}</span>
                <span className="stat-lbl">Questions</span>
              </div>
              <div className="stat-box">
                <span className="stat-val">{questions.filter((q) => q.required).length}</span>
                <span className="stat-lbl">Required</span>
              </div>
              <div className="stat-box">
                <span className="stat-val">
                  {questions.filter((q) => q.type === "radio" || q.type === "checkbox").length}
                </span>
                <span className="stat-lbl">Choice</span>
              </div>
              <div className="stat-box">
                <span className="stat-val">
                  {questions.filter((q) => q.type === "rating" || q.type === "textarea").length}
                </span>
                <span className="stat-lbl">Open</span>
              </div>
            </div>
          </div>
 
          {/* Errors */}
          {errors.length > 0 && (
            <div className="sidebar-section">
              <div className="error-list">
                <p className="error-list-title">Fix before saving</p>
                {errors.map((e, i) => (
                  <p key={i} className="error-list-item">• {e}</p>
                ))}
              </div>
            </div>
          )}
 
          {/* Save button */}
          <button
            className={`btn-save ${errors.length > 0 ? "btn-save-disabled" : ""} ${saved ? "btn-saved" : ""}`}
            onClick={handleSave}
            disabled={errors.length > 0}
          >
            {saved ? (
              <>
                <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
                  <path d="M3 8l4 4 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Saved!
              </>
            ) : (
              "Save survey"
            )}
          </button>
        </aside>
 
        {/* ── Main area: questions ── */}
        <main className="builder-main">
          {/* Empty state */}
          {questions.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">
                <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
                  <rect x="6" y="10" width="36" height="30" rx="6" stroke="#c8b89a" strokeWidth="1.5" />
                  <path d="M14 20h20M14 27h12" stroke="#c8b89a" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="36" cy="36" r="8" fill="#f5f2ec" stroke="#c8b89a" strokeWidth="1.5" />
                  <path d="M33 36h6M36 33v6" stroke="#c8b89a" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <p className="empty-title">No questions yet</p>
              <p className="empty-sub">Click "Add question" below to start building your survey.</p>
            </div>
          )}
 
          {/* Question cards */}
          <div className="questions-list">
            {questions.map((q, idx) => (
              <QuestionCard
                key={q.id}
                question={q}
                index={idx}
                total={questions.length}
                expanded={expandedId === q.id}
                onToggle={() => setExpandedId(expandedId === q.id ? null : q.id)}
                onUpdate={(changes) => updateQuestion(q.id, changes)}
                onDelete={() => deleteQuestion(q.id)}
                onMoveUp={() => moveQuestion(q.id, -1)}
                onMoveDown={() => moveQuestion(q.id, 1)}
                onDuplicate={() => duplicateQuestion(q.id)}
              />
            ))}
          </div>
 
          {/* Add question button */}
          <div className="add-question-wrap">
            <div className="add-question-row">
              <button
                className="btn-add-question"
                onClick={() => setShowTypeMenu((p) => !p)}
              >
                <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
                  <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Add question
              </button>
            </div>
 
            {showTypeMenu && (
              <div className="type-menu">
                <p className="type-menu-label">Choose question type</p>
                <div className="type-grid">
                  {QUESTION_TYPES.map(({ type, label, icon, desc }) => (
                    <button
                      key={type}
                      className="type-card"
                      onClick={() => addQuestion(type)}
                    >
                      <span className="type-icon">{icon}</span>
                      <span className="type-label">{label}</span>
                      <span className="type-desc">{desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
 
