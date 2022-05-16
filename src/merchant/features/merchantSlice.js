import { createSlice } from "@reduxjs/toolkit";

export const merchantSlice = createSlice({
  name: "merchant",
  initialState: {
    logged_in: false,
    user: {
      stores: [
        {
          id: "super-algorithms",
          title: "Super Algorithms Inc.",
          description: "We help you prepare for Tech Interviews",
          storeOwner: "0x02b7433EA4f93554856aa657Da1494B2Bf645EF0",
          products: [
            {
              productName: "cpp-course",
              title: "C++ course",
              description: "The original C++ course",
              features: ["Feature A", "Feature B", "Feature C"],
              price: 5,
              productType: 0,
              productLink: "https://google.com",
            },
            {
              productName: "cpp-course-deluxe",
              title: "C++ deluxe course",
              description: "The upgraded C++ course",
              features: ["Feature D", "Feature E", "Feature F"],
              price: 1,
              productType: 1,
              productLink: "https://google.com",
            },
            {
              productName: "cpp-course-lite",
              title: "C++ lite course",
              description: "The essential C++ course",
              features: ["Feature G", "Feature H", "Feature I"],
              price: 25,
              productType: 2,
              productLink: "https://google.com",
            },
            {
              productName: "pointers-cheatsheet",
              title: "Pointers cheatsheet",
              description: "Your quick guide to demystifying pointers",
              features: ["Feature J", "Feature K", "Feature L"],
              price: 1,
              productType: 3,
              productLink: "https://google.com",
            },
            {
              productName: "stl-guide",
              title: "STL guide",
              description: "Your guide to the Standard Template Library",
              features: ["Feature M", "Feature N", "Feature O"],
              price: 1,
              productType: 3,
              productLink: "https://google.com",
            },
          ],
        },
        // {
        //   id: "jasons-poetry",
        //   name: "Jason's Poetry",
        //   description: "There's a poem for every season",
        //   wallet: "0x972CdCBBD82c934fe32322b423bD8fBd30b4EEB6",
        //   products: [],
        // },
      ],
    },
    stores: [],
  },
  reducers: {
    loginUser(state, action) {
      state.logged_in = true;
      state.user = action.payload;
    },
    loadStores(state, action) {
      console.log("Store: ");
      let stores = action.payload;
      console.log(stores);
      // state.user.stores = [...stores];

      // const reduxStore = store.getState();
      // const products = reduxStore.shopSlice.products;
      // state.user.stores.prodcuts = products;
    },
    loadStoreProducts(state, action) {
      let products = action.payload;
      state.user.stores[0].products = [...products];
      // state.users.stores.products = products;
    },
    // createStore: (state, action) => {
    //     console.log(action.payload);
    //     let newStore = {
    //         id: action.payload.id,
    //         name: action.payload.name,
    //         description: action.payload.description,
    //         wallet: action.payload.wallet,
    //         products: []
    //     };
    //     state.user.stores.push(newStore);
    // },
    updateProduct(state, action) {
      let product = action.payload[0];
      let productIndex = state.user.stores[0].products.findIndex(
        (pdt) => pdt.productName === product.productName
      );
      console.log("index: ", product);
      state.user.stores[0].products[productIndex] = product;
    },
    createProduct: (state, action) => {
      let store_id = action.payload.store_id;
      let product = action.payload;
      delete product[store_id];
      state.user.stores
        .find((store) => store.id === store_id)
        .products.push(product);
    },
  },
});

export const { loginUser, loadStores, loadStoreProducts, updateProduct } =
  merchantSlice.actions;

export default merchantSlice.reducer;
