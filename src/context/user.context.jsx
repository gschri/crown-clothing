import {createContext,useState,useEffect} from 'react'
import { onAuthStateChangedListener,createUserDocumentFromAuth} from '../utils/firebase/firebase.utils';

// as the actual value you want to access
export let UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
})

export let UserProvider = ({children}) => {
    var [currentUser,setCurrentUser ] = useState(null); 
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