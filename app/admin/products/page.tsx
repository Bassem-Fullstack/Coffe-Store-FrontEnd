
"use client"

import Image from "next/image"

import { useEffect, useState } from "react"

import { useTypewriter , Cursor } from "react-simple-typewriter"

import toast from "react-hot-toast"

import { motion } from "motion/react"
import { delay } from "motion"

 interface Products {

_id : string ,

name : string ,

images : {

 url : string ,
  
 public_id : string

}[]


category  : {_id : string , name : string }


price : number

}




interface Categories {

 _id : string ,

 name : string

}


export default function PageProductsAdmin () {


const [text] = useTypewriter({

words : ["Loading..."] ,

loop : true , 

delaySpeed : 2000,

typeSpeed : 50 ,

deleteSpeed : 50

})


const [products , setProducts] = useState<Products[]>([])  


const [loading , setLoading] = useState(false)


const [error , setError] = useState("")


const [categories , setCategories] = useState<Categories[]>([])


useEffect(()=> {

// # products 

setLoading(true)

const fetchProducts = async () => {

try{

  const res = await fetch("https://coffe-store-backend-seven.vercel.app/products")
    
  
 if(!res.ok){

  throw new Error("Can't Fetch Data")

 }


const data = await res.json()


setProducts(data)



/////////////////////////////////////////////////////////////////////////////////////////// 


// #categoires 


const respond = await fetch("https://coffe-store-backend-seven.vercel.app/categories")



if(!respond.ok) {

 throw new Error("Can't find Categoires")

}


const dataCategoires = await respond.json()


setCategories(dataCategoires)





}


catch(e){


setError(String(e))

}



finally{

setLoading(false)

}



}


fetchProducts()


} , [])




const DeleteProducts = async (productId:string) => {


const confirm = window.confirm("would you like to remove product??")

if(!confirm) return ;

try{


const res = await fetch(`https://coffe-store-backend-seven.vercel.app/products/${productId}` , {

   method : "DELETE" ,

  headers : {

  Authorization: `Bearer ${localStorage.getItem("token")}`

  }


})


if(!res.ok) {

  throw new Error("Failed to delete")
}


setProducts(pro=> pro.filter(p=> p._id !==productId)) // انت هنا بتقارن منتجات متخزنة في سيت بروديكت بقارن الايدي بقولو الايدي جاي من لينك نفس الايدي متخزن عندي في سيت بروديكتس متحطوش يعني احذفة

toast.success("product has deleted")

}


catch(e){

toast.error("Failed to delete")

}

}





const updateProducts = async (productId:string , name:string , category : {_id : string , name : string} , price : number) => {



const oldProducts = products.find((p)=> p._id === productId) // بيجيب المنتج الايدي بتاعة بيساوي نفس الايدي بتاع ستيت متخزن عندي في منتجات فوق في ستيت


const hasChanged = 

oldProducts?.name !== name || oldProducts?.price !== price || oldProducts?.category._id !== category._id 


// لما يجيب الايدي بتاع منتج من باك اند لينك ويقارنة بالايدي بتاع منتج متخزن عندك في ستيت هيلاقية نفس المنتج ونفس الاسم ونفس تفاصيل احنا بنقولوة لو المنتج مش نفس المنتج ولو السعر مش نفس السعر لو فئة مش نفس سعر حدثهم طيب لو نفس اسم منتج ونفس السعر خلاص ارميلي ايرور وقولوة مفيش حاجة اتحدثت ووقف فونشين 


if(!hasChanged){

 toast.error("Nothing has updated")
 
 return;

 // بقولوة لو قيمة اتغيرت سيبها متعملش حاجة طيب لو قيمة متغيرتش مفيش ولا قيمة من دولت اتحدثت قولوة في ايرور مفيش حاجة اتحدثت

}


const confirm = window.confirm("would you like to update product??")

if(!confirm) return ;

try{

const res = await fetch(`https://coffe-store-backend-seven.vercel.app/products/${productId}` , {

   method : "PATCH" ,

  headers : {

  Authorization: `Bearer ${localStorage.getItem("token")}`,

  "Content-Type" : "application/json"

  },
  
  body : JSON.stringify({

    productId ,

    name ,

    price ,

    category

  })


})


if(!res.ok) {

  throw new Error("Failed to update")
}



setProducts(pro=> pro.map(p=> p._id ===productId ? { ...p ,name , category , price } : p ))


toast.success("product has updated")

}


catch(e){

toast.error("Failed to update")

}

}


const [editProducts , setEditProducts] = useState< Products | null >(null) 

// هنا انا بعدل على المنتج عملت ستيت سميتوة نال يعني هنخزن فية القيم اللى احنا عدلنا علية الفكرة نال هنا قيمتها اوبجكيت مستخدمناش ترو ولا فولس يعني نال نوعها اوبجكيت ممكن تخزن اوبجكيت او تكون قيمة فاضية




const [newImage , setNewImage] = useState <File | null>(null)


const updateImage = async (productId:string , public_id:string)=>{

try{

if(!newImage) return; // وقف الفونشين لو صورة متحدثتش

const formData = new FormData()

formData.append("image" , newImage)

const res = await fetch(`https://coffe-store-backend-seven.vercel.app/products/${productId}/images/${public_id}`,{

 method : "PATCH" ,

 headers : {

  Authorization : `Bearer ${localStorage.getItem("token")}`
 },

 body : formData

})


const data = await res.json()


setProducts(pro=> pro.map(p=> p._id === productId ? { ...p , images:data.images } : p))


if (!res.ok) throw new Error("Failed to update image")



}

catch(e){

 setError(String(e)) 

}

}



const [addProducts , setAddProducts] = useState({

name : "" ,

category : {_id : "" , name : ""},

image : null as File | null , // بقولوة قيمة دي اصلها نال بس لو مش موجودة سيبها مكانها نال وبقولوة ممكن تكون فايل لو مفيش فايل هتكون نال في اخر عشان عمو تايب سكريبت حساس لحاجات زاي دي فلازم نوضحلوة كل كود بنكتبوة  

price : 0 ,

description : "" ,

stock : 0

})



const [showModle , setShowModel] = useState(false)



const CreateProducts = async () => {


try{


const {name , price , category , image , description , stock} = addProducts



if(!name || !price || !category.name || !image || !description || !stock) {

toast.error("Plase Fill All Files")

return ; // وقفلي  الفونشين ومتبعتش حاجة لباك اند

}


const formData = new FormData() // بص احنا هنستخدم فورم داتا عشان خاطر صورة فورم داتا بتاخد حاجتين فقط قيمة سترينج وفايل الفايل دة اللى هنرفعوة بة صورة ويخلي مستخدم يرفع الصورة وباقي قيم هنحولة لسترينج وهناك الباك اند هيتعامل هيحول السعر لرقم او بتعامل هو بقي 


// append  يعني كلمة ابينيت يعني يضيف يعني حط دة و دي خاصية موجودة في فورم داتا


formData.append("name" , name ) 

formData.append("price" , String(price))

formData.append("category" , category._id)  

if(image) formData.append("images" , image) // استخدمت الشرط هنا عشان تايب سكريبت بيزعل من اي حاجة حساسة بقولوة لو صورة موجودة اعرضلي صورة

formData.append("description" , description)

formData.append("stock" , String(stock))

const res = await fetch(`https://coffe-store-backend-seven.vercel.app/products` , {

method : "POST" ,

headers : {
  
  Authorization : `Bearer ${localStorage.getItem("token")}`

},

body :formData


})  


if(!res.ok) throw new Error ("Failed to create")

const data = await res.json()

console.log(data);

setProducts(allpro=> [...allpro , data]) // بنحافظ على داتا قديمة متخزنة عندنا عشان ميضيفش داتا جديدة عليها وتحل محلها بقولوة انسخلي داتا دي عندك مع الجديدة يعني ميضفهاش عليها

toast.success("Product has Added")

setShowModel(false) // تقفل الموديل على طول بعد ما انشأت المنتج

}


catch(e){

setError(String(e))

}

}






return (
<>

<motion.div className="p-4 mt-10"

 initial={{opacity : 0 , y : 80}}

  whileInView={{opacity : 1 , y:0}}

  transition={{ duration : 0.72 }}
>

<h1 className="text-2xl border-b-2 font-bold mb-5 pb-2 border-[#4B2E2B]/10 text-[#4B2E2B] text-center">Products</h1>

{

 loading && ( <p className=" text-xl text-center font-bold text-[#4B2E2B]"> {text} <Cursor/> </p>  )

}



{

 error && ( <p className="text-xl text-center font-bold text-red-600"> {error} </p>  )

}



{
 
 !loading && (

  <div className="flex justify-center mb-5">

 <button onClick={()=> setShowModel(true)} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition-all"> Add Product </button>

</div> //{/*  flex justify-center mb-5  */} نعرض زرار لما لودينج يخلص تحميل

 )

}




{

 showModle && (
  
<div className="bg-gradient-to-r from-[#FAF7F0] to-[#EADBC8] fixed z-[9999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[50%] overflow-hidden">


<div className="flex flex-col gap-2 p-3">

 <label className="flex flex-col gap-1 text-[#4B2E2B]">

  <span>Name Product</span> 
    
   <input  className="text-[#FAF7F0] border-none outline-[#C08B5C] bg-[#4B2E2B] p-1 rounded-md" type="text" value={addProducts.name} onChange={(e)=> setAddProducts({...addProducts , name : e.target.value})}  />
 
 </label> {/* bg-gradient-to-r from-[#FAF7F0] to-[#EADBC8]  */}






 <label className="flex flex-col gap-1 text-[#4B2E2B]">

  <span>Category Product</span> 
    

  <select
   
   onChange={(e)=> {

  const catchId = e.target.value // مسكنا الايدي بتاع كل فئة عشان نشغل الحدث
     
  const catchName = e.target.options[e.target.selectedIndex].text 
  
  // انا هنا مسكت نيم ازاي بقولوة في تاج سيليكت في حاجة اسمها اوبشين الاوبيشيين دة ممكن يكون تاج واحد او اكتر من تاج المهم بقولوة هنا فوق في كود رجعلي كل اوبشينات بتاع سيلكيت دة كل تاجات اوبشينات رجعهالي طبيعي لما بيرجعها هيرجعهالك في مصفوفة لان انت ممكن يكون عندك اكتر من تاج اوبشين اكتر من قيمة بقولوة هنا هاتلي قيمة انديكس في مصفوفة اللى مستخدم ضغط عليها المستخدم ضغط على هوت كافي هيجبلك رقم انديكس بتاع هات كافي في انديكس رقم كام داخلم مصفوفة اخر واحدة دي تيكست بقولوة بدل ما تجبلي رقم انديكس اعرضلي نص او كلمة بتاعتها انا مش عايز اعرض رقم انديكس للمستخدم انا عايز اعرضلوة نص تيكست بعد ما انشأ منتجات 
   
  setAddProducts({ ...addProducts , category : {_id : catchId  , name : catchName} })
  
  // هنا بقولوة هتاخد قيمة الايدي جاية من سيلكيت تخزنها في الايدي وهتاخد قيمة الاسم جاية منة فقط

   }}

   value={addProducts.category._id}
   

   

  > 

    <option hidden>Choose Category</option>

   {
    categories.map((everyCategory => (
      
     <option value={everyCategory._id} key={everyCategory._id}>{everyCategory.name}</option> 

    //هنا في اوبشين كتبت فاليو الايدي بتاعها عشان خاطر ابعتوة للباك اند واخزنة لان باك اند بيفهم قيمة بالايدي مش بالاسم عشان كدة عملت سيكلت اوبشين  
      

    )))

   }



  </select>


 </label> {/* bg-gradient-to-r from-[#FAF7F0] to-[#EADBC8]  */}




 <label className="flex flex-col gap-1 text-[#4B2E2B]">

  <span>Price Product $</span> 
    
   <input className="text-[#FAF7F0] border-none outline-[#C08B5C] bg-[#4B2E2B] p-1 rounded-md" type="number" value={addProducts.price} onChange={(e)=> setAddProducts({...addProducts , price : Number(e.target.value) })}  />
 
 </label> {/* bg-gradient-to-r from-[#FAF7F0] to-[#EADBC8]  */}


 <label className="flex flex-col gap-1 text-[#4B2E2B]">

  <span>Image Product </span> 
    
   <input className="text-[#FAF7F0] border-none outline-[#C08B5C] bg-[#4B2E2B] p-1 rounded-md" type="file" accept="image/*" onChange={(e)=> setAddProducts({...addProducts , image : e.target.files?.[0] || null})}  />
 
 </label> {/* bg-gradient-to-r from-[#FAF7F0] to-[#EADBC8]  */}
 
{/* انت بترفع صورة طبيعي مش بتاخد قيمة من مستخدم لانك بترفع صورة فايل يعتبر مش قيمة نصية */}



 <label className="flex flex-col gap-1 text-[#4B2E2B]">

  <span> Description </span> 
    
   <input className="text-[#FAF7F0] border-none outline-[#C08B5C] bg-[#4B2E2B] p-1 rounded-md" type="text"  onChange={(e)=> setAddProducts({...addProducts , description : e.target.value})}  />
 
 </label> {/* bg-gradient-to-r from-[#FAF7F0] to-[#EADBC8]  */}
 


 <label className="flex flex-col gap-1 text-[#4B2E2B]">

  <span> Quantity Products </span> 
    
   <input className="text-[#FAF7F0] border-none outline-[#C08B5C] bg-[#4B2E2B] p-1 rounded-md" type="number"  onChange={(e)=> setAddProducts({...addProducts , stock : Number(e.target.value)})}  />
 
 </label> {/* bg-gradient-to-r from-[#FAF7F0] to-[#EADBC8]  */}
 


{/* انت بترفع صورة طبيعي مش بتاخد قيمة من مستخدم لانك بترفع صورة فايل يعتبر مش قيمة نصية */}


<div className="flex gap-4 justify-center">

<button onClick={()=> CreateProducts()} className="bg-[#4B2E2B] px-5 py-2 text-[#FAF7F0] rounded-lg text-lg" >Create</button>

{/* مبعتش هنا النيم وباقي خصائص كبارميتر عشان انا ضايفهم اصلا داخل فونشين دة فطبيعي هيخزنهم في متغير دة */}



<button onClick={()=> setShowModel(false)} className="bg-[#C08B5C] px-5 py-2 text-[#FAF7F0] rounded-lg text-lg">Cancel</button>


</div> {/* flex gap-4 justify-center  */}


</div> {/* flex flex-col gap-1 text-[#4B2E2B]  */}

</div>  //{/* bg-gradient-to-r from-[#FAF7F0] to-[#EADBC8]  */}
   

 )

}



<div className="flex flex-col items-center gap-3">


{

 products.map((item , index ) => (

  <motion.div key={item._id} className="flex flex-col md:flex-row overflow-hidden gap-3 mx-auto w-[90%] md:w-[90%]  justify-between rounded-lg bg-[#4B2E2B]"
  
  initial={{opacity : 0 , y : 40}}

  whileInView={{opacity : 1 , y:0}}

  transition={{ duration : 0.5 , delay : index * 0.04  }}
   
   viewport={{ once: true, amount: 0.1 }}

  style={{ willChange: "transform" }}
  
  >

  
  <Image className="object-cover rounded-2xl p-2 w-full md:w-[160px] h-[200px] md:h-[160px]" src={item.images[0].url} alt={item.name} width={300} height={300} priority />


<div className="flex flex-col flex-1 gap-2 pt-3 text-[#EADBC8] items-center px-10">

<p className="font-bold text-lg">{item.name}</p>

<p className="text-[#C08B5C]">{item.price}EGP</p>

{item.category && <p className="text-sm">{item.category.name}</p>}


</div> {/* flex flex-col flex-1 gap-1 text-[#EADBC8] */}

  
  {/* <div className="flex md:flex-col gap-4 p-3 w-full md:w-auto ">

   <button className="bg-[#C08B5C] px-6 py-2 text-[#1a0e0b] rounded-lg hover:bg-[#d4996a] transition-all flex-1 md:flex-none"> Edit </button>

   <button className="bg-red-700 px-6 py-2 text-[#FAF7F0] rounded-lg hover:bg-red-600 transition-all flex-1 md:flex-none"> Delete </button>


  </div> {/* flex flex-col gap-2 p-3 w-full md:w-auto  */}
     



<div className="flex md:flex-col gap-4 p-3 w-full md:w-auto ">

<button onClick={()=> setEditProducts(item)} className="bg-[#C08B5C] px-6 py-2 text-[#1a0e0b] rounded-lg hover:bg-[#d4996a] transition-all flex-1 md:flex-none"> Edit </button>

<button onClick={()=> DeleteProducts(item._id)} className="bg-red-700 px-6 py-2 text-[#FAF7F0] rounded-lg hover:bg-red-600 transition-all flex-1 md:flex-none"> Delete </button>

</div> {/* flex flex-col overflow-hidden gap-3 */}





 </motion.div > //{/* flex flex-col overflow-hidden gap-3 */}

 ))
 
}




</div> {/* flex flex-col items-center gap-3 */}


</motion.div > {/*  py-10  */}


{
 
  editProducts && (
  
  <div className="bg-gradient-to-r from-[#FAF7F0] to-[#EADBC8] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden p-3 rounded-xl md:w-[50%] w-[90%]  fixed z-[9999]">

  
 <div className="flex flex-col items-center justify-center gap-4">

  <label className="flex flex-col  gap-2 w-full text-[#4B2E2B]">

   <span>Name Product</span>
  
 <input className="text-[#FAF7F0] border-none outline-[#C08B5C] bg-[#4B2E2B] p-1 rounded-md" type="text" value={editProducts.name} onChange={(e)=> setEditProducts({...editProducts , name : e.target.value})} />
  

  </label>


<label className="flex flex-col gap-2 w-full text-[#4B2E2B]">

    <span>Price Product</span>
  
 <input className="text-[#FAF7F0] border-none outline-[#C08B5C] bg-[#4B2E2B] p-1 rounded-md" type="number" value={editProducts.price} onChange={(e)=> setEditProducts({...editProducts , price : Number(e.target.value)})} />
  

  </label>



   <label className="flex flex-col  gap-2 w-full text-[#4B2E2B]">

     <span> Category Product</span>
  

    <select
     
     onChange={(e)=> {

       const catchId = e.target.value

       const catchName = e.target.options[e.target.selectedIndex].text
     

      setEditProducts({
         
        ...editProducts , category : {_id : catchId , name : catchName}

      })

     }}
     
      value={editProducts.category._id} 
       
      
    >

  
     
     {
    
     categories.map((everyCategory => (

     <option key={everyCategory._id} value={everyCategory._id}> {everyCategory.name} </option> 
      
      
      

     )))

     }


    </select>


  </label>



   <label className="flex flex-col gap-2 w-full text-[#4B2E2B]">

      <span>Image Product</span>
  
 <input className="text-[#FAF7F0] border-none outline-[#C08B5C] bg-[#4B2E2B] p-1 rounded-md" type="file" accept="image/*" onChange={(e)=> setNewImage(e.target.files?.[0] || null)} />
  

  </label>


<div className="flex gap-8 justify-between items-center p-4">

  <button className="bg-[#4B2E2B] hover:text-[#EADBC8]/80 transition-all px-5 text-[#EADBC8] py-2 rounded-lg text-lg" onClick={()=> { updateImage(editProducts._id , editProducts.images[0].public_id) ; updateProducts(editProducts._id , editProducts.name , editProducts.category , editProducts.price) ; setEditProducts(null)}}> Save </button>


  <button className="bg-[#C08B5C] hover:text-[#EADBC8]/80 transition-all px-3 text-[#FAF7F0] py-2 rounded-lg text-lg" onClick={()=> setEditProducts(null)}> Cancel </button>

   </div> {/* flex gap-8 justify-between items-center p-4 */}

   </div> {/* flex flex-col items-center justify-center gap-4 */}

   </div> // {/* bg-gradient-to-r from-[#FAF7F0] to-[#EADBC8] */}

    

  )

}
 



</>

)





}





