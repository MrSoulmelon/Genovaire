const ApplicationsPage = () => {
  const useCases = [
    {
      title: "Oncology",
      description: "Chemotherapy Prediction",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCQBsS3T7IJ8nqyCqmzPx7P1EeXgrLcCEnZtqgwJkkbNl-P7Ypp2h3FJc86A3lat_o7ljKhCXRKohVbidbgT3jHytRq-JYxmA8la0MIroi0XufffBJXQrXeDU5qcuJofBK1EqHY3GjO_WBm0HlE97LedCpL_FcQxNV43LN9s-R5krjRYTYEUC9AHnax0SDztoZkuKtGFGMNoATk6Dtt7Y1mVEM3DVKPuVq6eLODFtoJcLTELcL5nRB0tyPjUKPdNPAlFAj2_ud4aY"
    },
    {
      title: "Hormone Therapy",
      description: "Personalized Regimens",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCnwJS8fX9kw8ywwezyQ-XE5VltuwfdKUgrft5m5v7j8ca3pcx145GTHZuwDzu8rsLEB-GrVNuovKPo2vU2taNNrC4-gGddOkyKI8JDZiLj-kS7fUz7dgMl1xi8DIoli5FBiIxfe2KTBF5n3_zDGZpQuh_bKpKpYiDclHrR40h-V35o8jGx5lEP7QWiDqcHc2poIeH2un1jrY-retButb25SNbVxr5VwhyGp8UXaAfgekpcxnw5ApdwjJrHCBMWNDcKQLb46Jees7s"
    },
    {
      title: "Autoimmune Conditions",
      description: "Targeted Immunomodulation",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDH9UJUlBq6IgtAjZSvGwbmtcPu8pq_G6mwloTuGqMj_y2QcTBTDfZxPx7e3x_DtWqgUX-VuYQjy0GbATSH-dGT1-paLKwHhj6gQBTDpQHylL7m_QugTjmYYEgp8uHaxnLaXngg9KM7Zve4XPLe60gX5TIZCIRngjClrCHWM4LySB1spCsHq4W26my-KcPZcC_eRX3vzqkZ8bV8V0gv68AXOdhwOoZxhjJ_4uvgg3ik1f8PH4FUvd6QZCZE50mNb8N7yuUK_N8uyuA"
    }
  ]

  const beneficiaries = [
    {
      title: "Patients",
      description: "Receive optimized, personalized treatment plans with higher efficacy and fewer side effects.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdUFmIslkwWnleVGOmQ8H6MBJiEELFsVfFonaV6ZqV2gMbh_7_aTU8PMDt17kCx2DuD5VB2SXoejIiHIZ9vV80_Xkdd1EiV6-eoYt_Ci7Vs6e9KMM2JWkJSN-wwhZlxEHqS2xvsraDxXj__mo1oloxfz0mw6TokdjkovejyeCXyoeakKPwWOorDcpauTRkas5T-dD-Tj6MAQ2lRIAmlk2Jj7hSONUHAjTI0ICsmSB4KNKmCdhmRdmbC5iVsVxMUlakMrtkfUGaNmo",
      shadowColor: "shadow-primary-glow"
    },
    {
      title: "Clinicians",
      description: "Make data-driven decisions with unprecedented predictive accuracy, improving patient outcomes.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDk_yr-aVzBARgdksTZc71K1gKaTCnAMBnjO3XhxHx_6S9mrU-mFmgV2NcF4m-IiWRF5Z7Q-eh3nklVaDeKNdOXCymV4Pxcy5q_TQhjteY-6CLbCLqvcgKNBI8tXIbzOFlx-UuWp26kfRTBfMXqxLjnHx-uL6T4b54kJHWGO-FF45O4qevSzCHxBLU9WyJ4_aZxdVp6Y9KItKyFxSqGOVnlZr43udUNUNH_B0Ped0TL38cuoqM5y19Papc7X2whN4AdZLXfnrrQZ4o",
      shadowColor: "shadow-accent"
    },
    {
      title: "Researchers",
      description: "Accelerate drug discovery and development by simulating trials and identifying novel biomarkers.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9Tah9_sDkVMv4n_wkgXDiujwLU8QnRZ00TmHkS8crAJLxUteUhxAw4Ueu6bSP5UvUSle0Ju7z03LlkPO-sAatk4jImaSMhtz6DJCnBYPHd4-dQter2UrcPzAzp1wSpFPltx3ihgy68XeodpfNF4nfXgx1n6BHCDJsStZLHk54uP_61bQCJKLmplSwGzknCcaUEDGWTwOZTKqrVAlBvXqMnIe-cWE0Qdzu1qTk8HMzIUmK8-vKA-upxCZ2TAsed3ChZcyNkVIrpac",
      shadowColor: "shadow-secondary"
    }
  ]

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <div className="absolute inset-0 z-[-1] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
      <div className="absolute inset-0 z-[-2] bg-gradient-to-br from-[#060910] via-[#100a1c] to-[#060910]"></div>
      
      <main className="container mx-auto px-10 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-orbitron text-5xl font-black tracking-tighter text-text drop-shadow-[0_0_10px_var(--tw-shadow-color)] shadow-primary-glow/50">
            Applications
          </h2>
          <p className="mt-4 text-lg text-text/70">
            Explore the diverse applications of BioSync's AI-driven digital twin technology across various therapeutic areas.
          </p>
        </div>
        
        <section className="mt-20">
          <h3 className="font-orbitron text-3xl font-bold text-text mb-8 text-center drop-shadow-[0_0_8px_var(--tw-shadow-color)] shadow-accent/50">
            Use Cases
          </h3>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {useCases.map((useCase, index) => (
              <div key={index} className="group relative rounded-xl glassmorphism dna-hover-effect">
                <div 
                  className="absolute inset-0 rounded-xl bg-cover bg-center opacity-40 transition-opacity duration-500 group-hover:opacity-60" 
                  style={{ backgroundImage: `url("${useCase.image}")` }}
                ></div>
                <div className="relative flex h-64 flex-col justify-end rounded-xl bg-gradient-to-t from-background via-background/50 to-transparent p-6">
                  <h4 className="font-orbitron text-xl font-bold text-text">{useCase.title}</h4>
                  <p className="text-text/80">{useCase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <section className="mt-24">
          <h3 className="font-orbitron text-3xl font-bold text-text mb-8 text-center drop-shadow-[0_0_8px_var(--tw-shadow-color)] shadow-secondary/50">
            Who Benefits
          </h3>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {beneficiaries.map((beneficiary, index) => (
              <div key={index} className="group relative flex flex-col items-center gap-4 rounded-xl p-6 text-center">
                <div className="relative h-48 w-48">
                  <img 
                    alt={`Glowing silhouette of a ${beneficiary.title.toLowerCase()}`}
                    className={`h-full w-full object-contain transition-all duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_var(--tw-shadow-color)] ${beneficiary.shadowColor}`}
                    src={beneficiary.image}
                  />
                </div>
                <h4 className="font-orbitron text-xl font-bold text-text">{beneficiary.title}</h4>
                <p className="text-text/70">{beneficiary.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default ApplicationsPage

