

"use client"

import { fetchOrders, updateOneOrder } from "@/Redux/ordersSlice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { motion , AnimatePresence } from "motion/react"


export default function OrderPage () {


const dispatch = useDispatch()  


const [isMounted , setIsMounted] = useState(false)


const {loading , orders , error} = useSelector((state:any)=> state.Orders) 



useEffect(()=> {


  dispatch(fetchOrders()  as any)

   setIsMounted(true) // دة بستخدمة في حالة ان داتا اشتغل على براوزير على متصفح مش شغال على سيرفر فقط ساعات سيرفر يضرب ايرور رغم ان بيانات موجودة على متصفح  

}, [dispatch])


  const handleCancelOrder = (orderId:string) => {


 if(confirm ("Would you like to cancel order ??? ")){

  dispatch(updateOneOrder(orderId) as any )

 }


}


if(!isMounted) return null // لو مفيش حاجة اتعرضت على براوزير اعرضلي دة

if(loading) 

return (

<div className="flex h-screen items-center justify-center bg-[#FAF7F0]">

      
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#4B2E2B] border-t-transparent">

      </div> {/* h-12 w-12 animate-spin rounded-full border-4 border-[#4B2E2B] border-t-transparent */}

     

    </div>   //{/* flex h-screen items-center justify-center bg-[#FAF7F0] */}
)

 


 if(error) return (
 
 <div className="flex h-screen items-center justify-center bg-[#FAF7F0] text-red-600 font-bold text-lg" dir="rtl">{error}</div>
  
 )

 return (
  <div className="min-h-screen bg-[#FAF7F0]">
    <div className="container mx-auto px-4 md:px-12">
      <h1 className="text-2xl pt-32 font-bold text-center text-[#4B2E2B] mb-6">My Orders</h1>

      {orders?.length === 0 && (
        <p className="text-center text-[#4B2E2B]">No Orders</p>
      )}

      <AnimatePresence>
        {orders?.map((everyOrder: any, index: number) => (
          <motion.div
            key={everyOrder._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-[#EADBC8] rounded-xl border border-[#4B2E2B]/10 p-4 mb-4"
          >
            {/* المنتجات */}
            {everyOrder.items.map((ele: any) => (
              <div key={ele._id} className="flex justify-between items-center py-2 border-b border-[#4B2E2B]/10 last:border-0 gap-2">
                <p className="text-sm font-medium text-[#4B2E2B] flex-1">{ele.product.name}</p>
                <p className="text-xs text-[#4B2E2B]/60 shrink-0">x{ele.quantity}</p>
                <p className="text-sm font-medium text-[#C08B5C] shrink-0">{ele.price} EGP</p>
              </div>
            ))}

            <hr className="my-3 border-[#4B2E2B]/10" />

            {/* Footer الكارت */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
              
              {/* Total */}
              <p className="text-lg font-medium text-[#4B2E2B]">
                <span className="text-sm text-[#4B2E2B]/60 mr-1">Total</span>
                {everyOrder.totalPrice} EGP
              </p>

              {/* Badge + زرار */}
              <div className="flex justify-between items-center gap-2 sm:justify-end">
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  everyOrder.status === "cancelled" ? "bg-red-100 text-red-800" :
                  everyOrder.status === "delivered" ? "bg-green-100 text-green-800" :
                  "bg-[#4B2E2B]/10 text-[#4B2E2B]"
                }`}>
                  {everyOrder.status}
                </span>

                {everyOrder.status !== "delivered" && everyOrder.status !== "cancelled" ? (
                  <motion.button
                    whileHover={{ scale: 1.04, backgroundColor: "#C08B5C" }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleCancelOrder(everyOrder._id)}
                    className="bg-[#4B2E2B] text-[#FAF7F0] text-sm px-4 py-2 rounded-lg"
                  >
                    Cancel Order
                  </motion.button>
                ) : (
                  <span className="text-xs text-red-800 bg-red-100 px-3 py-2 rounded-lg">
                    Order cancelled
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  </div>
)
}


































