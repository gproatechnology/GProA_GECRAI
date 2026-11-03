import { Logo } from './Logo'

export function Logo() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="8" fill="#00ff00" />
      <path
        d="M8 8L24 24M24 8L8 24"
        stroke="#121212"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}
