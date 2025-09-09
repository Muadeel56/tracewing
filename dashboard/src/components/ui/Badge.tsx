import { forwardRef } from 'react'
import type { HTMLAttributes } from 'react'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  dot?: boolean
  outline?: boolean
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(({
  children,
  className = '',
  variant = 'default',
  size = 'md',
  dot = false,
  outline = false,
  ...props
}, ref) => {
  const baseClasses = `
    inline-flex items-center justify-center
    font-medium rounded-full
    transition-all duration-200 ease-in-out
  `.trim()

  const variantClasses = {
    default: outline 
      ? 'bg-transparent border border-default text-secondary hover:bg-surface-hover'
      : 'bg-surface-secondary text-secondary border border-transparent',
    primary: outline
      ? 'bg-transparent border border-primary-300 text-primary-600 hover:bg-primary-50'
      : 'bg-primary text-inverse border border-transparent',
    success: outline
      ? 'bg-transparent border border-success-300 text-success-600 hover:bg-success-50'
      : 'bg-success text-inverse border border-transparent',
    warning: outline
      ? 'bg-transparent border border-warning-300 text-warning-600 hover:bg-warning-50'
      : 'bg-warning text-inverse border border-transparent',
    danger: outline
      ? 'bg-transparent border border-danger-300 text-danger-600 hover:bg-danger-50'
      : 'bg-danger text-inverse border border-transparent',
  }

  const sizeClasses = {
    sm: dot ? 'w-2 h-2' : 'px-2 py-0.5 text-xs min-h-[1.25rem]',
    md: dot ? 'w-2.5 h-2.5' : 'px-2.5 py-1 text-xs min-h-[1.5rem]',
    lg: dot ? 'w-3 h-3' : 'px-3 py-1.5 text-sm min-h-[1.75rem]',
  }

  if (dot) {
    return (
      <span
        ref={ref}
        className={`
          ${baseClasses}
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${className}
        `.replace(/\s+/g, ' ').trim()}
        {...props}
      />
    )
  }

  return (
    <span
      ref={ref}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      {...props}
    >
      {children}
    </span>
  )
})

Badge.displayName = 'Badge'

export default Badge 