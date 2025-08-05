import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'

// Card Detail Components
import CardDetail from './components/CardDetail'
import Login from './components/Login'

function MainApp() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const navigate = useNavigate()

  const questions = [
    {
      id: 1,
      question: "What's the weather like in your head tonight?",
      options: [
        "Rainy with regret",
        "Flickering neon, no spark",
        "Running on fumes",
        "Heart pacing shadows",
        "Sky lit with static",
        "A rare smile on these streets",
        "Full glass, no cracks",
        "Cigarette smoke drifting calm"
      ]
    },
    {
      id: 2,
      question: "Who's in the frame with you tonight?",
      options: [
        "Just me and the night",
        "A partner in crime",
        "Strangers chasing the same moonlight"
      ]
    },
    {
      id: 3,
      question: "Where does your story begin?",
      options: [
        "Behind a velvet curtain",
        "On the edge of the map",
        "In a room full of echoes",
        "Between the lines of a quiet book"
      ]
    }
  ]

  const cards = [
    {
      id: 1,
      image: "/card1.png",
      route: "/coffee-confession"
    },
    {
      id: 2,
      image: "/card2.png",
      route: "/fold-whispers"
    },
    {
      id: 3,
      image: "/card3.png",
      route: "/smoke-resin"
    }
  ]

  const handleAnswer = (answer) => {
    setAnswers(prev => ({ ...prev, [currentStep]: answer }))
    if (currentStep < questions.length) {
      setCurrentStep(prev => prev + 1)
    } else {
      setCurrentStep(4) // Show recommendations
    }
  }

  const handleStart = () => {
    setCurrentStep(1)
  }

  const handleCardClick = (route) => {
    navigate(route)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 0 30px rgba(241, 169, 9, 0.5)"
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-noir-primary/20 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-noir-accent/20 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-noir-primary/10 rounded-full"></div>
      </div>

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 p-6">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex items-center">
            <h1 className="text-3xl font-calligraphy text-noir-primary text-shadow">
              Expora
              <span className="north-star">★</span>
            </h1>
          </div>
          <div className="flex space-x-8">
            <a href="#" className="noir-nav-link">Documentation</a>
            <a href="#" className="noir-nav-link">Pricing</a>
            <a href="#" className="noir-nav-link">Providers</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-screen px-4">
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.button
                onClick={handleStart}
                className="noir-button glow animate-float"
                variants={buttonVariants}
                whileHover="hover"
              >
                Shall we?
              </motion.button>
            </motion.div>
          )}

          {currentStep >= 1 && currentStep <= 3 && (
            <motion.div
              key={`question-${currentStep}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.h2
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="text-4xl md:text-5xl font-calligraphy text-white mb-12 text-shadow"
              >
                {questions[currentStep - 1].question}
              </motion.h2>
              
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto"
              >
                {questions[currentStep - 1].options.map((option, index) => (
                  <motion.button
                    key={index}
                    variants={itemVariants}
                    onClick={() => handleAnswer(option)}
                    className="noir-card text-left p-6 hover:glow group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-white/90 group-hover:text-noir-accent transition-colors duration-300 font-professional">
                      {option}
                    </span>
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="recommendations"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="max-w-6xl mx-auto px-4"
            >
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl font-calligraphy text-center text-white mb-16 text-shadow"
              >
                Your Noir Journey Awaits
              </motion.h2>
              
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {cards.map((card, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="noir-card overflow-hidden cursor-pointer hover:glow"
                    onClick={() => handleCardClick(card.route)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <img 
                      src={card.image} 
                      alt={`Card ${card.id}`}
                      className="w-full h-auto object-cover"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/coffee-confession" element={<CardDetail />} />
        <Route path="/fold-whispers" element={<CardDetail />} />
        <Route path="/smoke-resin" element={<CardDetail />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
