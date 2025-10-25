// client/src/pages/Quiz.jsx
import React, { useEffect, useState } from "react";
import { fetchQuestions, submitScore } from "../api";
import QuestionCard from "../components/QuestionCard";
import { useNavigate } from "react-router-dom";

const savedUser = JSON.parse(localStorage.getItem("user"));

export default function Questionnaire({ currentUser }) {
  // currentUser is an object you set after login (e.g. { username, email })
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { questionId: option }
  const [submitting, setSubmitting] = useState(false);
  const [scoreResult, setScoreResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const data = await fetchQuestions();
        if (mounted) setQuestions(data);
      } catch (err) {
        console.error("Failed to load questions", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => (mounted = false);
  }, []);

  function handleSelect(questionId, option) {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  }

  function goPrev() {
    setCurrentIndex(i => Math.max(0, i - 1));
  }

  function goNext() {
    // optional: prevent advance if unanswered
    const q = questions[currentIndex];
    if (!answers[q.id]) {
      alert("Please select an answer before continuing.");
      return;
    }
    setCurrentIndex(i => Math.min(questions.length - 1, i + 1));
  }

  async function handleFinish() {
    // Validate all answered
    const allAnswered = questions.every(q => answers[q.id]);
    if (!allAnswered) {
      alert("Please answer all questions before submitting.");
      return;
    }

    // Compute score
    let correct = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) correct += 1;
    });
    const score = Math.round((correct / questions.length) * 100); // percent

    setSubmitting(true);
    try {
      // call backend to store score
      await submitScore(savedUser?.username || "anonymous", score);
      setScoreResult({ correct, total: questions.length, score });
    } catch (err) {
      console.error("Failed to submit score", err);
      alert("Failed to submit score. Try again later.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <div>Loading questions...</div>;
  if (scoreResult) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Results</h2>
        <p>
          Score: {scoreResult.score}% ({scoreResult.correct} / {scoreResult.total})
        </p>
        <button onClick={() => navigate("/")}>Back to home</button>
      </div>
    );
  }

  if (!questions.length) return <div>No questions available.</div>;

  const current = questions[currentIndex];

  return (
    <div style={{ maxWidth: 720, margin: "2rem auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <div>Question {currentIndex + 1} of {questions.length}</div>
        <div>Progress: {Math.round(((currentIndex+1) / questions.length) * 100)}%</div>
      </div>

      <QuestionCard
        question={current}
        selected={answers[current.id]}
        onSelect={handleSelect}
      />

      <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
        <button onClick={goPrev} disabled={currentIndex === 0}>Previous</button>
        {currentIndex < questions.length - 1 ? (
          <button onClick={goNext}>Next</button>
        ) : (
          <button onClick={handleFinish} disabled={submitting}>
            {submitting ? "Submitting..." : "Finish & Submit"}
          </button>
        )}
      </div>
    </div>
  );
}
