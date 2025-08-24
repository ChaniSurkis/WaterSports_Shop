import { configureStore } from '@reduxjs/toolkit'
import products from '../features/products/productSlice'
import userReducer from '../features/users/userSlice'
import cart from '../features/Cart/CartSlice'
// import counter from '../features/counter/counterSlice'
// import bag from '../features/bags/bagSlice'

export const store = configureStore({
  reducer: {

    productReducer: products,
    userReducer: userReducer,
    cartReducer:cart

  },
})

