import styled from 'styled-components'
import { Link } from 'react-router-dom'

export let NavigationContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`
export let LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;
`
export let NavLinks = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
export let NavLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`