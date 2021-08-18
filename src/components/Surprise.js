import React, { useEffect } from 'react'

const Surprise = () => {
  useEffect(() => {
    console.log('Mounted the surprise')
    return () => {
      console.log('Unmounted => Clean up any side effects')
    }
  }, [])

  return (
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  )
}

export default Surprise
