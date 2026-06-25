import React, { useState } from 'react';
import { Sparkles, Play, Zap, ArrowRight } from 'lucide-react';

function Hero() {
  // State to drive the sliding capsule hover indicator in the navbar
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0
  });

  const handleMouseEnter = (e) => {
    const target = e.currentTarget;
    setIndicatorStyle({
      left: target.offsetLeft,
      width: target.offsetWidth,
      opacity: 1
    });
  };

  const handleMouseLeaveNav = () => {
    setIndicatorStyle(prev => ({
      ...prev,
      opacity: 0
    }));
  };

  return (
    <div className="hero-section" style={{ position: 'relative', zIndex: 10, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 1. Pill Glassmorphic Header / Navbar */}
      <header style={{
        position: 'fixed',
        top: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        maxWidth: '900px',
        background: 'rgba(5, 4, 9, 0.65)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        padding: '12px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        borderRadius: '100px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.1)'
      }}>
        
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <div style={{
            background: 'var(--accent-gradient)',
            width: '26px',
            height: '26px',
            borderRadius: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(99, 102, 241, 0.4)'
          }}>
            <Sparkles size={12} color="white" />
          </div>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: '1.25rem',
            letterSpacing: '-0.03em',
            background: 'linear-gradient(to right, #fff, #a5b4fc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            supermaya
            <span style={{
              width: '6px',
              height: '6px',
              background: 'var(--accent-teal)',
              borderRadius: '100%',
              display: 'inline-block',
              boxShadow: '0 0 8px var(--accent-teal)'
            }} className="pulse" />
          </span>
        </div>

        {/* Links Navigation with Sliding Pill Capsule */}
        <nav 
          onMouseLeave={handleMouseLeaveNav}
          style={{ 
            display: 'flex', 
            gap: '6px', 
            position: 'relative', 
            alignItems: 'center',
            background: 'rgba(255,255,255,0.02)',
            padding: '4px',
            borderRadius: '100px',
            border: '1px solid rgba(255,255,255,0.03)'
          }}
        >
          {/* Sliding indicator element */}
          <div 
            className="nav-indicator" 
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
              opacity: indicatorStyle.opacity
            }} 
          />

          <a 
            href="#dashboard" 
            className="nav-link"
            onMouseEnter={handleMouseEnter}
          >
            Platform
          </a>
          <a 
            href="#pillars" 
            className="nav-link"
            onMouseEnter={handleMouseEnter}
          >
            Features
          </a>
          <a 
            href="#playground" 
            className="nav-link"
            onMouseEnter={handleMouseEnter}
          >
            Playground
          </a>
          <a 
            href="#showroom" 
            className="nav-link"
            onMouseEnter={handleMouseEnter}
          >
            Showroom
          </a>
        </nav>

        {/* Quick CTA */}
        <div>
          <a href="#playground" className="glow-btn" style={{ 
            padding: '8px 16px', 
            fontSize: '0.85rem', 
            borderRadius: '100px',
            boxShadow: 'none'
          }}>
            Free Ad <ArrowRight size={12} />
          </a>
        </div>
      </header>

      {/* 2. Immersive Hero Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '160px 24px 80px 24px',
        textAlign: 'center',
        maxWidth: '1100px',
        margin: '0 auto',
        position: 'relative'
      }}>
        
        {/* Cinematic Campaign Badge */}
        <div className="glass-panel" style={{
          padding: '8px 20px',
          borderRadius: '100px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '36px',
          background: 'rgba(255, 255, 255, 0.02)',
          borderColor: 'rgba(255, 255, 255, 0.08)',
          fontSize: '0.8rem',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase'
        }}>
          <Zap size={12} color="var(--accent-teal)" style={{ fill: 'var(--accent-teal)' }} />
          <span style={{ color: '#fff' }}>Project 100k Ads</span>
          <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
          <span className="gradient-accent-text" style={{ fontWeight: 800 }}>October 2026 Target</span>
        </div>

        {/* Heavy Display Typography Header */}
        <h1 style={{
          fontSize: 'clamp(2.8rem, 7vw, 5.4rem)',
          fontWeight: 900,
          lineHeight: 1.02,
          marginBottom: '28px',
          letterSpacing: '-0.04em'
        }}>
          The Creative OS for <br />
          <span className="gradient-accent-text">High-Performance</span> D2C Ads
        </h1>

        {/* Luxurious Subheading Spacing */}
        <p style={{
          fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
          color: 'var(--text-secondary)',
          maxWidth: '740px',
          marginBottom: '56px',
          lineHeight: 1.7
        }}>
          Autogenerate cinematic video ads from a simple brief. Predict CTR and ROAS before launching, and let reinforcement learning auto-refresh creatives in real-time.
        </p>

        {/* Magnetic CTAs */}
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="#playground" className="glow-btn">
            Launch Creative OS <Sparkles size={16} />
          </a>
          <a href="#dashboard" className="glow-btn-secondary">
            View Platform Analytics <Play size={14} style={{ fill: 'currentColor' }} />
          </a>
        </div>

        {/* Playable sandbox help text */}
        <div style={{
          marginTop: '60px',
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          background: 'rgba(255,255,255,0.01)',
          border: '1px solid rgba(255,255,255,0.03)',
          borderRadius: '100px'
        }}>
          <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '100%', background: 'var(--accent-teal)', boxShadow: '0 0 6px var(--accent-teal)' }} className="pulse" />
          <span>**Interactive Speed OS**: Click and hold anywhere on the screen to trigger Warp Speed Overdrive!</span>
        </div>

        {/* Trust Badges */}
        <div style={{
          marginTop: '90px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          width: '100%'
        }}>
          <span style={{
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            fontWeight: 700
          }}>
            Driving performance for hyper-growth brands
          </span>
          
          <div style={{
            display: 'flex',
            gap: '48px',
            alignItems: 'center',
            opacity: 0.5,
            flexWrap: 'wrap',
            justifyContent: 'center',
            padding: '0 24px'
          }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: '#fff', letterSpacing: '0.05em' }}>PHYSICSWALLAH</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: '#fff', letterSpacing: '0.05em' }}>NUTRABAY</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: '#fff', letterSpacing: '0.05em' }}>BEWAKOOF</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: '#fff', letterSpacing: '0.05em' }}>PILGRIM</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
