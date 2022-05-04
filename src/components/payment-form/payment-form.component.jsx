import {useState} from 'react'
import {CardElement,useStripe,useElements} from '@stripe/react-stripe-js'
import {useSelector,useDispatch} from 'react-redux'

import { selectCartTotal } from '../../store/cart/cart.selector'
import { clearCart } from '../../store/cart/cart.action'
import { selectCurrentUser } from '../../store/user/user.selector'

import {BUTTON_TYPE_CLASSES} from '../button/button.component'
import {PaymentFormContainer,FormContainer,PaymentButton} from './payment-form.styles'

let PaymentForm = () => {
    var stripe = useStripe()
    var elements = useElements()
    var amount = useSelector(selectCartTotal)
    var currentUser = useSelector(selectCurrentUser)
    var [isProcessingPayment,setIsProcessingPayment] = useState(false)
    var dispatch = useDispatch()
    var paymentHandler = async (e) => {
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

        let paymentResult = await stripe.confirmCardPayment(client_secret,{
            payment_method: {
                card: elements.getElement(CardElement),
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