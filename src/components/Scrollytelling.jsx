import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Brain, ShieldCheck, ArrowDown, Video, Cpu, Activity, Lock } from 'lucide-react';

function Scrollytelling() {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef(null);

  // Universally active scroll listener for robust card-stack transitions
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress within this sticky section
      const scrollStart = rect.top;
      const totalScrollable = containerHeight - windowHeight;
      
      if (scrollStart <= 0 && Math.abs(scrollStart) <= totalScrollable) {
        const progress = Math.abs(scrollStart) / totalScrollable;
        // Map progress [0, 1] to section indices [0, 1, 2]
        if (progress < 0.33) {
          setActiveSection(0);
        } else if (progress < 0.66) {
          setActiveSection(1);
        } else {
          setActiveSection(2);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger once on mount to set initial active state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sections data
  const pillars = [
    {
      id: 'pillar-1',
      title: 'Cinematic AI Production',
      tagline: 'From brief to broadcast-ready in 45 seconds.',
      desc: 'SuperMaya autogenerates high-fidelity product video reels, professional voiceovers, custom soundtracks, and Kinetic copywriting from a simple text brief. No expensive studios, cameras, or editors required.',
      icon: <Video size={24} color="var(--accent-indigo)" />,
      badge: 'Production Engine'
    },
    {
      id: 'pillar-2',
      title: 'The Performance Brain',
      tagline: 'Predictive CTR modeling meets automated refreshes.',
      desc: 'Our neural network predicts click-through rates (CTR) and return on ad spend (ROAS) before you launch. Once live, the reinforcement learning algorithm monitors fatigue and auto-refreshes underperforming hooks instantly.',
      icon: <Brain size={24} color="var(--accent-magenta)" />,
      badge: 'Neural Optimization'
    },
    {
      id: 'pillar-3',
      title: 'Brand World-Builder',
      tagline: 'Guaranteed 100% brand consistency, always.',
      desc: 'Establish a private brand checkpoint. Upload your style sheets, logo placements, voice guides, and design guidelines. SuperMaya locks these rules in, ensuring every single asset matches your specific aesthetic flawlessly.',
      icon: <ShieldCheck size={24} color="var(--accent-teal)" />,
      badge: 'Brand Governance'
    }
  ];

  return (
    <section id="pillars" ref={containerRef} style={{
      position: 'relative',
      minHeight: '300vh', // Gives enough scroll length for 3 steps
      backgroundColor: 'var(--bg-secondary)',
      borderTop: '1px solid var(--glass-border)',
      borderBottom: '1px solid var(--glass-border)'
    }}>
      {/* Sticky Scroll Container */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        padding: '0 max(24px, 4%)'
      }}>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '60px',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          alignItems: 'center'
        }}>
          
          {/* Left Side - Storytelling Text Content */}
          <div style={{ position: 'relative' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-indigo)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '16px' }}>
              Inside the OS
            </span>
            
            <div style={{ position: 'relative', height: '280px' }}>
              {pillars.map((pillar, idx) => (
                <div
                  key={pillar.id}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    opacity: activeSection === idx ? 1 : 0,
                    transform: activeSection === idx ? 'translateY(0)' : 'translateY(30px)',
                    pointerEvents: activeSection === idx ? 'all' : 'none',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--glass-border)',
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {pillar.icon}
                    </div>
                    <span style={{
                      background: 'rgba(255,255,255,0.05)',
                      padding: '4px 12px',
                      borderRadius: '100px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'var(--text-secondary)'
                    }}>
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
                    {pillar.title}
                  </h3>
                  
                  <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px', fontSize: '1.05rem' }}>
                    {pillar.tagline}
                  </p>
                  
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Pagination Indicators */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '40px', alignItems: 'center' }}>
              {pillars.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    const scrollPortion = containerRef.current.offsetTop + (containerRef.current.scrollHeight / 3) * idx;
                    window.scrollTo({ top: scrollPortion, behavior: 'smooth' });
                    setActiveSection(idx);
                  }}
                  style={{
                    width: activeSection === idx ? '36px' : '10px',
                    height: '10px',
                    borderRadius: '100px',
                    background: activeSection === idx ? 'var(--accent-gradient)' : 'rgba(255, 255, 255, 0.1)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'var(--transition-smooth)'
                  }}
                />
              ))}
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                Scroll to explore <ArrowDown size={12} className="bounce" />
              </span>
            </div>
          </div>

          {/* Right Side - Stacked Interactive Visuals */}
          <div style={{
            position: 'relative',
            height: '420px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            
            {/* Visual Panel 1: Cinematic Generation */}
            <div className="glass-panel" style={{
              position: 'absolute',
              width: '100%',
              maxWidth: '440px',
              height: '340px',
              padding: '24px',
              transition: 'var(--transition-smooth)',
              opacity: activeSection === 0 ? 1 : 0.05,
              transform: activeSection === 0 
                ? 'scale(1) translateY(0)' 
                : activeSection > 0 
                  ? 'scale(0.9) translateY(-60px)' 
                  : 'scale(0.9) translateY(60px)',
              zIndex: activeSection === 0 ? 10 : 1,
              pointerEvents: activeSection === 0 ? 'all' : 'none'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 600 }}>
                  <Video size={16} color="var(--accent-indigo)" /> Generator_Timeline_01
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-indigo)' }}>45s Render</span>
              </div>
              
              {/* Fake Video Preview */}
              <div style={{
                background: 'linear-gradient(45deg, #1e1b4b, #311042)',
                height: '160px',
                borderRadius: '12px',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  position: 'absolute',
                  width: '80px',
                  height: '80px',
                  background: 'rgba(99, 102, 241, 0.1)',
                  borderRadius: '100%',
                  filter: 'blur(20px)',
                  animation: 'pulse 3s infinite'
                }} />
                <Sparkles size={32} color="var(--accent-indigo)" className="pulse" />
                
                {/* Simulated Rendering status */}
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  right: '12px',
                  background: 'rgba(0, 0, 0, 0.6)',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  backdropFilter: 'blur(4px)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.75rem'
                }}>
                  <span style={{ fontWeight: 500 }}>Generating Hooks...</span>
                  <span style={{ color: 'var(--accent-indigo)', fontWeight: 700 }}>88%</span>
                </div>
              </div>

              {/* Fake timeline track */}
              <div style={{ marginTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  <span>Video Track</span>
                  <span>Audio Sync</span>
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <div style={{ flex: 3, height: '8px', background: 'var(--accent-indigo)', borderRadius: '4px' }} />
                  <div style={{ flex: 1, height: '8px', background: 'var(--accent-magenta)', borderRadius: '4px' }} />
                  <div style={{ flex: 2, height: '8px', background: 'var(--accent-teal)', borderRadius: '4px' }} />
                </div>
              </div>
            </div>

            {/* Visual Panel 2: Performance Brain */}
            <div className="glass-panel" style={{
              position: 'absolute',
              width: '100%',
              maxWidth: '440px',
              height: '340px',
              padding: '24px',
              transition: 'var(--transition-smooth)',
              opacity: activeSection === 1 ? 1 : 0.05,
              transform: activeSection === 1 
                ? 'scale(1) translateY(0)' 
                : activeSection > 1 
                  ? 'scale(0.9) translateY(-60px)' 
                  : 'scale(0.9) translateY(60px)',
              zIndex: activeSection === 1 ? 10 : 1,
              pointerEvents: activeSection === 1 ? 'all' : 'none'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 600 }}>
                  <Activity size={16} color="var(--accent-magenta)" /> Performance Brain
                </span>
                <span style={{
                  fontSize: '0.75rem',
                  background: 'rgba(217, 70, 239, 0.1)',
                  color: 'var(--accent-magenta)',
                  padding: '2px 8px',
                  borderRadius: '100px',
                  fontWeight: 700
                }}>Optimizing</span>
              </div>

              {/* Grid of gauges */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div className="glass-panel" style={{ padding: '16px', background: 'rgba(255, 255, 255, 0.01)', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Predicted CTR</span>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-magenta)', marginTop: '6px' }}>5.42%</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--accent-teal)', fontWeight: 600, marginTop: '2px' }}>High probability</div>
                </div>

                <div className="glass-panel" style={{ padding: '16px', background: 'rgba(255, 255, 255, 0.01)', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Fatigue Index</span>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginTop: '6px' }}>12%</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-teal)', fontWeight: 600, marginTop: '2px' }}>Healthy (Next refresh: 4d)</div>
                </div>
              </div>

              {/* Terminal log */}
              <div className="glass-panel" style={{
                background: '#0c0b10',
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                padding: '12px',
                borderRadius: '8px',
                color: '#818cf8',
                border: '1px solid rgba(255,255,255,0.03)'
              }}>
                <div>&gt; Hook fatigue detected on Ad #083.</div>
                <div style={{ color: 'var(--accent-magenta)' }}>&gt; Injecting Variation C hook script...</div>
                <div style={{ color: 'var(--accent-teal)' }}>&gt; Deploying to Meta API. Status: Success.</div>
              </div>
            </div>

            {/* Visual Panel 3: Brand World-Builder */}
            <div className="glass-panel" style={{
              position: 'absolute',
              width: '100%',
              maxWidth: '440px',
              height: '340px',
              padding: '24px',
              transition: 'var(--transition-smooth)',
              opacity: activeSection === 2 ? 1 : 0.05,
              transform: activeSection === 2 
                ? 'scale(1) translateY(0)' 
                : activeSection > 2 
                  ? 'scale(0.9) translateY(-60px)' 
                  : 'scale(0.9) translateY(60px)',
              zIndex: activeSection === 2 ? 10 : 1,
              pointerEvents: activeSection === 2 ? 'all' : 'none'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 600 }}>
                  <Lock size={16} color="var(--accent-teal)" /> Brand Vault Checkpoint
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-teal)', fontWeight: 700 }}>100% Locked</span>
              </div>

              {/* Brand assets panel */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Brand Colors */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>Color Palette Match</span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: '#4f46e5' }} />
                    <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: '#06b6d4' }} />
                    <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: '#111827' }} />
                  </div>
                </div>

                {/* Brand Typography */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>Typography Standard</span>
                  <span style={{ fontSize: '0.8rem', fontFamily: 'serif', color: 'var(--text-secondary)' }}>Cinzel / Inter</span>
                </div>

                {/* Brand Tone */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>Tone of Voice Check</span>
                  <span style={{
                    fontSize: '0.75rem',
                    background: 'rgba(20, 184, 166, 0.1)',
                    color: 'var(--accent-teal)',
                    padding: '2px 8px',
                    borderRadius: '100px',
                    fontWeight: 600
                  }}>Sophisticated D2C</span>
                </div>
              </div>

              {/* Status bar */}
              <div style={{
                marginTop: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px',
                background: 'rgba(20, 184, 166, 0.05)',
                border: '1px solid rgba(20, 184, 166, 0.2)',
                borderRadius: '8px',
                fontSize: '0.8rem'
              }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '100%', background: 'var(--accent-teal)', boxShadow: '0 0 8px var(--accent-teal)' }} className="pulse" />
                <span style={{ color: '#fff', fontWeight: 600 }}>Zero Brand-Guidelines Violations Detected.</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Scrollytelling;
