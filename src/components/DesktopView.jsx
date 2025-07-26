import { useState, useEffect } from 'react';
import { ImCopy } from 'react-icons/im';

// Desktop Items Configuration
const desktopItems = [
  { id: 'about', name: 'About Me', icon: '👨‍💻', windowTitle: 'About Me - Personal Information' },
  { id: 'skills', name: 'My Skills', icon: '⚙️', windowTitle: 'Skills.exe - Technical Abilities' },
  { id: 'projects', name: 'Projects', icon: '📁', windowTitle: 'Projects - File Explorer' },
  { id: 'contact', name: 'Contact', icon: '📧', windowTitle: 'Contact - Outlook Express' },
];

// Start Menu Items Configuration
const startMenuItems = [
  { name: 'Social Media Platform', icon: '🌐', link: 'https://social-network-app-frontend.onrender.com/' },
  { name: 'TaskTracker App', icon: '📋', link: 'https://nokia-quality-b2b-platform-bfrq.vercel.app/auth' },
  { name: 'GitHub Profile', icon: '🐙', link: 'https://github.com/ammarmodeh' },
  { name: 'LinkedIn Profile', icon: '💼', link: 'https://www.linkedin.com/in/ammar-m-odeh-abbb36107/' },
];

// Desktop Component
const Desktop = ({ items, onItemClick }) => (
  <div className="absolute p-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-2 z-0 h-[calc(100vh-50px)] w-full overflow-auto">
    {items.map((item) => (
      <div
        key={item.id}
        className="flex flex-col items-center cursor-pointer hover:bg-blue-500 hover:bg-opacity-30 p-2 rounded group w-[100px] h-[100px]"
        onDoubleClick={() => onItemClick(item)}
      >
        <div className="text-4xl mb-1">{item.icon}</div>
        <div className="text-xs text-white text-center font-bold drop-shadow-lg group-hover:bg-blue-600 group-hover:bg-opacity-50 px-1 rounded">
          {item.name}
        </div>
      </div>
    ))}
  </div>
);

// StartMenu Component
const StartMenu = ({ isOpen, items }) => (
  isOpen && (
    <div className="absolute bottom-12 left-2 w-64 bg-gradient-to-r from-gray-300 to-gray-200 border-2 border-gray-400 shadow-[2px_2px_0px_#000,-2px_-2px_0px_#fff] z-50">
      <div className="bg-blue-600 text-white px-2 py-1 text-sm font-bold">Ammar's Portfolio</div>
      <div className="p-2">
        {items.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-2 py-1 hover:bg-blue-500 hover:text-white text-sm"
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </a>
        ))}
      </div>
    </div>
  )
);

// Window Component
const Window = ({ windowData, desktopItem, isActive, onClose, onMinimize, onMaximize, onMouseDown, onBringToFront, renderContent }) => {
  if (windowData.isMinimized) return null;

  const windowStyle = windowData.isMaximized
    ? { top: 0, left: 0, right: 0, bottom: 48, width: 'auto', height: 'auto' }
    : {
      left: windowData.position.x,
      top: windowData.position.y,
      width: windowData.size.width,
      height: windowData.size.height,
    };

  // Handle double-click on header to toggle maximize/restore
  const handleDoubleClick = () => {
    onMaximize(windowData.id);
  };

  return (
    <div
      className="absolute bg-gray-300 border-2 border-gray-400 flex flex-col shadow-[2px_2px_0px_#000,-2px_-2px_0px_#fff] max-w-[100vw] max-h-[calc(100vh-48px)]"
      style={{ ...windowStyle, zIndex: windowData.zIndex, minWidth: '300px', minHeight: '200px' }}
      onMouseDown={() => onBringToFront(windowData.id)}
    >
      <div
        className={`px-2 py-1 flex items-center justify-between border-b-2 border-gray-400 cursor-move ${isActive ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white' : 'bg-gradient-to-r from-gray-500 to-gray-700 text-gray-200'
          }`}
        onMouseDown={(e) => onMouseDown(e, windowData.id)}
        onDoubleClick={handleDoubleClick} // Add double-click handler
      >
        <div className="flex items-center space-x-2 pointer-events-none">
          <span className="text-lg">{desktopItem?.icon}</span>
          <span className="font-bold text-sm">{desktopItem?.windowTitle}</span>
        </div>
        <div className="flex space-x-1 window-controls">
          <button
            className="bg-gray-300 text-black px-2 py-1 text-xs border border-gray-500 hover:bg-gray-400 shadow-[1px_1px_0px_#000,-1px_-1px_0px_#fff]"
            onClick={() => onMinimize(windowData.id)}
          >
            _
          </button>
          <button
            className="bg-gray-300 text-black px-2 py-1 text-xs border border-gray-500 hover:bg-gray-400 shadow-[1px_1px_0px_#000,-1px_-1px_0px_#fff]"
            onClick={() => onMaximize(windowData.id)}
          >
            {windowData.isMaximized ? '❐' : '□'}
          </button>
          <button
            className="bg-red-500 text-white px-2 py-1 text-xs border border-gray-500 hover:bg-red-600 shadow-[1px_1px_0px_#000,-1px_-1px_0px_#fff]"
            onClick={() => onClose(windowData.id)}
          >
            ✕
          </button>
        </div>
      </div>
      <div className="flex-1 bg-white overflow-auto window-content">{renderContent(windowData.id)}</div>
    </div>
  );
};

// Taskbar Component
const Taskbar = ({ openWindows, desktopItems, activeWindow, currentTime, onToggleStartMenu, onRestoreWindow, onBringToFront }) => (
  <div className="absolute bottom-0 left-0 right-0 bg-gray-300 border-t-2 border-gray-400 h-12 flex items-center px-2 z-50 shadow-[2px_2px_0px_#000,-2px_-2px_0px_#fff]">
    <button
      className="bg-gray-300 border-2 border-gray-400 px-3 py-1 mr-2 flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-400 shadow-[1px_1px_0px_#000,-1px_-1px_0px_#fff]"
      onClick={onToggleStartMenu}
    >
      <span className="text-lg">🪟</span>
      <span className="font-bold text-sm">Start</span>
    </button>
    <div className="flex-1 flex space-x-1">
      {Object.entries(openWindows).map(([windowId, windowData]) => {
        const desktopItem = desktopItems.find((item) => item.id === windowId);
        return (
          <button
            key={windowId}
            onClick={() => (windowData.isMinimized ? onRestoreWindow(windowId) : onBringToFront(windowId))}
            className={`px-2 py-1 text-xs border-2 flex items-center space-x-1 max-w-40 truncate ${activeWindow === windowId && !windowData.isMinimized ? 'border-gray-500 bg-gray-400' : 'border-gray-400 bg-gray-200 hover:bg-gray-100'
              } shadow-[1px_1px_0px_#000,-1px_-1px_0px_#fff]`}
          >
            <span>{desktopItem?.icon}</span>
            <span className="truncate">{desktopItem?.name}</span>
          </button>
        );
      })}
    </div>
    <div className="bg-gray-200 border border-gray-400 px-2 py-1 text-xs shadow-[1px_1px_0px_#000,-1px_-1px_0px_#fff]">
      {currentTime.toLocaleTimeString()}
    </div>
  </div>
);

// AboutWindow Component
const AboutWindow = () => (
  <div className="p-4 space-y-4 h-full overflow-auto">
    <div className="bg-gray-100 border-2 border-gray-400 p-4 shadow-[2px_2px_0px_#000,-2px_-2px_0px_#fff]">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <span className="text-2xl mr-2">👨‍💻</span>
        Ammar Odeh - Full Stack Developer
      </h2>
      <div className="bg-white border border-gray-400 p-4 text-sm leading-relaxed">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-bold mb-2 text-blue-600">Personal Information:</h3>
            <p className="mb-2">
              <strong>Name:</strong> Ammar Odeh<br />
              <strong>Profession:</strong> MERN Stack Developer<br />
              <strong>Experience:</strong> 2+ years<br />
              <strong>Status:</strong> Available for projects
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2 text-green-600">Quick Stats:</h3>
            <p className="mb-2">
              <strong>Projects Completed:</strong> 2<br />
              <strong>Response Time:</strong> 24hrs<br />
              <strong>Availability:</strong> Any time
            </p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-bold mb-2 text-purple-600">About Me:</h3>
          <p className="mb-3">
            Welcome to my digital workspace! I'm a self-taught full-stack developer passionate about building modern web applications using the MERN stack. I began my journey in mid-2023, and since then, I've been continuously learning and evolving with the technology.
          </p>
          <p className="mb-3">
            I focus on building scalable, intuitive applications that tackle real-world challenges. From e-commerce sites to social media tools and internal business systems, I bring both creativity and solid development skills to the table.
          </p>
        </div>
        {/* <div className="bg-yellow-100 border border-yellow-400 p-3 text-xs mt-4">
          <strong>💡 Fun Fact:</strong> I still have my original Windows 95 installation disks, and yes, I can still navigate MS-DOS like a pro! But don't worry, I'm all about modern React hooks and ES6+ features these days.
        </div> */}
      </div>
    </div>
  </div>
);

// SkillsWindow Component
const SkillsWindow = () => (
  <div className="p-4 space-y-4 h-full overflow-auto">
    <h2 className="text-xl font-bold mb-4 flex items-center">
      <span className="text-2xl mr-2">⚙️</span>
      Technical Skills & Expertise
    </h2>
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-gray-100 border-2 border-gray-400 p-4 shadow-[2px_2px_0px_#000,-2px_-2px_0px_#fff]">
        <h3 className="font-bold text-lg mb-3 bg-blue-600 text-white px-2 py-1">Frontend Technologies</h3>
        <div className="space-y-2">
          {[
            { name: 'React.js', level: 60, version: '18.x' },
            { name: 'JavaScript ES6+', level: 70, version: 'Latest' },
            { name: 'HTML5 & CSS3', level: 70, version: 'Current' },
            { name: 'Tailwind CSS', level: 70, version: 'Latest' },
            { name: 'Material UI', level: 70, version: 'Latest' },
          ].map((skill, index) => (
            <div key={index} className="bg-white border border-gray-400 p-2">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-sm">{skill.name}</span>
                <span className="text-xs text-gray-600">v{skill.version}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-300 border border-gray-500 h-3">
                  <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-full" style={{ width: `${skill.level}%` }}></div>
                </div>
                <span className="text-xs font-bold">{skill.level}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-100 border-2 border-gray-400 p-4 shadow-[2px_2px_0px_#000,-2px_-2px_0px_#fff]">
        <h3 className="font-bold text-lg mb-3 bg-green-600 text-white px-2 py-1">Backend Technologies</h3>
        <div className="space-y-2">
          {[
            { name: 'Node.js', level: 80, version: '20.x' },
            { name: 'Express.js', level: 80, version: '4.x' },
            { name: 'MongoDB', level: 70, version: '7.x' },
            { name: 'RESTful APIs', level: 70, version: 'Standard' },
          ].map((skill, index) => (
            <div key={index} className="bg-white border border-gray-400 p-2">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-sm">{skill.name}</span>
                <span className="text-xs text-gray-600">v{skill.version}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-300 border border-gray-500 h-3">
                  <div className="bg-gradient-to-r from-green-400 to-green-600 h-full" style={{ width: `${skill.level}%` }}></div>
                </div>
                <span className="text-xs font-bold">{skill.level}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="bg-gray-100 border-2 border-gray-400 p-4 shadow-[2px_2px_0px_#000,-2px_-2px_0px_#fff]">
      <h3 className="font-bold text-lg mb-3 bg-purple-600 text-white px-2 py-1">Additional Tools & Technologies</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
        {['Git & GitHub', 'Docker', 'AWS (S3, EC2)', 'Socket.io', 'Firebase (BaaS)'].map((tool, index) => (
          <div key={index} className="bg-white border border-gray-400 p-2 text-center">{tool}</div>
        ))}
      </div>
    </div>
  </div>
);

// ProjectsWindow Component
const ProjectsWindow = () => (
  <div className="p-4 h-full overflow-auto">
    <h2 className="text-xl font-bold mb-4 flex items-center">
      <span className="text-2xl mr-2">📁</span>
      My Projects - Portfolio Showcase
    </h2>
    <div className="space-y-4">
      {[
        {
          name: 'Social Media App',
          icon: '🌐',
          tech: 'React, Node.js, MongoDB, Express, Redux, Socket.io, TailwindCSS, MUI',
          description: 'A dynamic social media platform built with the MERN stack, featuring real-time messaging, media sharing, and interactive user interfaces.',
          features: ['Real-Time Messaging', 'Media Sharing', 'User Profiles', 'Responsive Design'],
          status: 'Live Demo Available',
          year: '2025',
          link: 'https://social-network-app-frontend.onrender.com/',
        },
        {
          name: 'TaskTracker App',
          icon: '📋',
          tech: 'React, Node.js, MongoDB, Express, Redux, TailwindCSS, MUI, Chart.js',
          description: 'A restricted employee-only task management application for managing work tasks, tracking statistics, and handling client data with interactive dashboards and data export capabilities.',
          features: ['Task Management', 'Interactive Dashboards', 'Data Export', 'Team Collaboration'],
          status: 'Restricted (Employee-Only)',
          year: '2025',
        },
      ].map((project, index) => (
        <div key={index} className="bg-white border-2 border-gray-400 p-4 shadow-[2px_2px_0px_#000,-2px_-2px_0px_#fff]">
          <div className="flex items-start space-x-4">
            <div className="text-4xl">{project.icon}</div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-blue-700">{project.name}</h3>
                <div className="text-right">
                  <div className="bg-green-100 border border-green-400 px-2 py-1 text-xs font-bold">{project.status}</div>
                  <div className="text-xs text-gray-600 mt-1">{project.year}</div>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-3">{project.description}</p>
              <div className="mb-3">
                <strong className="text-xs text-gray-600">Tech Stack:</strong>
                <div className="bg-gray-100 border border-gray-300 p-2 text-xs mt-1">{project.tech}</div>
              </div>
              <div className="mb-3">
                <strong className="text-xs text-gray-600">Key Features:</strong>
                <div className="flex flex-wrap gap-1 mt-1">
                  {project.features.map((feature, i) => (
                    <span key={i} className="bg-blue-100 border border-blue-300 px-2 py-1 text-xs">{feature}</span>
                  ))}
                </div>
              </div>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm hover:text-blue-800">
                  Visit Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="bg-yellow-100 border-2 border-yellow-400 p-3 mt-4 shadow-[2px_2px_0px_#000,-2px_-2px_0px_#fff]">
      <strong>📎 Note:</strong> All projects include comprehensive documentation, responsive design, modern development practices, and clean, maintainable code. Source code available upon request for public projects.
    </div>
  </div>
);

// ContactWindow Component
const ContactWindow = () => {
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('ammarm.odeh@gmail.com');
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="p-4 h-full overflow-auto">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <span className="text-2xl mr-2">📧</span>
        Contact Information
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gray-100 border-2 border-gray-400 p-4 shadow-[2px_2px_0px_#000,-2px_-2px_0px_#fff]">
          <h3 className="font-bold text-lg mb-3 bg-blue-600 text-white px-2 py-1">📬 Get In Touch</h3>
          <div className="bg-white border border-gray-400 p-4 space-y-3 text-sm">
            <div className="flex items-center space-x-3">
              <span className="text-xl">📧</span>
              <div className="flex items-center space-x-2">
                <div>
                  <strong>Email:</strong><br />
                  ammarm.odeh@gmail.com
                </div>
                <button
                  onClick={copyToClipboard}
                  className="ml-2 p-1  text-white rounded transition-colors duration-200 text-base relative"
                  title={copySuccess ? 'Copied!' : 'Copy email to clipboard'}
                >
                  {copySuccess ? '✅' : <ImCopy size={20} className="text-gray-600" />}
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xl">📱</span>
              <div>
                <strong>Phone:</strong><br />
                +962 770226688
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xl">🌍</span>
              <div>
                <strong>Location:</strong><br />
                Amman, Jordan<br />
                <span className="text-gray-600 text-xs">Willing to relocate if required</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 border-2 border-gray-400 p-4 shadow-[2px_2px_0px_#000,-2px_-2px_0px_#fff]">
          <h3 className="font-bold text-lg mb-3 bg-green-600 text-white px-2 py-1">🔗 Professional Links</h3>
          <div className="bg-white border border-gray-400 p-4 space-y-3 text-sm">
            <div className="flex items-center space-x-3">
              <span className="text-xl">💼</span>
              <div>
                <strong>LinkedIn:</strong><br />
                <a href="https://www.linkedin.com/in/ammar-m-odeh-abbb36107" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  linkedin.com/in/ammar-m-odeh-abbb36107
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xl">🐙</span>
              <div>
                <strong>GitHub:</strong><br />
                <a href="https://github.com/ammarmodeh" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  github.com/ammarmodeh
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 border-2 border-gray-400 p-4 mt-4 shadow-[2px_2px_0px_#000,-2px_-2px_0px_#fff]">
        <h3 className="font-bold text-lg mb-3 bg-purple-600 text-white px-2 py-1">💼 Work Availability</h3>
        <div className="bg-white border border-gray-400 p-4">
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-bold mb-2 text-green-600">✅ Currently Available For:</h4>
              <ul className="space-y-1">
                <li>• Freelance Projects</li>
                <li>• Contract Work</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2 text-blue-600">📊 Response Times:</h4>
              <ul className="space-y-1">
                <li>• Email: Within 24 hours</li>
                <li>• Project quotes: 2-3 days</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main RetroPortfolio Component
const RetroPortfolio = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [openWindows, setOpenWindows] = useState({});
  const [activeWindow, setActiveWindow] = useState(null);
  const [dragData, setDragData] = useState({ isDragging: false, windowId: null, offset: { x: 0, y: 0 } });
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const openWindow = (windowId) => {
    // Detect mobile view (e.g., viewport width <= 640px)
    const isMobile = window.innerWidth <= 640;
    const windowWidth = isMobile ? window.innerWidth : 700;
    const windowHeight = isMobile ? window.innerHeight - 48 : 500; // Subtract taskbar height
    const positionX = isMobile ? 0 : 100 + Object.keys(openWindows).length * 30;
    const positionY = isMobile ? 0 : 50 + Object.keys(openWindows).length * 30;

    const newWindow = {
      id: windowId,
      position: { x: positionX, y: positionY },
      size: { width: windowWidth, height: windowHeight },
      isMaximized: isMobile, // Maximize by default in mobile view
      isMinimized: false,
      zIndex: Object.keys(openWindows).length + 10,
    };
    setOpenWindows((prev) => ({ ...prev, [windowId]: newWindow }));
    setActiveWindow(windowId);
  }

  const handleDesktopItemClick = (item) => {
    if (item.isExternal) {
      window.open(item.link, '_blank');
    } else {
      openWindow(item.id);
    }
  };

  const closeWindow = (windowId) => {
    setOpenWindows((prev) => {
      const newWindows = { ...prev };
      delete newWindows[windowId];
      return newWindows;
    });
    if (activeWindow === windowId) {
      const remainingWindows = Object.keys(openWindows).filter((id) => id !== windowId);
      setActiveWindow(remainingWindows.length > 0 ? remainingWindows[remainingWindows.length - 1] : null);
    }
  };

  const minimizeWindow = (windowId) => {
    setOpenWindows((prev) => ({
      ...prev,
      [windowId]: { ...prev[windowId], isMinimized: true },
    }));
  };

  const restoreWindow = (windowId) => {
    setOpenWindows((prev) => ({
      ...prev,
      [windowId]: { ...prev[windowId], isMinimized: false, isMaximized: false },
    }));
    setActiveWindow(windowId);
  };

  const maximizeWindow = (windowId) => {
    setOpenWindows((prev) => ({
      ...prev,
      [windowId]: {
        ...prev[windowId],
        isMaximized: !prev[windowId].isMaximized,
        isMinimized: false,
      },
    }));
  };

  const bringToFront = (windowId) => {
    if (activeWindow !== windowId) {
      const maxZ = Math.max(...Object.values(openWindows).map((w) => w.zIndex));
      setOpenWindows((prev) => ({
        ...prev,
        [windowId]: { ...prev[windowId], zIndex: maxZ + 1 },
      }));
      setActiveWindow(windowId);
    }
  };

  const handleMouseDown = (e, windowId) => {
    if (e.target.closest('.window-content') || e.target.closest('.window-controls')) return;
    bringToFront(windowId);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragData({
      isDragging: true,
      windowId,
      offset: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
    });
  };

  const handleMouseMove = (e) => {
    if (dragData.isDragging && dragData.windowId) {
      setOpenWindows((prev) => ({
        ...prev,
        [dragData.windowId]: {
          ...prev[dragData.windowId],
          position: {
            x: e.clientX - dragData.offset.x,
            y: e.clientY - dragData.offset.y,
          },
        },
      }));
    }
  };

  const handleMouseUp = () => {
    setDragData({ isDragging: false, windowId: null, offset: { x: 0, y: 0 } });
  };

  useEffect(() => {
    if (dragData.isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragData]);

  const toggleStartMenu = () => {
    setIsStartMenuOpen((prev) => !prev);
  };

  const renderWindowContent = (windowId) => {
    switch (windowId) {
      case 'about':
        return <AboutWindow />;
      case 'skills':
        return <SkillsWindow />;
      case 'projects':
        return <ProjectsWindow />;
      case 'contact':
        return <ContactWindow />;
      default:
        return <div>Content not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 via-cyan-600 to-blue-800 font-mono relative overflow-hidden select-none">
      <Desktop items={desktopItems} onItemClick={handleDesktopItemClick} />
      <StartMenu isOpen={isStartMenuOpen} items={startMenuItems} />
      {Object.entries(openWindows).map(([windowId, windowData]) => {
        const desktopItem = desktopItems.find((item) => item.id === windowId);
        return (
          <Window
            key={windowId}
            windowData={windowData}
            desktopItem={desktopItem}
            isActive={activeWindow === windowId}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            onMaximize={maximizeWindow}
            onMouseDown={handleMouseDown}
            onBringToFront={bringToFront}
            currentTime={currentTime}
            renderContent={renderWindowContent}
          />
        );
      })}
      <Taskbar
        openWindows={openWindows}
        desktopItems={desktopItems}
        activeWindow={activeWindow}
        currentTime={currentTime}
        onToggleStartMenu={toggleStartMenu}
        onRestoreWindow={restoreWindow}
        onBringToFront={bringToFront}
      />
    </div>
  );
};

export default RetroPortfolio;