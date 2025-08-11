import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

function CardDetail() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [participantCount, setParticipantCount] = useState(1)
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: ''
  })
  const [showOTP, setShowOTP] = useState(false)
  const [otp, setOtp] = useState('')
  const [showPayment, setShowPayment] = useState(false)

  const cardDetails = {
    '/coffee-confession': {
      title: "داستان قهوه",
      description: "در کارگاه برشته‌کاری و دم‌آوری قهوه، قدم به دنیایی می‌گذاری که رایحه‌ها همانند افسون در هوا می‌رقصند. دانه‌های سبز در آغوش آتش، به طلای معطر بدل می‌شوند و هر گوشه، چون راز کهنی در گوش زمان زمزمه می‌کند. دستانت، با لمس دانه‌ها و هم‌نشینی با آب جوشان، قصه‌ای از صبر و دقت می‌نویسد. اینجا، قهوه تنها نوشیدنی نیست؛ سفری است به قلب طعم‌ها و سایه‌روشن‌های زندگی. بوی تازه‌برشت، تو را در آغوش می‌گیرد و جرعه‌ای گرم، همچون دعوتی بی‌پایان به جهان آرامش و الهام، در وجودت می‌نشیند.",
      location: "کارگاه برشته کاری سی‌وهشت",
      duration: "نود دقیقه",
      price: "یک میلیون تومان"
    },
    '/fold-whispers': {
      title: "کارگاه اوریگامی",
      description: "در کارگاه اوریگامی، کاغذهای ساده همانند برگ‌های سفید سرنوشت در برابر تو آرام گرفته‌اند. هر تا، گویی ضربانی تازه به جانشان می‌بخشد و هر خم، مسیری پنهان را آشکار می‌کند. انگشتانت، همچون جادوگران خاموش، اشکال را از دل سکوت بیرون می‌کشند؛ پرنده‌ای که آماده پرواز است، گلبرگی که در باد می‌رقصد، یا قایقی که رؤیای سفر دارد. اینجا، کاغذ تنها کاغذ نیست؛ بوم بی‌پایان خیال است. نور نرم کارگاه، صدای آرام تا خوردن، و حضور تو در میان این آفرینش‌ها، همه تو را به جهانی می‌برد که در آن، سادگی، سرچشمه شگفتی و آرامش جاودان است.",
      location: "آتلیه معماری هزاره",
      duration: "شصت دقیقه",
      price: "ششصد و پنجاه هزار تومان"
    },
    '/smoke-resin': {
      title: "دود عود",
      description: "در کارگاه عودسازی، هوا آمیخته با نجواهای پنهان گیاهان و چوب‌های کهن است. دستانت، مواد خام را همچون رازهایی از دل طبیعت جمع می‌کنند؛ پودرهای معطر، رزین‌های کهربایی و چوب‌های خوشبو که قرن‌ها قصه در خود دارند. هر ترکیب، آوایی بی‌کلام می‌سازد و هر فشردن، دمی از آرامش را در قالبی کوچک شکل می‌دهد. وقتی شعله‌ای آرام، عود را بیدار می‌کند، دودش چون نوارهای نقره‌ای در هوا می‌پیچد و مسیرش را به سوی آسمان می‌برد. اینجا، عطرها نه‌تنها فضا را پر می‌کنند، که روحت را به سفری آرام و بی‌انتها دعوت می‌نمایند.",
      location: "کافه حیات نو",
      duration: "شصت دقیقه",
      price: "هشتصد هزار تومان"
    }
  }

  const currentCard = cardDetails[location.pathname]

  if (!currentCard) {
    return <div>Card not found</div>
  }

  const handleLoginClick = () => {
    navigate('/login', { state: { from: location.pathname } })
  }

  const handleParticipantChange = (change) => {
    const newCount = participantCount + change
    if (newCount >= 1 && newCount <= 10) {
      setParticipantCount(newCount)
    }
  }

  const handleBookingSubmit = (e) => {
    e.preventDefault()
    if (bookingForm.name && bookingForm.phone) {
      setShowOTP(true)
    }
  }

  const handleOTPSubmit = (e) => {
    e.preventDefault()
    if (otp === '1234') {
      setShowPayment(true)
    } else {
      alert('کد OTP اشتباه است')
    }
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

  if (showPayment) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-blue-300/20 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-purple-300/20 rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-blue-300/10 rounded-full"></div>
        </div>

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

        <main className="flex items-center justify-center min-h-screen px-4 pt-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl mx-auto text-center"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl font-calligraphy text-blue-600 mb-8 text-shadow persian-text"
            >
              صفحه پرداخت
            </motion.h1>
            <motion.div
              variants={itemVariants}
              className="noir-card p-8"
            >
              <p className="text-gray-700 mb-6 persian-text">
                مبلغ قابل پرداخت: {currentCard.price} × {participantCount} نفر
              </p>
              <p className="text-gray-600 text-sm persian-text">
                در اینجا فرم پرداخت قرار می‌گیرد
              </p>
            </motion.div>
          </motion.div>
        </main>
      </div>
    )
  }

  if (showOTP) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-blue-300/20 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-purple-300/20 rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-blue-300/10 rounded-full"></div>
        </div>

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

        <main className="flex items-center justify-center min-h-screen px-4 pt-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-md mx-auto"
          >
            <motion.h1
              variants={itemVariants}
              className="text-3xl font-calligraphy text-blue-600 mb-8 text-center text-shadow persian-text"
            >
              تایید شماره تلفن
            </motion.h1>
            <motion.div
              variants={itemVariants}
              className="noir-card p-8"
            >
              <p className="text-gray-700 mb-6 persian-text text-center">
                کد تایید به شماره {bookingForm.phone} ارسال شد
              </p>
              <form onSubmit={handleOTPSubmit} className="space-y-6">
                <div>
                  <label htmlFor="otp" className="block text-gray-700 font-professional text-sm mb-2 persian-text">
                    کد تایید
                  </label>
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="کد 4 رقمی را وارد کنید"
                    className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 font-professional focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition-all duration-300 persian-text"
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  className="w-full noir-button text-lg py-3 persian-text"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ثبت
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </main>
      </div>
    )
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
            className="mb-8 text-blue-600 hover:text-gray-800 transition-colors duration-300 font-professional flex items-center gap-2 persian-text"
          >
            برگردیم عقب؟
          </motion.button>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl font-calligraphy text-blue-600 text-center mb-12 text-shadow persian-text"
          >
            {currentCard.title}
          </motion.h1>

          {/* Description */}
          <motion.div
            variants={itemVariants}
            className="noir-card mb-8"
          >
            <p className="text-gray-700 font-professional leading-relaxed text-lg persian-text">
              {currentCard.description}
            </p>
          </motion.div>

          {/* Info Boxes */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {/* Location */}
            <div className="noir-card text-center">
              <div className="text-2xl mb-2">📍</div>
              <h3 className="text-blue-600 font-professional font-semibold mb-2 persian-text">آدرس</h3>
              <p className="text-gray-600 font-professional text-sm persian-text">
                {currentCard.location}
              </p>
            </div>

            {/* Duration */}
            <div className="noir-card text-center">
              <div className="text-2xl mb-2">🕒</div>
              <h3 className="text-blue-600 font-professional font-semibold mb-2 persian-text">مدت زمان</h3>
              <p className="text-gray-600 font-professional text-sm persian-text">
                {currentCard.duration}
              </p>
            </div>

            {/* Price */}
            <div className="noir-card text-center">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="text-blue-600 font-professional font-semibold mb-2 persian-text">قیمت</h3>
              <p className="text-gray-600 font-professional text-sm persian-text">
                {currentCard.price}
              </p>
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            variants={itemVariants}
            className="noir-card p-8"
          >
            <h3 className="text-2xl font-calligraphy text-blue-600 mb-6 text-center persian-text">
              رزرو تجربه
            </h3>
            
            {/* Participant Count */}
            <div className="mb-6">
              <label className="block text-gray-700 font-professional text-sm mb-3 persian-text">
                تعداد نفرات
              </label>
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => handleParticipantChange(-1)}
                  disabled={participantCount <= 1}
                  className="w-10 h-10 rounded-full bg-blue-500 text-white text-xl font-bold hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  -
                </button>
                <span className="text-2xl font-bold text-gray-800 persian-text min-w-[3rem] text-center">
                  {participantCount}
                </span>
                <button
                  onClick={() => handleParticipantChange(1)}
                  disabled={participantCount >= 10}
                  className="w-10 h-10 rounded-full bg-blue-500 text-white text-xl font-bold hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  +
                </button>
              </div>
              <p className="text-sm text-gray-500 text-center mt-2 persian-text">
                حداقل ۱ نفر، حداکثر ۱۰ نفر
              </p>
            </div>

            {/* Name and Phone Form */}
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-professional text-sm mb-2 persian-text">
                  نام و نام خانوادگی
                </label>
                <input
                  type="text"
                  id="name"
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="نام خود را وارد کنید"
                  className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 font-professional focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition-all duration-300 persian-text"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-700 font-professional text-sm mb-2 persian-text">
                  شماره تلفن
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={bookingForm.phone}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="شماره تلفن خود را وارد کنید"
                  className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 font-professional focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition-all duration-300 persian-text"
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="w-full noir-button text-lg py-3 persian-text"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ادامه
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}

export default CardDetail 