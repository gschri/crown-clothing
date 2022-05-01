import {signInWithGooglePopup,createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component'
let SignIn = () => {
    // useEffect(() => {
    //     async function logGoogleRedirectUser() {
    //         var response = await getRedirectResult(auth)
    //         if(response) {
    //             let userDocRef = await createUserDocumentFromAuth(response.user)
    //         }
    //     }
    //     logGoogleRedirectUser()
    // },[])
    var logGoogleUser = async () => {
        var {user} = await signInWithGooglePopup()
        var userDocRef = await createUserDocumentFromAuth(user)
    }
    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>
                Sign in with Google Popup
            </button>
            <SignUpForm/>
            {/* <button onClick={signInWithGoogleRedirect}>
                Sign in with Google Redirect
            </button> */}
        </div>
    )
}

export default SignIn