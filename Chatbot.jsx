import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello! I am CitiBot, your AI assistant. How can I help you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 1) {
        setTimeout(() => {
            setMessages(prev => [...prev, { from: 'bot', text: 'You can ask me about reporting issues, rewards, or how to sign up!' }]);
        }, 1000);
    }
  };

  const getBotResponse = (userInput) => {
    const lowerCaseInput = userInput.toLowerCase();
    const responses = {
      'hello': 'Hi there! How can I help you with CITIFIX today?',
      'hi': 'Hello! What can I do for you?',
      'report': 'To report an issue, sign up or log in as a citizen. From your dashboard, click "Report New Issue". You\'ll need to provide a description, a photo, and your location.',
      'issue': 'You can report issues like potholes, garbage dumps, broken streetlights, and water logging. Just log in and head to the "Report Issue" page.',
      'reward': 'You earn 10 reward points for every civic issue you report that gets successfully resolved by the authorities! You can track your points on your dashboard.',
      'points': 'Reward points are given to appreciate your contribution to making your city better. Currently, they are for recognition, but we plan to add exciting redeemable options in the future!',
      'signup': 'You can sign up as a Citizen or an Admin from the landing page. You will need to verify your identity using our secure (mock) Aadhaar process.',
      'register': 'To register, go to the homepage and choose either "Citizen Signup" or "Admin Signup". Follow the on-screen instructions for Aadhaar verification.',
      'aadhaar': 'Aadhaar verification is used to ensure that all reports are from genuine, verified citizens. This helps maintain the integrity of the platform. We use a mock verification for this demo.',
      'admin': 'Admins are officials from civic bodies. They can view all reported issues, assign them to relevant departments, and update the status to "Resolved".',
      'track': 'As a citizen, you can track the status of all your submitted reports right from your personal dashboard. You\'ll see if they are "Pending", "In Progress", or "Resolved".',
      'safe': 'Yes, your data is safe. We use Aadhaar verification for security, and all data handling will be compliant with data protection policies once connected to a secure backend like Supabase.',
      'bye': 'You\'re welcome! Feel free to ask if you have more questions. Have a great day!',
      'thanks': 'Happy to help! Let me know if there is anything else.',
    };

    for (const keyword in responses) {
        if (lowerCaseInput.includes(keyword)) {
            return responses[keyword];
        }
    }

    return "I'm an AI assistant focused on CITIFIX. I can answer questions about reporting issues, rewards, and using the platform. For other topics, I'm still learning! 🤖";
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const userMessage = { from: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    setTimeout(() => {
        const botResponse = getBotResponse(inputValue);
        setMessages(prev => [...prev, { from: 'bot', text: botResponse }]);
        setIsTyping(false);
    }, 1500);

    setInputValue('');
  };
  
  const handleSuggestedQuestion = (question) => {
    setInputValue(question);
    const fakeEvent = { preventDefault: () => {} };
    
    // We need to manually trigger the send logic
    const userMessage = { from: 'user', text: question };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    setTimeout(() => {
        const botResponse = getBotResponse(question);
        setMessages(prev => [...prev, { from: 'bot', text: botResponse }]);
        setIsTyping(false);
    }, 1500);

    setInputValue('');
  }

  const suggestedQuestions = [
    "How do I report an issue?",
    "What are reward points?",
    "How do I track my report?",
  ];

  return (
    <>
      <div className="fixed bottom-8 right-8 z-50">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            onClick={toggleChat}
            className="rounded-full w-16 h-16 shadow-lg bg-gradient-to-r from-orange-500 to-green-600 text-white"
          >
            {isOpen ? <X size={28} /> : <Sparkles size={28} />}
          </Button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-28 right-8 w-[350px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 z-50"
          >
            <div className="p-4 bg-gradient-to-r from-orange-100 to-green-100 border-b">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Bot className="text-orange-500"/>
                CitiBot AI Assistant
              </h3>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="flex flex-col gap-4">
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`flex items-end gap-2 ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.from === 'bot' && (
                        <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center flex-shrink-0">
                            <Bot size={20}/>
                        </div>
                    )}
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${msg.from === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex items-end gap-2 justify-start">
                         <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center flex-shrink-0">
                            <Bot size={20}/>
                        </div>
                        <div className="max-w-[80%] p-3 rounded-2xl bg-gray-200 text-gray-800 rounded-bl-none flex items-center gap-1">
                            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5, repeat: Infinity }} className="w-2 h-2 bg-gray-500 rounded-full"></motion.div>
                            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }} className="w-2 h-2 bg-gray-500 rounded-full"></motion.div>
                            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }} className="w-2 h-2 bg-gray-500 rounded-full"></motion.div>
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            {messages.length <= 2 && !isTyping && (
                <div className="p-4 border-t">
                    <p className="text-sm text-gray-500 mb-2">Or try one of these:</p>
                    <div className="flex flex-col gap-2 items-start">
                        {suggestedQuestions.map(q => (
                            <Button key={q} variant="outline" size="sm" className="text-left h-auto" onClick={() => handleSuggestedQuestion(q)}>
                                {q}
                            </Button>
                        ))}
                    </div>
                </div>
            )}

            <form onSubmit={handleSendMessage} className="p-4 border-t flex items-center gap-2 bg-gray-50">
              <Input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask something..."
                className="flex-1"
                autoComplete="off"
                disabled={isTyping}
              />
              <Button type="submit" size="icon" className="saffron-accent text-white rounded-full" disabled={isTyping}>
                <Send size={20} />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;