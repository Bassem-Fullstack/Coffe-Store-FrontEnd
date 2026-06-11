
"use client" 


import {motion} from "framer-motion"

import  Link  from "next/link";

import Images from "next/image"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/Redux/cartSlice";
import toast from "react-hot-toast";

type products = {

  _id : string ,
  
  name : string ,

  price : number ,
  
  images : 

    {
        url : string ,

        public_id : string
    }[]

  


};

type Props = {

PassProduct : products[]

}


export default function CategoriesProducts ({PassProduct} : Props) {


const [loading , setLoading] = useState(false)


const dispatch = useDispatch()

const handleClick = async (productId : string ) => {

// هنعمل زر ونستني لحد ما api تتحمل وتبعت رد ان منتج اتضاف

const token = localStorage.getItem("token")

  if (!token) {
    toast.error("Please login or register first ! 🔐")
    return // وقف الفانكشن
  }


if (loading) return ; // وقف الفونشين تحميل في حالة بيانات حملت او قفت مفيش بيانات

try {

setLoading(true)

await dispatch(addToCart(productId) as any)

toast.success("Added to cart! 🛒") 
}

finally {

 setLoading(false)

}


}


return(
   
  <section id="categories" className="py-32">

  <div className="container mx-auto px-6 lg:px-12">


  {
  PassProduct.length === 0 ? (

    <p className="text-center mt-28 text-gray-500">No Products Found</p>

  ) : (
    
    <div className="flex flex-wrap justify-center gap-10">

      {
        PassProduct.map((everyProduct , index) => (
       
         <motion.div key={everyProduct._id}
         
         initial={{ opacity: 0, y: 100 }}

        whileInView={{ opacity: 1, y: 0  }}
    
        transition={{ duration: 0.8 , delay : index * 0.1 }}
          
        className="w-full md:w-[45%] lg:w-[30%]"
         >



        <div className="rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(75,46,43,0.12)]  group cursor-pointer bg-gradient-to-br from-[#EADBC8] to-[#FAF7F0]">

       <div className="relative overflow-hidden">

        <Images
         
         alt={everyProduct.name} 

         src={everyProduct.images[0].url}
         
         width={500}
         
         height={500}
        
         priority

         className="w-full h-[250px] md:h-[200px] xl:h-[250px] object-cover group-hover:scale-105 transition-transform duration-500"
        />

       </div> {/* relative overflow-hidden */}
           
         
         <div className="p-5 flex flex-col gap-1">

        <h3 className="text-[#4B2E2B] font-bold text-lg line-clamp-1 text-center">{everyProduct.name}</h3>

        <p className="text-[#C08B5C] font-semibold mt-1 text-center"> {everyProduct.price} $ </p>

     
    
      
      <Link href={`/products/${everyProduct._id}`}>
      
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
      
      onClick={()=> handleClick(everyProduct._id)}
         
     disabled = {loading} 
      
      initial = {{opacity : 0 , scale : 0.95}}
      
      whileInView={{opacity : 1 , scale : 1.05}}
      
      transition={{duration : 0.8 , delay : 0.35}}
      
      viewport={{once: true}}
      
      className="bg-[#2B2B2B] w-full cursor-pointer py-3 text-center text-[#FAF7F0] rounded-xl font-medium mt-2"
      
      >
      
      Add To Cart
      
      </motion.button>

       


         </div> {/*  p-4  */}


       
         </div> {/* rounded-2xl overflow-hidden  */}
         
        

         </motion.div> //{/* w-full md:w-[45%] lg:w-[30%] */} 


        ))
      }



    </div> //{/* flex flex-wrap justify-center gap-10 */}

  )

  }


  </div> {/* container mx-auto px-6 lg:px-12 */}

 

   </section> //{/* py-14  */}






)

    
} 


