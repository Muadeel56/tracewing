import React, { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  ...props
}, ref) => {
  const baseClasses = `
    inline-flex items-center justify-center
    font-medium rounded-lg
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface
    disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
    relative overflow-hidden
  `.trim()

  const variantClasses = {
    primary: `
      bg-primary hover:bg-primary-hover active:bg-primary-active
      text-inverse border border-transparent
      focus:ring-focus
      shadow-custom-sm hover:shadow-custom-md
    `,
    secondary: `
      bg-surface-secondary hover:bg-surface-secondary-hover
      text-primary border border-default hover:border-hover
      focus:ring-focus
      shadow-custom-sm hover:shadow-custom-md
    `,
    outline: `
      bg-transparent hover:bg-surface-hover
      text-primary border border-primary hover:border-primary
      focus:ring-focus
    `,
    ghost: `
      bg-transparent hover:bg-surface-hover
      text-secondary hover:text-hover
      border border-transparent
      focus:ring-focus
    `,
    danger: `
      bg-danger hover:bg-danger-hover active:bg-danger-active
      text-inverse border border-transparent
      focus:ring-danger
      shadow-custom-sm hover:shadow-custom-md
    `,
    success: `
      bg-success hover:bg-success-hover active:bg-success-active
      text-inverse border border-transparent
      focus:ring-success
      shadow-custom-sm hover:shadow-custom-md
    `,
    warning: `
      bg-warning hover:bg-warning-hover active:bg-warning-active
      text-inverse border border-transparent
      focus:ring-warning
      shadow-custom-sm hover:shadow-custom-md
    `,
  }

  const sizeClasses = {
    xs: 'px-2.5 py-1.5 text-xs gap-1',
    sm: 'px-3 py-2 text-sm gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-5 py-3 text-base gap-2',
    xl: 'px-6 py-3.5 text-base gap-2.5',
  }

  const widthClass = fullWidth ? 'w-full' : ''

  const LoadingSpinner = () => (
    <svg
      className="animate-spin h-4 w-4"
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
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )

  return (
    <button
      ref={ref}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${widthClass}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {!loading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </button>
  )
})

Button.displayName = 'Button'

export default Button 