/**
 * Custom geometric shape components used instead of traditional icons.
 * Each shape represents a concept visually.
 */

export function EnergyOrb({ size = 60, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" className={className}>
      <defs>
        <radialGradient id="orbGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.8" />
          <stop offset="70%" stopColor="#A78BFA" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="30" cy="30" r="28" fill="url(#orbGrad)" />
      <circle cx="30" cy="30" r="15" fill="none" stroke="#22D3EE" strokeWidth="0.5" opacity="0.6" />
      <circle cx="30" cy="30" r="8" fill="#22D3EE" opacity="0.3" />
      <circle cx="30" cy="30" r="3" fill="#22D3EE" opacity="0.9" />
    </svg>
  )
}

export function HexGrid({ size = 80, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" className={className}>
      <defs>
        <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <polygon points="40,5 70,20 70,50 40,65 10,50 10,20" fill="none" stroke="url(#hexGrad)" strokeWidth="1" />
      <polygon points="40,15 58,25 58,45 40,55 22,45 22,25" fill="none" stroke="#A78BFA" strokeWidth="0.5" opacity="0.4" />
      <polygon points="40,25 48,30 48,40 40,45 32,40 32,30" fill="#A78BFA" opacity="0.15" />
    </svg>
  )
}

export function PulseWave({ width = 120, height = 40, className = '' }) {
  return (
    <svg width={width} height={height} viewBox="0 0 120 40" className={className}>
      <path
        d="M0,20 Q15,5 30,20 T60,20 T90,20 T120,20"
        fill="none"
        stroke="#22D3EE"
        strokeWidth="1.5"
        className="flow-line"
        opacity="0.6"
      />
      <path
        d="M0,20 Q15,35 30,20 T60,20 T90,20 T120,20"
        fill="none"
        stroke="#A78BFA"
        strokeWidth="1"
        className="flow-line"
        opacity="0.3"
        style={{ animationDelay: '0.5s' }}
      />
    </svg>
  )
}

export function DataFlow({ size = 100, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <defs>
        <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="100%" stopColor="#FB923C" />
        </linearGradient>
      </defs>
      {/* Input nodes */}
      <circle cx="15" cy="20" r="4" fill="#22D3EE" opacity="0.8" />
      <circle cx="15" cy="40" r="4" fill="#22D3EE" opacity="0.8" />
      <circle cx="15" cy="60" r="4" fill="#22D3EE" opacity="0.8" />
      <circle cx="15" cy="80" r="4" fill="#22D3EE" opacity="0.8" />
      {/* Hidden layer */}
      <circle cx="50" cy="30" r="5" fill="#A78BFA" opacity="0.6" />
      <circle cx="50" cy="50" r="5" fill="#A78BFA" opacity="0.6" />
      <circle cx="50" cy="70" r="5" fill="#A78BFA" opacity="0.6" />
      {/* Output */}
      <circle cx="85" cy="50" r="6" fill="#FB923C" opacity="0.8" />
      {/* Connections */}
      {[20, 40, 60, 80].map(y1 =>
        [30, 50, 70].map(y2 => (
          <line key={`${y1}-${y2}`} x1="19" y1={y1} x2="45" y2={y2} stroke="url(#flowGrad)" strokeWidth="0.5" opacity="0.3" />
        ))
      )}
      {[30, 50, 70].map(y => (
        <line key={y} x1="55" y1={y} x2="79" y2="50" stroke="#FB923C" strokeWidth="0.5" opacity="0.3" />
      ))}
    </svg>
  )
}

export function FireIcon({ size = 32, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className}>
      <defs>
        <linearGradient id="fireGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#FB923C" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <path
        d="M16 4 C16 4 22 10 22 18 C22 22 19 26 16 26 C13 26 10 22 10 18 C10 10 16 4 16 4Z"
        fill="url(#fireGrad)"
        opacity="0.7"
      />
      <path
        d="M16 12 C16 12 19 15 19 19 C19 21 17.5 23 16 23 C14.5 23 13 21 13 19 C13 15 16 12 16 12Z"
        fill="#22D3EE"
        opacity="0.5"
      />
    </svg>
  )
}

export function OrbitRings({ size = 200, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" className={className}>
      <ellipse cx="100" cy="100" rx="90" ry="90" fill="none" stroke="#22D3EE" strokeWidth="0.5" opacity="0.2" className="orbit-ring" />
      <ellipse cx="100" cy="100" rx="65" ry="65" fill="none" stroke="#A78BFA" strokeWidth="0.5" opacity="0.2" className="orbit-ring-reverse" />
      <ellipse cx="100" cy="100" rx="40" ry="40" fill="none" stroke="#FB923C" strokeWidth="0.5" opacity="0.2" className="orbit-ring" />
      {/* Orbiting dots */}
      <circle cx="190" cy="100" r="3" fill="#22D3EE" className="orbit-ring" style={{ transformOrigin: '100px 100px' }} />
      <circle cx="165" cy="100" r="2.5" fill="#A78BFA" className="orbit-ring-reverse" style={{ transformOrigin: '100px 100px' }} />
      <circle cx="140" cy="100" r="2" fill="#FB923C" className="orbit-ring" style={{ transformOrigin: '100px 100px' }} />
    </svg>
  )
}
