import React, { useState, useEffect, useMemo } from 'react';
import { adminService } from '../../../../services/admin.service';
import TeamDetailDrawer from './TeamDetailDrawer';

const statusPill = {
  PENDING: 'bg-yellow-900/30 text-yellow-300 border-yellow-800/50',
  SHORTLISTED: 'bg-green-900/30 text-green-300 border-green-800/50',
  REJECTED: 'bg-red-900/30 text-red-300 border-red-800/50',
  WAITLISTED: 'bg-blue-900/30 text-blue-300 border-blue-800/50'
};

const RegistrationsTab = ({ eventSlug }) => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [branchFilter, setBranchFilter] = useState('ALL');
  const [yearFilter, setYearFilter] = useState('ALL');
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    let cancelled = false;
    adminService.getRegistrations(eventSlug).then(data => {
      if (cancelled) return;
      setRegistrations(data);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [eventSlug]);

  const stats = useMemo(() => {
    const base = { total: registrations.length, shortlisted: 0, pending: 0, rejected: 0 };
    registrations.forEach(team => {
      if (team.status === 'SHORTLISTED') base.shortlisted += 1;
      else if (team.status === 'REJECTED') base.rejected += 1;
      else base.pending += 1;
    });
    return base;
  }, [registrations]);

  const branchOptions = useMemo(() => {
    const set = new Set();
    registrations.forEach(team => team.branch && set.add(team.branch));
    return Array.from(set).sort();
  }, [registrations]);

  const yearOptions = useMemo(() => {
    const set = new Set();
    registrations.forEach(team => team.year && set.add(team.year));
    return Array.from(set).sort();
  }, [registrations]);

  const filteredRegistrations = useMemo(() => {
    return registrations.filter(team => {
      const matchesSearch = `${team.teamName} ${team.leadName} ${team.id}`
        .toLowerCase()
        .includes(search.trim().toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || team.status === statusFilter;
      const matchesBranch = branchFilter === 'ALL' || team.branch === branchFilter;
      const matchesYear = yearFilter === 'ALL' || team.year === yearFilter;
      return matchesSearch && matchesStatus && matchesBranch && matchesYear;
    });
  }, [registrations, search, statusFilter, branchFilter, yearFilter]);

  const toggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const toggleSelectAll = (checked) => {
    if (checked) {
      setSelectedIds(filteredRegistrations.map(team => team.id));
    } else {
      setSelectedIds([]);
    }
  };

  const hasSelection = selectedIds.length > 0;

  const updateStatuses = (ids, newStatus) => {
    if (!ids.length) return;
    setRegistrations(prev => prev.map(team => (
      ids.includes(team.id) ? { ...team, status: newStatus } : team
    )));
  };

  const handleBulkUpdate = (newStatus) => {
    updateStatuses(selectedIds, newStatus);
    setSelectedIds([]);
  };

  const clearFilters = () => {
    setSearch('');
    setStatusFilter('ALL');
    setBranchFilter('ALL');
    setYearFilter('ALL');
  };

  if (loading) return <div className="text-gray-400 py-10">Loading registrations...</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
          <p className="text-xs uppercase text-gray-500 font-semibold tracking-wide">Total Registered</p>
          <p className="text-2xl font-bold mt-1">{stats.total}</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
          <p className="text-xs uppercase text-gray-500 font-semibold tracking-wide">Pending Review</p>
          <p className="text-2xl font-bold text-yellow-300 mt-1">{stats.pending}</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase text-gray-500 font-semibold tracking-wide">Shortlisted</p>
            <p className="text-2xl font-bold text-green-300 mt-1">{stats.shortlisted}</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase text-gray-500 font-semibold tracking-wide">Rejected</p>
            <p className="text-lg font-bold text-red-300 mt-1">{stats.rejected}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-4 md:p-5 space-y-3">
        <div className="flex flex-col lg:flex-row gap-3">
          <input
            type="text"
            placeholder="Search by team, lead, or ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          />
          <div className="flex gap-2">
            <button onClick={clearFilters} className="px-4 py-2 text-sm border border-gray-600 rounded-lg hover:bg-gray-700/60">Clear</button>
            <button className="px-4 py-2 text-sm border border-gray-600 rounded-lg hover:bg-gray-700/60">Export CSV</button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm"
          >
            {['ALL', 'PENDING', 'SHORTLISTED', 'WAITLISTED', 'REJECTED'].map(option => (
              <option key={option} value={option}>{option === 'ALL' ? 'All Statuses' : option}</option>
            ))}
          </select>
          <select
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
            className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm"
          >
            <option value="ALL">All Branches</option>
            {branchOptions.map(branch => (
              <option key={branch} value={branch}>{branch}</option>
            ))}
          </select>
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm"
          >
            <option value="ALL">All Years</option>
            {yearOptions.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      {hasSelection && (
        <div className="bg-blue-950/40 border border-blue-800/40 rounded-2xl p-4 flex flex-wrap items-center gap-3 text-sm">
          <p className="text-blue-200 font-semibold">{selectedIds.length} selected</p>
          <div className="flex gap-2">
            <button onClick={() => handleBulkUpdate('SHORTLISTED')} className="px-3 py-1.5 rounded-lg bg-green-600/80 text-white">
              Mark Shortlisted
            </button>
            <button onClick={() => handleBulkUpdate('WAITLISTED')} className="px-3 py-1.5 rounded-lg bg-yellow-600/80 text-white">
              Waitlist
            </button>
            <button onClick={() => handleBulkUpdate('REJECTED')} className="px-3 py-1.5 rounded-lg bg-red-600/80 text-white">
              Reject
            </button>
          </div>
          <button onClick={() => setSelectedIds([])} className="ml-auto text-xs text-blue-200 underline">Clear selection</button>
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
                    checked={selectedIds.length === filteredRegistrations.length && filteredRegistrations.length > 0}
                    onChange={(e) => toggleSelectAll(e.target.checked)}
                  />
                </th>
                <th className="px-4 py-3 font-medium">Reg ID</th>
                <th className="px-4 py-3 font-medium">Team</th>
                <th className="px-4 py-3 font-medium">Lead & Branch</th>
                <th className="px-4 py-3 font-medium">Year / Size</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Registered</th>
                <th className="px-4 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {filteredRegistrations.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-6 text-center text-gray-500">No registrations match the current filters.</td>
                </tr>
              )}
              {filteredRegistrations.map(team => (
                <tr key={team.id} className="hover:bg-gray-700/20 transition-colors">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      className="accent-blue-500"
                      checked={selectedIds.includes(team.id)}
                      onChange={() => toggleSelect(team.id)}
                    />
                  </td>
                  <td className="px-4 py-3 text-gray-400 font-mono text-xs">{team.id}</td>
                  <td className="px-4 py-3 font-semibold flex flex-col">
                    {team.teamName}
                    <span className="text-xs text-gray-500">{team.members?.length || team.size} participants</span>
                  </td>
                  <td className="px-4 py-3 text-gray-300">
                    {team.leadName}
                    {team.branch && <span className="text-xs text-gray-500 block">{team.branch}</span>}
                    <p className="text-xs text-gray-500">{team.leadEmail}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-300">
                    {team.year || '—'}
                    <span className="text-xs text-gray-500 block">{team.size} members</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${statusPill[team.status] || 'bg-gray-700 text-gray-300 border-gray-600'}`}>
                      {team.status || 'PENDING'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{team.registeredAt || '—'}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => updateStatuses([team.id], 'SHORTLISTED')}
                        className="text-green-400 hover:text-green-300 text-xs font-semibold"
                      >
                        Shortlist
                      </button>
                      <button
                        onClick={() => updateStatuses([team.id], 'REJECTED')}
                        className="text-red-400 hover:text-red-300 text-xs font-semibold"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => setSelectedTeam(team)}
                        className="text-blue-400 hover:text-blue-300 font-medium"
                      >
                        View →
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <TeamDetailDrawer
        open={!!selectedTeam}
        team={selectedTeam}
        onClose={() => setSelectedTeam(null)}
      />
    </div>
  );
};

export default RegistrationsTab;