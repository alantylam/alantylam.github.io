import React, { useState, useEffect } from 'react';

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Handle navbar scroll effect
      setScrolled(window.scrollY > 50);

      // Handle active section highlighting
      const sections = document.querySelectorAll('section');
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });
      
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const canvas = document.getElementById('matrix-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrixChars = "01";
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * canvas.height / fontSize;
    }

    function draw() {
      ctx!.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx!.fillRect(0, 0, canvas.width, canvas.height);

      ctx!.fillStyle = 'rgba(0, 0, 255, 1)';
      ctx!.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
        ctx!.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 35);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const targetPosition = element.offsetTop;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    // { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  const skills = [
    {
      title: 'Languages',
      tags: ['Java', 'Python', 'SQL (PostgreSQL, Oracle)', 'JavaScript', 'ReactJS', 'HTML5/CSS3']
    },
    {
      title: 'Backend & Architecture',
      tags: ['Microservices', 'Event-Driven Design', 'Apache Kafka', 'Distributed Systems', 'RESTful APIs', 'GraphQL']
    },
    {
      title: 'AI & Productivity',
      tags: ['AI-Augmented Development (GitHub Copilot)', 'AI Agents', 'Prompt Engineering', 'Automated Test Generation']
    },
    {
      title: 'Tools & DevOps',
      tags: ['CI/CD (GitHub Actions, Jenkins)', 'Git', 'Docker', 'Bitbucket', 'Webhooks', 'Monitoring & Observability']
    },
    {
      title: 'Testing',
      tags: ['Unit & Integration Testing', 'UI Automation (Selenium)', 'JUnit', 'Mockito', 'PyTest', 'Regression Testing']
    }
  ];

  const experiences = [
    {
      company: 'Morgan Stanley',
      title: 'Full-Stack Software Developer',
      date: 'April 2022 – Present',
      responsibilities: [
        'Implemented a microservices-based migration framework to facilitate high-stakes financial data transfers between platforms',
        'Engineered an event-driven data pipeline using Kafka; produced messages for data transfer and processed asynchronous responses to manage real-time status updates',
        'Accelerated delivery cycles by integrating AI agents into the development workflow to automate unit and integration test generation, ensuring robust coverage for complex financial logic',
        'Spearheaded Technical Discovery for high-priority Epics, using AI to assist in identifying edge-case use cases and breaking down work into actionable, defect-resistant user stories',
        'Optimized legacy codebases by leveraging AI-driven debugging to resolve bottlenecks and improve the performance of existing microservices',
        'Led development of a third-party cost basis integration in Shareworks, mitigating multi-million dollar IRS penalty risks for millions of U.S. participants',
        'Automated quality assurance by developing unit, integration, and UI test suites, saving thousands of manual testing hours'
      ]
    },
    {
      company: 'Shareworks by Morgan Stanley',
      title: 'Team Lead | Migration Specialist',
      date: 'July 2019 - April 2022',
      responsibilities: [
        'Managed and mentored a team of four, overseeing high-volume data migrations and streamlining processes to increase migration speed by 70%',
        'Acted as Technical Lead for external client communications, gathering requirements for complex integrations and bug fixes',
        'Managed end-to-end data migration projects for corporate clients, overseeing the periodic transfer of historical financial data for multiple time ranges leading up to "go-live" dates',
        'Performed rigorous data reconciliation between client legacy platforms and Shareworks to ensure 100% accuracy of migrated financial records',
        'Troubleshot complex data discrepancies, communicating technical limitations to clients and architecting alternative solutions to ensure data compatibility with the platform',
        'Developed Python automation scripts that increased frontend setup efficiency by 90% and reduced manual reconciliation efforts by 60%'
      ]
    }
  ];

  const projects = [
    {
      title: 'Tesla Helper',
      description: 'Automatically adjust charge limit based on weather forecast, and automate charging schedules based on next day\'s departure time.',
      tags: ['Python', 'API', 'Webhooks', 'Github Workflows']
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200">
      {/* Navigation */}
      <nav className="fixed w-full z-1000 transition-all duration-300 bg-black/20 backdrop-blur-xl shadow-2xl border border-white/10">
        <div className="flex justify-between items-center -my-3">
          <img src="/logo_noBG_fr.png" alt="My Logo" className="h-26 w-26 cursor-pointer" onClick={() => scrollToSection("home")} />
          
          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8 px-10">
            {navLinks.map(link => (
              <li key={link.id}>
                <button
                  onClick={() => scrollToSection(link.id)}
                  className={`px-3 py-2 rounded-lg font-semibold transition-all ${
                    activeSection === link.id
                      ? 'text-white underline decoration-blue-500 underline-offset-[3px]'
                      : 'text-gray-500 hover:bg-blue-500 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col gap-1"
          >
            <span className="w-6 h-0.5 bg-gray-200 transition-all"></span>
            <span className="w-6 h-0.5 bg-gray-200 transition-all"></span>
            <span className="w-6 h-0.5 bg-gray-200 transition-all"></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0f0f0f] border-b border-blue-500/30">
            <ul className="flex flex-col p-8 gap-4">
              {navLinks.map(link => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg font-semibold transition-all ${
                      activeSection === link.id
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-200 hover:bg-blue-500 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="h-screen flex items-center justify-center text-center px-8 bg-[#0f0f0f] border-b border-blue-500/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
        <canvas id="matrix-canvas" className="absolute inset-0 z-5"></canvas>
        <div className="absolute inset-0 bg-[#0f0f0f] opacity-50 z-8"></div>
        <div className="max-w-4xl relative z-10 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Hi, I'm Alan</h1>
          <div className="text-2xl md:text-3xl mb-4 opacity-95">A Full-Stack Software Developer</div>
          {/* <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            I have five years of fintech experience specializing in distributed systems, 
            event-driven architecture, and large-scale data migrations. 
            I bridge high-level technical execution with strategic business impact by leading cross-functional teams 
            and leveraging AI-augmented development to deliver secure, high-integrity financial solutions.
          </p> */}
          <div className="flex gap-4 justify-center flex-wrap py-5">
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/40 transition-all hover:-translate-y-1"
            >
              Get In Touch
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-3 bg-transparent text-white border-2 border-blue-500 rounded-full font-semibold hover:bg-blue-500 transition-all"
            >
              View My Work
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="h-screen py-30 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-blue-500 mb-4">About Me</h2>
          <p className="text-center text-gray-400 text-lg mb-12">Passionate about building scalable applications</p>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
              <p>
                Full-stack Software Developer with over five years of experience in the fintech sector, 
                specializing in building distributed systems and event-driven architectures with Java and Kafka.
              </p>
              <p>
                My background bridges high-level technical execution with strategic business impact, 
                having led cross-functional teams and managed end-to-end data migrations to mitigate 
                multi-million dollar compliance risks. 
              </p>
              <p>
                I focus on leveraging AI-augmented development and rigorous data reconciliation to deliver scalable, 
                accurate solutions for complex global platforms.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '4+', label: 'Years Software Experience' },
                { value: '2+', label: 'Years Business Experience' },
                // { value: '10+', label: 'Technologies' },
                // { value: '100%', label: 'Client Satisfaction' }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-[#1a1a1a] p-8 rounded-2xl text-center border border-blue-500/30 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 transition-all hover:-translate-y-2"
                >
                  <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="h-screen flex items-center justify-center px-8 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-blue-500 mb-4">Technical Skills</h2>
          <p className="text-center text-gray-400 text-lg mb-12">My technology stack and expertise</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-[#1a1a1a] p-6 rounded-2xl border border-blue-500/20 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30 transition-all hover:-translate-y-2"
              >
                <h3 className="text-blue-500 text-2xl mb-4 flex items-center gap-2">
                  <span className="text-xl font-semibold">{skill.title}</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skill.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm hover:scale-105 transition-transform"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="h-screen flex items-center justify-center py-175 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-blue-500 mb-4">Work Experience</h2>
          <p className="text-center text-gray-400 text-lg mb-12">My professional journey</p>
          
          <div className="relative pl-8 border-l-4 border-blue-500">
            {experiences.map((exp, index) => (
              <div key={index} className="mb-12 pl-8 relative">
                <div className="absolute -left-[2.6rem] top-0 w-4 h-4 rounded-full bg-[#0a0a0a] border-4 border-blue-500"></div>
                
                <h3 className="text-2xl font-bold text-gray-200 mb-2">{exp.company}</h3>
                <div className="text-blue-500 font-semibold text-lg mb-1">{exp.title}</div>
                <div className="text-gray-400 text-sm mb-4">{exp.date}</div>
                
                <ul className="space-y-2 ml-6">
                  {exp.responsibilities.map((resp, respIndex) => (
                    <li key={respIndex} className="text-gray-300 list-disc">{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="h-screen flex items-center justify-center py-125 px-8 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto -translate-y-[30px]">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-blue-500 mb-4">Featured Projects</h2>
          <p className="text-center text-gray-400 text-lg mb-12">Some of my recent work</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-blue-500/20 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30 transition-all hover:-translate-y-2"
              >
                {/* <div className="h-48 bg-[#2a2a2a] flex items-center justify-center text-6xl text-blue-500 border-b border-blue-500/30">
                  {project.icon}
                </div> */}
                <div className="p-6">
                  <h3 className="text-xl font-bold items-center justify-center text-gray-200 mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-[#2a2a2a] text-blue-500 px-3 py-1 rounded-full text-sm border border-blue-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="h-screen flex items-center justify-center -my-25 px-8 bg-[#0f0f0f] border-t border-blue-500/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-500 mb-4">Let's Work Together</h2>
          <p className="text-gray-400 text-lg mb-12">Have a project in mind? Let's connect!</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '📧', label: 'alanlam56@gmail.com', href: 'mailto:alanlam56@gmail.com' },
              { icon: '💼', label: 'LinkedIn', href: 'https://https://www.linkedin.com/in/alantylam/' },
              { icon: '💻', label: 'GitHub', href: 'https://github.com/alantylam' },
              { icon: '📱', label: '(368) 999-8088', href: 'tel:+13689998088' }
            ].map((contact, index) => (
              <a
                key={index}
                href={contact.href}
                target={contact.href.startsWith('http') ? '_blank' : undefined}
                rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="bg-[#1a1a1a] py-8 px-4 rounded-2xl border border-blue-500/30 hover:border-blue-500 hover:bg-[#2a2a2a] hover:shadow-lg hover:shadow-blue-500/20 transition-all hover:-translate-y-1 block text-center"
              >
                <div className="text-4xl mb-2">{contact.icon}</div>
                <div className="text-white">{contact.label}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] text-gray-400 text-center py-8 border-t border-blue-500/30">
        <p>&copy; 2026 Alan Lam </p>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease;
        }
      `}</style>
    </div>
  );
}