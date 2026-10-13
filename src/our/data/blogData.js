// Weekly Entrepreneurship Series: "From Campus Problem to First Venture".
//
// Static content for the EDC JSSUN blog (NEC Weekly Blog task). Text is taken
// verbatim from the NEC handoff PDF.
//
// ADDING A POST: append an object with the same shape to `blogPosts` below.
// The index page, the post page and the Previous / Next links are all driven
// by this array, so no other file needs to change. `closing` is an optional
// list of paragraphs shown after the weekly challenge (use [] if none).
//
// DATES (important):
//   - `editionLabel` / `editionDate` are the series edition the article belongs
//     to. They organise the series; they are NOT the publication date.
//   - `publishedOn` is the date the post actually went live on the website.
//     Set it to the real deploy date. Do not backdate it.

// Actual first-publication date on the website (YYYY-MM-DD).
export const PUBLISHED_ON = '2026-10-12';

export const blogPosts = [
  {
    slug: 'find-a-problem-worth-solving',
    part: 1,
    totalParts: 5,
    eyebrow: 'FROM CAMPUS PROBLEM TO FIRST VENTURE / PART 1 OF 5',
    title: 'Find a Problem Worth Solving',
    author: 'EDC JSSUN',
    editionLabel: '16 September 2026',
    publishedOn: PUBLISHED_ON,
    editionDate: '2026-09-16',
    intro: [
      'A startup idea can begin with something ordinary: a student looking for an affordable textbook while another student has the same book sitting unused. The interesting question is not immediately how to build an app. It is why those two people have not already found each other. Entrepreneurship begins when curiosity about an inconvenience becomes a serious effort to understand it.',
    ],
    sections: [
      {
        heading: 'Start with a moment, not a market',
        paragraphs: [
          'For this EDC JSSUN series, imagine a student team exploring a campus textbook exchange. This is a hypothetical example that we will develop across five weekly editions. Saying that the idea serves "all students" is too broad. A more useful starting point is first-year students searching for specific textbooks during the opening weeks of a semester. That identifies a person, a situation and a time when the problem matters.',
          'Next, separate the visible complaint from its possible causes. "Books are expensive" might describe a price problem. "I cannot find the right edition" describes a matching problem. "I do not trust the seller" describes a confidence problem. Each would require a different response. A large catalogue will not help much if students are uncertain whether the listed books are still available.',
        ],
      },
      {
        heading: 'Look at what people already do',
        paragraphs: [
          'Existing workarounds are useful clues. Students might ask seniors, borrow from the library, browse group messages or buy new copies. These alternatives are competitors even if none is a startup. Record where each option works well and where people get stuck. If a group message already solves the problem reliably, a new service needs a clear reason to exist.',
          'Keep observations separate from guesses. "A student contacted three sellers before finding an available copy" is an observation if you actually witnessed or heard that account. "Everyone wants a marketplace" is an assumption. A simple notebook with columns for the problem, affected user, current workaround and unanswered question can prevent an attractive idea from turning into an unsupported conclusion.',
        ],
      },
      {
        heading: 'Choose one problem to investigate',
        paragraphs: [
          'Compare possible problems using three questions: Does this happen repeatedly? Does it cost people meaningful time, money or effort? Can our team reach the people affected? Choose an accessible problem with a specific user group. A student venture does not need to solve every campus inconvenience at once; it needs an opportunity it can examine honestly.',
        ],
      },
      {
        heading: "This week's challenge",
        paragraphs: [
          'Write one sentence: "For [specific users], [problem] occurs during [situation], and the current workaround falls short because [reason]." Mark any unverified parts as assumptions. Then identify five people who have recently faced that situation. In the next edition, we will use conversations to discover whether the problem is strong enough to pursue.',
        ],
      },
    ],
    closing: [],
  },
  {
    slug: 'replace-assumptions-with-conversations',
    part: 2,
    totalParts: 5,
    eyebrow: 'FROM CAMPUS PROBLEM TO FIRST VENTURE / PART 2 OF 5',
    title: 'Replace Assumptions with Conversations',
    author: 'EDC JSSUN',
    editionLabel: '23 September 2026',
    publishedOn: PUBLISHED_ON,
    editionDate: '2026-09-23',
    intro: [
      '"That sounds like a great idea" is pleasant feedback, but it does not tell a student founder what to build. People may encourage a friend without needing the proposed service. After identifying a problem in our first edition, the next step is to learn how people actually experience it. A useful conversation produces a clearer picture of someone\'s behaviour, including reasons the idea might not work.',
    ],
    sections: [
      {
        heading: 'Ask about the last time',
        paragraphs: [
          'Return to our hypothetical campus textbook exchange. Instead of asking, "Would you use our platform?", ask, "Tell me about the last textbook you needed. Where did you look first? What happened next?" Follow up on the edition, condition, price, time spent and final outcome. Questions about a recent experience are easier to answer concretely than predictions about a future product.',
          "Speak to both sides of the exchange. Buyers may care about finding the exact title quickly; sellers may care about avoiding repeated messages and missed meetings. If the team listens only to buyers, it could design a convenient catalogue that sellers have little reason to maintain. Also talk to people beyond the founding team's close friends, including those satisfied with existing alternatives.",
        ],
      },
      {
        heading: 'Listen for differences, not just agreement',
        paragraphs: [
          'Ask permission before taking identifiable notes or recording. Collect only information needed for the research. In your notes, separate what someone said from your interpretation. "I borrowed a copy because I only needed it for two weeks" does not automatically mean that person would buy a discounted copy. It might point towards a different need, or towards no opportunity for this service at all.',
          'After several conversations, group recurring difficulties and exceptions. Perhaps availability matters more than price, or demand appears only at the start of a semester. A small set of interviews offers clues, not proof about the entire campus. Record the number of people spoken to and how they were selected so that early enthusiasm does not become an exaggerated market claim.',
        ],
      },
      {
        heading: 'Move from opinions to a small commitment',
        paragraphs: [
          'Once you understand the problem, describe one narrow offer: a manually checked list of available textbooks for a particular course. Ask whether a buyer wants a relevant match or a seller wants to submit one real listing. Explain exactly what the trial can deliver. Participation is more informative than a compliment, although signing up still does not guarantee a completed exchange.',
        ],
      },
      {
        heading: "This week's challenge",
        paragraphs: [
          'Have five short conversations and document one lesson that challenged your original idea. Write the riskiest remaining assumption and a practical way to test it. For the textbook example, that assumption might be whether accurate listings lead to completed handovers. Next week, we will turn that question into a small experiment before building a full product.',
        ],
      },
    ],
    closing: [],
  },
  {
    slug: 'build-the-smallest-useful-experiment',
    part: 3,
    totalParts: 5,
    eyebrow: 'FROM CAMPUS PROBLEM TO FIRST VENTURE / PART 3 OF 5',
    title: 'Build the Smallest Useful Experiment',
    author: 'EDC JSSUN',
    editionLabel: '30 September 2026',
    publishedOn: PUBLISHED_ON,
    editionDate: '2026-09-30',
    intro: [
      'A team can spend weeks choosing colours, designing a logo and building login screens without learning whether anyone needs its service. The third step in our EDC JSSUN series is to make something small enough to test quickly and useful enough to reveal real behaviour. A minimum viable product, or MVP, should help answer a specific question about the venture.',
    ],
    sections: [
      {
        heading: 'Define the uncertainty first',
        paragraphs: [
          'For our hypothetical textbook exchange, suppose interviews suggest that unreliable availability is a major frustration. The experiment could ask: Will students complete exchanges when listings are checked and introductions are coordinated? A working answer does not require an app. A short intake form, a carefully maintained list and manual introductions may be enough for a small pilot.',
          'Limit the trial to one course and a manageable number of listings. Ask sellers for the title, edition, condition, expected price and current availability. Show buyers enough information to decide whether to request a match. Keep phone numbers and other personal details out of a public catalogue; share contact information only with permission. Minimum scope should still include clear terms and respectful handling of information.',
        ],
      },
      {
        heading: 'Decide what you will measure',
        paragraphs: [
          'Before inviting participants, define the steps: a valid request, a suitable match, an agreed meeting and a confirmed handover. Count each separately. Ten requests and two completed exchanges tell a different story from ten completed exchanges. Ask why people drop out instead of assuming every incomplete transaction is a technical problem.',
          'Set a small, explicit learning target. For example, the team might aim for three completed handovers from ten valid requests within seven days, with no unresolved complaints. These are illustrative trial thresholds, not industry benchmarks. Choose a target appropriate to the experiment before seeing the results. If a threshold is missed, examine what happened rather than quietly redefining success.',
        ],
      },
      {
        heading: 'Improve the point where users struggle',
        paragraphs: [
          'If students request books but cannot agree on collection times, the next change might be a shared handover window. If listings show the wrong editions, improve the intake check. If nobody requests a book, reconsider the offer, audience or timing before adding features. A failed test can still be useful when it rules out a weak assumption at low cost.',
          "Keep a short experiment record: the assumption, trial dates, people reached, outcomes, complaints and next decision. Distinguish actual results from targets. This record helps teammates understand what they learned and prevents the venture's story from drifting away from its evidence.",
        ],
      },
      {
        heading: "This week's challenge",
        paragraphs: [
          'Design a seven-day pilot with one core promise, one main question and a clear limit on time and spending. State what would make you continue, change direction or stop. The next edition will examine whether a useful service can also cover its costs and operate reliably with a student team.',
        ],
      },
    ],
    closing: [],
  },
  {
    slug: 'make-the-numbers-and-the-team-work',
    part: 4,
    totalParts: 5,
    eyebrow: 'FROM CAMPUS PROBLEM TO FIRST VENTURE / PART 4 OF 5',
    title: 'Make the Numbers and the Team Work',
    author: 'EDC JSSUN',
    editionLabel: '7 October 2026',
    publishedOn: PUBLISHED_ON,
    editionDate: '2026-10-07',
    intro: [
      'A successful handover is encouraging. A service that can repeat that handover without exhausting its team is a stronger foundation for a venture. In the previous edition, we designed a small experiment for a hypothetical campus textbook exchange. Now we need to ask two practical questions: What does each exchange cost, and who is responsible for making it happen?',
    ],
    sections: [
      {
        heading: 'Separate money collected from money earned',
        paragraphs: [
          "Suppose a seller receives Rs. 300 for a book and the service charges a separate Rs. 20 coordination fee. In this simplified example, the service earns Rs. 20 per completed exchange. Money passed through to the seller is not the service's own fee revenue. This distinction matters because a busy operation can appear larger than the income it actually keeps.",
          'Assume that each exchange involves Rs. 8 of direct variable costs. The remaining Rs. 12 is contribution towards fixed costs and, eventually, profit. If fixed pilot expenses are Rs. 600, the service would need 50 completed exchanges to cover those expenses at that contribution: 600 divided by 12. These invented figures illustrate the calculation; they are not EDC JSSUN results or a recommended price.',
        ],
      },
      {
        heading: 'Count effort as well as cash',
        paragraphs: [
          'The example excludes founder pay and other possible costs. Record time spent checking listings, answering messages, handling cancellations and resolving complaints. If each handover needs an hour of coordination, volunteer effort can hide a serious operating problem. Test whether clearer information or a better handover process reduces that workload before assuming the model can expand.',
          'Timing also matters. An expense paid today may come before fees collected next week. Keep a simple dated cash record with opening balance, receipts, payments and closing balance. Record refunds when they happen. Any change to pricing should be explained before participation, and willingness to use a free pilot should not be treated as proof that users will accept a fee.',
        ],
      },
      {
        heading: 'Give each task an owner',
        paragraphs: [
          'A small student team might divide responsibilities among user conversations, listing checks, matching and record-keeping. Assign one accountable person and a backup for each essential task. Agree on response times that fit around classes and examinations. A shared status list helps the next person see whether a request is new, matched, completed or unresolved.',
          'Hold a brief weekly review around three questions: What did users struggle with? What did it cost us to deliver? What will we change next? Discuss mistakes without hiding them. Reliability comes from noticing repeated problems and improving the process, not from expecting one enthusiastic teammate to solve every issue.',
        ],
      },
      {
        heading: "This week's challenge",
        paragraphs: [
          'Create a one-page operating sheet containing the fee, variable cost, fixed expenses, cash balance and owners of recurring tasks. Identify the assumption most likely to make the service unsustainable. Next week, we will turn honest evidence about users and operations into a clear story for the wider campus.',
        ],
      },
    ],
    closing: [],
  },
  {
    slug: 'earn-trust-measure-progress-tell-the-story',
    part: 5,
    totalParts: 5,
    eyebrow: 'FROM CAMPUS PROBLEM TO FIRST VENTURE / PART 5 OF 5',
    title: 'Earn Trust, Measure Progress, Tell the Story',
    author: 'EDC JSSUN',
    editionLabel: '14 October 2026',
    publishedOn: PUBLISHED_ON,
    editionDate: '2026-10-14',
    intro: [
      "A venture's first audience is often small: a few classmates, a handful of users and someone willing to give advice. That is enough to begin learning, but a good idea still needs a clear explanation if more people are to try it. Our final weekly edition brings together the series' five steps: understand a problem, listen to users, test a solution, check operations and communicate what the evidence supports.",
    ],
    sections: [
      {
        heading: 'Make one clear promise',
        paragraphs: [
          'For the hypothetical textbook exchange, "a revolutionary student ecosystem" says very little about the actual service. "Find an available copy of the textbook you need and arrange a campus handover" gives readers a concrete reason to pay attention. State who the service helps, what it currently offers and how someone can take the next step. Avoid promising instant matches if availability is limited.',
          "Reach people where the need arises. With the relevant permission, a course group or a campus notice may be more useful for an early trial than a broad promotional campaign. Use a specific invitation and explain any fees or limits. If you share a testimonial, obtain permission and preserve the meaning of the person's feedback. Trust is easier to maintain when the offer and the experience agree.",
        ],
      },
      {
        heading: 'Measure the journey after the click',
        paragraphs: [
          'Page views can show that a message attracted attention. They cannot establish that the service solved a problem. Track the path from relevant visits to valid requests, suitable matches and completed exchanges. For a textbook service, repeat use may follow semester cycles, so a lack of immediate repeat purchases needs context. Also monitor cancellations, unresolved complaints and time spent per exchange.',
          'Report counts alongside percentages. In an illustrative pilot, three completed exchanges from ten valid requests would be a 30% completion rate. That is a description of a very small trial, not proof of campus-wide demand. Explain the trial period, the audience and the remaining uncertainty. Honest limits make feedback more useful because a mentor can see which question needs attention next.',
        ],
      },
      {
        heading: 'Build a pitch around evidence',
        paragraphs: [
          'A short pitch can follow five points: the user and problem, the current workaround, the proposed solution, the evidence so far and the next test. End with a specific request, such as introductions to a relevant user group or feedback on the handover process. If the venture is still an idea, say so. Planned interviews and projected sales belong under next steps, not achievements.',
        ],
      },
      {
        heading: "This week's challenge",
        paragraphs: [
          'Prepare a one-minute explanation and a one-page learning summary. Include one thing that worked, one thing that did not and one decision changed by evidence. Choose whether to continue, narrow the audience, alter the offer or stop the experiment. Every option can be reasonable if the decision follows what you learned.',
        ],
      },
    ],
    closing: [
      "For students beginning their entrepreneurial journey, progress can be modest and concrete: a better question, a clearer promise or a process that saves someone time. EDC JSSUN's weekly series ends with an invitation to take that first measurable step. Choose one problem around you, speak to the people who face it and let their experience shape what you build.",
    ],
  },
];

export const SERIES_TITLE = 'From Campus Problem to First Venture';
export const SERIES_NAME = 'Weekly Entrepreneurship Series';

export const getPostBySlug = slug => blogPosts.find(p => p.slug === slug);

// Returns { prev, next } neighbours in series order (either may be undefined).
export const getAdjacentPosts = slug => {
  const sorted = [...blogPosts].sort((a, b) => a.part - b.part);
  const i = sorted.findIndex(p => p.slug === slug);
  return { prev: sorted[i - 1], next: sorted[i + 1] };
};

export const formatLongDate = iso =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export const getReadingMinutes = post => {
  const words = [
    ...post.intro,
    ...post.sections.flatMap(s => [s.heading, ...s.paragraphs]),
    ...(post.closing || []),
  ]
    .join(' ')
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
};
