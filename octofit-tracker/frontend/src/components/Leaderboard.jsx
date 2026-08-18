import { useEffect, useState } from 'react';
import { buildApiUrl, extractItems } from './api';

export default function Leaderboard() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadLeaderboard() {
      try {
        const response = await fetch(buildApiUrl('/leaderboard/'));
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        if (isMounted) {
          setRows(extractItems(payload, ['leaderboard']));
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || 'Unable to load leaderboard.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadLeaderboard();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div className="p-3">Loading leaderboard...</div>;
  }

  if (error) {
    return <div className="alert alert-danger m-3">{error}</div>;
  }

  return (
    <section className="container py-4">
      <h2>Leaderboard</h2>
      <div className="table-responsive">
        <table className="table table-striped align-middle shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Team</th>
              <th>Activities</th>
              <th>Calories</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((entry) => (
              <tr key={entry._id || `${entry.userId?._id}-${entry.teamId?._id}`}>
                <td>{entry.rank}</td>
                <td>{entry.userId?.username || 'Unknown user'}</td>
                <td>{entry.teamId?.name || 'Unknown team'}</td>
                <td>{entry.totalActivities}</td>
                <td>{entry.totalCalories}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
