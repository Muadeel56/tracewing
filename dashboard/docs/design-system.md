# TraceWing Design System

## Overview

TraceWing uses Tailwind CSS v4 with a comprehensive design system that ensures consistency, accessibility, and scalability across the platform. This design system includes custom tokens, components, and utilities built specifically for the TraceWing dashboard.

## ✅ Features

- **Tailwind CSS v4** - Latest version with improved performance and DX
- **Design Tokens** - Comprehensive color, typography, and spacing systems
- **Dark Mode Support** - Seamless light/dark theme switching
- **Accessibility First** - WCAG 2.1 AA compliant
- **Component Library** - Pre-built, consistent UI components
- **Custom Utilities** - Specialized classes for common patterns

## 🎨 Color System

### Brand Colors (Blue Spectrum)
Our primary brand color is based on a blue spectrum that maintains excellent contrast ratios across both light and dark themes.

```css
/* Primary Brand Colors */
--color-primary-50: 239 246 255;   /* Lightest blue */
--color-primary-100: 219 234 254;
--color-primary-200: 191 219 254;
--color-primary-300: 147 197 253;
--color-primary-400: 96 165 250;
--color-primary-500: 59 130 246;   /* Primary brand color */
--color-primary-600: 37 99 235;
--color-primary-700: 29 78 216;
--color-primary-800: 30 64 175;
--color-primary-900: 30 58 138;
--color-primary-950: 23 37 84;     /* Darkest blue */
```

### Semantic Colors

#### Success (Green)
```css
--color-success-500: 34 197 94;    /* Primary success color */
--color-success-600: 22 163 74;    /* Hover state */
```

#### Warning (Amber)
```css
--color-warning-500: 245 158 11;   /* Primary warning color */
--color-warning-600: 217 119 6;    /* Hover state */
```

#### Danger (Red)
```css
--color-danger-500: 239 68 68;     /* Primary danger color */
--color-danger-600: 220 38 38;     /* Hover state */
```

### Neutral Colors
Our neutral palette provides excellent contrast and works seamlessly with both light and dark themes.

```css
/* Light Theme Neutrals */
--color-neutral-50: 250 250 250;   /* Lightest */
--color-neutral-100: 245 245 245;
--color-neutral-200: 229 229 229;
--color-neutral-500: 115 115 115;  /* Mid-tone */
--color-neutral-900: 23 23 23;     /* Darkest */
```

### Theme Colors
Semantic color tokens that automatically adapt to light/dark themes:

```css
/* These automatically switch based on theme */
--color-background: /* Light: neutral-50, Dark: neutral-950 */
--color-surface: /* Light: white, Dark: neutral-900 */
--color-text-primary: /* Light: neutral-900, Dark: neutral-50 */
--color-border: /* Light: neutral-200, Dark: neutral-700 */
```

## 📝 Typography

### Font Family
- **Primary**: Inter (with OpenType features enabled)
- **Monospace**: JetBrains Mono, Fira Code, Consolas

### Font Sizes
```css
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;     /* 24px */
--text-3xl: 1.875rem;   /* 30px */
--text-4xl: 2.25rem;    /* 36px */
--text-5xl: 3rem;       /* 48px */
--text-6xl: 3.75rem;    /* 60px */
```

### Font Weights
```css
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Line Heights
```css
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
```

## 📏 Spacing System

Based on a 4px grid system for consistent spacing:

```css
--space-1: 0.25rem;     /* 4px */
--space-2: 0.5rem;      /* 8px */
--space-3: 0.75rem;     /* 12px */
--space-4: 1rem;        /* 16px */
--space-5: 1.25rem;     /* 20px */
--space-6: 1.5rem;      /* 24px */
--space-8: 2rem;        /* 32px */
--space-10: 2.5rem;     /* 40px */
--space-12: 3rem;       /* 48px */
--space-16: 4rem;       /* 64px */
```

## 🔄 Border Radius

```css
--radius-sm: 0.125rem;   /* 2px */
--radius: 0.25rem;       /* 4px */
--radius-md: 0.375rem;   /* 6px */
--radius-lg: 0.5rem;     /* 8px */
--radius-xl: 0.75rem;    /* 12px */
--radius-2xl: 1rem;      /* 16px */
--radius-full: 9999px;   /* Fully rounded */
```

## 🎭 Dark Mode

Dark mode is implemented using CSS custom properties that automatically switch values. The theme is controlled by the `ThemeContext` and supports:

- **Light Mode**: Traditional light interface
- **Dark Mode**: Dark interface optimized for low-light conditions
- **System Mode**: Automatically follows user's system preference

### Usage
```typescript
import { useTheme } from '../contexts/ThemeContext'

const { theme, toggleTheme, actualTheme } = useTheme()
```

## 🧩 Component Library

### Button
Versatile button component with multiple variants and sizes.

```typescript
import Button from '../components/ui/Button'

<Button variant="primary" size="md" loading={false}>
  Click me
</Button>
```

**Variants**: `primary`, `secondary`, `outline`, `ghost`, `danger`, `success`, `warning`
**Sizes**: `xs`, `sm`, `md`, `lg`, `xl`

### Input
Comprehensive form input with labels, validation, and icons.

```typescript
import Input from '../components/ui/Input'

<Input
  label="Email"
  placeholder="Enter your email"
  error="This field is required"
  leftIcon={<EmailIcon />}
  variant="default"
  size="md"
/>
```

**Variants**: `default`, `filled`, `outlined`
**Sizes**: `sm`, `md`, `lg`

### Card
Flexible container component for content grouping.

```typescript
import Card, { CardHeader, CardContent, CardFooter } from '../components/ui/Card'

<Card variant="default" hover>
  <CardHeader title="Card Title" subtitle="Description" />
  <CardContent>
    Content goes here
  </CardContent>
  <CardFooter>
    Footer content
  </CardFooter>
</Card>
```

**Variants**: `default`, `elevated`, `outlined`, `filled`
**Padding**: `none`, `sm`, `md`, `lg`, `xl`

### Badge
Small status indicators and labels.

```typescript
import Badge from '../components/ui/Badge'

<Badge variant="primary" size="md" outline>
  New
</Badge>
```

**Variants**: `default`, `primary`, `success`, `warning`, `danger`
**Sizes**: `sm`, `md`, `lg`

### Modal
Accessible modal dialogs with proper focus management.

```typescript
import Modal, { ModalHeader, ModalContent, ModalFooter } from '../components/ui/Modal'

<Modal isOpen={isOpen} onClose={onClose} title="Modal Title" size="md">
  <ModalContent>
    Modal content
  </ModalContent>
  <ModalFooter>
    <Button onClick={onClose}>Close</Button>
  </ModalFooter>
</Modal>
```

**Sizes**: `sm`, `md`, `lg`, `xl`, `full`

## 🎨 Custom Utilities

### Theme Utilities
```css
.bg-surface           /* Adaptive surface background */
.text-primary         /* Primary text color */
.text-secondary       /* Secondary text color */
.border-default       /* Default border color */
```

### Interactive States
```css
.hover\:bg-primary-hover:hover    /* Primary hover state */
.focus\:ring-focus:focus          /* Focus ring */
.active\:bg-primary-active:active /* Active state */
```

### Animation Utilities
```css
.animate-fade-in      /* Fade in animation */
.animate-slide-up     /* Slide up animation */
.animate-scale-in     /* Scale in animation */
```

### Shadow Utilities
```css
.shadow-custom        /* Default shadow */
.shadow-custom-sm     /* Small shadow */
.shadow-custom-md     /* Medium shadow */
.shadow-custom-lg     /* Large shadow */
.shadow-custom-xl     /* Extra large shadow */
```

## ♿ Accessibility

### WCAG 2.1 AA Compliance
- All color combinations meet minimum contrast ratios (4.5:1 for normal text, 3:1 for large text)
- Focus indicators are clearly visible with 2px outline offset
- Interactive elements have minimum 44px touch targets

### Screen Reader Support
- Semantic HTML elements used throughout
- ARIA labels and descriptions provided where needed
- Proper heading hierarchy maintained

### Reduced Motion
Respects user's motion preferences:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Focus management in modals and dropdowns
- Escape key support for dismissible components

## 📱 Responsive Design

The design system is mobile-first with breakpoints:
- `sm`: 640px and up
- `md`: 768px and up
- `lg`: 1024px and up
- `xl`: 1280px and up
- `2xl`: 1536px and up

## 🖨️ Print Styles

Print-optimized utilities:
```css
.print-hidden         /* Hide in print */
.print-visible        /* Show only in print */
```

All print styles use high contrast and remove unnecessary colors.

## 🚀 Performance

### JIT Compilation
Tailwind CSS v4 includes Just-In-Time compilation for optimal bundle sizes.

### CSS Custom Properties
Design tokens use CSS custom properties for efficient theme switching without JavaScript.

### Minimal Bundle Size
Only used utilities are included in the final CSS bundle.

## 📦 Installation & Setup

The design system is already configured in this project. For new projects:

1. Install dependencies:
```bash
npm install tailwindcss@^4.1.11 @tailwindcss/vite@^4.1.11
```

2. Add to Vite config:
```typescript
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

3. Import in your CSS:
```css
@import "tailwindcss";
```

## 🤝 Contributing

When adding new components or utilities:

1. Follow existing naming conventions
2. Use design tokens from the CSS custom properties
3. Ensure accessibility compliance
4. Test in both light and dark themes
5. Update documentation

## 📚 Examples

Check the `/src/pages/Dashboard.tsx` file for real-world usage examples of all components and utilities.

---

*This design system ensures consistent, accessible, and beautiful user interfaces across the TraceWing platform.* 