

"use client"

import Image from "next/image"

import { motion } from "motion/react"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { addToCart } from "@/Redux/cartSlice"
import { useState } from "react"
import toast from "react-hot-toast"


interface LimitProducts {

 // هنا انت بتكتب بروروب اللى هو انت كتبة في صفحة بروديكت مش بتكتب المصفوفة هنا ركز انت هنا بتبعت بروديكيت اوبجكيت فقط لكل منتج مش بتبعت مصفوفة هنا ركز

product  : {
 
  _id : string ,

  name : string ,

  price : number ,

  description : string ,

  images : {

    url : string ,

  }[]



}


}




export default function ProductCard ({product} : LimitProducts ) {


const [loading , setLoading] = useState(false)


const dispatch = useDispatch()

const handleClick = async (productId : string ) => {

// هنعمل زر ونستني لحد ما api تتحمل وتبعت رد ان منتج اتضاف

const token = localStorage.getItem("token")

  if (!token) {
    toast.error(" Please login or register first ! 🔐")
    return // وقف الفانكشن
  }

if (loading) return ; // وقف الفونشين تحميل في حالة بيانات حملت او وقفت مفيش بيانات

try {

setLoading(true)

await dispatch(addToCart(productId) as any)

toast.success("Added to cart! 🛒") 
}

finally {

 setLoading(false)

}


}



return (

  <>
 
 <motion.div
 
 initial = {{ opacity : 0 , y : 100 }}
 
 whileInView={{ opacity : 1 , y : 0}}

 viewport={{once : true , amount : 0.3 }}

 transition={{duration : 0.8 , delay : 0.2}}

className="bg-gradient-to-r from-[#FAF7F0] to-[#EADBC8] overflow-hidden border border-[#C08B5C] rounded-xl shadow-lg"
 >


<div className="relative w-full md:h-[200px] h-[220px]">

<Image

alt={product.name}
fill
src={product.images[0].url}

className="object-cover hover:scale-110 transition-transform duration-500"

/>

</div>  {/* bg-[#C08B5C] overflow-hidden border */}



<div className="p-5 flex flex-col gap-2">


<h2 className="text-[#4B2E2B] text-lg font-semibold text-center line-clamp-1">{product.name}</h2>

<p className="text-[#4B2E2B] font-semibold text-base text-center">{product.price}$ </p>


<Link href={`/products/${product._id}`}>


<motion.div

initial = {{opacity : 0 , scale : 0.95}}

whileInView={{opacity : 1 , scale : 1.05}}

transition={{duration : 0.8 , delay : 0.35}}

viewport={{once: true}}

className="bg-[#4B2E2B] w-full py-3 text-center text-[#FAF7F0] rounded-xl font-medium mt-2"

>


View Details

</motion.div>

</Link>


<motion.button

  onClick={()=> handleClick(product._id)}
         
  disabled = {loading} 
      
initial = {{opacity : 0 , scale : 0.95}}

whileInView={{opacity : 1 , scale : 1.05}}

transition={{duration : 0.8 , delay : 0.35}}

viewport={{once: true}}

className="bg-[#2B2B2B] w-full cursor-pointer py-3 text-center text-[#FAF7F0] rounded-xl font-medium mt-2"

>

Add To Cart

</motion.button>



</div> {/* p-4 space-y-3 */}


 </motion.div> {/* bg-[#C08B5C] overflow-hidden border */}



 </>

)




}





















