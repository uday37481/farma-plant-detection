import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { MessageCircle, X, Send, Globe } from 'lucide-react';
import { getChatbotResponse } from '../utils/chatbotData';

export default function Chatbot() {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('en');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const storedLang = localStorage.getItem('chatbotLanguage') || 'en';
    setLanguage(storedLang);

    const storedMessages = JSON.parse(localStorage.getItem('chatbotMessages') || '[]');
    if (storedMessages.length === 0) {
      const welcomeMessage = {
        id: Date.now(),
        text: getWelcomeMessage(storedLang),
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      setMessages([welcomeMessage]);
      localStorage.setItem('chatbotMessages', JSON.stringify([welcomeMessage]));
    } else {
      setMessages(storedMessages);
    }
  }, []);

  const getWelcomeMessage = (lang) => {
    const welcomes = {
      en: "Hello! I'm FarMa AI Assistant. I can help you with crop care, disease management, fertilizers, irrigation, and farming tips. How can I assist you today?",
      hi: "नमस्ते! मैं FarMa AI सहायक हूं। मैं आपको फसल देखभाल, रोग प्रबंधन, उर्वरक, सिंचाई और खेती के टिप्स में मदद कर सकता हूं। आज मैं आपकी कैसे मदद कर सकता हूं?",
      mr: "नमस्कार! मी FarMa AI सहाय्यक आहे. मी तुम्हाला पीक काळजी, रोग व्यवस्थापन, खते, सिंचन आणि शेती टिप्सात मदत करू शकतो. आज मी तुम्हाला कशी मदत करू शकतो?"
    };
    return welcomes[lang] || welcomes.en;
  };

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    localStorage.setItem('chatbotLanguage', newLang);

    const langChangeMessage = {
      id: Date.now(),
      text: getWelcomeMessage(newLang),
      sender: 'bot',
      timestamp: new Date().toISOString()
    };

    const updatedMessages = [...messages, langChangeMessage];
    setMessages(updatedMessages);
    localStorage.setItem('chatbotMessages', JSON.stringify(updatedMessages));
  };

  const sendMessageToAI = async (userMessage) => {
    return getChatbotResponse(userMessage, language);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    setTimeout(async () => {
      const botResponse = await sendMessageToAI(input);

      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date().toISOString()
      };

      const finalMessages = [...updatedMessages, botMessage];
      setMessages(finalMessages);
      localStorage.setItem('chatbotMessages', JSON.stringify(finalMessages));
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    const welcomeMessage = {
      id: Date.now(),
      text: getWelcomeMessage(language),
      sender: 'bot',
      timestamp: new Date().toISOString()
    };
    setMessages([welcomeMessage]);
    localStorage.setItem('chatbotMessages', JSON.stringify([welcomeMessage]));
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className={`fixed bottom-24 right-4 md:right-8 w-[90vw] md:w-96 h-[500px] rounded-2xl shadow-2xl border z-40 flex flex-col transition-colors duration-300 ${
              isDark
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            }`}
          >
            <div className={`flex items-center justify-between p-4 border-b transition-colors duration-300 ${
              isDark
                ? 'bg-gradient-to-r from-green-800 to-emerald-800 border-gray-700'
                : 'bg-gradient-to-r from-green-600 to-emerald-600 border-gray-200'
            }`}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-white">FarMa AI Assistant</h3>
                  <p className="text-xs text-green-100">Always here to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className={`flex items-center space-x-2 p-3 border-b transition-colors duration-300 ${
              isDark ? 'bg-gray-700/50 border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <Globe className={`w-4 h-4 transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className={`flex-1 px-3 py-1.5 rounded-lg text-sm border transition-colors duration-300 ${
                  isDark
                    ? 'bg-gray-800 border-gray-600 text-gray-100'
                    : 'bg-white border-gray-300 text-gray-800'
                } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="mr">मराठी</option>
              </select>
              <button
                onClick={clearChat}
                className={`px-3 py-1.5 text-xs rounded-lg transition-colors duration-200 ${
                  isDark
                    ? 'bg-gray-600 hover:bg-gray-500 text-gray-200'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                Clear
              </button>
            </div>

            <div className={`flex-1 overflow-y-auto p-4 space-y-3 transition-colors duration-300 ${
              isDark ? 'bg-gray-900' : 'bg-gray-50'
            }`}>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-br-none'
                        : isDark
                          ? 'bg-gray-700 text-gray-100 rounded-bl-none'
                          : 'bg-white text-gray-800 rounded-bl-none shadow-md'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                    <span className={`text-xs mt-1 block ${
                      message.sender === 'user'
                        ? 'text-green-100'
                        : isDark ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className={`p-3 rounded-2xl rounded-bl-none ${
                    isDark ? 'bg-gray-700' : 'bg-white shadow-md'
                  }`}>
                    <div className="flex space-x-2">
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                        className={`w-2 h-2 rounded-full ${isDark ? 'bg-gray-400' : 'bg-gray-400'}`}
                      />
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        className={`w-2 h-2 rounded-full ${isDark ? 'bg-gray-400' : 'bg-gray-400'}`}
                      />
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        className={`w-2 h-2 rounded-full ${isDark ? 'bg-gray-400' : 'bg-gray-400'}`}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className={`p-4 border-t transition-colors duration-300 ${
              isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={language === 'en' ? 'Type your message...' : language === 'hi' ? 'अपना संदेश टाइप करें...' : 'तुमचा संदेश टाइप करा...'}
                  className={`flex-1 px-4 py-2 rounded-lg border transition-colors duration-300 ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-500'
                      : 'bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-400'
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 md:right-8 w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center z-40 hover:shadow-green-500/50 transition-all duration-300"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}