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
      title="something"
      width="100%"
      height="100%"
      src="https://www.youtube.com/embed/oHg5SJYRHA0?rel=0;&autoplay=1&mute=0&loop=1"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  )
}

export default Surprise
