import React, { useState, useEffect } from 'react';
import { TrendingUp, Award, Zap, BarChart2, ShieldAlert } from 'lucide-react';

function Dashboard() {
  const [adCount, setAdCount] = useState(48291);
  const [activities, setActivities] = useState([
    { id: 1, brand: 'Nutrabay', type: 'Video Ad', status: 'Optimized', ctr: '5.2%', time: 'Just now' },
    { id: 2, brand: 'PhysicsWallah', type: 'Static Banner', status: 'ROAS Checked', ctr: '4.8%', time: '2 min ago' },
    { id: 3, brand: 'Pilgrim', type: 'TikTok Hook', status: 'Re-Generated', ctr: '6.1%', time: '5 min ago' },
    { id: 4, brand: 'Bewakoof', type: 'Insta Story', status: 'Variant B Built', ctr: '3.9%', time: '8 min ago' }
  ]);

  // Live simulation: increment count and add new activities
  useEffect(() => {
    const countInterval = setInterval(() => {
      setAdCount(prev => prev + Math.floor(Math.random() * 2) + 1);
    }, 2800);

    const activityBrands = ['Bewakoof', 'Nutrabay', 'Pilgrim', 'PhysicsWallah', 'Snitch', 'Boldfit'];
    const adTypes = ['Video Ad', 'TikTok Hook', 'Carousel', 'Reels Hook', 'YouTube Short'];
    const statuses = ['Optimized', 'ROAS Checked', 'Re-Generated', 'Variant C Built'];

    const activityInterval = setInterval(() => {
      const randomBrand = activityBrands[Math.floor(Math.random() * activityBrands.length)];
      const randomType = adTypes[Math.floor(Math.random() * adTypes.length)];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      const randomCtr = (Math.random() * (7.5 - 3.2) + 3.2).toFixed(1) + '%';

      setActivities(prev => [
        {
          id: Date.now(),
          brand: randomBrand,
          type: randomType,
          status: randomStatus,
          ctr: randomCtr,
          time: 'Just now'
        },
        ...prev.slice(0, 3)
      ]);
    }, 6000);

    return () => {
      clearInterval(countInterval);
      clearInterval(activityInterval);
    };
  }, []);

  return (
    <section id="dashboard" className="reveal-section" style={{
      padding: '100px 24px',
      maxWidth: '1200px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <h2 className="gradient-text" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', marginBottom: '16px' }}>
          Creative Velocity in Real-Time
        </h2>
        <p style={{ maxWidth: '600px', margin: '0 auto' }}>
          SuperMaya operates at unprecedented scale. Watch our Creative OS actively generating, predicting, and optimizing ads across top D2C brands.
        </p>
      </div>

      <div className="glow-dashboard glass-panel" style={{
        padding: '32px',
        borderRadius: 'var(--border-radius-lg)',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '40px',
        alignItems: 'start'
      }}>
        {/* Top summary row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '24px',
          width: '100%'
        }}>
          {/* Main 100k counter */}
          <div className="glass-panel" style={{
            padding: '24px',
            background: 'rgba(20, 184, 166, 0.02)',
            borderColor: 'rgba(20, 184, 166, 0.1)',
            gridColumn: 'span 2'
          }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-teal)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Zap size={14} /> Creative OS Target: 100,000 Ads
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginTop: '12px', marginBottom: '8px' }}>
              <span style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
                fontWeight: 800,
                fontFamily: 'var(--font-display)',
                letterSpacing: '-0.02em',
                color: '#fff',
                textShadow: '0 0 25px rgba(20, 184, 166, 0.3)'
              }}>
                {adCount.toLocaleString()}
              </span>
              <span style={{ color: 'var(--text-muted)', fontSize: '1.2rem', fontWeight: 500 }}>/ 100,000</span>
            </div>
            {/* Progress bar */}
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', height: '8px', borderRadius: '100px', overflow: 'hidden', position: 'relative' }}>
              <div style={{
                width: `${(adCount / 100000) * 100}%`,
                height: '100%',
                background: 'linear-gradient(to right, var(--accent-teal), var(--accent-indigo))',
                borderRadius: '100px',
                boxShadow: '0 0 10px var(--accent-teal)',
                transition: 'width 0.5s ease-in-out'
              }} />
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '10px' }}>
              {(adCount / 1000).toFixed(1)}% of our goal completed. Projected to cross 100k by October 2026.
            </p>
          </div>

          {/* Stat 2: ROAS */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-magenta)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <TrendingUp size={14} /> Average ROAS
            </span>
            <span style={{ display: 'block', fontSize: '2.8rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: '#fff', margin: '8px 0' }}>
              3.82x
            </span>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Compared to 2.1x industry average for D2C campaigns.
            </p>
          </div>

          {/* Stat 3: CTR Uplift */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-indigo)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BarChart2 size={14} /> CTR Uplift
            </span>
            <span style={{ display: 'block', fontSize: '2.8rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: '#fff', margin: '8px 0' }}>
              +46.3%
            </span>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Boosted by predictive AI hook pre-testing.
            </p>
          </div>
        </div>

        {/* Mid section: Graph & Realtime Activity */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          width: '100%'
        }}>
          {/* Mock Chart */}
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart2 size={18} color="var(--accent-indigo)" /> Generation Frequency (Weekly)
            </h3>
            {/* Custom SVG Bar Graph */}
            <div style={{ flex: 1, height: '180px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 8px', gap: '12px' }}>
              {[35, 45, 60, 55, 75, 90, 110, 135].map((val, idx) => (
                <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '100%',
                    height: `${val}px`,
                    background: idx === 7 ? 'var(--accent-gradient)' : 'rgba(255, 255, 255, 0.05)',
                    border: idx === 7 ? 'none' : '1px solid var(--glass-border)',
                    borderRadius: '4px 4px 0 0',
                    transition: 'var(--transition-smooth)',
                    boxShadow: idx === 7 ? '0 0 15px var(--accent-magenta-glow)' : 'none'
                  }} />
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>W{idx+1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Live Activity Feed */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={18} color="var(--accent-teal)" className="pulse" /> Live Creative Refreshes
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {activities.map((act) => (
                <div key={act.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '12px',
                  fontSize: '0.85rem',
                  transition: 'var(--transition-smooth)'
                }}>
                  <div>
                    <div style={{ fontWeight: 600, color: '#fff' }}>{act.brand}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{act.type} • {act.time}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '2px 8px',
                      background: 'rgba(20, 184, 166, 0.1)',
                      color: 'var(--accent-teal)',
                      borderRadius: '100px',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}>
                      {act.status}
                    </span>
                    <div style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 700, marginTop: '4px' }}>CTR: {act.ctr}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
