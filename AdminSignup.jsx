import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

const AdminSignup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    aadhaar: '',
    otp: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (formData.aadhaar.length !== 12) {
      toast({
        title: "Invalid Aadhaar",
        description: "Please enter a valid 12-digit Aadhaar number",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "OTP Sent! 📱",
      description: "Mock OTP: 123456"
    });
    setStep(2);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (formData.otp === '123456') {
      const userData = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        department: formData.department,
        aadhaar: formData.aadhaar,
        role: 'admin',
        verified: true
      };
      
      const users = JSON.parse(localStorage.getItem('citifix_users') || '[]');
      users.push(userData);
      localStorage.setItem('citifix_users', JSON.stringify(users));
      
      login(userData);
      
      toast({
        title: "Admin Account Created! 🎉",
        description: "Welcome to CITIFIX Admin Panel"
      });
      
      navigate('/admin/dashboard');
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please enter the correct OTP",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Signup - CITIFIX</title>
        <meta name="description" content="Sign up as an admin on CITIFIX" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-blue-600">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-center mb-2">Admin Signup</h2>
            <p className="text-gray-600 text-center mb-8">Create your admin account</p>

            {step === 1 ? (
              <form onSubmit={handleSendOTP} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Official Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="admin@department.gov.in"
                  />
                </div>

                <div>
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Roads, Water, Waste Management"
                  />
                </div>

                <div>
                  <Label htmlFor="aadhaar">Aadhaar Number</Label>
                  <Input
                    id="aadhaar"
                    name="aadhaar"
                    value={formData.aadhaar}
                    onChange={handleChange}
                    required
                    placeholder="12-digit Aadhaar number"
                    maxLength={12}
                  />
                </div>

                <Button type="submit" className="w-full blue-accent text-white">
                  Send OTP
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-blue-800">
                    <strong>Demo OTP:</strong> 123456
                  </p>
                </div>

                <div>
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Input
                    id="otp"
                    name="otp"
                    value={formData.otp}
                    onChange={handleChange}
                    required
                    placeholder="6-digit OTP"
                    maxLength={6}
                  />
                </div>

                <Button type="submit" className="w-full green-accent text-white">
                  Verify & Create Account
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="w-full"
                >
                  Back
                </Button>
              </form>
            )}

            <p className="text-center text-sm text-gray-600 mt-6">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/admin/login')}
                className="text-blue-600 hover:underline font-semibold"
              >
                Login here
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AdminSignup;