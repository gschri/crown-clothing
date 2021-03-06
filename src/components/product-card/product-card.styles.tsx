import styled from 'styled-components'

import {InvertedButton,BaseButton,GoogleSignInButton} from '../button/button.styles'

export let Price = styled.span`
  width: 10%;
`
export let Name = styled.span`
  width: 90%;
  margin-bottom: 15px;
`
export let Footer = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
` 

export let ProductCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 350px;
  align-items: center;
  position: relative;

  img {
    width: 100%;
    height: 95%;
    object-fit: cover;
    margin-bottom: 5px;
  }

  ${InvertedButton},
  ${GoogleSignInButton},
  ${BaseButton} {
    width: 80%;
    opacity: 0.7;
    position: absolute;
    top: 255px;
    display: none;
  }

  &:hover {
    img {
      opacity: 0.8;
    }

    ${InvertedButton},
    ${GoogleSignInButton},
    ${BaseButton} {
      opacity: 0.85;
      display: flex;
    }
  }

  @media screen and (max-width: 800px) {
    width: 40vw;

    ${InvertedButton},
    ${GoogleSignInButton},
    ${BaseButton} {
      display: flex;
      min-width: 140px;
      font-size: 14px;
    }

    &:hover {
      .image {
        opacity: unset;
      }

      ${InvertedButton},
      ${GoogleSignInButton},
      ${BaseButton} {
        opacity: unset;
      }
    }
  }
`