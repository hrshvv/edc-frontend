import React, { useEffect, useMemo, useState } from 'react';
import { adminService } from '../../../../services/admin.service';

const defaultPayload = { entries: [], transactions: [], problems: [], updatedAt: null };

const LeaderboardTab = ({ eventSlug, biddingActive }) => {
  const [payload, setPayload] = useState(defaultPayload);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
  const [bidForm, setBidForm] = useState({ teamId: '', problemId: '', amount: '' });
  const [adjustForm, setAdjustForm] = useState({ teamId: '', points: '', reason: '' });

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    adminService.getLeaderboard(eventSlug)
      .then((data) => {
        if (cancelled) return;
        setPayload({
          entries: data?.entries || [],
          transactions: data?.transactions || [],
          problems: data?.problems || [],
          updatedAt: data?.updatedAt || null
        });
        setError('');
      })
      .catch(() => {
        if (cancelled) return;
        setError('Unable to load leaderboard snapshot. Try refreshing.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [eventSlug]);

  useEffect(() => {
    if (!toast) return;
    const timeout = setTimeout(() => setToast(''), 2400);
    return () => clearTimeout(timeout);
  }, [toast]);

  const teamOptions = useMemo(() => {
    const lookup = new Map();
    payload.entries.forEach(entry => {
      if (entry.teamId) lookup.set(entry.teamId, entry.team);
    });
    return Array.from(lookup.entries()).map(([id, label]) => ({ id, label }));
  }, [payload.entries]);

  const problemOptions = useMemo(() => {
    return payload.problems.map(prob => ({ id: prob.id, label: prob.title }));
  }, [payload.problems]);

  const formattedUpdatedAt = payload.updatedAt
    ? new Date(payload.updatedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    : null;

  const controlsDisabled = !biddingActive;

  const handleBidSubmit = () => {
    if (controlsDisabled) return;
    if (!bidForm.teamId || !bidForm.problemId || !bidForm.amount) {
      setToast('Pick a team, problem, and amount to place a bid.');
      return;
    }
    setToast('Bid queued (mock). Wire backend to finalize.');
    setBidForm({ teamId: '', problemId: '', amount: '' });
  };

  const handleAdjustment = () => {
    if (!adjustForm.teamId || !adjustForm.points || !adjustForm.reason) {
      setToast('All manual adjustment fields are required.');
      return;
    }
    setToast('Adjustment logged (mock).');
    setAdjustForm({ teamId: '', points: '', reason: '' });
  };

  const renderDelta = (delta) => {
    if (delta === null || delta === undefined) return '—';
    if (delta > 0) return `+${delta}`;
    return `${delta}`;
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className="rounded-xl border border-blue-500/40 bg-blue-900/20 px-4 py-2 text-sm text-blue-200" aria-live="polite">
          {toast}
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-500/50 bg-red-900/20 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      <div className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-xl font-bold">Live Leaderboard</h2>
            <p className="text-sm text-gray-400">Snapshot of the public leaderboard view.</p>
          </div>
          <div className="flex items-center gap-3 text-xs font-semibold tracking-wide">
            {formattedUpdatedAt && (
              <span className="text-gray-400">Updated {formattedUpdatedAt}</span>
            )}
            <span className={`px-3 py-1 rounded-full ${biddingActive ? 'bg-green-900/50 text-green-300' : 'bg-gray-700 text-gray-300'}`}>
              {biddingActive ? 'BIDDING ACTIVE' : 'STANDBY MODE'}
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-900/60 text-gray-400">
              <tr>
                <th className="px-6 py-3 font-medium">Rank</th>
                <th className="px-6 py-3 font-medium">Team Name</th>
                <th className="px-6 py-3 font-medium">Points</th>
                <th className="px-6 py-3 font-medium">Δ</th>
                <th className="px-6 py-3 font-medium">Problem Won</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {loading && (
                <tr>
                  <td colSpan={5} className="px-6 py-6 text-center text-gray-500 text-sm animate-pulse">
                    Warming up mock data…
                  </td>
                </tr>
              )}
              {!loading && payload.entries.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-6 text-center text-gray-500 text-sm">
                    No leaderboard entries yet.
                  </td>
                </tr>
              )}
              {!loading && payload.entries.map(row => (
                <tr key={row.teamId} className="hover:bg-gray-900/40 transition-colors">
                  <td className="px-6 py-3 font-semibold text-lg">{row.rank}</td>
                  <td className="px-6 py-3">
                    <p className="font-medium">{row.team}</p>
                    <p className="text-xs text-gray-500">{row.teamId}</p>
                  </td>
                  <td className="px-6 py-3 text-blue-300 font-semibold">{row.points}</td>
                  <td className={`px-6 py-3 font-semibold ${row.delta > 0 ? 'text-green-300' : row.delta < 0 ? 'text-red-300' : 'text-gray-400'}`}>
                    {renderDelta(row.delta)}
                  </td>
                  <td className="px-6 py-3 text-gray-300">{row.problem || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="text-lg font-semibold">Control Panel</h3>
            <p className="text-sm text-gray-400">Manual overrides stay mocked until PATCH APIs arrive.</p>
          </div>
          <button className="px-4 py-2 text-sm font-semibold rounded-lg border border-gray-600 hover:bg-gray-700/60 transition">
            Export CSV
          </button>
        </div>

        {!biddingActive && (
          <div className="rounded-xl border border-amber-500/40 bg-amber-900/10 px-4 py-3 text-xs text-amber-200">
            Enable "Bidding Active" in Quick Controls to unlock these inputs for the floor team.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`bg-gray-900/60 border border-gray-700 rounded-xl p-4 space-y-3 ${controlsDisabled ? 'opacity-60 pointer-events-none' : ''}`}>
            <p className="text-sm text-gray-400 font-semibold tracking-wide">Bid Entry</p>
            <select
              className="w-full bg-gray-950 border border-gray-700 rounded px-3 py-2 text-sm"
              value={bidForm.teamId}
              onChange={(e) => setBidForm(prev => ({ ...prev, teamId: e.target.value }))}
            >
              <option value="">Select Team</option>
              {teamOptions.map(option => (
                <option key={option.id} value={option.id}>{option.label}</option>
              ))}
            </select>
            <select
              className="w-full bg-gray-950 border border-gray-700 rounded px-3 py-2 text-sm"
              value={bidForm.problemId}
              onChange={(e) => setBidForm(prev => ({ ...prev, problemId: e.target.value }))}
            >
              <option value="">Select Problem</option>
              {problemOptions.map(option => (
                <option key={option.id} value={option.id}>{option.label}</option>
              ))}
            </select>
            <input
              type="number"
              min="0"
              placeholder="Bid Amount"
              className="w-full bg-gray-950 border border-gray-700 rounded px-3 py-2 text-sm"
              value={bidForm.amount}
              onChange={(e) => setBidForm(prev => ({ ...prev, amount: e.target.value }))}
            />
            <button
              onClick={handleBidSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
            >
              Submit Bid
            </button>
          </div>

          <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-4 space-y-3">
            <p className="text-sm text-gray-400 font-semibold tracking-wide">Manual Adjustment</p>
            <select
              className="w-full bg-gray-950 border border-gray-700 rounded px-3 py-2 text-sm"
              value={adjustForm.teamId}
              onChange={(e) => setAdjustForm(prev => ({ ...prev, teamId: e.target.value }))}
            >
              <option value="">Select Team</option>
              {teamOptions.map(option => (
                <option key={option.id} value={option.id}>{option.label}</option>
              ))}
            </select>
            <div className="flex gap-3 text-xs text-gray-400">
              <span className="flex-1 rounded border border-gray-700 px-3 py-2">Add / deduct based on audit trail</span>
              <span className="px-3 py-2 rounded border border-gray-700">Δ pts</span>
            </div>
            <input
              type="number"
              placeholder="Points"
              className="w-full bg-gray-950 border border-gray-700 rounded px-3 py-2 text-sm"
              value={adjustForm.points}
              onChange={(e) => setAdjustForm(prev => ({ ...prev, points: e.target.value }))}
            />
            <textarea
              rows={2}
              placeholder="Reason (required)"
              className="w-full bg-gray-950 border border-gray-700 rounded px-3 py-2 text-sm"
              value={adjustForm.reason}
              onChange={(e) => setAdjustForm(prev => ({ ...prev, reason: e.target.value }))}
            />
            <button
              onClick={handleAdjustment}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium"
            >
              Apply Adjustment
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 text-sm rounded-lg border border-gray-600 hover:bg-gray-700/60 transition">Undo Last Action</button>
          <button className="px-4 py-2 text-sm rounded-lg border border-red-500 text-red-300 hover:bg-red-900/20 transition">Reset All (Super Admin)</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Recent Bid Activity</h3>
              <p className="text-sm text-gray-400">Mirror for the comms team log.</p>
            </div>
          </div>
          <div className="space-y-4">
            {payload.transactions.length === 0 && <p className="text-sm text-gray-500">No transactions logged yet.</p>}
            {payload.transactions.map(item => (
              <div key={item.id} className="flex items-start justify-between border-b border-gray-700/60 pb-3">
                <div>
                  <p className="font-semibold text-sm">{item.team}</p>
                  <p className="text-xs text-gray-400">{item.action} &bull; {item.problem}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">{item.timestamp}</p>
                  <p className={`text-sm font-semibold ${item.delta.includes('+') ? 'text-green-300' : item.delta.includes('-') ? 'text-red-300' : 'text-gray-300'}`}>
                    {item.delta}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Problem Inventory</h3>
              <p className="text-sm text-gray-400">Track reserves, current leader, and bids.</p>
            </div>
          </div>
          <div className="space-y-3">
            {payload.problems.length === 0 && <p className="text-sm text-gray-500">No problem statements assigned.</p>}
            {payload.problems.map(problem => (
              <div key={problem.id} className="border border-gray-700 rounded-xl px-4 py-3">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{problem.title}</p>
                  <span className="text-xs text-gray-400">ID {problem.id}</span>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="text-gray-400 text-xs uppercase">Reserve</p>
                    <p className="font-semibold">{problem.reserve}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase">Highest Bid</p>
                    <p className="font-semibold text-blue-300">{problem.highestBid}</p>
                  </div>
                    <div>
                      <p className="text-gray-400 text-xs uppercase">Leading Team</p>
                      <p className="font-semibold">{problem.highestTeam || '—'}</p>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardTab;
