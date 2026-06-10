


"use client"

import { useEffect, useState } from "react"

import { useTypewriter , Cursor } from "react-simple-typewriter"

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

import { motion } from "motion/react" 

export default function DashboardPage () {

const [productCounts , setProductCounts] = useState(0)

const[userCounts , setUserCounts] = useState(0)

const [ordersCounts , setOrdersCounts] = useState(0)

const [loading ,setLoading] = useState(false)

const [error , setError] = useState("")


const [text] = useTypewriter({

words : ["Loading..."] ,

loop : true , 

delaySpeed : 2000,

typeSpeed : 50 ,

deleteSpeed : 50

})



useEffect(()=> {


const getProducts = async() => {

setLoading(true)
  
try{

const res = await fetch("https://coffe-store-backend-seven.vercel.app/products" , {

 headers : {

  Authorization: `Bearer ${localStorage.getItem("token")}`

 }
   
})


if(!res.ok){

 throw new Error ("Can't Found Products") 

}


const data = await res.json()


setProductCounts(data.length)

}

catch(e) {

setError(String(e))

}


finally {
  setLoading(false)
}


}

getProducts() 


//////////////////////////////////////////////////////////////////////////////////////////////////////// 


const getUsers = async() => {

setLoading(true)
  
try{

const res = await fetch("https://coffe-store-backend-seven.vercel.app/users" , {

 headers : {

  Authorization: `Bearer ${localStorage.getItem("token")}`
  
 }
   
})


if(!res.ok){

 throw new Error ("Can't Found Users") 

}


const data = await res.json()


setUserCounts(data.length)

}

catch(e) {

setError(String(e))

}


finally {
  setLoading(false)
}


}

getUsers() 



///////////////////////////////////////////////////////////////////////////////////////////////////////////




const getOrders = async() => {

setLoading(true)
  
try{

const res = await fetch("https://coffe-store-backend-seven.vercel.app/order/all" , {

 headers : {

  Authorization: `Bearer ${localStorage.getItem("token")}`
  
 }
   
})


if(!res.ok){

 throw new Error ("Can't Found Users") 

}


const data = await res.json()


setOrdersCounts(data.length)

}

catch(e) {

setError(String(e))

}


finally {
  setLoading(false)
}

}

getOrders() 




},[])


const data = [

  {
    name : "Products" , value : productCounts
  },

  
  {
    name : "Users" , value : userCounts
  },
 

   {
    name : "Orders" , value : ordersCounts
  },

]


if(loading) return <p className=" text-xl text-center pt-28 font-bold text-[#4B2E2B]"> {text} <Cursor/> </p>


if(error) return <p className="text-xl text-center font-bold text-red-600"> {error} </p>


return (

  <motion.div className="p-6 mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4"
  
  initial={{opacity : 0 , y : 80}}

  whileInView={{opacity : 1 , y:0}}

  transition={{ duration : 0.72 }}
 
  
  >

    <div className="bg-gradient-to-r from-[#EADBC8] to-[#FAF7F0] border border-[#C08B5C]/40 rounded-xl p-6 text-center shadow-sm">

      <p className="text-[#4B2E2B] font-bold text-lg">Products</p>

      <p className="text-4xl font-bold text-[#C08B5C]">{productCounts}</p>

    </div>

    <div className="bg-gradient-to-r from-[#EADBC8] to-[#FAF7F0] border border-[#C08B5C]/40 rounded-xl p-6 text-center shadow-sm">

      <p className="text-[#4B2E2B] font-bold text-lg">Users</p>
      <p className="text-4xl font-bold text-[#C08B5C]">{userCounts}</p>
    </div>

    <div className="bg-gradient-to-r from-[#EADBC8] to-[#FAF7F0] border border-[#C08B5C]/40 rounded-xl p-6 text-center shadow-sm">
      <p className="text-[#4B2E2B] font-bold text-lg">Orders</p>
      <p className="text-4xl font-bold text-[#C08B5C]">{ordersCounts}</p>
    </div>


   <div className="col-span-1 sm:col-span-3 bg-white border border-[#EADBC8] rounded-xl p-6 shadow-sm">

  <p className="text-[#4B2E2B] font-bold text-lg mb-4">Overview</p>

  <ResponsiveContainer width="100%" height={300}>

    <BarChart data={data}>

      <XAxis dataKey="name" />

      <YAxis />

      <Tooltip />

      <Bar dataKey="value" fill="#C08B5C" />

    </BarChart>
    
  </ResponsiveContainer>
  
</div>

  </motion.div >





)

}
