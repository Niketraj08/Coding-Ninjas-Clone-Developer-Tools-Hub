import React, { useState } from "react";
import { Link } from "react-router-dom";
import { COURSES, ALUMNI_COMPANIES } from "../data";
import { Course } from "../types";
import { motion } from "motion/react";
import { 
  Star, 
  Download, 
  Award, 
  BookOpen, 
  Users, 
  Check, 
  Sparkles, 
  Brain, 
  Clock, 
  ChevronRight, 
  Play, 
  ArrowRight,
  TrendingUp,
  MessageSquare,
  HelpCircle,
  Briefcase
} from "lucide-react";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<"All" | "DSA" | "Web Dev" | "Data Science">("All");
  const [downloadingCourse, setDownloadingCourse] = useState<string | null>(null);

  const filteredCourses = COURSES.filter(course => {
    if (selectedCategory === "All") return true;
    if (selectedCategory === "DSA") return course.id.includes("dsa") || course.id.includes("cp");
    if (selectedCategory === "Web Dev") return course.id.includes("web") || course.id.includes("fullstack");
    if (selectedCategory === "Data Science") return course.id.includes("data");
    return true;
  });

  const handleDownloadSyllabus = (courseId: string, courseTitle: string) => {
    setDownloadingCourse(courseId);
    setTimeout(() => {
      setDownloadingCourse(null);
      alert(`Syllabus for "${courseTitle}" downloaded successfully! (Simulated download)`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200 bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.05),transparent_50%)]" />
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-indigo-500/5 blur-3xl" />
        
        <div className="mx-auto max-w-7xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 rounded-full px-3.5 py-1 text-xs text-indigo-700 font-semibold uppercase tracking-wider"
              >
                <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                <span>India's Best Coding Education Platform</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-slate-900"
              >
                Be more than a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Coder</span>, <br />
                Become a <span className="text-indigo-600">Ninja 🥷</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed"
              >
                Unleash your true coding potential. Learn Data Structures, Algorithms, Web Development, and Machine Learning from IIT & Stanford Alumni. Accelerate your career today.
              </motion.p>

              {/* CTAs */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <a 
                  href="#courses-section"
                  className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 font-semibold text-white rounded-xl shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-0.5 text-center flex items-center justify-center space-x-2"
                >
                  <span>Explore Our Courses</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                
                <Link 
                  to="/practice"
                  className="w-full sm:w-auto px-8 py-4 bg-slate-100 hover:bg-slate-200 border border-slate-200 font-semibold text-slate-700 rounded-xl transition-all text-center flex items-center justify-center space-x-2"
                >
                  <Play className="h-4 w-4 text-indigo-600 fill-indigo-600" />
                  <span>Launch Practice Arena</span>
                </Link>
              </motion.div>

              {/* Metric Badges */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-3 gap-4 pt-4 max-w-lg mx-auto lg:mx-0 border-t border-slate-200"
              >
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">100k+</div>
                  <div className="text-xs text-slate-500 font-semibold">Students Trained</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600">10k+</div>
                  <div className="text-xs text-slate-500 font-semibold">Placed Alumni</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono flex items-center justify-center lg:justify-start">
                    4.9<Star className="h-4 w-4 text-amber-500 fill-amber-500 ml-1 inline" />
                  </div>
                  <div className="text-xs text-slate-500 font-semibold">Avg Student Rating</div>
                </div>
              </motion.div>
            </div>

            {/* Right Interactive Image Column (Mock Coding Ninja Workspace) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 relative"
            >
              <div className="absolute inset-0 bg-indigo-500/5 blur-2xl rounded-full" />
              <div className="relative border-4 border-slate-800 bg-slate-900 rounded-2xl p-6 shadow-2xl max-w-md mx-auto text-slate-200">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                  <div className="flex space-x-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 tracking-wide">ninja-compiler.cpp</span>
                  <span className="px-2 py-0.5 text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 rounded font-mono">STATUS: OK</span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <p className="text-slate-500">// Welcome to Coding Ninjas Practice Compiler</p>
                  <p><span className="text-blue-400">#include</span> <span className="text-emerald-400">&lt;iostream&gt;</span></p>
                  <p><span className="text-purple-400">using namespace</span> std;</p>
                  <br />
                  <p><span className="text-blue-400">int</span> <span className="text-yellow-400">main</span>() &#123;</p>
                  <p className="pl-4 text-indigo-400 font-semibold">cout &lt;&lt; "Be a Ninja, Write Clean Code!" &lt;&lt; endl;</p>
                  <p className="pl-4 text-emerald-400">bool careerUpgraded = true;</p>
                  <p className="pl-4 text-emerald-400">if (careerUpgraded) &#123;</p>
                  <p className="pl-8 text-blue-400">dreamCompany.attain();</p>
                  <p className="pl-4">&#125;</p>
                  <p className="pl-4"><span className="text-purple-400">return</span> <span className="text-amber-500">0</span>;</p>
                  <p>&#125;</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-white">
                      <span className="text-[10px] font-bold">CN</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white">Ankush Singla</h4>
                      <p className="text-[10px] text-slate-400 font-mono">Stanford Univ, Co-Founder</p>
                    </div>
                  </div>
                  <Link 
                    to="/practice"
                    className="px-3.5 py-1.5 bg-indigo-600 text-white hover:bg-indigo-700 transition-colors rounded-lg text-[11px] font-semibold flex items-center space-x-1.5"
                  >
                    <span>Run Solution</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Alumni Section */}
      <section className="py-12 bg-slate-100 border-b border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-xs font-bold tracking-widest text-slate-500 uppercase mb-8">
            Our Alumni Work At Top Global Tech Enterprises
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-95">
            {ALUMNI_COMPANIES.map((company, index) => (
              <div key={index} className="flex items-center justify-center bg-white border border-slate-200 rounded-xl px-5 py-3 h-12 w-28 sm:w-32 transition-all shadow-sm hover:shadow-md cursor-pointer">
                <span className="font-bold text-sm tracking-wide text-slate-700 font-mono">{company.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Coding Ninjas - Comparison Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Why <span className="text-indigo-600">Coding Ninjas</span> is different
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Traditional courses offer videos, but no real-time guidance. College courses are outdated. Here is how we bridge the gap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="border border-slate-200 bg-white p-6 rounded-2xl relative hover:border-indigo-300 transition-all hover:shadow-lg hover:shadow-indigo-500/5 group">
              <div className="h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-105 transition-transform">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-slate-900">1:1 Doubt Support</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Stuck on a bug? Our dedicated team of teaching assistants are available 24/7 to do video calls, debug your code, and guide you to correct logic within minutes.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="border border-slate-200 bg-white p-6 rounded-2xl relative hover:border-emerald-300 transition-all hover:shadow-lg hover:shadow-emerald-500/5 group">
              <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-105 transition-transform">
                <Briefcase className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-slate-900">Placement Cell Assistance</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Get access to our curated Job Portal featuring over 250+ top tech partners. Benefit from regular mock interviews, resume feedback, and direct hiring drives.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="border border-slate-200 bg-white p-6 rounded-2xl relative hover:border-purple-300 transition-all hover:shadow-lg hover:shadow-purple-500/5 group">
              <div className="h-12 w-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 mb-6 group-hover:scale-105 transition-transform">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-slate-900">Interactive Sandbox & IDE</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Code while you learn. Our industry-leading online compiler lets you compile and evaluate your code immediately with extensive test cases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses-section" className="py-20 bg-white px-4 sm:px-6 lg:px-8 border-t border-slate-200">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                Explore Our <span className="text-[#fa7223]">Premium Courses</span>
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                Accelerate your technical mastery. Highly structured learning programs curated by IIT & Stanford specialists.
              </p>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mt-6 md:mt-0 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
              {(["All", "DSA", "Web Dev", "Data Science"] as const).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                    selectedCategory === category
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course: Course) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-indigo-400 hover:shadow-xl hover:shadow-slate-100 transition-all group"
              >
                {/* Course Header Banner */}
                <div className="p-6 pb-4 border-b border-slate-100 relative">
                  <div className="absolute top-4 right-4 bg-indigo-50 text-indigo-700 border border-indigo-100 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                    {course.tag}
                  </div>
                  
                  {/* Language/Stack Logo Mock */}
                  <div className="h-10 w-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center font-bold text-sm tracking-tight text-slate-700 mb-4 font-mono uppercase">
                    {course.logo}
                  </div>

                  <h3 className="text-lg font-bold leading-snug group-hover:text-indigo-600 transition-colors mb-2 text-slate-900">
                    {course.title}
                  </h3>

                  <div className="flex items-center space-x-1 text-xs">
                    <span className="font-bold text-amber-500">{course.rating}</span>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-current" />
                      ))}
                    </div>
                    <span className="text-slate-500">({course.reviewsCount} reviews)</span>
                  </div>
                </div>

                {/* Content / Features */}
                <div className="p-6 space-y-4 flex-1">
                  <div className="flex items-center space-x-4 text-xs text-slate-500 font-semibold">
                    <span className="flex items-center"><Clock className="h-3.5 w-3.5 text-indigo-500 mr-1.5" /> {course.duration}</span>
                    <span className="flex items-center"><Award className="h-3.5 w-3.5 text-emerald-600 mr-1.5" /> {course.level}</span>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-600">
                    {course.features.map((feature, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <Check className="h-3.5 w-3.5 text-indigo-600 shrink-0" />
                        <span className="truncate">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing and Action */}
                <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Course Fee</div>
                    <div className="flex items-baseline space-x-1.5">
                      <span className="text-lg font-bold text-slate-900">₹{course.discountedPrice.toLocaleString()}</span>
                      <span className="text-xs text-slate-400 line-through">₹{course.originalPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDownloadSyllabus(course.id, course.title)}
                      disabled={downloadingCourse === course.id}
                      className="p-2.5 text-slate-500 hover:text-slate-950 bg-white border border-slate-200 rounded-xl transition-colors hover:bg-slate-50"
                      title="Download Syllabus"
                    >
                      <Download className={`h-4 w-4 ${downloadingCourse === course.id ? "animate-bounce text-indigo-600" : ""}`} />
                    </button>

                    <Link
                      to="/practice"
                      className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-xs font-bold text-white transition-all shadow-md shadow-indigo-100 flex items-center space-x-1"
                    >
                      <span>Enroll</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ninja Learning Path / Roadmap */}
      <section className="py-20 bg-slate-50 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              The <span className="text-indigo-600">Ninja Learning Path</span>
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Our structured approach takes you from absolute beginner fundamentals all the way to advanced product-architecture coding.
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-gradient-to-b from-indigo-500 via-blue-500 to-purple-500 hidden md:block md:left-1/2 md:-ml-0.5" />

            <div className="space-y-12 relative">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right flex justify-end">
                  <div className="max-w-md bg-white border border-slate-200 p-6 rounded-2xl relative md:hover:-translate-x-1 transition-transform shadow-sm">
                    <span className="text-[#fa7223] text-xs font-bold uppercase tracking-wider font-mono">01 &bull; Foundations</span>
                    <h4 className="text-lg font-bold mt-1 mb-2 text-slate-900">Learn Programming Basics</h4>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      Master fundamentals of programming in C++, Java, Python or JavaScript. Comprehend variables, conditional loops, functions and arrays securely.
                    </p>
                  </div>
                </div>
                {/* Visual marker */}
                <div className="absolute left-6 md:left-1/2 -ml-3 md:-ml-3.5 w-6 h-6 rounded-full bg-orange-500 border-4 border-slate-50 z-10" />
                <div className="md:w-1/2 md:pl-12" />
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row md:items-center md:flex-row-reverse">
                <div className="md:w-1/2 md:pl-12 flex justify-start">
                  <div className="max-w-md bg-white border border-slate-200 p-6 rounded-2xl relative md:hover:translate-x-1 transition-transform shadow-sm">
                    <span className="text-blue-600 text-xs font-bold uppercase tracking-wider font-mono">02 &bull; Algorithms</span>
                    <h4 className="text-lg font-bold mt-1 mb-2 text-slate-900">Deep Dive into DSA</h4>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      Conquer complex Stack, Queue, Linked Lists, Trees, Heaps, and Graph structures. Solve competitive sorting and recursion scenarios confidently.
                    </p>
                  </div>
                </div>
                {/* Visual marker */}
                <div className="absolute left-6 md:left-1/2 -ml-3 md:-ml-3.5 w-6 h-6 rounded-full bg-blue-500 border-4 border-slate-50 z-10" />
                <div className="md:w-1/2 md:pr-12" />
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right flex justify-end">
                  <div className="max-w-md bg-white border border-slate-200 p-6 rounded-2xl relative md:hover:-translate-x-1 transition-transform shadow-sm">
                    <span className="text-purple-600 text-xs font-bold uppercase tracking-wider font-mono">03 &bull; Specialization</span>
                    <h4 className="text-lg font-bold mt-1 mb-2 text-slate-900">Build Real-World Applications</h4>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      Specialize in React MERN Fullstack or Advanced Data Science. Implement actual, deployable products to showcase in your developer portfolio.
                    </p>
                  </div>
                </div>
                {/* Visual marker */}
                <div className="absolute left-6 md:left-1/2 -ml-3 md:-ml-3.5 w-6 h-6 rounded-full bg-purple-500 border-4 border-slate-50 z-10" />
                <div className="md:w-1/2 md:pl-12" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive FAQ Widget */}
      <section className="py-20 bg-white px-4 sm:px-6 lg:px-8 border-t border-slate-200">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            <FAQItem 
              question="Do I need prior coding experience before joining?"
              answer="Absolutely not! Over 60% of our students are beginners with zero coding experience. We start teaching right from the absolute basics, installing your first editor up to advanced algorithm design."
            />
            <FAQItem 
              question="What is 1:1 doubt support and how does it work?"
              answer="Whenever you get stuck with an error or concept, you can raise a doubt ticket on our portal. Within minutes, a qualified teaching assistant (TA) connects with you on a screen-sharing session to guide you to the solution."
            />
            <FAQItem 
              question="Will I receive certification upon completion?"
              answer="Yes, after successfully completing course criteria and solving assignments/projects, you will receive a verified industry certification which you can showcase on LinkedIn and in your resumes."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 px-4 sm:px-6 lg:px-8 text-center text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="text-slate-800 font-bold tracking-wider uppercase">
            CODING<span className="text-[#fa7223]">NINJAS</span> CLONE
          </div>
          <p className="max-w-md mx-auto text-slate-500">
            This application is an educational design clone created with React and Tailwind to celebrate the awesome visual identity and features of Coding Ninjas.
          </p>
          <div className="pt-4 border-t border-slate-150 flex justify-between items-center flex-wrap gap-4 text-[11px] text-slate-400">
            <span>&copy; 2026 Coding Ninjas Clone. All rights reserved.</span>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-slate-600">Terms of Use</a>
              <a href="#" className="hover:text-slate-600">Privacy Policy</a>
              <a href="#" className="hover:text-slate-600">Contact Support</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-slate-200 bg-white rounded-xl overflow-hidden transition-all hover:border-indigo-300 shadow-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left font-semibold text-sm text-slate-800 hover:text-indigo-600 transition-colors"
      >
        <span>{question}</span>
        <ChevronRight className={`h-4 w-4 transition-transform duration-250 ${isOpen ? "rotate-90 text-indigo-600" : "text-slate-400"}`} />
      </button>
      {isOpen && (
        <div className="p-5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
          {answer}
        </div>
      )}
    </div>
  );
}
