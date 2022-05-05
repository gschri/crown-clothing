import { createAction } from '../../utils/reducer/reducer.utils'
import { USER_ACTION_TYPES } from "./user.types";

export let setCurrentUser = (user) => {
    return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
}

export let checkUserSession = () => {
    return createAction(USER_ACTION_TYPES.CHECK_USER_SESSION)
}

export let googleSignInStart = () => {
    return createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START)
}

export let emailSignInStart = (email, password) => {
    return createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password })
}
export let signInSuccess = (user) => {
    return createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user)
}
export let signInFailed = (error) => {
    return createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error)
}

export let signUpStart = (email, password, displayName) => {
    return createAction(USER_ACTION_TYPES.SIGN_UP_START, { email, password, displayName })
}

export let signUpSuccess = (user, additionalDetails) => {
    return createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, { user, additionalDetails })
}

export let signUpFailed = (error) => {
    return createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error)
}


export let signOutStart = () => {
    return createAction(USER_ACTION_TYPES.SIGN_OUT_START)
}

export let signOutSuccess = () => {
    return createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS)
}

export let signOutFailed = (error) => {
    return createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error)
}