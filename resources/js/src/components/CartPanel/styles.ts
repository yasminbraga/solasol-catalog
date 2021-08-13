import styled from 'styled-components'
import colors from '../../styles/colors'
import { standardShadow } from '../../styles/globals'

export const Container = styled.div<{ show: boolean }>`
  background: ${colors.lightBg};
  position: fixed;

  z-index: 50;

  top: 0px;
  bottom: 0px;
  right: 0px;
  width: 90%;
  display: flex;
  flex-direction: column;
  max-width: 390px;
  height: 100%;
  overflow: hidden;

  transform: ${(props) => (props.show ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s;

  ${standardShadow};
`
export const PanelHeader = styled.div`
  padding: 1rem 1.5rem;
`

export const ClosePanelButton = styled.button`
  background: transparent;
  color: lightgray;
  border: 0;
  font-size: 16px;
  padding: 0.5rem 0;

  svg {
    vertical-align: middle;
  }

  :active {
    color: ${colors.extraLightGray};
  }
`

export const PanelSubHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
`

export const PanelTitle = styled.h3`
  color: ${colors.primary};
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 500;

  svg {
    margin-right: 0.5rem;
  }
`

export const PanelSubtitle = styled.p`
  color: ${colors.lightGray};
  font-size: 16px;
  font-weight: 400;
`

export const PanelBody = styled.div`
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  overflow: auto;
  flex: 1;

  @media screen and (min-width: 768px) {
    ::-webkit-scrollbar {
      width: 5px;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: ${colors.primary};
    }

    ::-webkit-scrollbar-thumb:hover {
      background: ${colors.lightPrimary};
    }
  }
`

export const PanelFooter = styled.div`
  padding: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
  background: ${colors.lightBg};
  ${standardShadow}
`

export const TotalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const FinishOrderButton = styled.button`
  background: ${colors.primary};
  width: 100%;
  color: ${colors.lightText};
  border-radius: 0.35rem;
  font-size: 16px;
  font-weight: 500;
  height: 42px;
  vertical-align: middle;
`

export const TotalLabel = styled.h4`
  font-weight: 400;
  color: ${colors.darkGrayText};
`
export const TotalValue = styled.h4`
  font-weight: 500;
`
