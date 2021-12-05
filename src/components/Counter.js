import React, { useState } from 'react'
import Surprise from './Surprise'

const Counter = () => {
  const [count, updateCount] = useState(0)

  const incrementCount = () => {
    updateCount(count + 1)
  }

  const decrementCount = () => {
    if (count > 0) updateCount(count - 1)
  }

  return (
    <div style={{height: '100vh'}}>
      {count === 20 ? <Surprise /> : 
      <div>
        <h3 style={{ fontSize: '4rem' }}>{count}</h3>
        <div>
          <button style={{ fontSize: '3rem' }} onClick={incrementCount}>
            +
          </button>
        </div>
        <div>
          <button style={{ fontSize: '3rem' }} onClick={decrementCount}>
            -
          </button>
        </div>
      </div>
      }
      <div>
        <button style={{ fontSize: '3rem' }} onClick={() => updateCount(0)}>
          RESET
        </button>
      </div>
    </div>
  )
}

export default Counter
