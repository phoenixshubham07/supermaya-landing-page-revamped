import React, { useState, useEffect } from 'react';
import { Sparkles, Cpu, Send, CheckCircle, TrendingUp, AlertCircle, ArrowRight } from 'lucide-react';

function Playground() {
  const [brief, setBrief] = useState('A luxury smartwatch, sleek black metallic finish, floating in obsidian dark water with glowing blue splash ripples...');
  const [selectedPreset, setSelectedPreset] = useState('watch');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [adResult, setAdResult] = useState(null);

  const presets = {
    watch: {
      name: 'Chronos Smartwatch',
      brief: 'A luxury smartwatch, sleek black metallic finish, floating in obsidian dark water with glowing blue splash ripples, cinematic studio lighting, highly detailed, photorealistic, 3d render',
      image: '/watch.png',
      hook: 'TIRED OF CLUNKY SMARTWATCHES? MEET THE FUTURE OF WRISTWEAR.',
      ctr: '5.8%',
      roas: '3.9x',
      audience: 'Tech Professionals, Luxury Seekers'
    },
    matcha: {
      name: 'Zen Organic Matcha',
      brief: 'Premium organic green matcha powder in a minimalist black stone bowl, wooden bamboo scoop, soft cinematic lighting, warm earthy tones, ultra detailed, photorealistic',
      image: '/matcha.png',
      hook: 'YOUR MORNING CHAOS, CALMED. 100% ORGANIC CEREMONIAL MATCHA.',
      ctr: '4.9%',
      roas: '3.6x',
      audience: 'Wellness Enthusiasts, Clean-Label Buyers'
    },
    sneaker: {
      name: 'Aero Minimalist Sneaker',
      brief: 'A luxury minimalist leather sneaker, clean white and beige colors, levitating in a futuristic dark neon-lit studio, cinematic shadows, high fashion ad, photorealistic',
      image: '/sneaker.png',
      hook: 'WALK THE FUTURE. MINIMALIST LUXURY MEETS CLOUD COMFORT.',
      ctr: '6.4%',
      roas: '4.2x',
      audience: 'Gen Z Fashion, Minimalist Stylists'
    }
  };

  const selectPreset = (key) => {
    if (isGenerating) return;
    setSelectedPreset(key);
    setBrief(presets[key].brief);
    setAdResult(null);
  };

  const handleGenerate = (e) => {
    if (isGenerating || !brief.trim()) return;
    setIsGenerating(true);
    setGenerationStep(0);
    setProgress(0);
    setAdResult(null);

    // Dispatch custom event for particle explosion at click coordinates
    const event = new CustomEvent('supermaya-ad-generate', {
      detail: {
        x: e?.clientX || window.innerWidth * 0.75,
        y: e?.clientY || window.innerHeight * 0.5
      }
    });
    window.dispatchEvent(event);
  };

  useEffect(() => {
    if (!isGenerating) return;

    // Fast progress ticker
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 55);

    // Stage changes
    const steps = [
      'Analyzing brief semantics...',
      'Orchestrating visual frameworks...',
      'Calibrating cinematic pacing...',
      'Predicting CTR & ROAS margins...'
    ];

    const stepInterval = setInterval(() => {
      setGenerationStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(stepInterval);
          // Complete generation
          setTimeout(() => {
            setIsGenerating(false);
            setAdResult(presets[selectedPreset] || presets.watch);
          }, 600);
          return prev;
        }
        return prev + 1;
      });
    }, 1400);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, [isGenerating, selectedPreset]);

  const stepsText = [
    'Analyzing brief semantics...',
    'Orchestrating visual frameworks...',
    'Calibrating cinematic pacing...',
    'Predicting CTR & ROAS margins...'
  ];

  return (
    <section id="playground" className="reveal-section" style={{
      padding: '100px 24px',
      maxWidth: '1200px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h2 className="gradient-text" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', marginBottom: '16px' }}>
          AI Ad Creator Playground
        </h2>
        <p style={{ maxWidth: '600px', margin: '0 auto' }}>
          Experience the power of SuperMaya. Pick one of our pre-generated product briefs and see our Creative OS assemble an ad creative instantly.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '40px',
        alignItems: 'stretch'
      }}>
        
        {/* Left Panel: Brief Builder */}
        <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Cpu size={18} color="var(--accent-indigo)" /> 1. Configure Ad Brief
            </h3>
            
            {/* Presets Selection */}
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '12px' }}>
              Select Premium Preset:
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
              {Object.keys(presets).map((key) => (
                <button
                  key={key}
                  onClick={() => selectPreset(key)}
                  style={{
                    padding: '8px',
                    background: selectedPreset === key ? 'rgba(99,102,241,0.08)' : 'rgba(255, 255, 255, 0.01)',
                    border: `1px solid ${selectedPreset === key ? 'var(--accent-indigo)' : 'var(--glass-border)'}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    color: selectedPreset === key ? '#fff' : 'var(--text-secondary)',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    textAlign: 'center',
                    transition: 'var(--transition-fast)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <img
                    src={presets[key].image}
                    alt={presets[key].name}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '4px',
                      objectFit: 'cover',
                      border: '1px solid rgba(255,255,255,0.05)'
                    }}
                  />
                  <span>{presets[key].name.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* Brief Textarea */}
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
              Describe your Creative Brief:
            </span>
            <textarea
              value={brief}
              onChange={(e) => { if (!isGenerating) setBrief(e.target.value); }}
              disabled={isGenerating}
              style={{
                width: '100%',
                height: '140px',
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid var(--glass-border)',
                borderRadius: '8px',
                padding: '12px 16px',
                color: '#fff',
                fontSize: '0.9rem',
                fontFamily: 'var(--font-body)',
                lineHeight: '1.5',
                resize: 'none',
                outline: 'none',
                transition: 'var(--transition-fast)'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent-indigo)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !brief.trim()}
            className="glow-btn"
            style={{
              width: '100%',
              marginTop: '32px',
              opacity: isGenerating ? 0.6 : 1,
              cursor: isGenerating ? 'not-allowed' : 'pointer'
            }}
          >
            {isGenerating ? 'Assembling Creative...' : 'Generate Ad Mockup'} <Sparkles size={16} />
          </button>
        </div>

        {/* Right Panel: Render & Output */}
        <div className="glass-panel" style={{
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '440px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          
          {/* State 1: Idle */}
          {!isGenerating && !adResult && (
            <div style={{ textAlign: 'center', padding: '40px 24px' }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                width: '70px',
                height: '70px',
                borderRadius: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px auto',
                border: '1px solid var(--glass-border)'
              }}>
                <Send size={24} color="var(--text-muted)" />
              </div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#fff', marginBottom: '8px' }}>Awaiting Generation</h4>
              <p style={{ fontSize: '0.9rem', maxWidth: '280px', margin: '0 auto' }}>
                Fill in the creative brief on the left and click "Generate" to initiate the Creative OS.
              </p>
            </div>
          )}

          {/* State 2: Generating (Progress Circle) */}
          {isGenerating && (
            <div style={{ textAlign: 'center', zIndex: 10 }}>
              {/* Cybernetic Circle Loader */}
              <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 32px auto' }}>
                <svg width="120" height="120" viewBox="0 0 120 120">
                  {/* Background track */}
                  <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="4" />
                  {/* Progress track */}
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="url(#progressGradient)"
                    strokeWidth="4"
                    strokeDasharray={2 * Math.PI * 54}
                    strokeDashoffset={2 * Math.PI * 54 * (1 - progress / 100)}
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                    style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                  />
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="var(--accent-indigo)" />
                      <stop offset="100%" stopColor="var(--accent-magenta)" />
                    </linearGradient>
                  </defs>
                </svg>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  color: '#fff'
                }}>
                  {progress}%
                </div>
              </div>

              {/* Steps ticker */}
              <div style={{ minHeight: '50px' }}>
                <span style={{
                  display: 'inline-block',
                  background: 'rgba(255,255,255,0.04)',
                  padding: '6px 16px',
                  borderRadius: '100px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--accent-indigo)',
                  border: '1px solid var(--glass-border)'
                }}>
                  {stepsText[generationStep]}
                </span>
              </div>
            </div>
          )}

          {/* State 3: Output Display */}
          {!isGenerating && adResult && (
            <div style={{
              width: '100%',
              maxWidth: '350px',
              animation: 'fade-in-up 0.5s ease-out',
              zIndex: 10
            }}>
              {/* Ready-to-use Ad card */}
              <div className="glass-panel" style={{
                background: 'rgba(15, 14, 21, 0.85)',
                border: '1px solid var(--glass-border)',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 12px 40px rgba(0,0,0,0.6)'
              }}>
                {/* Media frame */}
                <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                  <img
                    src={adResult.image}
                    alt={adResult.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {/* Dynamic Gradient Overlay */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.85) 100%)'
                  }} />

                  {/* Performance Indicators (floating top) */}
                  <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '8px' }}>
                    <span style={{
                      background: 'rgba(20, 184, 166, 0.9)',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.7rem',
                      padding: '4px 10px',
                      borderRadius: '100px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      backdropFilter: 'blur(4px)',
                      boxShadow: '0 0 10px rgba(20, 184, 166, 0.4)'
                    }}>
                      <TrendingUp size={12} /> ROAS {adResult.roas}
                    </span>
                    <span style={{
                      background: 'rgba(99, 102, 241, 0.9)',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.7rem',
                      padding: '4px 10px',
                      borderRadius: '100px',
                      backdropFilter: 'blur(4px)'
                    }}>
                      CTR {adResult.ctr}
                    </span>
                  </div>

                  {/* Kinetic text hook overlay */}
                  <div style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '16px',
                    right: '16px'
                  }}>
                    <h4 style={{
                      fontSize: '0.95rem',
                      fontWeight: 800,
                      fontFamily: 'var(--font-display)',
                      color: '#fff',
                      lineHeight: '1.2',
                      letterSpacing: '-0.01em',
                      textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                    }}>
                      {adResult.hook}
                    </h4>
                  </div>
                </div>

                {/* Info and action */}
                <div style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                    <span>Target: {adResult.audience.split(',')[0]}</span>
                    <span style={{ color: 'var(--accent-teal)', fontWeight: 600 }}>100% Brand Safe</span>
                  </div>
                  
                  <button
                    onClick={() => alert('Ad deployed to Meta Ads Manager successfully! (Simulation)')}
                    className="glow-btn"
                    style={{
                      width: '100%',
                      padding: '10px 16px',
                      fontSize: '0.85rem',
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, #14b8a6 0%, #6366f1 100%)',
                      boxShadow: '0 4px 15px rgba(20, 184, 166, 0.2)'
                    }}
                  >
                    Deploy to Ads Manager <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}

export default Playground;
