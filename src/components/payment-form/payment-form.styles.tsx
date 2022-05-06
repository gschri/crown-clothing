import styled from 'styled-components'
import Button from '../button/button.component'

export let PaymentFormContainer = styled.div`
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export let FormContainer = styled.form`
    height: 100px;
    min-width: 500px;
`

export let PaymentButton = styled(Button)`
    margin-left: auto;
    margin-top: 30px;
`