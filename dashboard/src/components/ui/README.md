# UI Components Library

A comprehensive React UI components library for the TraceWing dashboard, built with TypeScript and Tailwind CSS.

## Overview

This library provides a set of reusable, accessible, and customizable UI components that follow a consistent design system. All components are built with TypeScript for type safety and use Tailwind CSS for styling.

## Components

### Button
A versatile button component with multiple variants, sizes, and states.

**Features:**
- 7 variants: `primary`, `secondary`, `outline`, `ghost`, `danger`, `success`, `warning`
- 5 sizes: `xs`, `sm`, `md`, `lg`, `xl`
- Loading state with built-in spinner
- Left and right icon support
- Full width option
- Disabled state

**Usage:**
```tsx
import { Button } from '../components/ui'

<Button variant="primary" size="md" onClick={handleClick}>
  Click me
</Button>

<Button variant="danger" loading>
  Deleting...
</Button>

<Button leftIcon={<Icon />} rightIcon={<Icon />}>
  With Icons
</Button>
```

### Input
A flexible input component with labels, validation, and various styling options.

**Features:**
- 3 variants: `default`, `filled`, `outlined`
- 3 sizes: `sm`, `md`, `lg`
- Label and helper text support
- Error state with validation messages
- Left and right icon support
- Full width option
- Required field indicator

**Usage:**
```tsx
import { Input } from '../components/ui'

<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  helperText="We'll never share your email"
  required
/>

<Input
  label="Search"
  leftIcon={<SearchIcon />}
  placeholder="Search..."
/>

<Input
  label="Username"
  error="Username is already taken"
  value={username}
  onChange={handleChange}
/>
```

### Card
A versatile card component with header, content, and footer sections.

**Features:**
- 4 variants: `default`, `elevated`, `outlined`, `filled`
- 5 padding options: `none`, `sm`, `md`, `lg`, `xl`
- Hover effects
- Structured sections: `CardHeader`, `CardContent`, `CardFooter`

**Usage:**
```tsx
import { Card, CardHeader, CardContent, CardFooter, Button } from '../components/ui'

<Card variant="elevated" hover>
  <CardHeader
    title="User Profile"
    subtitle="Manage your account"
    action={<Button size="sm">Edit</Button>}
  />
  <CardContent>
    <p>Card content goes here...</p>
  </CardContent>
  <CardFooter>
    <Button variant="secondary">Cancel</Button>
    <Button>Save</Button>
  </CardFooter>
</Card>
```

### Spinner
A loading spinner component with various sizes and color variants.

**Features:**
- 5 sizes: `xs`, `sm`, `md`, `lg`, `xl`
- 4 color variants: `primary`, `secondary`, `white`, `current`
- 3 thickness options: `thin`, `medium`, `thick`
- Accessibility attributes

**Usage:**
```tsx
import { Spinner } from '../components/ui'

<Spinner size="md" variant="primary" />

<button className="flex items-center gap-2">
  <Spinner size="sm" variant="white" />
  Loading...
</button>
```

### Textarea
A textarea component that follows the same design patterns as the Input component.

**Features:**
- 3 variants: `default`, `filled`, `outlined`
- 3 sizes: `sm`, `md`, `lg`
- Resize options: `none`, `vertical`, `horizontal`, `both`
- Label, helper text, and error support
- Full width option

**Usage:**
```tsx
import { Textarea } from '../components/ui'

<Textarea
  label="Message"
  placeholder="Enter your message..."
  rows={4}
  helperText="Maximum 500 characters"
  resize="vertical"
/>
```

### Select
A select dropdown component with consistent styling.

**Features:**
- 3 variants: `default`, `filled`, `outlined`
- 3 sizes: `sm`, `md`, `lg`
- Option groups support
- Placeholder support
- Label, helper text, and error support
- Custom dropdown arrow

**Usage:**
```tsx
import { Select } from '../components/ui'

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true },
]

<Select
  label="Choose an option"
  options={options}
  placeholder="Select..."
  onChange={handleChange}
/>
```

## Additional Components

The library also includes:
- **Badge**: Status and notification badges
- **Modal**: Dialog and modal components with header, content, and footer
- **ThemeToggle**: Dark/light mode toggle component

## Storybook Documentation

This library includes comprehensive Storybook documentation with interactive examples for all components.

### Running Storybook

```bash
# Start Storybook development server
npm run storybook

# Build Storybook for production
npm run build-storybook
```

Storybook will be available at `http://localhost:6006` and includes:
- Interactive component playground
- Documentation for all props
- Usage examples
- Accessibility testing
- Visual testing capabilities

## Design System

All components follow a consistent design system with:
- Consistent spacing and typography
- Color tokens for theming
- Focus states for accessibility
- Hover and active states
- Responsive design principles

## Accessibility

Components are built with accessibility in mind:
- Proper ARIA attributes
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- Color contrast compliance

## TypeScript Support

All components are fully typed with TypeScript:
- Comprehensive prop interfaces
- Generic type support where applicable
- Strict type checking
- IntelliSense support

## Installation & Usage

Import components from the UI library:

```tsx
import { 
  Button, 
  Input, 
  Card, 
  CardHeader, 
  CardContent, 
  CardFooter,
  Spinner,
  Textarea,
  Select,
  Badge,
  Modal
} from '../components/ui'
```

## Contributing

When adding new components:
1. Follow the existing patterns and conventions
2. Include comprehensive TypeScript types
3. Add Storybook stories with examples
4. Ensure accessibility compliance
5. Test across different screen sizes
6. Update this README with component documentation 