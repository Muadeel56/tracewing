import React, { forwardRef } from 'react'
import type { TextareaHTMLAttributes } from 'react'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  helperText?: string
  error?: string
  variant?: 'default' | 'filled' | 'outlined'
  textareaSize?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  className = '',
  label,
  helperText,
  error,
  variant = 'default',
  textareaSize = 'md',
  fullWidth = false,
  resize = 'vertical',
  disabled,
  required,
  id,
  ...props
}, ref) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`
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
    sm: 'px-3 py-2 text-sm rounded-md min-h-[80px]',
    md: 'px-4 py-2.5 text-sm rounded-lg min-h-[100px]',
    lg: 'px-5 py-3 text-base rounded-lg min-h-[120px]',
  }

  const resizeClasses = {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize',
  }

  const widthClass = fullWidth ? 'w-full' : ''

  const textareaClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[textareaSize]}
    ${resizeClasses[resize]}
    ${widthClass}
    ${className}
  `.replace(/\s+/g, ' ').trim()

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-primary mb-1.5"
        >
          {label}
          {required && <span className="text-danger-600 ml-1">*</span>}
        </label>
      )}
      
      <textarea
        ref={ref}
        id={textareaId}
        className={textareaClasses}
        disabled={disabled}
        required={required}
        aria-invalid={hasError}
        aria-describedby={
          error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined
        }
        {...props}
      />
      
      {error && (
        <p
          id={`${textareaId}-error`}
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
          id={`${textareaId}-helper`}
          className="mt-1.5 text-sm text-tertiary"
        >
          {helperText}
        </p>
      )}
    </div>
  )
})

Textarea.displayName = 'Textarea'

export default Textarea 