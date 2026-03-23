import React, { useMemo, useState } from 'react';

const historySeed = [
  { id: 'log-01', subject: 'Shortlist Notification', recipients: '12 teams', status: 'Delivered', time: 'Mar 22 · 08:15 PM' },
  { id: 'log-02', subject: 'Submission Reminder', recipients: '5 teams', status: 'Opened 68%', time: 'Mar 21 · 06:00 PM' }
];

const CommunicationsTab = () => {
  const [recipient, setRecipient] = useState('ALL');
  const [template, setTemplate] = useState('CUSTOM');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [schedule, setSchedule] = useState({ enable: false, date: '', time: '' });
  const [history, setHistory] = useState(historySeed);
  const [attachments, setAttachments] = useState([]);

  const tags = useMemo(() => ['{{teamName}}', '{{eventName}}', '{{venue}}', '{{deadline}}'], []);

  const triggerTemplate = (value) => {
    setTemplate(value);
    if (value === 'SHORTLISTED') {
      setSubject('Congratulations! You are shortlisted.');
      setMessage('Hello {{teamName}},\n\nWe are thrilled to inform you that you have been shortlisted for {{eventName}}.');
    } else if (value === 'REJECTED') {
      setSubject('Update on your {{eventName}} application');
      setMessage('Hi {{teamName}},\n\nThank you for participating. After careful review...');
    } else if (value === 'PPT_REMINDER') {
      setSubject('Submission Reminder • {{eventName}}');
      setMessage('Hello {{teamName}},\n\nOur records show your PPT is pending. Please upload before {{deadline}}.');
    } else {
      setSubject('');
      setMessage('');
    }
  };

  const sendEmail = () => {
    const timestamp = schedule.enable && schedule.date
      ? `${schedule.date} ${schedule.time || '09:00'} (scheduled)`
      : 'Now';
    const entry = {
      id: crypto.randomUUID(),
      subject: subject || 'Untitled',
      recipients: recipient,
      status: schedule.enable ? 'Scheduled' : 'Delivered',
      time: timestamp
    };
    setHistory(prev => [entry, ...prev]);
    alert(`Email simulation queued for ${recipient} using template ${template}.`);
  };

  const addAttachment = () => {
    const next = `document-${attachments.length + 1}.pdf`;
    setAttachments(prev => [...prev, next]);
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <h2 className="text-xl font-bold">Communications</h2>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Recipient Group</label>
              <select
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-blue-500"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              >
                <option value="ALL">All Registered Teams</option>
                <option value="SHORTLISTED">Shortlisted Teams</option>
                <option value="PENDING">Pending Teams</option>
                <option value="REJECTED">Rejected Teams</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email Template</label>
              <select
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-blue-500"
                value={template}
                onChange={(e) => triggerTemplate(e.target.value)}
              >
                <option value="CUSTOM">Custom Message</option>
                <option value="SHORTLISTED">Shortlisted Notification</option>
                <option value="REJECTED">Rejection Notification</option>
                <option value="PPT_REMINDER">Missing Submission Reminder</option>
              </select>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-700">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Subject Line</label>
              <input
                type="text"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-blue-500"
                placeholder="e.g., Important Update regarding Founder's Pit..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                readOnly={template !== 'CUSTOM'}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-400">Message Body</label>
                <span className="text-xs text-gray-500">Available tags: {tags.join(', ')}</span>
              </div>
              <textarea
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 min-h-[200px]"
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                readOnly={template !== 'CUSTOM'}
              ></textarea>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex gap-3 items-center">
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  className="accent-blue-500"
                  checked={schedule.enable}
                  onChange={(e) => setSchedule(prev => ({ ...prev, enable: e.target.checked }))}
                />
                Schedule send
              </label>
              {schedule.enable && (
                <>
                  <input type="date" className="bg-gray-900 border border-gray-700 rounded px-3 py-1.5 text-sm" value={schedule.date} onChange={(e) => setSchedule(prev => ({ ...prev, date: e.target.value }))} />
                  <input type="time" className="bg-gray-900 border border-gray-700 rounded px-3 py-1.5 text-sm" value={schedule.time} onChange={(e) => setSchedule(prev => ({ ...prev, time: e.target.value }))} />
                </>
              )}
            </div>

            <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-3 text-sm">
              <div className="flex items-center justify-between">
                <p className="text-gray-400">Attachments ({attachments.length})</p>
                <button onClick={addAttachment} className="text-blue-400 text-xs">+ Add mock attachment</button>
              </div>
              {attachments.length > 0 && (
                <ul className="mt-2 text-gray-300 text-xs space-y-1">
                  {attachments.map(file => (
                    <li key={file}>• {file}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={sendEmail}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Send Emails
            </button>
          </div>
        </div>
      </div>

      <aside className="space-y-4">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
          <p className="text-sm font-semibold text-gray-300 mb-2">Delivery Snapshot</p>
          <div className="space-y-2 text-sm text-gray-400">
            <div className="flex justify-between"><span>Open Rate</span><span>68%</span></div>
            <div className="flex justify-between"><span>Click Rate</span><span>22%</span></div>
            <div className="flex justify-between"><span>Bounced</span><span>0</span></div>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
          <p className="text-sm font-semibold text-gray-300 mb-3">Activity Log</p>
          <div className="space-y-3 text-sm">
            {history.map(entry => (
              <div key={entry.id} className="border-b border-gray-700/60 pb-3 last:border-0 last:pb-0">
                <p className="font-medium text-white">{entry.subject}</p>
                <p className="text-xs text-gray-400">{entry.recipients} • {entry.status}</p>
                <p className="text-xs text-gray-500 mt-1">{entry.time}</p>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default CommunicationsTab;