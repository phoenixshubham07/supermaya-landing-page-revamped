import React, { useState } from 'react';
import { Sparkles, Mail, ShieldCheck, Send, CheckCircle, ArrowUp } from 'lucide-react';

function Footer() {
  const [email, setEmail] = useState('');
  const [brand, setBrand] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !brand) return;
    setSubmitted(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      backgroundColor: 'var(--bg-secondary)',
      borderTop: '1px solid var(--glass-border)',
      padding: '100px max(24px, 4%) 40px max(24px, 4%)',
      position: 'relative',
      zIndex: 10
    }}>
      
      {/* Immersive Newsletter/CTA Section */}
      <div className="glass-panel" style={{
        maxWidth: '1200px',
        margin: '0 auto 80px auto',
        padding: '60px 40px',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(217, 70, 239, 0.05) 100%)',
        borderColor: 'rgba(255,255,255,0.08)'
      }}>
        
        {/* Ambient Glow */}
        <div style={{
          position: 'absolute',
          bottom: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '300px',
          height: '150px',
          background: 'rgba(99, 102, 241, 0.15)',
          borderRadius: '100%',
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          alignItems: 'center'
        }}>
          
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-indigo)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '16px' }}>
              Scale Your Creative
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 800, color: '#fff', marginBottom: '16px', lineHeight: '1.1' }}>
              Join the Creative OS <br />Revolution
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '420px', fontSize: '0.95rem' }}>
              Enter your brand details and claim **3 custom-generated cinematic video ads** for free. Zero credit card required.
            </p>
          </div>

          <div>
            {!submitted ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <input
                    type="text"
                    placeholder="Brand Name"
                    required
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    style={{
                      background: 'rgba(0,0,0,0.3)',
                      border: '1px solid var(--glass-border)',
                      borderRadius: '8px',
                      padding: '14px 16px',
                      color: '#fff',
                      fontSize: '0.9rem',
                      outline: 'none',
                      transition: 'var(--transition-fast)'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent-indigo)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
                  />
                  <input
                    type="email"
                    placeholder="Work Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      background: 'rgba(0,0,0,0.3)',
                      border: '1px solid var(--glass-border)',
                      borderRadius: '8px',
                      padding: '14px 16px',
                      color: '#fff',
                      fontSize: '0.9rem',
                      outline: 'none',
                      transition: 'var(--transition-fast)'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent-indigo)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
                  />
                </div>
                
                <button type="submit" className="glow-btn" style={{ width: '100%', padding: '14px' }}>
                  Claim 3 Free Video Ads <Sparkles size={16} />
                </button>

                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                  <ShieldCheck size={14} color="var(--accent-teal)" /> Fully GDPR Compliant • Instant Setup
                </span>
              </form>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '24px',
                background: 'rgba(20, 184, 166, 0.05)',
                border: '1px solid rgba(20, 184, 166, 0.2)',
                borderRadius: '12px',
                animation: 'fade-in-up 0.5s ease-out'
              }}>
                <CheckCircle size={40} color="var(--accent-teal)" style={{ margin: '0 auto 16px auto', display: 'block' }} />
                <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>Offer Claimed Successfully!</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '340px', margin: '0 auto' }}>
                  We've sent a creative onboarding link to **{email}**. Our performance brain is ready to build for **{brand}**!
                </p>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Footer Navigation & Brand Details */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '40px',
        paddingBottom: '60px',
        borderBottom: '1px solid var(--glass-border)'
      }}>
        
        {/* Brand Column */}
        <div style={{ gridColumn: 'span 2' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
            <div style={{
              background: 'var(--accent-gradient)',
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sparkles size={14} color="white" />
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', color: '#fff', letterSpacing: '-0.02em' }}>
              supermaya<span style={{ color: 'var(--accent-magenta)' }}>.ai</span>
            </span>
          </div>
          <p style={{ maxWidth: '240px', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Autogenerating 100k high-performance, brand-safe D2C ads till October 2026. Join the future of creative OS.
          </p>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            © 2026 SuperMaya. All rights reserved.
          </span>
        </div>

        {/* Links Column 1 */}
        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Platform</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
            <li><a href="#dashboard" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Live Activity</a></li>
            <li><a href="#pillars" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Creative OS</a></li>
            <li><a href="#playground" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Playground Widget</a></li>
            <li><a href="#showroom" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Ad Formats</a></li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Resources</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
            <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Creative OS Docs</a></li>
            <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>CTR Benchmarks</a></li>
            <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>D2C Case Studies</a></li>
            <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Integrations API</a></li>
          </ul>
        </div>

        {/* Links Column 3 */}
        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Company</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
            <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>About Founders</a></li>
            <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Careers</a></li>
            <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Contact Support</a></li>
            <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Privacy Policy</a></li>
          </ul>
        </div>

      </div>

      {/* Bottom Footer Section */}
      <div style={{
        maxWidth: '1200px',
        margin: '24px auto 0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.8rem',
        color: 'var(--text-muted)'
      }}>
        <span>Built for interns & D2C marketers with love from Bangalore.</span>
        
        <button
          onClick={scrollToTop}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.8rem',
            transition: 'var(--transition-fast)'
          }}
          onMouseOver={e => e.currentTarget.style.color = '#fff'}
          onMouseOut={e => e.currentTarget.style.color = 'var(--text-secondary)'}
        >
          Back to Top <ArrowUp size={14} />
        </button>
      </div>

    </footer>
  );
}

export default Footer;
