import "./QuestionCard.css";
 
const TYPE_COLORS = {
  radio:    { bg: "#f0f7f2", text: "#2d5a3d", border: "#c6dece" },
  checkbox: { bg: "#fdf3e7", text: "#9a6120", border: "#f5ddb5" },
  rating:   { bg: "#eef3fd", text: "#1e4db7", border: "#bfcffa" },
  textarea: { bg: "#faf0f8", text: "#7c2d82", border: "#e8b8f0" },
};
 
const TYPE_LABELS = {
  radio: "Single choice",
  checkbox: "Multiple choice",
  rating: "Rating scale",
  textarea: "Open text",
};
 
export default function QuestionCard({
  question, index, total, expanded,
  onToggle, onUpdate, onDelete,
  onMoveUp, onMoveDown, onDuplicate,
}) {
  const colors = TYPE_COLORS[question.type];
 
  const updateOption = (i, val) => {
    const opts = [...question.options];
    opts[i] = val;
    onUpdate({ options: opts });
  };
 
  const addOption = () => {
    onUpdate({ options: [...(question.options || []), ""] });
  };
 
  const removeOption = (i) => {
    if (question.options.length <= 2) return;
    onUpdate({ options: question.options.filter((_, idx) => idx !== i) });
  };
 
  return (
    <div className={`qcard ${expanded ? "qcard-expanded" : ""}`}>
      {/* Card header — always visible */}
      <div className="qcard-header" onClick={onToggle}>
        <div className="qcard-header-left">
          <span className="qcard-num">{String(index + 1).padStart(2, "0")}</span>
          <span
            className="qcard-type-badge"
            style={{ background: colors.bg, color: colors.text, borderColor: colors.border }}
          >
            {TYPE_LABELS[question.type]}
          </span>
          <span className="qcard-preview">
            {question.text || <em className="qcard-empty-text">Untitled question</em>}
          </span>
        </div>
        <div className="qcard-header-right">
          {question.required && <span className="qcard-req-dot" title="Required" />}
          <svg
            className={`qcard-chevron ${expanded ? "open" : ""}`}
            viewBox="0 0 16 16" fill="none" width="16" height="16"
          >
            <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
 
      {/* Expanded body */}
      {expanded && (
        <div className="qcard-body">
          {/* Question text */}
          <div className="qcard-field">
            <label className="qcard-label">Question text <span className="req-star">*</span></label>
            <input
              className="qcard-input"
              placeholder="Write your question here…"
              value={question.text}
              onChange={(e) => onUpdate({ text: e.target.value })}
              autoFocus
            />
          </div>
 
          {/* Options editor (radio / checkbox) */}
          {(question.type === "radio" || question.type === "checkbox") && (
            <div className="qcard-field">
              <label className="qcard-label">Options</label>
              <div className="options-editor">
                {question.options.map((opt, i) => (
                  <div key={i} className="option-row">
                    <span className="option-row-indicator">
                      {question.type === "radio" ? "○" : "□"}
                    </span>
                    <input
                      className="qcard-input option-input"
                      placeholder={`Option ${i + 1}`}
                      value={opt}
                      onChange={(e) => updateOption(i, e.target.value)}
                    />
                    <button
                      className="option-remove-btn"
                      onClick={() => removeOption(i)}
                      disabled={question.options.length <= 2}
                      title="Remove option"
                    >
                      <svg viewBox="0 0 14 14" fill="none" width="12" height="12">
                        <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                ))}
                <button className="btn-add-option" onClick={addOption}>
                  <svg viewBox="0 0 14 14" fill="none" width="13" height="13">
                    <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  Add option
                </button>
              </div>
            </div>
          )}
 
          {/* Rating config */}
          {question.type === "rating" && (
            <div className="qcard-field">
              <label className="qcard-label">Scale settings</label>
              <div className="rating-config">
                <div className="rating-config-row">
                  <div className="rating-config-item">
                    <span className="rc-label">Min</span>
                    <select
                      className="rc-select"
                      value={question.min}
                      onChange={(e) => onUpdate({ min: Number(e.target.value) })}
                    >
                      {[1, 0].map((v) => <option key={v}>{v}</option>)}
                    </select>
                  </div>
                  <div className="rating-config-item">
                    <span className="rc-label">Max</span>
                    <select
                      className="rc-select"
                      value={question.max}
                      onChange={(e) => onUpdate({ max: Number(e.target.value) })}
                    >
                      {[5, 7, 10].map((v) => <option key={v}>{v}</option>)}
                    </select>
                  </div>
                </div>
                <div className="rating-preview-strip">
                  {Array.from({ length: question.max - question.min + 1 }, (_, i) => i + question.min).map((n) => (
                    <span key={n} className="rating-preview-btn">{n}</span>
                  ))}
                </div>
                <div className="rating-label-row">
                  <div className="rating-label-field">
                    <span className="rc-label">Low label</span>
                    <input
                      className="qcard-input"
                      value={question.lowLabel}
                      onChange={(e) => onUpdate({ lowLabel: e.target.value })}
                      placeholder="e.g. Not satisfied"
                    />
                  </div>
                  <div className="rating-label-field">
                    <span className="rc-label">High label</span>
                    <input
                      className="qcard-input"
                      value={question.highLabel}
                      onChange={(e) => onUpdate({ highLabel: e.target.value })}
                      placeholder="e.g. Very satisfied"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
 
          {/* Textarea placeholder */}
          {question.type === "textarea" && (
            <div className="qcard-field">
              <label className="qcard-label">Placeholder text</label>
              <input
                className="qcard-input"
                placeholder="e.g. Share your thoughts here…"
                value={question.placeholder || ""}
                onChange={(e) => onUpdate({ placeholder: e.target.value })}
              />
            </div>
          )}
 
          {/* Required toggle */}
          <div className="qcard-field qcard-toggle-row">
            <label className="toggle-label">
              <span className="toggle-track">
                <input
                  type="checkbox"
                  checked={question.required}
                  onChange={(e) => onUpdate({ required: e.target.checked })}
                  className="toggle-input"
                />
                <span className="toggle-thumb" />
              </span>
              <span className="toggle-text">
                Required question
                <span className="toggle-sub">Respondent must answer before continuing</span>
              </span>
            </label>
          </div>
 
          {/* Action bar */}
          <div className="qcard-actions">
            <div className="qcard-actions-left">
              <button className="qcard-action-btn" onClick={onMoveUp} disabled={index === 0} title="Move up">
                <svg viewBox="0 0 14 14" fill="none" width="13" height="13">
                  <path d="M7 11V3M3 7l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Move up
              </button>
              <button className="qcard-action-btn" onClick={onMoveDown} disabled={index === total - 1} title="Move down">
                <svg viewBox="0 0 14 14" fill="none" width="13" height="13">
                  <path d="M7 3v8M3 7l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Move down
              </button>
              <button className="qcard-action-btn" onClick={onDuplicate} title="Duplicate">
                <svg viewBox="0 0 14 14" fill="none" width="13" height="13">
                  <rect x="1" y="3" width="9" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M4 3V2a1 1 0 011-1h7a1 1 0 011 1v9a1 1 0 01-1 1h-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Duplicate
              </button>
            </div>
            <button className="qcard-delete-btn" onClick={onDelete} title="Delete question">
              <svg viewBox="0 0 14 14" fill="none" width="13" height="13">
                <path d="M2 4h10M5 4V2h4v2M6 7v4M8 7v4M3 4l.8 8h6.4L11 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}