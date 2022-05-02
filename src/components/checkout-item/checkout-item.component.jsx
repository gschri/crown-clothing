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

import {useContext} from 'react';
import {CartContext} from '../../context/cart.context';

let CheckoutItem = ({cartItem}) => {
    var {name, imageUrl, price,quantity} = cartItem;
    var {clearItemFromCart,addItemToCart,removeItemFromCart} = useContext(CartContext)

    var clearItemHandler = () => clearItemFromCart(cartItem)
    var addItemHandler = () => addItemToCart(cartItem)
    var removeItemHandler = () => removeItemFromCart(cartItem)

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