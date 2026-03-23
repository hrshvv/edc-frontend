import React, { useEffect, useMemo, useState } from 'react';
import { adminService } from '../../../../services/admin.service';
import { Check, X, Clock, Filter, ListCollapse, Sparkles } from 'lucide-react';

const ShortlistTab = ({ eventSlug }) => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('score');

  useEffect(() => {
    adminService.getRegistrations(eventSlug).then(data => {
      const enhancedTeams = data.map(team => ({
        ...team,
        notes: team.notes || '',
        pptStatus: Math.random() > 0.5 ? 'Submitted' : 'Pending',
        reviewer: team.reviewer || (Math.random() > 0.5 ? 'Panel A' : 'Panel B'),
        score: team.score ?? Number((6.5 + Math.random() * 3).toFixed(1)),
        status: team.status || 'PENDING'
      }));
      setTeams(enhancedTeams);
      setLoading(false);
    });
  }, [eventSlug]);

  const handleStatusChange = (id, newStatus) => {
    setTeams(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const handleNotesChange = (id, newNotes) => {
    setTeams(prev => prev.map(t => t.id === id ? { ...t, notes: newNotes } : t));
  };

  const handleReviewerChange = (id, reviewer) => {
    setTeams(prev => prev.map(t => t.id === id ? { ...t, reviewer } : t));
  };

  const handleConfirmAll = () => {
    console.log('Sending shortlisting decisions in bulk:', teams.map(t => ({ id: t.id, status: t.status, notes: t.notes, reviewer: t.reviewer })));
    alert('Decisions confirmed and logged to console!');
  };

  const stats = useMemo(() => {
    return teams.reduce(
      (acc, team) => {
        if (team.status === 'SHORTLISTED') acc.shortlisted += 1;
        else if (team.status === 'WAITLISTED') acc.waitlisted += 1;
        else if (team.status === 'REJECTED') acc.rejected += 1;
        else acc.pending += 1;
        return acc;
      },
      { total: teams.length, shortlisted: 0, waitlisted: 0, rejected: 0, pending: 0 }
    );
  }, [teams]);

  const filteredTeams = teams
    .filter(t => {
      const matchesSearch = `${t.teamName} ${t.id} ${t.leadName}`.toLowerCase().includes(search.trim().toLowerCase());
      if (filter === 'All') return matchesSearch;
      if (filter === 'Pending Review') return matchesSearch && t.status === 'PENDING';
      return matchesSearch && t.status.toLowerCase() === filter.toLowerCase();
    })
    .sort((a, b) => {
      if (sort === 'score') return b.score - a.score;
      if (sort === 'ppt') return (a.pptStatus === 'Submitted' ? -1 : 1);
      return 0;
    });

  if (loading) return <div className="text-gray-400 py-10">Loading teams...</div>;

  return (
    <div className="relative pb-24 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
          <p className="text-xs uppercase text-gray-500 font-semibold tracking-wide">Total Reviewed</p>
          <p className="text-2xl font-bold mt-1">{stats.total}</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
          <p className="text-xs uppercase text-gray-500 font-semibold tracking-wide">Shortlisted</p>
          <p className="text-2xl font-bold text-green-300 mt-1">{stats.shortlisted}</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
          <p className="text-xs uppercase text-gray-500 font-semibold tracking-wide">Waitlisted</p>
          <p className="text-2xl font-bold text-yellow-300 mt-1">{stats.waitlisted}</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
          <p className="text-xs uppercase text-gray-500 font-semibold tracking-wide">Pending Review</p>
          <p className="text-2xl font-bold text-blue-300 mt-1">{stats.pending}</p>
        </div>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-4 flex flex-col lg:flex-row gap-3 items-center">
        <div className="flex-1 flex flex-wrap gap-2">
          {['All', 'Pending Review', 'Shortlisted', 'Waitlisted', 'Rejected'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                filter === f ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-900'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search by team, lead, ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full lg:w-60 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
        />
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm">
          <option value="score">Sort by Score</option>
          <option value="ppt">PPT Received First</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredTeams.length === 0 ? (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-10 text-center text-gray-400">
            <Filter className="w-10 h-10 mx-auto mb-3 opacity-20" />
            No teams found for the current filter.
          </div>
        ) : (
          filteredTeams.map((team, idx) => (
            <div key={team.id || idx} className="bg-gray-800 border border-gray-700 rounded-xl p-5 flex flex-col md:flex-row gap-5">
              <div className="flex-1 space-y-3">
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      {team.teamName}
                      <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded font-mono">{team.id}</span>
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">Lead: {team.leadName} • {team.branch} ({team.year}) • {team.size} Members</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                      team.status === 'SHORTLISTED' ? 'bg-green-900/30 text-green-400 border-green-800/50' :
                      team.status === 'REJECTED' ? 'bg-red-900/30 text-red-400 border-red-800/50' :
                      team.status === 'WAITLISTED' ? 'bg-yellow-900/30 text-yellow-400 border-yellow-800/50' :
                      'bg-gray-700 text-gray-300 border-gray-600'
                    }`}>
                      {team.status === 'SHORTLISTED' && <Check size={12} />}
                      {team.status === 'REJECTED' && <X size={12} />}
                      {team.status === 'WAITLISTED' && <Clock size={12} />}
                      {team.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">Score {team.score}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm mt-2">
                  <div className="bg-gray-900/50 px-3 py-2 rounded border border-gray-700/50">
                    <span className="text-gray-500 block text-xs uppercase font-semibold mb-1">PPT Status</span>
                    <span className={`font-medium ${team.pptStatus === 'Submitted' ? 'text-blue-400' : 'text-orange-400'}`}>
                      {team.pptStatus}
                    </span>
                  </div>
                  <div className="bg-gray-900/50 px-3 py-2 rounded border border-gray-700/50">
                    <span className="text-gray-500 block text-xs uppercase font-semibold mb-1">Reviewer Pod</span>
                    <select
                      value={team.reviewer}
                      onChange={(e) => handleReviewerChange(team.id, e.target.value)}
                      className="w-full bg-transparent border border-gray-700 rounded px-2 py-1 text-sm"
                    >
                      {['Panel A', 'Panel B', 'Panel C'].map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div className="bg-gray-900/50 px-3 py-2 rounded border border-gray-700/50 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-violet-300" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold">Focus Area</p>
                      <p className="font-medium text-gray-200">{team.branch}</p>
                    </div>
                  </div>
                </div>

                {team.pptStatus === 'Submitted' && (
                  <button className="w-full sm:w-auto flex items-center gap-2 justify-center px-4 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded transition-colors text-sm font-medium">
                    View PPT
                  </button>
                )}
              </div>

              <div className="w-full md:w-80 flex flex-col gap-3">
                <textarea
                  placeholder="Reviewer Notes... (Internal only)"
                  value={team.notes}
                  onChange={(e) => handleNotesChange(team.id, e.target.value)}
                  className="w-full h-20 bg-gray-900 border border-gray-700 rounded-lg p-3 text-sm text-gray-200 resize-none placeholder:text-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleStatusChange(team.id, 'SHORTLISTED')}
                    className={`flex items-center justify-center gap-1.5 py-1.5 rounded border transition-colors ${
                      team.status === 'SHORTLISTED'
                        ? 'bg-green-600 border-green-500 text-white'
                        : 'bg-gray-900 border-gray-700 text-gray-400 hover:text-green-400 hover:border-green-900/50'
                    }`}
                  >
                    <Check size={14} /> <span className="text-xs font-medium">Yes</span>
                  </button>
                  <button
                    onClick={() => handleStatusChange(team.id, 'WAITLISTED')}
                    className={`flex items-center justify-center gap-1.5 py-1.5 rounded border transition-colors ${
                      team.status === 'WAITLISTED'
                        ? 'bg-yellow-600 border-yellow-500 text-white'
                        : 'bg-gray-900 border-gray-700 text-gray-400 hover:text-yellow-400 hover:border-yellow-900/50'
                    }`}
                  >
                    <Clock size={14} /> <span className="text-xs font-medium">Wait</span>
                  </button>
                  <button
                    onClick={() => handleStatusChange(team.id, 'REJECTED')}
                    className={`flex items-center justify-center gap-1.5 py-1.5 rounded border transition-colors ${
                      team.status === 'REJECTED'
                        ? 'bg-red-600 border-red-500 text-white'
                        : 'bg-gray-900 border-gray-700 text-gray-400 hover:text-red-400 hover:border-red-900/50'
                    }`}
                  >
                    <X size={14} /> <span className="text-xs font-medium">No</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800 p-4 flex justify-between items-center z-10">
        <div className="text-sm text-gray-400">
          <span className="font-semibold text-white">{stats.shortlisted}</span> Shortlisted •{' '}
          <span className="font-semibold text-white">{stats.pending}</span> Pending
        </div>
        <button
          onClick={handleConfirmAll}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg shadow-lg flex items-center gap-2 transition-colors"
        >
          <ListCollapse size={18} />
          Confirm All Decisions
        </button>
      </div>
    </div>
  );
};

export default ShortlistTab;