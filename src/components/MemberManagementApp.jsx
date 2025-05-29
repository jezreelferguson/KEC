import React, { useState, useEffect } from 'react';
import { Users, Plus, Edit, Trash2, Eye, EyeOff, UserPlus, Shield, LogOut, Search, CheckCircle, XCircle, Hash } from 'lucide-react';

const MemberManagementApp = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    joinDate: '',
    picture: ''
  });

  // Storage functions using localStorage
  const saveToStorage = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  const loadFromStorage = (key) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return null;
    }
  };

  // Initialize with data from localStorage or sample members
  useEffect(() => {
    const storedMembers = loadFromStorage('kec_members');
    const storedAdmin = loadFromStorage('kec_admin_session');
    
    if (storedMembers && storedMembers.length > 0) {
      setMembers(storedMembers);
      setFilteredMembers(storedMembers);
    } else {
      // Initialize with sample data if no stored data exists
      const sampleMembers = [
        {
          id: '1',
          name: 'Anokye Ferguson Adu',
          email: 'blueinv73@gmail.com',
          phone: '0544137795',
          position: 'CEO',
          department: 'Management',
          joinDate: '2023-01-15',
          picture: ''
        },
        {
          id: '2',
          name: 'Michael Chen',
          email: 'michael.chen@company.com',
          phone: '+1 (555) 234-5678',
          position: 'Product Manager',
          department: 'Product',
          joinDate: '2023-03-20',
          picture: ''
        },
        {
          id: '3',
          name: 'Emily Rodriguez',
          email: 'emily.rodriguez@company.com',
          phone: '+1 (555) 345-6789',
          position: 'UX Designer',
          department: 'Design',
          joinDate: '2023-02-10',
          picture: ''
        }
      ];
      setMembers(sampleMembers);
      setFilteredMembers(sampleMembers);
      saveToStorage('kec_members', sampleMembers);
    }

    // Restore admin session if exists
    if (storedAdmin) {
      setIsAdmin(true);
    }
  }, []);

  // Save members to localStorage whenever members array changes
  useEffect(() => {
    if (members.length > 0) {
      saveToStorage('kec_members', members);
    }
  }, [members]);

  // Filter members based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredMembers(members);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = members.filter(member => 
        member.name.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query) ||
        member.phone.toLowerCase().includes(query) ||
        member.position.toLowerCase().includes(query) ||
        member.department.toLowerCase().includes(query)
      );
      setFilteredMembers(filtered);
    }
  }, [searchQuery, members]);

  // Admin login handler
  const handleLogin = () => {
    if (loginData.username === 'kecadmin' && loginData.password === 'KECadmin@2025') {
      setIsAdmin(true);
      setShowLogin(false);
      setLoginData({ username: '', password: '' });
      saveToStorage('kec_admin_session', true);
    } else {
      document.getElementById('error').innerText = 'Invalid username or password';
      setTimeout(() => {
        document.getElementById('error').innerText = '';
      }, 3000);
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsAdmin(false);
    setShowForm(false);
    setEditingMember(null);
    // Clear admin session from localStorage
    try {
      localStorage.removeItem('kec_admin_session');
    } catch (error) {
      console.error('Error clearing admin session:', error);
    }
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, picture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!formData.name || !formData.email) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (editingMember) {
      // Update existing member
      const updatedMembers = members.map(member => 
        member.id === editingMember.id 
          ? { ...formData, id: editingMember.id }
          : member
      );
      setMembers(updatedMembers);
      setFilteredMembers(updatedMembers);
    } else {
      // Add new member
      const newMember = {
        ...formData,
        id: Date.now().toString()
      };
      const updatedMembers = [...members, newMember];
      setMembers(updatedMembers);
      setFilteredMembers(updatedMembers);
    }
    resetForm();
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      position: '',
      department: '',
      joinDate: '',
      picture: ''
    });
    setShowForm(false);
    setEditingMember(null);
  };

  // Handle edit
  const handleEdit = (member) => {
    setFormData(member);
    setEditingMember(member);
    setShowForm(true);
  };

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      const updatedMembers = members.filter(member => member.id !== id);
      setMembers(updatedMembers);
      setFilteredMembers(updatedMembers);
    }
  };

  // Clear all data function
  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      setMembers([]);
      setFilteredMembers([]);
      try {
        localStorage.removeItem('kec_members');
      } catch (error) {
        console.error('Error clearing storage:', error);
      }
    }
  };

  // Export data function
  const exportData = () => {
    const dataStr = JSON.stringify(members, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'kec_members_export.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Toggle search visibility on mobile
  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setSearchQuery('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">KEC System</h1>
                <p className="text-sm text-gray-500">Manage your team, members and Leaders</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search button for mobile */}
              <button 
                onClick={toggleSearch}
                className="md:hidden p-2 rounded-full hover:bg-gray-100"
              >
                <Search size={20} className="text-gray-600" />
              </button>

              {isAdmin ? (
                <div className="flex items-center space-x-4">
                  <div className="hidden md:flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    <Shield size={16} />
                    <span className="text-sm font-medium">Admin</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <LogOut size={16} />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 rounded-lg transition-colors font-medium"
                >
                  <span className="hidden sm:inline">Admin Login</span>
                  <span className="sm:hidden">Login</span>
                </button>
              )}
            </div>
          </div>

          {/* Mobile search bar */}
          {showSearch && (
            <div className="md:hidden mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search members..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    <XCircle size={18} />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats and Search Section */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Team Members</h2>
                <p className="text-gray-600 mt-1">
                  {searchQuery ? 
                    `Found ${filteredMembers.length} matching members` : 
                    `Meet our amazing team of ${members.length} members`}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Desktop search bar */}
                <div className="hidden md:block relative flex-1 max-w-md">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search members..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      <XCircle size={18} />
                    </button>
                  )}
                </div>
                
                {isAdmin && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowForm(true)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 sm:px-6 py-2 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap"
                    >
                      <UserPlus size={20} />
                      <span>Add New Member</span>
                    </button>
                    <button
                      onClick={exportData}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                      title="Export Data"
                    >
                      <Hash size={16} />
                      <span className="hidden sm:inline">Export</span>
                    </button>
                    <button
                      onClick={clearAllData}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                      title="Clear All Data"
                    >
                      <Trash2 size={16} />
                      <span className="hidden sm:inline">Clear</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Data persistence notice */}
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-medium">Data Persistence Active</p>
              <p>Your member data is automatically saved in your browser's localStorage and will persist between sessions. Use the Export button to backup your data or Clear to reset everything.</p>
            </div>
          </div>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <div key={member.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden group hover:scale-[1.02]">
              <div className="relative">
                {member.picture ? (
                  <img
                    src={member.picture}
                    alt={member.name}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <Users size={48} className="text-gray-400" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p className="truncate"><span className="font-medium">Email:</span> {member.email}</p>
                  <p><span className="font-medium">Phone:</span> {member.phone}</p>
                  <p><span className="font-medium">Position:</span> {member.position}</p>
                  <p><span className="font-medium">Department:</span> {member.department}</p>
                  <p><span className="font-medium">Joined:</span> {member.joinDate}</p>
                </div>
                
                {isAdmin && (
                  <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleEdit(member)}
                      className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded-lg transition-colors flex items-center justify-center space-x-1"
                    >
                      <Edit size={16} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg transition-colors flex items-center justify-center space-x-1"
                    >
                      <Trash2 size={16} />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12 max-w-md mx-auto">
              <Users size={64} className="mx-auto text-gray-300 mb-6" />
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                {searchQuery ? 'No matching members found' : 'No Team Members Yet'}
              </h3>
              <p className="text-gray-500 mb-6">
                {searchQuery ? 
                  'Try a different search term' : 
                  isAdmin ? 'Add the first team member to get started!' : 'Check back soon as we build our team!'}
              </p>
              {isAdmin && !searchQuery && (
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 mx-auto"
                >
                  <UserPlus size={20} />
                  <span>Add First Member</span>
                </button>
              )}
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors flex items-center space-x-2 mx-auto"
                >
                  <span>Clear search</span>
                </button>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Admin Login</h2>
            <div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                  <input
                    type="text"
                    value={loginData.username}
                    onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? <EyeOff size={20} className="text-gray-400" /> : <Eye size={20} className="text-gray-400" />}
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                  <div id="error" className='text-center text-red-600'></div>
                <button
                  type="button"
                  onClick={() => setShowLogin(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleLogin}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Login
                </button>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-600">
                <strong>Credentials:</strong><br />
                Username: kecadmin<br />
                Password: KECadmin@2025
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Member Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingMember ? 'Edit Member' : 'Add New Member'}
            </h2>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {formData.picture && (
                    <img src={formData.picture} alt="Preview" className="mt-2 h-20 w-20 object-cover rounded-lg" />
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Join Date</label>
                  <input
                    type="date"
                    value={formData.joinDate}
                    onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-all"
                >
                  {editingMember ? 'Update Member' : 'Add Member'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberManagementApp;