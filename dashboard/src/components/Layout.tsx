import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ThemeToggle from './ui/ThemeToggle'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation()
  
  const navigation = [
    { name: 'Dashboard', href: '/', icon: '📊' },
    { name: 'Employees', href: '/employees', icon: '👥' },
    { name: 'Attendance', href: '/attendance', icon: '📅' },
    { name: 'Payroll', href: '/payroll', icon: '💰' },
    { name: 'Geofencing', href: '/geofencing', icon: '🗺️' },
    { name: 'Notifications', href: '/notifications', icon: '🔔' },
  ]

  return (
    <div className="min-h-screen bg-background flex animate-fade-in">
      {/* Sidebar */}
      <div className="w-64 bg-surface shadow-custom-lg border-r border-default">
        <div className="p-6 border-b border-default">
          <h1 className="text-2xl font-bold text-primary">TraceWing</h1>
          <p className="text-sm text-secondary mt-1">Employee Management</p>
        </div>
        
        <nav className="mt-6 px-3">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  flex items-center px-3 py-3 mb-1
                  text-sm font-medium rounded-lg
                  transition-all duration-200 ease-in-out
                  group relative overflow-hidden
                  ${isActive
                    ? 'bg-primary-100 text-primary-700 border-r-2 border-primary shadow-custom-sm'
                    : 'text-secondary hover:bg-surface-secondary hover:text-primary'
                  }
                `.replace(/\s+/g, ' ').trim()}
              >
                <span className="mr-3 text-lg transition-transform duration-200 group-hover:scale-110">
                  {item.icon}
                </span>
                <span className="relative z-10">{item.name}</span>
                {isActive && (
                  <div className="absolute inset-0 bg-primary-50 opacity-50" />
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-surface shadow-custom border-b border-default">
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-primary">
                {navigation.find(item => item.href === location.pathname)?.name || 'Dashboard'}
              </h2>
              <p className="text-sm text-secondary mt-0.5">
                Welcome back! Here's what's happening today.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-sm font-medium text-primary-700">U</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 bg-background">
          <div className="max-w-7xl mx-auto animate-slide-up">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout 