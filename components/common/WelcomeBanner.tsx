'use client'

import { motion } from 'framer-motion'
import { X, Zap } from 'lucide-react'
import { useState } from 'react'

interface WelcomeBannerProps {
  userName?: string
  onDismiss?: () => void
}

export function WelcomeBanner({ userName, onDismiss }: WelcomeBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false)

  if (isDismissed) return null

  const handleDismiss = () => {
    setIsDismissed(true)
    onDismiss?.()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-gradient-to-r from-accent to-accent/80 text-accent-foreground p-3 rounded-xl flex items-start gap-3 mb-4"
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Zap className="w-5 h-5 flex-shrink-0 mt-0.5" />
      </motion.div>
      <div className="flex-1">
        <p className="font-bold text-sm">¡Bienvenido a RutaYa!</p>
        <p className="text-xs opacity-90 mt-0.5">
          Rastreo en tiempo real de autobuses en Popayán. Tu transporte nunca fue tan fácil.
        </p>
      </div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleDismiss}
        className="p-1 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
      >
        <X className="w-4 h-4" />
      </motion.button>
    </motion.div>
  )
}
