import {useSelector} from 'react-redux'
import CartItem from '../CartItem'

import './index.css'

const CartListView = () => {
  const cartList = useSelector(state => state.productItemState.cartList)
  return (
    <ul className="cart-list">
      {cartList.map(eachCartItem => (
        <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
      ))}
    </ul>
  )
}

export default CartListView
