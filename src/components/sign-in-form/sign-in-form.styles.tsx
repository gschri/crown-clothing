import { InvertedButton,BaseButton,GoogleSignInButton } from '../button/button.styles'
import styled from 'styled-components'

export let ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;

    @media screen and (max-width: 800px) {
        align-items: flex-start;
        justify-content: flex-start;
        column-gap: 15px;

        ${InvertedButton},
        ${BaseButton},
        ${GoogleSignInButton} {
            display: block;
            min-width: 140px;
        }
    }
`

export let SignUpContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 380px;

    h2 {
        margin: 10px 0;
    }
`