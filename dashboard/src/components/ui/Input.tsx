import React, { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  error?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  variant?: 'default' | 'filled' | 'outlined'
  inputSize?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  className = '',
  label,
  helperText,
  error,
  leftIcon,
  rightIcon,
  variant = 'default',
  inputSize = 'md',
  fullWidth = false,
  disabled,
  required,
  id,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
  const hasError = Boolean(error)

  const baseClasses = `
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface
    disabled:opacity-50 disabled:cursor-not-allowed
    placeholder:text-tertiary
  `.trim()

  const variantClasses = {
    default: `
      bg-surface border border-default hover:border-secondary
      focus:border-focus focus:ring-focus
      ${hasError ? 'border-danger-600 focus:border-danger-600 focus:ring-danger' : ''}
    `,
    filled: `
      bg-surface-secondary border border-transparent
      hover:bg-surface-tertiary focus:bg-surface
      focus:border-focus focus:ring-focus
      ${hasError ? 'bg-danger-50 border-danger-600 focus:border-danger-600 focus:ring-danger' : ''}
    `,
    outlined: `
      bg-transparent border-2 border-default hover:border-secondary
      focus:border-focus focus:ring-focus
      ${hasError ? 'border-danger-600 focus:border-danger-600 focus:ring-danger' : ''}
    `,
  }

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm rounded-md',
    md: 'px-4 py-2.5 text-sm rounded-lg',
    lg: 'px-5 py-3 text-base rounded-lg',
  }

  const widthClass = fullWidth ? 'w-full' : ''

  const inputClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[inputSize]}
    ${widthClass}
    ${leftIcon ? 'pl-10' : ''}
    ${rightIcon ? 'pr-10' : ''}
    ${className}
  `.replace(/\s+/g, ' ').trim()

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-primary mb-1.5"
        >
          {label}
          {required && <span className="text-danger-600 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-tertiary">{leftIcon}</span>
          </div>
        )}
        
        <input
          ref={ref}
          id={inputId}
          className={inputClasses}
          disabled={disabled}
          required={required}
          aria-invalid={hasError}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <span className={`${hasError ? 'text-danger-600' : 'text-tertiary'}`}>
              {rightIcon}
            </span>
          </div>
        )}
      </div>
      
      {error && (
        <p
          id={`${inputId}-error`}
          className="mt-1.5 text-sm text-danger-600 flex items-center gap-1"
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p
          id={`${inputId}-helper`}
          className="mt-1.5 text-sm text-tertiary"
        >
          {helperText}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
