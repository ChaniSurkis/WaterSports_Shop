import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// מביא מוצרים לפי userId
export const getProductsByUserId = createAsyncThunk("getCartByUserId", async (userId) => {
    const response = await axios.get(`http://localhost:4000/cart/${userId}`);
    return response.data;
});

// מוחק מוצר מהסל לפי productId ו־userId
export const deleteFromCart = createAsyncThunk("deleteFromCart", async ({ productId, userId }) => {
    const response = await axios.delete(`http://localhost:4000/cart/${userId}/${productId}`);
    return productId;
});


export const clearCart = createAsyncThunk("clearCart", async ({userId}) => {
    

     await axios.delete(`http://localhost:4000/cart/${userId}`);
        return userId;
  
});



const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        status: 'idle',
        error: null
    },

    extraReducers: (builder) => {
        builder
            .addCase(getProductsByUserId.pending, (state) => {
                state.status = 'loading';
            })

            .addCase(getProductsByUserId.fulfilled, (state, action) => {
                state.cartItems = action.payload;
                state.status = 'succeeded';
            })
            .addCase(getProductsByUserId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(deleteFromCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteFromCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const deletedId = Number(action.payload);
                state.cartItems = state.cartItems.filter(
                    (item) => Number(item.productId) !== deletedId
                );
            })
            .addCase(deleteFromCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // 🔴 חדש: טיפול בפעולה של ניקוי הסל
            .addCase(clearCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(clearCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                console.log("123456")
                state.cartItems = []; 
                console.log("aaaaaaaaaa",state.cartItems)// ניקוי הסל מהסטייט
            })
            .addCase(clearCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
            
    }
});

export default cartSlice.reducer;



// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import axios from 'axios'

// export const getProductsByUserId = createAsyncThunk("getCartByUserId", async (userId) => {
//     const response = await axios.get(`http://localhost:4000/cart/${userId}`);
//     return response.data;
// });

// export const deleteFromCart = createAsyncThunk("deleteFromCart", async ({ productId, userId }) => {
//     const response = await axios.delete(`http://localhost:4000/cart/${userId}/${productId}`);
//     return productId
// });

// const cartSlice = createSlice({
//     name: 'cart',
//     initialState: {
//         cartItems: [],
//         status: 'idle',
//         error: null
//     },

//     extraReducers: (builder) => {
//         builder
//             .addCase(getProductsByUserId.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(getProductsByUserId.fulfilled, (state, action) => {
//                 state.cartItems = action.payload;
//                 state.status = 'succeeded';
//             })
//             .addCase(getProductsByUserId.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message;
//             })
//             .addCase(deleteFromCart.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(deleteFromCart.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 const deletedId = Number(action.payload);
//                 state.cartItems = state.cartItems.filter(
//                     (item) => Number(item.productId) !== deletedId
//                 );
//             })

//             .addCase(deleteFromCart.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message;
//             });
//     }
// });

// export default cartSlice.reducer;
// // import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// // import axios from 'axios'

// // export const getProductsByUserId = createAsyncThunk("getCartByUserId", async (userId) => {
// //     const response = await axios.get(`http://localhost:4000/cart/${userId}`);
// //     return response.data;
// // });

// // export const deleteFromCart = createAsyncThunk("deleteFromCart", async ({ productId, userId }) => {
// //     const response = await axios.delete(`http://localhost:4000/cart/${userId}/${productId}`);
// //     return productId
// // });

// // const cartSlice = createSlice({
// //     name: 'cart',
// //     initialState: {
// //         cartItems: [],
// //         status: 'idle',
// //         error: null
// //     },

// //     extraReducers: (builder) => {
// //         builder
// //             .addCase(getProductsByUserId.pending, (state) => {
// //                 state.status = 'loading';
// //             })
// //             .addCase(getProductsByUserId.fulfilled, (state, action) => {
// //                 state.cartItems = action.payload;
// //                 state.status = 'succeeded';
// //             })
// //             .addCase(getProductsByUserId.rejected, (state, action) => {
// //                 state.status = 'failed';
// //                 state.error = action.error.message;
// //             })
// //             .addCase(deleteFromCart.pending, (state) => {
// //                 state.status = 'loading';
// //             })
// //             .addCase(deleteFromCart.fulfilled, (state, action) => {
// //                 state.status = 'succeeded';
// //                 const deletedId = Number(action.payload);
// //                 state.cartItems = state.cartItems.filter(
// //                     (item) => Number(item.productId) !== deletedId
// //                 );
// //             })

// //             .addCase(deleteFromCart.rejected, (state, action) => {
// //                 state.status = 'failed';
// //                 state.error = action.error.message;
// //             });
// //     }
// // });

// // export default cartSlice.reducer;
