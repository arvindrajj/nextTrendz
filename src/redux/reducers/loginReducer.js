import {
  ON_SUBMIT_FAILURE,
  ON_CHANGE_USERNAME,
  ON_CHANGE_PASSWORD,
} from '../actions/loginActions/actionTypes'

const initialState = {
  username: '',
  password: '',
  showSubmitError: false,
  errorMsg: '',
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case ON_CHANGE_USERNAME:
      return {...state, username: action.payload}
    case ON_CHANGE_PASSWORD:
      return {...state, password: action.payload}
    case ON_SUBMIT_FAILURE:
      return {...state, errorMsg: action.payload, showSubmitError: true}
    default:
      return state
  }
}

export default loginReducer
