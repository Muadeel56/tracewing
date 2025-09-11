import React, { forwardRef } from 'react'
import type { SelectHTMLAttributes } from 'react'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string
  helperText?: string
  error?: string
  variant?: 'default' | 'filled' | 'outlined'
  selectSize?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  options: SelectOption[]
  placeholder?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  className = '',
  label,
  helperText,
  error,
  variant = 'default',
  selectSize = 'md',
  fullWidth = false,
  options,
  placeholder,
  disabled,
  required,
  id,
  ...props
}, ref) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`
  const hasError = Boolean(error)

  const baseClasses = `
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface
    disabled:opacity-50 disabled:cursor-not-allowed
    appearance-none cursor-pointer
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
    sm: 'px-3 py-2 pr-8 text-sm rounded-md',
    md: 'px-4 py-2.5 pr-10 text-sm rounded-lg',
    lg: 'px-5 py-3 pr-12 text-base rounded-lg',
  }

  const widthClass = fullWidth ? 'w-full' : ''

  const selectClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[selectSize]}
    ${widthClass}
    ${className}
  `.replace(/\s+/g, ' ').trim()

  const iconSize = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-primary mb-1.5"
        >
          {label}
          {required && <span className="text-danger-600 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          className={selectClasses}
          disabled={disabled}
          required={required}
          aria-invalid={hasError}
          aria-describedby={
            error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined
          }
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        
        {/* Dropdown Arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className={`${iconSize[selectSize]} ${hasError ? 'text-danger-600' : 'text-tertiary'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      
      {error && (
        <p
          id={`${selectId}-error`}
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
          id={`${selectId}-helper`}
          className="mt-1.5 text-sm text-tertiary"
        >
          {helperText}
        </p>
      )}
    </div>
  )
})

Select.displayName = 'Select'

export default Select 