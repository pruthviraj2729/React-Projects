import React, { useEffect, useState } from 'react';
import { databases } from '../appwrite';

const DB_ID = 'quizdb'; // <-- Replace with your Appwrite Database ID
const COLLECTION_ID = 'scores'; // <-- Replace with your Appwrite Collection ID

const Leaderboard = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchScores = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await databases.listDocuments(DB_ID, COLLECTION_ID, [
          // Sort by percentage desc, then timestamp desc
          // (Appwrite SDK v10+ uses queries array)
          // If using older SDK, adjust accordingly
          // e.g., Query.orderDesc('percentage'), Query.limit(10)
        ]);
        const sorted = res.documents
          .sort((a, b) => b.percentage - a.percentage || new Date(b.timestamp) - new Date(a.timestamp))
          .slice(0, 10);
        setScores(sorted);
      } catch (err) {
        setError('Could not load leaderboard: ' + (err.message || 'Unknown error'));
      } finally {
        setLoading(false);
      }
    };
    fetchScores();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <div className="text-2xl font-bold mb-4">Leaderboard</div>
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="py-2">#</th>
              <th className="py-2">User</th>
              <th className="py-2">Score</th>
              <th className="py-2">%</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((s, idx) => (
              <tr key={s.$id} className={idx === 0 ? 'font-bold text-green-700' : ''}>
                <td className="py-1">{idx + 1}</td>
                <td className="py-1">{s.username}</td>
                <td className="py-1">{s.score}</td>
                <td className="py-1">{s.percentage}%</td>
              </tr>
            ))}
            {scores.length === 0 && !loading && (
              <tr><td colSpan={4} className="text-center py-2">No scores yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
