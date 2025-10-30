const Technology = () => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <div className="absolute inset-0 z-[-1] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
      <div className="absolute inset-0 z-[-2] bg-gradient-to-br from-background via-[#0a0c1a] to-[#1a142a]"></div>
      
      <main className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <div className="mb-12">
              <h1 className="text-5xl md:text-6xl font-display font-bold mb-4 tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary-glow animate-pulse">
                Our Technology
              </h1>
              <p className="text-lg text-text/80 max-w-3xl">
                Genovaire's AI-powered digital twins revolutionize drug response prediction, offering personalized treatment insights and accelerating medical advancements through a fusion of genomic data and predictive simulation.
              </p>
            </div>
            <div className="relative w-full h-[500px] rounded-xl overflow-hidden glassmorphism shadow-glow">
              <div 
                className="absolute inset-0 bg-center bg-no-repeat bg-cover" 
                style={{
                  backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBLHPLClo6RgxmC6Sf4s6Z46F8DyyoHR-SXCo5bDw2TWE_jbMtLIww-KsT99zC3YWMC3q62wvj1KFuYT2pNjYy8Aapyu_BU5mneA3_LSy8QWAHlQ8MudifzKApwdBdCQpfM9vNoDvgItL11J60S023ukOUZnHtpzXpiMSqT6F3_jJbDqx1lNl1nbJ1HFjKrlOo8RVqQTrTeoEUIohwx9HtkUC8FScRCX05FbtlLhJrcFsBhDvTfFrZkt71p6Zub14cWM-_6h06g4k8")',
                  filter: 'brightness(0.8)'
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 p-4">
                <h3 className="text-2xl font-display text-white">Interactive Digital Twin</h3>
                <p className="text-text/70 text-sm">Rotate and explore the data nodes</p>
              </div>
            </div>
          </div>
          
          <aside className="lg:col-span-2 space-y-8">
            <div className="glassmorphism p-6 rounded-lg border border-primary-glow/20 transition-all duration-300 hover:border-accent hover:shadow-glow">
              <h2 className="text-2xl font-display font-bold mb-3 text-accent">The Science</h2>
              <p className="text-text/80 mb-4">
                Our technology is built on a foundation of cutting-edge science, combining genomic data analysis, advanced AI modeling, and a sophisticated simulation pipeline.
              </p>
              <div className="space-y-3 text-sm">
                <p><strong className="font-semibold text-primary-glow">Genomic Data:</strong> Leveraging vast datasets for unprecedented accuracy.</p>
                <p><strong className="font-semibold text-primary-glow">AI Model:</strong> Personalized digital twins simulating drug interactions.</p>
                <p><strong className="font-semibold text-primary-glow">Simulation Pipeline:</strong> Predicting efficacy and side effects pre-treatment.</p>
              </div>
            </div>
            
            <div className="glassmorphism p-6 rounded-lg border border-primary-glow/20 transition-all duration-300 hover:border-accent hover:shadow-glow">
              <h3 className="text-xl font-display font-bold mb-2 text-accent">AI Twin Visualization</h3>
              <p className="text-text/80">
                Visualize the AI twin as a dynamic representation of a patient's response, with pulsating neuron networks and interactive data nodes.
              </p>
            </div>
            
            <div className="glassmorphism p-6 rounded-lg border border-primary-glow/20 transition-all duration-300 hover:border-accent hover:shadow-glow">
              <h3 className="text-xl font-display font-bold mb-2 text-accent">Ethical & Safe AI</h3>
              <p className="text-text/80">
                We are committed to the ethical and safe use of AI in medicine, ensuring patient privacy and data security while advancing healthcare responsibly.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}

export default Technology

