import React, { useEffect, useMemo, useState } from 'react';
import { adminService } from '../../../../services/admin.service';

const statusMeta = {
  Submitted: { label: 'On Time', pill: 'bg-green-900/40 text-green-300 border-green-700/60' },
  'Submitted Late': { label: 'Late', pill: 'bg-yellow-900/40 text-yellow-300 border-yellow-700/60' },
  Pending: { label: 'Missing', pill: 'bg-red-900/30 text-red-300 border-red-800/50' }
};

const SubmissionsTab = ({ eventSlug }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [trackFilter, setTrackFilter] = useState('ALL');
  const [reviewerFilter, setReviewerFilter] = useState('ALL');
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    let cancelled = false;
    adminService.getSubmissions(eventSlug).then(data => {
      if (cancelled) return;
      setSubmissions(data);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [eventSlug]);

  const stats = useMemo(() => {
    return submissions.reduce(
      (acc, item) => {
        if (item.status === 'Submitted') acc.onTime += 1;
        else if (item.status === 'Submitted Late') acc.late += 1;
        else acc.missing += 1;
        return acc;
      },
      { total: submissions.length, onTime: 0, late: 0, missing: 0 }
    );
  }, [submissions]);

  const trackOptions = useMemo(() => {
    const set = new Set();
    submissions.forEach(item => item.track && set.add(item.track));
    return Array.from(set).sort();
  }, [submissions]);

  const reviewerOptions = useMemo(() => {
    const set = new Set();
    submissions.forEach(item => item.reviewer && set.add(item.reviewer));
    return Array.from(set).sort();
  }, [submissions]);

  const filteredSubmissions = useMemo(() => {
    return submissions.filter(item => {
      const target = `${item.teamName} ${item.id} ${item.problem}`.toLowerCase();
      const matchesSearch = target.includes(search.trim().toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
      const matchesTrack = trackFilter === 'ALL' || item.track === trackFilter;
      const matchesReviewer = reviewerFilter === 'ALL' || item.reviewer === reviewerFilter;
      return matchesSearch && matchesStatus && matchesTrack && matchesReviewer;
    });
  }, [submissions, search, statusFilter, trackFilter, reviewerFilter]);

  const toggleSelect = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(entry => entry !== id) : [...prev, id]);
  };

  const toggleSelectAll = (checked) => {
    if (checked) setSelected(filteredSubmissions.map(item => item.id));
    else setSelected([]);
  };

  const bulkReminder = () => {
    if (!selected.length) return;
    alert(`Reminder email queued for ${selected.length} teams.`);
    setSelected([]);
  };

  const markReceived = () => {
    if (!selected.length) return;
    setSubmissions(prev => prev.map(item => (
      selected.includes(item.id)
        ? { ...item, status: 'Submitted', submittedAt: item.submittedAt === '-' ? 'Manual' : item.submittedAt }
        : item
    )));
    setSelected([]);
  };

  if (loading) return <div className="text-gray-400 py-10">Loading submissions...</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
          <p className="text-xs uppercase text-gray-500 font-semibold tracking-wide">Total Shortlisted</p>
          <p className="text-2xl font-bold mt-1">{stats.total}</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
          <p className="text-xs uppercase text-gray-500 font-semibold tracking-wide">On Time</p>
          <p className="text-2xl font-bold text-green-300 mt-1">{stats.onTime}</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
          <p className="text-xs uppercase text-gray-500 font-semibold tracking-wide">Late</p>
          <p className="text-2xl font-bold text-yellow-300 mt-1">{stats.late}</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
          <p className="text-xs uppercase text-gray-500 font-semibold tracking-wide">Missing</p>
          <p className="text-2xl font-bold text-red-300 mt-1">{stats.missing}</p>
        </div>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-4 space-y-3">
        <div className="flex flex-col lg:flex-row gap-3">
          <input
            type="text"
            placeholder="Search by team, ID, or problem"
            className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm border border-gray-600 rounded-lg hover:bg-gray-700/60">Download ZIP</button>
            <button className="px-4 py-2 text-sm border border-gray-600 rounded-lg hover:bg-gray-700/60">Export CSV</button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm">
            {['ALL', 'Submitted', 'Submitted Late', 'Pending'].map(option => (
              <option key={option} value={option}>{option === 'ALL' ? 'All Statuses' : option}</option>
            ))}
          </select>
          <select value={trackFilter} onChange={(e) => setTrackFilter(e.target.value)} className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm">
            <option value="ALL">All Tracks</option>
            {trackOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <select value={reviewerFilter} onChange={(e) => setReviewerFilter(e.target.value)} className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm">
            <option value="ALL">All Reviewers</option>
            {reviewerOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {selected.length > 0 && (
        <div className="bg-blue-950/40 border border-blue-800/40 rounded-2xl p-4 flex flex-wrap items-center gap-3 text-sm">
          <p className="text-blue-200 font-semibold">{selected.length} teams selected</p>
          <button onClick={bulkReminder} className="px-3 py-1.5 rounded-lg bg-blue-600/80 text-white text-xs">
            Send Reminder
          </button>
          <button onClick={markReceived} className="px-3 py-1.5 rounded-lg bg-green-600/80 text-white text-xs">
            Mark Received
          </button>
          <button onClick={() => setSelected([])} className="text-blue-200 text-xs underline ml-auto">Clear selection</button>
        </div>
      )}

      <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-900/50 border-b border-gray-700 text-gray-400">
              <tr>
                <th className="px-4 py-3">
                  <input
                    type="checkbox"
                    className="accent-blue-500"
                    checked={selected.length === filteredSubmissions.length && filteredSubmissions.length > 0}
                    onChange={(e) => toggleSelectAll(e.target.checked)}
                  />
                </th>
                <th className="px-4 py-3 font-medium">Team</th>
                <th className="px-4 py-3 font-medium">Track / Problem</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Reviewer</th>
                <th className="px-4 py-3 font-medium">Score</th>
                <th className="px-4 py-3 font-medium">File</th>
                <th className="px-4 py-3 font-medium">Submitted</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {filteredSubmissions.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-6 text-center text-gray-500">No submissions match the current filters.</td>
                </tr>
              )}
              {filteredSubmissions.map(item => (
                <tr key={item.id} className="hover:bg-gray-700/20 transition-colors">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      className="accent-blue-500"
                      checked={selected.includes(item.id)}
                      onChange={() => toggleSelect(item.id)}
                    />
                  </td>
                  <td className="px-4 py-3 font-semibold">
                    {item.teamName}
                    <span className="block text-xs text-gray-500 font-mono">{item.id}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-300">
                    <p>{item.track || '—'}</p>
                    <p className="text-xs text-gray-500">{item.problem || '—'}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${statusMeta[item.status]?.pill || 'bg-gray-700 text-gray-300 border-gray-600'}`}>
                      {statusMeta[item.status]?.label || item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-300">{item.reviewer || 'Not Assigned'}</td>
                  <td className="px-4 py-3 text-gray-200">{item.score ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-300">
                    {item.fileName !== '-' ? (
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                        {item.fileName}
                        <span className="text-xs text-gray-500">({item.size})</span>
                      </div>
                    ) : (
                      <button onClick={() => toggleSelect(item.id)} className="text-blue-300 text-xs underline">
                        Nudge to Submit
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{item.submittedAt}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-blue-400 hover:text-blue-300 text-xs border border-blue-900/40 bg-blue-900/10 px-3 py-1 rounded">
                        View Deck
                      </button>
                      <button className="text-gray-300 hover:text-white text-xs">⋮</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubmissionsTab;