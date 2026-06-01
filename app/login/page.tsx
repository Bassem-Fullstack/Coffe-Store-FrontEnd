
"use client"

// import { useRouter } from "next/navigation"

import { useState } from "react"

import { useTypewriter , Cursor} from "react-simple-typewriter"

import { motion } from "motion/react"

export default function Login (){

const [Form , setForm] = useState({

email : "" ,

password : "" //بنعمل فورم نخزن فية البيانات اللى مستخدم سجل فية بياناتة وبعد كدة بنحدث بيانات دي  

})


const [error , setError] = useState("")


const [loading , setLoding] = useState(false) // استخدمنا فولس عشان خاطر لو مستخدم مسجلش لسة دخول لكن لو سجل دخول بنحول الشرط لترو ونستني لحد ما عملية تسجيل دخول تتم دة بنعملوة عشان خاطر مستخدم ممكن يسجل تسجيل دخول مرتين ويطلع ايرورر فبنمنع سلوك زاي دي


// const router = useRouter()

const [text] = useTypewriter({

 words : ["Loading..."],

 loop : true ,

 delaySpeed : 200 ,

 deleteSpeed : 50 ,

 typeSpeed : 50

})


const handleSubmit = async (e : React.FormEvent)=> {


// (e : {e : FormEvent}) هنا بقولوة لتايب سكريت ان حرف ايية دة نوعة فورم ايفينت يعني عبارة عن فورم مسؤول عن حدث فورم في حالة تسجيل دخول وخروج هنستخدمة عشان لما بنيجي نضغط على زر تسجيل دخول بنلاقي عمل ريفرش لوحدة واحنا مش عايزين كدة احنا عايزين نعرض لمستخدم ان تسجيل تم النجاح او في ايرورر


e.preventDefault() 


setLoding(true) // ابدء بتحميل بيانات و وقف سلوك افتراضي بتاع زر تسجيل


setError("") // امسح اي ايرورر قديم كان موجود مستخدم سجلوة قبل كدة

//  عملنا فونشين مسولة على زر  يخزن بيانات مستخدم في مونجو ديبي عشان كدة موضوع بياخد وقت


try { 

const res = await fetch("https://coffe-store-backend-seven.vercel.app/users/login" , {

method : "POST" , // ميثود بوست اللى استخدمنا في بوست في باك اند في بوست مان

headers : {"Content-Type" : "application/json"} , // بقولوة في هيدر وبعرف سيرفر ان ابلكيشن جايلك دة جيسون

body : JSON.stringify(Form) // بقولوة البيانات هبعتهالك على هيئة جيسون


}) 



const data = await res.json() // بقولوة الرد هترجعلي بيانات على هيئة جيسون برضو 

if(!res.ok){

 setError(data.message || "Login Failed")

 return ; // وقفلي العملية فونشين

}

// res.status(200).send({
//   user: { id, email, username, role },  // ← أوبجيكت اسمه user
//   token باك اند بيرجع الرد كدة هناك في كونتلير بتاع لوجين
// })

localStorage.setItem("token" , data.token)

localStorage.setItem("user" , data.user.role)

window.location.href="/"

}

catch(e){

setError(String(e))

}

finally {

 setLoding(false)

}

}



return (

<div className="min-h-[100vh] bg-[#1a0e0b] flex items-center justify-center p-6 md:p-4">

<motion.div className="bg-[#2d1a14] border border-[#3d2318] rounded-2xl p-8 mt-14 w-full max-w-md"

initial = {{opacity : 0 , scale : 0.95}}

whileInView={{opacity : 1 , scale : 1.05}}

transition={{duration : 0.8 , delay : 0.30}}

viewport={{once: true}}

>
        
  <h1 className="text-[#EADBC8] text-2xl font-bold text-center mb-6">
         Login ☕
  </h1>

{
  error && (

 <p className="bg-red-900 text-red-300 p-3 rounded-lg mb-4 text-sm">
  
    {error} {/* لو فية ايرورر اعرضلي ايرورر رسالة بتاعت ايرورر في حالة لو فية ايرورر فقط عشان كدة استخدمت شرط فقط  */}
             
      </p>

  )
}


<motion.form onSubmit={handleSubmit} className="flex flex-col gap-5">

<div className="input-email">

<label className="text-[#FAF7F0] text-sm mb-1 block">Email</label>


<input 

type="email"

placeholder="you@example.com"

value={Form.email}

onChange={(e)=> setForm ({...Form , email : e.target.value })}

className="w-full bg-[#1a0e0b] border border-[#3d2318] rounded-lg px-3 py-2 text-[#FAF7F0] focus:outline-none focus:border-[#C08B5C]"

/>


</div> {/* input-email */}



<div className="input-email">

<label className="text-[#FAF7F0] text-sm mb-1 block">Password</label>


<input 

type="password"

placeholder="Min 8 chars, A-Z, 0-9, !@#"

value={Form.password}

onChange={(e)=> setForm ({...Form , password : e.target.value })}

className="w-full bg-[#1a0e0b] border border-[#3d2318] rounded-lg px-3 py-2 text-[#FAF7F0] focus:outline-none focus:border-[#C08B5C]"

/>


</div> {/* input-email */}


<button

type="submit"

disabled = {loading}

className="bg-[#C08B5C] text-[#1a0e0b] font-bold py-2 rounded-lg hover:bg-[#d4996a] transition-all disabled:opacity-50"

>


{loading ? (
<>
{text}

<Cursor/>

</>

) : ( " Sign In " ) }



</button>


</motion.form> {/* flex flex-col gap-5 */}

 </motion.div> {/* min-h-screen bg-[#1a0e0b] flex items-center */}

 </div> //{/* bg-[#2d1a14] border border-[#3d2318] rounded-2xl */}

)


}  









