"use client"

import { fetchCart, removeAllProducts, removeOneProduct, updateProducts } from "@/Redux/cartSlice"
import Image from "next/image"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

interface CartItem {
  _id: string
  quantity: number
  product: {
    _id: string
    name: string
    price: number
    images: { url: string }[]
  }
}

export default function CartItems() {

  const dispatch = useDispatch()

 const router = useRouter()

   
  const { cart, loading, totalPrice } = useSelector(
    (state: { Carts: { cart: CartItem[]; loading: boolean; totalPrice: number } }) => state.Carts
  )

  useEffect(() => {
    dispatch(fetchCart() as any)
  }, [dispatch])

   if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#FAF7F0]">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#4B2E2B] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-24 px-10">
      <div className="max-w-3xl mx-auto">

        {/* العنوان */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-semibold text-[#4B2E2B] mb-8 flex items-center gap-3"
        >
          🛒 Your Cart
        </motion.h1>

        {/* المنتجات */}
        <div className="flex flex-col gap-4">
          <AnimatePresence>
            {cart.map((everyElement, index) => (
              <motion.div
                key={everyElement._id}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}

                className="bg-[#EADBC8] rounded-2xl border border-[#C08B5C33] p-3 sm:p-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-4"

              >

                {/* الصورة + الاسم والسعر في موبايل */}
<div className="flex flex-col items-center gap-3 w-full sm:flex-row sm:w-auto">

                  {/* الصورة */}
                  <div className="relative rounded-xl overflow-hidden flex-shrink-0 border border-[#C08B5C22] w-[100px] h-[100px] sm:w-[100px] sm:h-[100px]">
                    <Image
                      src={everyElement.product.images[0].url}
                      fill
                      alt={everyElement.product.name}
                      priority
                      className="object-cover"
                    />
                  </div>

                  {/* الاسم والسعر */}
                  <div className="flex-1 text-center sm:text-left">

                    <p className="text-[#4B2E2B] font-medium text-sm sm:text-base line-clamp-2">
                      {everyElement.product.name}
                    </p>
                    <motion.p
                      key={everyElement.quantity}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className="text-[#C08B5C] font-semibold text-sm mt-1"
                    >
                      {everyElement.product.price * everyElement.quantity} EGP
                    </motion.p>
                  </div>

                </div>

                {/* أزرار الكمية والحذف */}
                <div className="flex items-center justify-center ms-12  gap-3 sm:ml-auto">


                  {/* أزرار الكمية */}
                  <div className="flex items-center gap-2 bg-[#FAF7F0] rounded-full px-3 sm:px-4 py-1.5 border border-[#C08B5C33]">
                    <motion.button
                      whileTap={{ scale: 0.85 }}
                      onClick={() => {
                        if (everyElement.quantity <= 1) {
                          dispatch(removeOneProduct(everyElement.product._id) as any)
                        } else {
                          dispatch(updateProducts({ productId: everyElement.product._id, quantity: everyElement.quantity - 1 }) as any)
                        }
                      }}
                      className="text-[#4B2E2B] text-xl font-medium w-6 h-6 flex items-center justify-center rounded-full hover:bg-[#EADBC8] transition-all"
                    >
                      −
                    </motion.button>

                    <motion.span
                      key={everyElement.quantity}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-[#4B2E2B] font-semibold text-sm min-w-[20px] text-center"
                    >
                      {everyElement.quantity}
                    </motion.span>

                    <motion.button
                      whileTap={{ scale: 0.85 }}
                      onClick={() => dispatch(updateProducts({ productId: everyElement.product._id, quantity: everyElement.quantity + 1 }) as any)}
                      className="text-[#4B2E2B] text-xl font-medium w-6 h-6 flex items-center justify-center rounded-full hover:bg-[#EADBC8] transition-all"
                    >
                      +
                    </motion.button>
                  </div>

                  {/* زرار الحذف */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => dispatch(removeOneProduct(everyElement.product._id) as any)}
                    className="text-[#C08B5C] border border-[#C08B5C44] rounded-xl p-2 hover:bg-[#4B2E2B] hover:text-[#FAF7F0] hover:border-[#4B2E2B] transition-all duration-200"
                  >
                    🗑️
                  </motion.button>

                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* الفوتر */}
        <AnimatePresence>
          {cart.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mt-6 bg-[#EADBC8] rounded-2xl border border-[#C08B5C33] p-4 sm:p-6 flex items-center justify-between flex-wrap gap-4"
            >
              <div>
                <p className="text-[#4B2E2B99] text-sm mb-1">Total</p>
                <motion.p
                  key={totalPrice}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className="text-[#4B2E2B] text-xl sm:text-2xl font-semibold"
                >
                  {totalPrice} EGP
                </motion.p>
              </div>
<div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
  
  <motion.button
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.96 }}
    onClick={() => dispatch(removeAllProducts() as any)}
    className="bg-[#4B2E2B] text-[#FAF7F0] px-5 sm:px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-[#C08B5C] transition-all duration-200 w-full sm:w-auto text-center"
  >
    🗑️ Clear Cart
  </motion.button>

  <motion.button
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.96 }}
    onClick={() => router.push("/checkout")}
    className="bg-[#4B2E2B] text-[#FAF7F0] px-5 sm:px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-[#C08B5C] transition-all duration-200 w-full sm:w-auto text-center"
  >
    Checkout →
  </motion.button>

</div> 


            </motion.div>
          )}
        </AnimatePresence>

        {/* لو الكارت فاضي */}
        <AnimatePresence>
          {cart.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center mt-24 text-[#4B2E2B99] text-lg"
            >
              Your cart is empty ☕
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}