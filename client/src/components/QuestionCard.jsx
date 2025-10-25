// client/src/components/QuestionCard.jsx
import React from "react";

export default function QuestionCard({ question, selected, onSelect }) {
  // question: { id, question, options: [...] }
  return (
    <div style={{ border: "1px solid #ddd", padding: 20, borderRadius: 8 }}>
      <h3>{question.question}</h3>
      <div role="list">
        {question.options.map((opt) => (
          <label key={opt} style={{ display: "block", margin: "8px 0" }}>
            <input
              type="radio"
              name={`q-${question.id}`}
              value={opt}
              checked={selected === opt}
              onChange={() => onSelect(question.id, opt)}
            />
            {" "}
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
}
