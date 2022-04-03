import Cookies from 'js-cookie'
import store from '../../store'
import {history} from '../../../History'
import {
  ON_SUBMIT_FAILURE,
  ON_CHANGE_USERNAME,
  ON_CHANGE_PASSWORD,
} from './actionTypes'

export const showSubmitError = errorMsg => ({
  type: ON_SUBMIT_FAILURE,
  payload: errorMsg,
})

export const onChangeUsername = event => ({
  type: ON_CHANGE_USERNAME,
  payload: event.target.value,
})

export const onChangePassword = event => ({
  type: ON_CHANGE_PASSWORD,
  payload: event.target.value,
})

export const submitForm = event => async dispatch => {
  event.preventDefault()
  const state = store.getState()
  const {username, password} = state.loginState
  const userDetails = {username, password}
  const url = 'https://apis.ccbp.in/login'
  const options = {
    method: 'POST',
    body: JSON.stringify(userDetails),
  }
  const response = await fetch(url, options)
  const data = await response.json()
  if (response.ok === true) {
    Cookies.set('jwt_token', data.jwt_token, {
      expires: 40,
    })
    history.push('/')
  } else {
    dispatch(showSubmitError(data.error_msg))
  }
}
