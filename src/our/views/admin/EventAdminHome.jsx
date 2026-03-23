import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { adminService } from '../../../services/admin.service';
import RegistrationsTab from './components/RegistrationsTab';
import SubmissionsTab from './components/SubmissionsTab';
import ShortlistTab from './components/ShortlistTab';
import CommunicationsTab from './components/CommunicationsTab';
import SettingsTab from './components/SettingsTab';
import LeaderboardTab from './components/LeaderboardTab';

const EventAdminHome = () => {
  const { eventSlug } = useParams();
  const [eventData, setEventData] = useState(null);
  const [activeTab, setActiveTab] = useState('registrations');
  const [toggles, setToggles] = useState({
    registrationOpen: false,
    submissionsOpen: false,
    leaderboardVisible: false,
    biddingActive: false
  });
  const [toggleStatus, setToggleStatus] = useState('');

  useEffect(() => {
    adminService.getEventDetails(eventSlug).then(data => {
      setEventData(data);
      if (data?.toggles) {
        setToggles(prev => ({ ...prev, ...data.toggles }));
      }
    });
  }, [eventSlug]);

  if (!eventData) return <div className="text-gray-400 p-10">Loading event data...</div>;

  const tabs = [
    { id: 'registrations', label: 'Registrations' },
    { id: 'shortlist', label: 'Shortlist' },
    { id: 'submissions', label: 'Submissions' },
     { id: 'leaderboard', label: 'Leaderboard' },
    { id: 'communications', label: 'Communications' },
    { id: 'settings', label: 'Settings' }
  ];

  const toggleConfigs = [
    {
      key: 'registrationOpen',
      label: 'Registration',
      description: 'Allow new teams to register. Turns off automatically after deadline.',
      onState: 'OPEN',
      offState: 'CLOSED'
    },
    {
      key: 'submissionsOpen',
      label: 'PPT Submission',
      description: 'Enable shortlisted teams to upload decks.',
      onState: 'OPEN',
      offState: 'LOCKED'
    },
    {
      key: 'leaderboardVisible',
      label: 'Public Leaderboard',
      description: 'Expose live leaderboard to /events/:slug/leaderboard.',
      onState: 'VISIBLE',
      offState: 'HIDDEN'
    },
    {
      key: 'biddingActive',
      label: 'Bidding Active',
      description: 'Flip on auction controls for event-day bidding.',
      onState: 'ACTIVE',
      offState: 'OFF'
    }
  ];

  const handleToggleClick = (key) => {
    setToggles(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      const statusLabel = updated[key] ? 'enabled' : 'disabled';
      setToggleStatus(`${toggleConfigs.find(cfg => cfg.key === key)?.label || key} ${statusLabel}.`);
      // TODO: integrate PATCH /settings once backend ready
      return updated;
    });
    setTimeout(() => setToggleStatus(''), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <Link to="/admin/dashboard" className="text-gray-400 hover:text-white text-sm flex items-center gap-1 mb-4">
          &larr; Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold uppercase tracking-tight">{eventData.title}</h1>
        <p className="text-gray-400 mt-1">{eventData.date} | {eventData.venue}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
          <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Registered</p>
          <p className="text-2xl font-bold mt-1">{eventData.stats.registered}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
          <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Shortlisted</p>
          <p className="text-2xl font-bold text-green-400 mt-1">{eventData.stats.shortlisted}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
          <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Submitted</p>
          <p className="text-2xl font-bold text-blue-400 mt-1">{eventData.stats.submitted}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
          <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Checked In</p>
          <p className="text-2xl font-bold mt-1">{eventData.stats.checkedIn}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
          <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Days Left</p>
          <p className="text-2xl font-bold mt-1">{eventData.stats.daysLeft}</p>
        </div>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-4 md:p-6 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
          <div>
            <h3 className="text-lg font-semibold">Quick Controls</h3>
            <p className="text-sm text-gray-400">Toggle live state instantly. Changes auto-sync once backend hooks arrive.</p>
          </div>
          {toggleStatus && <span className="text-sm text-blue-300">{toggleStatus}</span>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {toggleConfigs.map(cfg => (
            <button
              key={cfg.key}
              onClick={() => handleToggleClick(cfg.key)}
              className={`text-left border rounded-xl p-4 transition ${toggles[cfg.key] ? 'border-green-500/40 bg-green-900/20' : 'border-gray-600 bg-gray-900/40 hover:border-gray-500'}`}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold">{cfg.label}</p>
                <span className={`text-xs font-bold tracking-wide px-2 py-0.5 rounded ${toggles[cfg.key] ? 'bg-green-500/20 text-green-300' : 'bg-gray-600/40 text-gray-300'}`}>
                  {toggles[cfg.key] ? cfg.onState : cfg.offState}
                </span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">{cfg.description}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 border-b border-gray-700 mb-6 rounded-t-xl overflow-hidden flex flex-wrap">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-4 text-sm font-medium transition-colors border-b-2 sm:border-b-0 ${
              activeTab === tab.id 
                ? 'bg-gray-700 text-white sm:border-b-2 border-blue-500' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50 border-transparent'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div>
        {activeTab === 'registrations' && <RegistrationsTab eventSlug={eventSlug} />}
        {activeTab === 'shortlist' && <ShortlistTab eventSlug={eventSlug} />}
        {activeTab === 'submissions' && <SubmissionsTab eventSlug={eventSlug} />}
        {activeTab === 'leaderboard' && <LeaderboardTab eventSlug={eventSlug} biddingActive={toggles.biddingActive} />}
        {activeTab === 'communications' && <CommunicationsTab eventSlug={eventSlug} />}
        {activeTab === 'settings' && <SettingsTab eventSlug={eventSlug} />}
      </div>
    </div>
  );
};

export default EventAdminHome;