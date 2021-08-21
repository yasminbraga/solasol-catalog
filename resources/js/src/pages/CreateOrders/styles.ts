import styled from 'styled-components'
import colors from '../../styles/colors'
import { primaryShadow, standardShadow } from '../../styles/globals'

export const Container = styled.div`
  padding: 0 1rem;
`

export const Card = styled.div`
  padding: 3rem 2rem;
  margin: 0 auto;
  border-radius: 0.35rem;
  background: ${colors.lightBg};
  ${standardShadow};

  @media screen and (min-width: 768px) {
    max-width: 620px;
  }
`

export const Title = styled.h2`
  font-weight: 400;
`

export const Subtitle = styled.p`
  font-size: 14px;
  max-width: 260px;

  @media screen and (min-width: 768px) {
    max-width: 450px;
  }
`

export const AccountForm = styled.form`
  display: grid;
  gap: 0.5rem;
  justify-items: center;
  margin-top: 2rem;
`

export const Button = styled.button`
  padding: 1rem;
  background: ${colors.primary};
  border-radius: 0.35rem;
  width: 100%;
  font-weight: 500;
  color: ${colors.lightText};
  font-size: 16px;
  ${primaryShadow}

  div,
  svg {
    vertical-align: middle;
    float: right;
  }
`

export const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    color: ${colors.primary};
  }
`

export const FormRow = styled.div``
