import type { Meta, StoryObj } from '@storybook/react'
import Spinner from './Spinner'

const meta: Meta<typeof Spinner> = {
  title: 'UI/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A loading spinner component with various sizes and color variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'white', 'current'],
    },
    thickness: {
      control: { type: 'select' },
      options: ['thin', 'medium', 'thick'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Spinner size="xs" />
        <span className="text-sm">XS</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="sm" />
        <span className="text-sm">SM</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="md" />
        <span className="text-sm">MD</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="lg" />
        <span className="text-sm">LG</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="xl" />
        <span className="text-sm">XL</span>
      </div>
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="primary" />
        <span className="text-sm">Primary</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="secondary" />
        <span className="text-sm">Secondary</span>
      </div>
      <div className="flex flex-col items-center gap-2 bg-gray-800 p-4 rounded">
        <Spinner variant="white" />
        <span className="text-sm text-white">White</span>
      </div>
      <div className="flex flex-col items-center gap-2 text-blue-600">
        <Spinner variant="current" />
        <span className="text-sm">Current</span>
      </div>
    </div>
  ),
}

export const Thickness: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Spinner thickness="thin" size="lg" />
        <span className="text-sm">Thin</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner thickness="medium" size="lg" />
        <span className="text-sm">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner thickness="thick" size="lg" />
        <span className="text-sm">Thick</span>
      </div>
    </div>
  ),
}

export const InButton: Story = {
  render: () => (
    <div className="flex gap-4">
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
        <Spinner size="sm" variant="white" />
        Loading...
      </button>
      <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2">
        <Spinner size="sm" variant="current" />
        Processing...
      </button>
    </div>
  ),
} 