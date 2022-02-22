import { createSlice } from '@reduxjs/toolkit'

export const merchantSlice = createSlice({
    name: "merchant",
    initialState: {
        logged_in: false,
        user: {
            
            // stores: [
            //     {
            //         id: "super-algorithms",
            //         name: "Super Algorithms Inc.",
            //         description: "We help you prepare for Tech Interviews",
            //         wallet: "0x329CdCBBD82c934fe32322b423bD8fBd30b4EEB6",
            //         products: [
            //             {
            //                 id: "C++", 
            //                 title:"C++ course", 
            //                 price: 0.0035, 
            //                 description: "Try out our original course in C++ and impress your interviewers.",
            //                 features: [
            //                     "Full algorithms course in C++",
            //                     "Pointers Cheat Sheet",
            //                     "Memory Management Tips"
            //                 ]
            //             },
            //             {
            //                 id: "Java", 
            //                 title:"Java course", 
            //                 price: 0.0025, 
            //                 description: "Try out our updated course in Java and impress your interviewers.",
            //                 features: [
            //                     "Full algorithms course in Java",
            //                     "OODP Cheat Sheet",
            //                     "Design Convention Tips"
            //                 ]
            //             },
            //             {
            //                 id: "Python", 
            //                 title:"Python course", 
            //                 price: 0.0045, 
            //                 description: "Try out our newest course in Python and impress your interviewers.",
            //                 features: [
            //                     "Full algorithms course in Python",
            //                     "Data Structures Cheat Sheet",
            //                     "List comprehension Tips"
            //                 ]
            //             },
            //         ]

            //     },
            //     {
            //         id: "jasons-poetry",
            //         name: "Jason's Poetry",
            //         description: "There's a poem for every season",
            //         wallet: "0x972CdCBBD82c934fe32322b423bD8fBd30b4EEB6",
            //         products: []

            //     }
            // ]
        },
        stores: []
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
            state.user.stores.find(store => store.id === store_id).products.push(product);
        }
    }
})

export const { loginUser, loadStores } = merchantSlice.actions

export default merchantSlice.reducer