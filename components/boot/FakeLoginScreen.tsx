'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface FakeLoginScreenProps {
  onComplete: () => void
}

export default function FakeLoginScreen({ onComplete }: FakeLoginScreenProps) {
  const [username, setUsername] = useState('Mistress D')
  const [password, setPassword] = useState('••••••••')
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const handleLogin = () => {
    setIsLoggingIn(true)
    
    // Fake loading animation
    setTimeout(() => {
      onComplete()
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Fondo con efecto CRT */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-green-toxic/10" />
      
      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.1) 2px, rgba(0,255,0,0.1) 4px)'
        }}
      />

      {/* Login Window */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10"
      >
        {/* Win95 Window */}
        <div className="w-[400px] bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] shadow-2xl">
          
          {/* Title Bar */}
          <div className="bg-gradient-to-r from-purple-600 to-magenta-toxic px-2 py-1 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-white text-sm font-bold">💀</span>
              <span className="text-white text-sm font-bold">TrashGènero OS - Login</span>
            </div>
            <button className="w-4 h-4 bg-[#c0c0c0] border border-white text-black text-xs flex items-center justify-center hover:bg-[#dfdfdf]">
              ×
            </button>
          </div>

          {/* Window Content */}
          <div className="p-6 space-y-6">
            
            {/* Header */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-magenta-toxic retro-text-shadow">
                💀 Welcome to the Cult 💀
              </h2>
              <p className="text-xs text-gray-600">
                Digital Witchcraft meets Windows 95
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              
              {/* Username */}
              <div>
                <label className="block text-sm font-bold text-black mb-1">
                  Username:
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoggingIn}
                  className="w-full px-3 py-2 bg-white border-2 border-inset border-[#808080] border-t-[#404040] border-l-[#404040] focus:outline-none font-mono text-sm disabled:opacity-50"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-bold text-black mb-1">
                  Password:
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoggingIn}
                  className="w-full px-3 py-2 bg-white border-2 border-inset border-[#808080] border-t-[#404040] border-l-[#404040] focus:outline-none font-mono text-sm disabled:opacity-50"
                />
              </div>
            </div>

            {/* Login Button */}
            <div className="flex justify-center">
              <button
                onClick={handleLogin}
                disabled={isLoggingIn}
                className="px-8 py-2 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] 
                  hover:bg-[#dfdfdf] active:border-t-[#404040] active:border-l-[#404040] active:border-r-white active:border-b-white
                  disabled:opacity-50 disabled:cursor-not-allowed
                  font-bold text-sm transition-all"
              >
                {isLoggingIn ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">⟳</span>
                    Entering...
                  </span>
                ) : (
                  '✨ Enter the Cult ✨'
                )}
              </button>
            </div>

            {/* Footer */}
            <div className="text-center text-xs text-gray-500 border-t border-gray-400 pt-3">
              TrashGènero OS v1.0.666 • Digital Witchcraft Edition
            </div>
          </div>
        </div>
      </motion.div>

      {/* Glitch effect on login */}
      {isLoggingIn && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0, 1, 0] }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-green-toxic/20 pointer-events-none mix-blend-screen"
        />
      )}
    </div>
  )
}