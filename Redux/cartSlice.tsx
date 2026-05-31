


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"





// ==================>>>>>>>> Get To Cart ==================>>>>>>>>



export const fetchCart = createAsyncThunk(


"cart/fetchCarts",


async()=> {

const token = localStorage.getItem("token")

const res = await fetch("https://coffe-store-backend-seven.vercel.app/cart" , 

{
    headers:{
        Authorization: `Bearer ${token}`,
    }
}

)


return res.json()


}


)




//==================>>>>>>>> Add To Cart ==================>>>>>>>>



export const addToCart = createAsyncThunk(

  "cart/addToCart" ,

  
  async(productId:string ) => { // دة الايدي هنبعتوة لسيرفر باك اند ويرجعلنا بيانات منتج دة

     

   const token = localStorage.getItem("token")


   const res = await fetch("https://coffe-store-backend-seven.vercel.app/cart" , 


    {  
        method : "POST",
     
        headers : { 

            "Content-Type" : "application/json" , 

          Authorization: `Bearer ${token}`,
          
          
        },

        body : JSON.stringify({
        
        productId , // هتبعت لسيرفر الايدي بتاع منتج دة عشان السيرفر يبدأ يجيب تفاصيل منتج ويضاف في كارت
       
        quantity : 1
 
        })

    }
   )

   
   return res.json()

  }




)



// ==================>>>>>>>> DeleteOneProduct From Cart ==================>>>>>>>>



export const removeOneProduct = createAsyncThunk (

"cart/removeFromCart",


async (productId:string) => {


 const token = localStorage.getItem("token")   


const res = await fetch(`https://coffe-store-backend-seven.vercel.app/cart` , {

  
   method : "DELETE", 
   
   headers : {

    "Content-Type" : "application/json" , 

    Authorization: `Bearer ${token}`,

   },
 
  body : JSON.stringify({

    productId
    
  })

})

return res.json()

}



)





// ==================>>>>>>>> DeleteAllProducts From Cart ==================>>>>>>>>


export const removeAllProducts = createAsyncThunk (

"cart/removeAllProducts",


async () => {


 const token = localStorage.getItem("token")   


const res = await fetch(`https://coffe-store-backend-seven.vercel.app/cart/clear` , {

  
   method : "DELETE", 
   
   headers : {

    "Content-Type" : "application/json" , 

    Authorization: `Bearer ${token}`,

   },
 
 

})

return res.json()

}



)


// ==================>>>>>>>> updateProducts From Cart ==================>>>>>>>>


export const updateProducts = createAsyncThunk(

"cart/updateCarts",


async({productId , quantity} : {

    productId : string,

    quantity : number }) => {



const token = localStorage.getItem("token")


const res = await fetch(`https://coffe-store-backend-seven.vercel.app/cart/` , {

  method : "PATCH" , 

  headers : {
   
    "Content-Type" : "application/json",
 
  Authorization: `Bearer ${token}`,

  },
  
  body : JSON.stringify({

   productId,

    quantity,

  })

})


return res.json()

}


)







//==================>>>>>>>> Get To Cart Status ==================>>>>>>>>

const initialState = {

cart : [] ,

totalPrice: 0,

loading : false ,

error: null

}





const cartSlice = createSlice({

name : "cart",

initialState,

reducers : {

},



extraReducers : (builder)=>{


builder.addCase(fetchCart.pending , (state) => {

state.loading = true


})



builder.addCase(fetchCart.fulfilled , (state ,action)=> {


 state.loading = false 
 
 state.cart = action.payload.items
 
state.totalPrice = action.payload.totalPrice  // توتال برايز اللى جاية من باك اند اللى انا مخزنة


 
//  action.payload.items في مونجو ديبي كارت تفاصيل المنتج وكل حاجة خاصة بكارت محطوطة في اوبجيكت جوة الاوبجيكت دة في مصفوفة اسمها ايتيمس الايتيمس دي مصفوفة جواها تفاصيل المنتج والكمية عشان كدة كتبت الايتيمس عشان نعرف ونعرض المنتج اللى مستخدم ضافة في كارت
 
 // بقولوة وقف تحميل وخزنلي بيانات اللى جاية دي في كارت

// return res.json = action.payload بيانات جاية من لينك بقولوة خزنها في كارت

})


builder.addCase(fetchCart.rejected , (state) => {

state.loading = false

})


////////////////////////////////////////////////////////////////////////////////////////


//==================>>>>>>>> Add To Cart Status ==================>>>>>>>>


builder.addCase(addToCart.fulfilled , (state , action) => {
    
 state.cart = action.payload.items // ان منتجات اضافت بالفعل 

state.totalPrice = action.payload.totalPrice  

// action.payload دة الحدث او دة منتج راجع من سيرفر باك اللى هو رد جيسون

})




//==================>>>>>>>> RemoveOneProduct From Cart Status ==================>>>>>>>>



builder.addCase(removeOneProduct.fulfilled , (state , action) => {


 state.cart = action.payload.items

state.totalPrice = action.payload.totalPrice  

})



//==================>>>>>>>> RemoveAllProducts From Cart Status ==================>>>>>>>>



builder.addCase(removeAllProducts.fulfilled , (state , action) => {


state.cart = [] 

state.totalPrice = action.payload.totalPrice  

})



//==================>>>>>>>> updateProduct Cart Status ==================>>>>>>>>



builder.addCase(updateProducts.fulfilled , (state , action) => {

state.cart = action.payload.items

state.totalPrice = action.payload.totalPrice  

})


}


})









export default cartSlice.reducer