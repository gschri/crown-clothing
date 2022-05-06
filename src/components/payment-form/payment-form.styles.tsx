import styled from 'styled-components'
import Button from '../button/button.component'

export let PaymentFormContainer = styled.div`
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 800px) {
        justify-content: flex-start;
    }
`

export let FormContainer = styled.form`
    height: 100px;
    min-width: 500px;

    @media screen and (max-width: 800px) {
        min-width: 350px;
        h2 {
            margin-bottom: 25px;
        }
    }
`

export let PaymentButton = styled(Button)`
    margin-left: auto;
    margin-top: 30px;

    @media screen and (max-width: 800px) {
        margin-right: auto;
    }
`