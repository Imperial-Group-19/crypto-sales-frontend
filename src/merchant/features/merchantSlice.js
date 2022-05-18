import { createSlice } from "@reduxjs/toolkit";

export const merchantSlice = createSlice({
  name: "merchant",
  initialState: {
    logged_in: false,
    user: {
      stores: [
        {
          id: "",
          title: "",
          description: "",
          storeOwner: "",
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
    products: [],
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
      state.user.stores = [...stores];
      // state.user.stores.products = [];

      // const reduxStore = store.getState();
      // const products = reduxStore.shopSlice.products;
      // state.user.stores.prodcuts = products;
    },
    loadStoreProducts(state, action) {
      console.log("loading store products");
      let products = action.payload;
      // state.user.stores[0].products = [...products];
      state.products = products;
    },
    createStore: (state, action) => {
      console.log(action.payload);
      let newStore = {
        id: action.payload.id,
        title: action.payload.title,
        description: action.payload.description,
        storeOwner: action.payload.storeOwner,
      };
      state.user.stores.push(newStore);
    },
    updateMerchantProduct(state, action) {
      let product = action.payload[0];
      const allProducts = state.products;

      // const storeProducts = allProducts.filter(
      //   (pdt) => pdt.storeAddress === product.storeAddress
      // );

      let productIndex = allProducts.findIndex(
        (pdt) => pdt.productName === product.productName
      );

      console.log("index: ", product);
      state.products[productIndex] = product;
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

export const {
  loginUser,
  loadStores,
  createStore,
  loadStoreProducts,
  updateMerchantProduct,
} = merchantSlice.actions;

export default merchantSlice.reducer;
