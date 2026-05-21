'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
  interactive?: boolean
  onClick?: () => void
}

export function Card({ children, className, interactive = false, onClick }: CardProps) {
  return (
    <motion.div
      whileHover={interactive ? { scale: 1.02 } : {}}
      whileTap={interactive ? { scale: 0.98 } : {}}
      onClick={onClick}
      className={cn(
        'bg-card border border-border rounded-xl p-4 transition-all',
        interactive && 'cursor-pointer hover:border-accent/50 hover:shadow-lg',
        className
      )}
    >
      {children}
    </motion.div>
  )
}
