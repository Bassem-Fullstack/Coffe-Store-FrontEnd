"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { AllProducts } from "@/lib/api"

import { useDispatch } from "react-redux"

import { addToCart } from "@/Redux/cartSlice"
import { useState } from "react"
import toast from "react-hot-toast"




interface ProductDetailsProps {

  product: AllProducts
  
  // all products دي بتعود على فونشين بتستقبل من يو ار ال بيانات بقولوة هيكون نوع منتج زاي نوع اوويل بروديكيت

}

export default function ProductDetails({ product }: ProductDetailsProps) {

const [loading, setLoading] = useState(false)


 const dispatch = useDispatch()

 const handleAddToCart = async () => {

const token = localStorage.getItem("token")


  if (!token) {
    toast.error("Please login or register first! 🔐")
    return // وقف الفانكشن
  }



  if (loading) return

  try {
    setLoading(true)

    await dispatch(addToCart(product._id) as any)

  toast.success("Added to cart! 🛒") 

  } finally {
    setLoading(false)
  }
}

  return (
    <section className="text-center bg-[#FAF7F0] px-4 py-32 md:px-16">

      {/* العنوان والفئة */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
        className="max-w-5xl mx-auto mb-10"
      >
        <p className="text-[#C08B5C] text-sm font-semibold uppercase tracking-widest mb-5">
          {product.category.name}
        </p>
        <h1 className="text-[#4B2E2B] text-4xl md:text-5xl font-bold leading-tight">
          {product.name}
        </h1>
      </motion.div>

      {/* الكارد الرئيسية */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 bg-gradient-to-br from-[#FAF7F0] to-[#EADBC8] border border-[#C08B5C] rounded-3xl shadow-xl overflow-hidden">

        {/* صورة المنتج */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full min-h-[300px]"
        >
          <Image
            src={product.images[0].url}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />

        
          
        </motion.div>

        {/* تفاصيل المنتج */}
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="p-4 flex flex-col justify-center gap-4"
        >

          {/* السعر */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-[#4B2E2B] text-3xl font-extrabold"
          >
            {product.price}
            <span className="text-lg font-semibold text-[#C08B5C]"> EGP </span>
          </motion.p>

          <motion.hr
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.65, delay: 0.6 }}
            className="border-[#C08B5C] opacity-80 origin-left"
          />

          {/* الوصف */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-[#4B2E2B] text-base leading-relaxed"
          >
            {product.description}
          </motion.p>

          {/* زرار Add To Cart */}
          <motion.button
          
             onClick={handleAddToCart}

             disabled={loading}

            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.85 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-4 rounded-2xl font-semibold text-[#FAF7F0] bg-[#2B2B2B] hover:bg-[#4B2E2B] transition-colors duration-300 text-base"
          >
              {loading ? "Adding..." : "Add To Cart"}
          </motion.button>

        </motion.div>

      </div>

    </section>
  )
}