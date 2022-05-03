import { USER_ACTION_TYPES } from "./user.types";

export let userReducer = (state = INITIAL_STATE, action) => {
    var { type, payload } = action;

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default:
            return state
    }
}

export let INITIAL_STATE = {
    currentUser: null
}

