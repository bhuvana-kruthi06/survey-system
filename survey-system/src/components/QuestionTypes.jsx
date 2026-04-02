import { useState } from "react";
import "./QuestionTypes.css";
 
export function RadioQuestion({ question, value, onChange }) {
  return (
    <div className="options-list">
      {question.options.map((option, i) => (
        <label
          key={i}
          className={`option-item radio-item ${value === option ? "selected" : ""}`}
          onClick={() => onChange(option)}
        >
          <span className="option-indicator">
            <span className="option-inner" />
          </span>
          <span className="option-label">{option}</span>
        </label>
      ))}
    </div>
  );
}
 
export function CheckboxQuestion({ question, value = [], onChange }) {
  const toggle = (option) => {
    const next = value.includes(option)
      ? value.filter((v) => v !== option)
      : [...value, option];
    onChange(next);
  };
 
  return (
    <div className="options-list">
      {question.options.map((option, i) => (
        <label
          key={i}
          className={`option-item checkbox-item ${value.includes(option) ? "selected" : ""}`}
          onClick={() => toggle(option)}
        >
          <span className="option-indicator checkbox-indicator">
            <svg className="check-icon" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 6l3 3 5-5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="option-label">{option}</span>
        </label>
      ))}
    </div>
  );
}
 
export function RatingQuestion({ question, value, onChange }) {
  const [hovered, setHovered] = useState(null);
  const ratings = Array.from(
    { length: question.max - question.min + 1 },
    (_, i) => i + question.min
  );
 
  return (
    <div className="rating-wrap">
      <div className="rating-buttons">
        {ratings.map((num) => {
          const isSelected = value === num;
          const isHovered = hovered !== null && num <= hovered;
          return (
            <button
              key={num}
              type="button"
              className={`rating-btn ${isSelected ? "selected" : ""} ${
                !isSelected && isHovered ? "hovered" : ""
              }`}
              onClick={() => onChange(num)}
              onMouseEnter={() => setHovered(num)}
              onMouseLeave={() => setHovered(null)}
            >
              {num}
            </button>
          );
        })}
      </div>
      <div className="rating-labels">
        <span>{question.lowLabel}</span>
        <span>{question.highLabel}</span>
      </div>
    </div>
  );
}
 
export function TextareaQuestion({ question, value = "", onChange }) {
  const maxLen = 500;
  return (
    <div className="textarea-wrap">
      <textarea
        className="survey-textarea"
        placeholder={question.placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLen}
        rows={4}
      />
      <div className="char-count">
        {value.length}/{maxLen}
      </div>
    </div>
    
  );
}