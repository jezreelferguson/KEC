import React from 'react';
import { Film, BookOpen, Users, ArrowUp, ArrowDown, Activity, PieChart, BarChart } from 'lucide-react';

export default function Dashboard() {
  // Sample data - in a real app, this would come from props or API
  const stats = [
    {
      title: "Total Videos",
      count: 2457,
      icon: <Film size={24} />,
      change: 12.5,
      increasing: true,
      color: "bg-purple-500",
      lightColor: "bg-purple-100",
    },
    {
      title: "Total Books",
      count: 1893,
      icon: <BookOpen size={24} />,
      change: 8.2,
      increasing: true,
      color: "bg-blue-500",
      lightColor: "bg-blue-100",
    },
    {
      title: "Active Users",
      count: 9453,
      icon: <Users size={24} />,
      change: 2.1,
      increasing: false,
      color: "bg-green-500",
      lightColor: "bg-green-100",
    }
  ];

  // Sample chart data - in a real app, use a proper charting library
  const chartData = [
    { day: 'Mon', videos: 45, books: 32, users: 120 },
    { day: 'Tue', videos: 52, books: 38, users: 132 },
    { day: 'Wed', videos: 61, books: 43, users: 150 },
    { day: 'Thu', videos: 48, books: 36, users: 145 },
    { day: 'Fri', videos: 55, books: 39, users: 160 },
    { day: 'Sat', videos: 67, books: 47, users: 170 },
    { day: 'Sun', videos: 71, books: 52, users: 180 },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard Overview</h1>
            <p className="text-gray-500 mt-1">Welcome back! Here's what's happening with your content.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors flex items-center">
              <Activity size={16} className="mr-2" />
              <span>Generate Report</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.lightColor} p-3 rounded-lg`}>
                    <div className={`${stat.color} bg-opacity-90 p-2 rounded-lg text-white`}>
                      {stat.icon}
                    </div>
                  </div>
                  <div className={`flex items-center ${stat.increasing ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.increasing ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                    <span className="ml-1 font-medium">{stat.change}%</span>
                  </div>
                </div>
                <h2 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h2>
                <p className="text-3xl font-bold text-gray-800">{stat.count.toLocaleString()}</p>
                <div className="mt-3 text-xs text-gray-400">Updated 24 minutes ago</div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Content Growth Chart */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-gray-800">Content Growth</h3>
              <div className="flex space-x-2">
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded-md text-sm font-medium">Weekly</button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded-md text-sm font-medium">Monthly</button>
              </div>
            </div>
            
            {/* Simplified Chart Visualization (using bars) */}
            <div className="flex items-end h-48 space-x-3 mt-4">
              {chartData.map((data, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex flex-col items-center space-y-1">
                    <div 
                      className="w-full bg-purple-400 rounded-t-sm" 
                      style={{ height: `${data.videos}px` }}
                    ></div>
                    <div 
                      className="w-full bg-blue-400 rounded-t-sm" 
                      style={{ height: `${data.books}px` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 mt-2">{data.day}</span>
                </div>
              ))}
            </div>
            
            {/* Legend */}
            <div className="flex space-x-4 mt-4 justify-center">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-400 rounded-sm mr-1"></div>
                <span className="text-xs text-gray-500">Videos</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-400 rounded-sm mr-1"></div>
                <span className="text-xs text-gray-500">Books</span>
              </div>
            </div>
          </div>
          
          {/* User Activity Chart */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-gray-800">User Activity</h3>
              <BarChart size={20} className="text-gray-400" />
            </div>
            
            {/* Simplified User Activity Chart */}
            <div className="relative h-48">
              <div className="absolute inset-0 flex items-end">
                {chartData.map((data, i) => (
                  <div key={i} className="flex-1 flex justify-center">
                    <div 
                      className="w-6 bg-gradient-to-t from-green-500 to-green-300 rounded-t-md"
                      style={{ height: `${data.users / 2}px` }}
                    ></div>
                  </div>
                ))}
              </div>
              
              {/* Axis lines (simplified) */}
              <div className="absolute inset-x-0 bottom-0 border-t border-gray-200"></div>
            </div>
            
            {/* X-axis labels */}
            <div className="flex justify-around mt-2">
              {chartData.map((data, i) => (
                <div key={i} className="text-xs text-gray-500">{data.day}</div>
              ))}
            </div>
            
            {/* Summary */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Average users per day</p>
                  <p className="text-lg font-semibold text-gray-800">151</p>
                </div>
                <div className="flex items-center text-green-500">
                  <ArrowUp size={16} />
                  <span className="ml-1 font-medium">8.7%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}