import {useSelector} from 'react-redux'
import './index.css'

const CartSummary = () => {
  const cartList = useSelector(state => state.productItemState.cartList)
  let total = 0
  cartList.forEach(each => {
    total += each.price * each.quantity
  })
  return (
    <>
      <div className="cart-summary-container">
        <h1 className="order-total-value">
          Order Total:
          <span className="order-total-label"> Rs {total}/-</span>
        </h1>
        <p className="total-items">{cartList.length} Items in cart</p>
        <button type="button" className="checkout-button d-sm-none">
          Checkout
        </button>
      </div>
      <button type="button" className="checkout-button d-lg-none">
        Checkout
      </button>
    </>
  )
}

export default CartSummary
