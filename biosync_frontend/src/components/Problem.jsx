import { useState, useEffect, useRef } from 'react'

const Problem = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const problems = [
    {
      icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      title: 'High Failure Rate',
      description: '90% of drugs fail in clinical trials due to unpredictable patient responses',
      stat: '90%',
      color: 'text-red-400'
    },
    {
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1',
      title: 'Massive Costs',
      description: 'Drug development costs exceed $2.6 billion per successful drug',
      stat: '$2.6B',
      color: 'text-yellow-400'
    },
    {
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      title: 'Slow Timeline',
      description: 'Average drug development takes 10-15 years from discovery to market',
      stat: '10-15y',
      color: 'text-blue-400'
    }
  ]

  return (
    <section ref={sectionRef} className="py-20 sm:py-32 px-4 container mx-auto" id="content">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary">The Problem</h2>
          </div>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Current drug development is slow, expensive, and often fails due to unpredictable patient responses. Traditional methods lack the precision needed to tailor treatments effectively, leading to suboptimal outcomes and increased healthcare costs.
          </p>
        </div>

        {/* Interactive Problem Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div
              key={index}
              className={`group relative p-6 bg-background/30 rounded-xl border border-primary/20 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:border-primary/50 hover:shadow-[0_0_25px_rgba(140,82,255,0.3)] cursor-pointer transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    hoveredCard === index ? 'bg-gradient-to-r from-primary to-accent scale-110' : 'bg-primary/20'
                  }`}>
                    <svg className="w-6 h-6 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={problem.icon} />
                    </svg>
                  </div>
                  <div className={`text-2xl font-bold ${problem.color} transition-all duration-300 ${
                    hoveredCard === index ? 'scale-110' : ''
                  }`}>
                    {problem.stat}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-text-primary mb-3 group-hover:text-primary transition-colors duration-300">
                  {problem.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {problem.description}
                </p>

                {/* Hover indicator */}
                <div className={`absolute bottom-4 right-4 w-2 h-2 rounded-full transition-all duration-300 ${
                  hoveredCard === index ? 'bg-accent scale-150' : 'bg-primary/50'
                }`} />
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className={`text-center mt-16 transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 rounded-full">
            <svg className="w-5 h-5 text-accent animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-text-primary font-medium">Ready for a solution?</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Problem

