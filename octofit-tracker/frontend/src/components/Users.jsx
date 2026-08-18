import { useEffect, useState } from 'react';
import { buildApiUrl, extractItems } from './api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadUsers() {
      try {
        const response = await fetch(buildApiUrl('/users/'));
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        if (isMounted) {
          setUsers(extractItems(payload, ['users']));
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || 'Unable to load users.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div className="p-3">Loading users...</div>;
  }

  if (error) {
    return <div className="alert alert-danger m-3">{error}</div>;
  }

  return (
    <section className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Users</h2>
        <span className="badge text-bg-primary">{users.length}</span>
      </div>

      <div className="row g-3">
        {users.map((user) => (
          <div key={user._id || user.email || user.username} className="col-md-6">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title">{user.profile?.firstName || user.username}</h5>
                <p className="card-text mb-1"><strong>Username:</strong> {user.username}</p>
                <p className="card-text mb-1"><strong>Email:</strong> {user.email}</p>
                <p className="card-text mb-0"><strong>Bio:</strong> {user.profile?.bio || 'No bio provided.'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
