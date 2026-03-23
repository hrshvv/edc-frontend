import React from 'react';

const TeamDetailDrawer = ({ open, team, onClose }) => {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Slide-in Panel */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-gray-900 border-l border-gray-700 shadow-2xl transform transition-transform duration-300 ease-in-out">
        {team ? (
          <div className="h-full flex flex-col">
            <div className="p-6 border-b border-gray-700 flex justify-between items-center bg-gray-800">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">{team.teamName}</h2>
                <p className="text-gray-400 text-sm font-mono">{team.id}</p>
              </div>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-700 transition"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="mb-6">
                <label className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-2 outline-none block">Status</label>
                <div className="flex gap-2">
                  {['PENDING', 'SHORTLISTED', 'REJECTED'].map((s) => (
                    <button
                      key={s}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                        team.status === s 
                          ? (s === 'SHORTLISTED' ? 'bg-green-600/20 text-green-400 border border-green-600/50' : 
                             s === 'REJECTED' ? 'bg-red-600/20 text-red-400 border border-red-600/50' : 
                             'bg-yellow-600/20 text-yellow-400 border border-yellow-600/50')
                          : 'bg-gray-800 text-gray-500 border border-gray-700 hover:bg-gray-700'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-sm font-bold text-white mb-3" style={{ borderBottom: '1px solid #374151', paddingBottom: '0.5rem' }}>Team Members</h3>
                <div className="space-y-4">
                  {team.members.map((member, idx) => (
                    <div key={idx} className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-white">{member.name}</span>
                        {member.role === 'Lead' && <span className="bg-blue-600/20 text-blue-400 text-[10px] px-2 py-0.5 rounded uppercase font-bold">Team Lead</span>}
                      </div>
                      <p className="text-xs text-gray-400">Sample Email • 3rd Year • CSE</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-2 block">Internal Notes</label>
                <textarea 
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-sm text-gray-300 min-h-[100px] focus:outline-none focus:border-blue-500"
                  placeholder="Add private review notes here..."
                ></textarea>
                <button className="mt-2 text-sm bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded transition-colors text-white">Save Note</button>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-700 bg-gray-800">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition-colors">
                Send Email to Team
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 text-gray-400">Loading...</div>
        )}
      </div>
    </>
  );
};

export default TeamDetailDrawer;