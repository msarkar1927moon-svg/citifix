import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

const AdminIssueCard = ({ issue, delay = 0, onUpdate }) => {
  const { toast } = useToast();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'orange';
      case 'In Progress': return 'yellow';
      case 'Resolved': return 'green';
      default: return 'gray';
    }
  };

  const handleStatusChange = (newStatus) => {
    const issues = JSON.parse(localStorage.getItem('citifix_issues') || '[]');
    const updatedIssues = issues.map(i => {
      if (i.id === issue.id) {
        return { ...i, status: newStatus };
      }
      return i;
    });
    localStorage.setItem('citifix_issues', JSON.stringify(updatedIssues));

    if (newStatus === 'Resolved') {
      const users = JSON.parse(localStorage.getItem('citifix_users') || '[]');
      const updatedUsers = users.map(u => {
        if (u.id === issue.userId) {
          return { ...u, rewardPoints: (u.rewardPoints || 0) + 10 };
        }
        return u;
      });
      localStorage.setItem('citifix_users', JSON.stringify(updatedUsers));
      
      toast({
        title: "Issue resolved! 🎉",
        description: "Citizen earned +10 reward points"
      });
    } else {
      toast({
        title: "Status updated",
        description: `Issue marked as ${newStatus}`
      });
    }

    onUpdate();
  };

  const handleDepartmentAssign = (department) => {
    const issues = JSON.parse(localStorage.getItem('citifix_issues') || '[]');
    const updatedIssues = issues.map(i => {
      if (i.id === issue.id) {
        return { ...i, department, status: 'In Progress' };
      }
      return i;
    });
    localStorage.setItem('citifix_issues', JSON.stringify(updatedIssues));

    toast({
      title: "Department assigned",
      description: `Assigned to ${department}`
    });

    onUpdate();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
    >
      {issue.image && (
        <img src={issue.image} alt={issue.title} className="w-full h-48 object-cover" />
      )}
      
      <div className="p-6">
        <div className="flex gap-2 mb-3">
          <span className={`text-xs px-3 py-1 rounded-full bg-${getStatusColor(issue.status)}-100 text-${getStatusColor(issue.status)}-800 font-semibold`}>
            {issue.status}
          </span>
          <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-semibold">
            {issue.category}
          </span>
        </div>

        <h3 className="text-xl font-bold mb-2">{issue.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{issue.description}</p>

        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>Reported by: {issue.userName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
          </div>
          {issue.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Lat: {issue.location.lat.toFixed(4)}, Lng: {issue.location.lng.toFixed(4)}</span>
            </div>
          )}
        </div>

        <div className="space-y-3 pt-4 border-t">
          <Select value={issue.department || ''} onValueChange={handleDepartmentAssign}>
            <SelectTrigger>
              <SelectValue placeholder="Assign Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Roads">Roads</SelectItem>
              <SelectItem value="Waste Management">Waste Management</SelectItem>
              <SelectItem value="Water">Water</SelectItem>
              <SelectItem value="Electricity">Electricity</SelectItem>
            </SelectContent>
          </Select>

          <Select value={issue.status} onValueChange={handleStatusChange}>
            <SelectTrigger>
              <SelectValue placeholder="Update Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminIssueCard;