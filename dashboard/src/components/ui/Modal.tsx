import React, { useEffect, forwardRef } from 'react'
import type { HTMLAttributes } from 'react'

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
}

export interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {
  onClose?: () => void
  showCloseButton?: boolean
}

export interface ModalContentProps extends HTMLAttributes<HTMLDivElement> {}

export interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {}

const Modal = forwardRef<HTMLDivElement, ModalProps>(({
  children,
  className = '',
  isOpen,
  onClose,
  title,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  ...props
}, ref) => {
  useEffect(() => {
    if (!closeOnEscape) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose, closeOnEscape])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full m-4',
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={handleOverlayClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-neutral-900/50 backdrop-blur-sm" />
      
      {/* Modal */}
      <div
        ref={ref}
        className={`
          relative w-full ${sizeClasses[size]}
          bg-surface border border-default rounded-xl
          shadow-custom-xl animate-scale-in
          max-h-[90vh] overflow-hidden
          ${className}
        `.replace(/\s+/g, ' ').trim()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        {...props}
      >
        {title && (
          <ModalHeader showCloseButton onClose={onClose}>
            <h2 id="modal-title" className="text-lg font-semibold text-primary">
              {title}
            </h2>
          </ModalHeader>
        )}
        {children}
      </div>
    </div>
  )
})

const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(({
  children,
  className = '',
  onClose,
  showCloseButton = true,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={`
        flex items-center justify-between
        px-6 py-4 border-b border-default
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      {...props}
    >
      <div className="flex-1 min-w-0">
        {children}
      </div>
      {showCloseButton && onClose && (
        <button
          onClick={onClose}
          className="
            ml-4 p-1 rounded-lg
            text-tertiary hover:text-primary hover:bg-surface-hover
            transition-all duration-200 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-primary-500
          "
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
})

const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(({
  children,
  className = '',
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={`
        px-6 py-4 overflow-y-auto
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      {...props}
    >
      {children}
    </div>
  )
})

const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(({
  children,
  className = '',
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={`
        flex items-center justify-end gap-3
        px-6 py-4 border-t border-default
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      {...props}
    >
      {children}
    </div>
  )
})

Modal.displayName = 'Modal'
ModalHeader.displayName = 'ModalHeader'
ModalContent.displayName = 'ModalContent'
ModalFooter.displayName = 'ModalFooter'

export { Modal as default, ModalHeader, ModalContent, ModalFooter } 