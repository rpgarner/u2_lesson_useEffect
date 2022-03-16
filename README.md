# useEffect & The React Component Lifecycle

![Merv](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2F9ftLoOjZMF8Bi%2Fgiphy.gif&f=1&nofb=1)

## Overview
In this lesson we'll be covering the lifecycle of React components. React components follow a very basic lifecycle starting with when they get mounted to the DOM or browser to when the component renders onto the screen. Components follow a strict set of rules or order of operations for how the mounting is done. We'll also learn how to use the hook useEffect and how to apply it to our apps to perform some really cool actions!

## Getting Started
- `fork` and `clone` to your machine
- `cd` into the directory
- `code .` to open in VSCode
- `npm i` to install our dependencies
- `npm start` to spin up our app

## React Component Lifecycle

These methods happen automatically (because we are extending the React.Component class which has them already defined). - but you can call them to modify them.

The lifecycle falls into three main pieces: When the component is being created (which is called **mounting**), when the component is being **updated**, and when the component is being removed from the DOM (which is called **unmounting**).

These methods are called at specific points in the rendering process. You can use these methods to perform actions based on what's happening on the DOM.

- `componentDidMount`, for example, is called immediately _after_ a component is rendered to the DOM.

## The React Component Lifecycle

React components follow a very basic lifecycle starting with when they get `mounted` to the DOM or browser to when the component `renders` onto the screen. Components follow a strict set of rules or order of operations for how the mounting is done.

When using *class components*, the React library has built-in Lifecycle methods available to us.  These are special functions that give our components a specific set of instructions on what to do at a given time. Because we are using *functional components*, we'll need to use Hooks to do this. More on that later...

The lifecycle falls into three main pieces: When the component is being created (which is called **mounting**), when the component is being **updated**, and when the component is being removed from the DOM (which is called **unmounting**).

Lifecycle events fall into three broad categories:

- **Initializing / Mounting** e.g. What happens when the component is created and inserted into the DOM? Was an initial state set?

- **Updating** e.g. Did an event happen that changed the state? What happens when a component is being re-rendered?

- **Unmounting** e.g. What happens when the component is destroyed?

Now, let's keep these in mind as we delve into the world of **useEffect**. It should help us understand what's going on under the hood as we see it in action.

## What is useEffect?

![Dunno](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2FbkKvvzE9PEcTK%2Fgiphy.gif&f=1&nofb=1)

The `useEffect` hook was introduced with the React Hooks API and ***replaces*** the following class component lifecycle methods, `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`. The new term for this is "effect".

The syntax is quite different from the original lifecycle methods. For example:

```js
useEffect(() => {
  doSomething() // Function executing on mount

  return () => {
    
    cleanUpSomething() // Cleanup function
  }
}, [observable]) // Something we want to observe
```

The `doSomething` function runs every time a re-render is triggered, either by a *state update* or by the value of the *observable changing*.

The `cleanUpSomething` function runs when the component unmounts from the virtual DOM.

The "observable" is something we want to keep track of, typically some sort of state or prop. Whenever the value changes it triggers the `useEffect` hook and re-renders the virtual DOM tree.

![PEZ](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2FKPdzGp8a20QbC%2Fgiphy.gif&f=1&nofb=1)

## Mounting a Component

Let's import `useEffect` at the top of `components/Counter.jsx`...

```jsx
import { useState, useEffect } from 'react'
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
      {count === 10 ? <Surprise /> : 
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
      </div>
      }
      <div>
        <button style={{ fontSize: '4rem' }} onClick={() => updateCount(0)}>
          RESET
        </button>
      </div>
    </div>
  )
}

export default Counter
```

![Bye](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi2.wp.com%2Fgifrific.com%2Fwp-content%2Fuploads%2F2012%2F07%2FJerry-Seinfeld-No-Thanks-and-Leave.gif%3Fresize%3D236%252C177%26ssl%3D1&f=1&nofb=1)

Wait, come back! Next, let's set up our effect:

```jsx
import { useState, useEffect } from 'react'
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
      <div style={{height: '100vh'}}>
      {count === 10 ? <Surprise /> : 
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
      </div>
      }
      <div>
        <button style={{ fontSize: '4rem' }} onClick={() => updateCount(0)}>
          RESET
        </button>
      </div>
    </div>
  )
}

export default Counter
```

Open your browser console and refresh the page, you should see `Mounted` printed to the console. This is the equivalent of `componentDidMount`.  Now click the button a few times and notice that the page doesn't re-render again. Our useEffect fired *on mount*...

![Relief](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2F3o7TKuylrX8kT7XhVS%2Fgiphy.gif&f=1&nofb=1)

## Working With Observables/Dependencies

With `useEffect`, the second argument it receives is an array of "observables" or "dependencies" to watch. React keeps track of any state, props, or functions that are provided and re-renders the virtual DOM if a there was a change to the state or props, and if a function was invoked.

Let's add `count` (from our useState) to the dependency array:

```jsx
import { useState, useEffect } from 'react'
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
      <div style={{height: '100vh'}}>
      {count === 10 ? <Surprise /> : 
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
      </div>
      }
      <div>
        <button style={{ fontSize: '4rem' }} onClick={() => updateCount(0)}>
          RESET
        </button>
      </div>
    </div>
  )
}

export default Counter
```

Refresh your browsers and click the button **2** times. Now, every time the `count` state updates, a re-render occurs and our useEffect is fired. Notice how many times our 'mounted' console log goes off?

This is exactly how `componentDidUpdate` works.

![Stop the Show!](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2FRGXKL7Meb3YvS%2Fgiphy.gif&f=1&nofb=1)

# STOP HERE

## Cleanups

Reset your counters back to `0` using the reset button.
Click the button `20` times. You should see a new component being rendered on the page and a new message printed to the console.

Now click the **Reset** button.

You should see `Unmounted => Clean up any side effects` printed to the console.

The `return ()=>{}` runs a function to `clean up` side effects of our component. This is really useful for clearing timers or terminating realtime connections.

An example would be in a chat application, when a user logs on, the connection gets established to a server. The server opens a live connection to the specific client, like text messages. Every time a message is sent or received it's all happening in real-time. Ideally, we would prefer that the connection gets terminated when a user signs out or closes their browser. That's where the "clean up" portion of `useEffect` comes in.

![Poppy](https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fi.imgur.com%2FpimZzX6.gif&f=1&nofb=1)

## Lesson Recap
In this lesson, we got to see how `useEffect` works in React.  We put it into action and observed how it watches and waits for a particular effect to take place.  We also saw how the cleanup portion unmounts the virtual DOM for us.

## Resources
- [Component Lifecycle Docs](https://reactjs.org/docs/react-component.html)
- [Component Lifecycle Cheatsheet](https://dev.to/bunlong/react-component-lifecycle-methods-cheatsheet-23gi)
- [More On React Component Lifecycle](https://medium.com/react-ecosystem/react-components-lifecycle-ce09239010df)
- [useEffect](https://reactjs.org/docs/hooks-effect.html)
- [Do the Opposite](https://youtu.be/1Y_6fZGSOQI)
- [If You Use One Resource From This Lesson, Let It Be This One...](https://youtu.be/dQw4w9WgXcQ)
