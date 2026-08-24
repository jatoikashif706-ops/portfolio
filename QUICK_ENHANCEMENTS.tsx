// QUICK ENHANCEMENTS TO ADD TO YOUR PORTFOLIO
// Copy these code snippets into your page.tsx

// ============================================
// 1. ADD THESE TO YOUR IMPORTS
// ============================================
import { Menu, X, ChevronUp, Download } from "lucide-react";

// ============================================
// 2. ADD THESE STATE VARIABLES
// ============================================
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const [scrollProgress, setScrollProgress] = useState(0);
const [showScrollTop, setShowScrollTop] = useState(false);

// ============================================
// 3. ADD THIS useEffect HOOK
// ============================================
useEffect(() => {
  const updateScroll = () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    setScrollProgress(scrolled);
    setShowScrollTop(window.scrollY > 500);
  };
  window.addEventListener('scroll', updateScroll);
  return () => window.removeEventListener('scroll', updateScroll);
}, []);

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// ============================================
// 4. ADD SCROLL PROGRESS BAR (After opening div)
// ============================================
{/* Scroll Progress Bar */}
<motion.div 
  className="fixed top-0 left-0 h-1 bg-gradient-to-r from-sky-500 via-teal-400 to-emerald-500 z-[60] shadow-lg shadow-sky-500/50"
  style={{ width: `${scrollProgress}%` }}
/>

// ============================================
// 5. REPLACE YOUR HEADER WITH THIS ENHANCED VERSION
// ============================================
<motion.header
  initial={{ y: -50, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
  className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80"
>
  <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
    <a href="#" className="font-bold text-lg tracking-tight hover:text-sky-400 transition-colors flex items-center gap-2">
      <Terminal className="w-5 h-5 text-sky-400" />
      <span>Kashif<span className="text-sky-400">.Dev</span></span>
    </a>
    
    {/* Desktop Navigation */}
    <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
      {['About', 'Experience', 'Projects', 'Skills', 'Contact'].map(link => (
        <a 
          key={link} 
          href={`#${link.toLowerCase()}`} 
          className="hover:text-slate-100 transition-colors relative group"
        >
          {link}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-300"></span>
        </a>
      ))}
    </nav>

    {/* Mobile Menu Button */}
    <button
      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      className="md:hidden p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
      aria-label="Toggle menu"
    >
      {mobileMenuOpen ? (
        <X className="w-6 h-6 text-sky-400" />
      ) : (
        <Menu className="w-6 h-6 text-sky-400" />
      )}
    </button>
  </div>

  {/* Mobile Navigation Menu */}
  <AnimatePresence>
    {mobileMenuOpen && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className="md:hidden border-t border-slate-800/80 bg-slate-950/95 backdrop-blur-md"
      >
        <nav className="px-6 py-4 flex flex-col gap-4">
          {['About', 'Experience', 'Projects', 'Skills', 'Contact'].map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-sky-400 transition-colors py-2 text-lg font-medium"
            >
              {link}
            </a>
          ))}
        </nav>
      </motion.div>
    )}
  </AnimatePresence>
</motion.header>

// ============================================
// 6. ADD SCROLL TO TOP BUTTON (Before closing </div>)
// ============================================
{/* Scroll to Top Button */}
<AnimatePresence>
  {showScrollTop && (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 p-3 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-lg shadow-sky-500/25 z-50 transition-colors"
      aria-label="Scroll to top"
    >
      <ChevronUp className="w-6 h-6" />
    </motion.button>
  )}
</AnimatePresence>

// ============================================
// 7. ENHANCED HERO SECTION WITH TYPING EFFECT
// ============================================
// First install: npm install react-type-animation
import { TypeAnimation } from 'react-type-animation';

// Then replace the hero h1 with:
<motion.h1
  variants={fadeIn}
  className="text-5xl md:text-7xl font-extrabold tracking-tighter text-slate-100 leading-[0.95]"
>
  Hi, I'm <span className="animate-text-gradient bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent bg-300%">Kashif Qurban</span>
  <br />
  <TypeAnimation
    sequence={[
      'Full-Stack Developer',
      2000,
      'Mobile App Developer',
      2000,
      'AI Enthusiast',
      2000,
      'Problem Solver',
      2000,
    ]}
    wrapper="span"
    speed={50}
    className="text-4xl md:text-5xl text-sky-400"
    repeat={Infinity}
  />
</motion.h1>

// ============================================
// 8. ADD DOWNLOAD RESUME BUTTON TO HERO
// ============================================
// Add this to the button group in hero section:
<a 
  href="/resume.pdf" 
  download 
  className="px-5 py-3 rounded-xl border border-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-sm font-medium transition-colors flex items-center gap-2.5"
>
  <Download className="w-5 h-5" /> Resume
</a>

// ============================================
// 9. ADD STATS SECTION (After Hero, Before Experience)
// ============================================
{/* Stats Section */}
<motion.section
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  variants={staggerContainer}
  className="py-12"
>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
    {[
      { label: "Projects Completed", value: "20+", icon: <Code2 className="w-6 h-6" /> },
      { label: "GitHub Repos", value: "50+", icon: <Github className="w-6 h-6" /> },
      { label: "Tech Skills", value: "25+", icon: <Cpu className="w-6 h-6" /> },
      { label: "Years Experience", value: "3+", icon: <Briefcase className="w-6 h-6" /> },
    ].map((stat, idx) => (
      <motion.div
        key={idx}
        variants={fadeIn}
        className="p-6 rounded-2xl border border-slate-800/80 bg-slate-900/40 text-center space-y-3 hover:border-sky-500/30 transition-colors"
      >
        <div className="flex justify-center text-sky-400">
          {stat.icon}
        </div>
        <div className="text-3xl md:text-4xl font-bold text-slate-100">
          {stat.value}
        </div>
        <div className="text-sm text-slate-400">
          {stat.label}
        </div>
      </motion.div>
    ))}
  </div>
</motion.section>

// ============================================
// 10. ENHANCED PROJECT CARDS WITH IMAGES
// ============================================
// Update PROJECTS data to include images:
const PROJECTS = [
  {
    title: "AI-Powered Local SEO Platform",
    description: "...",
    tags: [...],
    githubUrl: "...",
    liveUrl: "...",
    featured: true,
    image: "/projects/seo-platform.jpg", // Add project screenshots
  },
  // ... rest of projects
];

// Then update project card to include image:
<motion.div
  key={idx}
  variants={fadeIn}
  whileHover={cardHover.hover}
  className="group relative flex flex-col justify-between p-7 rounded-2xl border border-slate-800/80 bg-slate-900/50 hover:bg-slate-900/90 hover:border-slate-700/80 transition-all duration-300 overflow-hidden"
>
  {/* Project Image */}
  {project.image && (
    <div className="relative w-full h-48 mb-5 rounded-xl overflow-hidden bg-slate-800/50">
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60" />
    </div>
  )}
  
  {/* Rest of project card content */}
  <div className="space-y-5">
    {/* ... existing content ... */}
  </div>
</motion.div>

// ============================================
// 11. ADD SKILL LEVEL INDICATORS
// ============================================
// Update SKILL_CATEGORIES to include levels:
const SKILL_CATEGORIES = [
  {
    title: "Frontend & Mobile",
    icon: <Code2 className="w-5 h-5 text-sky-400" />,
    skills: [
      { name: "Next.js 15", level: 90 },
      { name: "React Native", level: 85 },
      { name: "TypeScript", level: 88 },
      // ... rest
    ],
  },
  // ... rest
];

// Then update the skills display:
<div className="space-y-3 pt-3">
  {category.skills.map((skill, sIdx) => (
    <div key={sIdx} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-slate-300">{skill.name}</span>
        <span className="text-xs text-slate-500">{skill.level}%</span>
      </div>
      <div className="h-2 bg-slate-800/50 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: sIdx * 0.1 }}
          className="h-full bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full"
        />
      </div>
    </div>
  ))}
</div>

// ============================================
// 12. ADD DARK MODE TOGGLE (Optional)
// ============================================
// Add to state:
const [darkMode, setDarkMode] = useState(true);

// Add button to header:
<button
  onClick={() => setDarkMode(!darkMode)}
  className="p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
  aria-label="Toggle dark mode"
>
  {darkMode ? (
    <Sun className="w-5 h-5 text-sky-400" />
  ) : (
    <Moon className="w-5 h-5 text-sky-400" />
  )}
</button>

// Import Sun, Moon from lucide-react

// ============================================
// INSTALLATION COMMANDS
// ============================================
/*
npm install react-type-animation
npm install @vercel/analytics
npm install canvas-confetti
*/

// ============================================
// NOTES
// ============================================
/*
1. Add these enhancements one at a time
2. Test after each addition
3. Make sure to add the profile.jpg image in /public folder
4. Create project screenshots and add them to /public/projects/
5. Add your resume.pdf to /public folder
6. Test mobile responsiveness
7. Check all animations work smoothly
*/
