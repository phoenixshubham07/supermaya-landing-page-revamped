import React, { useEffect, useRef } from 'react';

function InteractiveBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Highly optimized parameters for maximum frame-rate and cool running temperatures
    const FOV = 280;
    const MAX_Z = 1000;
    const FILAMENT_COUNT = 36; 
    const TRACER_COUNT = 40;   
    const PORTAL_PARTICLE_COUNT = 120; // Lightweight particle count for zero CPU heat
    
    // Speed multiplier state
    let speedMultiplier = 1.0;
    let targetSpeedMultiplier = 1.0;
    let roadTime = 0;

    // Scroll speed velocity tracker
    let lastScrollY = window.scrollY;
    let scrollBoost = 0;

    let mouse = { active: false, down: false };
    let shockwaves = [];

    // Morphing Portal State Machine
    let iconTimer = 0;
    let activeIconIdx = 0;
    let nextIconIdx = 1;
    let transitionProgress = 0;
    let isTransitioning = false;
    
    // Morphing cycle includes the new custom Super Maya monogram!
    const ICONS = ['supermaya', 'youtube', 'tiktok', 'meta', 'instagram', 'sparkle'];
    let logoPulse = 1.0;
    let gyroAngle1 = 0;
    let gyroAngle2 = 0;

    // Resize handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse listeners for Speed Overdrive
    const handleMouseDown = () => {
      mouse.down = true;
    };
    const handleMouseUp = () => {
      mouse.down = false;
    };
    const handleMouseEnter = () => { mouse.active = true; };
    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.down = false;
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Scroll listener - Boosts speed dynamically on page scroll
    const handleScrollEvent = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY);
      scrollBoost += delta * 0.22;
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScrollEvent);

    // Helper math functions
    const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

    const blendColors = (rgba1, rgba2, amt) => {
      const parseRGBA = (str) => {
        const match = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
        if (!match) return [255, 255, 255, 1];
        return [
          parseInt(match[1]),
          parseInt(match[2]),
          parseInt(match[3]),
          match[4] !== undefined ? parseFloat(match[4]) : 1.0
        ];
      };
      const [r1, g1, b1, a1] = parseRGBA(rgba1);
      const [r2, g2, b2, a2] = parseRGBA(rgba2);

      const r = Math.round(lerp(r1, r2, amt));
      const g = Math.round(lerp(g1, g2, amt));
      const b = Math.round(lerp(b1, b2, amt));
      const a = lerp(a1, a2, amt);

      return `rgba(${r}, ${g}, ${b}, ${a})`;
    };

    // Cubic Bezier math evaluator
    const getBezierPoint = (p0, p1, p2, p3, u) => {
      const coeff0 = (1 - u) * (1 - u) * (1 - u);
      const coeff1 = 3 * (1 - u) * (1 - u) * u;
      const coeff2 = 3 * (1 - u) * u * u;
      const coeff3 = u * u * u;
      return {
        x: coeff0 * p0.x + coeff1 * p1.x + coeff2 * p2.x + coeff3 * p3.x,
        y: coeff0 * p0.y + coeff1 * p1.y + coeff2 * p2.y + coeff3 * p3.y
      };
    };

    // 3D Point Projection to 2D Screen
    const project3D = (x, y, z) => {
      const cameraX = 0;
      const cameraY = 0;
      const scale = FOV / (z + FOV);
      const screenX = width / 2 + (x - cameraX) * scale;
      const screenY = height / 2 + (y - cameraY) * scale;
      return { x: screenX, y: screenY, scale };
    };

    // Filament Prototype (3D Winding Thread)
    class Filament {
      constructor() {
        this.reset();
      }

      reset() {
        this.baseAngle = Math.random() * Math.PI * 2;
        this.phase = Math.random() * Math.PI * 2;
        this.radiusOffset = (Math.random() - 0.5) * 20;
        
        this.twistFrequency = Math.random() * 0.0018 + 0.0025;
        this.radiusFrequency = Math.random() * 0.0015 + 0.002;
        this.size = Math.random() * 0.4 + 0.22; // Hair-thin

        const rand = Math.random();
        if (rand < 0.45) {
          this.hue = 290; // Violet/Magenta
        } else if (rand < 0.85) {
          this.hue = 180; // Cyan
        } else {
          this.hue = 225; // Indigo
        }
      }

      getPosition(z, timeOffset) {
        const voidRadius = Math.min(width, height) * 0.075 + 15; // Compact center void
        const scaleFar = FOV / (MAX_Z + FOV); 
        const r_far = voidRadius / scaleFar; 
        const r_near = Math.min(width, height) * 0.48; // Tighter spread

        const zRatio = z / MAX_Z;
        const baseRadius = r_near * (1 - zRatio) + r_far * zRatio;

        const twistAmp = 0.4 + (speedMultiplier - 1.0) * 0.12;
        const radiusAmp = 25 + (speedMultiplier - 1.0) * 6;

        const angle = this.baseAngle + Math.sin(z * this.twistFrequency - timeOffset * 0.015 + this.phase) * twistAmp;
        const radius = baseRadius + Math.cos(z * this.radiusFrequency - timeOffset * 0.01 + this.phase) * radiusAmp + this.radiusOffset;

        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return { x, y, z };
      }
    }

    const filaments = Array.from({ length: FILAMENT_COUNT }, () => new Filament());

    // --- Tracer Class (Shooting sparks traveling along filaments) ---
    class Tracer {
      constructor() {
        this.reset();
        this.z = Math.random() * MAX_Z;
      }

      reset() {
        this.filamentIdx = Math.floor(Math.random() * FILAMENT_COUNT);
        this.z = MAX_Z;
        this.speed = Math.random() * 5 + 9;
        this.length = Math.random() * 40 + 60;
        this.size = Math.random() * 0.35 + 0.2;
      }

      update() {
        this.z -= this.speed * speedMultiplier;
        if (this.z <= 0) {
          this.reset();
        }
      }

      draw() {
        const parent = filaments[this.filamentIdx];
        if (!parent) return;

        const startZ = this.z;
        const endZ = Math.min(this.z + this.length, MAX_Z);

        const segments = 4;
        ctx.save();
        ctx.beginPath();

        for (let i = 0; i <= segments; i++) {
          const segmentZ = startZ + (endZ - startZ) * (i / segments);
          const pos3D = parent.getPosition(segmentZ, roadTime);
          const pt = project3D(pos3D.x, pos3D.y, segmentZ);
          
          if (i === 0) {
            ctx.moveTo(pt.x, pt.y);
          } else {
            ctx.lineTo(pt.x, pt.y);
          }
        }

        const headScale = FOV / (this.z + FOV);
        const drawAlpha = (1 - this.z / MAX_Z) * 0.85;
        
        ctx.lineWidth = Math.max(0.4, (this.size * 5.5) * headScale * (1 + (speedMultiplier - 1.0) * 0.08));
        ctx.strokeStyle = `hsla(${parent.hue}, 90%, 65%, ${drawAlpha})`;
        ctx.shadowBlur = this.size * 6;
        ctx.shadowColor = ctx.strokeStyle;
        ctx.stroke();
        ctx.restore();
      }
    }

    const tracers = Array.from({ length: TRACER_COUNT }, () => new Tracer());

    // --- Living & Breathing Border Energy Fibers ---
    const drawBorderFibers = (timeOffset) => {
      const fiberCount = 2; 
      const stepY = 25;     
      const waveTime = timeOffset * 0.018;
      
      const breathingPulse = Math.sin(timeOffset * 0.015);
      const baseAmp = (breathingPulse * 0.35 + 0.65) * 10;
      const baseAlpha = breathingPulse * 0.12 + 0.28;

      const speedModifier = 1.0 + (speedMultiplier - 1.0) * 0.7;

      ctx.save();
      
      for (let f = 0; f < fiberCount; f++) {
        const phaseOffset = f * 1.5;

        // Left Wavy Fiber
        ctx.beginPath();
        for (let y = 0; y <= height; y += stepY) {
          const x = 18 + Math.sin(y * 0.008 + waveTime * speedModifier + phaseOffset) * baseAmp * speedModifier;
          if (y === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        
        const leftHue = f === 0 ? 290 : 180;
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = `hsla(${leftHue}, 85%, 65%, ${baseAlpha * 0.6})`;
        ctx.stroke();

        // Right Wavy Fiber
        ctx.beginPath();
        for (let y = 0; y <= height; y += stepY) {
          const x = width - 18 - Math.sin(y * 0.008 + waveTime * speedModifier + phaseOffset + Math.PI) * baseAmp * speedModifier;
          if (y === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        
        const rightHue = f === 0 ? 180 : 290;
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = `hsla(${rightHue}, 85%, 65%, ${baseAlpha * 0.6})`;
        ctx.stroke();
      }
      
      ctx.restore();
    };

    // --- Symmetrical Plasma Hooks (Tendril Anchors) & Inward Tracers ---
    let tendrilTracers = Array.from({ length: 4 }, () => [
      { u: Math.random(), speed: 0.012 + Math.random() * 0.006, size: 2.0 },
      { u: Math.random(), speed: 0.009 + Math.random() * 0.005, size: 1.4 }
    ]);

    const drawPlasmaHooks = (timeOffset, voidRadius) => {
      const cx = width / 2;
      const cy = height / 2;
      const rotationAngle = timeOffset * 0.003;

      ctx.save();

      const activeColor = `rgba(20, 184, 166, 0.35)`; // Teal glow
      const brightColor = `rgba(139, 92, 246, 1.0)`;  // Violet core

      for (let i = 0; i < 4; i++) {
        const angle = i * (Math.PI * 2 / 4) + rotationAngle;
        const speedTwist = (speedMultiplier - 1.0) * 0.03;
        const twist = Math.sin(timeOffset * 0.015 + i * 1.2) * 0.2 - speedTwist;

        const outerRadius = voidRadius * 2.1;
        const x2 = cx + Math.cos(angle + twist) * outerRadius;
        const y2 = cy + Math.sin(angle + twist) * outerRadius;

        const x1 = cx + Math.cos(angle) * voidRadius;
        const y1 = cy + Math.sin(angle) * voidRadius;

        const ctrlRadius = voidRadius * 1.5;
        const ctrlAngle = angle + twist * 0.5;
        const waveX = Math.sin(timeOffset * 0.045 + i * 2.3) * 12 * (1 + (speedMultiplier - 1.0) * 0.12);
        const waveY = Math.cos(timeOffset * 0.035 + i * 1.7) * 12 * (1 + (speedMultiplier - 1.0) * 0.12);
        const xc = cx + Math.cos(ctrlAngle) * ctrlRadius + waveX;
        const yc = cy + Math.sin(ctrlAngle) * ctrlRadius + waveY;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(xc, yc, x2, y2);
        
        ctx.lineWidth = 1.8;
        ctx.strokeStyle = activeColor;
        ctx.shadowBlur = 6;
        ctx.shadowColor = activeColor;
        ctx.stroke();

        ctx.lineWidth = 0.6;
        ctx.strokeStyle = `rgba(255, 255, 255, 0.9)`;
        ctx.shadowBlur = 3;
        ctx.shadowColor = brightColor;
        ctx.stroke();

        const tracers = tendrilTracers[i];
        if (tracers) {
          tracers.forEach((tracer) => {
            tracer.u -= tracer.speed * (1.0 + (speedMultiplier - 1.0) * 0.4);
            if (tracer.u < 0) {
              tracer.u = 1.0;
              tracer.speed = 0.009 + Math.random() * 0.008;
            }

            const u = tracer.u;
            const tx = (1 - u) * (1 - u) * x1 + 2 * (1 - u) * u * xc + u * u * x2;
            const ty = (1 - u) * (1 - u) * y1 + 2 * (1 - u) * u * yc + u * u * y2;

            ctx.beginPath();
            ctx.arc(tx, ty, tracer.size * (1.1 + (speedMultiplier - 1.0) * 0.15), 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.shadowBlur = 6;
            ctx.shadowColor = brightColor;
            ctx.fill();
          });
        }
      }

      ctx.restore();
    };

    // --- Parametric Shape Point Generators (Dynamic Morphing Wheel) ---
    const getShapePoint = (shapeName, index, total, size, time) => {
      const t = index / total;
      let x = 0, y = 0;

      switch (shapeName) {
        case 'supermaya': {
          // Dynamic s-M monogram point generator
          const scaleX = (X) => (X - 40) / 40 * (size * 0.82);
          const scaleY = (Y) => (Y - 30) / 30 * (size * 0.65);
          
          const start = { x: scaleX(32), y: scaleY(23) };
          const c1 = { x: scaleX(27), y: scaleY(16) };
          const c2 = { x: scaleX(21), y: scaleY(16) };
          const p1 = { x: scaleX(21), y: scaleY(23) };
          
          const c3 = { x: scaleX(21), y: scaleY(28) };
          const c4 = { x: scaleX(32), y: scaleY(28) };
          const p2 = { x: scaleX(32), y: scaleY(33) };
          
          const c5 = { x: scaleX(32), y: scaleY(38) };
          const c6 = { x: scaleX(21), y: scaleY(38) };
          const p3 = { x: scaleX(21), y: scaleY(43) };
          
          const c7 = { x: scaleX(21), y: scaleY(46) };
          const c8 = { x: scaleX(28), y: scaleY(46) };
          const p4 = { x: scaleX(32), y: scaleY(43) };
          
          const m_left_peak = { x: scaleX(38), y: scaleY(14) };
          const m_center_dip = { x: scaleX(48), y: scaleY(36) };
          const m_right_peak = { x: scaleX(58), y: scaleY(14) };
          const m_right_leg = { x: scaleX(58), y: scaleY(43) }; // Aligned right leg bottom

          if (t < 0.5) {
            // Left 50% traces the curved lowercase "s"
            const t_s = t / 0.5;
            if (t_s < 0.25) {
              return getBezierPoint(start, c1, c2, p1, t_s * 4);
            } else if (t_s < 0.5) {
              return getBezierPoint(p1, c3, c4, p2, (t_s - 0.25) * 4);
            } else if (t_s < 0.75) {
              return getBezierPoint(p2, c5, c6, p3, (t_s - 0.5) * 4);
            } else {
              return getBezierPoint(p3, c7, c8, p4, (t_s - 0.75) * 4);
            }
          } else {
            // Right 50% traces the sharp uppercase "M"
            const t_m = (t - 0.5) / 0.5;
            if (t_m < 0.25) {
              const u = t_m * 4;
              return { x: lerp(p4.x, m_left_peak.x, u), y: lerp(p4.y, m_left_peak.y, u) };
            } else if (t_m < 0.5) {
              const u = (t_m - 0.25) * 4;
              return { x: lerp(m_left_peak.x, m_center_dip.x, u), y: lerp(m_left_peak.y, m_center_dip.y, u) };
            } else if (t_m < 0.75) {
              const u = (t_m - 0.5) * 4;
              return { x: lerp(m_center_dip.x, m_right_peak.x, u), y: lerp(m_center_dip.y, m_right_peak.y, u) };
            } else {
              const u = (t_m - 0.75) * 4;
              return { x: lerp(m_right_peak.x, m_right_leg.x, u), y: lerp(m_right_peak.y, m_right_leg.y, u) };
            }
          }
        }
        case 'youtube': {
          if (t < 0.7) {
            const tRect = t / 0.7;
            const angle = tRect * Math.PI * 2;
            const a = size * 0.82;
            const b = size * 0.58;
            const n = 4.0;
            const cosA = Math.cos(angle);
            const sinA = Math.sin(angle);
            x = Math.sign(cosA) * Math.pow(Math.abs(cosA), 2 / n) * a;
            y = Math.sign(sinA) * Math.pow(Math.abs(sinA), 2 / n) * b;
          } else {
            const tTri = (t - 0.7) / 0.3;
            const v1 = { x: -size * 0.16, y: -size * 0.22 };
            const v2 = { x: -size * 0.16, y: size * 0.22 };
            const v3 = { x: size * 0.26, y: 0 };
            
            if (tTri < 1/3) {
              const ratio = tTri * 3;
              x = v1.x + (v2.x - v1.x) * ratio;
              y = v1.y + (v2.y - v1.y) * ratio;
            } else if (tTri < 2/3) {
              const ratio = (tTri - 1/3) * 3;
              x = v2.x + (v3.x - v2.x) * ratio;
              y = v2.y + (v3.y - v2.y) * ratio;
            } else {
              const ratio = (tTri - 2/3) * 3;
              x = v3.x + (v1.x - v3.x) * ratio;
              y = v3.y + (v1.y - v3.y) * ratio;
            }
          }
          break;
        }
        case 'tiktok': {
          if (t < 0.45) {
            const tHead = t / 0.45;
            const angle = tHead * Math.PI * 2;
            const cx = -size * 0.22;
            const cy = size * 0.26;
            const r = size * 0.28;
            x = cx + Math.cos(angle) * r;
            y = cy + Math.sin(angle) * r;
          } else if (t < 0.7) {
            const tStem = (t - 0.45) / 0.25;
            x = 0.06 * size;
            y = (0.26 - tStem * 0.65) * size;
          } else {
            const tHook = (t - 0.7) / 0.3;
            const angle = Math.PI + tHook * (Math.PI / 2);
            const cx = 0.36 * size;
            const cy = -0.39 * size;
            const r = 0.3 * size;
            x = cx + Math.cos(angle) * r;
            y = cy + Math.sin(angle) * r;
          }
          break;
        }
        case 'meta': {
          const angle = t * Math.PI * 2;
          const a = size * 0.95;
          const denom = 1 + Math.sin(angle) * Math.sin(angle);
          x = (a * Math.cos(angle)) / denom;
          y = (a * Math.sin(angle) * Math.cos(angle) * 1.3) / denom;
          break;
        }
        case 'instagram': {
          if (t < 0.55) {
            const tSquare = t / 0.55;
            const angle = tSquare * Math.PI * 2;
            const a = size * 0.75;
            const n = 4.5;
            const cosA = Math.cos(angle);
            const sinA = Math.sin(angle);
            x = Math.sign(cosA) * Math.pow(Math.abs(cosA), 2 / n) * a;
            y = Math.sign(sinA) * Math.pow(Math.abs(sinA), 2 / n) * a;
          } else if (t < 0.95) {
            const tCircle = (t - 0.55) / 0.4;
            const angle = tCircle * Math.PI * 2;
            const r = size * 0.32;
            x = Math.cos(angle) * r;
            y = Math.sin(angle) * r;
          } else {
            const tDot = (t - 0.95) / 0.05;
            const angle = tDot * Math.PI * 2;
            const cx = size * 0.42;
            const cy = -size * 0.42;
            const r = size * 0.05;
            x = cx + Math.cos(angle) * r;
            y = cy + Math.sin(angle) * r;
          }
          break;
        }
        case 'sparkle': {
          const angle = t * Math.PI * 2;
          const a = size * 0.92;
          x = a * Math.pow(Math.cos(angle), 3);
          y = a * Math.pow(Math.sin(angle), 3);
          break;
        }
        default: {
          const angle = t * Math.PI * 2;
          x = Math.cos(angle) * size;
          y = Math.sin(angle) * size;
          break;
        }
      }

      return { x, y };
    };

    const getShapeColor = (shapeName, index, total, alpha) => {
      const t = index / total;
      switch (shapeName) {
        case 'supermaya': {
          // Custom beautiful brand gradient (Teal -> Pink -> Violet)
          if (t < 0.5) {
            const blend = t / 0.5;
            const r = Math.round(20 * (1 - blend) + 236 * blend);
            const g = Math.round(184 * (1 - blend) + 72 * blend);
            const b = Math.round(166 * (1 - blend) + 153 * blend);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
          } else {
            const blend = (t - 0.5) / 0.5;
            const r = Math.round(236 * (1 - blend) + 139 * blend);
            const g = Math.round(72 * (1 - blend) + 92 * blend);
            const b = Math.round(153 * (1 - blend) + 246 * blend);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
          }
        }
        case 'youtube':
          return `rgba(239, 68, 68, ${alpha})`; 
        case 'tiktok':
          return index % 2 === 0 ? `rgba(34, 211, 238, ${alpha})` : `rgba(236, 72, 153, ${alpha})`; 
        case 'meta':
          return `rgba(59, 130, 246, ${alpha})`; 
        case 'instagram': {
          if (t < 0.5) {
            const blend = t / 0.5;
            const r = Math.round(249 * (1 - blend) + 236 * blend);
            const g = Math.round(115 * (1 - blend) + 72 * blend);
            const b = Math.round(22 * (1 - blend) + 153 * blend);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
          } else {
            const blend = (t - 0.5) / 0.5;
            const r = Math.round(236 * (1 - blend) + 139 * blend);
            const g = Math.round(72 * (1 - blend) + 92 * blend);
            const b = Math.round(153 * (1 - blend) + 246 * blend);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
          }
        }
        case 'sparkle':
          return index % 3 === 0 ? `rgba(234, 179, 8, ${alpha})` : `rgba(20, 184, 166, ${alpha})`; 
        default:
          return `rgba(255, 255, 255, ${alpha})`;
      }
    };

    // --- Portal Particles Swarm Initialization ---
    const portalParticles = Array.from({ length: PORTAL_PARTICLE_COUNT }, (_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 40;
      return {
        x: width / 2 + Math.cos(angle) * dist,
        y: height / 2 + Math.sin(angle) * dist,
        vx: 0,
        vy: 0,
        size: Math.random() * 1.5 + 1.2, 
        alpha: Math.random() * 0.4 + 0.4, 
        speedVar: Math.random(),
        noiseSeed: Math.random() * 100,
        total: PORTAL_PARTICLE_COUNT
      };
    });

    // Draw the active portal ring, the deep gravitational void, and morphing particle swarm
    const drawCreativePortal = (timeOffset) => {
      const cx = width / 2;
      const cy = height / 2;

      // Base void radius (compacted approx 75px)
      const voidRadius = Math.min(width, height) * 0.075 + 15; 

      // Biological breathing rhythm
      const breathingPulse = Math.sin(timeOffset * 0.04);
      const activeVoidRadius = (voidRadius + breathingPulse * 1.5) * logoPulse;

      // --- 1. Draw the Cosmic Gravitational Void Backdrop ---
      ctx.save();
      const voidGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, activeVoidRadius);
      voidGrad.addColorStop(0, 'rgba(4, 3, 20, 0.95)'); 
      voidGrad.addColorStop(0.75, 'rgba(7, 5, 30, 0.88)');
      voidGrad.addColorStop(0.92, 'rgba(15, 12, 55, 0.45)');
      voidGrad.addColorStop(1, 'rgba(0, 0, 0, 0)'); 
      ctx.fillStyle = voidGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, activeVoidRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // --- 2. Draw Plasma Hooks connecting Void to Wormhole ---
      drawPlasmaHooks(timeOffset, activeVoidRadius);

      // --- 3. Draw Portal Ring Borders ---
      ctx.save();
      const ringColor = `rgba(20, 184, 166, 0.42)`; 
      ctx.strokeStyle = ringColor;
      ctx.lineWidth = 1.4;
      ctx.shadowBlur = 10;
      ctx.shadowColor = ringColor;
      ctx.beginPath();
      ctx.arc(cx, cy, activeVoidRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Faint, rotating outer dash ring
      ctx.strokeStyle = `hsla(290, 85%, 65%, ${0.2 * (1 + (speedMultiplier - 1.0) * 0.15)})`;
      ctx.setLineDash([4, 8]);
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.arc(cx, cy, activeVoidRadius + 4, timeOffset * 0.003 * (1 + (speedMultiplier - 1.0) * 0.4), timeOffset * 0.003 * (1 + (speedMultiplier - 1.0) * 0.4) + Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // --- 3.5 Draw Central Vector s-M Monogram Logo ---
      const monogramSize = activeVoidRadius * 0.76;
      const monogramScale = monogramSize / 40; 
      
      const tx = (x) => cx + (x - 39.5) * monogramScale;
      const ty = (y) => cy + (y - 30) * monogramScale;

      ctx.save();
      ctx.beginPath();
      
      // M 32 23
      ctx.moveTo(tx(32), ty(23));
      
      // C 27 16, 21 16, 21 23
      ctx.bezierCurveTo(tx(27), ty(16), tx(21), ty(16), tx(21), ty(23));
      
      // C 21 28, 32 28, 32 33
      ctx.bezierCurveTo(tx(21), ty(28), tx(32), ty(28), tx(32), ty(33));
      
      // C 32 38, 21 38, 21 43
      ctx.bezierCurveTo(tx(32), ty(38), tx(21), ty(38), tx(21), ty(43));
      
      // C 21 46, 28 46, 32 43
      ctx.bezierCurveTo(tx(21), ty(46), tx(28), ty(46), tx(32), ty(43));
      
      // L 38 14
      ctx.lineTo(tx(38), ty(14));
      
      // L 48 36
      ctx.lineTo(tx(48), ty(36));
      
      // L 58 14
      ctx.lineTo(tx(58), ty(14));
      
      // L 58 43
      ctx.lineTo(tx(58), ty(43));

      // Style with a premium glowing linear gradient (Teal -> Pink -> Violet)
      const grad = ctx.createLinearGradient(tx(21), ty(14), tx(58), ty(43));
      grad.addColorStop(0, '#14b8a6');
      grad.addColorStop(0.5, '#ec4899');
      grad.addColorStop(1, '#8b5cf6');
      
      ctx.strokeStyle = grad;
      ctx.lineWidth = 3.2 * monogramScale;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      // Neon Glow stdDev matches the brand showcase
      ctx.shadowBlur = 12 * monogramScale;
      ctx.shadowColor = 'rgba(236, 72, 153, 0.45)';
      ctx.globalAlpha = 0.65; // Highly sheer, visually integrated
      ctx.stroke();
      
      // Draw inner white core for crisp neon legibility
      ctx.beginPath();
      ctx.moveTo(tx(32), ty(23));
      ctx.bezierCurveTo(tx(27), ty(16), tx(21), ty(16), tx(21), ty(23));
      ctx.bezierCurveTo(tx(21), ty(28), tx(32), ty(28), tx(32), ty(33));
      ctx.bezierCurveTo(tx(32), ty(38), tx(21), ty(38), tx(21), ty(43));
      ctx.bezierCurveTo(tx(21), ty(46), tx(28), ty(46), tx(32), ty(43));
      ctx.lineTo(tx(38), ty(14));
      ctx.lineTo(tx(48), ty(36));
      ctx.lineTo(tx(58), ty(14));
      ctx.lineTo(tx(58), ty(43));
      
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 0.9 * monogramScale;
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 0.6;
      ctx.stroke();
      
      ctx.restore();

      // --- 4. Morphing Portal State Machine (Cycles & Morphing) ---
      iconTimer++;
      
      const transitionDuration = 35; // Frames for morph
      const delayBetweenCycles = 240; // Wait time before morphing to next logo

      if (iconTimer >= delayBetweenCycles) {
        isTransitioning = true;
        transitionProgress += 0.03; // Smooth morph speed
        
        if (transitionProgress >= 1) {
          activeIconIdx = nextIconIdx;
          nextIconIdx = (nextIconIdx + 1) % ICONS.length;
          transitionProgress = 0;
          isTransitioning = false;
          iconTimer = 0;
        }
      }

      // Size scale of the icon (fills inside the void)
      const iconSize = activeVoidRadius * 0.78;
      
      // Calculate rotation for the icon swarm
      const rotationAngle = timeOffset * 0.005 * (1 + (speedMultiplier - 1.0) * 0.5);

      // --- 5. Update and Render Swarm Particles (Draws Morphing Constellation) ---
      portalParticles.forEach((p, i) => {
        // Find local targets (centered on 0,0)
        const ptActive = getShapePoint(ICONS[activeIconIdx], i, p.total, iconSize, timeOffset);
        let ptTarget = ptActive;

        if (isTransitioning) {
          const ptNext = getShapePoint(ICONS[nextIconIdx], i, p.total, iconSize, timeOffset);
          ptTarget = {
            x: lerp(ptActive.x, ptNext.x, transitionProgress),
            y: lerp(ptActive.y, ptNext.y, transitionProgress)
          };
        }

        // Rotate targets to spin the logo
        const cosR = Math.cos(rotationAngle);
        const sinR = Math.sin(rotationAngle);
        const rotX = ptTarget.x * cosR - ptTarget.y * sinR;
        const rotY = ptTarget.x * sinR + ptTarget.y * cosR;

        // Project into screen space
        const screenTargetX = cx + rotX;
        const screenTargetY = cy + rotY;

        // Physics: Spring-Damper attraction
        let dx = screenTargetX - p.x;
        let dy = screenTargetY - p.y;
        
        // Add Brownian biological wiggle
        const wiggle = 0.95;
        dx += Math.sin(timeOffset * 0.08 + p.noiseSeed) * wiggle;
        dy += Math.cos(timeOffset * 0.075 + p.noiseSeed * 1.35) * wiggle;

        // Vortex force during shape transformations
        if (isTransitioning) {
          const vx_center = p.x - cx;
          const vy_center = p.y - cy;
          const dist = Math.sqrt(vx_center * vx_center + vy_center * vy_center) + 1;
          
          // Tangential swirl vector
          const tx = -vy_center / dist;
          const ty = vx_center / dist;
          
          // Vortex peaks in middle of transition
          const vortexStrength = Math.sin(transitionProgress * Math.PI) * 2.1;
          dx += tx * vortexStrength * 8.0;
          dy += ty * vortexStrength * 8.0;
        }

        const accel = 0.062 + p.speedVar * 0.022;
        p.vx += dx * accel - p.vx * 0.15;
        p.vy += dy * accel - p.vy * 0.15;

        p.x += p.vx;
        p.y += p.vy;

        // Color blending
        const colorActive = getShapeColor(ICONS[activeIconIdx], i, p.total, p.alpha);
        let drawColor = colorActive;
        if (isTransitioning) {
          const colorNext = getShapeColor(ICONS[nextIconIdx], i, p.total, p.alpha);
          drawColor = blendColors(colorActive, colorNext, transitionProgress);
        }

        // Draw particle
        ctx.save();
        ctx.fillStyle = drawColor;
        
        const glow = p.size * (1.6 + (speedMultiplier - 1.0) * 0.25);
        ctx.shadowBlur = glow;
        ctx.shadowColor = drawColor;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1.0 + (speedMultiplier - 1.0) * 0.06), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    };

    // Listen to click generation events (Simulates AI supernova shockwave burst)
    const handleGenerateEvent = () => {
      shockwaves.push({
        z: MAX_Z,
        speed: 35,
        width: 10,
        alpha: 1.0,
        color: Math.random() > 0.5 ? 'rgba(217, 70, 239, ' : 'rgba(20, 184, 166, '
      });
      
      // Inject temporary rapid tracers from the vanishing point
      for (let i = 0; i < 8; i++) { 
        const tracer = new Tracer();
        tracer.z = MAX_Z;
        tracer.speed = Math.random() * 20 + 20;
        tracers.push(tracer);
      }

      // SWELL PORTAL LOGO & TRIGGER EXPLOSION: Blast particles outward
      logoPulse = 1.65;
      portalParticles.forEach((p) => {
        const dx = p.x - width / 2;
        const dy = p.y - height / 2;
        const dist = Math.sqrt(dx * dx + dy * dy) + 1;
        
        // Push outward with high velocity
        const pushForce = Math.random() * 12 + 8;
        p.vx += (dx / dist) * pushForce;
        p.vy += (dy / dist) * pushForce;
      });
    };
    window.addEventListener('supermaya-ad-generate', handleGenerateEvent);

    // --- Main Game Render Ticker Loop ---
    const tick = () => {
      // 1. Calculate Scroll Boost Speed
      scrollBoost *= 0.90; // Decay rate
      const currentScrollSpeed = Math.min(scrollBoost, 5.5); // Cap scroll boost at 5.5x

      // 2. Set target speed multiplier
      targetSpeedMultiplier = 1.0 + (mouse.down ? 5.5 : 0) + currentScrollSpeed;
      
      // Interpolate for buttery throttle response
      speedMultiplier += (targetSpeedMultiplier - speedMultiplier) * 0.06;
      roadTime += speedMultiplier;

      // 3. Smoothly decay Logo swell/pulse back to 1.0
      logoPulse += (1.0 - logoPulse) * 0.09;

      ctx.clearRect(0, 0, width, height);

      // A. Draw Living & Breathing Borders (Dynamic Edge Fibers)
      drawBorderFibers(roadTime);

      // B. Camera vibration rumble (Shakes viewport at high physical speeds)
      ctx.save();
      if (speedMultiplier > 1.5) {
        const shakeIntensity = (speedMultiplier - 1.0) * 0.5;
        const shakeX = (Math.random() - 0.5) * shakeIntensity;
        const shakeY = (Math.random() - 0.5) * shakeIntensity;
        ctx.translate(shakeX, shakeY);
      }

      // C. Draw the 36 Winding Filament Strands (Tangled 3D Warp Wormhole)
      const steps = 20; 
      const stepZ = MAX_Z / steps;

      filaments.forEach((f) => {
        ctx.save();
        ctx.beginPath();

        for (let i = 0; i <= steps; i++) {
          const z = MAX_Z - i * stepZ;
          const pos3D = f.getPosition(z, roadTime);
          const pt = project3D(pos3D.x, pos3D.y, z);

          if (i === 0) {
            ctx.moveTo(pt.x, pt.y);
          } else {
            ctx.lineTo(pt.x, pt.y);
          }
        }

        // Project hair-thin glowing spline lines
        const drawAlpha = (1 - f.size) * 0.16 * (1 - speedMultiplier * 0.03);
        
        ctx.lineWidth = f.size * 0.8; 
        ctx.strokeStyle = `hsla(${f.hue}, 85%, 65%, ${drawAlpha})`;
        ctx.stroke();
        ctx.restore();
      });

      // D. Update & Draw 40+ Neon Tracers
      tracers.forEach((t) => {
        t.update();
        t.draw();
      });

      // Cleanup trailing elements
      if (tracers.length > 50) {
        tracers.splice(40, tracers.length - 40);
      }

      // E. Update & Draw click shockwaves
      shockwaves.forEach((sw, idx) => {
        sw.z -= sw.speed * speedMultiplier;
        if (sw.z <= 0) {
          shockwaves.splice(idx, 1);
          return;
        }

        const roadCenter = getRoadCenter(sw.z, roadTime);
        const pt = project3D(roadCenter.x, roadCenter.y, sw.z);
        const radiusScale = pt.scale * 300; // Shockwave radius

        ctx.save();
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, radiusScale, 0, Math.PI * 2);
        
        ctx.strokeStyle = sw.color + sw.alpha * (1 - sw.z / MAX_Z) * 0.5 + ')';
        ctx.lineWidth = sw.width * pt.scale * 1.2;
        ctx.shadowBlur = 12;
        ctx.shadowColor = ctx.strokeStyle;
        ctx.stroke();
        ctx.restore();
      });

      // Helper center coordinate getter for shockwave centering
      function getRoadCenter(z, timeOffset) {
        const curveX = Math.sin(z * 0.0024 - timeOffset * 0.012) * 120;
        const curveY = Math.cos(z * 0.0015 - timeOffset * 0.008) * 15;
        return { x: curveX, y: curveY };
      }

      ctx.restore(); 

      // F. Draw Glowing Central Portal & Morphing Swarm Core
      drawCreativePortal(roadTime);

      // G. Draw Glowing Speed Vignette at screen borders
      const borderGlow = (speedMultiplier - 1.0) / 5.5;
      if (borderGlow > 0) {
        ctx.save();
        const grad = ctx.createRadialGradient(
          width / 2,
          height / 2,
          Math.min(width, height) * 0.45,
          width / 2,
          height / 2,
          Math.max(width, height) * 0.85
        );
        grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
        grad.addColorStop(0.65, `hsla(180, 85%, 50%, ${borderGlow * 0.05})`);
        grad.addColorStop(1, `hsla(290, 85%, 50%, ${borderGlow * 0.18})`);
        
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScrollEvent);
      window.removeEventListener('supermaya-ad-generate', handleGenerateEvent);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="cinematic-highway"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'block',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
}

export default InteractiveBackground;
