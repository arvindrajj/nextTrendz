import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const initialState = {
  primeDeals: [],
  apiStatus: apiStatusConstants.initial,
}

export const getPrimeDeals = createAsyncThunk('getPrimeDeals', async () => {
  try {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/prime-deals'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    const updatedData = fetchedData.prime_deals.map(product => ({
      title: product.title,
      brand: product.brand,
      price: product.price,
      id: product.id,
      imageUrl: product.image_url,
      rating: product.rating,
    }))
    return updatedData
  } catch (error) {
    throw Error(error)
  }
})

const primeDealsSlice = createSlice({
  name: 'primeDeals',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPrimeDeals.pending, state => ({
        ...state,
        apiStatus: apiStatusConstants.inProgress,
      }))
      .addCase(getPrimeDeals.fulfilled, (state, action) => ({
        ...state,
        apiStatus: apiStatusConstants.success,
        primeDeals: action.payload,
      }))
      .addCase(getPrimeDeals.rejected, state => ({
        ...state,
        apiStatus: apiStatusConstants.failure,
      }))
  },
})

export default primeDealsSlice.reducer
