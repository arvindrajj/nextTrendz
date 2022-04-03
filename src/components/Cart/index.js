import {useSelector, useDispatch} from 'react-redux'
import Header from '../Header'
import CartListView from '../CartListView'
import EmptyCartView from '../EmptyCartView'
import CartSummary from '../CartSummary'
import {removeAllCartItems} from '../../redux/reducers/productItemReducer/index'
import './index.css'

const Cart = () => {
  const cartList = useSelector(state => state.productItemState.cartList)
  const dispatch = useDispatch()
  const showEmptyView = cartList.length === 0
  return (
    <>
      <Header />
      <div className="cart-container">
        {showEmptyView ? (
          <EmptyCartView />
        ) : (
          <div className="cart-content-container">
            <h1 className="cart-heading">My Cart</h1>
            <button
              type="button"
              className="remove-all-btn"
              onClick={() => dispatch(removeAllCartItems())}
            >
              Remove All
            </button>
            <CartListView />
            <CartSummary />
          </div>
        )}
      </div>
    </>
  )
}
export default Cart
