import styled from 'styled-components'

export let AuthenticationContainer = styled.div`
    display: flex;
    width: 900px;
    justify-content: space-between;
    margin: 30px auto;

    @media screen and (max-width: 800px) {
        max-width: 85%;
        flex-direction: column;
        row-gap: 30px;
    }
`