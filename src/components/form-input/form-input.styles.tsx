import styled,{css} from 'styled-components'

let subColor = 'grey'
let mainColor = 'black'

let shrinkLabelStyles = css`
  top: -14px;
  font-size: 12px;
  color: ${mainColor};
` 

type FormInputLabelProps = {
  shrink?: boolean
}

export let FormInputLabel = styled.label<FormInputLabelProps>`
  color: ${subColor};
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;

  ${({shrink}) => shrink && shrinkLabelStyles}
`

export let Input = styled.input`
  background: none;
  background-color: white;
  color: ${subColor};
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${subColor};
  margin: 25px 0;

  &:focus {
    outline: none;
  }

  &:focus ~ ${FormInputLabel} {
    ${shrinkLabelStyles}
  }

`
export let Group = styled.div`
  position: relative;
  margin: 45px 0;

  input[type='password'] {
    letter-spacing: 0.3em;
  }

  @media screen and (max-width: 800px) {
    display: flex;
    width: 80%;
    flex-direction: column;
  }
`