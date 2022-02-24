import { configureStore } from '@reduxjs/toolkit'
import shopReducer from './features/shopSlice'
import merchantReducer from './merchant/features/merchantSlice'

export default configureStore({
  reducer: {
      shop: shopReducer,
      merchant: merchantReducer,
  },
})