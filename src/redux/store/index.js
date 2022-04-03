/* eslint-disable import/no-cycle */
import {configureStore} from '@reduxjs/toolkit'

import loginReducer from '../reducers/loginReducer'
import allProductsReducer from '../reducers/allProductsReducer'
import productItemSlice from '../reducers/productItemReducer/index'
import primeDealsSlice from '../reducers/primeDealsReducer'

const store = configureStore({
  reducer: {
    loginState: loginReducer,
    allProductsState: allProductsReducer,
    productItemState: productItemSlice,
    primeDealsState: primeDealsSlice,
  },
})

export default store
