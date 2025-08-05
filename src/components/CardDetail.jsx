import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

function CardDetail() {
  const location = useLocation()
  const navigate = useNavigate()

  const cardDetails = {
    '/coffee-confession': {
      title: "☕ The Coffee Confession",
      description: "Step inside the story of coffee, and learn how the world's most beloved brew comes to life—from raw green bean to steaming cup. In this hands-on experience, you'll explore roasting techniques, learn how to grind for flavor, and perfect the pour-over method alongside mentor Evelyn Maretto, a third-generation roaster with a passion for detail. You'll taste subtle differences in aroma, acidity, and body, and come away understanding why coffee is far more than a morning ritual—it's an art form. Great for both newcomers and enthusiasts. Includes all equipment, beans, and a small batch to take home.",
      location: "Foo Bar Atelier, 27th & Holloway, Downtown East",
      duration: "90 minutes",
      price: "$48"
    },
    '/fold-whispers': {
      title: "🧻 Fold & Whispers",
      description: "Paper has a memory, and in this delicate origami session, you'll give it a voice. Led by renowned paper artist Jun Takashi, you'll explore traditional and modern origami techniques in a relaxing environment surrounded by gentle music and the subtle scent of tea. Begin with classic designs like the crane and blossom, then advance into expressive, free-form folds where you create art that reflects your mood and style. All materials are provided, and you'll leave with several paper sculptures and a curated folding set. Perfect for those seeking focus, calm, and creative expression.",
      location: "Foo Bar Workshop, Lane 7, above the Jazz Pharmacy",
      duration: "75 minutes",
      price: "$52"
    },
    '/smoke-resin': {
      title: "🔥 Smoke & Resin",
      description: "Light, shape, and scent converge in this immersive incense-making workshop led by artisan Mina Vos. You'll learn the secrets of crafting natural incense cones using resins, botanicals, and oils from different cultures and traditions. In a quiet, sensory-rich space, Mina will guide you through blending fragrances, shaping cones by hand, and understanding the rituals behind smoke. This is a meditative, earthy experience ideal for those who enjoy slowing down and working with natural materials. You'll leave with a custom pack of cones you made yourself, plus a recipe to keep the craft going at home.",
      location: "Foo Bar Scent Cellar, Underpass District, near the Old Observatory",
      duration: "90 minutes",
      price: "$54"
    }
  }

  const currentCard = cardDetails[location.pathname]

  if (!currentCard) {
    return <div>Card not found</div>
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
      <main className="flex items-center justify-center min-h-screen px-4 pt-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          {/* Back Button */}
          <motion.button
            variants={itemVariants}
            onClick={() => navigate('/')}
            className="mb-8 text-noir-accent hover:text-white transition-colors duration-300 font-professional flex items-center gap-2"
          >
            ← Back to Journey
          </motion.button>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl font-calligraphy text-noir-accent text-center mb-12 text-shadow"
          >
            {currentCard.title}
          </motion.h1>

          {/* Description */}
          <motion.div
            variants={itemVariants}
            className="noir-card mb-8"
          >
            <p className="text-white/90 font-professional leading-relaxed text-lg">
              {currentCard.description}
            </p>
          </motion.div>

          {/* Info Boxes */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Location */}
            <div className="noir-card text-center">
              <div className="text-2xl mb-2">📍</div>
              <h3 className="text-noir-accent font-professional font-semibold mb-2">Location</h3>
              <p className="text-white/80 font-professional text-sm">
                {currentCard.location}
              </p>
            </div>

            {/* Duration */}
            <div className="noir-card text-center">
              <div className="text-2xl mb-2">🕒</div>
              <h3 className="text-noir-accent font-professional font-semibold mb-2">Duration</h3>
              <p className="text-white/80 font-professional text-sm">
                {currentCard.duration}
              </p>
            </div>

            {/* Price */}
            <div className="noir-card text-center">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="text-noir-accent font-professional font-semibold mb-2">Price</h3>
              <p className="text-white/80 font-professional text-sm">
                {currentCard.price}
              </p>
            </div>
          </motion.div>

          {/* Book Now Button */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-12"
          >
            <motion.button
              onClick={() => navigate('/login')}
              className="noir-button text-lg px-12 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book This Experience
            </motion.button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}

export default CardDetail 