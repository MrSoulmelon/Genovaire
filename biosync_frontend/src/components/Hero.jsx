import { useState, useEffect, useRef } from 'react'

const Hero = ({ onNavigate }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const heroRef = useRef(null)
  const particlesRef = useRef([])

  useEffect(() => {
    setIsLoaded(true)
    
    // Create floating particles
    const createParticles = () => {
      const container = heroRef.current
      if (!container) return

      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div')
        particle.className = 'floating-particle'
        particle.style.position = 'absolute'
        particle.style.width = `${Math.random() * 4 + 2}px`
        particle.style.height = particle.style.width
        particle.style.background = `hsl(${Math.random() * 60 + 260}, 70%, 60%)`
        particle.style.borderRadius = '50%'
        particle.style.opacity = Math.random() * 0.6 + 0.2
        particle.style.left = `${Math.random() * 100}%`
        particle.style.top = `${Math.random() * 100}%`
        particle.style.animationDelay = `${Math.random() * 5}s`
        particle.style.animationDuration = `${Math.random() * 10 + 5}s`
        
        container.appendChild(particle)
        particlesRef.current.push(particle)
      }
    }

    createParticles()

    // Mouse tracking for interactive effects
    const handleMouseMove = (e) => {
      const rect = heroRef.current?.getBoundingClientRect()
      if (rect) {
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      particlesRef.current.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle)
        }
      })
    }
  }, [])

  return (
    <section 
      ref={heroRef}
      className="relative flex items-center justify-center text-center min-h-screen px-4 py-20 overflow-hidden"
    >
      {/* Dynamic background gradients */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full transition-all duration-1000"
          style={{
            background: `
              radial-gradient(ellipse at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
                rgba(140, 82, 255, 0.3) 0%, 
                rgba(0, 229, 255, 0.1) 30%, 
                transparent 70%),
              radial-gradient(ellipse at ${(1 - mousePosition.x) * 100}% ${(1 - mousePosition.y) * 100}%, 
                rgba(255, 79, 195, 0.2) 0%, 
                transparent 50%)
            `
          }}
        />
        
        {/* Animated DNA helix */}
        <div className="absolute inset-0 opacity-10">
          <div className="dna-helix-animation">
            <svg viewBox="0 0 200 400" className="w-full h-full">
              <path
                d="M50 0 Q100 50 50 100 Q0 150 50 200 Q100 250 50 300 Q0 350 50 400"
                stroke="url(#dnaGradient1)"
                strokeWidth="2"
                fill="none"
                className="animate-pulse"
              />
              <path
                d="M150 0 Q100 50 150 100 Q200 150 150 200 Q100 250 150 300 Q200 350 150 400"
                stroke="url(#dnaGradient2)"
                strokeWidth="2"
                fill="none"
                className="animate-pulse"
                style={{ animationDelay: '1s' }}
              />
              <defs>
                <linearGradient id="dnaGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8C52FF" />
                  <stop offset="50%" stopColor="#00E5FF" />
                  <stop offset="100%" stopColor="#FF4FC3" />
                </linearGradient>
                <linearGradient id="dnaGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FF4FC3" />
                  <stop offset="50%" stopColor="#00E5FF" />
                  <stop offset="100%" stopColor="#8C52FF" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Animated title with staggered reveal */}
        <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-text-primary leading-tight">
            <span className="inline-block hover:scale-105 transition-transform duration-300">Reprogramming</span>{' '}
            <span className="inline-block hover:scale-105 transition-transform duration-300" style={{ animationDelay: '0.1s' }}>Medicine</span>
            <br/>
            Through <span className="text-primary bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-pulse">AI Twins.</span>
          </h1>
        </div>

        {/* Animated subtitle */}
        <div className={`transform transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-text-secondary">
            BioSync creates <span className="text-accent font-semibold">digital replicas</span> of patients to predict drug responses with <span className="text-primary font-semibold">unprecedented precision</span>.
          </p>
        </div>

        {/* Interactive buttons with enhanced animations */}
        <div className={`mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 transform transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <button 
            onClick={() => onNavigate('technology')}
            className="group relative w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary via-accent to-secondary text-background font-medium rounded-full text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(140,82,255,0.6)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-5 h-5 transition-transform group-hover:rotate-12" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
              </svg>
              Explore Project
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-secondary via-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          
          <button 
            onClick={() => onNavigate('simulation')}
            className="group relative w-full sm:w-auto flex items-center justify-center px-8 py-4 border-2 border-primary/50 text-text-primary font-medium rounded-full text-lg transition-all duration-300 hover:border-primary hover:bg-primary/10 hover:scale-105 hover:shadow-[0_0_20px_rgba(140,82,255,0.4)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Try Simulation
            </span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>

        {/* Interactive stats preview */}
        <div className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 transform transition-all duration-1000 delay-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="group text-center p-6 rounded-xl bg-background/20 backdrop-blur-sm border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-105">
            <div className="text-3xl font-bold text-primary group-hover:text-accent transition-colors duration-300">95%</div>
            <div className="text-sm text-text-secondary mt-2">Prediction Accuracy</div>
          </div>
          <div className="group text-center p-6 rounded-xl bg-background/20 backdrop-blur-sm border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-105">
            <div className="text-3xl font-bold text-accent group-hover:text-secondary transition-colors duration-300">10x</div>
            <div className="text-sm text-text-secondary mt-2">Faster Discovery</div>
          </div>
          <div className="group text-center p-6 rounded-xl bg-background/20 backdrop-blur-sm border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-105">
            <div className="text-3xl font-bold text-secondary group-hover:text-primary transition-colors duration-300">50%</div>
            <div className="text-sm text-text-secondary mt-2">Cost Reduction</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}

export default Hero
