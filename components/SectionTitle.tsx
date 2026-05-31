

// components/SectionTitle.tsx
"use client"

import { motion } from "motion/react"

export default function SectionTitle() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true  }}
      className="text-center mt-10 mb-8"
    >

     <span className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-5 text-[#4B2E2B] bg-[#C08B5C]/20 italic">Our Offers</span>

      <h2 className="text-3xl font-bold text-[#4B2E2B]">Our Best Offers</h2>
      
    </motion.div>
  )
}