import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LogOut, MapPin, Filter } from 'lucide-react';
import AdminIssueCard from '@/components/AdminIssueCard';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    search: ''
  });

  useEffect(() => {
    loadIssues();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, issues]);

  const loadIssues = () => {
    const allIssues = JSON.parse(localStorage.getItem('citifix_issues') || '[]');
    setIssues(allIssues);
  };

  const applyFilters = () => {
    let filtered = [...issues];

    if (filters.status !== 'all') {
      filtered = filtered.filter(issue => issue.status === filters.status);
    }

    if (filters.category !== 'all') {
      filtered = filtered.filter(issue => issue.category === filters.category);
    }

    if (filters.search) {
      filtered = filtered.filter(issue =>
        issue.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        issue.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    setFilteredIssues(filtered);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const stats = {
    total: issues.length,
    pending: issues.filter(i => i.status === 'Pending').length,
    inProgress: issues.filter(i => i.status === 'In Progress').length,
    resolved: issues.filter(i => i.status === 'Resolved').length
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - CITIFIX</title>
        <meta name="description" content="Manage and resolve civic issues" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <nav className="bg-white shadow-sm border-b-4 border-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-600 rounded-full"></div>
                <span className="text-2xl font-bold">CITIFIX Admin</span>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">{user.department}</span>
                <Button onClick={() => navigate('/map')} variant="outline">
                  <MapPin className="w-4 h-4 mr-2" />
                  View Map
                </Button>
                <Button onClick={handleLogout} variant="outline">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage and resolve civic issues</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Total Issues', value: stats.total, color: 'blue' },
              { label: 'Pending', value: stats.pending, color: 'orange' },
              { label: 'In Progress', value: stats.inProgress, color: 'yellow' },
              { label: 'Resolved', value: stats.resolved, color: 'green' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-white rounded-xl shadow-lg p-6 border-l-4 border-${stat.color}-500`}
              >
                <p className="text-gray-600 text-sm">{stat.label}</p>
                <p className={`text-3xl font-bold text-${stat.color}-600`}>{stat.value}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <h2 className="text-xl font-bold">Filters</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Input
                  placeholder="Search issues..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
              </div>
              
              <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Road">Road</SelectItem>
                  <SelectItem value="Garbage">Garbage</SelectItem>
                  <SelectItem value="Water">Water</SelectItem>
                  <SelectItem value="Electricity">Electricity</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIssues.map((issue, idx) => (
              <AdminIssueCard key={issue.id} issue={issue} delay={idx * 0.1} onUpdate={loadIssues} />
            ))}
          </div>

          {filteredIssues.length === 0 && (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <p className="text-gray-600">No issues found matching your filters</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;