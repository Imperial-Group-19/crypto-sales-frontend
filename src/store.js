import { configureStore } from '@reduxjs/toolkit'
import shopReducer from './features/shopSlice'
import merchantReducer from './store/features/merchantSlice'


export default configureStore({
  reducer: {
      shop: shopReducer,
      merchant: merchantReducer,
  },
})