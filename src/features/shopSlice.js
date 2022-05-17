import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // products: [],
  // addedProducts: [],
  // total: 0,
  loaded: false,
  products: [
    {
      productName: "cpp-course",
      title: "",
      description: "",
      features: ["", "", ""],
      price: 0,
      productType: 0,
      storeAddress: "",
      productLink: "",
    },
    {
      productName: "cpp-course-1",
      title: "",
      description: "",
      features: ["", "", ""],
      price: 0,
      productType: 1,
      storeAddress: "",
      productLink: "",
    },
    {
      productName: "cpp-course-2",
      title: "",
      description: "",
      features: ["", "", ""],
      price: 0,
      productType: 2,
      storeAddress: "",
      productLink: "",
    },
    {
      productName: "cpp-course-3",
      title: "",
      description: "",
      features: ["", "", ""],
      price: 0,
      productType: 3,
      storeAddress: "",
      productLink: "",
    },
    // {
    //   productName: "cpp-course-deluxe",
    //   title: "C++ deluxe course",
    //   description: "The upgraded C++ course",
    //   features: ["Feature D", "Feature E", "Feature F"],
    //   price: 1000000000000000000,
    //   productType: 1,
    //   productLink: "https://google.com",
    // },
    // {
    //   productName: "cpp-course-lite",
    //   title: "C++ lite course",
    //   description: "The essential C++ course",
    //   features: ["Feature G", "Feature H", "Feature I"],
    //   price: 250000000000000000,
    //   productType: 2,
    //   productLink: "https://google.com",
    // },
    // {
    //   productName: "pointers-cheatsheet",
    //   title: "Pointers cheatsheet",
    //   description: "Your quick guide to demystifying pointers",
    //   features: ["Feature J", "Feature K", "Feature L"],
    //   price: 100000000000000000,
    //   productType: 3,
    //   productLink: "https://google.com",
    // },
    // {
    //   productName: "stl-guide",
    //   title: "STL guide",
    //   description: "Your guide to the Standard Template Library",
    //   features: ["Feature M", "Feature N", "Feature O"],
    //   price: 100000000000000000,
    //   productType: 3,
    //   productLink: "https://google.com",
    // },
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
      // console.log(state.addedProducts);
      // console.log(state.total);
      // console.log(state.products);
      let products = action.payload;
      state.products = [...products];
      state.loaded = true;
    },
    updateShopProduct(state, action) {
      let product = action.payload[0];
      const allProducts = state.products;

      const storeProducts = allProducts.filter(
        (pdt) => pdt.storeAddress === product.storeAddress
      );

      let productIndex = storeProducts.findIndex(
        (pdt) => pdt.productName === product.productName
      );

      state.products[productIndex] = product;
    },
    addToCart(state, action) {
      let addedProduct = state.products.find(
        (product) => action.payload === product.productName
      );
      let productExists = state.addedProducts.find(
        (product) => action.payload === product.productName
      );
      if (!productExists) {
        let newTotal = state.total + addedProduct.price;
        state.addedProducts = [...state.addedProducts, addedProduct];
        state.total = newTotal;
      }
    },
    removeFromCart: (state, action) => {
      let removedProduct = state.addedProducts.find(
        (product) => action.payload === product.productName
      );
      let remainingItems = state.addedProducts.filter(
        (product) => action.payload !== product.productName
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
export const { addToCart, removeFromCart, loadProducts, updateShopProduct } =
  shopSlice.actions;

export default shopSlice.reducer;
