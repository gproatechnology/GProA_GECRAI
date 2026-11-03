import { useState } from 'react'

export function Logo() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="gpc-logo-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`gpc-logo ${isHovered ? 'glow' : ''}`}
      >
        {/* Círculo exterior */}
        <circle
          cx="16"
          cy="16"
          r="14"
          fill="#121212"
          stroke="#00ff00"
          strokeWidth="2"
        />
        {/* Círculo interior */}
        <circle
          cx="16"
          cy="16"
          r="10"
          fill="none"
          stroke="#00ff00"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        {/* Rayo eléctrico */}
        <path
          d="M11 12 L14 12 L14 8 L19 20 L19 20 L16 20 L16 24 L11 14 L11 14"
          fill="#00ff00"
        />
        <!-- Centro del rayo -->
        <circle cx="16" cy="16" r="1.5" fill="#00ff00" />
      </svg>
      <span className="gpc-logo-text">GECRAI</span>
    </div>
  )
}
