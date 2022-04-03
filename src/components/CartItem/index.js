import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'

import {
  decrementCartItem,
  removeCartItem,
  incrementCartItemQuantity,
} from '../../redux/reducers/productItemReducer'

import './index.css'

const CartItem = props => {
  const {cartItemDetails} = props
  const {id, title, brand, quantity, price, imageUrl} = cartItemDetails
  const totalPrice = price * quantity
  const dispatch = useDispatch()
  return (
    <li className="cart-item">
      <img className="cart-product-image" src={imageUrl} alt={title} />
      <div className="cart-item-details-container">
        <Link to={`/products/${id}`} className="link-item">
          <div className="cart-product-title-brand-container">
            <p className="cart-product-title">{title}</p>
            <p className="cart-product-brand">by {brand}</p>
          </div>
        </Link>
        <div className="cart-quantity-container">
          <button
            type="button"
            className="quantity-controller-button"
            testid="minus"
            onClick={() => dispatch(decrementCartItem(id))}
          >
            <BsDashSquare color="#52606D" size={12} />
          </button>
          <p className="cart-quantity">{quantity}</p>
          <button
            type="button"
            className="quantity-controller-button"
            testid="plus"
            onClick={() => dispatch(incrementCartItemQuantity(id))}
          >
            <BsPlusSquare color="#52606D" size={12} />
          </button>
        </div>
        <div className="total-price-remove-container">
          <p className="cart-total-price">Rs {totalPrice}/-</p>
          <button
            className="remove-button"
            type="button"
            onClick={() => dispatch(removeCartItem(id))}
          >
            Remove
          </button>
        </div>
      </div>
      <button
        className="delete-button"
        type="button"
        onClick={() => dispatch(removeCartItem(id))}
        testid="remove"
      >
        <AiFillCloseCircle color="#616E7C" size={20} />
      </button>
    </li>
  )
}

export default CartItem
