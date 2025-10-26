const Applications = () => {
  const applicationCards = [
    {
      title: "Personalized Medicine",
      description: "Tailor treatments to individual patient profiles for optimal efficacy and minimal side effects.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYITBnqzZOxHXRmlzaAyEKfmXWejPv5iKRzp8bS0-CJIuLtgCCAU1q38zvU5gPsn6ary08wsJwpDSwkrp1LfwICOrrpHCHNf8CTDUmexDOB29JR8vZAc3r4FsOxAOzE_X3RGgg_oa4YgCBGjxtAurA5r0Sz6Ooiz7sLSo7CTaOkWqnvlayDx5wv6EPZ7LkcN7-BHcT0SLWt8re4T3wRjJLyHMS4BdA6hQMprkGQAB6lfj-wuZzw3E9STDkZtn0o0oS0gYsoCcYIqw",
      bgColor: "bg-primary/5",
      borderColor: "border-primary/20",
      hoverBorderColor: "hover:border-primary/50"
    },
    {
      title: "Drug Discovery",
      description: "Accelerate drug development by predicting clinical outcomes and identifying promising candidates.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBayitYMNo9jHHRE2bxBGhBV7jzmOh1zM4IgIKLz6KfR_InviNTN73qsMGou0tJKFY8tXNDXMUAOZ6Q0-9KhNRUY0kpeUMDvz_LXry3gR3xE4bsVyrpxGXVTDtgJl8n4yJJt17pRqYEUrhCA0h0C3XI6TFcNKIMEtCyvq1k7lc_GHscV9rzdhHi1__4ZvIu96dXgBfyYKo6d8tB1KVNcc_49Edi0ipyDF1YA1G4WMlkpIldqieDY6KJzyDSXBcKwhUyjC1QEpdwUjo",
      bgColor: "bg-accent/5",
      borderColor: "border-accent/20",
      hoverBorderColor: "hover:border-accent/50"
    },
    {
      title: "Clinical Trials",
      description: "Enhance clinical trial efficiency by selecting ideal participants and monitoring responses in real-time.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKOauwvFpkk57wwR90y_RFh62WN5HW2oKFcXQtlImVNdgDX5NA5h_Qe_S8hG-eRQdgeNzHkRGGlNTpGZbN3dqn3gSG9KALwFEt2SIa4hn-BEhI4YUSI4_yip4OnStCIZsX3h2m9QGdWmmizLDw77W-f6eIe3Ay31JxD5fTTZaqEyHPShVcONGniMId-SHDZ86HWflsWhRG0h-BpmYuswcAG6Ch_kOdfDSc8PVr4GnKi0CWOiAtmphTnRK0Ynttf6uA9bAbJXMt8NY",
      bgColor: "bg-secondary/5",
      borderColor: "border-secondary/20",
      hoverBorderColor: "hover:border-secondary/50"
    }
  ]

  return (
    <section className="py-20 sm:py-32 px-4 container mx-auto">
      <div className="max-w-5xl mx-auto grid gap-16">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-12 text-secondary">Applications</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {applicationCards.map((card, index) => (
              <div key={index} className={`${card.bgColor} border ${card.borderColor} p-8 rounded-lg backdrop-blur-sm ${card.hoverBorderColor} transition-all duration-300 transform hover:-translate-y-2`}>
                <div className="aspect-w-1 aspect-h-1 mb-6 rounded-lg overflow-hidden">
                  <img 
                    alt={card.title} 
                    className="w-full h-full object-cover" 
                    src={card.image}
                  />
                </div>
                <h3 className="font-display text-xl font-bold text-text-primary">{card.title}</h3>
                <p className="mt-2 text-text-secondary">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Applications

