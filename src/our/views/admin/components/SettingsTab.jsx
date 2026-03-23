import React, { useEffect, useMemo, useState } from 'react';
import { adminService } from '../../../../services/admin.service';

const SettingsTab = ({ eventSlug }) => {
  const [settings, setSettings] = useState(null);
  const [baseline, setBaseline] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');
  const [lastSaved, setLastSaved] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    adminService.getEventSettings(eventSlug).then(data => {
      if (cancelled) return;
      setSettings(structuredClone(data));
      setBaseline(structuredClone(data));
      setLoading(false);
    }).catch(() => {
      if (!cancelled) {
        setLoading(false);
        setToast('Unable to load settings, retry later.');
      }
    });
    return () => {
      cancelled = true;
    };
  }, [eventSlug]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(''), 2600);
    return () => clearTimeout(timer);
  }, [toast]);

  const isDirty = useMemo(() => {
    if (!settings || !baseline) return false;
    return JSON.stringify(settings) !== JSON.stringify(baseline);
  }, [settings, baseline]);

  const handleToggle = (key, value) => {
    setSettings(prev => ({
      ...prev,
      toggles: { ...prev.toggles, [key]: value }
    }));
  };

  const handleNestedChange = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: { ...prev[section], [key]: value }
    }));
  };

  const handleSave = async () => {
    if (!settings || saving) return;
    setSaving(true);
    try {
      const payload = await adminService.updateEventSettings(eventSlug, settings);
      setBaseline(structuredClone(payload));
      setLastSaved(new Date());
      setToast('Settings updated (mock).');
    } catch (err) {
      setToast('Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return <div className="text-gray-400 py-10">Loading event settings…</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <p className="text-xs uppercase text-gray-500 tracking-wide">{eventSlug}</p>
          <h2 className="text-2xl font-bold">Event Settings</h2>
          <p className="text-sm text-gray-400">Manage visibility, automation, and communications for this event.</p>
        </div>
        <div className="flex items-center gap-4">
          <span className={`text-sm ${isDirty ? 'text-yellow-300' : 'text-gray-500'}`}>
            {isDirty ? 'Unsaved changes' : lastSaved ? `Last saved ${lastSaved.toLocaleTimeString()}` : 'No edits yet'}
          </span>
          <button
            disabled={!isDirty || saving}
            onClick={handleSave}
            className={`px-5 py-2 rounded-lg font-medium transition ${
              !isDirty || saving ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>

      {toast && (
        <div className="rounded-xl border border-blue-500/40 bg-blue-900/20 px-4 py-2 text-sm text-blue-200" aria-live="polite">
          {toast}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
          <p className="text-xs uppercase text-gray-500">Registration</p>
          <p className={`text-xl font-semibold ${settings.toggles.registrationOpen ? 'text-green-300' : 'text-gray-300'}`}>
            {settings.toggles.registrationOpen ? 'Open' : 'Closed'}
          </p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
          <p className="text-xs uppercase text-gray-500">Submissions</p>
          <p className={`text-xl font-semibold ${settings.toggles.submissionsOpen ? 'text-green-300' : 'text-gray-300'}`}>
            {settings.toggles.submissionsOpen ? 'Accepting' : 'Locked'}
          </p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
          <p className="text-xs uppercase text-gray-500">Leaderboard</p>
          <p className={`text-xl font-semibold ${settings.toggles.leaderboardVisible ? 'text-blue-300' : 'text-gray-300'}`}>
            {settings.toggles.leaderboardVisible ? 'Public' : 'Hidden'}
          </p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
          <p className="text-xs uppercase text-gray-500">Auction</p>
          <p className={`text-xl font-semibold ${settings.toggles.auctionEnabled ? 'text-violet-300' : 'text-gray-300'}`}>
            {settings.toggles.auctionEnabled ? 'Enabled' : 'Off'}
          </p>
        </div>
      </div>

      <section className="bg-gray-800 border border-gray-700 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Access Controls</h3>
            <p className="text-sm text-gray-400">Flip participant-facing modules on or off.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { key: 'registrationOpen', label: 'Registration', description: 'Allow new teams to sign up immediately.' },
            { key: 'submissionsOpen', label: 'Submissions Window', description: 'Let shortlisted teams upload deliverables.' },
            { key: 'leaderboardVisible', label: 'Public Leaderboard', description: 'Expose leaderboard at /events/:slug/leaderboard.' },
            { key: 'auctionEnabled', label: 'Auction Module', description: 'Unlock bidding controls for problem statements.' }
          ].map(cfg => (
            <label key={cfg.key} className="flex items-start gap-3 border border-gray-700 rounded-xl p-4 bg-gray-900/40">
              <input
                type="checkbox"
                className="mt-1 w-5 h-5 accent-blue-500"
                checked={settings.toggles[cfg.key]}
                onChange={(e) => handleToggle(cfg.key, e.target.checked)}
              />
              <div>
                <p className="font-semibold">{cfg.label}</p>
                <p className="text-sm text-gray-400">{cfg.description}</p>
              </div>
            </label>
          ))}
        </div>
      </section>

      <section className="bg-gray-800 border border-gray-700 rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Deadlines & Limits</h3>
            <p className="text-sm text-gray-400">Keep intake caps and schedule aligned.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-gray-400">Registration Deadline</label>
            <input
              type="datetime-local"
              value={settings.deadlines.registration}
              onChange={(e) => handleNestedChange('deadlines', 'registration', e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400">Submission Deadline</label>
            <input
              type="datetime-local"
              value={settings.deadlines.submission}
              onChange={(e) => handleNestedChange('deadlines', 'submission', e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400">Check-in Window</label>
            <input
              type="datetime-local"
              value={settings.deadlines.checkInWindow}
              onChange={(e) => handleNestedChange('deadlines', 'checkInWindow', e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-gray-400">Max Teams</label>
            <input
              type="number"
              min="0"
              value={settings.limits.maxTeams}
              onChange={(e) => handleNestedChange('limits', 'maxTeams', e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400">Waitlist Cap</label>
            <input
              type="number"
              min="0"
              value={settings.limits.waitlistCap}
              onChange={(e) => handleNestedChange('limits', 'waitlistCap', e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400">Max Teams / College</label>
            <input
              type="number"
              min="0"
              value={settings.limits.maxPerCollege}
              onChange={(e) => handleNestedChange('limits', 'maxPerCollege', e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-800 border border-gray-700 rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Communications & Escalations</h3>
            <p className="text-sm text-gray-400">Surface the right contact info to teams and volunteers.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-400">Primary Contact Name</label>
            <input
              type="text"
              value={settings.communications.primaryContactName}
              onChange={(e) => handleNestedChange('communications', 'primaryContactName', e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400">Primary Contact Email</label>
            <input
              type="email"
              value={settings.communications.primaryContactEmail}
              onChange={(e) => handleNestedChange('communications', 'primaryContactEmail', e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400">Support Email</label>
            <input
              type="email"
              value={settings.communications.supportEmail}
              onChange={(e) => handleNestedChange('communications', 'supportEmail', e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400">Support Phone</label>
            <input
              type="text"
              value={settings.communications.supportPhone}
              onChange={(e) => handleNestedChange('communications', 'supportPhone', e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm text-gray-400">Slack / Discord Channel</label>
            <input
              type="text"
              value={settings.communications.slackChannel}
              onChange={(e) => handleNestedChange('communications', 'slackChannel', e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-800 border border-gray-700 rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Automation</h3>
            <p className="text-sm text-gray-400">Let the system handle repetitive follow-ups.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-start gap-3 border border-gray-700 rounded-xl p-4 bg-gray-900/40">
            <input
              type="checkbox"
              className="mt-1 w-5 h-5 accent-blue-500"
              checked={settings.automation.autoCloseRegistration}
              onChange={(e) => handleNestedChange('automation', 'autoCloseRegistration', e.target.checked)}
            />
            <div>
              <p className="font-semibold">Auto-close registration</p>
              <p className="text-sm text-gray-400">System flips registration toggle off at the deadline.</p>
            </div>
          </label>
          <label className="flex items-start gap-3 border border-gray-700 rounded-xl p-4 bg-gray-900/40">
            <input
              type="checkbox"
              className="mt-1 w-5 h-5 accent-blue-500"
              checked={settings.automation.autoEmailShortlist}
              onChange={(e) => handleNestedChange('automation', 'autoEmailShortlist', e.target.checked)}
            />
            <div>
              <p className="font-semibold">Auto email shortlisting results</p>
              <p className="text-sm text-gray-400">Send templated mailers as soon as decisions lock in.</p>
            </div>
          </label>
          <label className="flex items-start gap-3 border border-gray-700 rounded-xl p-4 bg-gray-900/40">
            <input
              type="checkbox"
              className="mt-1 w-5 h-5 accent-blue-500"
              checked={settings.automation.autoSubmissionReminders}
              onChange={(e) => handleNestedChange('automation', 'autoSubmissionReminders', e.target.checked)}
            />
            <div>
              <p className="font-semibold">Submission nudges</p>
              <p className="text-sm text-gray-400">Send periodic reminders to teams that have not submitted.</p>
            </div>
          </label>
          <div>
            <label className="text-sm text-gray-400">Reminder cadence</label>
            <select
              value={settings.automation.reminderCadence}
              onChange={(e) => handleNestedChange('automation', 'reminderCadence', e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm"
            >
              <option value="12h">Every 12 hours</option>
              <option value="24h">Every 24 hours</option>
              <option value="48h">Every 48 hours</option>
            </select>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 border border-red-600/40 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-red-300">Danger Zone</h3>
        <p className="text-sm text-gray-400">Temporary mocks — will call admin API once available.</p>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 rounded-lg border border-yellow-600 text-yellow-300" onClick={() => alert('Event locked (mock).')}>
            Lock Event
          </button>
          <button className="px-4 py-2 rounded-lg border border-red-600 text-red-300" onClick={() => alert('Event archived (mock).')}>
            Archive Event
          </button>
        </div>
      </section>
    </div>
  );
};

export default SettingsTab;