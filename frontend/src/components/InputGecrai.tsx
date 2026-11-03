interface InputGecraiProps {
  id?: string
  label?: string
  type?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
  className?: string
}

export function InputGecrai({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required,
  className,
}: InputGecraiProps) {
  return (
    <div className="gpc-input-group">
      {label && (
        <label
          htmlFor={id}
          className="gpc-input-label"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`gpc-input ${className || ''}`}
      />
    </div>
  )
}
