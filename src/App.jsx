import React, { useState, useEffect } from 'react';
import InteractiveBackground from './components/InteractiveBackground';
import SplashCursor from './components/SplashCursor';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import Scrollytelling from './components/Scrollytelling';
import Playground from './components/Playground';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen';
import BrandShowcase from './components/BrandShowcase';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [showSplash, setShowSplash] = useState(true);
  const [brandSplashEntered, setBrandSplashEntered] = useState(false);
  const [landingSplashEntered, setLandingSplashEntered] = useState(false);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      // Reset splash visibility when changing routes
      setShowSplash(true);
      setBrandSplashEntered(false);
      setLandingSplashEntered(false);
    };

    // Listen to browser navigation (back/forward)
    window.addEventListener('popstate', handleLocationChange);
    
    // Custom events for pushState / replaceState
    window.addEventListener('pushstate', handleLocationChange);
    window.addEventListener('replacestate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('pushstate', handleLocationChange);
      window.removeEventListener('replacestate', handleLocationChange);
    };
  }, []);

  // Simple navigate helper
  const navigate = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('pushstate'));
  };

  // --- Route 1: Brand Guidelines & Vector Logo Sandbox (Default Landing Page) ---
  if (
    currentPath === '/' ||
    currentPath === '/brand' || 
    currentPath === '/brand-testing' || 
    currentPath === '/logo-testing' || 
    currentPath === '/brand/brand'
  ) {
    return (
      <div style={{
        backgroundColor: 'var(--bg-primary)',
        minHeight: '100vh',
        width: '100vw',
        position: 'relative',
        overflowX: 'hidden'
      }}>
        {/* Render background and cursor under the showcase for an integrated tech aesthetic */}
        <InteractiveBackground />
        <SplashCursor 
          SIM_RESOLUTION={128}
          DYE_RESOLUTION={1024}
          DENSITY_DISSIPATION={4.2}
          VELOCITY_DISSIPATION={2.0}
          CURL={3.2}
          SPLAT_RADIUS={0.25}
          SPLAT_FORCE={6000}
          SHADING={true}
          RAINBOW_MODE={true}
        />

        {/* 1. Integrated Cinematic Splash Screen / Settle Header */}
        <SplashScreen 
          showEnterButton={true} 
          onEnter={() => {
            setBrandSplashEntered(true);
            window.dispatchEvent(new Event('supermaya-ad-generate'));
          }} 
          isEntered={brandSplashEntered}
        />

        {/* 2. Brand Guidelines Workspace - shifted down below the header and faded in */}
        <div 
          className={`page-content-wrapper ${brandSplashEntered ? 'visible' : 'hidden'}`}
          style={{
            marginTop: brandSplashEntered ? '0' : '60px'
          }}
        >
          <BrandShowcase onReturnHome={() => navigate('/landing')} />
        </div>
      </div>
    );
  }

  // --- Route 2: Background & Interactive Splash Screen Test ---
  if (currentPath === '/background-testing') {
    return (
      <div style={{
        backgroundColor: 'var(--bg-primary)',
        minHeight: '100vh',
        width: '100vw',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* 1. Background Visuals */}
        <InteractiveBackground />

        {/* 2. Fluid Cursor Splashes */}
        <SplashCursor 
          SIM_RESOLUTION={128}
          DYE_RESOLUTION={1024}
          DENSITY_DISSIPATION={4.2}
          VELOCITY_DISSIPATION={2.0}
          CURL={3.2}
          SPLAT_RADIUS={0.25}
          SPLAT_FORCE={6000}
          SHADING={true}
          RAINBOW_MODE={true}
        />

        {/* 3. Splash Screen Overlay */}
        {showSplash && (
          <SplashScreen 
            showEnterButton={true} 
            onEnter={() => {
              setShowSplash(false);
              // Dispatch the supernova generate event to accelerate the background logo core!
              window.dispatchEvent(new Event('supermaya-ad-generate'));
            }} 
          />
        )}

        {/* Floating Developer helper to return home */}
        {!showSplash && (
          <button 
            onClick={() => navigate('/')}
            className="home-floating-btn"
            style={{
              position: 'fixed',
              bottom: '25px',
              right: '25px',
              zIndex: 100,
              background: 'rgba(15, 12, 45, 0.6)',
              border: '1px solid rgba(20, 184, 166, 0.4)',
              color: '#14b8a6',
              padding: '10px 20px',
              fontSize: '9px',
              fontWeight: '800',
              fontFamily: 'monospace',
              letterSpacing: '0.15em',
              borderRadius: '20px',
              cursor: 'pointer',
              boxShadow: '0 0 10px rgba(20, 184, 166, 0.1)',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = 'rgba(139, 92, 246, 0.7)';
              e.target.style.boxShadow = '0 0 15px rgba(139, 92, 246, 0.3)';
              e.target.style.color = '#c084fc';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = 'rgba(20, 184, 166, 0.4)';
              e.target.style.boxShadow = '0 0 10px rgba(20, 184, 166, 0.1)';
              e.target.style.color = '#14b8a6';
            }}
          >
            ← RETURN HOME
          </button>
        )}
      </div>
    );
  }

  // --- Route 3: Upgraded Cinematic Splash Screen Route ---
  if (currentPath === '/splash' || currentPath === '/splash-screen') {
    return (
      <div style={{
        backgroundColor: 'var(--bg-primary)',
        minHeight: '100vh',
        width: '100vw',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* 1. Background Visuals */}
        <InteractiveBackground />

        {/* 2. Fluid Cursor Splashes */}
        <SplashCursor 
          SIM_RESOLUTION={128}
          DYE_RESOLUTION={1024}
          DENSITY_DISSIPATION={4.2}
          VELOCITY_DISSIPATION={2.0}
          CURL={3.2}
          SPLAT_RADIUS={0.25}
          SPLAT_FORCE={6000}
          SHADING={true}
          RAINBOW_MODE={true}
        />

        {/* 3. Upgraded Cinematic, Interactive 3D Splash Screen */}
        <SplashScreen 
          showEnterButton={true} 
          onEnter={() => {
            // Navigate back to the default brand guidelines page
            navigate('/');
            // Trigger the supernova particle blast for a high-end transition
            window.dispatchEvent(new Event('supermaya-ad-generate'));
          }} 
        />
      </div>
    );
  }

  // --- Default Route: Full Creative Storytelling Landing Page ---
  return (
    <div style={{
      backgroundColor: 'var(--bg-primary)',
      minHeight: '100vh',
      width: '100vw',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      {/* 1. Interactive, scroll-morphing background */}
      <InteractiveBackground />

      {/* 2. Interactive Fluid Canvas in the background */}
      <SplashCursor 
        SIM_RESOLUTION={128}
        DYE_RESOLUTION={1024} 
        DENSITY_DISSIPATION={4.2} 
        VELOCITY_DISSIPATION={2.0}
        CURL={3.2} 
        SPLAT_RADIUS={0.25} 
        SPLAT_FORCE={6000}
        SHADING={true}
        RAINBOW_MODE={true} 
      />

      {/* 2.5 Integrated Cinematic Splash Screen / Settle Header */}
      <SplashScreen 
        showEnterButton={true} 
        onEnter={() => {
          setLandingSplashEntered(true);
          window.dispatchEvent(new Event('supermaya-ad-generate'));
        }} 
        isEntered={landingSplashEntered}
      />

      {/* 3. Main Content Wrapper - shifted down below the header and faded in */}
      <div 
        className={`page-content-wrapper ${landingSplashEntered ? 'visible' : 'hidden'}`}
        style={{
          marginTop: landingSplashEntered ? '0' : '60px'
        }}
      >
        <main style={{ position: 'relative', zIndex: 5 }}>
          {/* Hero & Navbar */}
          <Hero />

          {/* Realtime Stats Counter & Dashboard */}
          <Dashboard />

          {/* Sticky 3-Pillar Scrollytelling Narrative */}
          <Scrollytelling />

          {/* Interactive AI Brief Playground */}
          <Playground />

          {/* Horizontal Formats Showroom Gallery */}
          <Gallery />
        </main>

        {/* Cinematic Empty Expanse - Allows the user to view the background and fluid cursor in its full glory */}
        <div style={{
          height: '75vh',
          minHeight: '500px',
          width: '100vw',
          position: 'relative',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        {/* 4. Footer & Lead Offer Form */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
