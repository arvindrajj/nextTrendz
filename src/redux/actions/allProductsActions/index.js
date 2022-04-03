import Cookies from 'js-cookie'
import {
  API_SUCCESS,
  API_FAILURE,
  API_IN_PROGRESS,
  ACTIVE_OPTION_ID,
  ACTIVE_CATEGORY_ID,
  SEARCH_INPUT,
  ACTIVE_RATING_ID,
} from './actionTypes'
import store from '../../store'

export const apiSuccess = updatedData => ({
  type: API_SUCCESS,
  payload: updatedData,
})

export const apiInProgress = () => ({
  type: API_IN_PROGRESS,
})

export const apiFailure = () => ({
  type: API_FAILURE,
})

export const changeActiveOptionId = activeOptionId => ({
  type: ACTIVE_OPTION_ID,
  payload: activeOptionId,
})

export const changeActiveCategoryId = activeCategoryId => ({
  type: ACTIVE_CATEGORY_ID,
  payload: activeCategoryId,
})

export const changeSearchInput = searchInput => ({
  type: SEARCH_INPUT,
  payload: searchInput,
})

export const changeActiveRatingId = activeRatingId => ({
  type: ACTIVE_RATING_ID,
  payload: activeRatingId,
})

export const getProducts = () => async dispatch => {
  dispatch(apiInProgress())
  const state = store.getState()
  const jwtToken = Cookies.get('jwt_token')
  const {
    activeOptionId,
    activeCategoryId,
    searchInput,
    activeRatingId,
  } = state.allProductsState
  const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${activeCategoryId}&title_search=${searchInput}&rating=${activeRatingId}`
  const options = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
    method: 'GET',
  }
  const response = await fetch(apiUrl, options)
  if (response.ok) {
    const fetchedData = await response.json()
    const updatedData = fetchedData.products.map(product => ({
      title: product.title,
      brand: product.brand,
      price: product.price,
      id: product.id,
      imageUrl: product.image_url,
      rating: product.rating,
    }))
    dispatch(apiSuccess(updatedData))
  } else {
    dispatch(apiFailure())
  }
}
