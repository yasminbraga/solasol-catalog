import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'

interface InitialState {
  invalid: boolean
  setInvalid: Dispatch<SetStateAction<boolean>>
}

const HeaderContext = createContext({} as InitialState)

export const useHeader = () => useContext(HeaderContext)

const HeaderProvider: React.FC = ({ children }) => {
  const [invalid, setInvalid] = useState(true)

  return (
    <HeaderContext.Provider
      value={{
        invalid,
        setInvalid,
      }}
    >
      {children}
    </HeaderContext.Provider>
  )
}

export default HeaderProvider
