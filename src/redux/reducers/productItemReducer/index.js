/* eslint-disable import/no-cycle */
import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import store from '../../store/index'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const cartItemList = JSON.parse(localStorage.getItem('cartList'))
const cartList = cartItemList === null ? [] : cartItemList
const browserHistoryList = JSON.parse(localStorage.getItem('browserHistory'))
const browserHistory = browserHistoryList === null ? [] : browserHistoryList

const initialState = {
  productData: {},
  similarProductsData: [],
  apiStatus: apiStatusConstants.initial,
  quantity: 1,
  cartList,
  browserHistory,
}

const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const getFormattedData = data => ({
  availability: data.availability,
  brand: data.brand,
  description: data.description,
  id: data.id,
  imageUrl: data.image_url,
  price: data.price,
  rating: data.rating,
  title: data.title,
  totalReviews: data.total_reviews,
  quantity: 1,
})

export const removeCartItem = createAction('removeCartItem')
const decrementCartItemQuantity = createAction('decrementCartItemQuantity')

export const decrementCartItem = id => async dispatch => {
  const {productItemState} = store.getState()
  const productObject = productItemState.cartList.find(each => each.id === id)
  if (productObject.quantity <= 1) {
    dispatch(removeCartItem(id))
  } else {
    dispatch(decrementCartItemQuantity(id))
  }
}

export const getProductData = createAsyncThunk('getProductData', async id => {
  try {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    const productData = getFormattedData(fetchedData)
    const similarProductsData = fetchedData.similar_products.map(
      eachSimilarProduct => getFormattedData(eachSimilarProduct),
    )
    return {productData, similarProductsData}
  } catch (error) {
    throw Error(error)
  }
})

const productItemSlice = createSlice({
  name: 'productItem',
  initialState,
  reducers: {
    onIncrementQuantity: state => {
      const {productData} = state
      const newProductData = {
        ...productData,
        quantity: productData.quantity + 1,
      }
      return {...state, productData: newProductData}
    },
    onDecrementQuantity: state => {
      const {productData} = state
      const newProductData = {
        ...productData,
        quantity: productData.quantity - 1,
      }
      if (productData.quantity > 1) {
        return {...state, productData: newProductData}
      }
      return state
    },
    addToCart: (state, action) => {
      const productItem = action.payload
      const isProductIncludes = state.cartList.some(
        each => each.id === productItem.id,
      )
      let newCartList = null
      if (isProductIncludes) {
        newCartList = state.cartList.map(each => {
          const updateQuantity = each.quantity + productItem.quantity
          if (each.id === productItem.id) {
            return {...each, quantity: updateQuantity}
          }
          return each
        })
      } else {
        newCartList = [...state.cartList, productItem]
      }
      setLocalStorage('cartList', newCartList)
      return {...state, cartList: newCartList}
    },
    removeAllCartItems: state => {
      setLocalStorage('cartList', [])
      return {...state, cartList: []}
    },
    incrementCartItemQuantity: (state, action) => {
      const id = action.payload
      const newCartList = state.cartList.map(each => {
        if (each.id === id) {
          return {...each, quantity: each.quantity + 1}
        }
        return each
      })
      setLocalStorage('cartList', newCartList)
      return {...state, cartList: newCartList}
    },
    addBrowserHistory: (state, action) => {
      const productItem = action.payload
      const isProductIncludes = state.browserHistory.some(
        each => each.id === productItem.id,
      )
      let newBrowserHistory = state.browserHistory
      if (!isProductIncludes) {
        newBrowserHistory = [...state.browserHistory, productItem]
      }
      setLocalStorage('browserHistory', newBrowserHistory)
      return {...state, browserHistory: newBrowserHistory}
    },
    removeBrowserHistoryItem: (state, action) => {
      const id = action.payload
      const newBrowserHistory = state.browserHistory.filter(
        each => each.id !== id,
      )
      setLocalStorage('browserHistory', newBrowserHistory)
      return {...state, browserHistory: newBrowserHistory}
    },
    removeAllBrowserHistory: state => {
      setLocalStorage('browserHistory', [])
      return {...state, browserHistory: []}
    },
  },
  extraReducers: {
    [decrementCartItemQuantity]: (state, action) => {
      const id = action.payload
      const newCartList = state.cartList.map(each => {
        if (each.id === id) {
          return {...each, quantity: each.quantity - 1}
        }
        return each
      })
      setLocalStorage('cartList', newCartList)
      return {...state, cartList: newCartList}
    },
    [removeCartItem]: (state, action) => {
      const id = action.payload
      const newCartList = state.cartList.filter(each => each.id !== id)
      setLocalStorage('cartList', newCartList)
      return {...state, cartList: newCartList}
    },
    [getProductData.pending]: state => ({
      ...state,
      apiStatus: apiStatusConstants.inProgress,
    }),
    [getProductData.fulfilled]: (state, action) => ({
      ...state,
      productData: action.payload.productData,
      similarProductsData: action.payload.similarProductsData,
      apiStatus: apiStatusConstants.success,
    }),
    [getProductData.rejected]: state => ({
      ...state,
      apiStatus: apiStatusConstants.failure,
    }),
  },
})

export default productItemSlice.reducer
export const {
  onIncrementQuantity,
  onDecrementQuantity,
  addToCart,
  removeAllCartItems,
  incrementCartItemQuantity,
  addBrowserHistory,
  removeBrowserHistoryItem,
  removeAllBrowserHistory,
} = productItemSlice.actions
