import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Trash2 } from 'lucide-react';

const CreateEvent = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    tagline: '',
    description: '',
    coverImageUrl: '',
    logoUrl: '',
    eventDate: '',
    venue: '',
    eligibility: '',
    entryFee: '',
    teamSizeMin: '',
    teamSizeMax: '',
    maxTeams: '',
    auctionEnabled: false,
    prizes: [],
    rounds: [],
    problems: [],
    registrationDeadline: '',
    pptSubmissionDeadline: '',
    isPublic: false,
    registrationOpen: false,
  });
  const [errors, setErrors] = useState({});
  const [draftStatus, setDraftStatus] = useState('');

  useEffect(() => {
    const draft = localStorage.getItem('createEventDraft');
    if (draft) {
      try {
        setFormData(JSON.parse(draft));
        setDraftStatus('Draft restored from previous session.');
      } catch (err) {
        console.error('Failed to parse draft', err);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.title.trim()) newErrors.title = 'Event title is required.';
      if (!formData.tagline.trim()) newErrors.tagline = 'Tagline is required.';
      if (!formData.description.trim()) newErrors.description = 'Description is required.';
      if (!formData.coverImageUrl.trim()) newErrors.coverImageUrl = 'Cover image URL is required.';
      if (!formData.logoUrl.trim()) newErrors.logoUrl = 'Logo URL is required.';
    }
    if (step === 2) {
      if (!formData.eventDate) newErrors.eventDate = 'Event date is required.';
      if (!formData.venue.trim()) newErrors.venue = 'Venue is required.';
      if (!formData.eligibility.trim()) newErrors.eligibility = 'Eligibility notes are required.';
      if (formData.entryFee === '') newErrors.entryFee = 'Entry fee is required (0 if free).';
      if (!formData.maxTeams) newErrors.maxTeams = 'Max teams is required.';
      if (!formData.teamSizeMin) newErrors.teamSizeMin = 'Min team size is required.';
      if (!formData.teamSizeMax) newErrors.teamSizeMax = 'Max team size is required.';
      if (formData.teamSizeMin && formData.teamSizeMax && Number(formData.teamSizeMin) > Number(formData.teamSizeMax)) {
        newErrors.teamSizeMax = 'Max team size must be greater than min team size.';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setErrors({});
      setStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setErrors({});
    setStep(prev => prev - 1);
  };

  const handleSaveDraft = () => {
    localStorage.setItem('createEventDraft', JSON.stringify(formData));
    setDraftStatus('Draft saved locally.');
  };

  const handlePublish = () => {
    console.log('Publishing Event Data:', formData);
    localStorage.removeItem('createEventDraft');
    alert('Event data logged to console (Mock Publish).');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin/dashboard" className="text-gray-400 hover:text-white">&larr; Back</Link>
        <h1 className="text-3xl font-bold">Create New Event</h1>
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 md:p-10">
        {draftStatus && (
          <div className="mb-4 text-sm text-blue-300 bg-blue-900/30 border border-blue-700/60 rounded-lg px-4 py-2">
            {draftStatus}
          </div>
        )}
        {/* Step Indicator */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {[1, 2, 3, 4, 5, 6, 7].map(s => (
            <div key={s} className={`shrink-0 h-2 w-12 rounded-full ${s <= step ? 'bg-blue-500' : 'bg-gray-600'}`} />
          ))}
        </div>

        {/* Form Steps */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Step 1: Basics</h2>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Event Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white" placeholder="E.g., Founder's Pit 2026" />
              {errors.title && <p className="text-xs text-red-400 mt-1">{errors.title}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Event Slug (Auto-generated if left blank)</label>
                <input type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white" placeholder="founders-pit-2026" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Tagline</label>
                <input type="text" name="tagline" value={formData.tagline} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white" placeholder="The ultimate pitching event..." />
                {errors.tagline && <p className="text-xs text-red-400 mt-1">{errors.tagline}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Event Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white" placeholder="Tell participants what makes this event different..." />
              {errors.description && <p className="text-xs text-red-400 mt-1">{errors.description}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Cover Image URL</label>
                <input type="text" name="coverImageUrl" value={formData.coverImageUrl} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white" placeholder="https://..." />
                {errors.coverImageUrl && <p className="text-xs text-red-400 mt-1">{errors.coverImageUrl}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Logo URL</label>
                <input type="text" name="logoUrl" value={formData.logoUrl} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white" placeholder="https://..." />
                {errors.logoUrl && <p className="text-xs text-red-400 mt-1">{errors.logoUrl}</p>}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Step 2: Logistics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Event Date</label>
                <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white" />
                {errors.eventDate && <p className="text-xs text-red-400 mt-1">{errors.eventDate}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Venue</label>
                <input type="text" name="venue" value={formData.venue} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white" />
                {errors.venue && <p className="text-xs text-red-400 mt-1">{errors.venue}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Eligibility & Guidelines</label>
              <textarea name="eligibility" value={formData.eligibility} onChange={handleChange} rows={3} className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white" placeholder="Who can apply? Any year/branch restrictions?" />
              {errors.eligibility && <p className="text-xs text-red-400 mt-1">{errors.eligibility}</p>}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Entry Fee (₹)</label>
                <input type="number" name="entryFee" value={formData.entryFee} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white" placeholder="0" />
                {errors.entryFee && <p className="text-xs text-red-400 mt-1">{errors.entryFee}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Max Teams</label>
                <input type="number" name="maxTeams" value={formData.maxTeams} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white" placeholder="e.g., 60" />
                {errors.maxTeams && <p className="text-xs text-red-400 mt-1">{errors.maxTeams}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Team Size Min</label>
                <input type="number" name="teamSizeMin" value={formData.teamSizeMin} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white" placeholder="2" />
                {errors.teamSizeMin && <p className="text-xs text-red-400 mt-1">{errors.teamSizeMin}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Team Size Max</label>
                <input type="number" name="teamSizeMax" value={formData.teamSizeMax} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white" placeholder="4" />
                {errors.teamSizeMax && <p className="text-xs text-red-400 mt-1">{errors.teamSizeMax}</p>}
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Step 5: Module Options</h2>
            <div className="flex items-center gap-3 bg-gray-900 p-4 border border-gray-700 rounded">
              <input type="checkbox" name="auctionEnabled" checked={formData.auctionEnabled} onChange={handleChange} className="w-5 h-5" />
              <div>
                <p className="font-medium">Enable Auction / Virtual Points System</p>
                <p className="text-sm text-gray-400">Allows assigning problems to teams via a points bidding system.</p>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Step 3: Prizes</h2>
              <button onClick={() => setFormData(prev => ({...prev, prizes: [...prev.prizes, { rank: '', label: '', amount: '', perks: '' }]}))} className="flex items-center gap-2 px-3 py-1 bg-gray-700 rounded text-sm hover:bg-gray-600">
                <Plus size={16} /> Add Prize
              </button>
            </div>
            {formData.prizes.length === 0 ? (
              <p className="text-gray-400">No prizes added yet.</p>
            ) : (
              <div className="space-y-4">
                {formData.prizes.map((prize, idx) => (
                  <div key={idx} className="bg-gray-900 border border-gray-700 p-4 rounded relative">
                    <button onClick={() => setFormData(prev => ({...prev, prizes: prev.prizes.filter((_, i) => i !== idx)}))} className="absolute top-4 right-4 text-red-400 hover:text-red-300">
                      <Trash2 size={16} />
                    </button>
                    <div className="grid grid-cols-2 gap-4">
                      <input placeholder="Rank (e.g., 1)" value={prize.rank} onChange={(e) => {
                        const newPrizes = [...formData.prizes];
                        newPrizes[idx].rank = e.target.value;
                        setFormData({...formData, prizes: newPrizes});
                      }} className="bg-gray-800 border-gray-700 rounded p-2 text-white" />
                      <input placeholder="Label (e.g., Winner)" value={prize.label} onChange={(e) => {
                        const newPrizes = [...formData.prizes];
                        newPrizes[idx].label = e.target.value;
                        setFormData({...formData, prizes: newPrizes});
                      }} className="bg-gray-800 border-gray-700 rounded p-2 text-white" />
                      <input placeholder="Amount (e.g., 50000)" type="number" value={prize.amount} onChange={(e) => {
                        const newPrizes = [...formData.prizes];
                        newPrizes[idx].amount = e.target.value;
                        setFormData({...formData, prizes: newPrizes});
                      }} className="bg-gray-800 border-gray-700 rounded p-2 text-white" />
                      <input placeholder="Perks (e.g., Incubation)" value={prize.perks} onChange={(e) => {
                        const newPrizes = [...formData.prizes];
                        newPrizes[idx].perks = e.target.value;
                        setFormData({...formData, prizes: newPrizes});
                      }} className="bg-gray-800 border-gray-700 rounded p-2 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Step 4: Rounds</h2>
              <button onClick={() => setFormData(prev => ({...prev, rounds: [...prev.rounds, { name: '', type: '', description: '', startTime: '', endTime: '' }]}))} className="flex items-center gap-2 px-3 py-1 bg-gray-700 rounded text-sm hover:bg-gray-600">
                <Plus size={16} /> Add Round
              </button>
            </div>
            {formData.rounds.length === 0 ? (
              <p className="text-gray-400">No rounds added yet.</p>
            ) : (
              <div className="space-y-4">
                {formData.rounds.map((round, idx) => (
                  <div key={idx} className="bg-gray-900 border border-gray-700 p-4 rounded relative">
                    <button onClick={() => setFormData(prev => ({...prev, rounds: prev.rounds.filter((_, i) => i !== idx)}))} className="absolute top-4 right-4 text-red-400 hover:text-red-300">
                      <Trash2 size={16} />
                    </button>
                    <div className="grid grid-cols-2 gap-4">
                      <input placeholder="Round Name" value={round.name} onChange={(e) => {
                        const newRounds = [...formData.rounds];
                        newRounds[idx].name = e.target.value;
                        setFormData({...formData, rounds: newRounds});
                      }} className="bg-gray-800 border-gray-700 rounded p-2 text-white" />
                      <input placeholder="Type (e.g., PPT, AUCTION)" value={round.type} onChange={(e) => {
                        const newRounds = [...formData.rounds];
                        newRounds[idx].type = e.target.value;
                        setFormData({...formData, rounds: newRounds});
                      }} className="bg-gray-800 border-gray-700 rounded p-2 text-white" />
                      <div className="col-span-2">
                        <textarea placeholder="Description" value={round.description} onChange={(e) => {
                          const newRounds = [...formData.rounds];
                          newRounds[idx].description = e.target.value;
                          setFormData({...formData, rounds: newRounds});
                        }} className="w-full bg-gray-800 border-gray-700 rounded p-2 text-white" rows="2" />
                      </div>
                      <input type="datetime-local" placeholder="Start Time" value={round.startTime} onChange={(e) => {
                        const newRounds = [...formData.rounds];
                        newRounds[idx].startTime = e.target.value;
                        setFormData({...formData, rounds: newRounds});
                      }} className="bg-gray-800 border-gray-700 rounded p-2 text-white text-sm" />
                      <input type="datetime-local" placeholder="End Time" value={round.endTime} onChange={(e) => {
                        const newRounds = [...formData.rounds];
                        newRounds[idx].endTime = e.target.value;
                        setFormData({...formData, rounds: newRounds});
                      }} className="bg-gray-800 border-gray-700 rounded p-2 text-white text-sm" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {step === 6 && (
          <div className="space-y-4">
            {formData.auctionEnabled ? (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold">Step 6: Auction Problems</h2>
                  <button onClick={() => setFormData(prev => ({...prev, problems: [...prev.problems, { title: '', description: '', category: '', displayOrder: '' }]}))} className="flex items-center gap-2 px-3 py-1 bg-gray-700 rounded text-sm hover:bg-gray-600">
                    <Plus size={16} /> Add Problem
                  </button>
                </div>
                {formData.problems.length === 0 ? (
                  <p className="text-gray-400">No problems added yet.</p>
                ) : (
                  <div className="space-y-4">
                    {formData.problems.map((prob, idx) => (
                      <div key={idx} className="bg-gray-900 border border-gray-700 p-4 rounded relative">
                        <button onClick={() => setFormData(prev => ({...prev, problems: prev.problems.filter((_, i) => i !== idx)}))} className="absolute top-4 right-4 text-red-400 hover:text-red-300">
                          <Trash2 size={16} />
                        </button>
                        <div className="grid grid-cols-2 gap-4">
                          <input placeholder="Title" value={prob.title} onChange={(e) => {
                            const newProbs = [...formData.problems];
                            newProbs[idx].title = e.target.value;
                            setFormData({...formData, problems: newProbs});
                          }} className="bg-gray-800 border-gray-700 rounded p-2 text-white" />
                          <input placeholder="Category" value={prob.category} onChange={(e) => {
                            const newProbs = [...formData.problems];
                            newProbs[idx].category = e.target.value;
                            setFormData({...formData, problems: newProbs});
                          }} className="bg-gray-800 border-gray-700 rounded p-2 text-white" />
                          <div className="col-span-2">
                            <textarea placeholder="Description" value={prob.description} onChange={(e) => {
                              const newProbs = [...formData.problems];
                              newProbs[idx].description = e.target.value;
                              setFormData({...formData, problems: newProbs});
                            }} className="w-full bg-gray-800 border-gray-700 rounded p-2 text-white" rows="2" />
                          </div>
                          <input placeholder="Order" type="number" value={prob.displayOrder} onChange={(e) => {
                            const newProbs = [...formData.problems];
                            newProbs[idx].displayOrder = e.target.value;
                            setFormData({...formData, problems: newProbs});
                          }} className="bg-gray-800 border-gray-700 rounded p-2 text-white w-1/2" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-gray-400 mt-4 p-4 bg-gray-900 border border-gray-700 rounded text-center">
                Auction is disabled for this event. You can skip this step.
              </div>
            )}
          </div>
        )}

        {step === 7 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Step 7: Settings & Publish</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Registration Deadline</label>
                <input type="datetime-local" name="registrationDeadline" value={formData.registrationDeadline} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">PPT Submission Deadline</label>
                <input type="datetime-local" name="pptSubmissionDeadline" value={formData.pptSubmissionDeadline} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white text-sm" />
              </div>
            </div>
            
            <div className="flex flex-col gap-4 mt-6">
              <label className="flex items-center gap-3 bg-gray-900 p-4 border border-gray-700 rounded cursor-pointer">
                <input type="checkbox" name="isPublic" checked={formData.isPublic} onChange={handleChange} className="w-5 h-5" />
                <div>
                  <p className="font-medium">Make Event Public</p>
                  <p className="text-sm text-gray-400">Allows users to see the event on the main events page.</p>
                </div>
              </label>

              <label className="flex items-center gap-3 bg-gray-900 p-4 border border-gray-700 rounded cursor-pointer">
                <input type="checkbox" name="registrationOpen" checked={formData.registrationOpen} onChange={handleChange} className="w-5 h-5" />
                <div>
                  <p className="font-medium">Registration Open</p>
                  <p className="text-sm text-gray-400">Allows users to register for the event right now.</p>
                </div>
              </label>
            </div>
            
            <div className="mt-8 p-4 bg-blue-900/30 border border-blue-500/50 rounded-lg">
              <h3 className="font-semibold text-blue-200 mb-2">Almost Done!</h3>
              <p className="text-sm text-blue-100/70">Please review all steps before publishing. You can save as a draft or go live immediately.</p>
            </div>
          </div>
        )}

        {/* Flow Navigation */}
        <div className="mt-10 flex justify-between">
          <button 
            disabled={step === 1} 
            onClick={handlePrevious} 
            className="px-6 py-2 border border-gray-600 rounded disabled:opacity-50 hover:bg-gray-700 transition"
          >
            Previous
          </button>
          
          {step < 7 ? (
            <div className="flex gap-3">
              <button 
                type="button"
                onClick={handleSaveDraft}
                className="px-5 py-2 border border-gray-600 rounded hover:bg-gray-700/60 transition"
              >
                Save Draft
              </button>
              <button 
                onClick={handleNext} 
                className="px-6 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
              >
                Next
              </button>
            </div>
          ) : (
            <button 
              onClick={handlePublish}
              className="px-6 py-2 bg-green-600 rounded hover:bg-green-700 transition"
            >
              Publish Event
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
