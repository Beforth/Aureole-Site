'use client'

import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-background-off flex items-center justify-center z-50">
      <div className="text-center">
        <div className="mb-6">
          <svg width="80" height="80" viewBox="0 0 120 120" className="mx-auto">
            <motion.circle
              cx="60"
              cy="60"
              r="40"
              fill="none"
              stroke="#2298d2"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            <motion.path
              d="M30 60 L90 60 M60 30 L60 90 M45 45 L75 75 M45 75 L75 45"
              stroke="#2298d2"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
            />
          </svg>
        </div>
        <motion.div
          className="text-primary-500 font-medium text-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Loading...
        </motion.div>
      </div>
    </div>
  )
}
