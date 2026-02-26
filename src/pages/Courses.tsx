import { ChevronRight, Search, Briefcase, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Courses() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-100">

      {/* Choose Your Learning Path Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="relative">
          <div className="absolute inset-0 bg-[#10b981] rounded-[2rem] translate-y-3 translate-x-3 border-2 border-[#0b1120]"></div>
          <div className="relative bg-[#0b1120] text-white rounded-[2rem] p-8 lg:p-16 border-[3px] border-[#0b1120] overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <img src="https://picsum.photos/seed/learningpath/1200/600" alt="Learning Path" className="w-full h-full object-cover opacity-30" />
              <div className="absolute inset-0 bg-[#0b1120]/70"></div>
            </div>

            <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#1e293b] border-2 border-gray-600 rounded-full mb-8">
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                  <img src="https://picsum.photos/seed/mentor2/100/100" alt="Mentor" className="w-full h-full object-cover" />
                </div>
                <span className="text-white font-bold text-sm">Mentored by Gen-Z IITian & Team</span>
              </div>

              <h2 className="text-4xl lg:text-6xl font-black leading-tight mb-6">
                Choose Your <span className="relative inline-block">Learning Path<div className="absolute -bottom-2 left-0 w-full h-2 bg-[#10b981] transform -skew-x-12"></div></span>
              </h2>

              <p className="text-gray-300 font-bold text-lg md:text-xl mb-12 max-w-3xl leading-relaxed">
                Master real engineering skills with hands-on mentorship. From full-stack development to DevOps — get job-ready with structured, industry-focused programs.
              </p>

              <div className="w-full max-w-2xl relative">
                <div className="absolute inset-0 bg-[#10b981] rounded-xl translate-y-1.5 translate-x-1.5 border-2 border-[#0b1120]"></div>
                <div className="relative bg-white border-[3px] border-[#0b1120] rounded-xl flex items-center p-2">
                  <Search className="w-6 h-6 text-gray-400 ml-4 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search for courses, topics..."
                    className="w-full px-4 py-3 text-[#0b1120] font-bold placeholder-gray-400 focus:outline-none bg-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-black text-[#0b1120] mb-6">Our Courses</h1>
          <p className="text-xl text-gray-600 font-medium max-w-2xl mx-auto">
            Comprehensive programs designed to help you master IIT-level curriculum and build a successful career.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Qualifier Course Card */}
          <div className="lg:col-span-1 bg-white border-[3px] border-[#0b1120] rounded-[2rem] p-8 shadow-[8px_8px_0px_#10b981] flex flex-col relative overflow-hidden group hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[16px_16px_0px_#10b981] transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-100 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>

            <div className="text-5xl mb-6">🎓</div>
            <h3 className="text-3xl font-black text-[#0b1120] mb-2 leading-tight">Qualifier Course</h3>
            <p className="text-gray-600 font-bold mb-6">Complete Week 1-4 Prep</p>

            {/* Thumbnail Placeholder */}
            <div className="w-full aspect-video bg-gray-100 rounded-xl border-2 border-[#0b1120] mb-6 overflow-hidden relative">
              <img src="https://picsum.photos/seed/qualifier/400/225" alt="Course Thumbnail" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#0b1120"><path d="M8 5v14l11-7z" /></svg>
                </div>
              </div>
            </div>

            <ul className="space-y-3 mb-8 flex-grow">
              {[
                "Live Interactive Classes (Week 1-4)",
                "Live Doubt Support & Quiz",
                "Notes & PYQs (All Resources)",
                "Full Refund if not Qualified"
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-bold text-gray-700">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#10b981] shrink-0"></div>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="pt-6 border-t-2 border-gray-100 mt-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-yellow-500">
                  ★★★★★ <span className="text-gray-600 text-sm ml-1">(4.9)</span>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">starts from</div>
                  <div className="text-2xl font-black text-[#0b1120]">₹649</div>
                </div>
              </div>
              <Link to="/courses/qualifier" className="w-full py-4 bg-[#0b1120] text-white rounded-xl font-bold text-lg border-2 border-[#0b1120] hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                View Details <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Other Courses Column */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Foundation Term 1 */}
            <div className="bg-white border-[3px] border-[#0b1120] rounded-[2rem] p-8 shadow-[8px_8px_0px_#0b1120] flex flex-col hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[12px_12px_0px_#0b1120] transition-all">
              <div className="text-4xl mb-4">🏗️</div>
              <h3 className="text-2xl font-black text-[#0b1120] mb-1">Foundation Term 1</h3>
              <p className="text-gray-600 font-bold text-sm mb-6">Core subject mastery.</p>

              <div className="flex flex-wrap gap-2 mb-6 flex-grow">
                {["Maths 1", "Stats 1", "CT", "English 1"].map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-lg text-xs font-bold text-gray-700">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-6 border-t-2 border-gray-100 mt-auto">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-yellow-500 text-sm">
                    ★★★★★ <span className="text-gray-600 ml-1">(4.8)</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">starts from</div>
                    <div className="text-xl font-black text-[#0b1120]">₹249<span className="text-sm text-gray-500 font-medium">/sub</span></div>
                  </div>
                </div>
                <Link to="/courses/foundation-1" className="w-full py-3 bg-white text-[#0b1120] rounded-xl font-bold border-2 border-[#0b1120] hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  View Details <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Foundation Term 2 */}
            <div className="bg-white border-[3px] border-[#0b1120] rounded-[2rem] p-8 shadow-[8px_8px_0px_#0b1120] flex flex-col hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[12px_12px_0px_#0b1120] transition-all">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-2xl font-black text-[#0b1120] mb-1">Foundation Term 2</h3>
              <p className="text-gray-600 font-bold text-sm mb-6">Advanced core subjects.</p>

              <div className="flex flex-wrap gap-2 mb-6 flex-grow">
                {["Maths 2", "Stats 2", "Python", "English 2"].map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-lg text-xs font-bold text-gray-700">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-6 border-t-2 border-gray-100 mt-auto">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-yellow-500 text-sm">
                    ★★★★★ <span className="text-gray-600 ml-1">(4.9)</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">starts from</div>
                    <div className="text-xl font-black text-[#0b1120]">₹249<span className="text-sm text-gray-500 font-medium">/sub</span></div>
                  </div>
                </div>
                <Link to="/courses/foundation-2" className="w-full py-3 bg-white text-[#0b1120] rounded-xl font-bold border-2 border-[#0b1120] hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  View Details <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Diploma Course */}
            <div className="md:col-span-2 bg-white border-[3px] border-[#0b1120] rounded-[2rem] p-8 shadow-[8px_8px_0px_#0b1120] flex flex-col sm:flex-row gap-6 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[12px_12px_0px_#0b1120] transition-all">
              <div className="flex-1">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-2xl font-black text-[#0b1120] mb-1">Diploma Course</h3>
                <p className="text-gray-600 font-bold text-sm mb-4">Advanced specialization.</p>

                <ul className="space-y-2 mb-6">
                  {["Recorded Classes", "Live Doubt Sessions", "Graded Assignments"].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm font-bold text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex-1 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-6 flex-grow content-start">
                  {["MLF", "DBMS", "PDSA", "JAVA", "App Dev"].map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-lg text-xs font-bold text-gray-700">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-6 border-t-2 border-gray-100 mt-auto">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-yellow-500 text-sm">
                      ★★★★★ <span className="text-gray-600 ml-1">(5.0)</span>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">starts from</div>
                      <div className="text-xl font-black text-[#0b1120]">₹49<span className="text-sm text-gray-500 font-medium">/sub</span></div>
                    </div>
                  </div>
                  <Link to="/courses/diploma" className="w-full py-3 bg-white text-[#0b1120] rounded-xl font-bold border-2 border-[#0b1120] hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    View Details <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Community Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="relative">
          <div className="absolute inset-0 bg-[#10b981] rounded-[2rem] translate-y-3 translate-x-3 border-2 border-[#0b1120]"></div>
          <div className="relative bg-[#0b1120] text-white rounded-[2rem] p-8 lg:p-12 border-[3px] border-[#0b1120] overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <img src="https://picsum.photos/seed/community2/1200/600" alt="Community" className="w-full h-full object-cover opacity-30" />
              <div className="absolute inset-0 bg-[#0b1120]/60"></div>
            </div>

            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl lg:text-5xl font-black leading-tight mb-6">
                A Community That<br />Grows With You
              </h2>
              <p className="text-gray-300 font-bold text-lg mb-12">
                Join thousands of developers who are learning, building, and landing dream jobs together in a high-growth environment.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-white rounded-2xl border-[3px] border-[#0b1120] flex items-center justify-center mb-4 shadow-[4px_4px_0px_#10b981] transform -rotate-3">
                    <Briefcase className="w-8 h-8 text-[#0b1120]" />
                  </div>
                  <div className="text-4xl font-black mb-1">50K+</div>
                  <div className="text-xs font-black text-gray-400 uppercase tracking-widest">Active Learners</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-white rounded-2xl border-[3px] border-[#0b1120] flex items-center justify-center mb-4 shadow-[4px_4px_0px_#10b981] transform rotate-3">
                    <Users className="w-8 h-8 text-[#0b1120]" />
                  </div>
                  <div className="text-4xl font-black mb-1">650+</div>
                  <div className="text-xs font-black text-gray-400 uppercase tracking-widest">Placements</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-white rounded-2xl border-[3px] border-[#0b1120] flex items-center justify-center mb-4 shadow-[4px_4px_0px_#10b981] transform -rotate-3">
                    <Zap className="w-8 h-8 text-[#0b1120]" />
                  </div>
                  <div className="text-4xl font-black mb-1">Weekly</div>
                  <div className="text-xs font-black text-gray-400 uppercase tracking-widest">Hackathons</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
