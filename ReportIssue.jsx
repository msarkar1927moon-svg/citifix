import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, MapPin, Upload, Sparkles, BrainCircuit } from 'lucide-react';

const ReportIssue = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    imageFile: null,
    location: null
  });
  const [loading, setLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result, imageFile: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          });
          toast({
            title: "Location captured! 📍",
            description: "Your current location has been added"
          });
        },
        (error) => {
          toast({
            title: "Location error",
            description: "Please enable location services",
            variant: "destructive"
          });
        }
      );
    }
  };

  const categorizeIssue = (description) => {
    const keywords = {
      'Road': ['pothole', 'road', 'street', 'pavement', 'crack'],
      'Garbage': ['garbage', 'waste', 'trash', 'litter', 'dump'],
      'Water': ['water', 'leak', 'pipe', 'drainage', 'sewage'],
      'Electricity': ['light', 'electricity', 'power', 'streetlight', 'lamp']
    };

    const lowerDesc = description.toLowerCase();
    for (const [category, words] of Object.entries(keywords)) {
      if (words.some(word => lowerDesc.includes(word))) {
        return category;
      }
    }
    return 'Other';
  };

  const mockAiAnalysis = (title, filename) => {
    const combinedInput = `${title.toLowerCase()} ${filename.toLowerCase()}`;
    
    const analysisMap = [
      {
        keywords: ['pothole', 'crack', 'road', 'pavement'],
        description: "AI has detected a significant pothole. The road surface is broken and uneven, posing a risk to vehicles. The issue appears to require immediate attention from the road maintenance department to prevent accidents."
      },
      {
        keywords: ['garbage', 'trash', 'waste', 'dump'],
        description: "AI analysis indicates a large pile of uncollected garbage. This is creating an unsanitary environment and a potential health hazard. The waste management department should be notified for prompt cleanup."
      },
      {
        keywords: ['streetlight', 'lamp', 'light', 'broken light'],
        description: "AI has identified a malfunctioning streetlight. The lamp appears to be broken or not working, which can lead to poor visibility and safety concerns during the night. This needs to be fixed by the electricity department."
      },
      {
        keywords: ['water leak', 'pipe burst', 'leakage'],
        description: "AI has detected a water leakage issue. Water appears to be flowing from a broken pipe, leading to wastage and potential waterlogging. The water supply department should investigate this urgently."
      },
      {
        keywords: ['drainage', 'sewage', 'clogged', 'overflow'],
        description: "AI analysis suggests a blocked or overflowing drainage system. This is causing wastewater to accumulate on the street, which is a major health and sanitation concern. The sewage and sanitation department needs to address this."
      },
      {
        keywords: ['tree', 'fallen', 'branch'],
        description: "AI has identified a fallen tree or a large broken branch blocking a public path. This is an obstruction and a potential safety hazard. The parks or civic maintenance department should be alerted."
      }
    ];

    for (const item of analysisMap) {
      if (item.keywords.some(keyword => combinedInput.includes(keyword))) {
        return item.description;
      }
    }

    return "AI analysis complete. The image shows a potential civic issue. Please review the generated description and add more specific details for clarity. Your input helps us improve!";
  };

  const handleAiDescribe = () => {
    if (!formData.image) {
      toast({
        title: "No Image Found",
        description: "Please upload an image first for the AI to analyze.",
        variant: "destructive",
      });
      return;
    }
    setIsAnalyzing(true);
    toast({
      title: "🤖 AI is analyzing your image...",
      description: "This may take a few seconds.",
    });

    setTimeout(() => {
      const filename = formData.imageFile?.name || "";
      const title = formData.title || "";
      
      const generatedDescription = mockAiAnalysis(title, filename);

      setFormData(prev => ({...prev, description: generatedDescription }));
      setIsAnalyzing(false);
      toast({
        title: "AI Description Generated! ✨",
        description: "The description has been filled in. You can now edit it.",
      });
    }, 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.location) {
      toast({
        title: "Location required",
        description: "Please capture your location first",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    const category = categorizeIssue(formData.description);
    
    const newIssue = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      title: formData.title,
      description: formData.description,
      category,
      image: formData.image,
      location: formData.location,
      status: 'Pending',
      department: null,
      createdAt: new Date().toISOString()
    };

    const issues = JSON.parse(localStorage.getItem('citifix_issues') || '[]');
    issues.push(newIssue);
    localStorage.setItem('citifix_issues', JSON.stringify(issues));

    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Issue reported successfully! 🎉",
        description: `Auto-categorized as: ${category}`
      });
      navigate('/citizen/dashboard');
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Report Issue - CITIFIX</title>
        <meta name="description" content="Report a civic issue in your area" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 p-4">
        <div className="max-w-3xl mx-auto py-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/citizen/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-orange-500"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 tricolor-gradient rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Report Civic Issue</h1>
                <p className="text-gray-600">Help make your city better</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title">Issue Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Large pothole on Main Street"
                />
              </div>
              
              <div>
                <Label htmlFor="image">Upload Image</Label>
                <div className="mt-2">
                  <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 transition-colors">
                    <div className="text-center">
                      <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Click to upload image</p>
                    </div>
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  {formData.image && (
                    <div className="mt-4 text-center">
                      <img src={formData.image} alt="Preview" className="rounded-lg max-h-48 mx-auto" />
                      <Button
                        type="button"
                        onClick={handleAiDescribe}
                        disabled={isAnalyzing}
                        variant="outline"
                        className="mt-4 saffron-accent-text border-orange-400 hover:bg-orange-50"
                      >
                        <BrainCircuit className={`w-4 h-4 mr-2 ${isAnalyzing ? 'animate-spin' : ''}`} />
                        {isAnalyzing ? 'Analyzing Image...' : 'Describe with AI ✨'}
                      </Button>
                    </div>
                  )}
                </div>
              </div>


              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  placeholder="Describe the issue in detail, or use the AI to generate a description from your image."
                  rows={5}
                />
                <p className="text-sm text-gray-500 mt-1">
                  💡 After AI generation, you can still edit this text.
                </p>
              </div>

              <div>
                <Label>Location</Label>
                <Button
                  type="button"
                  onClick={getLocation}
                  variant="outline"
                  className="w-full mt-2"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  {formData.location ? 'Location Captured ✓' : 'Capture Current Location'}
                </Button>
                {formData.location && (
                  <p className="text-sm text-green-600 mt-2">
                    📍 Lat: {formData.location.lat.toFixed(6)}, Lng: {formData.location.lng.toFixed(6)}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={loading || isAnalyzing}
                className="w-full saffron-accent text-white"
              >
                {loading ? 'Submitting...' : 'Submit Report'}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ReportIssue;