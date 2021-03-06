import { memo } from 'react'
import {useSelector} from 'react-redux'
import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import PaymentForm from '../../components/payment-form/payment-form.component'

import { selectCartItems,selectCartTotal } from '../../store/cart/cart.selector'

import {
    CheckoutContainer,
    CheckoutHeader,
    HeaderBlock,
    Total
} from './checkout.styles'

let Checkout = memo(() => {
    var cartItems = useSelector(selectCartItems)
    var cartTotal = useSelector(selectCartTotal)

    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader>
            {
                cartItems.map(cartItem => (
                        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
            ))}
            <Total>Total: ${cartTotal}</Total>
            <PaymentForm />
        </CheckoutContainer>
    )
})

export default Checkout