import Card, { CardHeader, CardContent } from '../components/ui/Card'
import Button from '../components/ui/Button'

const Dashboard = () => {
  const stats = [
    { name: 'Total Employees', value: '156', icon: '👥', change: '+4.75%', changeType: 'positive' },
    { name: 'Present Today', value: '142', icon: '✅', change: '+2.02%', changeType: 'positive' },
    { name: 'On Leave', value: '8', icon: '🏖️', change: '-1.39%', changeType: 'negative' },
    { name: 'Late Check-ins', value: '6', icon: '⏰', change: '+0.95%', changeType: 'positive' },
  ]

  const AddIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  )

  const ChartIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  )

  const SettingsIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card>
        <CardHeader 
          title="Welcome to TraceWing Dashboard"
          subtitle="Monitor and manage your employee attendance, payroll, and more."
        />
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name} hover className="animate-scale-in">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary">{stat.name}</p>
                  <p className="text-3xl font-bold text-primary mt-1">{stat.value}</p>
                </div>
                <div className="text-3xl">{stat.icon}</div>
              </div>
              <div className="mt-4 flex items-center">
                <span
                  className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-success' : 'text-danger'
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-sm text-tertiary ml-2">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader 
          title="Quick Actions"
          subtitle="Common tasks and shortcuts"
        />
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              size="lg" 
              fullWidth
              leftIcon={<AddIcon />}
              className="h-16 justify-start"
            >
              <div className="text-left">
                <div className="font-medium">Add New Employee</div>
                <div className="text-xs text-tertiary mt-0.5">Create employee profile</div>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              fullWidth
              leftIcon={<ChartIcon />}
              className="h-16 justify-start"
            >
              <div className="text-left">
                <div className="font-medium">Generate Report</div>
                <div className="text-xs text-tertiary mt-0.5">Analytics & insights</div>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              fullWidth
              leftIcon={<SettingsIcon />}
              className="h-16 justify-start"
            >
              <div className="text-left">
                <div className="font-medium">System Settings</div>
                <div className="text-xs text-tertiary mt-0.5">Configure platform</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard 