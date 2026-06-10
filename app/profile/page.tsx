

"use client"

import { useEffect, useState } from "react"

import { useRouter } from "next/navigation"

import Image from "next/image"

export default function ProfilePage () {

 type User = {
  
 username : string,

  email : string ,
 
  avatar ?:{
    
    url : string
  }

 }



const [user , setUser] = useState <User | null >(null)

const [loading , setLoading] = useState(true)




const router = useRouter()

useEffect(()=> {

const getToken = localStorage.getItem("token")


if(!getToken){

router.push("/login")

return ; // وقف الفونشين لو مفيش توكين موجود و ودية لصفحة لوجين يسجل دخول عشان ياخد توكين

}



const getDataUser = async () => {

const res = await fetch("https://coffe-store-backend-seven.vercel.app/users/profile" , {

headers: {

  Authorization : `Bearer ${getToken} `

}

})


if(res.status === 401){

 router.push("/login")
return ;
} 


const data = await res.json() // نبعت رد عن طريقة جيسون

if(data){

setUser(data)

setLoading(false)

} 

}

getDataUser()


},[])



const UploadImage = async (file : File) => {


const getToken = localStorage.getItem("token")  


const formData = new FormData()


formData.append("image" , file) // الفايل دة بارميتر الصورة مستخدم رفعها من خلال جهازة

const res = await fetch("https://coffe-store-backend-seven.vercel.app/users/upload" , {

method : "POST" ,

headers:{

Authorization : `Bearer ${getToken}`


},


body : formData // احنا هنبعت صورة على سيرفر عشان خاطر صورة موجودة على جهاز مستخدم مش موجود على سيرفر وكمان بنعرف السيرفر ان دة فايل في صورة في بادي عشان ميتجاهلاش لو انت معرفتوش كدة


})


const data = await res.json()

setUser((prev)=> {

if(!prev) return prev ;

return{

...prev , // استخدمت دة بدل ما المستخدم يروح يعمل ريفريش عشان يحدث الصورة لوحدها بدل ما المستخدم يروح يعمل ريفريش

avatar : data.avatar


}

})


}


  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#FAF7F0]">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#4B2E2B] border-t-transparent"></div>
      </div>
    );
  }
if(!user) return <p className="text-center pt-44 text-[#2B2B2B] text-xl"> No User!</p>


return (


 <div className="flex py-44 md:py-60 lg:py-36 items-center justify-center ">

    
  <div className="p-6 shadow-lg rounded-xl text-center w-80">

   <h1 className="mb-4 text-xl text-[#4B2E2B] font-bold">Profile</h1>

     
     <label className="cursor-pointer mb-2 inline-block px-4 py-2 bg-[#4B2E2B] text-[#FAF7F0] rounded">

     Upload Image
      
     <input
      
     type="file" 

     accept="image"

     className="hidden"

     onChange={(e)=> {

      if(e.target.files?.[0]){
        
       UploadImage(e.target.files[0]) //بقولوة لو في صورة اختياري مش اجباري عشان كدة حطيت علامة استفهام عشان ميضربليش ايرورر خلية ينزلها لو عايز ينزلها طيب فايل دة خاصية في انبوت بيتعامل على ان صور عندك دي كلها او فايل عندك دي كلها على شكل مصفوفة عشان كدة كتبت صفر  واستدعيت فونشين صورة هنا وعملنا الشرط هنا عشان نتأكد ان فية صورة ولا لاء بدل ما يضربلنا ايرورر بعد ما ارفع صورة لاء بقولوة اتأكد فية صورة ولا لاء

      }

     }}
      
     />

     </label> {/* cursor-pointer mb-2 inline-block px-4 py-2 bg-black text-white rounded  */}


      {
        user.avatar?.url? (

        <Image  
        
         alt={user.avatar.url}

          width={100}

          height={100}

          className="rounded-full mx-auto"
          
        src={user.avatar.url}

        />

        )
        
        :(
      
        <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto"> </div>      

        )

   

      }


 <h2 className="mt-3 font-semibold">{user.username}</h2>       <p className="text-gray-500">{user.email}</p>


  </div>  {/* p-6 shadow-lg rounded-xl text-center w-80  */}



 </div> //{/*  h-screen flex items-center justify-center  */}






)



}















