import { CATEGORIES_ACTION_TYPES } from "./category.types"

export let CATEGORIES_INITIAL_STATE = {
    categories: [],
    isLoading: false,
    error: null
}

export let categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {}) => {
    var { type, payload } = action

    switch (type) {
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
            return { ...state, isLoading: true }
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: payload,
                isLoading: false
            }
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
            return {
                ...state,
                error: payload,
                isLoading: false
            }
        default:
            return state
    }
}