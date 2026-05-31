// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { motion } from "framer-motion"
// import { useSelector } from "react-redux"


// export default function CheckoutPage() {
//   const router = useRouter()
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState("")

//   const { totalPrice } = useSelector(
//     (state: { Carts: { totalPrice: number } }) => state.Carts
//   )

//   const [formData, setFormData] = useState({
//     city: "",
//     street: "",
//     phone: "",
//     paymentMethod: "cash",
//   })

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = async () => {
//     if (!formData.city || !formData.street || !formData.phone) {
//       setError("Please fill in all fields")
//       return
//     }

//     setLoading(true)
//     setError("")

//     try {
//       const token = localStorage.getItem("token")

//       const res = await fetch("https://coffe-store-backend-seven.vercel.app/order", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       })

//       const data = await res.json()

//       if (!res.ok) {
//         setError(data.message || "Something went wrong")
//         return
//       }

//       router.push("/orders")
//     } catch (e) {
//       setError("Something went wrong, please try again")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className=" bg-[#FAF7F0] py-24 px-6">
//       <div className="max-w-lg mx-auto">

//         {/* العنوان */}
//         <motion.h1
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="text-2xl sm:text-3xl font-semibold text-[#4B2E2B] mb-2 flex items-center gap-3"
//         >
//           📦 Checkout
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="text-[#4B2E2B99] text-sm mb-8"
//         >
//           Fill in your shipping details to place your order
//         </motion.p>

//         {/* الفورم */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.15 }}
//           className="bg-[#EADBC8] rounded-2xl border border-[#C08B5C33] p-6 flex flex-col gap-5"
//         >

//           {/* City */}
//           <div className="flex flex-col gap-1.5">
//             <label className="text-[#4B2E2B] text-sm font-medium">🏙️ City</label>
//             <input
//               name="city"
//               value={formData.city}
//               onChange={handleChange}
//               placeholder="e.g. Cairo"
//               className="bg-[#FAF7F0] border border-[#C08B5C33] rounded-xl px-4 py-2.5 text-sm text-[#4B2E2B] placeholder:text-[#4B2E2B55] outline-none focus:border-[#C08B5C] transition-all"
//             />
//           </div>

//           {/* Street */}
//           <div className="flex flex-col gap-1.5">
//             <label className="text-[#4B2E2B] text-sm font-medium">🛣️ Street</label>
//             <input
//               name="street"
//               value={formData.street}
//               onChange={handleChange}
//               placeholder="e.g. 12 Tahrir St."
//               className="bg-[#FAF7F0] border border-[#C08B5C33] rounded-xl px-4 py-2.5 text-sm text-[#4B2E2B] placeholder:text-[#4B2E2B55] outline-none focus:border-[#C08B5C] transition-all"
//             />
//           </div>

//           {/* Phone */}
//           <div className="flex flex-col gap-1.5">
//             <label className="text-[#4B2E2B] text-sm font-medium">📞 Phone</label>
//             <input
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               placeholder="e.g. 01012345678"
//               className="bg-[#FAF7F0] border border-[#C08B5C33] rounded-xl px-4 py-2.5 text-sm text-[#4B2E2B] placeholder:text-[#4B2E2B55] outline-none focus:border-[#C08B5C] transition-all"
//             />
//           </div>

//           {/* Payment Method */}
//           <div className="flex flex-col gap-2">
//             <label className="text-[#4B2E2B] text-sm font-medium">💳 Payment Method</label>
//             <div className="flex gap-3">

//               <button
//                 onClick={() => setFormData({ ...formData, paymentMethod: "cash" })}
//                 className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
//                   formData.paymentMethod === "cash"
//                     ? "bg-[#4B2E2B] text-[#FAF7F0] border-[#4B2E2B]"
//                     : "bg-[#FAF7F0] text-[#4B2E2B] border-[#C08B5C33] hover:border-[#C08B5C]"
//                 }`}
//               >
//                 💵 Cash
//               </button>

//               <button
//                 onClick={() => setFormData({ ...formData, paymentMethod: "card" })}
//                 className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
//                   formData.paymentMethod === "card"
//                     ? "bg-[#4B2E2B] text-[#FAF7F0] border-[#4B2E2B]"
//                     : "bg-[#FAF7F0] text-[#4B2E2B] border-[#C08B5C33] hover:border-[#C08B5C]"
//                 }`}
//               >
//                 💳 Card
//               </button>

//             </div>
//           </div>

//           {/* Error */}
//           {error && (
//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="text-red-500 text-sm text-center"
//             >
//               {error}
//             </motion.p>
//           )}

//         </motion.div>

//         {/* Total + Place Order */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4, delay: 0.3 }}
//           className="mt-4 bg-[#EADBC8] rounded-2xl border border-[#C08B5C33] p-4 sm:p-5 flex items-center justify-between flex-wrap gap-4"
//         >
//           <div>
//             <p className="text-[#4B2E2B99] text-sm mb-1">Total</p>
//             <p className="text-[#4B2E2B] text-xl sm:text-2xl font-semibold">{totalPrice} EGP</p>
//           </div>

//           <div className="flex gap-3 w-full sm:w-auto">

//             {/* Back */}
//             <motion.button
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.96 }}
//               onClick={() => router.back()}
//               className="bg-[#FAF7F0] text-[#4B2E2B] border border-[#C08B5C33] px-5 py-2.5 rounded-xl text-sm font-medium hover:border-[#C08B5C] transition-all duration-200 w-full sm:w-auto text-center"
//             >
//               ← Back
//             </motion.button>

//             {/* Place Order */}
//             <motion.button
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.96 }}
//               onClick={handleSubmit}
//               disabled={loading}
//               className="bg-[#C08B5C] text-[#FAF7F0] px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#4B2E2B] transition-all duration-200 w-full sm:w-auto text-center disabled:opacity-60"
//             >
//               {loading ? "Placing..." : "Place Order ✓"}
//             </motion.button>

//           </div>
//         </motion.div>

//       </div>
//     </div>
//   )
// }




"use client"


import { useRouter } from "next/navigation"
import { useState } from "react"
import { useSelector } from "react-redux"
import { motion } from "motion/react"

export default function CheckoutPage () {

const [loading , setLoading] = useState(false) 


const [error , setError] = useState("")



const [formData , setFormData] = useState({

 city : "" ,

 street : "" ,

 phone : "" ,

 PaymentMethod : "cash" // دة ديفولت 
 
})

const router = useRouter()

const {totalPrice} = useSelector((state:{ Carts : {totalPrice : number}}) => state.Carts)


const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

setFormData({...formData , [e.target.name] : e.target.value })


//  بنحدث داتا بتاع مستخدم فقط مش اكتر ولا اقل بعد كدة بقي هنستخدم فونشين عشان نجيب بيانات ونربطها بالاوردر باك اند

}



const handleSubmit = async() => {


if(!formData.city || !formData.phone || !formData.street) {

setError("Please fill in all field") // الفكرة انا كتبتها هنا مش فوق في فونشين عشان هنا بنبعت للباك اند بيانات دي فبقولوة لو مستخدم مكتبش حاجة في انبوت واحدة من دولت ابعتلة ايرورر ووقف الفونشين

return ; 

}

else{

 setLoading(true)

 setError("")

}




try{

const getToken = localStorage.getItem("token")

const res = await fetch("https://coffe-store-backend-seven.vercel.app/order" , {


 method : "POST" ,

 headers : {

  "Content-Type" : "application/json",
     
  Authorization : `Bearer ${getToken}`
 
 } ,

 body : JSON.stringify(formData)


})


if(!res.ok) {

setError("Something Went Wrong")

return ; 

}





await res.json()


router.push("/orders")

}

catch(e){

 setError("Something went wrong, please try again")  


}


finally {

setLoading(false)

}

}





return (

   <div className=" bg-[#FAF7F0] py-24 px-6">
       <div className="max-w-lg mx-auto">
        {/* العنوان */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-2xl sm:text-3xl font-semibold text-[#4B2E2B] mb-2 flex items-center gap-3"
        >
          📦 Checkout
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-[#4B2E2B99] text-sm mb-8"
        >
          Fill in your shipping details to place your order
        </motion.p>

        {/* الفورم */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="bg-[#EADBC8] rounded-2xl border border-[#C08B5C33] p-6 flex flex-col gap-5"
        >

          {/* City */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[#4B2E2B] text-sm font-medium">🏙️ City</label>
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="e.g. Cairo"
              className="bg-[#FAF7F0] border border-[#C08B5C33] rounded-xl px-4 py-2.5 text-sm text-[#4B2E2B] placeholder:text-[#4B2E2B55] outline-none focus:border-[#C08B5C] transition-all"
            />
          </div>

          {/* Street */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[#4B2E2B] text-sm font-medium">🛣️ Street</label>
            <input
              name="street"
              value={formData.street}
              onChange={handleChange}
              placeholder="e.g. 12 Tahrir St."
              className="bg-[#FAF7F0] border border-[#C08B5C33] rounded-xl px-4 py-2.5 text-sm text-[#4B2E2B] placeholder:text-[#4B2E2B55] outline-none focus:border-[#C08B5C] transition-all"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[#4B2E2B] text-sm font-medium">📞 Phone</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. 01012345678"
              className="bg-[#FAF7F0] border border-[#C08B5C33] rounded-xl px-4 py-2.5 text-sm text-[#4B2E2B] placeholder:text-[#4B2E2B55] outline-none focus:border-[#C08B5C] transition-all"
            />
          </div>

          {/* Payment Method */}
          <div className="flex flex-col gap-2">
            <label className="text-[#4B2E2B] text-sm font-medium">💳 Payment Method</label>
            <div className="flex gap-3">

              <button
                onClick={() => setFormData({ ...formData, PaymentMethod: "cash" })}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
                  formData.PaymentMethod === "cash"
                    ? "bg-[#4B2E2B] text-[#FAF7F0] border-[#4B2E2B]"
                    : "bg-[#FAF7F0] text-[#4B2E2B] border-[#C08B5C33] hover:border-[#C08B5C]"
                }`}
              >
                💵 Cash
              </button>

              <button
                onClick={() => setFormData({ ...formData, PaymentMethod: "card" })}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
                  formData.PaymentMethod === "card"
                    ? "bg-[#4B2E2B] text-[#FAF7F0] border-[#4B2E2B]"
                    : "bg-[#FAF7F0] text-[#4B2E2B] border-[#C08B5C33] hover:border-[#C08B5C]"
                }`}
              >
                💳 Card
              </button>

            </div>
          </div>

          {/* Error */}
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm text-center"
            >
              {error}
            </motion.p>
          )}

        </motion.div>

        {/* Total + Place Order */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-4 bg-[#EADBC8] rounded-2xl border border-[#C08B5C33] p-4 sm:p-5 flex items-center justify-between flex-wrap gap-4"
        >
          <div>
            <p className="text-[#4B2E2B99] text-sm mb-1">Total</p>
            <p className="text-[#4B2E2B] text-xl sm:text-2xl font-semibold">{totalPrice} EGP</p>
          </div>

          <div className="flex gap-3 w-full sm:w-auto">

            {/* Back */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => router.back()}
              className="bg-[#FAF7F0] text-[#4B2E2B] border border-[#C08B5C33] px-5 py-2.5 rounded-xl text-sm font-medium hover:border-[#C08B5C] transition-all duration-200 w-full sm:w-auto text-center"
            >
              ← Back
            </motion.button>

            {/* Place Order */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleSubmit}
              disabled={loading}
              className="bg-[#C08B5C] text-[#FAF7F0] px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#4B2E2B] transition-all duration-200 w-full sm:w-auto text-center disabled:opacity-60"
            >
              {loading ? "Placing..." : "Place Order ✓"}
            </motion.button>

          </div>
        </motion.div>

      </div>
    </div>
  

)


}





























































































