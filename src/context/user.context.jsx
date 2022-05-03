import {createContext,useEffect,useReducer} from 'react'
import { onAuthStateChangedListener,createUserDocumentFromAuth} from '../utils/firebase/firebase.utils';

import { createAction } from '../utils/reducer/reducer.utils';

export let UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
})

export let USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

export let userReducer = (state,action) => {
    var {type,payload} = action;

    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in userReducer`)
    }
}

export let INITIAL_STATE = {
    currentUser: null
}

export let UserProvider = ({children}) => {
    var [{currentUser}, dispatch] = useReducer(userReducer,INITIAL_STATE)

    var setCurrentUser = (user) => {
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER,user))
    }

    var value = {currentUser,setCurrentUser} 

    useEffect(() => {
        var unsubscribe = onAuthStateChangedListener((user) => {
            if(user) {
                createUserDocumentFromAuth(user)
            }
            setCurrentUser(user)
        })
        return unsubscribe
    },
    [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}