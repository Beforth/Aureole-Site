'use client'

import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#1b243f] via-[#293546] to-[#1b243f] flex items-center justify-center z-50">
      <div className="text-center">
        <div className="mb-6">
          <svg width="80" height="80" viewBox="0 0 120 120" className="mx-auto">
            <motion.circle
              cx="60"
              cy="60"
              r="40"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            <motion.path
              d="M30 60 L90 60 M60 30 L60 90 M45 45 L75 75 M45 75 L75 45"
              stroke="#ffffff"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
            />
          </svg>
        </div>
        <motion.div
          className="text-[#e5e7eb] font-medium text-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Loading About...
        </motion.div>
      </div>
    </div>
  )
}
