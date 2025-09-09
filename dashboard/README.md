# TraceWing Dashboard

A modern React dashboard built with TypeScript, Vite, and Tailwind CSS v4, featuring a comprehensive design system for the TraceWing employee management platform.

## ✨ Features

- **🎨 Tailwind CSS v4** - Latest version with improved performance and developer experience
- **🌙 Dark Mode** - Complete dark/light/system theme support
- **♿ Accessibility** - WCAG 2.1 AA compliant with screen reader support
- **📱 Responsive** - Mobile-first design that works on all devices
- **🧩 Component Library** - Pre-built, consistent UI components
- **⚡ Performance** - JIT compilation and optimized bundle sizes
- **🔧 TypeScript** - Full type safety throughout the codebase

## 🎨 Design System

The dashboard features a comprehensive design system with:

### Color System
- **Primary Brand Colors**: Professional blue spectrum with excellent contrast
- **Semantic Colors**: Success (green), Warning (amber), Danger (red)
- **Neutral Palette**: Adaptive grays that work in both light and dark themes
- **Theme Colors**: Automatic color switching based on selected theme

### Typography
- **Font**: Inter with OpenType features enabled
- **Scale**: Consistent sizing from 12px to 60px
- **Weights**: Light, Normal, Medium, Semibold, Bold
- **Line Heights**: Optimized for readability

### Components
- **Button**: 7 variants, 5 sizes, loading states, icon support
- **Input**: 3 variants, validation, icons, accessibility features
- **Card**: Flexible container with header/content/footer sections
- **Badge**: Status indicators with dot and outline variants
- **Modal**: Accessible dialogs with proper focus management
- **Theme Toggle**: Seamless theme switching component

### Accessibility Features
- WCAG 2.1 AA compliant color contrasts
- Focus indicators on all interactive elements
- Screen reader compatible markup
- Keyboard navigation support
- Reduced motion preferences respected

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tracewing/dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
dashboard/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── ThemeToggle.tsx
│   │   │   └── index.ts     # Component exports
│   │   └── Layout.tsx       # Main layout component
│   ├── contexts/
│   │   └── ThemeContext.tsx # Theme management
│   ├── pages/               # Page components
│   │   ├── Dashboard.tsx
│   │   ├── Employees.tsx
│   │   ├── Attendance.tsx
│   │   ├── Payroll.tsx
│   │   ├── Geofencing.tsx
│   │   └── Notifications.tsx
│   ├── index.css           # Design system & Tailwind
│   └── main.tsx
├── docs/
│   └── design-system.md    # Complete design system docs
└── package.json
```

## 🧩 Component Usage

### Import Components
```typescript
// Individual imports
import Button from './components/ui/Button'
import Card from './components/ui/Card'

// Bulk import from index
import { Button, Card, Input, Badge, Modal } from './components/ui'
```

### Button Examples
```typescript
// Basic usage
<Button variant="primary" size="md">
  Click me
</Button>

// With icons and loading
<Button 
  variant="success" 
  leftIcon={<PlusIcon />}
  loading={isLoading}
  onClick={handleSubmit}
>
  Add Item
</Button>
```

### Input Examples
```typescript
<Input
  label="Email Address"
  placeholder="Enter your email"
  error={errors.email}
  leftIcon={<EmailIcon />}
  variant="default"
  required
/>
```

### Card Examples
```typescript
<Card variant="elevated" hover>
  <CardHeader 
    title="Dashboard Stats" 
    subtitle="Overview of key metrics"
  />
  <CardContent>
    <p>Content goes here</p>
  </CardContent>
  <CardFooter>
    <Button variant="outline">View Details</Button>
  </CardFooter>
</Card>
```

## 🌙 Theme Management

The dashboard supports three theme modes:

```typescript
import { useTheme } from './contexts/ThemeContext'

function MyComponent() {
  const { theme, actualTheme, toggleTheme } = useTheme()
  
  return (
    <div>
      <p>Current theme: {theme}</p> {/* light | dark | system */}
      <p>Actual theme: {actualTheme}</p> {/* light | dark */}
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  )
}
```

## 🎨 Custom Styling

The design system uses CSS custom properties for theming:

```css
/* Use semantic color tokens */
.my-component {
  background-color: rgb(var(--color-surface));
  color: rgb(var(--color-text-primary));
  border: 1px solid rgb(var(--color-border));
}

/* Or use Tailwind utilities */
<div className="bg-surface text-primary border border-default">
  Content
</div>
```

## 📚 Documentation

- **[Design System Guide](./docs/design-system.md)** - Complete design system documentation
- **[Component API](./docs/design-system.md#component-library)** - Detailed component usage
- **[Color Palette](./docs/design-system.md#color-system)** - All available colors
- **[Typography](./docs/design-system.md#typography)** - Font sizes and weights
- **[Accessibility](./docs/design-system.md#accessibility)** - WCAG compliance details

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

- **TypeScript** for type safety
- **ESLint** for code linting
- **Consistent naming** for components and utilities
- **Accessibility first** development approach

## 🤝 Contributing

1. Follow the established design system patterns
2. Use semantic color tokens instead of hardcoded colors
3. Ensure components work in both light and dark themes
4. Test accessibility with keyboard navigation
5. Update documentation when adding new components

## 📄 License

This project is part of the TraceWing platform.

---

**Built with ❤️ using React, TypeScript, Vite, and Tailwind CSS v4**
