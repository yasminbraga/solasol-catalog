import styled from 'styled-components'
import colors from '../../styles/colors'

export const Container = styled.div`
  padding: 1rem;
  border-radius: 0.35rem;
  position: relative;
  z-index: 10;
`

export const PageTitle = styled.h2`
  color: ${colors.darkGrayText};
  text-align: center;
  font-size: 20px;
  padding: 1rem;
`

export const OrderDetails = styled.div`
  display: flex;
  color: ${colors.darkBlue};
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
`

export const OrderDetail = styled.span``

export const ShowMoreDetailsButton = styled.button<{ toggle: boolean }>`
  background: transparent;
  padding: 0;
  margin-left: 0.5rem;

  svg {
    vertical-align: middle;
    transform: ${(props) => (props.toggle ? 'rotate(180deg)' : 'initial')};
    transition: all 0.3s;
    stroke: ${colors.darkBlue};
  }
`

export const MoreDetails = styled.div<{ show: boolean }>`
  transform: ${(props) => (props.show ? 'scaleY(1)' : 'scaleY(0)')};
  max-height: ${(props) => (props.show ? '100%' : '0')};
  transform-origin: top;
  overflow: hidden;
  transition: all 0.2s;
`

export const TotalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${colors.extraLightGray};
  padding-top: 1rem;
`
