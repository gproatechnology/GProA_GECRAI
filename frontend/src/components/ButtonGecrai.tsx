interface ButtonGecraiProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  disabled?: boolean
  className?: string
}

export function ButtonGecrai({
  children,
  onClick,
  variant = 'primary',
  disabled,
  className,
}: ButtonGecraiProps) {
  const baseClasses =
    'gpc-btn gpc-btn-' +
    variant +
    ' ' +
    (className || '') +
    (disabled ? ' gpc-btn-disabled' : '')

  return (
    <button
      className={baseClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
