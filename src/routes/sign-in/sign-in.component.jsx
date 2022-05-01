import {signInWithGooglePopup,createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'
let SignIn = () => {
    let logGoogleUser = async () => {
        var {user} = await signInWithGooglePopup()
        var userDocRef = await createUserDocumentFromAuth(user)
    }
    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>
                Sign in with Google Popup
            </button>
        </div>
    )
}

export default SignIn