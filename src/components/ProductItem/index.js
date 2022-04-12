import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {
  addBrowserHistory,
  removeBrowserHistoryItem,
} from '../../redux/reducers/productItemReducer'
import './index.css'

const ProductItem = props => {
  const {productDetails, browserHistory} = props
  const {title, brand, imageUrl, rating, price, id} = productDetails
  const dispatch = useDispatch()
  return (
    <li className="similar-product-item">
      <Link
        to={`/products/${id}`}
        className="link-item"
        onClick={() => dispatch(addBrowserHistory(productDetails))}
      >
        <img
          src={imageUrl}
          className="similar-product-img"
          alt={`similar product ${title}`}
        />
        <p className="similar-product-title">{title}</p>
        <p className="similar-products-brand">by {brand}</p>
      </Link>
      {browserHistory && (
        <button
          className="remove-history-button"
          type="button"
          onClick={() => dispatch(removeBrowserHistoryItem(id))}
        >
          Remove from view
        </button>
      )}
      <div className="similar-product-price-rating-container">
        <p className="similar-product-price">Rs {price}/-</p>
        <div className="similar-product-rating-container">
          <p className="similar-product-rating">{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="similar-product-star"
          />
        </div>
      </div>
    </li>
  )
}

export default ProductItem
