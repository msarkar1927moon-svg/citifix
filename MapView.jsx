import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapView = () => {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [center, setCenter] = useState([28.6139, 77.2090]);

  useEffect(() => {
    const allIssues = JSON.parse(localStorage.getItem('citifix_issues') || '[]');
    setIssues(allIssues);

    if (allIssues.length > 0 && allIssues[0].location) {
      setCenter([allIssues[0].location.lat, allIssues[0].location.lng]);
    }
  }, []);

  const getMarkerColor = (status) => {
    switch (status) {
      case 'Pending': return 'orange';
      case 'In Progress': return 'yellow';
      case 'Resolved': return 'green';
      default: return 'blue';
    }
  };

  return (
    <>
      <Helmet>
        <title>Issue Map - CITIFIX</title>
        <meta name="description" content="View all reported civic issues on the map" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
        <nav className="bg-white shadow-sm border-b-4 border-orange-500 p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 tricolor-gradient rounded-full"></div>
              <span className="text-2xl font-bold">CITIFIX Map</span>
            </div>
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </nav>

        <div className="p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto"
          >
            <div className="bg-white rounded-xl shadow-xl overflow-hidden" style={{ height: 'calc(100vh - 150px)' }}>
              <MapContainer
                center={center}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {issues.map((issue) => (
                  issue.location && (
                    <Marker
                      key={issue.id}
                      position={[issue.location.lat, issue.location.lng]}
                    >
                      <Popup>
                        <div className="p-2">
                          <h3 className="font-bold mb-1">{issue.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{issue.description}</p>
                          <div className="flex gap-2">
                            <span className={`text-xs px-2 py-1 rounded bg-${getMarkerColor(issue.status)}-100 text-${getMarkerColor(issue.status)}-800`}>
                              {issue.status}
                            </span>
                            <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800">
                              {issue.category}
                            </span>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  )
                ))}
              </MapContainer>
            </div>

            <div className="mt-4 bg-white rounded-xl shadow-lg p-4">
              <div className="flex gap-4 justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                  <span className="text-sm">Pending</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">In Progress</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Resolved</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default MapView;