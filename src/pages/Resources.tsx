import { Share, ChevronRight, ChevronDown, X, ClipboardList, FileText } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const levels = ["Qualifier", "Foundation", "Diploma"] as const;

const levelSubjects: Record<string, string[]> = {
  Qualifier: [], // Redirects to Medium
  Foundation: ["Maths 1", "Stats 1", "Maths 2", "Stats 2", "English 1", "English 2", "Python", "CT"],
  Diploma: ["MLF", "BDM", "MLT", "MLP", "TDS", "DBMS", "Java", "PDSA", "MAD 1", "MAD 2", "BA", "Deep Learning & Gen AI", "System Commands"],
};

const allSubjects = [...new Set(Object.values(levelSubjects).flat())].filter(Boolean);

const examTypes = ["Quiz 1", "Quiz 2", "End Term", "OPPE 1", "OPPE 2"];

type TabKey = 'notes' | 'pyqs' | 'tools' | 'dates' | 'updates';

interface PYQResource {
  id: number;
  level: string;
  subject: string;
  resource_type: string;
  sub_type: string;
  title: string;
  description: string;
  url: string;
}

const QUALIFIER_URL = "https://medium.com/@genziitian/qualifier-resources-10dbf8c4a5a9";

export default function Resources() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>('notes');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  // PYQ state
  const [pyqLevel, setPyqLevel] = useState<string>("Foundation");
  const [pyqSubject, setPyqSubject] = useState<string | null>(null);
  const [pyqExam, setPyqExam] = useState<string | null>(null);
  const [pyqResources, setPyqResources] = useState<PYQResource[]>([]);
  const [pyqLoading, setPyqLoading] = useState(false);

  // Gate popup state
  const [showGate, setShowGate] = useState(false);
  const [gateSubmitting, setGateSubmitting] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Check localStorage for access on mount
  useEffect(() => {
    const access = localStorage.getItem('resource_access');
    if (access) {
      setHasAccess(true);
    } else {
      setShowGate(true);
    }
  }, []);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch PYQ resources when filters change
  useEffect(() => {
    if (activeTab !== 'pyqs' || !pyqSubject || !pyqExam) {
      setPyqResources([]);
      return;
    }
    setPyqLoading(true);
    fetch(`http://localhost:3001/api/resources?level=${encodeURIComponent(pyqLevel)}&subject=${encodeURIComponent(pyqSubject)}&type=pyq`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPyqResources(data.filter((r: PYQResource) => r.sub_type === pyqExam));
        }
        setPyqLoading(false);
      })
      .catch(() => { setPyqResources([]); setPyqLoading(false); });
  }, [activeTab, pyqLevel, pyqSubject, pyqExam]);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleLevelSelect = (level: string) => {
    if (level === "Qualifier") {
      window.open(QUALIFIER_URL, '_blank');
      setOpenDropdown(null);
      return;
    }
    setSelectedLevel(level);
    setSelectedSubject(null);
    setOpenDropdown(null);
  };

  const handleSubjectSelect = (subject: string) => {
    setSelectedSubject(subject);
    setOpenDropdown(null);
  };

  const clearFilters = () => { setSelectedLevel(null); setSelectedSubject(null); };

  const availableSubjects = selectedLevel ? levelSubjects[selectedLevel] : allSubjects;
  const filteredLevels = selectedLevel ? (["Foundation", "Diploma"] as const).filter((l) => l === selectedLevel) : (["Foundation", "Diploma"] as const);

  const pyqSubjects = levelSubjects[pyqLevel] || [];

  const handleGateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGateSubmitting(true);
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    try {
      await fetch('https://docs.google.com/forms/d/e/YOUR_GOOGLE_FORM_ID/formResponse', {
        method: 'POST',
        mode: 'no-cors',
        body: data
      });
    } catch { /* no-cors */ }
    localStorage.setItem('resource_access', JSON.stringify({
      name: data.get('entry.name'),
      email: data.get('entry.email'),
      phone: data.get('entry.phone'),
      level: data.get('entry.level'),
      timestamp: new Date().toISOString()
    }));
    setGateSubmitting(false);
    setHasAccess(true);
    setShowGate(false);
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100">

      {/* ====== GATE POPUP ====== */}
      {showGate && !hasAccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white border-[3px] border-[#0b1120] rounded-3xl p-8 lg:p-10 max-w-lg w-full shadow-[16px_16px_0px_#10b981] relative animate-[fadeIn_0.3s_ease-out]">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#eef2ff] border-[3px] border-[#0b1120] mb-4 shadow-[4px_4px_0px_#0b1120]">
                <span className="text-3xl">📚</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-black text-[#0b1120] mb-2">Access Free Resources</h2>
              <p className="text-gray-500 font-medium text-sm">Please fill this form to continue to the resource page</p>
            </div>

            <form onSubmit={handleGateSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-[#0b1120] text-sm">Full Name *</label>
                <input
                  name="entry.name"
                  type="text"
                  placeholder="Your full name"
                  className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border-[3px] border-[#0b1120] text-[#0b1120] placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#10b981] transition-colors font-medium"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-[#0b1120] text-sm">Email Address *</label>
                <input
                  name="entry.email"
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border-[3px] border-[#0b1120] text-[#0b1120] placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#10b981] transition-colors font-medium"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-[#0b1120] text-sm">WhatsApp / Phone Number *</label>
                <div className="flex gap-3">
                  <div className="w-20 px-3 py-3.5 rounded-xl bg-gray-100 border-[3px] border-[#0b1120] text-[#0b1120] font-bold flex items-center justify-center shrink-0 text-sm">
                    +91
                  </div>
                  <input
                    name="entry.phone"
                    type="tel"
                    placeholder="98765 43210"
                    className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border-[3px] border-[#0b1120] text-[#0b1120] placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#10b981] transition-colors font-medium"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-[#0b1120] text-sm">Your Level *</label>
                <select
                  name="entry.level"
                  className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border-[3px] border-[#0b1120] text-[#0b1120] focus:outline-none focus:bg-white focus:border-[#10b981] transition-colors font-medium appearance-none cursor-pointer"
                  required
                >
                  <option value="">Select your level</option>
                  <option value="Qualifier">Qualifier</option>
                  <option value="Foundation">Foundation</option>
                  <option value="Diploma">Diploma</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={gateSubmitting}
                className="w-full py-4 bg-[#10b981] text-white rounded-xl font-black text-lg border-[3px] border-[#0b1120] shadow-[6px_6px_0px_#0b1120] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0px_#0b1120] transition-all mt-2 disabled:opacity-60"
              >
                {gateSubmitting ? '⏳ Submitting...' : '🚀 Continue to Resources'}
              </button>
              <p className="text-center text-xs font-medium text-gray-400 mt-1">
                Your data is safe with us. We only use it to send you relevant updates.
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <h1 className="text-4xl md:text-5xl font-black text-[#0b1120] tracking-tight">
            IITM BS DEGREE RESOURCES
          </h1>
          <button onClick={handleShare} className="flex items-center gap-2 px-6 py-3 bg-white border-[3px] border-[#0b1120] rounded-xl text-sm font-bold text-[#0b1120] hover:-translate-y-1 hover:-translate-x-1 shadow-[4px_4px_0px_#0b1120] hover:shadow-[6px_6px_0px_#0b1120] transition-all w-fit shrink-0">
            <Share className="w-4 h-4" /> {copied ? "Copied!" : "Share"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="w-full bg-white border-y-2 border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-8 overflow-x-auto hide-scrollbar">
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex items-center gap-2 py-4 text-sm font-black whitespace-nowrap border-b-[3px] transition-colors ${activeTab === 'notes' ? 'border-[#10b981] text-[#0b1120]' : 'border-transparent text-gray-500 hover:text-[#0b1120]'}`}
            >
              <FileText className="w-4 h-4" /> Study Notes
            </button>
            <button
              onClick={() => setActiveTab('pyqs')}
              className={`flex items-center gap-2 py-4 text-sm font-black whitespace-nowrap border-b-[3px] transition-colors ${activeTab === 'pyqs' ? 'border-[#f59e0b] text-[#0b1120]' : 'border-transparent text-gray-500 hover:text-[#0b1120]'}`}
            >
              <ClipboardList className="w-4 h-4" /> PYQs
            </button>
          </div>
        </div>
      </div>

      {/* ====== NOTES TAB ====== */}
      {activeTab === 'notes' && (
        <div className="max-w-7xl mx-auto px-6 py-8">

          {/* Qualifier Banner */}
          <a
            href={QUALIFIER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block mb-10 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#f59e0b] rounded-2xl translate-y-2 translate-x-2 border-2 border-[#0b1120]"></div>
              <div className="relative bg-gradient-to-r from-[#0b1120] to-[#1e293b] border-[3px] border-[#0b1120] rounded-2xl p-6 lg:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 group-hover:-translate-y-1 group-hover:-translate-x-1 transition-all overflow-hidden">
                <div className="absolute right-0 top-0 w-40 h-40 bg-[#f59e0b]/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-[#f59e0b] border-2 border-[#0b1120] flex items-center justify-center text-3xl shadow-[3px_3px_0px_#0b1120] shrink-0">🎯</div>
                  <div>
                    <h3 className="text-xl lg:text-2xl font-black text-white">Qualifier Resources</h3>
                    <p className="text-gray-400 font-bold text-sm">Complete Week 1-4 prep materials, notes & PYQs</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-6 py-3 bg-[#f59e0b] text-[#0b1120] rounded-xl font-black border-2 border-[#0b1120] shadow-[3px_3px_0px_#0b1120] shrink-0 relative z-10">
                  View Resources <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </a>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-8" ref={dropdownRef}>
            <div className="relative">
              <button onClick={() => toggleDropdown('level')} className={`flex items-center gap-2 px-5 py-2.5 border-[3px] border-[#0b1120] rounded-xl text-sm font-bold hover:-translate-y-1 hover:-translate-x-1 shadow-[4px_4px_0px_#0b1120] hover:shadow-[6px_6px_0px_#0b1120] transition-all ${selectedLevel ? 'bg-[#10b981] text-white' : 'bg-white text-[#0b1120]'}`}>
                {selectedLevel || "Level"} <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'level' ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === 'level' && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border-[3px] border-[#0b1120] rounded-xl shadow-[4px_4px_0px_#0b1120] z-50 overflow-hidden">
                  {levels.map((item, i) => (
                    <button key={i} onClick={() => handleLevelSelect(item)} className={`w-full text-left px-4 py-3 text-sm font-bold transition-colors ${item === "Qualifier" ? 'text-[#f59e0b] hover:bg-amber-50' : selectedLevel === item ? 'bg-[#10b981] text-white' : 'text-[#0b1120] hover:bg-gray-100'}`}>
                      {item} {item === "Qualifier" && <span className="text-xs text-gray-400 ml-1">↗</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button onClick={() => toggleDropdown('subjects')} className={`flex items-center gap-2 px-5 py-2.5 border-[3px] border-[#0b1120] rounded-xl text-sm font-bold hover:-translate-y-1 hover:-translate-x-1 shadow-[4px_4px_0px_#0b1120] hover:shadow-[6px_6px_0px_#0b1120] transition-all ${selectedSubject ? 'bg-[#10b981] text-white' : 'bg-white text-[#0b1120]'}`}>
                {selectedSubject || "Subjects"} <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'subjects' ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === 'subjects' && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white border-[3px] border-[#0b1120] rounded-xl shadow-[4px_4px_0px_#0b1120] z-50 overflow-hidden max-h-64 overflow-y-auto">
                  {availableSubjects.map((item, i) => (
                    <button key={i} onClick={() => handleSubjectSelect(item)} className={`w-full text-left px-4 py-3 text-sm font-bold transition-colors ${selectedSubject === item ? 'bg-[#10b981] text-white' : 'text-[#0b1120] hover:bg-gray-100'}`}>{item}</button>
                  ))}
                </div>
              )}
            </div>

            {(selectedLevel || selectedSubject) && (
              <button onClick={clearFilters} className="flex items-center gap-1.5 px-4 py-2.5 bg-red-50 border-[3px] border-red-400 rounded-xl text-sm font-bold text-red-600 hover:bg-red-100 transition-all">
                <X className="w-3.5 h-3.5" /> Clear
              </button>
            )}
          </div>

          {/* Subject Cards */}
          <div className="space-y-16 pb-24">
            {filteredLevels.map((level) => {
              const subjects = levelSubjects[level];
              const filteredSubjects = selectedSubject ? subjects.filter((s) => s === selectedSubject) : subjects;
              if (filteredSubjects.length === 0) return null;
              return (
                <section key={level}>
                  <h2 className="text-3xl font-black text-[#0b1120] mb-6 border-b-4 border-gray-100 pb-3">{level} Level</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredSubjects.map((subj, i) => (
                      <Link key={i} to={`/resources/${encodeURIComponent(level)}/${encodeURIComponent(subj)}`} className="p-6 bg-white border-[3px] border-[#0b1120] rounded-2xl hover:-translate-y-1 hover:-translate-x-1 shadow-[4px_4px_0px_#0b1120] hover:shadow-[8px_8px_0px_#0b1120] transition-all cursor-pointer group flex flex-col h-full">
                        <div className="font-black text-[#0b1120] text-xl mb-4 group-hover:text-[#10b981] transition-colors">{subj}</div>
                        <div className="mt-auto flex items-center gap-2 text-sm text-gray-600 font-bold">
                          View Resources <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      )}

      {/* ====== PYQs TAB ====== */}
      {activeTab === 'pyqs' && (
        <div className="max-w-7xl mx-auto px-6 py-8">
          <p className="text-gray-500 font-medium mb-8 max-w-2xl">
            Select your level, subject, and exam type to find previous year question papers.
          </p>

          {/* Step 1: Level Selection */}
          <div className="mb-8">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-wider mb-3">Step 1 — Select Level</h3>
            <div className="flex flex-wrap gap-3">
              {(["Foundation", "Diploma"] as const).map((lv) => (
                <button
                  key={lv}
                  onClick={() => { setPyqLevel(lv); setPyqSubject(null); setPyqExam(null); }}
                  className={`px-6 py-3 border-[3px] border-[#0b1120] rounded-xl text-sm font-black transition-all hover:-translate-y-0.5 ${pyqLevel === lv ? 'bg-[#f59e0b] text-white shadow-[4px_4px_0px_#0b1120]' : 'bg-white text-[#0b1120] shadow-[3px_3px_0px_#0b1120]'}`}
                >
                  {lv}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Subject Selection */}
          <div className="mb-8">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-wider mb-3">Step 2 — Select Subject</h3>
            <div className="flex flex-wrap gap-3">
              {pyqSubjects.map((subj) => (
                <button
                  key={subj}
                  onClick={() => { setPyqSubject(subj); setPyqExam(null); }}
                  className={`px-5 py-2.5 border-[3px] border-[#0b1120] rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5 ${pyqSubject === subj ? 'bg-[#0b1120] text-white shadow-[4px_4px_0px_#f59e0b]' : 'bg-white text-[#0b1120] shadow-[3px_3px_0px_#0b1120]'}`}
                >
                  {subj}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Exam Type Selection */}
          {pyqSubject && (
            <div className="mb-10">
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-wider mb-3">Step 3 — Select Exam Type</h3>
              <div className="flex flex-wrap gap-3">
                {examTypes.filter(ex => {
                  if (!ex.startsWith('OPPE')) return true;
                  if (pyqLevel === 'Foundation' && pyqSubject === 'Python') return true;
                  if (pyqLevel === 'Diploma' && (pyqSubject === 'Java' || pyqSubject === 'DBMS')) return true;
                  return false;
                }).map((ex) => (
                  <button
                    key={ex}
                    onClick={() => setPyqExam(ex)}
                    className={`px-5 py-2.5 border-[3px] border-[#0b1120] rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5 ${pyqExam === ex ? 'bg-[#10b981] text-white shadow-[4px_4px_0px_#0b1120]' : 'bg-white text-[#0b1120] shadow-[3px_3px_0px_#0b1120]'}`}
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {pyqSubject && pyqExam && (
            <div className="pb-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-8 rounded-full bg-[#f59e0b]" />
                <h2 className="text-2xl font-black text-[#0b1120]">
                  {pyqSubject} — {pyqExam}
                </h2>
                <span className="px-3 py-1 bg-amber-50 text-amber-600 text-xs font-bold rounded-full border border-amber-200">
                  {pyqLevel}
                </span>
              </div>

              {pyqLoading ? (
                <div className="text-center py-12">
                  <div className="w-10 h-10 border-4 border-[#f59e0b] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                  <p className="text-gray-500 font-bold text-sm">Loading PYQs...</p>
                </div>
              ) : pyqResources.length === 0 ? (
                <div className="text-center py-16 px-6 bg-gray-50 border-[3px] border-dashed border-gray-200 rounded-2xl">
                  <div className="text-4xl mb-3">📭</div>
                  <h3 className="text-lg font-black text-[#0b1120] mb-2">No PYQs Found</h3>
                  <p className="text-gray-500 font-medium text-sm">
                    No previous year questions available for {pyqSubject} — {pyqExam} ({pyqLevel}) yet. Check back later!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pyqResources.map((res) => (
                    <a
                      key={res.id}
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-4 p-5 bg-white border-[3px] border-[#0b1120] rounded-2xl hover:-translate-y-1 hover:-translate-x-1 shadow-[4px_4px_0px_#0b1120] hover:shadow-[8px_8px_0px_#0b1120] transition-all"
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 bg-amber-50">
                        <ClipboardList className="w-5 h-5 text-amber-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-black text-[#0b1120] mb-1 group-hover:text-[#10b981] transition-colors">{res.title}</h3>
                        {res.description && <p className="text-sm text-gray-500 font-medium">{res.description}</p>}
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#10b981] transition-colors shrink-0 mt-1" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Placeholder when nothing selected */}
          {!pyqSubject && (
            <div className="text-center py-20 px-6">
              <div className="text-5xl mb-4">📋</div>
              <h3 className="text-xl font-black text-[#0b1120] mb-2">Select a Subject</h3>
              <p className="text-gray-500 font-medium text-sm max-w-md mx-auto">
                Choose your level and subject above to browse previous year question papers.
              </p>
            </div>
          )}

          {pyqSubject && !pyqExam && (
            <div className="text-center py-16 px-6">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-xl font-black text-[#0b1120] mb-2">Select an Exam Type</h3>
              <p className="text-gray-500 font-medium text-sm max-w-md mx-auto">
                Choose from Quiz 1, Quiz 2, End Term, or OPPE to see the past papers.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
