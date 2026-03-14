'use client';

export default function PageAtmosphere() {
  return (
    <>
      {/* Gradient Zones - warm→cool→warm color shifts */}
      <div
        className="atmosphere-zone"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          pointerEvents: 'none',
        }}
      >
        {/* Zone 1: Warm cream glow at top */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 1200px 800px at 30% 0%, rgba(255,247,237,0.5), transparent)',
          }}
        />
        {/* Zone 2: Cool blue-lavender in middle */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 1000px 1000px at 70% 40%, rgba(224,231,255,0.3), transparent)',
          }}
        />
        {/* Zone 3: Soft violet lower middle */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 800px 600px at 20% 65%, rgba(243,232,255,0.25), transparent)',
          }}
        />
        {/* Zone 4: Warm again at bottom */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 1200px 800px at 60% 90%, rgba(255,247,237,0.4), transparent)',
          }}
        />
      </div>

      {/* Grain texture overlay */}
      <div className="grain-overlay" />

      {/* Ambient glow spots */}
      <div
        className="atmosphere-glows"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          pointerEvents: 'none',
        }}
      >
        {/* Glow 1: behind hero headline */}
        <div
          className="atmosphere-glow-spot"
          style={{
            position: 'absolute',
            left: '50%',
            top: '10%',
            width: 500,
            height: 500,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.03), transparent 70%)',
          }}
        />
        {/* Glow 2: near phone mockups area */}
        <div
          className="atmosphere-glow-spot"
          style={{
            position: 'absolute',
            left: '80%',
            top: '60%',
            width: 400,
            height: 400,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168,85,247,0.025), transparent 70%)',
          }}
        />
        {/* Glow 3: behind Ready to Join */}
        <div
          className="atmosphere-glow-spot"
          style={{
            position: 'absolute',
            left: '50%',
            bottom: '5%',
            width: 450,
            height: 450,
            transform: 'translate(-50%, 0)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.02), transparent 70%)',
          }}
        />
      </div>
    </>
  );
}
