'use client';

import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';


export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    authClient.getSession().then((session) => {
      if (session.data) {
        setUser(session.data.user);
      }
    });
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut();
    window.location.href = '/';
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <p className="text-gray-600">Welcome, {user.name}!</p>
          <p className="text-gray-600">Email: {user.email}</p>
          <button
            onClick={handleSignOut}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}