import { useEffect, useState } from 'react';
import { buildApiUrl, extractItems } from './api';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadActivities() {
      try {
        const response = await fetch(buildApiUrl('/activities/'));
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        if (isMounted) {
          setActivities(extractItems(payload, ['activities']));
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || 'Unable to load activities.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadActivities();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div className="p-3">Loading activities...</div>;
  }

  if (error) {
    return <div className="alert alert-danger m-3">{error}</div>;
  }

  return (
    <section className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Activities</h2>
        <span className="badge text-bg-info">{activities.length}</span>
      </div>

      <div className="row g-3">
        {activities.map((activity) => (
          <div key={activity._id || `${activity.userId}-${activity.type}-${activity.createdAt}`} className="col-md-6">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-capitalize">{activity.type}</h5>
                <p className="card-text mb-1"><strong>Duration:</strong> {activity.duration} min</p>
                <p className="card-text mb-1"><strong>Distance:</strong> {activity.distance ?? '—'} mi</p>
                <p className="card-text mb-1"><strong>Calories:</strong> {activity.calories ?? '—'}</p>
                <p className="card-text mb-0"><strong>Notes:</strong> {activity.notes || 'No notes available.'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
