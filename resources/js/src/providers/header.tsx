import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'

interface InitialState {
  invalid: boolean
  showCartButton: boolean
  setInvalid: Dispatch<SetStateAction<boolean>>
  setShowCartButton: Dispatch<SetStateAction<boolean>>
}

const HeaderContext = createContext({} as InitialState)

export const useHeader = () => useContext(HeaderContext)

const HeaderProvider: React.FC = ({ children }) => {
  const [invalid, setInvalid] = useState(true)
  const [showCartButton, setShowCartButton] = useState(false)

  return (
    <HeaderContext.Provider
      value={{
        invalid,
        setInvalid,
        showCartButton,
        setShowCartButton,
      }}
    >
      {children}
    </HeaderContext.Provider>
  )
}

export default HeaderProvider
