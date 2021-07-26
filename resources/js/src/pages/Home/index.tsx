import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

const HomePage: React.FC = () => {
  const [counter, setCounter] = useState(0)

  function loadCollections() {
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve([
          {
            id: 1,
            name: 'Dalton',
          },
        ])
      }, 3000)
    })
  }

  useEffect(() => {
    ;(async () => {
      const collections = await loadCollections()
      console.log(collections)
    })()
  }, [])

  return (
    <div>
      <h1>This was made with React 😁</h1>
      <div>
        <h3>Counter: {counter}</h3>
        <button
          onClick={() => {
            setCounter((state) => state + 1)
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            setCounter((state) => state - 1)
          }}
        >
          -
        </button>
      </div>
    </div>
  )
}

const container = document.querySelector('#react-hello')

if (container) ReactDOM.render(<HomePage />, container)
