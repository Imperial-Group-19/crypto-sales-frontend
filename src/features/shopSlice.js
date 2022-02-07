import { current, createSlice } from '@reduxjs/toolkit'

export const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    products: [
      {
          id: "C++", 
          title:"C++ course", 
          price: 0.0035, 
          description: "Try out our original course in C++ and impress your interviewers.",
          features: [
              "Full algorithms course in C++",
              "Pointers Cheat Sheet",
              "Memory Management Tips"
          ]
      },
      {
          id: "Java", 
          title:"Java course", 
          price: 0.0025, 
          description: "Try out our updated course in Java and impress your interviewers.",
          features: [
              "Full algorithms course in Java",
              "OODP Cheat Sheet",
              "Design Convention Tips"
          ]
      },
      {
          id: "Python", 
          title:"Python course", 
          price: 0.0045, 
          description: "Try out our newest course in Python and impress your interviewers.",
          features: [
              "Full algorithms course in Python",
              "Data Structures Cheat Sheet",
              "List comprehension Tips"
          ]
      },
    ],
    addedProducts:[],
    total: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      // console.log(action);
      // console.log(current(state));
      let addedProduct = state.products.find(product => action.payload === product.id);
      let productExists = state.addedProducts.find(product => action.payload === product.id);
      if (!productExists) {
          let newTotal = state.total + addedProduct.price;
          state.addedProducts = [...state.addedProducts, addedProduct];
          state.total = newTotal;
      }
    },
    removeFromCart: (state, action) => {
      let removedProduct = state.addedProducts.find(product => action.payload === product.id);
      let remainingItems = state.addedProducts.filter(product => action.payload !== product.id);
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
export const { addToCart, removeFromCart } = shopSlice.actions

export default shopSlice.reducer