import { useState } from 'react';
import { ChevronDown, ChevronRight, Play, Star, CheckCircle2, Shield, Zap, CreditCard, Users, Clock, BookOpen, Globe, Award, Briefcase, Search } from 'lucide-react';

export default function CourseDetail() {
  const [activeFaq, setActiveFaq] = useState<number | string | null>(null);

  const faqs = [
    {
      question: "When will the January batch start?",
      answer: "The January batch starts in the first week of January. You will get access to the orientation materials as soon as you enroll."
    },
    {
      question: "How does the \"Full Refund\" guarantee work?",
      answer: "If you complete all assignments and attend 80% of live classes but still don't qualify the exam, we will refund 100% of your course fee."
    },
    {
      question: "Can I access on mobile?",
      answer: "Yes, our platform is fully responsive and you can access all lectures, notes, and PYQs on your mobile device."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24 lg:pb-0">
      {/* Hero Section */}
      <section className="pt-12 pb-16 px-6 max-w-7xl mx-auto">
        <div className="relative">
          <div className="absolute inset-0 bg-[#10b981] rounded-[2rem] translate-y-4 translate-x-4 border-2 border-[#0b1120]"></div>
          <div className="relative bg-[#0b1120] text-white rounded-[2rem] p-8 lg:p-16 border-[3px] border-[#0b1120] overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
              <div className="flex flex-col gap-6">
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-bold border border-blue-500/30">IIT Madras BS Degree</span>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-bold border border-purple-500/30">January 2026</span>
                  <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-bold border border-red-500/30">🔥 Limited Seats</span>
                </div>

                <h1 className="text-4xl lg:text-6xl font-black leading-tight">
                  Qualifier Course
                </h1>

                <div className="inline-block px-4 py-2 bg-[#10b981] text-[#0b1120] font-black rounded-lg w-fit transform -rotate-1">
                  🛡️ Full Refund If Not Qualified!
                </div>

                <p className="text-gray-300 text-lg lg:text-xl font-medium max-w-xl">
                  Complete Week 1-4 preparation with live classes, PYQs, doubt sessions & expert mentorship. Your path to IIT Madras starts here.
                </p>

                <div className="flex flex-wrap gap-6 mt-2">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#10b981]" />
                    <div>
                      <div className="font-black text-xl">500+</div>
                      <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Students</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <div>
                      <div className="font-black text-xl">4.9</div>
                      <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Rating</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-blue-400" />
                    <div>
                      <div className="font-black text-xl">95%</div>
                      <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Success</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hero Video/Image Card */}
              <div className="relative lg:ml-auto w-full max-w-lg">
                <div className="relative bg-white rounded-3xl border-[3px] border-[#0b1120] overflow-hidden flex flex-col shadow-[8px_8px_0px_#10b981]">
                  <div className="aspect-video bg-gray-200 relative group cursor-pointer">
                    <img src="https://picsum.photos/seed/qualifier-hero/800/450" alt="Course Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-colors group-hover:bg-black/40">
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center transform transition-transform group-hover:scale-110">
                        <Play className="w-6 h-6 text-[#0b1120] ml-1" fill="currentColor" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-white text-[#0b1120]">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600"><BookOpen className="w-4 h-4" /></div>
                        <span>50+ Videos</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                        <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600"><Clock className="w-4 h-4" /></div>
                        <span>40+ Hours</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                        <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600"><Globe className="w-4 h-4" /></div>
                        <span>Hinglish</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                        <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600"><Award className="w-4 h-4" /></div>
                        <span>Beginner</span>
                      </div>
                    </div>
                    <div className="flex items-end justify-between mb-4">
                      <div>
                        <div className="text-sm text-gray-500 font-bold line-through mb-1">₹999</div>
                        <div className="text-3xl font-black text-[#0b1120]">₹649</div>
                      </div>
                      <div className="px-3 py-1 bg-[#d1fae5] text-[#059669] border-2 border-[#0b1120] rounded-full text-xs font-black">
                        35% OFF
                      </div>
                    </div>
                    <a href="https://pages.razorpay.com/pl_S7JauPkzTwNyRf/view" target="_blank" rel="noopener noreferrer" className="w-full py-4 bg-[#0b1120] text-white rounded-xl font-bold text-lg border-2 border-[#0b1120] hover:bg-gray-800 transition-colors flex flex-col items-center justify-center gap-1">
                      <div className="flex items-center gap-2">
                        Enroll Now - ₹649 Only <ChevronRight className="w-5 h-5" />
                      </div>
                      <div className="text-xs text-[#10b981] font-bold uppercase tracking-wider">Get Secured Seat to BS</div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* Main Content Column */}
        <div className="lg:col-span-2 flex flex-col gap-16">

          {/* Who is This For? */}
          <section>
            <div className="text-center mb-10">
              <h2 className="text-3xl lg:text-4xl font-black text-[#0b1120] mb-3">Who is This For?</h2>
              <p className="text-gray-600 font-bold">Whether you're starting fresh or leveling up, this cohort is designed for your success</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-[#10b981] rounded-2xl translate-y-2 translate-x-2 border-2 border-[#0b1120]"></div>
                <div className="relative bg-white border-[3px] border-[#0b1120] rounded-2xl p-6 h-full flex flex-col items-center text-center transition-transform hover:-translate-y-1 hover:-translate-x-1">
                  <div className="w-full aspect-video bg-blue-50 rounded-xl mb-6 border-2 border-gray-100 flex items-center justify-center overflow-hidden">
                    <img src="https://picsum.photos/seed/beginner/400/225" alt="Beginners" className="w-full h-full object-cover opacity-80" />
                  </div>
                  <h3 className="text-xl font-black text-[#0b1120] mb-3">Beginners in Tech</h3>
                  <p className="text-sm text-gray-600 font-medium">Those who want to start a career in software development with strong fundamentals.</p>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-[#10b981] rounded-2xl translate-y-2 translate-x-2 border-2 border-[#0b1120]"></div>
                <div className="relative bg-white border-[3px] border-[#0b1120] rounded-2xl p-6 h-full flex flex-col items-center text-center transition-transform hover:-translate-y-1 hover:-translate-x-1">
                  <div className="w-full aspect-video bg-purple-50 rounded-xl mb-6 border-2 border-gray-100 flex items-center justify-center overflow-hidden">
                    <img src="https://picsum.photos/seed/selftaught/400/225" alt="Self-taught" className="w-full h-full object-cover opacity-80" />
                  </div>
                  <h3 className="text-xl font-black text-[#0b1120] mb-3">Self-taught Developers</h3>
                  <p className="text-sm text-gray-600 font-medium">People who already know the basics but need a structured roadmap and real projects to become job-ready.</p>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-[#10b981] rounded-2xl translate-y-2 translate-x-2 border-2 border-[#0b1120]"></div>
                <div className="relative bg-white border-[3px] border-[#0b1120] rounded-2xl p-6 h-full flex flex-col items-center text-center transition-transform hover:-translate-y-1 hover:-translate-x-1">
                  <div className="w-full aspect-video bg-green-50 rounded-xl mb-6 border-2 border-gray-100 flex items-center justify-center overflow-hidden">
                    <img src="https://picsum.photos/seed/pro/400/225" alt="Professionals" className="w-full h-full object-cover opacity-80" />
                  </div>
                  <h3 className="text-xl font-black text-[#0b1120] mb-3">Working Professionals</h3>
                  <p className="text-sm text-gray-600 font-medium">Anyone looking to upgrade skills in Full-Stack + DevOps and grow into better roles in tech.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Career Outcomes */}
          <section>
            <div className="text-center mb-10">
              <h2 className="text-3xl lg:text-4xl font-black text-[#0b1120] mb-3">Career Outcomes</h2>
              <p className="text-gray-600 font-bold">Everything you need to launch or accelerate your tech career</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: "💻", title: "Real-World Projects", desc: "Learn Full Stack Development, DevOps, and Blockchain through live sessions, mentorship, and hands-on coding challenges.", color: "bg-pink-100" },
                { icon: "📄", title: "Portfolio Development", desc: "Learn Full Stack Development, DevOps, and Blockchain through live sessions, mentorship, and hands-on coding challenges.", color: "bg-yellow-100" },
                { icon: "💬", title: "Interview Preparation", desc: "Collaborate, build, and grow with thousands of passionate learners pushing their limits every day.", color: "bg-blue-100" },
                { icon: "📈", title: "Career Growth", desc: "Learn Full Stack Development, DevOps, and Blockchain through live sessions, mentorship, and hands-on coding challenges.", color: "bg-orange-100" },
                { icon: "🧑‍🏫", title: "Industry Mentorship", desc: "Learn Full Stack Development, DevOps, and Blockchain through live sessions, mentorship, and hands-on coding challenges.", color: "bg-red-100" },
                { icon: "👥", title: "Community Access", desc: "Collaborate, build, and grow with thousands of passionate learners pushing their limits every day.", color: "bg-teal-100" }
              ].map((item, i) => (
                <div key={i} className="relative group">
                  <div className="absolute inset-0 bg-[#10b981] rounded-2xl translate-y-1.5 translate-x-1.5 border-2 border-[#0b1120]"></div>
                  <div className="relative bg-white border-[3px] border-[#0b1120] rounded-2xl p-6 h-full transition-transform hover:-translate-y-1 hover:-translate-x-1">
                    <div className={`w-12 h-12 rounded-xl ${item.color} border-2 border-[#0b1120] flex items-center justify-center text-2xl mb-4`}>
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-black text-[#0b1120] mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Course Syllabus */}
          <section>
            <h2 className="text-3xl lg:text-4xl font-black text-[#0b1120] mb-8">
              Course Syllabus
            </h2>
            <div className="space-y-4">
              {[
                { title: "Mathematics 1 (Every Monday)", desc: "Foundation concepts & problem solving" },
                { title: "Statistics 1 (Every Tuesday)", desc: "Data analysis & probability basics" },
                { title: "Computational Thinking (Every Wednesday)", desc: "Logic, algorithms & problem solving" },
                { title: "English 1 (Every Thursday)", desc: "Comprehension & communication" }
              ].map((item, i) => (
                <div key={i} className="bg-white border-[3px] border-[#0b1120] rounded-2xl overflow-hidden shadow-[4px_4px_0px_#0b1120] transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_#0b1120]">
                  <button
                    onClick={() => setActiveFaq(activeFaq === `syllabus-${i}` ? null : `syllabus-${i}` as any)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="font-black text-lg text-[#0b1120] pr-4">{item.title}</span>
                    <div className="w-8 h-8 rounded-full border-2 border-[#0b1120] flex items-center justify-center shrink-0">
                      <ChevronDown className={`w-5 h-5 text-[#0b1120] transition-transform ${activeFaq === `syllabus-${i}` ? 'rotate-180' : ''}`} />
                    </div>
                  </button>
                  {activeFaq === `syllabus-${i}` && (
                    <div className="px-6 pb-5 pt-2 text-gray-600 font-bold border-t-2 border-gray-100">
                      {item.desc}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Pricing Plans */}
          <section className="relative">
            <div className="absolute inset-0 bg-[#10b981] rounded-[2rem] translate-y-3 translate-x-3 border-2 border-[#0b1120]"></div>
            <div className="relative bg-[#0b1120] text-white rounded-[2rem] p-8 lg:p-12 border-[3px] border-[#0b1120] overflow-hidden flex flex-col items-center gap-8">
              {/* Background Grid Pattern */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

              <div className="relative z-10 text-center w-full mb-4">
                <div className="inline-block px-4 py-1.5 bg-[#fef08a] text-[#d97706] font-black text-sm rounded-full mb-4">
                  CHOOSE YOUR PLAN
                </div>
                <h2 className="text-3xl lg:text-4xl font-black text-white leading-snug mb-2">
                  Flexible Pricing Options
                </h2>
                <p className="text-gray-300 font-medium">Select the plan that fits your learning style</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto relative z-10">
                {/* Basic Plan */}
                <div className="bg-white text-[#0b1120] border-2 border-gray-200 rounded-3xl p-8 flex flex-col h-full hover:-translate-y-1 hover:shadow-lg transition-all">
                  <div className="text-center mb-8">
                    <h4 className="font-black text-gray-500 mb-4 uppercase tracking-wider text-sm">Basic</h4>
                    <div className="font-black text-5xl">₹649</div>
                  </div>
                  <ul className="space-y-4 mb-8 flex-grow">
                    {["Recorded Lectures", "Handwritten Notes", "PYQs (Recorded)", "Graded Assignments"].map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-600">
                        <CheckCircle2 className="w-5 h-5 text-[#10b981] shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-3.5 bg-gray-100 text-[#0b1120] rounded-xl font-bold text-lg hover:bg-gray-200 transition-all">
                    Select Basic
                  </button>
                </div>

                {/* Advanced Plan */}
                <div className="bg-white text-[#0b1120] border-2 border-blue-500 rounded-3xl p-8 flex flex-col h-full relative hover:-translate-y-1 hover:shadow-lg transition-all mt-4 md:mt-0 md:-translate-y-4">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 bg-blue-500 text-white text-sm font-black uppercase tracking-wider rounded-full">
                    Popular
                  </div>
                  <div className="text-center mb-8 mt-2">
                    <h4 className="font-black text-blue-500 mb-4 uppercase tracking-wider text-sm">Advanced</h4>
                    <div className="font-black text-5xl">₹799</div>
                  </div>
                  <ul className="space-y-4 mb-8 flex-grow">
                    <li className="flex items-center gap-3 text-sm font-medium text-gray-600">
                      <CheckCircle2 className="w-5 h-5 text-[#10b981] shrink-0" /> Everything in Basic
                    </li>
                    {["Live Lectures", "Live PYQs Session", "Live Revision Session", "Career Workshops"].map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-600">
                        <span className="text-blue-500 font-black text-lg w-5 text-center shrink-0">+</span> {f}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-3.5 bg-blue-500 text-white rounded-xl font-bold text-lg hover:bg-blue-600 transition-all">
                    Select Advanced
                  </button>
                </div>

                {/* Champion Plan */}
                <div className="bg-[#fffdf0] text-[#0b1120] border-2 border-[#f59e0b] rounded-3xl p-8 flex flex-col h-full relative hover:-translate-y-1 hover:shadow-lg transition-all">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-[#f59e0b] text-white text-xs font-black uppercase tracking-wider rounded-full text-center whitespace-nowrap shadow-md">
                    🏆 BEST VALUE<br />CHAMPION
                  </div>
                  <div className="text-center mb-6 mt-4">
                    <div className="font-black text-5xl">₹999</div>
                  </div>
                  <div className="w-full py-2.5 bg-[#10b981] text-white text-xs font-black text-center rounded-lg mb-8 flex items-center justify-center gap-1 shadow-sm">
                    🛡️ FULL REFUND IF NOT QUALIFIED
                  </div>
                  <ul className="space-y-4 mb-8 flex-grow">
                    <li className="flex items-center gap-3 text-sm font-medium text-gray-600">
                      <CheckCircle2 className="w-5 h-5 text-[#10b981] shrink-0" /> Everything in Advanced
                    </li>
                    {["1:1 Mentorship", "Lifetime Reattempt", "Career Guidance"].map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-600">
                        <Star className="w-5 h-5 text-[#f59e0b] fill-[#f59e0b] shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-3.5 bg-[#f59e0b] text-white rounded-xl font-bold text-lg hover:bg-[#d97706] transition-all">
                    Select Champion
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Learning Experience */}
          <section className="overflow-hidden">
            <h2 className="text-3xl font-black text-[#0b1120] mb-8 flex items-center gap-3">
              <span className="text-4xl">✨</span> The Learning Experience
            </h2>
            <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <div className="min-w-[280px] md:min-w-[320px] snap-center bg-white p-6 rounded-2xl border-2 border-gray-200 text-center shrink-0">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-2xl flex items-center justify-center text-3xl mb-4">🎥</div>
                <h4 className="font-bold text-[#0b1120] mb-2">Live Interactive Classes</h4>
                <p className="text-sm text-gray-600 italic">"A place to explore, create and thrive"</p>
              </div>
              <div className="min-w-[280px] md:min-w-[320px] snap-center bg-white p-6 rounded-2xl border-2 border-gray-200 text-center shrink-0">
                <div className="w-16 h-16 mx-auto bg-purple-100 rounded-2xl flex items-center justify-center text-3xl mb-4">📚</div>
                <h4 className="font-bold text-[#0b1120] mb-2">Premium Study Materials</h4>
                <p className="text-sm text-gray-600 italic">"Where learning meets inspiration"</p>
              </div>
              <div className="min-w-[280px] md:min-w-[320px] snap-center bg-white p-6 rounded-2xl border-2 border-gray-200 text-center shrink-0">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-2xl flex items-center justify-center text-3xl mb-4">💬</div>
                <h4 className="font-bold text-[#0b1120] mb-2">24/7 Doubt Support</h4>
                <p className="text-sm text-gray-600 italic">"Success is a journey, not a destination"</p>
              </div>
              <div className="min-w-[280px] md:min-w-[320px] snap-center bg-white p-6 rounded-2xl border-2 border-gray-200 text-center shrink-0">
                <div className="w-16 h-16 mx-auto bg-yellow-100 rounded-2xl flex items-center justify-center text-3xl mb-4">📝</div>
                <h4 className="font-bold text-[#0b1120] mb-2">Regular Mock Tests</h4>
                <p className="text-sm text-gray-600 italic">"Practice makes perfect"</p>
              </div>
            </div>
          </section>

          {/* Student Reviews */}
          <section>
            <h2 className="text-3xl font-black text-[#0b1120] mb-8 flex items-center gap-3">
              <span className="text-4xl">⭐</span> Student Reviews
            </h2>
            <div className="flex items-center gap-4 mb-8">
              <div className="text-5xl font-black text-[#0b1120]">4.9</div>
              <div>
                <div className="flex text-yellow-400 text-xl mb-1">★★★★★</div>
                <div className="text-sm text-gray-500 font-bold">(124 reviews)</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  text: "The mock tests were exactly like the real exam. Cleared my qualifier comfortably!",
                  initial: "R",
                  name: "Rahul Sharma",
                  role: "Qualified Jan 2025",
                  color: "bg-blue-100 text-blue-700"
                },
                {
                  text: "As someone from non-maths background, the teaching made everything click!",
                  initial: "A",
                  name: "Anjali Gupta",
                  role: "Qualified Sept 2024",
                  color: "bg-purple-100 text-purple-700"
                }
              ].map((review, i) => (
                <div key={i} className="bg-white border-[3px] border-[#0b1120] rounded-3xl p-8 shadow-[6px_6px_0px_#0b1120] flex flex-col h-full hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0px_#0b1120] transition-all">
                  <p className="text-gray-700 font-bold text-lg mb-8 flex-grow">"{review.text}"</p>

                  <div className="flex items-center justify-between mt-auto pt-6 border-t-2 border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full ${review.color} border-2 border-[#0b1120] flex items-center justify-center font-black text-xl`}>
                        {review.initial}
                      </div>
                      <div>
                        <div className="font-black text-[#0b1120]">{review.name}</div>
                        <div className="text-sm font-bold text-gray-500">{review.role}</div>
                      </div>
                    </div>
                    <div className="text-yellow-400 text-lg tracking-tighter">★★★★★</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* YouTube Video Section */}
          <section>
            <h2 className="text-3xl font-black text-[#0b1120] mb-4">
              See How Gen-Z IITian Works
            </h2>
            <p className="text-gray-600 font-medium mb-8">
              Watch this quick tour to understand how our platform simplifies your IIT Madras journey
            </p>
            <div className="aspect-video bg-gray-900 rounded-3xl border-[3px] border-[#0b1120] overflow-hidden relative shadow-[8px_8px_0px_#0b1120]">
              {/* Replace with actual YouTube embed */}
              <div className="absolute inset-0 flex items-center justify-center">
                <a href="https://www.youtube.com/channel/UC4oJ9lmWx_X9_XsNTUWLkNw" target="_blank" rel="noopener noreferrer" className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer shadow-xl">
                  <Play className="w-8 h-8 text-white ml-2" fill="currentColor" />
                </a>
              </div>
              <img src="https://picsum.photos/seed/youtube/800/450" alt="Video Thumbnail" className="w-full h-full object-cover opacity-60" />
            </div>
          </section>

          {/* FAQs */}
          <section>
            <h2 className="text-3xl font-black text-[#0b1120] mb-8 flex items-center gap-3">
              <span className="text-4xl">❓</span> Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="font-bold text-[#0b1120] pr-4">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {activeFaq === i && (
                    <div className="px-6 pb-5 text-gray-600 font-medium">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Sidebar / Pricing */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 flex flex-col gap-8" id="pricing">

            {/* Pricing Card (Image 2 Style) */}
            <div className="relative">
              <div className="absolute inset-0 bg-[#10b981] rounded-3xl translate-y-3 translate-x-3 border-2 border-[#0b1120]"></div>
              <div className="relative bg-white border-[3px] border-[#0b1120] rounded-3xl overflow-hidden flex flex-col">
                <div className="aspect-video bg-gray-200 relative group cursor-pointer">
                  <img src="https://picsum.photos/seed/qualifier-hero/800/450" alt="Course Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-colors group-hover:bg-black/40">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center transform transition-transform group-hover:scale-110">
                      <Play className="w-6 h-6 text-[#0b1120] ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-end gap-3">
                      <div className="text-4xl font-black text-[#0b1120]">₹649</div>
                      <div className="text-xl text-gray-400 font-bold line-through mb-1">₹999</div>
                    </div>
                    <div className="px-4 py-1.5 bg-[#fef08a] text-[#0b1120] border-2 border-[#0b1120] rounded-full text-sm font-black">
                      35% off
                    </div>
                  </div>

                  <div className="relative mb-6">
                    <select className="w-full appearance-none bg-white border-2 border-[#0b1120] rounded-xl px-4 py-3 text-base font-bold text-[#0b1120] focus:outline-none focus:ring-2 focus:ring-[#10b981]">
                      <option>INR</option>
                      <option>USD</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <ChevronDown className="w-5 h-5 text-[#0b1120]" />
                    </div>
                  </div>

                  <button onClick={() => window.open('https://pages.razorpay.com/pl_S7JauPkzTwNyRf/view', '_blank')} className="w-full py-4 bg-[#0b1120] text-white rounded-xl font-black text-lg border-2 border-[#0b1120] hover:bg-gray-800 transition-colors">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>

            {/* Related Courses */}
            <div className="bg-white border-[3px] border-[#0b1120] rounded-3xl p-6 shadow-[8px_8px_0px_#0b1120]">
              <h3 className="text-xl font-black text-[#0b1120] mb-4">Related Courses</h3>
              <div className="space-y-3">
                <a href="https://pages.razorpay.com/pl_S6yTTg8hKz8ZGf/view" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 border-2 border-transparent hover:border-gray-200 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">🏗️</div>
                    <div className="font-bold text-[#0b1120]">Foundation T1</div>
                  </div>
                  <div className="text-sm font-bold text-gray-500">from ₹249</div>
                </a>
                <a href="https://pages.razorpay.com/pl_S7J6R8xcpjwvBO/view" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 border-2 border-transparent hover:border-gray-200 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">🚀</div>
                    <div className="font-bold text-[#0b1120]">Foundation T2</div>
                  </div>
                  <div className="text-sm font-bold text-gray-500">from ₹249</div>
                </a>
                <a href="https://pages.razorpay.com/pl_S7JFgVsj0mereC/view" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 border-2 border-transparent hover:border-gray-200 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">🎓</div>
                    <div className="font-bold text-[#0b1120]">Diploma</div>
                  </div>
                  <div className="text-sm font-bold text-gray-500">from ₹49</div>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-[3px] border-[#0b1120] p-4 lg:hidden z-50 flex items-center justify-between shadow-[0_-8px_20px_rgba(0,0,0,0.1)]">
        <div>
          <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-0.5">Starting from</div>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-black text-[#0b1120]">₹649</span>
            <span className="text-sm font-bold text-gray-400 line-through mb-1">₹999</span>
          </div>
        </div>
        <button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="px-4 py-3 bg-[#10b981] text-[#0b1120] rounded-xl font-black border-2 border-[#0b1120] flex items-center gap-2 hover:bg-[#059669] hover:text-white transition-colors text-sm sm:text-base">
          <span className="hidden sm:inline">🎯</span> Get Secured Seat to BS
        </button>
      </div>

    </div>
  );
}
