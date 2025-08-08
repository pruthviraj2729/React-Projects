import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { databases } from '../appwrite';

const DB_ID = '687a953100395ef1340d'; // <-- Replace with your Appwrite Database ID
const COLLECTION_ID = '687a95690016614f4113'; // <-- Replace with your Appwrite Collection ID

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  const { score = 0, total = 1 } = location.state || {};
  const percentage = Math.round((score / total) * 100);

  useEffect(() => {
    if (!user || !location.state) return;
    const saveScore = async () => {
      setSaving(true);
      setError('');
      try {
        await databases.createDocument(DB_ID, COLLECTION_ID, 'unique()', {
          userId: user.$id,
          username: user.name || user.email,
          score,
          percentage,
          timestamp: new Date().toISOString()
        });
        setSaved(true);
      } catch (err) {
        setError('Could not save score: ' + (err.message || 'Unknown error'));
      } finally {
        setSaving(false);
      }
    };
    saveScore();
    // eslint-disable-next-line
  }, [user, location.state]);

  if (!location.state) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-white p-6 rounded shadow">
          <div className="text-xl font-bold mb-4">No result data found.</div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => navigate('/quiz')}>Take Quiz</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <div className="text-2xl font-bold mb-2">Quiz Result</div>
        <div className="mb-2">Score: <span className="font-mono">{score} / {total}</span></div>
        <div className="mb-2">Percentage: <span className="font-mono">{percentage}%</span></div>
        {saving && <div className="text-blue-500 mb-2">Saving your score...</div>}
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {saved && <div className="text-green-600 mb-2">Score saved!</div>}
        <div className="flex gap-2 mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => navigate('/quiz')}>Retake Quiz</button>
          <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => navigate('/leaderboard')}>Leaderboard</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Result;
