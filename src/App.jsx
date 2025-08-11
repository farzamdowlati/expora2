import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'

// Card Detail Components
import CardDetail from './components/CardDetail'
import Login from './components/Login'

function MainApp() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showMoreCards, setShowMoreCards] = useState(false)
  const [likedCards, setLikedCards] = useState({})
  const navigate = useNavigate()

  const questions = [
    {
      id: 1,
      question: "بایستی بپرسم بین بوجک هورسمن تا باب اسفنجی چن‌تا خوشحالی؟",
      options: [
        "بوجک",
        "۲",
        "۳",
        "۴",
        "۵",
        "باب اسفنجی"
      ]
    },
    {
      id: 2,
      question: "رزرو برای؟",
      options: [
        "من",
        "من و یار",
        "من و آنها (آنها هم‌فازند.)"
      ]
    },
    {
      id: 3,
      question: "کجا؟",
      options: [
        "طبیعت",
        "کف شهر",
        "پستوی هنر",
        "کارگاه"
      ]
    }
  ]

  const experienceCards = [
    {
      id: 1,
      title: "داستان قهوه",
      description: "در کارگاه برشته‌کاری و دم‌آوری قهوه، قدم به دنیایی می‌گذاری که رایحه‌ها همانند افسون در هوا می‌رقصند. دانه‌های سبز در آغوش آتش، به طلای معطر بدل می‌شوند و هر گوشه، چون راز کهنی در گوش زمان زمزمه می‌کند. دستانت، با لمس دانه‌ها و هم‌نشینی با آب جوشان، قصه‌ای از صبر و دقت می‌نویسد. اینجا، قهوه تنها نوشیدنی نیست؛ سفری است به قلب طعم‌ها و سایه‌روشن‌های زندگی. بوی تازه‌برشت، تو را در آغوش می‌گیرد و جرعه‌ای گرم، همچون دعوتی بی‌پایان به جهان آرامش و الهام، در وجودت می‌نشیند.",
      location: "کارگاه برشته کاری سی‌وهشت",
      duration: "نود دقیقه",
      price: "یک میلیون تومان",
      route: "/coffee-confession"
    },
    {
      id: 2,
      title: "کارگاه اوریگامی",
      description: "در کارگاه اوریگامی، کاغذهای ساده همانند برگ‌های سفید سرنوشت در برابر تو آرام گرفته‌اند. هر تا، گویی ضربانی تازه به جانشان می‌بخشد و هر خم، مسیری پنهان را آشکار می‌کند. انگشتانت، همچون جادوگران خاموش، اشکال را از دل سکوت بیرون می‌کشند؛ پرنده‌ای که آماده پرواز است، گلبرگی که در باد می‌رقصد، یا قایقی که رؤیای سفر دارد. اینجا، کاغذ تنها کاغذ نیست؛ بوم بی‌پایان خیال است. نور نرم کارگاه، صدای آرام تا خوردن، و حضور تو در میان این آفرینش‌ها، همه تو را به جهانی می‌برد که در آن، سادگی، سرچشمه شگفتی و آرامش جاودان است.",
      location: "آتلیه معماری هزاره",
      duration: "شصت دقیقه",
      price: "ششصد و پنجاه هزار تومان",
      route: "/fold-whispers"
    },
    {
      id: 3,
      title: "دود عود",
      description: "در کارگاه عودسازی، هوا آمیخته با نجواهای پنهان گیاهان و چوب‌های کهن است. دستانت، مواد خام را همچون رازهایی از دل طبیعت جمع می‌کنند؛ پودرهای معطر، رزین‌های کهربایی و چوب‌های خوشبو که قرن‌ها قصه در خود دارند. هر ترکیب، آوازی بی‌کلام می‌سازد و هر فشردن، دمی از آرامش را در قالبی کوچک شکل می‌دهد. وقتی شعله‌ای آرام، عود را بیدار می‌کند، دودش چون نوارهای نقره‌ای در هوا می‌پیچد و مسیرش را به سوی آسمان می‌برد. اینجا، عطرها نه‌تنها فضا را پر می‌کنند، که روحت را به سفری آرام و بی‌انتها دعوت می‌نمایند.",
      location: "کافه حیات نو",
      duration: "شصت دقیقه",
      price: "هشتصد هزار تومان",
      route: "/smoke-resin"
    },
    {
      id: 4,
      title: "کارگاه چاپ دستی",
      description: "در یک استودیوی کوچک و پر از رنگ و نور، زیر نظر یک استاد چاپ، با مهرهای دست‌ساز و مرکب‌های متنوع کار می‌کنی. از طراحی الگو گرفته تا انتقال آن روی کاغذ یا پارچه، همه مراحل را خودت انجام می‌دهی و در پایان، یک اثر چاپی منحصر‌به‌فرد به خانه می‌بری.",
      duration: "۲ ساعت",
      price: "۹۵۰ هزار تومان"
    },
    {
      id: 5,
      title: "ساخت جواهرات مینیمال",
      description: "در کارگاهی آرام در دل شهر، با یک هنرمند جواهرساز، فلز، چرم یا سنگ‌های کوچک را به زیورآلاتی ساده و شیک تبدیل می‌کنی. استاد، تکنیک‌های خم‌کاری، پرداخت و مونتاژ را به تو آموزش می‌دهد تا نتیجه، کاملاً دست‌ساز و منحصربه‌فرد باشد.",
      duration: "۲٫۵ ساعت",
      price: "۱٫۲۰۰٫۰۰۰ تومان"
    },
    {
      id: 6,
      title: "کارگاه عکاسی با موبایل",
      description: "در خیابان‌های پرجنب‌وجوش شهر، همراه با یک عکاس حرفه‌ای، هنر دیدن را تمرین می‌کنی. یاد می‌گیری چگونه با نور، زاویه و ترکیب‌بندی، حتی با یک موبایل ساده، عکس‌هایی ماندگار بگیری. در پایان، با ویرایش سریع عکس‌ها، یک مجموعه شخصی از روزت خواهی داشت.",
      duration: "۱٫۵ ساعت",
      price: "۸۰۰ هزار تومان"
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
    if (route) {
      navigate(route)
    }
  }

  const handleLikeCard = (cardId) => {
    setLikedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }))
  }

  const handleShowMore = () => {
    setShowMoreCards(true)
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
      boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)"
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-blue-300/20 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-purple-300/20 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-blue-300/10 rounded-full"></div>
      </div>

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 p-6">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex items-center">
            <h1 className="text-3xl font-calligraphy text-blue-600 text-shadow persian-text">
              Expora
              <span className="north-star">★</span>
            </h1>
          </div>
          <div className="flex space-x-8">
            <a href="#" className="noir-nav-link persian-text">تماس با ما</a>
            <a href="#" className="noir-nav-link persian-text">داستان ما</a>
            <a href="#" className="noir-nav-link persian-text">ارائه‌دهندگان</a>
            <a href="#" className="noir-nav-link font-bold persian-text">خالق تجربه</a>
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
                className="noir-button glow animate-float persian-text"
                variants={buttonVariants}
                whileHover="hover"
              >
                باید بریم...
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
                className="text-4xl md:text-5xl font-calligraphy text-gray-800 mb-12 text-shadow persian-text"
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
                    <span className="text-gray-700 group-hover:text-blue-600 transition-colors duration-300 font-professional persian-text">
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
                className="text-4xl md:text-5xl font-calligraphy text-center text-gray-800 mb-16 text-shadow persian-text"
              >
                تجربه‌های در کمین
              </motion.h2>
              
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
              >
                {experienceCards.slice(0, 3).map((card, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="noir-card overflow-hidden cursor-pointer hover:glow relative"
                    onClick={() => handleCardClick(card.route)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="p-6">
                      <h3 className="text-2xl font-semibold text-gray-800 mb-4 persian-text">{card.title}</h3>
                      <p className="text-gray-600 mb-4 persian-text text-sm leading-relaxed line-clamp-4">{card.description}</p>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span className="persian-text">مدت‌زمان: {card.duration}</span>
                        <span className="persian-text font-semibold">{card.price}</span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleLikeCard(card.id)
                      }}
                      className="absolute top-4 right-4 text-2xl hover:scale-110 transition-transform duration-200"
                    >
                      {likedCards[card.id] ? '❤️' : '🤍'}
                    </button>
                  </motion.div>
                ))}
              </motion.div>

              {!showMoreCards && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-center"
                >
                  <motion.button
                    onClick={handleShowMore}
                    className="noir-button persian-text"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    بیشتر ...
                  </motion.button>
                </motion.div>
              )}

              {showMoreCards && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mt-16"
                >
                  <h3 className="text-3xl font-calligraphy text-center text-gray-800 mb-12 text-shadow persian-text">
                    تجربه‌های بیشتر
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {experienceCards.slice(3).map((card, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="noir-card p-6 relative"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <button
                          onClick={() => handleLikeCard(card.id)}
                          className="absolute top-4 right-4 text-2xl hover:scale-110 transition-transform duration-200"
                        >
                          {likedCards[card.id] ? '❤️' : '🤍'}
                        </button>
                        <h4 className="text-xl font-semibold text-gray-800 mb-4 persian-text">{card.title}</h4>
                        <p className="text-gray-600 mb-4 persian-text text-sm leading-relaxed">{card.description}</p>
                        <div className="flex justify-between items-center text-sm text-gray-500">
                          <span className="persian-text">مدت‌زمان: {card.duration}</span>
                          <span className="persian-text font-semibold">{card.price}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
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
