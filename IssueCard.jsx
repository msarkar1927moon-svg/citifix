import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';

const IssueCard = ({ issue, delay = 0 }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'orange';
      case 'In Progress': return 'yellow';
      case 'Resolved': return 'green';
      default: return 'gray';
    }
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

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
          </div>
          {issue.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>Location tracked</span>
            </div>
          )}
        </div>

        {issue.department && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-gray-600">
              Assigned to: <span className="font-semibold">{issue.department}</span>
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default IssueCard;