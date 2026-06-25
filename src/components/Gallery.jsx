import React, { useRef, useState, useEffect } from 'react';
import { Smartphone, RotateCw, Monitor, ArrowLeft, ArrowRight, Star, Heart } from 'lucide-react';

function Gallery() {
  const scrollRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      id: 1,
      channel: 'TikTok Video Hook',
      title: 'Tired of the Gym?',
      desc: 'High-energy cuts with auto-synced kinetic subtitles designed to capture attention in the first 0.3 seconds.',
      ctr: '6.8%',
      roas: '4.2x',
      ratio: '9:16',
      icon: <Smartphone size={16} />,
      bg: 'linear-gradient(135deg, #1f122d, #0d0614)'
    },
    {
      id: 2,
      channel: 'Instagram Reels',
      title: 'Cinematic Unboxing',
      desc: 'Macro product closeups with soft-focus shading, designed to create high-intent organic engagement.',
      ctr: '5.4%',
      roas: '3.8x',
      ratio: '9:16',
      icon: <Smartphone size={16} />,
      bg: 'linear-gradient(135deg, #101c2c, #060b13)'
    },
    {
      id: 3,
      channel: 'Meta Carousel Card',
      title: 'Feature Deep-Dive',
      desc: 'Seamless panoramic cards highlighting product details, with glowing glassmorphic overlay indicators.',
      ctr: '4.9%',
      roas: '3.5x',
      ratio: '1:1',
      icon: <Monitor size={16} />,
      bg: 'linear-gradient(135deg, #1b261f, #090e0b)'
    },
    {
      id: 4,
      channel: 'YouTube Shorts',
      title: 'Before vs. After',
      desc: 'Direct comparison narrative formats driven by fast-pacing voiceovers, scoring a 98% audio-retention index.',
      ctr: '6.1%',
      roas: '4.0x',
      ratio: '9:16',
      icon: <Smartphone size={16} />,
      bg: 'linear-gradient(135deg, #2d1010, #130606)'
    }
  ];

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const slideWidth = container.clientWidth * 0.85; // matching slide dimensions
    const index = Math.round(scrollLeft / slideWidth);
    setActiveSlide(index);
  };

  const scrollSide = (direction) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const slideWidth = container.clientWidth * 0.85;
    const targetScroll = container.scrollLeft + (direction === 'left' ? -slideWidth : slideWidth);
    container.scrollTo({ left: targetScroll, behavior: 'smooth' });
  };

  return (
    <section id="showroom" className="reveal-section" style={{
      padding: '100px 0',
      backgroundColor: 'var(--bg-primary)',
      position: 'relative',
      zIndex: 10,
      overflow: 'hidden'
    }}>
      <div style={{ padding: '0 max(24px, 4%)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', maxWidth: '1200px', margin: '0 auto 48px auto' }}>
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-magenta)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '16px' }}>
            Creative Showroom
          </span>
          <h2 className="gradient-text" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            Cinematic Formats
          </h2>
        </div>
        
        {/* Navigation Arrows */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => scrollSide('left')}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--glass-border)',
              cursor: 'pointer',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'var(--transition-fast)'
            }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
            onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
          >
            <ArrowLeft size={18} />
          </button>
          <button
            onClick={() => scrollSide('right')}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--glass-border)',
              cursor: 'pointer',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'var(--transition-fast)'
            }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
            onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Horizontal Scroller */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{
          display: 'flex',
          gap: '32px',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          padding: '24px max(24px, 4%)',
          scrollBehavior: 'smooth',
          scrollbarWidth: 'none', // Hide default Firefox scrollbar
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {/* Spacer at start */}
        <div style={{ flexShrink: 0, width: 'calc((100vw - min(1200px, 90vw)) / 2 - 32px)', display: 'block' }} />

        {slides.map((slide, idx) => {
          const isActive = idx === activeSlide;
          
          return (
            <div
              key={slide.id}
              className="showroom-card glass-panel"
              style={{
                flexShrink: 0,
                width: 'min(380px, 80vw)',
                height: '480px',
                padding: '28px',
                scrollSnapAlign: 'center',
                background: slide.bg,
                border: isActive ? '1px solid rgba(217, 70, 239, 0.4)' : '1px solid var(--glass-border)',
                boxShadow: isActive ? '0 12px 40px rgba(217, 70, 239, 0.15)' : '0 8px 32px 0 var(--glass-shadow)',
                transform: isActive ? 'scale(1.02) rotateY(0deg)' : 'scale(0.96) rotateY(5deg)',
                opacity: isActive ? 1 : 0.6,
                transition: 'var(--transition-smooth)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Background ambient glow for active */}
              {isActive && (
                <div style={{
                  position: 'absolute',
                  top: '-10%',
                  right: '-10%',
                  width: '180px',
                  height: '180px',
                  background: 'rgba(217, 70, 239, 0.12)',
                  borderRadius: '100%',
                  filter: 'blur(40px)',
                  pointerEvents: 'none'
                }} />
              )}

              {/* Card Header */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    {slide.icon} {slide.channel}
                  </span>
                  <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.04)', padding: '2px 8px', borderRadius: '100px', border: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
                    Ratio {slide.ratio}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>
                  "{slide.title}"
                </h3>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  {slide.desc}
                </p>
              </div>

              {/* Card Footer / Metrics */}
              <div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                  padding: '16px',
                  background: 'rgba(0,0,0,0.2)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '12px',
                  marginBottom: '20px'
                }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>Average CTR</span>
                    <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-magenta)' }}>{slide.ctr}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>Average ROAS</span>
                    <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-indigo)' }}>{slide.roas}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Star size={14} color="#fbbf24" style={{ fill: '#fbbf24' }} /> Best Seller Hook
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Heart size={14} color="var(--accent-magenta)" style={{ fill: 'var(--accent-magenta)' }} /> 98% Ret.
                  </span>
                </div>
              </div>

            </div>
          );
        })}

        {/* Spacer at end */}
        <div style={{ flexShrink: 0, width: 'calc((100vw - min(1200px, 90vw)) / 2 - 32px)', display: 'block' }} />
      </div>

      {/* Progress Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
        {slides.map((_, idx) => (
          <div
            key={idx}
            style={{
              width: idx === activeSlide ? '24px' : '8px',
              height: '8px',
              borderRadius: '100px',
              background: idx === activeSlide ? 'var(--accent-magenta)' : 'rgba(255,255,255,0.1)',
              transition: 'var(--transition-smooth)'
            }}
          />
        ))}
      </div>
    </section>
  );
}

export default Gallery;
