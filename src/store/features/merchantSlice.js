import { createSlice } from '@reduxjs/toolkit'

export const merchantSlice = createSlice({
    name: "merchant",
    initialState: {
        logged_in: false,
        user: {
            email: "",
            stores: [
                {
                    id: "super-algorithms",
                    name: "Super Algorithms Inc.",
                    description: "We help you prepare for Tech Interviews",
                    products: []

                },
                {
                    id: "jasons-poetry",
                    name: "Jason's Poetry",
                    description: "There's a poem for every season",
                    products: []

                }
            ]
        }
    },
    reducers: {
        loginUser: (state, action) => {
            state.logged_in = true;
            state.user.email = action.payload;
        }
    }
})

export const { loginUser } = merchantSlice.actions

export default merchantSlice.reducer