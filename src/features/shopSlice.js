import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  addedProducts: [],
  total: 0,
}

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    loadProducts(state, action) {
      console.log("Products: ");
      console.log(action.payload);
      console.log(state.addedProducts);
      console.log(state.total);
      console.log(state.products);
      let products = action.payload;
      state.products = [...products];

    },
    addToCart(state, action) {
      let addedProduct = state.products.find(product => action.payload === product.product_id);
      let productExists = state.addedProducts.find(product => action.payload === product.product_id);
      if (!productExists) {
          let newTotal = state.total + addedProduct.price;
          state.addedProducts = [...state.addedProducts, addedProduct];
          state.total = newTotal;
      }
    },
    removeFromCart: (state, action) => {
      let removedProduct = state.addedProducts.find(product => action.payload === product.product_id);
      let remainingItems = state.addedProducts.filter(product => action.payload !== product.product_id);
      console.log(removedProduct);
      if (removedProduct) {
        let newTotal = state.total - (removedProduct.price || 0);
        state.addedProducts = remainingItems;
        state.total = newTotal;
        
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, loadProducts } = shopSlice.actions

export default shopSlice.reducer