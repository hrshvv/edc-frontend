export const adminMock = {
  // Platform overall stats
  getDashboardStats: async () => {
    return {
      totalEvents: 8,
      activeEvents: 1,
      totalRegistrations: 312,
      totalParticipants: 900,
      activeEventsList: [
        {
          id: '1',
          title: "Founder's Pit 2026",
          date: 'April 15, 2026',
          status: 'Registration Open',
          registrationsCount: 47,
          slug: 'founders-pit-2026'
        }
      ]
    };
  },

  // Event details
  getEventDetails: async () => {
    return {
      title: "Founder's Pit 2026",
      date: "April 15, 2026",
      venue: "JSS University, Noida",
      stats: {
        registered: 47,
        shortlisted: 12,
        submitted: 10,
        checkedIn: 0,
        daysLeft: 23
      },
      toggles: {
        registrationOpen: true,
        submissionsOpen: false,
        leaderboardVisible: false,
        biddingActive: false
      }
    };
  },

  // Event registrations
  getRegistrations: async () => {
    return [
      { id: 'FP26-0001', teamName: 'Alpha Innovators', size: 4, leadName: 'John Doe', leadEmail: 'john@example.com', year: '3rd', branch: 'CSE', status: 'PENDING', registeredAt: '2026-03-20', members: [{name: 'John Doe', role: 'Lead'}, {name: 'Alice', role: 'Member'}] },
      { id: 'FP26-0002', teamName: 'Beta Builders', size: 3, leadName: 'Jane Smith', leadEmail: 'jane@example.com', year: '2nd', branch: 'IT', status: 'SHORTLISTED', registeredAt: '2026-03-21', members: [{name: 'Jane Smith', role: 'Lead'}] },
      { id: 'FP26-0003', teamName: 'Gamma Creators', size: 2, leadName: 'Mike Johnson', leadEmail: 'mike@example.com', year: '4th', branch: 'ECE', status: 'REJECTED', registeredAt: '2026-03-21', members: [{name: 'Mike', role: 'Lead'}] },
    ];
  },

  // Event submissions
  getSubmissions: async () => {
    return [
      {
        id: 'FP26-0002',
        teamName: 'Beta Builders',
        status: 'Submitted',
        fileName: 'beta_builders_pitch_v3.pdf',
        size: '4.2 MB',
        submittedAt: '2026-03-22 14:00',
        track: 'Sustainability',
        problem: 'Retail Media Analytics',
        reviewer: 'Aditi Sharma',
        score: 8.2
      },
      {
        id: 'FP26-0001',
        teamName: 'Alpha Innovators',
        status: 'Submitted Late',
        fileName: 'alpha_innovators_rev2.pdf',
        size: '5.1 MB',
        submittedAt: '2026-03-22 23:58',
        track: 'Fintech',
        problem: 'Fintech Infrastructure',
        reviewer: 'Raghav Mehta',
        score: 7.4
      },
      {
        id: 'FP26-0005',
        teamName: 'Nova Nexus',
        status: 'Pending',
        fileName: '-',
        size: '-',
        submittedAt: '-',
        track: 'AI/ML',
        problem: 'Smart Campus Ops',
        reviewer: 'Not Assigned',
        score: null
      }
    ];
  },

  getLeaderboard: async () => {
    return {
      updatedAt: '2026-03-23T10:32:00+05:30',
      entries: [
        { teamId: 'team-alpha', rank: 1, team: 'Alpha Innovators', points: 820, delta: +35, problem: 'Fintech Infrastructure' },
        { teamId: 'team-beta', rank: 2, team: 'Beta Builders', points: 780, delta: +10, problem: 'Retail Media Analytics' },
        { teamId: 'team-gamma', rank: 3, team: 'Gamma Creators', points: 715, delta: -5, problem: 'Smart Campus Ops' },
        { teamId: 'team-delta', rank: 4, team: 'Delta Vision', points: 640, delta: 0, problem: null }
      ],
      transactions: [
        { id: 'TX-2031', team: 'Beta Builders', action: 'Bid Won', delta: '+80 pts', problem: 'Retail Media Analytics', timestamp: '10:28 AM' },
        { id: 'TX-2030', team: 'Alpha Innovators', action: 'Manual Adjustment', delta: '+25 pts', problem: 'Compliance', timestamp: '10:24 AM' },
        { id: 'TX-2029', team: 'Gamma Creators', action: 'Bid Lost', delta: '-40 pts', problem: 'Smart Campus Ops', timestamp: '10:18 AM' }
      ],
      problems: [
        { id: 'P-310', title: 'Climate Risk Intelligence', reserve: 500, highestBid: 640, highestTeam: 'Delta Vision' },
        { id: 'P-311', title: 'Retail Media Analytics', reserve: 550, highestBid: 780, highestTeam: 'Beta Builders' },
        { id: 'P-312', title: 'Fintech Infrastructure', reserve: 600, highestBid: 820, highestTeam: 'Alpha Innovators' }
      ]
    };
  },

  getEventSettings: async () => {
    return {
      slug: 'founders-pit-2026',
      toggles: {
        registrationOpen: true,
        submissionsOpen: false,
        leaderboardVisible: false,
        auctionEnabled: true
      },
      deadlines: {
        registration: '2026-04-05T23:59',
        submission: '2026-04-10T23:59',
        checkInWindow: '2026-04-15T08:30'
      },
      limits: {
        maxTeams: 60,
        waitlistCap: 15,
        maxPerCollege: 3
      },
      communications: {
        primaryContactName: 'Aditi Sharma',
        primaryContactEmail: 'aditi@edcjssun.com',
        supportEmail: 'support@edcjssun.com',
        supportPhone: '+91 98111 22334',
        slackChannel: '#fp26-admin'
      },
      automation: {
        autoCloseRegistration: true,
        autoEmailShortlist: true,
        autoSubmissionReminders: true,
        reminderCadence: '24h'
      }
    };
  },

  updateEventSettings: async (_slug, payload) => {
    return {
      ...payload,
      updatedAt: new Date().toISOString()
    };
  }
};
