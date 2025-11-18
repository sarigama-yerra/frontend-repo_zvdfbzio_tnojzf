import React from 'react'

// Organic gradient mesh + subtle grain overlay
function Background() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Radial gradient mesh */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(60% 80% at 60% 50%, rgba(44,95,77,0.35) 0%, rgba(26,26,26,0.7) 45%, rgba(26,26,26,1) 100%)',
          filter: 'saturate(1) contrast(1.05)',
        }}
      />

      {/* Slow morphing overlay using gradients */}
      <div className="absolute inset-0 pointer-events-none animate-mesh-morph opacity-70" />

      {/* Subtle grain/noise texture */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-noise" />
    </div>
  )
}

export default Background
