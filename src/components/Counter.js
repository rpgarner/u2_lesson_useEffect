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
    <div>
      <h3 style={{ fontSize: '4rem' }}>{count}</h3>
      <div>
        <button style={{ fontSize: '4rem' }} onClick={incrementCount}>
          DO MORE
        </button>
      </div>
      <div>
        <button style={{ fontSize: '4rem' }} onClick={decrementCount}>
          DO LESS
        </button>
      </div>
      <div>
        <button style={{ fontSize: '4rem' }} onClick={() => updateCount(0)}>
          RESET
        </button>
      </div>
      <section>{count === 5 ? <Surprise /> : null}</section>
    </div>
  )
}

export default Counter
