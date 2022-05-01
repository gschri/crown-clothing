import {useState} from 'react'

import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

import {createAuthUserWithEmailAndPassword,createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'

import './sign-up-form.styles.scss'

let defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

let SignUpForm = () => {
    var [formFields, setFormFields] = useState(defaultFormFields)
    var {displayName,email,password,confirmPassword} = formFields

    var resetFormFields = () => {
        setFormFields(defaultFormFields)
    } 

    var handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword) {
            alert("passwords do not match");
            return;
        }
        try {
            var {user} = await createAuthUserWithEmailAndPassword(
                email,
                password
            )

            await createUserDocumentFromAuth(user,{displayName});
            resetFormFields();
        } catch (error) {
            if(error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            } else {
                console.log('user creation encountered an error', error) 
            }
        }
    } 

    var handleChange = (event) => {
        var {name,value} = event.target;

        setFormFields({...formFields,[name]: value})
    }

    return (
        <div className='sign-up-container' >
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
        </div>
    )
}

export default SignUpForm