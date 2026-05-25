'use client'

import { motion } from 'framer-motion'
import { CreditCard } from 'lucide-react'

export function CardModule() {
  return (
    <div className="w-full h-full flex flex-col bg-background overflow-hidden items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-6"
        >
          <CreditCard className="w-16 h-16 text-accent mx-auto" />
        </motion.div>
        <h2 className="text-3xl font-bold text-foreground mb-2">PRÓXIMAMENTE</h2>
        <p className="text-muted-foreground mb-4">Sistema de tarjeta y recargas en desarrollo</p>
        <p className="text-sm text-muted-foreground">La gestión de saldo estará disponible pronto</p>
      </motion.div>
    </div>
  )
}


