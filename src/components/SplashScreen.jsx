import React, { useState, useEffect, useRef } from 'react';

function SplashScreen({ showEnterButton = true, onEnter, isEntered = false }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING QUANTUM CORE...');
  const [isLoaded, setIsLoaded] = useState(false);
  const [fadeAway, setFadeAway] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  // Mouse tilt tracking states
  const [mouse, setMouse] = useState({ rx: 0, ry: 0, hovered: false });
  const [globalCursor, setGlobalCursor] = useState({ x: 0, y: 0 });

  const logoRef = useRef(null);

  // 1. Loading Ticker Simulation
  useEffect(() => {
    // If already entered, set progress to 100 instantly
    if (isEntered) {
      setProgress(100);
      setIsLoaded(true);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoaded(true);
          return 100;
        }

        // Variable increments for authentic platform loading feel
        const increment = Math.floor(Math.random() * 6) + 4;
        const nextProgress = Math.min(prev + increment, 100);

        if (nextProgress < 25) {
          setStatusText('INITIALIZING PERFORMANCE CORE...');
        } else if (nextProgress < 50) {
          setStatusText('SYNCHRONIZING VECTOR PIPELINES...');
        } else if (nextProgress < 75) {
          setStatusText('LOADING CREATIVE INTELLIGENCE...');
        } else if (nextProgress < 95) {
          setStatusText('STABILIZING HOLOGRAPHIC CHANNELS...');
        } else {
          setStatusText('SYSTEM ACTIVE // READY FOR PRODUCTION.');
        }

        return nextProgress;
      });
    }, 90);

    return () => clearInterval(interval);
  }, [isEntered]);

  // 2. Global Cursor Spotlight Tracking
  useEffect(() => {
    if (isEntered) return; // Disable cursor spotlight in header mode
    const trackCursor = (e) => {
      setGlobalCursor({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', trackCursor);
    return () => window.removeEventListener('mousemove', trackCursor);
  }, [isEntered]);

  // 3. Periodic Idle Glitch Trigger Loop
  useEffect(() => {
    if (!isLoaded) return;
    
    const triggerGlitchLoop = () => {
      // Trigger a brief glitch every 4.5 seconds on idle
      const timeout = setTimeout(() => {
        setIsGlitching(true);
        setTimeout(() => {
          setIsGlitching(false);
          triggerGlitchLoop();
        }, 350); // Glitch duration
      }, Math.random() * 2000 + 3500);

      return timeout;
    };

    const glitchTimeout = triggerGlitchLoop();
    return () => clearTimeout(glitchTimeout);
  }, [isLoaded]);

  // 4. Mouse Move tilt calculator for 3D Hologram Parallax
  const handleMouseMove = (e) => {
    if (!isLoaded) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Coordinates relative to the center of the logo card
    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;
    
    // Smooth tilt multiplier (max rotation 22 degrees)
    const rx = -(y / (height / 2)) * 22;
    const ry = (x / (width / 2)) * 22;
    
    setMouse({ rx, ry, hovered: true });
  };

  const handleMouseEnter = () => {
    if (!isLoaded) return;
    setMouse((prev) => ({ ...prev, hovered: true }));
  };

  const handleMouseLeave = () => {
    // Return smoothly to center on mouse leave
    setMouse({ rx: 0, ry: 0, hovered: false });
    setIsGlitching(false);
  };

  const handleEnterClick = () => {
    if (onEnter) {
      onEnter();
    } else {
      setFadeAway(true);
    }
  };

  // Math for self-drawing SVG stroke animation
  const pathLength = 320; 
  const strokeDashoffset = pathLength * (1 - progress / 100);

  return (
    <div 
      className={`splash-container ${isEntered ? 'entered' : ''} ${fadeAway ? 'fade-out' : ''}`}
      style={{
        background: isEntered
          ? 'transparent'
          : `radial-gradient(circle at ${globalCursor.x}px ${globalCursor.y}px, rgba(16, 12, 60, 0.45) 0%, rgba(3, 2, 18, 0.99) 70%)`
      }}
    >
      {/* Immersive Volumetric lighting grid overlay */}
      <div className="cyber-grid" />

      <style>{`
        .splash-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          transition: background 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      height 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      backdrop-filter 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      opacity 0.6s ease,
                      margin 0.8s;
          opacity: 1;
          visibility: visible;
        }
        
        .splash-container.fade-out {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        /* Collapsed Header Mode once entered */
        .splash-container.entered {
          position: relative;
          width: 100%;
          height: 200px; /* Collapsed height */
          background: transparent !important;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          z-index: 10;
        }

        /* Ambient Scanning Grid Overlay */
        .cyber-grid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: 40px 40px;
          background-image: 
            linear-gradient(to right, rgba(20, 184, 166, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(20, 184, 166, 0.02) 1px, transparent 1px);
          pointer-events: none;
          z-index: 1;
          transition: opacity 0.8s ease;
        }

        .splash-container.entered .cyber-grid {
          opacity: 0.15;
        }
        
        /* Interactive 3D Card Container */
        .hologram-stage {
          position: relative;
          z-index: 5;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px;
          border-radius: 24px;
          perspective: 1000px; /* Essential for 3D depth tilt */
          cursor: pointer;
          margin-bottom: 50px;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      margin 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      padding 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .splash-container.entered .hologram-stage {
          transform: scale(0.58); /* Scaled down beautifully as a header */
          margin-top: 10px;
          margin-bottom: 0;
          padding: 10px;
        }

        .logo-wrapper-3d {
          position: relative;
          width: 160px;
          height: 120px;
          transform-style: preserve-3d;
          transition: transform ${mouse.hovered ? '0.08s ease-out' : '0.6s cubic-bezier(0.16, 1, 0.3, 1)'};
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        /* Depth-Layered SVG Components (Hologram Sandwich) */
        .hologram-layer {
          position: absolute;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          pointer-events: none;
          transition: transform ${mouse.hovered ? '0.08s ease-out' : '0.6s cubic-bezier(0.16, 1, 0.3, 1)'}, 
                      opacity 0.3s ease;
        }

        /* LAYER 1: Deep Back Glow / Shadow */
        .layer-shadow {
          opacity: 0.7;
          filter: blur(15px);
        }

        /* LAYER 2: Vibrant Middle Neon Gradient */
        .layer-gradient {
          opacity: 0.92;
        }

        /* LAYER 3: White High-Voltage Core */
        .layer-core {
          opacity: 0.98;
        }

        /* Dynamic Parallax Offsets on Hover */
        .hologram-stage:hover .layer-shadow {
          transform: translate3d(${-mouse.ry * 0.4}px, ${mouse.rx * 0.4}px, -20px) scale(0.92);
        }

        .hologram-stage:hover .layer-gradient {
          transform: translate3d(${mouse.ry * 0.25}px, ${-mouse.rx * 0.25}px, 12px);
        }

        .hologram-stage:hover .layer-core {
          transform: translate3d(${mouse.ry * 0.75}px, ${-mouse.rx * 0.75}px, 28px);
        }

        /* Wordmark Typography Styling */
        .brand-text-display {
          margin-top: 25px;
          font-family: "Plus Jakarta Sans", "Outfit", "Inter", sans-serif;
          font-size: 15px;
          font-weight: 800;
          letter-spacing: 0.6em;
          color: #ffffff;
          text-indent: 0.6em;
          text-shadow: 0 0 10px rgba(20, 184, 166, 0.35);
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .hologram-stage:hover .brand-text-display {
          transform: translate3d(${mouse.ry * 0.5}px, ${-mouse.rx * 0.5}px, 15px);
          text-shadow: 0 0 15px rgba(139, 92, 246, 0.55);
        }

        /* HUD Status Section */
        .hud-panel {
          position: relative;
          z-index: 5;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 320px;
          height: 90px;
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .splash-container.entered .hud-panel {
          opacity: 0;
          pointer-events: none;
          transform: translateY(30px);
        }
        
        .progress-bar-bg {
          width: 100%;
          height: 2px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          margin-bottom: 18px;
        }
        
        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #14b8a6 0%, #ec4899 50%, #8b5cf6 100%);
          box-shadow: 0 0 8px rgba(139, 92, 246, 0.8);
          transition: width 0.1s linear;
        }
        
        .hud-row {
          display: flex;
          justify-content: space-between;
          width: 100%;
          font-family: monospace;
          font-size: 9px;
          color: #64748b;
          letter-spacing: 0.15em;
        }
        
        .status-text {
          color: #14b8a6;
          text-shadow: 0 0 4px rgba(20, 184, 166, 0.15);
        }
        
        .percentage-text {
          color: #f1f5f9;
          font-weight: bold;
        }
        
        .enter-btn {
          background: rgba(5, 4, 16, 0.25);
          border: 1px solid rgba(20, 184, 166, 0.3);
          color: #ffffff;
          padding: 14px 40px;
          font-family: "Plus Jakarta Sans", "Outfit", "Inter", sans-serif;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.35em;
          text-indent: 0.35em;
          border-radius: 30px;
          cursor: pointer;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 0 15px rgba(20, 184, 166, 0.12);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          animation: fade-in-up 0.6s forwards;
          outline: none;
        }
        
        .enter-btn:hover {
          background: rgba(20, 184, 166, 0.1);
          border-color: rgba(217, 70, 239, 0.6);
          box-shadow: 0 0 25px rgba(217, 70, 239, 0.3), inset 0 0 8px rgba(217, 70, 239, 0.15);
          transform: translateY(-2px);
        }
        
        .enter-btn:active {
          transform: translateY(0) scale(0.98);
        }

        .replay-btn {
          background: rgba(5, 4, 16, 0.15);
          border: 1px solid rgba(139, 92, 246, 0.4);
          color: #a5b4fc;
          padding: 14px 28px;
          font-family: "Plus Jakarta Sans", "Outfit", "Inter", sans-serif;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.35em;
          text-indent: 0.35em;
          border-radius: 30px;
          cursor: pointer;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 0 15px rgba(139, 92, 246, 0.08);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          animation: fade-in-up 0.6s forwards;
          outline: none;
        }
        
        .replay-btn:hover {
          background: rgba(139, 92, 246, 0.08);
          border-color: rgba(20, 184, 166, 0.6);
          box-shadow: 0 0 25px rgba(20, 184, 166, 0.2), inset 0 0 8px rgba(20, 184, 166, 0.1);
          color: #ffffff;
          transform: translateY(-2px);
        }
        
        .replay-btn:active {
          transform: translateY(0) scale(0.98);
        }

        /* --- COMPUTATIONAL GLITCH EFFECT KEYFRAMES --- */
        .glitch-active {
          animation: cyber-shake 0.3s infinite linear alternate-reverse;
        }

        .hologram-stage:hover .logo-wrapper-3d {
          animation: cyber-micro-glitch 4.5s infinite linear;
        }

        @keyframes cyber-shake {
          0% {
            transform: translate(1px, -1px) skew(-2deg) rotateX(${mouse.rx}deg) rotateY(${mouse.ry}deg);
            filter: hue-rotate(90deg) saturate(1.5);
          }
          50% {
            transform: translate(-2px, 2px) skew(1deg) rotateX(${mouse.rx}deg) rotateY(${mouse.ry}deg);
          }
          100% {
            transform: translate(2px, 1px) skew(-1deg) rotateX(${mouse.rx}deg) rotateY(${mouse.ry}deg);
            filter: hue-rotate(270deg);
          }
        }

        @keyframes cyber-micro-glitch {
          0%, 95%, 98%, 100% {
            filter: none;
          }
          96% {
            transform: translate(3px, -2px) skew(-3deg) rotateX(${mouse.rx}deg) rotateY(${mouse.ry}deg);
            filter: hue-rotate(180deg) saturate(1.8);
          }
          97% {
            transform: translate(-3px, 3px) skew(2deg) rotateX(${mouse.rx}deg) rotateY(${mouse.ry}deg);
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* A. Dynamic Interactive Hologram Stage */}
      <div 
        className="hologram-stage"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* 3D preserved wrapper supporting 3D hover rotation */}
        <div 
          className={`logo-wrapper-3d ${isGlitching ? 'glitch-active' : ''}`}
          style={{
            transform: `rotateX(${mouse.rx}deg) rotateY(${mouse.ry}deg)`
          }}
        >
          {/* Defs shared across SVG layers */}
          <svg style={{ position: 'absolute', width: 0, height: 0 }}>
            <defs>
              <linearGradient id="hologram-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#14b8a6" />
                <stop offset="50%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>

          {/* LAYER 1: Deep Back Glow / Shadow */}
          <div className="hologram-layer layer-shadow">
            <svg viewBox="0 0 80 60" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M 32 23 C 27 16, 21 16, 21 23 C 21 28, 32 28, 32 33 C 32 38, 21 38, 21 43 C 21 46, 28 46, 32 43 L 38 14 L 48 36 L 58 14 L 58 43" 
                fill="none" 
                stroke="url(#hologram-grad)" 
                strokeWidth="10" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                strokeDasharray={pathLength}
                strokeDashoffset={strokeDashoffset}
                style={{ transition: 'stroke-dashoffset 0.1s linear' }}
              />
            </svg>
          </div>

          {/* LAYER 2: Vibrant Middle Gradient Stroke */}
          <div className="hologram-layer layer-gradient">
            <svg viewBox="0 0 80 60" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M 32 23 C 27 16, 21 16, 21 23 C 21 28, 32 28, 32 33 C 32 38, 21 38, 21 43 C 21 46, 28 46, 32 43 L 38 14 L 48 36 L 58 14 L 58 43" 
                fill="none" 
                stroke="url(#hologram-grad)" 
                strokeWidth="7" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                strokeDasharray={pathLength}
                strokeDashoffset={strokeDashoffset}
                style={{ transition: 'stroke-dashoffset 0.1s linear' }}
              />
            </svg>
          </div>

          {/* LAYER 3: White High-Voltage Inner Core */}
          <div className="hologram-layer layer-core">
            <svg viewBox="0 0 80 60" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M 32 23 C 27 16, 21 16, 21 23 C 21 28, 32 28, 32 33 C 32 38, 21 38, 21 43 C 21 46, 28 46, 32 43 L 38 14 L 48 36 L 58 14 L 58 43" 
                fill="none" 
                stroke="#ffffff" 
                strokeWidth="2.2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                opacity="0.9"
                strokeDasharray={pathLength}
                strokeDashoffset={strokeDashoffset}
                style={{ transition: 'stroke-dashoffset 0.1s linear' }}
              />
            </svg>
          </div>
        </div>

        {/* Floating holographic brand text */}
        <div className="brand-text-display">SUPERMAYA</div>
      </div>

      {/* B. HUD System Readiness Ticker / Portal Entrance */}
      <div className="hud-panel">
        {!isLoaded || !showEnterButton ? (
          <>
            {/* Ambient Loading Bar */}
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
            </div>
            {/* Realtime telemetry rows */}
            <div className="hud-row">
              <span className="status-text">{statusText}</span>
              <span className="percentage-text">{progress}%</span>
            </div>
          </>
        ) : (
          /* Quantum entrance node & Replay button */
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <button className="enter-btn" onClick={handleEnterClick}>
              ENTER PORTAL
            </button>
            <button 
              className="replay-btn" 
              onClick={() => {
                setProgress(0);
                setIsLoaded(false);
                setStatusText('RE-INITIALIZING QUANTUM CORE...');
              }}
            >
              REPLAY
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SplashScreen;
