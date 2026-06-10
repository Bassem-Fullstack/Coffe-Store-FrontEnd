

"use client"

import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"



export default function AdminLayout ({children} : {children : React.ReactNode}){


const router = useRouter() // عشان نتقل على طول لصفحة في حالة لو مستخدم مطلعش ادمن


useEffect(()=> {

// هنجيب التوكين والرول بتاع يوسير ونتأكد من هويتة ولو طلع مش هو الادمن نفسة هيودية لصفحة لوجين ويسجل كمستخدم


const getToken = localStorage.getItem("token")


const role = localStorage.getItem("admin")


if(!getToken || role !== "admin") {

router.push("/")

}



} , [router]) // استخدمنا يوس ايفكت عشان نعرض محتوي مرة واحدة ويشتغل مرة واحدة مش كل مرة



const pathname = usePathname()


const [isOpen , setOpen] = useState(false)



const removeToken = () => {


localStorage.removeItem("token")

 localStorage.removeItem("admin")
  
 document.cookie = "token=; path=/; max-age=0"
  
 document.cookie = "role=; path=/; max-age=0"

  window.location.href = "/" 

}


return (


<div className="py-2">

<style>{`nav { display : none !important }`}</style> {/* / بقولوة اي حاجة اسمها نافا واخدة كلاس نافا في موقع كلة اخفيهالي في صفحة دي */}


{/* <style>{`section { display : none !important }`}</style> */}



<div className="lg:hidden  border border-b p-4 mt-5 rounded-2xl  bg-[#4B2E2B]">


<div className="flex justify-between items-center w-full">



<h1 className="text-xl font-bold text-center text-[#FAF7F0]">Admin Panel</h1>



<button onClick={()=> setOpen(!isOpen)} 

className={`p-1 transition-all duration-500 hover:bg-white/10 ${isOpen ? "rotate-180" : "rotate-0"} `}>


{

 isOpen ? <X className="w-7 h-7 text-[#FAF7F0]" />

 : <Menu className="w-7 h-7 text-[#FAF7F0]" />

}


</button>

</div> {/*  md:hidden border border-b p-4 mt-5 rounded-2xl  bg-[#4B2E2B] */}


{
  
  isOpen &&(

    <div className="flex flex-col gap-3 text-center overflow-hidden"> 
   
      <Link href="/admin" className="hover:bg-[#C08B5C] transition-all duration-150  p-2 rounded-lg    w-full text-[#FAF7F0]">Dashboard</Link>

     <Link href="/admin/products" className="hover:bg-[#C08B5C]  transition-all duration-150 p-2 rounded-lg  w-full text-[#FAF7F0]">Products</Link>

      <Link href="/admin/users" className="hover:bg-[#C08B5C]  transition-all duration-150  p-2 rounded-lg  w-full text-[#FAF7F0]">Users</Link>

      <Link href="/admin/orders" className="hover:bg-[#C08B5C] transition-all duration-150  p-2 rounded-lg    w-full text-[#FAF7F0]">Orders</Link>

<button onClick={removeToken} className="hover:bg-red-600 transition-all duration-150  p-2 rounded-lg    w-full text-[#FAF7F0]">Logout</button>

    </div> //{/* flex flex-col gap-3 text-center overflow-hidde */}
  )

}



 </div> {/*lg:hidden text-center border border-b p-5 mt-5 rounded-lg bottom-2 bg-[#4B2E2B] */}





<div className="hidden lg:flex">


<div className="w-64 min-h-screen flex flex-col rounded-xl text-[#EADBC8] bg-[#4B2E2B]">


<div className="flex flex-col items-center gap-3 pt-20">


<Link href="/admin"

className={`relative after:absolute after:left-0 after:bottom-0 after:w-full after:scale-x-0 after:h-[2px] after:bg-[#C08B5C]
  
   hover:after:scale-x-100 after:transition-all 
  
   ${pathname === "/admin" ? "after:scale-x-100" : ""}


  `}

>
   
  Dashboard 

 </Link>



<Link href="/admin/products" 

className={`relative after:absolute after:bottom-0 after:left-0 after:w-full after:scale-x-0 hover:after:scale-x-100 after:h-[2px] after:bg-[#C08B5C] after:transition-all
  
  ${pathname === "/admin/products" ? "after:scale-x-100" : ""}
  
  `}

>

Products

</Link>
 
   

 <Link href="/admin/users"
 
 className={`relative after:absolute after:left-0 after:bottom-0 after:w-full after:scale-x-0 after:h-[2px] after:bg-[#C08B5C]
  
    hover:after:scale-x-100 after:transition-all

    ${pathname === "/admin/users" ? "after:scale-x-100" : ""}
  `}

 >
   

  Users 


 </Link>


<Link href="/admin/orders"

className={`relative after:absolute after:left-0 after:bottom-0 after:w-full after:scale-x-0 after:h-[2px] after:bg-[#C08B5C]
  
   hover:after:scale-x-100 after:transition-all 
  
   ${pathname === "/admin/orders" ? "after:scale-x-100" : ""}


  `}

>
   
  Orders 

 </Link>




<button onClick={removeToken} className="relative after:absolute after:left-0 after:bottom-0 after:w-full after:scale-x-0 after:h-[2px] after:bg-[#C08B5C] hover:after:scale-x-100 after:transition-all">Logout</button>



</div> {/* flex flex-col items-center gap-34 */}


</div> {/*  w-64 flex flex-col rounded-xl bg-[#4B2E2B]  */}

<div className="flex-1">

{children}

</div> {/* flex-1  */}

</div> {/* min-h-[64vh] flex  */}



<div className="lg:hidden">

  {children}

</div>


 </div> //{/* py-24 */}

)

}























