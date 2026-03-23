import React, { useEffect, useState } from 'react';
import { adminService } from '../../../services/admin.service';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    adminService.getDashboardStats().then(setStats);
  }, []);

  if (!stats) return <div className="text-gray-400">Loading dashboard...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Platform Overview</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <p className="text-gray-400 text-sm font-medium">Total Events</p>
          <p className="text-3xl font-bold mt-2">{stats.totalEvents}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <p className="text-gray-400 text-sm font-medium">Active Events</p>
          <p className="text-3xl font-bold text-green-400 mt-2">{stats.activeEvents}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <p className="text-gray-400 text-sm font-medium">Total Registrations</p>
          <p className="text-3xl font-bold mt-2">{stats.totalRegistrations}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <p className="text-gray-400 text-sm font-medium">Total Participants</p>
          <p className="text-3xl font-bold mt-2">{stats.totalParticipants}</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Active Events</h2>
        <div className="grid gap-4">
          {stats.activeEventsList.map(event => (
            <div key={event.id} className="bg-gray-800 border border-gray-700 p-5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold">{event.title}</h3>
                <p className="text-gray-400 text-sm mt-1">{event.date} • <span className="text-green-400">{event.status}</span></p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-300">{event.registrationsCount} Teams Registered</span>
                <Link to={`/admin/events/${event.slug}`} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors">
                  Manage Event &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
