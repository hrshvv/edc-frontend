import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './our/components/navbar/Navbar';
import Team from './our/views/Team';
import Main from './our/views/Main';
import Events from './our/views/Events';
import EventDetail from './our/views/EventDetail';
import UpcomingEvent from './our/views/UpcomingEvent';
import About from './our/views/About';
import ScrollToTop from './components/ScrollToTop';

// Admin imports
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './our/views/admin/Dashboard';
import { RequireAuth } from './components/admin/RequireAuth';

import CreateEvent from './our/views/admin/CreateEvent';
import EventAdminHome from './our/views/admin/EventAdminHome';

const PublicLayout = () => (
  <>
    <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 md:w-[80%] w-full p-4">
      <Navbar />
    </div>
    <Outlet />
  </>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Main />} />
          <Route path="/team" element={<Team />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:slug" element={<EventDetail />} />
          <Route path="/upcoming-event" element={<UpcomingEvent />} />
          <Route path="/about" element={<About />} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<RequireAuth roles={['SUPER_ADMIN', 'EVENT_ADMIN']} />}>
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="events/new" element={<CreateEvent />} />
            <Route path="events/:eventSlug" element={<EventAdminHome />} />
            {/* Catch-all root redirect for admin */}
            <Route index element={<AdminDashboard />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
