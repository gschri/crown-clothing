import {useSelector,useDispatch} from 'react-redux'

import {
    CheckoutItemContainer,
    ImageContainer,
    Name,
    Quantity,
    Arrow,
    Value,
    Price,
    RemoveButton
} from './checkout-item.styles'

import {selectCartItems} from '../../store/cart/cart.selector'

import {
    clearItemFromCart,
    addItemToCart,
    removeItemFromCart
} from '../../store/cart/cart.action'

let CheckoutItem = ({cartItem}) => {
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
            <Name>{name}</Name>
            <Quantity>
                <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={addItemHandler}>&#10095;</Arrow>
            </Quantity>
            <Price>{price}</Price>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem