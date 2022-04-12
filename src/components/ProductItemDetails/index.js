/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import Loader from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Header from '../Header'
import ProductItem from '../ProductItem'
import {
  getProductData,
  onIncrementQuantity,
  onDecrementQuantity,
  addToCart,
  removeAllBrowserHistory,
} from '../../redux/reducers/productItemReducer/index'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const ProductItemDetails = props => {
  const {match} = props
  const {params} = match
  const {id} = params
  const dispatch = useDispatch()
  const history = useHistory()
  const {location} = history
  const {pathname} = location
  useEffect(() => {
    dispatch(getProductData(id))
  }, [pathname])

  const productData = useSelector(state => state.productItemState.productData)
  const similarProductsData = useSelector(
    state => state.productItemState.similarProductsData,
  )
  const browserHistory = useSelector(
    state => state.productItemState.browserHistory,
  )
  const apiStatus = useSelector(state => state.productItemState.apiStatus)
  const cartQuantity = useSelector(state => state.productItemState.quantity)

  const renderLoadingView = () => (
    <div className="products-details-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  const renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <Link to="/products">
        <button type="button" className="button">
          Continue Shopping
        </button>
      </Link>
    </div>
  )

  const renderProductDetailsView = () => {
    const {
      availability,
      brand,
      description,
      imageUrl,
      price,
      rating,
      title,
      totalReviews,
      quantity,
    } = productData
    const onClickAddToCart = () => {
      const productItem = {...productData, cartQuantity}
      dispatch(addToCart(productItem))
    }

    return (
      <div className="product-details-success-view">
        <div className="product-details-container">
          <img src={imageUrl} alt="product" className="product-image" />
          <div className="product">
            <h1 className="product-name">{title}</h1>
            <p className="price-details">Rs {price}/-</p>
            <div className="rating-and-reviews-count">
              <div className="rating-container">
                <p className="rating">{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star"
                />
              </div>
              <p className="reviews-count">{totalReviews} Reviews</p>
            </div>
            <p className="product-description">{description}</p>
            <div className="label-value-container">
              <p className="label">Available:</p>
              <p className="value">{availability}</p>
            </div>
            <div className="label-value-container">
              <p className="label">Brand:</p>
              <p className="value">{brand}</p>
            </div>
            <hr className="horizontal-line" />
            <div className="quantity-container">
              <button
                type="button"
                className="quantity-controller-button"
                onClick={() => dispatch(onDecrementQuantity())}
                testid="minus"
              >
                <BsDashSquare className="quantity-controller-icon" />
              </button>
              <p className="quantity">{quantity}</p>
              <button
                type="button"
                className="quantity-controller-button"
                onClick={() => dispatch(onIncrementQuantity())}
                testid="plus"
              >
                <BsPlusSquare className="quantity-controller-icon" />
              </button>
            </div>
            <button
              type="button"
              className="button add-to-cart-btn"
              onClick={onClickAddToCart}
            >
              ADD TO CART
            </button>
          </div>
        </div>
        <h1 className="similar-products-heading">Similar Products</h1>
        <ul className="similar-products-list">
          {similarProductsData.map(eachSimilarProduct => (
            <ProductItem
              productDetails={eachSimilarProduct}
              key={eachSimilarProduct.id}
            />
          ))}
        </ul>
        {browserHistory.length > 0 && (
          <div className="browser-history-header">
            <h1 className="browsing-history-heading">Browsing History</h1>
            <button
              type="button"
              className="remove-all-history-button"
              onClick={() => dispatch(removeAllBrowserHistory())}
            >
              Remove all items from view
            </button>
          </div>
        )}
        <ul className="browsing-history-list">
          {browserHistory.map(eachBrowserHistory => (
            <ProductItem
              browserHistory
              productDetails={eachBrowserHistory}
              key={eachBrowserHistory.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  const renderProductDetails = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderProductDetailsView()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }
  return (
    <>
      <Header />
      <div className="product-item-details-container">
        {renderProductDetails()}
      </div>
    </>
  )
}

export default ProductItemDetails
