import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "../Redux/cartSlice"


import orderReducer from "../Redux/ordersSlice"


export const store = configureStore({

reducer : {


Carts : cartReducer ,

Orders : orderReducer

}


})

