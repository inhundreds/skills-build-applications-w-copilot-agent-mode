import { useEffect, useState } from 'react';
import { buildApiUrl, extractItems } from './api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadTeams() {
      try {
        const response = await fetch(buildApiUrl('/teams/'));
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        if (isMounted) {
          setTeams(extractItems(payload, ['teams']));
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || 'Unable to load teams.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadTeams();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div className="p-3">Loading teams...</div>;
  }

  if (error) {
    return <div className="alert alert-danger m-3">{error}</div>;
  }

  return (
    <section className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Teams</h2>
        <span className="badge text-bg-success">{teams.length}</span>
      </div>

      <div className="row g-3">
        {teams.map((team) => (
          <div key={team._id || team.name} className="col-md-6">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title">{team.name}</h5>
                <p className="card-text mb-1"><strong>Description:</strong> {team.description || 'No description yet.'}</p>
                <p className="card-text mb-1"><strong>Members:</strong> {team.members?.length ?? 0}</p>
                <p className="card-text mb-0"><strong>Leader:</strong> {team.leader?.username || 'Unassigned'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
