import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import questionsData from '../data/questions.json';

const QUESTION_TIME = 30; // seconds

const Quiz = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [timer, setTimer] = useState(QUESTION_TIME);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const intervalRef = useRef();

  useEffect(() => {
    setTimer(QUESTION_TIME);
    setSelected(null);
    setShowFeedback(false);
    setFeedback('');
    // Start timer
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(intervalRef.current);
          handleAnswer(null); // Time's up
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line
  }, [current]);

  const handleAnswer = (optionIdx) => {
    clearInterval(intervalRef.current);
    const correct = questionsData[current].answer === optionIdx;
    setSelected(optionIdx);
    setShowFeedback(true);
    setFeedback(
      optionIdx === null
        ? 'Time\'s up!'
        : correct
        ? 'Correct!'
        : 'Incorrect!'
    );
    setAnswers((prev) => [...prev, { qid: questionsData[current].id, selected: optionIdx, correct }]);
    if (correct) setScore((s) => s + 1);
    setTimeout(() => {
      if (current + 1 < questionsData.length) {
        setCurrent((c) => c + 1);
      } else {
        navigate('/result', { state: { score: score + (correct ? 1 : 0), total: questionsData.length, answers: [...answers, { qid: questionsData[current].id, selected: optionIdx, correct }] } });
      }
    }, 1200);
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;

  const q = questionsData[current];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded shadow">
        <div className="flex justify-between mb-2">
          <span>Question {current + 1} / {questionsData.length}</span>
          <span className="font-mono">{timer}s</span>
        </div>
        <h2 className="text-xl font-bold mb-4">{q.question}</h2>
        <div className="flex flex-col gap-2">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              className={`p-2 rounded border text-left ${selected === idx ? (q.answer === idx ? 'bg-green-200 border-green-400' : 'bg-red-200 border-red-400') : 'hover:bg-blue-100'} ${showFeedback && q.answer === idx ? 'border-green-500 font-bold' : ''}`}
              onClick={() => !showFeedback && handleAnswer(idx)}
              disabled={showFeedback}
            >
              {opt}
            </button>
          ))}
        </div>
        {showFeedback && <div className="mt-4 text-lg font-semibold">{feedback}</div>}
      </div>
    </div>
  );
};

export default Quiz;
