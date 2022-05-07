import {useState,FormEvent} from 'react'
import {CardElement,useStripe,useElements} from '@stripe/react-stripe-js'
import {useSelector,useDispatch} from 'react-redux'

import { selectCartTotal } from '../../store/cart/cart.selector'
import { clearCart } from '../../store/cart/cart.action'
import { selectCurrentUser } from '../../store/user/user.selector'

import {BUTTON_TYPE_CLASSES} from '../button/button.component'
import {PaymentFormContainer,FormContainer,PaymentButton} from './payment-form.styles'
import { StripeCardElement } from '@stripe/stripe-js'

let ifValidCardElement = (card: StripeCardElement | null): card is StripeCardElement => card !== null;

let PaymentForm = () => {
    var stripe = useStripe()
    var elements = useElements()
    var amount = useSelector(selectCartTotal)
    var currentUser = useSelector(selectCurrentUser)
    var [isProcessingPayment,setIsProcessingPayment] = useState(false)
    var dispatch = useDispatch()
    var paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(!stripe || !elements) {
            return;
        }

        setIsProcessingPayment(true)

        let response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({amount: amount * 100})
        }).then(res => res.json())

        let {paymentIntent: {client_secret}} = response

        let cardDetails = elements.getElement(CardElement)

        if(!ifValidCardElement(cardDetails)) return;

        let paymentResult = await stripe.confirmCardPayment(client_secret,{
            payment_method: {
                card: cardDetails,
                billing_details: {
                    name: currentUser ? currentUser.displayName : 'Guest'
                }
            }
        })

        setIsProcessingPayment(false);

        if(paymentResult.error) {
            alert(paymentResult.error)
        } else { 
            if(paymentResult.paymentIntent.status === 'succeeded') {
                alert('Payment Successful')
                dispatch(clearCart())
                cardDetails.clear()
            }

        }
    }
    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment: </h2>
                <CardElement/>
                <PaymentButton isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay now</PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    )
}

export default PaymentForm