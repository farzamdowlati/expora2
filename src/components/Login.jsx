import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    // Handle login logic here
    console.log('Login attempt:', { email, password })
  }

  const handleOAuthLogin = (provider) => {
    console.log(`Login with ${provider}`)
    // Handle OAuth login logic here
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
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
      scale: 1.02,
      boxShadow: "0 0 20px rgba(241, 169, 9, 0.3)"
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
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          {/* Back Button */}
          <motion.button
            variants={itemVariants}
            onClick={() => navigate(-1)}
            className="mb-8 text-noir-accent hover:text-white transition-colors duration-300 font-professional flex items-center gap-2"
          >
            ← Back
          </motion.button>

          {/* Login Card */}
          <motion.div
            variants={itemVariants}
            className="noir-card p-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-calligraphy text-noir-accent mb-2">
                Welcome Back
              </h2>
              <p className="text-white/70 font-professional text-sm">
                Sign in to continue your journey
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-white/90 font-professional text-sm mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-noir-dark/50 border border-noir-primary/30 rounded-lg text-white placeholder-white/50 font-professional focus:outline-none focus:border-noir-accent/50 focus:ring-1 focus:ring-noir-accent/30 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-white/90 font-professional text-sm mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-noir-dark/50 border border-noir-primary/30 rounded-lg text-white placeholder-white/50 font-professional focus:outline-none focus:border-noir-accent/50 focus:ring-1 focus:ring-noir-accent/30 transition-all duration-300"
                  required
                />
              </div>

              <motion.button
                type="submit"
                variants={buttonVariants}
                whileHover="hover"
                className="w-full noir-button text-lg py-3"
              >
                Sign In
              </motion.button>
            </form>

            {/* Forgot Password & Sign Up */}
            <div className="mt-6 text-center space-y-2">
              <a href="#" className="block text-noir-accent hover:text-white transition-colors duration-300 font-professional text-sm">
                Forgot Password?
              </a>
              <div className="text-white/50 font-professional text-sm">
                Don't have an account?{' '}
                <a href="#" className="text-noir-accent hover:text-white transition-colors duration-300">
                  Sign Up
                </a>
              </div>
            </div>

            {/* Divider */}
            <div className="my-8 flex items-center">
              <div className="flex-1 border-t border-white/20"></div>
              <span className="px-4 text-white/50 font-professional text-sm">or continue with</span>
              <div className="flex-1 border-t border-white/20"></div>
            </div>

            {/* OAuth Buttons */}
            <div className="space-y-4">
              {/* Google */}
              <motion.button
                variants={itemVariants}
                onClick={() => handleOAuthLogin('Google')}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white font-professional hover:bg-white/20 transition-all duration-300"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </motion.button>

              {/* Microsoft */}
              <motion.button
                variants={itemVariants}
                onClick={() => handleOAuthLogin('Microsoft')}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white font-professional hover:bg-white/20 transition-all duration-300"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M11.5 2.75h-8a.75.75 0 0 0-.75.75v8c0 .414.336.75.75.75h8a.75.75 0 0 0 .75-.75v-8a.75.75 0 0 0-.75-.75zm-8 1.5h6.5v6.5h-6.5v-6.5z"/>
                  <path fill="currentColor" d="M20.5 2.75h-8a.75.75 0 0 0-.75.75v8c0 .414.336.75.75.75h8a.75.75 0 0 0 .75-.75v-8a.75.75 0 0 0-.75-.75zm-8 1.5h6.5v6.5h-6.5v-6.5z"/>
                  <path fill="currentColor" d="M11.5 13.75h-8a.75.75 0 0 0-.75.75v8c0 .414.336.75.75.75h8a.75.75 0 0 0 .75-.75v-8a.75.75 0 0 0-.75-.75zm-8 1.5h6.5v6.5h-6.5v-6.5z"/>
                  <path fill="currentColor" d="M20.5 13.75h-8a.75.75 0 0 0-.75.75v8c0 .414.336.75.75.75h8a.75.75 0 0 0 .75-.75v-8a.75.75 0 0 0-.75-.75zm-8 1.5h6.5v6.5h-6.5v-6.5z"/>
                </svg>
                Continue with Microsoft
              </motion.button>

              {/* Apple */}
              <motion.button
                variants={itemVariants}
                onClick={() => handleOAuthLogin('Apple')}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white font-professional hover:bg-white/20 transition-all duration-300"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Continue with Apple
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}

export default Login 