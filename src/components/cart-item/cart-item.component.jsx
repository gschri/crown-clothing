import {ItemDetails,CartItemContainer,Name,Price} from './cart-item.styles'

let CartItem = ({cartItem}) => {
    var {imageUrl, price, name, quantity} = cartItem

    return (
        <CartItemContainer>
            <img src={imageUrl} alt={`${name}`} />
            <ItemDetails>
                <Name>{name}</Name>
                <Price>
                   {quantity} x ${price}
                </Price>
            </ItemDetails>
        </CartItemContainer>
    )
}

export default CartItem