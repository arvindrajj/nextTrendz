import {Component} from 'react'
import Cookies from 'js-cookie'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {
  showSubmitError,
  onChangeUsername,
  onChangePassword,
  submitForm,
} from '../../redux/actions/loginActions/index'

import './index.css'

class LoginForm extends Component {
  renderPassword = () => {
    const {password, changePassword} = this.props

    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={changePassword}
          placeholder="Password"
        />
      </>
    )
  }

  renderUsername = () => {
    const {username, changeUsername} = this.props

    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={changeUsername}
          placeholder="Username"
        />
      </>
    )
  }

  render() {
    const {showError, errorMsg, onSubmitForm} = this.props
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-mobile-img"
          alt="website logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          className="login-img"
          alt="website login"
        />
        <form className="form-container" onSubmit={onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-desktop-img"
            alt="website logo"
          />
          <div className="input-container">{this.renderUsername()}</div>
          <div className="input-container">{this.renderPassword()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  username: state.loginState.username,
  password: state.loginState.password,
  showError: state.loginState.showSubmitError,
  errorMsg: state.loginState.errorMsg,
})

const mapDispatchToProps = dispatch => ({
  submitFailure: errorMsg => dispatch(showSubmitError(errorMsg)),
  changeUsername: event => dispatch(onChangeUsername(event)),
  changePassword: event => dispatch(onChangePassword(event)),
  onSubmitForm: event => dispatch(submitForm(event)),
})
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
