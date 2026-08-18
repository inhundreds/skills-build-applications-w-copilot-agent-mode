import { useEffect, useState } from 'react';
import { buildApiUrl, extractItems } from './api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadWorkouts() {
      try {
        const response = await fetch(buildApiUrl('/workouts/'));
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        if (isMounted) {
          setWorkouts(extractItems(payload, ['workouts']));
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || 'Unable to load workouts.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadWorkouts();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div className="p-3">Loading workouts...</div>;
  }

  if (error) {
    return <div className="alert alert-danger m-3">{error}</div>;
  }

  return (
    <section className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Workouts</h2>
        <span className="badge text-bg-warning">{workouts.length}</span>
      </div>

      <div className="row g-3">
        {workouts.map((workout) => (
          <div key={workout._id || workout.name} className="col-md-6">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title">{workout.name}</h5>
                <p className="card-text mb-1"><strong>Difficulty:</strong> {workout.difficulty}</p>
                <p className="card-text mb-1"><strong>Duration:</strong> {workout.estimatedDuration} min</p>
                <p className="card-text mb-2"><strong>Description:</strong> {workout.description || 'No description yet.'}</p>
                <ul className="list-group list-group-flush rounded">
                  {(workout.exercises || []).map((exercise, index) => (
                    <li key={`${workout._id || workout.name}-exercise-${index}`} className="list-group-item">
                      {exercise.name} — {exercise.sets} sets × {exercise.reps} reps
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
