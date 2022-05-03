import { createSelector } from 'reselect'

let selectCartReducer = state => state.cart

export let selectCartItems = createSelector(
    [selectCartReducer],
    (cart) => cart.cartItems
)

export let selectIsCartOpen = createSelector(
    [selectCartReducer],
    (cart) => cart.isCartOpen
)

export let selectCartCount = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce(
        (total, cartItem) => total + cartItem.quantity,
        0
    )
)

export let selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce(
        (total, cartItem) => total + cartItem.quantity * cartItem.price,
        0
    )
)