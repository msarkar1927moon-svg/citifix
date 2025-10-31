import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Award, FileText, LogOut, Plus, MapPin } from 'lucide-react';
import IssueCard from '@/components/IssueCard';

const CitizenDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const allIssues = JSON.parse(localStorage.getItem('citifix_issues') || '[]');
    const userIssues = allIssues.filter(issue => issue.userId === user.id);
    setIssues(userIssues);
  }, [user.id]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <Helmet>
        <title>Citizen Dashboard - CITIFIX</title>
        <meta name="description" content="View your reported issues and reward points" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
        <nav className="bg-white shadow-sm border-b-4 border-orange-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 tricolor-gradient rounded-full"></div>
                <span className="text-2xl font-bold">CITIFIX</span>
              </div>
              
              <div className="flex items-center gap-4">
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
            <h1 className="text-4xl font-bold mb-2">Welcome, {user.name}! 👋</h1>
            <p className="text-gray-600">Track your reported issues and earn rewards</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Reports</p>
                  <p className="text-3xl font-bold text-orange-600">{issues.length}</p>
                </div>
                <FileText className="w-12 h-12 text-orange-500 opacity-20" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Resolved Issues</p>
                  <p className="text-3xl font-bold text-green-600">
                    {issues.filter(i => i.status === 'Resolved').length}
                  </p>
                </div>
                <Award className="w-12 h-12 text-green-600 opacity-20" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Reward Points</p>
                  <p className="text-3xl font-bold text-blue-600">{user.rewardPoints || 0}</p>
                </div>
                <Award className="w-12 h-12 text-blue-600 opacity-20" />
              </div>
            </motion.div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">My Reports</h2>
            <Button onClick={() => navigate('/citizen/report')} className="saffron-accent text-white">
              <Plus className="w-4 h-4 mr-2" />
              Report New Issue
            </Button>
          </div>

          {issues.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow-lg p-12 text-center"
            >
              <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No reports yet</h3>
              <p className="text-gray-600 mb-6">Start making a difference by reporting civic issues</p>
              <Button onClick={() => navigate('/citizen/report')} className="saffron-accent text-white">
                Report Your First Issue
              </Button>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {issues.map((issue, idx) => (
                <IssueCard key={issue.id} issue={issue} delay={idx * 0.1} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CitizenDashboard;