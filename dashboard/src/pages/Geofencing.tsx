const Geofencing = () => {
  const geofences = [
    { id: 1, name: 'Main Office', address: '123 Business St, Downtown', radius: '100m', employees: 45, status: 'Active' },
    { id: 2, name: 'Branch Office', address: '456 Corporate Ave, Uptown', radius: '150m', employees: 28, status: 'Active' },
    { id: 3, name: 'Warehouse', address: '789 Industrial Blvd, East Side', radius: '200m', employees: 15, status: 'Inactive' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Geofencing Management</h1>
          <p className="text-gray-600">Manage location-based attendance zones and restrictions</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Add Geofence
        </button>
      </div>

      {/* Map Placeholder */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Location Map</h2>
        <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl text-gray-400 mb-4">🗺️</div>
            <p className="text-gray-600">Interactive map will be displayed here</p>
            <p className="text-sm text-gray-500">Showing all geofenced locations and employee positions</p>
          </div>
        </div>
      </div>

      {/* Geofence Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl text-blue-600">📍</div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Zones</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl text-green-600">✅</div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Zones</p>
              <p className="text-2xl font-bold text-gray-900">2</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl text-yellow-600">👥</div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Employees Inside</p>
              <p className="text-2xl font-bold text-gray-900">73</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl text-red-600">⚠️</div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Violations</p>
              <p className="text-2xl font-bold text-gray-900">2</p>
            </div>
          </div>
        </div>
      </div>

      {/* Geofence List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Geofenced Locations</h2>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Radius
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employees
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {geofences.map((geofence) => (
              <tr key={geofence.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {geofence.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {geofence.address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {geofence.radius}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {geofence.employees}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      geofence.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {geofence.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Geofencing 