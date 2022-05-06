import {useState,FormEvent,ChangeEvent} from 'react'
import { useDispatch } from 'react-redux'
import { signUpStart } from '../../store/user/user.action'
import { AuthError, AuthErrorCodes} from 'firebase/auth'

import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

import {SignUpContainer} from './sign-up-form.styles'

let defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

let SignUpForm = () => {
    var dispatch = useDispatch();
    var [formFields, setFormFields] = useState(defaultFormFields)
    var {displayName,email,password,confirmPassword} = formFields


    var resetFormFields = () => {
        setFormFields(defaultFormFields)
    } 

    var handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(password !== confirmPassword) {
            alert("passwords do not match");
            return;
        }
        try {
            dispatch(signUpStart(email,password,displayName))
            resetFormFields();
        } catch (error) {
            if((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
                alert('Cannot create user, email already in use');
            } else {
                console.log('user creation encountered an error', error) 
            }
        }
    } 

    var handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        var {name,value} = event.target;

        setFormFields({...formFields,[name]: value})
    }

    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form id="signup-form" onSubmit={handleSubmit}>
            <FormInput 
            label="Display Name"
            required 
            type="text" 
            onChange={handleChange} 
            name="displayName" 
            value={displayName} 
            />
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
            <FormInput
            label="Confirm Password"
            required
            type="password"
            onChange={handleChange}
            name="confirmPassword"
            value={confirmPassword}
            />
            <Button type="submit">Sign Up</Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm