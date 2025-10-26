import { useEffect, useRef } from 'react'

const Starfield = () => {
  const starsContainerRef = useRef(null)

  useEffect(() => {
    const starsContainer = starsContainerRef.current
    if (!starsContainer) return

    const numStars = 150
    const stars = []

    // Create stars
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div')
      star.className = 'star'
      const size = Math.random() * 2 + 1
      star.style.width = `${size}px`
      star.style.height = `${size}px`
      star.style.top = `${Math.random() * 100}%`
      star.style.left = `${Math.random() * 100}%`
      star.style.animationDelay = `${Math.random() * 5}s`
      star.style.animationDuration = `${Math.random() * 5 + 3}s`
      starsContainer.appendChild(star)
      stars.push(star)
    }

    // Parallax effect
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      starsContainer.style.transform = `translateY(${scrolled * 0.25}px)`
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      // Clean up stars
      stars.forEach(star => {
        if (star.parentNode) {
          star.parentNode.removeChild(star)
        }
      })
    }
  }, [])

  return (
    <div 
      ref={starsContainerRef}
      className="absolute inset-0 z-0" 
      id="stars-container"
    />
  )
}

export default Starfield

