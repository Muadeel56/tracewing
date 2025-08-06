const Dashboard = () => {
  const stats = [
    { name: 'Total Employees', value: '156', icon: '👥', change: '+4.75%', changeType: 'positive' },
    { name: 'Present Today', value: '142', icon: '✅', change: '+2.02%', changeType: 'positive' },
    { name: 'On Leave', value: '8', icon: '🏖️', change: '-1.39%', changeType: 'negative' },
    { name: 'Late Check-ins', value: '6', icon: '⏰', change: '+0.95%', changeType: 'positive' },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to TraceWing Dashboard</h1>
        <p className="text-gray-600">Monitor and manage your employee attendance, payroll, and more.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className="text-3xl">{stat.icon}</div>
            </div>
            <div className="mt-4 flex items-center">
              <span
                className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-2">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
            <span className="text-2xl mr-3">➕</span>
            <span className="text-gray-700">Add New Employee</span>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
            <span className="text-2xl mr-3">📊</span>
            <span className="text-gray-700">Generate Report</span>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
            <span className="text-2xl mr-3">⚙️</span>
            <span className="text-gray-700">System Settings</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 