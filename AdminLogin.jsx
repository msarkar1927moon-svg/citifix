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

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    aadhaar: '',
    otp: ''
  });
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOTP = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('citifix_users') || '[]');
    const user = users.find(u => u.aadhaar === formData.aadhaar && u.role === 'admin');
    
    if (!user) {
      toast({
        title: "Admin not found",
        description: "Please sign up first",
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

  const handleLogin = (e) => {
    e.preventDefault();
    if (formData.otp === '123456') {
      const users = JSON.parse(localStorage.getItem('citifix_users') || '[]');
      const user = users.find(u => u.aadhaar === formData.aadhaar && u.role === 'admin');
      
      login(user);
      toast({
        title: "Welcome back, Admin! 👋",
        description: "Login successful"
      });
      navigate('/admin/dashboard');
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please try again",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Login - CITIFIX</title>
        <meta name="description" content="Login to CITIFIX admin panel" />
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

            <h2 className="text-3xl font-bold text-center mb-2">Admin Login</h2>
            <p className="text-gray-600 text-center mb-8">Access admin panel</p>

            {step === 1 ? (
              <form onSubmit={handleSendOTP} className="space-y-4">
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
              <form onSubmit={handleLogin} className="space-y-4">
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
                  Login
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
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/admin/signup')}
                className="text-blue-600 hover:underline font-semibold"
              >
                Sign up here
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AdminLogin;