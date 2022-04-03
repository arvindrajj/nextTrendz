/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Loader from 'react-loader-spinner'

import ProductCard from '../ProductCard'
import {getPrimeDeals} from '../../redux/reducers/primeDealsReducer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const PrimeDealsSection = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPrimeDeals())
  }, [])
  const primeDeals = useSelector(state => state.primeDealsState.primeDeals)
  const apiStatus = useSelector(state => state.primeDealsState.apiStatus)
  const renderPrimeDealsListView = () => (
    <div>
      <h1 className="primedeals-list-heading">Exclusive Prime Deals</h1>
      <ul className="products-list">
        {primeDeals.map(product => (
          <ProductCard productData={product} key={product.id} />
        ))}
      </ul>
    </div>
  )

  const renderPrimeDealsFailureView = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
      alt="register prime"
      className="register-prime-img"
    />
  )

  const renderLoadingView = () => (
    <div className="primedeals-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  const renderPrimeDeals = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderPrimeDealsListView()
      case apiStatusConstants.failure:
        return renderPrimeDealsFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }

  return <>{renderPrimeDeals()}</>
}

export default PrimeDealsSection
