
"use client"

import { useEffect, useState } from "react"

import { useTypewriter , Cursor } from "react-simple-typewriter"

import { motion } from "motion/react"
 interface OrderItems {

   product : {

  _id : string , 

  name : string ,

}

quantity : number ,

price : number 

}

 interface Orders {

_id : string ,

user : string ,

totalPrice : number ,

status : string ,

paymentStatus : string ,

paymentMethod : string ,

items : OrderItems[] 

}


export default function OrdersAdmin () {


const [orders , setOrders] = useState <Orders[]> ([])


const [loading , setLoading] = useState(false)


const [error , setError] = useState("")

const [text] = useTypewriter({

words : ["Loading..."] ,

loop : true , 

delaySpeed : 2000,

typeSpeed : 50 ,

deleteSpeed : 50

})

 
useEffect(()=> {

 const getAllOrders = async () => {

setLoading(true)

 try{

  const res = await fetch ("https://coffe-store-backend-seven.vercel.app/order/all" , {

   headers : {

      Authorization: `Bearer ${localStorage.getItem("token")}`

   }

  })
  
  if(!res.ok){
    
    throw new Error ("Can't Found Orders") 
  }
 

const data = await res.json()


setOrders(data)

}


catch(e) {

 setError(String(e))   

}


finally {

setLoading(false)

}

}


getAllOrders()

}, [])


if(loading) return <p className="text-xl text-center mt-12 font-bold text-[#4B2E2B]"> {text} <Cursor/> </p>


if(error) return  <p className="text-xl text-center font-bold text-red-600"> {error} </p>


return (

 <div className="p-6 mt-10">

<motion.h1 className="text-2xl border-b-2 font-bold mb-5 pb-2 border-[#4B2E2B]/10 text-[#4B2E2B] text-center"

 initial={{opacity : 0 , y : 80}}

  whileInView={{opacity : 1 , y:0}}

  transition={{ duration : 0.72  }}
  
viewport={{once : true}}

>Orders</motion.h1>
 

 {
  
  orders.map((everyOrder , index)=> (
   
<motion.div key={everyOrder._id} className="border border-[#EADBC8] rounded-xl p-2 mb-4 bg-white shadow-sm"

 initial={{opacity : 0 , y : 80}}

  whileInView={{opacity : 1 , y:0}}

  transition={{ duration : 0.72 , delay : index * 0.1  }}

  viewport={{once : true}}

>

  {/* معلومات الأوردر */}
  <div className="flex flex-wrap gap-3 mb-3
  ">
<span className={`text-sm px-3 py-1 rounded-full ${
  everyOrder.status === "delivered" 
    ? "bg-green-600 text-white" 
    : everyOrder.status === "cancelled"
    ? "bg-red-500 text-white"
    : "bg-[#4B2E2B] text-[#FAF7F0]"
    
}`}> {everyOrder.status}</span>    
  
  <span className="text-sm bg-[#EADBC8] text-[#4B2E2B] px-3 py-1 rounded-full">{everyOrder.paymentMethod}</span>

    <span className="text-sm bg-[#EADBC8] text-[#4B2E2B] px-3 py-1 rounded-full">{everyOrder.paymentStatus}</span>

    <span className="font-bold text-[#4B2E2B]">Total: {everyOrder.totalPrice}$</span>

  </div>

  {/* المنتجات */}
  {everyOrder.items.map((item) => (
    <div key={item.product._id} className="flex flex-col md:flex-row md:justify-between items-center bg-[#FAF7F0] rounded-lg gap-2 p-2 mb-4">
      <p className="text-[#4B2E2B] font-medium">{item.product.name}</p>
      <p className="text-sm text-gray-500">x{item.quantity}</p>
      <p className="text-sm font-bold text-[#C08B5C]">{item.price}$</p>
    </div>
  ))}

</motion.div>

  ))

 }


 </div> //{/*   p-6 mt-10  */}


    

)








}