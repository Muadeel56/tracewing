import React, { forwardRef } from 'react'
import type { HTMLAttributes } from 'react'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  hover?: boolean
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  action?: React.ReactNode
}

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

const Card = forwardRef<HTMLDivElement, CardProps>(({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
  hover = false,
  ...props
}, ref) => {
  const baseClasses = `
    rounded-xl
    transition-all duration-200 ease-in-out
    overflow-hidden
  `.trim()

  const variantClasses = {
    default: `
      bg-surface
      border border-default
      shadow-custom-sm
    `,
    elevated: `
      bg-surface
      border border-default
      shadow-custom-lg
    `,
    outlined: `
      bg-surface
      border-2 border-default
    `,
    filled: `
      bg-surface-secondary
      border border-transparent
    `,
  }

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  }

  const hoverClasses = hover ? `
    hover:shadow-custom-md hover:border-secondary
    cursor-pointer transform hover:-translate-y-0.5
  ` : ''

  return (
    <div
      ref={ref}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${paddingClasses[padding]}
        ${hoverClasses}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      {...props}
    >
      {children}
    </div>
  )
})

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(({
  children,
  className = '',
  title,
  subtitle,
  action,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={`
        flex items-start justify-between
        pb-4 border-b border-default
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      {...props}
    >
      <div className="flex-1 min-w-0">
        {title && (
          <h3 className="text-lg font-semibold text-primary leading-tight">
            {title}
          </h3>
        )}
        {subtitle && (
          <p className="mt-1 text-sm text-secondary">
            {subtitle}
          </p>
        )}
        {children}
      </div>
      {action && (
        <div className="flex-shrink-0 ml-4">
          {action}
        </div>
      )}
    </div>
  )
})

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(({
  children,
  className = '',
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={`
        py-4
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      {...props}
    >
      {children}
    </div>
  )
})

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(({
  children,
  className = '',
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={`
        flex items-center justify-between
        pt-4 border-t border-default
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = 'Card'
CardHeader.displayName = 'CardHeader'
CardContent.displayName = 'CardContent'
CardFooter.displayName = 'CardFooter'

export { Card as default, CardHeader, CardContent, CardFooter } 