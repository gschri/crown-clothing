import {useState} from 'react'

import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils'

import './sign-in-form.styles.scss'

let defaultFormFields = {
    email: '',
    password: '',
}

let SignInForm = () => {
    var [formFields, setFormFields] = useState(defaultFormFields)
    var {email,password} = formFields

    var resetFormFields = () => {
        setFormFields(defaultFormFields)
    } 

    var signInWithGoogle = async () => {
        await signInWithGooglePopup()
    }

    var handleSubmit = async (event) => {
        event.preventDefault();

        try {
            var {user} = await signInAuthUserWithEmailAndPassword(
                email,
                password
            )
            resetFormFields()
        } catch (error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email')
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email')
                    break;
                default:
                    console.log(error)
            }
        }
    } 

    var handleChange = (event) => {
        var {name,value} = event.target;

        setFormFields({...formFields,[name]: value})
    }

    return (
        <div className='sign-up-container' >
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
            <FormInput
            label="Email"
            required 
            type="email"
            onChange={handleChange} 
            name="email" 
            value={email}
            />
            <FormInput
            label="Password"
            required
            type="password" 
            onChange={handleChange} 
            name="password" 
            value={password}
            />
            <div className='buttons-container'>
                <Button type="submit">Sign In</Button>
                <Button type="button" buttonType='google' onClick={signInWithGoogle}>Google sign in</Button>
            </div>
            </form>
        </div>
    )
}

export default SignInForm