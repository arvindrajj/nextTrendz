import {
  API_SUCCESS,
  API_FAILURE,
  API_IN_PROGRESS,
  ACTIVE_OPTION_ID,
  ACTIVE_CATEGORY_ID,
  SEARCH_INPUT,
  ACTIVE_RATING_ID,
} from '../actions/allProductsActions/actionTypes'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
  },
  {
    optionId: 'PRICE_LOW',
  },
]

const initialState = {
  productsList: [],
  apiStatus: apiStatusConstants.initial,
  activeOptionId: sortbyOptions[0].optionId,
  activeCategoryId: '',
  searchInput: '',
  activeRatingId: '',
}

const allProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case API_IN_PROGRESS:
      return {...state, apiStatus: apiStatusConstants.inProgress}
    case API_SUCCESS:
      return {
        ...state,
        productsList: action.payload,
        apiStatus: apiStatusConstants.success,
      }
    case API_FAILURE:
      return {...state, apiStatus: apiStatusConstants.failure}
    case ACTIVE_OPTION_ID:
      return {...state, activeOptionId: action.payload}
    case ACTIVE_CATEGORY_ID:
      return {...state, activeCategoryId: action.payload}
    case SEARCH_INPUT:
      return {...state, searchInput: action.payload}
    case ACTIVE_RATING_ID:
      return {...state, activeRatingId: action.payload}
    default:
      return state
  }
}

export default allProductsReducer
