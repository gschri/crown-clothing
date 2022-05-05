import {useState} from 'react'

import FormInput from '../form-input/form-input.component'
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component'

import {SignUpContainer,ButtonsContainer} from './sign-in-form.styles'
import {useDispatch} from 'react-redux'
import {googleSignInStart,emailSignInStart} from '../../store/user/user.action'

let defaultFormFields = {
    email: '',
    password: '',
}

let SignInForm = () => {
    var dispatch = useDispatch();
    var [formFields, setFormFields] = useState(defaultFormFields)
    var {email,password} = formFields

    var resetFormFields = () => {
        setFormFields(defaultFormFields)
    } 

    var signInWithGoogle = () => {
        dispatch(googleSignInStart())
    }

    var handleSubmit = async (event) => {
        event.preventDefault();

        try {
            dispatch(emailSignInStart(email,password))
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
        <SignUpContainer>
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
            <ButtonsContainer>
                <Button type="submit">Sign In</Button>
                <Button 
                type="button" 
                buttonType={BUTTON_TYPE_CLASSES.google} 
                onClick={signInWithGoogle}
                >
                    Google sign in
                </Button>
            </ButtonsContainer>
            </form>
        </SignUpContainer>
    )
}

export default SignInForm