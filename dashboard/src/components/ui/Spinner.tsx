import React, { forwardRef } from 'react'
import type { HTMLAttributes } from 'react'

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'primary' | 'secondary' | 'white' | 'current'
  thickness?: 'thin' | 'medium' | 'thick'
}

const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(({
  className = '',
  size = 'md',
  variant = 'primary',
  thickness = 'medium',
  ...props
}, ref) => {
  const sizeClasses = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
  }

  const variantClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    white: 'text-white',
    current: 'text-current',
  }

  const thicknessClasses = {
    thin: 'stroke-1',
    medium: 'stroke-2',
    thick: 'stroke-4',
  }

  return (
    <div
      ref={ref}
      className={`
        inline-block animate-spin
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      role="status"
      aria-label="Loading"
      {...props}
    >
      <svg
        className={`w-full h-full ${thicknessClasses[thickness]}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  )
})

Spinner.displayName = 'Spinner'

export default Spinner 