import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { HelpCircle, Send, ChevronDown, ChevronUp, Mail, User, MessageSquare, Star } from 'lucide-react';
import { toast } from 'react-toastify';

export default function HelpSupport() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [contactForm, setContactForm] = useState({ name: '', email: '', query: '' });
  const [reviewForm, setReviewForm] = useState({ rating: 0, review: '' });
  const [reviews, setReviews] = useState(
    JSON.parse(localStorage.getItem('appReviews') || '[]')
  );

  const faqs = [
    {
      question: 'How accurate is the plant detection system?',
      answer:
        'Our AI-powered detection system achieves 75-99% accuracy depending on image quality, lighting conditions, and plant condition. For best results, take clear photos in natural daylight with the affected area in focus.'
    },
    {
      question: 'Which crops are currently supported?',
      answer:
        'FarMa currently supports 8 major crops: Onion, Tomato, Potato, Grapes, Orange, Corn, Wheat, and Rice. We continuously work on adding more crops based on user demand and regional requirements.'
    },
    {
      question: 'How do I download detection reports?',
      answer:
        'After completing a plant detection, you can download a PDF report from the results page or from your detection history. Click the "Download Report" button to generate a comprehensive PDF with crop type, disease information, and treatment recommendations.'
    },
    {
      question: 'Can I set reminders for plant care?',
      answer:
        'Yes! Go to Settings and navigate to the "Plant Care Reminders" section. You can set reminders with custom titles, descriptions, dates, and times. You\'ll receive notifications when reminders are due.'
    },
    {
      question: 'How do I change the app language?',
      answer:
        'Go to Settings and select your preferred language from English, Hindi, or Marathi. The entire interface will be translated automatically, including detection results and recommendations.'
    },
    {
      question: 'What should I do if detection results seem incorrect?',
      answer:
        'If results seem incorrect, try retaking the photo with better lighting and focus. Ensure the affected area is clearly visible. You can also add notes to your detection and contact our support team for verification.'
    },
    {
      question: 'How do I enable/disable dark mode?',
      answer:
        'Navigate to Settings and use the theme toggle to switch between light and dark modes. Your preference will be saved automatically.'
    },
    {
      question: 'Can I delete my detection history?',
      answer:
        'Yes, you can delete individual detections from your history page. Click on any detection card to view details and use the delete button to remove it permanently.'
    }
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();

    if (!contactForm.name || !contactForm.email || !contactForm.query) {
      toast.error('Please fill in all fields');
      return;
    }

    const ticket = {
      id: Date.now().toString(),
      userId: user.id,
      name: contactForm.name,
      email: contactForm.email,
      subject: 'General Query',
      message: contactForm.query,
      status: 'open',
      createdAt: new Date().toISOString()
    };

    const tickets = JSON.parse(
      localStorage.getItem(`tickets_${user.id}`) || '[]'
    );
    tickets.push(ticket);
    localStorage.setItem(`tickets_${user.id}`, JSON.stringify(tickets));

    toast.success('Your query has been submitted! We\'ll get back to you soon.');
    setContactForm({ name: '', email: '', query: '' });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    if (reviewForm.rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    if (!reviewForm.review.trim()) {
      toast.error('Please write a review');
      return;
    }

    const newReview = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.fullName,
      rating: reviewForm.rating,
      review: reviewForm.review,
      createdAt: new Date().toISOString()
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem('appReviews', JSON.stringify(updatedReviews));

    toast.success('Thank you for your feedback!');
    setReviewForm({ rating: 0, review: '' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 max-w-5xl mx-auto"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          {t.support.title}
        </h1>
        <p className={`mt-2 text-lg transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Find answers or get in touch with us
        </p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className={`rounded-2xl shadow-lg p-6 border transition-colors duration-300 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}
      >
        <div className="flex items-center space-x-3 mb-6">
          <HelpCircle className={`w-6 h-6 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
          <h2 className={`text-2xl font-bold transition-colors duration-300 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
            {t.support.faq}
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`border rounded-lg overflow-hidden transition-colors duration-300 ${
                isDark ? 'border-gray-700' : 'border-gray-200'
              }`}
            >
              <motion.button
                whileHover={{ backgroundColor: isDark ? '#374151' : '#f9fafb' }}
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className={`w-full flex items-center justify-between p-4 transition-colors duration-200 text-left ${
                  expandedFaq === index
                    ? isDark ? 'bg-gray-700' : 'bg-green-50'
                    : ''
                }`}
              >
                <span className={`font-semibold transition-colors duration-300 ${
                  expandedFaq === index
                    ? isDark ? 'text-green-400' : 'text-green-700'
                    : isDark ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {expandedFaq === index ? (
                    <ChevronUp className={`w-5 h-5 flex-shrink-0 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                  ) : (
                    <ChevronDown className={`w-5 h-5 flex-shrink-0 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                  )}
                </motion.div>
              </motion.button>
              <AnimatePresence>
                {expandedFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`overflow-hidden border-t transition-colors duration-300 ${
                      isDark ? 'border-gray-700 bg-gray-700/50' : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <p className={`p-4 leading-relaxed transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className={`rounded-2xl shadow-lg p-6 border transition-colors duration-300 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}
      >
        <div className="flex items-center space-x-3 mb-6">
          <Send className={`w-6 h-6 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
          <h2 className={`text-2xl font-bold transition-colors duration-300 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
            {t.support.contactSupport}
          </h2>
        </div>

        <form onSubmit={handleContactSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <User className="w-4 h-4 inline mr-2" />
              Name
            </label>
            <input
              type="text"
              value={contactForm.name}
              onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
              className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-500'
                  : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'
              } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
              placeholder="Your full name"
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <Mail className="w-4 h-4 inline mr-2" />
              Email
            </label>
            <input
              type="email"
              value={contactForm.email}
              onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
              className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-500'
                  : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'
              } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <MessageSquare className="w-4 h-4 inline mr-2" />
              Query
            </label>
            <textarea
              value={contactForm.query}
              onChange={(e) => setContactForm({ ...contactForm, query: e.target.value })}
              rows="5"
              className={`w-full px-4 py-3 rounded-lg border resize-none transition-colors duration-300 ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-500'
                  : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'
              } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
              placeholder="Describe your question or issue..."
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-shadow font-semibold"
          >
            <Send className="w-5 h-5" />
            <span>{t.support.submit}</span>
          </motion.button>
        </form>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className={`rounded-2xl shadow-lg p-6 border transition-colors duration-300 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}
      >
        <div className="flex items-center space-x-3 mb-6">
          <Star className={`w-6 h-6 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
          <h2 className={`text-2xl font-bold transition-colors duration-300 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
            User Reviews & Feedback
          </h2>
        </div>

        <form onSubmit={handleReviewSubmit} className={`mb-6 p-4 rounded-lg border transition-colors duration-300 ${
          isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-green-50 border-green-200'
        }`}>
          <div className="mb-4">
            <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Rate your experience
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  type="button"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= reviewForm.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : isDark ? 'text-gray-600' : 'text-gray-300'
                    } transition-colors duration-200`}
                  />
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Your Review
            </label>
            <textarea
              value={reviewForm.review}
              onChange={(e) => setReviewForm({ ...reviewForm, review: e.target.value })}
              rows="3"
              className={`w-full px-4 py-3 rounded-lg border resize-none transition-colors duration-300 ${
                isDark
                  ? 'bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-500'
                  : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'
              } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
              placeholder="Share your experience with FarMa..."
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-shadow font-semibold"
          >
            Submit Review
          </motion.button>
        </form>

        <div className="space-y-4">
          {reviews.length === 0 ? (
            <p className={`text-center py-8 transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              No reviews yet. Be the first to share your experience!
            </p>
          ) : (
            reviews.slice(0, 10).map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 rounded-lg border transition-colors duration-300 ${
                  isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className={`font-semibold transition-colors duration-300 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                      {review.userName}
                    </p>
                    <div className="flex space-x-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : isDark ? 'text-gray-600' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className={`text-xs transition-colors duration-300 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className={`text-sm mt-2 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {review.review}
                </p>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}