import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"



const initialState : {orders: any[], loading: boolean, error: string | null} = {

orders : [] ,

loading : false ,

error :  null 

}


// =========>>>>>>>*******  GetAllOrders  <<<<<<<==========*******

export const fetchOrders = createAsyncThunk (

 "order/fetchOrders" ,
 
 async() => {

  const getToken = localStorage.getItem("token") 
  
  const res = await fetch("https://coffe-store-backend-seven.vercel.app/order" , {

   
    headers : {

      Authorization : `Bearer ${getToken}`

    }
     
    
  })

  
  return res.json()

 }

)




// =========>>>>>>>*******  UpdateOneOrder  <<<<<<<==========*******

export const updateOneOrder = createAsyncThunk (

"order/updateOneOrder" ,

async (orderId:string) => {

const getToken = localStorage.getItem("token") 

const res = await fetch(`https://coffe-store-backend-seven.vercel.app/order/${orderId}/cancel` , {

method : "PATCH" ,

 headers : {

      Authorization : `Bearer ${getToken}`

    }
     
})

return res.json()

}

 

)





// =========>>>>>>>  Orders Status  <<<<<<<==========



const orderSlice = createSlice({

name : "Order", 

initialState ,

reducers :{} ,

extraReducers : (builder)=> {


builder.addCase(fetchOrders.pending , (state) => {

state.loading = true


})


builder.addCase(fetchOrders.fulfilled , (state , action) => {

state.loading = false 

if(action.payload.message){

state.orders = []

// لو orders فاضية اعرض الرسالة دي
// {orders?.length === 0 && (
//   <p className="text-center text-[#4B2E2B]">No Orders</p>
// )}



}

else{

 state.orders = action.payload

}


})

builder.addCase(fetchOrders.rejected , (state , action)=> {

    state.loading = false 

   
state.error = action.error.message ?? "Something went wrong"

})

builder.addCase(updateOneOrder.fulfilled, (state, action) => {
  state.orders = state.orders.map((everyOrder : any) => {
    return everyOrder._id === action.payload.cancelOrder._id 
      ? action.payload.cancelOrder // بنرجع الأوردر المعدل الجديد بالكامل
      : everyOrder; // بنسيب الأوردر القديم زي ما هو لو مش هو ده المطلوب
  });
});

}




})


export default orderSlice.reducer 










