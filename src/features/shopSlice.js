import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // products: [],
  // addedProducts: [],
  // total: 0,

  products: [
    {
      product_id: "cpp-course",
      title: "C++ course",
      description: "The original C++ course",
      features: ["Feature A", "Feature B", "Feature C"],
      price: 0.05,
      type: "main",
    },
    {
      product_id: "cpp-course-deluxe",
      title: "C++ deluxe course",
      description: "The upgraded C++ course",
      features: ["Feature D", "Feature E", "Feature F"],
      price: 0.1,
      type: "upsell",
    },
    {
      product_id: "cpp-course-lite",
      title: "C++ lite course",
      description: "The essential C++ course",
      features: ["Feature G", "Feature H", "Feature I"],
      price: 0.025,
      type: "downsell",
    },
    {
      product_id: "pointers-cheatsheet",
      title: "Pointers cheatsheet",
      description: "Your quick guide to demystifying pointers",
      features: ["Feature J", "Feature K", "Feature L"],
      price: 0.01,
      type: "crosssell",
    },
    {
      product_id: "stl-guide",
      title: "STL guide",
      description: "Your guide to the Standard Template Library",
      features: ["Feature M", "Feature N", "Feature O"],
      price: 0.01,
      type: "crosssell",
    },
  ],
  addedProducts: [],
  total: 0,
};

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    loadProducts(state, action) {
      console.log("Products: ");
      console.log(action.payload);
      console.log(state.addedProducts);
      console.log(state.total);
      console.log(state.products);
      // let products = action.payload;
      // state.products = [...products];
    },
    addToCart(state, action) {
      let addedProduct = state.products.find(
        (product) => action.payload === product.product_id
      );
      let productExists = state.addedProducts.find(
        (product) => action.payload === product.product_id
      );
      if (!productExists) {
        let newTotal = state.total + addedProduct.price;
        state.addedProducts = [...state.addedProducts, addedProduct];
        state.total = newTotal;
      }
    },
    removeFromCart: (state, action) => {
      let removedProduct = state.addedProducts.find(
        (product) => action.payload === product.product_id
      );
      let remainingItems = state.addedProducts.filter(
        (product) => action.payload !== product.product_id
      );
      console.log(removedProduct);
      if (removedProduct) {
        let newTotal = state.total - (removedProduct.price || 0);
        state.addedProducts = remainingItems;
        state.total = newTotal;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, loadProducts } = shopSlice.actions;

export default shopSlice.reducer;
