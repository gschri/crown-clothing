import {FC} from 'react'
import {useSelector,useDispatch} from 'react-redux'

import {
    CheckoutItemContainer,
    ImageContainer,
    Quantity,
    Arrow,
    Value,
    RemoveButton,
    BaseSpan
} from './checkout-item.styles'

import {selectCartItems} from '../../store/cart/cart.selector'
import { CartItem } from '../../store/cart/cart.types'

import {
    clearItemFromCart,
    addItemToCart,
    removeItemFromCart
} from '../../store/cart/cart.action'

type CheckoutItemProps = {
    cartItem: CartItem
}

let CheckoutItem: FC<CheckoutItemProps> = ({cartItem}) => {
    var dispatch = useDispatch();
    var {name, imageUrl, price,quantity} = cartItem;
    var cartItems = useSelector(selectCartItems)
    var clearItemHandler = () => dispatch(clearItemFromCart(cartItems,cartItem))
    var addItemHandler = () => dispatch(addItemToCart(cartItems,cartItem))
    var removeItemHandler = () => dispatch(removeItemFromCart(cartItems,cartItem))

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`}/>
            </ImageContainer>
            <BaseSpan>{name}</BaseSpan>
            <Quantity>
                <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={addItemHandler}>&#10095;</Arrow>
            </Quantity>
            <BaseSpan>{price}</BaseSpan>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem