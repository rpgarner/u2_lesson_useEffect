# Introduction To `useEffect`

## Getting Started

- Fork and Clone
- cd into `intro-to-useffect`
- npm install
- npm start

## What is `useEffect`

The `useEffect` hook was introduced with the hooks api and replaces the following lifecycle methods, `componentDidMount`, `componentDidUpdate` and `componentWillUnmount`. The new term for this is `effect`.

The syntax is quite different from the original lifecycle methods. Ex:

```js
useEffect(() => {
  doSomething() // Function executing on mount

  return () => {
    // Cleanup function
    cleanUpSomething()
  }
}, [observable]) // Something we want to observe
```

The `doSomething` function runs every time a re-render is triggered, either by a state update or by the value of the observable changing.

The `cleanSomethingUp` function runs when the component unmounts from the virtual dom , ie: cleanup, primarily used to clean up timers or websocket subscriptions (realtime links to a data source).

The `observable` is something we want to keep track of, typically some sort of state or prop. Whenever the value changes it triggers the `useEffect` hook and re renders the virtual dom tree.

## Mounting A Component

In `components/Counter.js` let's import `useEffect`.

```jsx
import React, { useState, useEffect } from 'react'
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
```

Let's set up our effect:

```jsx
import React, { useState, useEffect } from 'react'
import Surprise from './Surprise'

const Counter = () => {
  const [count, updateCount] = useState(0)

  useEffect(() => {
    console.log('Mounted')
  }, [])

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
```

Open your browser console and refresh the page, you should see `Mounted` printed to the console. This is the equivalent of `componentDidMount`.

## Working With Observables/Dependencies

With `useEffect`, the second argument it recieves is an array of `observables` or `dependencies` to watch. React keeps track of any state, props or functions that are provided and re-renders the virtual dom if a there was a change to the state or props and if a function was invoked.

Add `count` to the array:

```jsx
import React, { useState, useEffect } from 'react'
import Surprise from './Surprise'

const Counter = () => {
  const [count, updateCount] = useState(0)

  useEffect(() => {
    console.log('Mounted')
  }, [count])

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
```

Refresh your browsers and click the button `2` times, now everytime the `count` state updates, a re-render occurs.
This is exactly how `componentDidUpdate` works.

# STOP HERE

## Cleanup's

Reset your counters back to `0` using the reset button.
Click the button `5` times. You should see a new component being rendered on the page and a new message printed to the console.

Now decrement the count below 5.

You should see `Unmounted => Clean up any side effects` printed to the console.

The `return ()=>{}` runs a function to `clean up` side effects of our component, really useful for clearing timers or terminating realtime connections.

An example would be, figure a chat application, when a user log's on, the connection get's established to a server. The server opens a live connection to the specific client, think text messages. Everytime a message is recieved or sent, it is all happening in realtime. Ideally we would prefer if when a user signs out or closes their browser the connection get's terminated. That's where the `clean up` portion of `useEffect` comes in.
