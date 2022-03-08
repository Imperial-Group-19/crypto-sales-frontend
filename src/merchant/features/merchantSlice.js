import { createSlice } from "@reduxjs/toolkit";

export const merchantSlice = createSlice({
  name: "merchant",
  initialState: {
    logged_in: false,
    user: {
      stores: [
        {
          id: "super-algorithms",
          name: "Super Algorithms Inc.",
          description: "We help you prepare for Tech Interviews",
          wallet: "0x02b7433EA4f93554856aa657Da1494B2Bf645EF0",
          products: [
            {
              id: "cpp-course",
              title: "C++ course",
              description: "The original C++ course",
              features: ["Feature A", "Feature B", "Feature C"],
              price: 0.05,
              type: "main",
            },
            {
              id: "cpp-course-deluxe",
              title: "C++ deluxe course",
              description: "The upgraded C++ course",
              features: ["Feature D", "Feature E", "Feature F"],
              price: 0.1,
              type: "upsell",
            },
            {
              id: "cpp-course-lite",
              title: "C++ lite course",
              description: "The essential C++ course",
              features: ["Feature G", "Feature H", "Feature I"],
              price: 0.025,
              type: "downsell",
            },
            {
              id: "pointers-cheatsheet",
              title: "Pointers cheatsheet",
              description: "Your quick guide to demystifying pointers",
              features: ["Feature J", "Feature K", "Feature L"],
              price: 0.01,
              type: "cross-sell",
            },
            {
              id: "stl-guide",
              title: "STL guide",
              description: "Your guide to the Standard Template Library",
              features: ["Feature M", "Feature N", "Feature O"],
              price: 0.01,
              type: "cross-sell",
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
      state.stores = action.payload;
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

export const { loginUser, loadStores } = merchantSlice.actions;

export default merchantSlice.reducer;
