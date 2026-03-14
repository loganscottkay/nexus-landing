'use client';

export default function PageAtmosphere() {
  return (
    <>
      {/* Single fixed div with layered CSS gradients instead of 7 separate positioned divs */}
      <div
        className="atmosphere-zone"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          pointerEvents: 'none',
          background: `
            radial-gradient(ellipse 1200px 800px at 30% 0%, rgba(255,247,237,0.5), transparent),
            radial-gradient(ellipse 1000px 1000px at 70% 40%, rgba(224,231,255,0.3), transparent),
            radial-gradient(ellipse 800px 600px at 20% 65%, rgba(243,232,255,0.25), transparent),
            radial-gradient(ellipse 1200px 800px at 60% 90%, rgba(255,247,237,0.4), transparent)
          `,
        }}
      />

      {/* Grain texture overlay */}
      <div className="grain-overlay" />
    </>
  );
}
