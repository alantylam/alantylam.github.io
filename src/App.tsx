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
      icon: '⚙️',
      title: 'Backend Development',
      tags: ['Java', 'Spring Boot', 'REST APIs', 'Microservices', 'Maven']
    },
    {
      icon: '💾',
      title: 'Database',
      tags: ['SQL', 'PostgreSQL', 'MySQL', 'Query Optimization', 'Database Design']
    },
    {
      icon: '🎨',
      title: 'Frontend',
      tags: ['JavaScript', 'React', 'HTML/CSS', 'TypeScript', 'Responsive Design']
    },
    {
      icon: '🛠️',
      title: 'Tools & DevOps',
      tags: ['Git', 'Docker', 'Jenkins', 'AWS', 'Agile/Scrum']
    }
  ];

  const experiences = [
    {
      company: 'Company Name',
      title: 'Full-Stack Software Developer',
      date: 'January 2022 - Present',
      responsibilities: [
        'Developed and maintained Java-based backend services using Spring Boot framework, serving 100K+ daily active users',
        'Designed and optimized complex SQL queries and database schemas, reducing query response time by 40%',
        'Built RESTful APIs and microservices architecture for seamless integration with frontend applications',
        'Collaborated with cross-functional teams in Agile environment to deliver features on schedule',
        'Mentored junior developers on best practices for Java development and database design'
      ]
    },
    {
      company: 'Previous Company',
      title: 'Software Developer',
      date: 'June 2021 - December 2021',
      responsibilities: [
        'Implemented new features for enterprise web applications using Java and JavaScript',
        'Wrote efficient SQL queries and stored procedures for data processing and reporting',
        'Participated in code reviews and maintained high code quality standards',
        'Resolved production issues and improved application performance through optimization'
      ]
    }
  ];

  const projects = [
    {
      icon: '🏦',
      title: 'Banking Management System',
      description: 'Enterprise-level banking application with secure transactions, user management, and real-time reporting.',
      tags: ['Java', 'Spring Boot', 'PostgreSQL', 'React']
    },
    {
      icon: '📊',
      title: 'Analytics Dashboard',
      description: 'Real-time analytics platform processing millions of records with optimized queries and interactive visualizations.',
      tags: ['Java', 'MySQL', 'REST API', 'Chart.js']
    },
    {
      icon: '🛒',
      title: 'E-Commerce Platform',
      description: 'Full-featured online shopping platform with inventory management, payment integration, and order tracking.',
      tags: ['Java', 'Spring', 'SQL', 'JavaScript']
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
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            I have about four years of experience primarily focused on Java. 
            I enjoy the challenge of diving into large,
            complex codebases to optimize existing functionality and 
            build out robust new features from the ground up.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
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
                I'm a Full-Stack Software Developer with a strong focus on backend development. My expertise lies in 
                building robust, scalable server-side applications using Java and designing efficient database architectures with SQL.
              </p>
              <p>
                With 3-4 years of hands-on experience, I've worked on diverse projects ranging from enterprise applications 
                to microservices architectures. I'm passionate about writing clean, maintainable code and continuously learning new technologies.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new frameworks, contributing to open-source projects, 
                or sharing knowledge with the developer community.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '3-4', label: 'Years Experience' },
                { value: '50+', label: 'Projects Completed' },
                { value: '10+', label: 'Technologies' },
                { value: '100%', label: 'Client Satisfaction' }
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
                  <span className="text-3xl">{skill.icon}</span>
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
      <section id="experience" className="h-screen flex items-center justify-center py-120 px-8">
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
                <div className="h-48 bg-[#2a2a2a] flex items-center justify-center text-6xl text-blue-500 border-b border-blue-500/30">
                  {project.icon}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-200 mb-2">{project.title}</h3>
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