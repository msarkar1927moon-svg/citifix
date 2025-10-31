import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Award, Users, Zap, BookOpen, Lightbulb, CheckCircle } from 'lucide-react';
const LandingPage = () => {
  const navigate = useNavigate();
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1
    }
  };
  const logoUrl = "https://horizons-cdn.hostinger.com/d2f400b4-1668-42cb-9f7f-37fe6fb8a284/ca3f844581a6d1fb137d5396bc23e3bc.png";
  return <>
      <Helmet>
        <title>CITIFIX - AI-Powered Civic Issue Reporting Platform</title>
        <meta name="description" content="Report and resolve civic issues in India with CITIFIX. AI-powered categorization, Aadhaar verification, and reward points for active citizens." />
      </Helmet>

      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="min-h-screen">
        <motion.nav variants={itemVariants} className="bg-white shadow-sm border-b-4 border-orange-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <motion.div initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} className="flex items-center space-x-2">
                <img src={logoUrl} alt="CITIFIX Logo" className="w-10 h-10 object-contain rounded-full" />
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-green-600 bg-clip-text text-transparent">CITIFIX</span>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex gap-3">
                <motion.div whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }}>
                  <Button onClick={() => navigate('/citizen/login')} variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">LOGIN</Button>
                </motion.div>
                 <motion.div whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }}>
                  <Button onClick={() => navigate('/admin/login')} className="saffron-accent text-white">ADMIN</Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.nav>

        <motion.section variants={itemVariants} className="relative overflow-hidden py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div variants={itemVariants}>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  Building a <span className="text-orange-500">Better India</span>, One Report at a Time
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  AI-powered civic issue reporting platform. Report potholes, garbage, broken streetlights, and more. Earn rewards for making your city better.
                </p>
                <motion.div variants={itemVariants} className="flex gap-4">
                  <motion.div whileHover={{
                  scale: 1.05
                }} whileTap={{
                  scale: 0.95
                }}>
                    <Button onClick={() => navigate('/citizen/signup')} size="lg" className="saffron-accent text-white">
                      Get Started as Citizen
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants} whileHover={{
              scale: 1.02
            }} className="relative">
                <img alt="Citizens reporting civic issues on mobile app" className="rounded-2xl shadow-2xl" src="https://images.unsplash.com/photo-1555955139-3da597ea3d7e" />
              </motion.div>
            </div>
          </div>
        </motion.section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2 initial={{
            opacity: 0
          }} whileInView={{
            opacity: 1
          }} viewport={{
            once: true,
            amount: 0.5
          }} className="text-4xl font-bold text-center mb-16">
              Why Choose CITIFIX?
            </motion.h2>

            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
            once: true,
            amount: 0.2
          }} className="grid md:grid-cols-4 gap-8">
              {[{
              icon: MapPin,
              title: 'Live Location',
              desc: 'GPS-based issue tracking',
              color: 'orange'
            }, {
              icon: Zap,
              title: 'AI Categorization',
              desc: 'Smart issue classification',
              color: 'blue'
            }, {
              icon: Award,
              title: 'Reward Points',
              desc: 'Earn for resolved issues',
              color: 'green'
            }, {
              icon: Users,
              title: 'Aadhaar Verified',
              desc: 'Secure authentication',
              color: 'orange'
            }].map(feature => <motion.div key={feature.title} variants={itemVariants} whileHover={{
              y: -10,
              boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)"
            }} className="text-center p-6 rounded-xl transition-shadow">
                  <motion.div whileHover={{
                rotate: 360
              }} transition={{
                duration: 0.5
              }} className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${feature.color}-100 flex items-center justify-center`}>
                    <feature.icon className={`w-8 h-8 text-${feature.color}-600`} />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </motion.div>)}
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-orange-50 to-green-50">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2 initial={{
            opacity: 0
          }} whileInView={{
            opacity: 1
          }} viewport={{
            once: true,
            amount: 0.5
          }} className="text-4xl font-bold text-center mb-16">
              How to Use CITIFIX
            </motion.h2>

            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
            once: true,
            amount: 0.2
          }} className="grid md:grid-cols-3 gap-8 mb-12">
              {[{
              icon: Users,
              title: '1. Sign Up & Verify',
              desc: 'Register with your Aadhaar for secure access.'
            }, {
              icon: Lightbulb,
              title: '2. Report an Issue',
              desc: 'Describe the problem, add a photo, and your live location.'
            }, {
              icon: CheckCircle,
              title: '3. Track & Earn',
              desc: 'Monitor status updates and earn rewards when issues are resolved.'
            }].map(step => <motion.div key={step.title} variants={itemVariants} whileHover={{
              y: -10,
              boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)"
            }} className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-blue-500">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </motion.div>)}
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            scale: 0.9
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} viewport={{
            once: true,
            amount: 0.8
          }} transition={{
            type: "spring",
            stiffness: 120
          }} className="bg-gradient-to-br from-orange-500 to-green-600 text-white rounded-2xl shadow-2xl p-8 text-center max-w-2xl mx-auto">
              <p className="text-sm mb-2 opacity-80">Our Impact So Far</p>
              <div className="flex justify-around items-center">
                <div>
                  <p className="text-5xl font-bold">100k+</p>
                  <p className="text-lg">Complaints Generated</p>
                </div>
                <div className="w-px h-20 bg-white opacity-50"></div>
                <div>
                  <p className="text-5xl font-bold">90k+</p>
                  <p className="text-lg">Issues Resolved</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <motion.footer variants={itemVariants} className="bg-gray-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <img src={logoUrl} alt="CITIFIX Logo" className="w-8 h-8 object-contain rounded-full" />
              <span className="text-xl font-bold">CITIFIX</span>
            </div>
            <p className="text-gray-400">Making India cleaner, safer, and better - together.</p>
            <p className="text-gray-500 text-sm mt-2">Made by Arya</p>
          </div>
        </motion.footer>
      </motion.div>
    </>;
};
export default LandingPage;