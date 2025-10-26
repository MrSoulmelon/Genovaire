import { useState, useEffect, useRef } from 'react'

const Innovation = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
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

  const features = [
    {
      icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
      title: 'AI Digital Twins',
      description: 'Create precise digital replicas of patients using advanced machine learning algorithms',
      benefits: ['95% Accuracy', 'Real-time Analysis', 'Personalized Models']
    },
    {
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      title: 'Predictive Modeling',
      description: 'Simulate drug interactions and predict adverse reactions before clinical trials',
      benefits: ['Risk Assessment', 'Dose Optimization', 'Safety Prediction']
    },
    {
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      title: 'Accelerated Discovery',
      description: 'Reduce drug development time and costs through virtual testing and optimization',
      benefits: ['10x Faster', '50% Cost Reduction', 'Higher Success Rate']
    }
  ]

  return (
    <section ref={sectionRef} className="py-20 sm:py-32 px-4 container mx-auto">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-accent">Our Innovation</h2>
          </div>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            BioSync leverages advanced AI and machine learning to create digital twins of patients. These twins simulate drug responses with <span className="text-accent font-semibold">unprecedented accuracy</span>, enabling personalized treatment plans and accelerating drug discovery.
          </p>
        </div>

        {/* Interactive Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative p-6 bg-background/30 rounded-xl border border-accent/20 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:border-accent/50 hover:shadow-[0_0_25px_rgba(0,229,255,0.3)] cursor-pointer transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              } ${activeFeature === index ? 'ring-2 ring-accent/50' : ''}`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onClick={() => setActiveFeature(index)}
              onMouseEnter={() => setActiveFeature(index)}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 rounded-xl transition-opacity duration-300 ${
                activeFeature === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`} />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-300 ${
                  activeFeature === index ? 'bg-gradient-to-r from-accent to-primary scale-110' : 'bg-accent/20 group-hover:bg-accent/30'
                }`}>
                  <svg className="w-8 h-8 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-text-secondary leading-relaxed mb-4">
                  {feature.description}
                </p>

                {/* Benefits */}
                <div className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        activeFeature === index ? 'bg-accent' : 'bg-primary/50'
                      }`} />
                      <span className="text-sm text-text-secondary">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Active indicator */}
                <div className={`absolute top-4 right-4 w-3 h-3 rounded-full transition-all duration-300 ${
                  activeFeature === index ? 'bg-accent scale-150' : 'bg-accent/50'
                }`} />
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Process Flow */}
        <div className={`bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 rounded-2xl p-8 border border-primary/20 backdrop-blur-sm transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h3 className="text-2xl font-bold text-center text-text-primary mb-8">How It Works</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Data Collection', desc: 'Gather patient genetic and medical data' },
              { step: '02', title: 'AI Modeling', desc: 'Create digital twin using ML algorithms' },
              { step: '03', title: 'Simulation', desc: 'Test drug interactions virtually' },
              { step: '04', title: 'Prediction', desc: 'Generate personalized recommendations' }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-background font-bold text-lg">{item.step}</span>
                </div>
                <h4 className="font-semibold text-text-primary mb-2">{item.title}</h4>
                <p className="text-sm text-text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Innovation

