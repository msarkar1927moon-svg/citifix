import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Shield } from 'lucide-react';

const CitizenSignup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
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
      description: "Mock OTP: 123456 (for demo purposes)"
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
        phone: formData.phone,
        aadhaar: formData.aadhaar,
        role: 'citizen',
        rewardPoints: 0,
        verified: true
      };
      
      const users = JSON.parse(localStorage.getItem('citifix_users') || '[]');
      users.push(userData);
      localStorage.setItem('citifix_users', JSON.stringify(users));
      
      login(userData);
      
      toast({
        title: "Welcome to CITIFIX! 🎉",
        description: "Your account has been created successfully"
      });
      
      navigate('/citizen/dashboard');
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
        <title>Citizen Signup - CITIFIX</title>
        <meta name="description" content="Sign up as a citizen on CITIFIX and start reporting civic issues in your area." />
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

          <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-orange-500">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 tricolor-gradient rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-center mb-2">Citizen Signup</h2>
            <p className="text-gray-600 text-center mb-8">Join CITIFIX and make a difference</p>

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
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="10-digit mobile number"
                    maxLength={10}
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

                <Button type="submit" className="w-full saffron-accent text-white">
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
                onClick={() => navigate('/citizen/login')}
                className="text-orange-600 hover:underline font-semibold"
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

export default CitizenSignup;