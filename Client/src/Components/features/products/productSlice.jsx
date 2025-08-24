import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getAllProducts = createAsyncThunk("get-allProducts", async () => {
  let { data } = await axios.get("http://localhost:4000/waterSport")
  console.log(data)
  return data
})

export const deleteProduct = createAsyncThunk(
  "delete-product",
  async (id) => {
    await axios.delete(`http://localhost:4000/waterSport/${id}`)
    return id
  }
)
export const updateProductStock = createAsyncThunk(
  "update-product-stock",
  async ({ productId, quantity }) => {
    const response = await axios.put(`http://localhost:4000/waterSport/${productId}/${quantity}`)
    return { productId, quantity }
  }
)



const productSlice = createSlice({
  name: 'products',
  initialState: {
    listProducts: []
  },


  extraReducers: (builder) => {
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.listProducts = action.payload
    }).addCase(getAllProducts.rejected, (state, action) => {
      state.status = "failed!!"
    }).addCase(getAllProducts.pending, (state, action) => {
      state.status = "loading..."
    }).addCase(deleteProduct.fulfilled, (state, action) => {
      state.listProducts = state.listProducts.filter(
        (product) => product.id !== action.payload
      )
    })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload || action.error.message
      })
      .addCase(updateProductStock.fulfilled, (state, action) => {
        const { productId, quantity } = action.payload;
        const product = state.listProducts.find(p => p.id === productId);
        if (product) {
          product.stock -= quantity;
        }
      })
      .addCase(updateProductStock.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })

  }
});




export default productSlice.reducer