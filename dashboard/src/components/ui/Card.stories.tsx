import type { Meta, StoryObj } from '@storybook/react'
import Card, { CardHeader, CardContent, CardFooter } from './Card'
import Button from './Button'

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile card component with header, content, and footer sections.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'elevated', 'outlined', 'filled'],
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
    hover: {
      control: { type: 'boolean' },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Card Title</h3>
        <p className="text-gray-600">This is a simple card with default styling.</p>
      </div>
    ),
  },
}

export const WithHeaderContentFooter: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader
        title="User Profile"
        subtitle="Manage your account settings"
        action={
          <Button size="sm" variant="outline">Edit</Button>
        }
      />
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Name:</span>
            <span>John Doe</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Email:</span>
            <span>john@example.com</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Role:</span>
            <span>Administrator</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="secondary" size="sm">Cancel</Button>
        <Button size="sm">Save Changes</Button>
      </CardFooter>
    </Card>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-full max-w-4xl">
      <Card variant="default">
        <CardHeader title="Default" />
        <CardContent>Default card variant with subtle shadow.</CardContent>
      </Card>
      <Card variant="elevated">
        <CardHeader title="Elevated" />
        <CardContent>Elevated card with prominent shadow.</CardContent>
      </Card>
      <Card variant="outlined">
        <CardHeader title="Outlined" />
        <CardContent>Outlined card with border emphasis.</CardContent>
      </Card>
      <Card variant="filled">
        <CardHeader title="Filled" />
        <CardContent>Filled card with background color.</CardContent>
      </Card>
    </div>
  ),
}

export const PaddingVariants: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Card padding="sm">
        <CardContent>Small padding</CardContent>
      </Card>
      <Card padding="md">
        <CardContent>Medium padding (default)</CardContent>
      </Card>
      <Card padding="lg">
        <CardContent>Large padding</CardContent>
      </Card>
      <Card padding="xl">
        <CardContent>Extra large padding</CardContent>
      </Card>
    </div>
  ),
}

export const HoverEffect: Story = {
  args: {
    hover: true,
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Hoverable Card</h3>
        <p className="text-gray-600">Hover over this card to see the effect.</p>
      </div>
    ),
  },
}

export const NoPadding: Story = {
  render: () => (
    <Card padding="none" className="w-80">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32 flex items-center justify-center text-white font-semibold">
        Image or Banner Area
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">Custom Layout</h3>
        <p className="text-gray-600">Card with no padding for custom layouts.</p>
      </div>
    </Card>
  ),
}

export const ProductCard: Story = {
  render: () => (
    <Card hover className="w-80">
      <div className="aspect-video bg-gray-200 flex items-center justify-center text-gray-500">
        Product Image
      </div>
      <CardContent>
        <h3 className="text-lg font-semibold mb-1">Premium Headphones</h3>
        <p className="text-gray-600 text-sm mb-3">High-quality wireless headphones with noise cancellation.</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-green-600">$299</span>
          <Button size="sm">Add to Cart</Button>
        </div>
      </CardContent>
    </Card>
  ),
} 