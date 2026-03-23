import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col md:flex-row">
      <div className="w-full md:w-64 bg-gray-800 border-b md:border-r border-gray-700 p-4">
        <h2 className="text-xl font-bold text-blue-400 mb-6 font-mono">EDC Admin Panel</h2>
        <nav className="flex flex-col gap-2">
          <Link to="/admin/dashboard" className="px-4 py-2 hover:bg-gray-700 rounded transition-colors text-sm">
            Dashboard
          </Link>
          <Link to="/admin/events/new" className="px-4 py-2 hover:bg-gray-700 rounded transition-colors text-sm">
            Create Event
          </Link>
          <Link to="/" className="px-4 py-2 mt-4 hover:bg-red-900/50 text-red-400 rounded transition-colors text-sm">
            Exit to Public Site
          </Link>
        </nav>
      </div>
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
