import React, { useState } from 'react';

function BrandShowcase({ onReturnHome }) {
  // Sandbox States for Logo Testing
  const [strokeWidth, setStrokeWidth] = useState(6);
  const [glowIntensity, setGlowIntensity] = useState(15);
  const [showGrid, setShowGrid] = useState(true);
  const [colorTheme, setColorTheme] = useState('quantum'); // quantum, cyberpunk, fire, arctic
  const [copied, setCopied] = useState(false);

  // Experimental Wordmark Engine States
  const [wordmarkKerning, setWordmarkKerning] = useState(3); // Letter spacing kerning
  const [dotPulseSpeed, setDotPulseSpeed] = useState(1.6);   // Red dot pulse speed (seconds)

  // Gradient definitions based on theme
  const themes = {
    quantum: {
      stop1: '#14b8a6', // Teal
      stop2: '#ec4899', // Pink
      stop3: '#8b5cf6', // Violet
      name: 'QUANTUM NEON'
    },
    cyberpunk: {
      stop1: '#39ff14', // Lime Green
      stop2: '#00f2fe', // Cyber Cyan
      stop3: '#0066ff', // Meta Blue
      name: 'CYBERPUNK MATRIX'
    },
    fire: {
      stop1: '#f97316', // Orange
      stop2: '#ef4444', // Red
      stop3: '#db2777', // Pink
      name: 'EMBER FLARE'
    },
    arctic: {
      stop1: '#00f2fe', // Cyan
      stop2: '#3b82f6', // Ice Blue
      stop3: '#1d4ed8', // Deep Cobalt
      name: 'GLACIER RIFT'
    }
  };

  const activeTheme = themes[colorTheme] || themes.quantum;

  // SVG representation of the monogram path
  const svgPathD = "M 32 23 C 27 16, 21 16, 21 23 C 21 28, 32 28, 32 33 C 32 38, 21 38, 21 43 C 21 46, 28 46, 32 43 L 38 14 L 48 36 L 58 14 L 58 43";

  const getSVGMarkup = () => {
    return `<svg viewBox="0 0 80 60" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="custom-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${activeTheme.stop1}" />
      <stop offset="50%" stop-color="${activeTheme.stop2}" />
      <stop offset="100%" stop-color="${activeTheme.stop3}" />
    </linearGradient>
    <filter id="custom-glow">
      <feGaussianBlur stdDeviation="${glowIntensity / 3}" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <path d="${svgPathD}" fill="none" stroke="url(#custom-logo-grad)" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" filter="url(#custom-glow)" />
  <path d="${svgPathD}" fill="none" stroke="#ffffff" stroke-width="${Math.max(1, strokeWidth * 0.3)}" stroke-linecap="round" stroke-linejoin="round" opacity="0.9" />
</svg>`;
  };

  const handleCopySVG = () => {
    navigator.clipboard.writeText(getSVGMarkup());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="brand-showcase-container">
      <style>{`
        .brand-showcase-container {
          min-height: 100vh;
          width: 100%;
          padding: 80px 40px 120px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 10;
          font-family: "Plus Jakarta Sans", "Outfit", "Inter", sans-serif;
          color: #f8fafc;
        }

        .header-section {
          text-align: center;
          margin-bottom: 50px;
          max-width: 800px;
        }

        .category-badge {
          font-family: monospace;
          font-size: 9px;
          color: #14b8a6;
          letter-spacing: 0.25em;
          border: 1px solid rgba(20, 184, 166, 0.3);
          padding: 6px 16px;
          border-radius: 20px;
          background: rgba(20, 184, 166, 0.05);
          display: inline-block;
          margin-bottom: 20px;
          text-shadow: 0 0 6px rgba(20, 184, 166, 0.2);
        }

        .brand-title {
          font-size: 36px;
          font-weight: 800;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #ffffff 30%, #a5b4fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 12px;
        }

        .brand-subtitle {
          font-size: 13px;
          color: #94a3b8;
          letter-spacing: 0.05em;
          line-height: 1.6;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 35px;
          width: 100%;
          max-width: 1000px;
          align-items: start;
        }

        @media (max-width: 968px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Glassmorphic Panel Styles - Sheer by default, solid on hover */
        .glass-card {
          background: rgba(5, 4, 16, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 30px;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
          position: relative;
          overflow: hidden;
          transition: background 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                      backdrop-filter 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .glass-card:hover {
          background: rgba(10, 8, 32, 0.65);
          border-color: rgba(20, 184, 166, 0.25);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(20, 184, 166, 0.05);
          transform: translateY(-2px);
        }

        /* Blueprint Canvas Display */
        .blueprint-canvas {
          width: 100%;
          aspect-ratio: 4/3;
          background: rgba(3, 2, 18, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 12px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          margin-bottom: 25px;
          transition: background 0.5s ease;
        }

        .glass-card:hover .blueprint-canvas {
          background: rgba(3, 2, 18, 0.75);
        }

        /* Grid lines overlay */
        .blueprint-grid-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: 20px 20px;
          background-image: 
            linear-gradient(to right, rgba(20, 184, 166, 0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(20, 184, 166, 0.07) 1px, transparent 1px);
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .blueprint-grid-overlay::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 1px;
          background: rgba(20, 184, 166, 0.25);
        }

        .blueprint-grid-overlay::after {
          content: '';
          position: absolute;
          width: 1px;
          height: 100%;
          background: rgba(20, 184, 166, 0.25);
        }

        .blueprint-annotations {
          position: absolute;
          top: 15px;
          left: 15px;
          font-family: monospace;
          font-size: 8px;
          color: rgba(20, 184, 166, 0.55);
          line-height: 1.6;
          pointer-events: none;
        }

        .blueprint-annotations.right {
          left: auto;
          right: 15px;
          text-align: right;
        }

        .blueprint-compass {
          position: absolute;
          width: 130px;
          height: 130px;
          border: 1px dashed rgba(20, 184, 166, 0.15);
          border-radius: 50%;
          pointer-events: none;
        }

        .logo-svg-display {
          width: 55%;
          height: 55%;
          z-index: 2;
        }

        /* Controls styling */
        .controls-panel h3 {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 20px;
          letter-spacing: -0.01em;
          color: #f1f5f9;
        }

        .control-group {
          margin-bottom: 20px;
        }

        .control-label-row {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          font-family: monospace;
          color: #94a3b8;
          margin-bottom: 8px;
          letter-spacing: 0.05em;
        }

        .control-slider {
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          outline: none;
          -webkit-appearance: none;
          cursor: pointer;
        }

        .control-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #14b8a6;
          box-shadow: 0 0 8px #14b8a6;
          transition: transform 0.1s;
        }

        .control-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }

        .theme-selector {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          margin-top: 10px;
        }

        .theme-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 10px 4px;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .theme-btn:hover {
          background: rgba(255, 255, 255, 0.08);
        }

        .theme-btn.active {
          background: rgba(20, 184, 166, 0.08);
          border-color: #14b8a6;
        }

        .theme-dot-row {
          display: flex;
          gap: 3px;
          margin-bottom: 6px;
        }

        .theme-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .theme-name {
          font-size: 8px;
          font-family: monospace;
          color: #94a3b8;
          letter-spacing: 0.05em;
        }

        .theme-btn.active .theme-name {
          color: #14b8a6;
          font-weight: bold;
        }

        .toggle-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 25px;
          padding-top: 15px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .toggle-label {
          font-size: 12px;
          color: #e2e8f0;
          font-weight: 600;
        }

        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 38px;
          height: 20px;
        }

        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(255, 255, 255, 0.1);
          transition: .3s;
          border-radius: 20px;
        }

        .toggle-slider:before {
          position: absolute;
          content: "";
          height: 14px;
          width: 14px;
          left: 3px;
          bottom: 3px;
          background-color: #94a3b8;
          transition: .3s;
          border-radius: 50%;
        }

        input:checked + .toggle-slider {
          background-color: #14b8a6;
        }

        input:checked + .toggle-slider:before {
          transform: translateX(18px);
          background-color: #ffffff;
        }

        /* Brand Elements Panel */
        .brand-elements-panel {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .color-palette-section h3, .typography-section h3 {
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 15px;
          color: #f1f5f9;
          letter-spacing: -0.01em;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 8px;
        }

        .color-swatch-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }

        .swatch-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 12px;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: transform 0.3s;
        }

        .swatch-card:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.04);
        }

        .swatch-color-preview {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(255,255,255,0.05);
        }

        .swatch-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .swatch-name {
          font-size: 11px;
          font-weight: 700;
          color: #e2e8f0;
        }

        .swatch-hex {
          font-family: monospace;
          font-size: 9px;
          color: #64748b;
        }

        .typography-scale {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .typo-row {
          padding-bottom: 12px;
          border-bottom: 1px dashed rgba(255, 255, 255, 0.04);
        }

        .typo-label {
          font-family: monospace;
          font-size: 8px;
          color: #64748b;
          margin-bottom: 4px;
          letter-spacing: 0.08em;
        }

        .typo-preview-h1 {
          font-size: 20px;
          font-weight: 800;
          color: #ffffff;
        }
        
        .typo-preview-body {
          font-size: 12px;
          color: #94a3b8;
          line-height: 1.5;
        }

        .typo-preview-mono {
          font-family: monospace;
          font-size: 10px;
          color: #14b8a6;
        }

        /* Action Buttons */
        .actions-panel {
          display: flex;
          gap: 12px;
          margin-top: 5px;
        }

        .action-btn {
          flex: 1;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #e2e8f0;
          border-radius: 10px;
          padding: 12px 16px;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .action-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .action-btn.primary {
          background: rgba(20, 184, 166, 0.1);
          border-color: rgba(20, 184, 166, 0.3);
          color: #14b8a6;
        }

        .action-btn.primary:hover {
          background: rgba(20, 184, 166, 0.16);
          border-color: rgba(20, 184, 166, 0.5);
          box-shadow: 0 0 12px rgba(20, 184, 166, 0.25);
        }
        
        .home-floating-btn {
          position: fixed;
          bottom: 25px;
          right: 25px;
          z-index: 1000;
          background: rgba(15, 12, 45, 0.6);
          border: 1px solid rgba(20, 184, 166, 0.4);
          color: #14b8a6;
          padding: 10px 20px;
          font-size: 9px;
          font-weight: 800;
          font-family: monospace;
          letter-spacing: 0.15em;
          border-radius: 20px;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(20, 184, 166, 0.1);
          backdrop-filter: blur(8px);
          transition: all 0.3s ease;
        }

        .home-floating-btn:hover {
          border-color: rgba(139, 92, 246, 0.7);
          box-shadow: 0 0 15px rgba(139, 92, 246, 0.3);
          color: #c084fc;
        }

        /* Official Brand Wordmark Card - Sheer by default, solid on hover */
        .wordmark-showcase-card {
          width: 100%;
          max-width: 1000px;
          margin-bottom: 35px;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(5, 4, 16, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 35px;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
          position: relative;
          overflow: hidden;
          transition: background 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                      backdrop-filter 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .wordmark-showcase-card:hover {
          background: rgba(10, 8, 32, 0.65);
          border-color: rgba(20, 184, 166, 0.25);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(20, 184, 166, 0.05);
          transform: translateY(-2px);
        }

        .wordmark-header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          padding-bottom: 15px;
        }

        .wordmark-header h3 {
          font-size: 14px;
          font-weight: 700;
          color: #f1f5f9;
          letter-spacing: 0.05em;
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 0;
        }

        .wordmark-header-badge {
          font-family: monospace;
          font-size: 8px;
          color: #8b5cf6;
          border: 1px solid rgba(139, 92, 246, 0.3);
          padding: 3px 8px;
          border-radius: 10px;
          background: rgba(139, 92, 246, 0.05);
          letter-spacing: 0.1em;
        }

        .wordmark-display-area {
          width: 100%;
          background: rgba(3, 2, 18, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 12px;
          padding: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          margin-bottom: 25px;
          position: relative;
          transition: background 0.5s ease;
        }

        .wordmark-showcase-card:hover .wordmark-display-area {
          background: rgba(3, 2, 18, 0.8);
        }

        .wordmark-svg {
          width: 100%;
          max-width: 450px;
          height: auto;
        }

        .wordmark-info-text {
          font-size: 12px;
          color: #94a3b8;
          line-height: 1.75;
          text-align: center;
          max-width: 780px;
          margin-bottom: 15px;
        }

        .wordmark-spec-pills {
          display: flex;
          gap: 10px;
          margin-top: 15px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .spec-pill {
          font-family: monospace;
          font-size: 8px;
          color: #64748b;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 4px 10px;
          border-radius: 6px;
          letter-spacing: 0.05em;
        }

        .spec-pill span {
          color: #14b8a6;
          font-weight: bold;
        }

        /* Red Dot Pulse Animation */
        @keyframes red-dot-pulse {
          0%, 100% {
            opacity: 0.35;
            filter: drop-shadow(0 0 2px #ef4444);
          }
          50% {
            opacity: 1.0;
            filter: drop-shadow(0 0 8px #ef4444);
          }
        }
      `}</style>

      {/* A. Header Section */}
      <div className="header-section">
        <span className="category-badge">SUPER MAYA // VECTOR LAB</span>
        <h1 className="brand-title">Brand Identity & Logo Blueprint</h1>
        <p className="brand-subtitle">
          Testing and custom-drafting the geometric vector guidelines of the Super Maya AI identity system. 
          Use the blueprint board below to adjust structural strokes, glow physics, and neon values in real time.
        </p>
      </div>

      {/* A.5 Official Brand Wordmark Section */}
      <div className="wordmark-showcase-card">
        <div className="wordmark-header">
          <h3>
            OFFICIAL BRAND WORDMARK
            <span className="wordmark-header-badge">SM_WORDMARK_SPEC</span>
          </h3>
          <span style={{ fontFamily: 'monospace', fontSize: '8px', color: '#64748b', letterSpacing: '0.1em' }}>STATUS: VERIFIED // ACTIVE</span>
        </div>

        <div className="wordmark-display-area">
          {/* No blueprint grids, no crosshairs. A clean, premium floating wordmark as requested. */}
          
          {/* Glowing Vector Wordmark */}
          <svg 
            className="wordmark-svg" 
            viewBox="0 0 210 60" 
            xmlns="http://www.w3.org/2000/svg"
            style={{
              filter: `drop-shadow(0 0 ${glowIntensity / 1.6}px ${activeTheme.stop2}3a)`
            }}
          >
            <defs>
              <linearGradient id="wordmark-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={activeTheme.stop1} />
                <stop offset="50%" stopColor={activeTheme.stop2} />
                <stop offset="100%" stopColor={activeTheme.stop3} />
              </linearGradient>
            </defs>

            {/* Custom "S" glyph (Curved Lowercase Logo - dominant size) */}
            <g transform="translate(8, 8) scale(0.85)">
              {/* Outer Glow */}
              <path 
                d="M 32 23 C 27 16, 21 16, 21 23 C 21 28, 32 28, 32 33 C 32 38, 21 38, 21 43 C 21 46, 28 46, 32 43" 
                fill="none" 
                stroke="url(#wordmark-logo-grad)" 
                strokeWidth={strokeWidth} 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              {/* Inner Core */}
              <path 
                d="M 32 23 C 27 16, 21 16, 21 23 C 21 28, 32 28, 32 33 C 32 38, 21 38, 21 43 C 21 46, 28 46, 32 43" 
                fill="none" 
                stroke="#ffffff" 
                strokeWidth={Math.max(1.2, strokeWidth * 0.28)} 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                opacity="0.9" 
              />
            </g>

            {/* Typographic "UPER" in reduced size, sharing the same flat baseline at y = 44.5 */}
            <text 
              x={35 + wordmarkKerning} 
              y="44.5" 
              fontFamily="'Plus Jakarta Sans', 'Outfit', 'Inter', sans-serif" 
              fontSize="20" 
              fontWeight="800" 
              fill="#f8fafc" 
              letterSpacing="0.04em"
            >
              UPER
            </text>

            {/* Custom "M" glyph (Sharp Uppercase Logo - dominant size) */}
            <g transform={`translate(${58 + wordmarkKerning}, 8) scale(0.85)`}>
              {/* Outer Glow */}
              <path 
                d="M 38 14 L 48 36 L 58 14 L 58 43" 
                fill="none" 
                stroke="url(#wordmark-logo-grad)" 
                strokeWidth={strokeWidth} 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              {/* Inner Core */}
              <path 
                d="M 38 14 L 48 36 L 58 14 L 58 43" 
                fill="none" 
                stroke="#ffffff" 
                strokeWidth={Math.max(1.2, strokeWidth * 0.28)} 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                opacity="0.9" 
              />
            </g>

            {/* Typographic "AYA" in reduced size, sharing the same flat baseline at y = 44.5 */}
            <text 
              x={111 + wordmarkKerning * 1.5} 
              y="44.5" 
              fontFamily="'Plus Jakarta Sans', 'Outfit', 'Inter', sans-serif" 
              fontSize="20" 
              fontWeight="800" 
              fill="#f8fafc" 
              letterSpacing="0.04em"
            >
              AYA
            </text>

            {/* Solid, non-blinking small blue dot aligned at cy = 40 */}
            <circle 
              cx={160 + wordmarkKerning * 1.8} 
              cy="40" 
              r="2" 
              fill="#2563eb" 
              style={{
                filter: 'drop-shadow(0 0 2px #2563eb)'
              }}
            />

            {/* Clean lowercase "ai" in a subtle 13px size, sharing the same baseline at y = 44.5 */}
            <text 
              x={166 + wordmarkKerning * 1.8} 
              y="44.5" 
              fontFamily="'Plus Jakarta Sans', 'Outfit', 'Inter', sans-serif" 
              fontSize="13" 
              fontWeight="800" 
              fill="#14b8a6" 
              letterSpacing="0.04em"
              style={{
                textShadow: '0 0 4px rgba(20, 184, 166, 0.25)'
              }}
            >
              ai
            </text>
          </svg>
        </div>

        <p className="wordmark-info-text">
          The official <strong>SUPERMAYA</strong> wordmark. It features bold, authoritative all-caps lettering with the custom vector initials integrated seamlessly. 
          The capital <strong>S</strong> is rendered with our organic creative curves, and the capital <strong>M</strong> is rendered with our sharp engineering strokes. 
          The badge has been refined to a glowing <strong>live red node dot</strong> followed by a clean, un-boxed <strong>AI</strong> suffix, representing a high-velocity automated advertising brain.
        </p>

        <div className="wordmark-spec-pills">
          <div className="spec-pill">CORE TYPEFACE: <span>Plus Jakarta Sans (Geometric)</span></div>
          <div className="spec-pill">CASE STYLE: <span>All Capitals (Bold / Modern)</span></div>
          <div className="spec-pill">AI CONNECTOR: <span>Active System Node (Glowing Red Dot)</span></div>
          <div className="spec-pill">SANDBOX ENGINE: <span>Interactive Kerning & Node Pulse</span></div>
        </div>
      </div>

      {/* B. Two-Column Workspace */}
      <div className="dashboard-grid">
        
        {/* Left Column: Interactive Blueprint Sandbox */}
        <div className="glass-card">
          {/* Blueprint Drawing Board */}
          <div className="blueprint-canvas">
            {/* Grid Overlay */}
            {showGrid && (
              <>
                <div className="blueprint-grid-overlay" />
                <div className="blueprint-compass" />
                
                {/* Annotations */}
                <div className="blueprint-annotations">
                  <div>SYS_REF: SM-GRID-V1</div>
                  <div>SCALE: 1.000 / INTERACTIVE</div>
                  <div>STROKE_W: {strokeWidth}px</div>
                  <div>GLOW_DEV: {glowIntensity}px</div>
                </div>
                
                <div className="blueprint-annotations right">
                  <div>THEME: {activeTheme.name}</div>
                  <div>VECTOR: M_RIBBON_SPLINE</div>
                  <div>SEGMENTS: 5_VERTEX_PATH</div>
                  <div>BOUNDS: 80 x 60 UNIT</div>
                </div>
              </>
            )}
            
            {/* Logo SVG Render */}
            <svg 
              className="logo-svg-display" 
              viewBox="0 0 80 60" 
              xmlns="http://www.w3.org/2000/svg"
              style={{
                filter: `drop-shadow(0 0 ${glowIntensity}px ${activeTheme.stop2})`
              }}
            >
              <defs>
                <linearGradient id="blueprint-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={activeTheme.stop1} />
                  <stop offset="50%" stopColor={activeTheme.stop2} />
                  <stop offset="100%" stopColor={activeTheme.stop3} />
                </linearGradient>
              </defs>
              
              {/* Thick Glowing Base */}
              <path 
                d={svgPathD} 
                fill="none" 
                stroke="url(#blueprint-logo-grad)" 
                strokeWidth={strokeWidth} 
                strokeLinecap="round" 
                strokeLinejoin="round"
                transition="stroke-width 0.1s"
              />
              
              {/* Thin White Neon Core */}
              <path 
                d={svgPathD} 
                fill="none" 
                stroke="#ffffff" 
                strokeWidth={Math.max(1.2, strokeWidth * 0.28)} 
                strokeLinecap="round" 
                strokeLinejoin="round"
                opacity="0.9"
              />
            </svg>
          </div>

          {/* Sandbox Control Sliders */}
          <div className="controls-panel">
            <h3>VECTOR CONTROLS</h3>
            
            {/* Slider 1: Stroke Width */}
            <div className="control-group">
              <div className="control-label-row">
                <span>STROKE THICKNESS</span>
                <span>{strokeWidth}px</span>
              </div>
              <input 
                type="range" 
                min="2" 
                max="12" 
                value={strokeWidth} 
                onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
                className="control-slider"
              />
            </div>

            {/* Slider 2: Glow Intensity */}
            <div className="control-group">
              <div className="control-label-row">
                <span>NEON GLOW stdDev</span>
                <span>{glowIntensity}px</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="25" 
                value={glowIntensity} 
                onChange={(e) => setGlowIntensity(parseInt(e.target.value))}
                className="control-slider"
              />
            </div>

            {/* Selector: Color Theme */}
            <div className="control-group">
              <div className="control-label-row">
                <span>COLOR GRADIENT THEME</span>
                <span>{activeTheme.name}</span>
              </div>
              <div className="theme-selector">
                {Object.keys(themes).map((key) => (
                  <button 
                    key={key} 
                    onClick={() => setColorTheme(key)}
                    className={`theme-btn ${colorTheme === key ? 'active' : ''}`}
                  >
                    <div className="theme-dot-row">
                      <div className="theme-dot" style={{ backgroundColor: themes[key].stop1 }} />
                      <div className="theme-dot" style={{ backgroundColor: themes[key].stop2 }} />
                      <div className="theme-dot" style={{ backgroundColor: themes[key].stop3 }} />
                    </div>
                    <span className="theme-name">{key.toUpperCase()}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '20px 0' }} />
            
            <h3>WORDMARK ENGINE CONTROLS</h3>

            {/* Slider 3: Wordmark Kerning */}
            <div className="control-group">
              <div className="control-label-row">
                <span>WORDMARK LETTER SPACING</span>
                <span>{wordmarkKerning}px</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="15" 
                value={wordmarkKerning} 
                onChange={(e) => setWordmarkKerning(parseInt(e.target.value))}
                className="control-slider"
              />
            </div>

            {/* Slider 4: Live Node Pulse Speed */}
            <div className="control-group">
              <div className="control-label-row">
                <span>RED NODE PULSE CYCLE</span>
                <span>{dotPulseSpeed === 0 ? 'STATIC' : `${dotPulseSpeed}s`}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="30" 
                value={Math.round(dotPulseSpeed * 10)} 
                onChange={(e) => setDotPulseSpeed(parseInt(e.target.value) / 10)}
                className="control-slider"
              />
            </div>

            {/* Toggle: Blueprint Grid */}
            <div className="toggle-row">
              <span className="toggle-label">SHOW DRAFT BLUEPRINT GRID</span>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={showGrid}
                  onChange={(e) => setShowGrid(e.target.checked)}
                />
                <span className="toggle-slider" />
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Brand Guidelines & Utilities */}
        <div className="brand-elements-panel">
          
          {/* Section 1: Color Swatch System */}
          <div className="glass-card color-palette-section">
            <h3>COLOR SWATCH SYSTEM</h3>
            <div className="color-swatch-list">
              
              {/* Teal Swatch */}
              <div className="swatch-card">
                <div className="swatch-color-preview" style={{ backgroundColor: '#14b8a6', boxShadow: '0 0 10px rgba(20,184,166,0.3)' }} />
                <div className="swatch-info">
                  <span className="swatch-name">Quantum Teal</span>
                  <span className="swatch-hex">#14B8A6</span>
                </div>
              </div>
              
              {/* Pink Swatch */}
              <div className="swatch-card">
                <div className="swatch-color-preview" style={{ backgroundColor: '#ec4899', boxShadow: '0 0 10px rgba(236,72,153,0.3)' }} />
                <div className="swatch-info">
                  <span className="swatch-name">Hyper Pink</span>
                  <span className="swatch-hex">#EC4899</span>
                </div>
              </div>

              {/* Violet Swatch */}
              <div className="swatch-card">
                <div className="swatch-color-preview" style={{ backgroundColor: '#8b5cf6', boxShadow: '0 0 10px rgba(139,92,246,0.3)' }} />
                <div className="swatch-info">
                  <span className="swatch-name">Quantum Violet</span>
                  <span className="swatch-hex">#8B5CF6</span>
                </div>
              </div>

              {/* Abyss Swatch */}
              <div className="swatch-card">
                <div className="swatch-color-preview" style={{ backgroundColor: '#030212', border: '1px solid rgba(255,255,255,0.08)' }} />
                <div className="swatch-info">
                  <span className="swatch-name">Deep Abyss</span>
                  <span className="swatch-hex">#030212</span>
                </div>
              </div>

            </div>
          </div>

          {/* Section 2: Typography System */}
          <div className="glass-card typography-section">
            <h3>TYPOGRAPHY SCALE</h3>
            <div className="typography-scale">
              
              <div className="typo-row">
                <div className="typo-label">PRIMARY HEADERS // PLUS JAKARTA SANS / OUTFIT</div>
                <div className="typo-preview-h1">SUPER MAYA AI SYSTEM</div>
              </div>

              <div className="typo-row">
                <div className="typo-label">TECHNICAL MONOSPACE // TERMINAL LOGS / STATS</div>
                <div className="typo-preview-mono">STABILIZING QUANTUM CORE_ [100%]</div>
              </div>

              <div className="typo-row">
                <div className="typo-label">BODY TEXT // INTER / ACCENT READOUTS</div>
                <div className="typo-preview-body">
                  Profit-making AI advertising infrastructure aiming to generate 100,000 high-conversion campaigns by October 2026.
                </div>
              </div>

            </div>
          </div>

          {/* Section 3: Vector Export Utility */}
          <div className="glass-card typography-section">
            <h3>BRAND UTILITIES</h3>
            <div className="actions-panel">
              <button className="action-btn primary" onClick={handleCopySVG}>
                {copied ? '✓ COPIED SVG!' : 'COPY EMBED SVG'}
              </button>
              <button 
                className="action-btn" 
                onClick={() => {
                  const blob = new Blob([getSVGMarkup()], { type: 'image/svg+xml' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `supermaya_logo_${colorTheme}.svg`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
              >
                EXPORT AS .SVG
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Cinematic Empty Expanse - Allows the user to view the background monogram portal and fluid cursor in its full glory */}
      <div style={{
        height: '75vh',
        minHeight: '500px',
        width: '100%',
        pointerEvents: 'none'
      }} />

      {/* C. Return Home Button */}
      <button className="home-floating-btn" onClick={onReturnHome}>
        ← RETURN HOME
      </button>
    </div>
  );
}

export default BrandShowcase;
