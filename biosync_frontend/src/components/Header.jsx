import { useState, useEffect } from 'react'

const Header = ({ currentPage, setCurrentPage }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [hoveredItem, setHoveredItem] = useState(null)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleNavClick = (page) => {
        setCurrentPage(page)
        setIsMenuOpen(false)
        // Smooth scroll to top for better UX
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // Enhanced header styles with scroll detection
    const getHeaderStyle = () => {
        const baseStyle = "sticky top-0 z-50 transition-all duration-300"
        const scrolledStyle = isScrolled ? "bg-background/95 backdrop-blur-lg shadow-lg" : "bg-background/80 backdrop-blur-lg"
        
        switch (currentPage) {
            case 'technology':
                return `${baseStyle} ${scrolledStyle} border-b border-primary/20`
            case 'applications':
                return `${baseStyle} ${scrolledStyle} border-b border-primary/30`
            case 'simulation':
                return `${baseStyle} ${scrolledStyle} border-b border-accent/30`
            case 'statistics':
                return `${baseStyle} ${scrolledStyle} border-b border-secondary/30`
            default:
                return `${baseStyle} ${scrolledStyle} border-b border-primary/20`
        }
    }

    // Enhanced navigation items with icons
    const navItems = [
        { 
            name: 'The Problem', 
            page: 'home',
            icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z'
        },
        { 
            name: 'Innovation', 
            page: 'technology',
            icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
        },
        { 
            name: 'Applications', 
            page: 'applications',
            icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
        },
        { 
            name: 'Simulation', 
            page: 'simulation',
            icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
        },
        { 
            name: 'Statistics', 
            page: 'statistics',
            icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
        }
    ]

    const getButtonText = () => {
        switch (currentPage) {
            case 'technology':
                return 'Request Demo'
            case 'applications':
                return 'Get Started'
            case 'simulation':
                return 'Try Simulation'
            case 'statistics':
                return 'View Stats'
            default:
                return 'Get Started'
        }
    }

    const getButtonStyle = () => {
        const baseStyle = "hidden md:flex items-center justify-center px-6 py-2.5 font-medium rounded-full transition-all duration-300 hover:scale-105"
        
        switch (currentPage) {
            case 'technology':
                return `${baseStyle} bg-gradient-to-r from-primary to-accent text-background hover:shadow-[0_0_20px_rgba(140,82,255,0.6)]`
            case 'applications':
                return `${baseStyle} bg-gradient-to-r from-accent to-secondary text-background hover:shadow-[0_0_20px_rgba(0,229,255,0.6)]`
            case 'simulation':
                return `${baseStyle} bg-gradient-to-r from-secondary to-primary text-background hover:shadow-[0_0_20px_rgba(255,79,195,0.6)]`
            case 'statistics':
                return `${baseStyle} bg-gradient-to-r from-primary via-accent to-secondary text-background hover:shadow-[0_0_20px_rgba(140,82,255,0.6)]`
            default:
                return `${baseStyle} border border-primary text-primary hover:bg-primary hover:text-background hover:shadow-[0_0_15px_rgba(140,82,255,0.8)]`
        }
    }

    return (
        <header className={getHeaderStyle()}>
            <nav className={currentPage === 'home' ? "container mx-auto flex items-center justify-between px-6 py-4" : "flex items-center gap-4 w-full justify-between px-6 py-4"}>
                {/* Enhanced Logo */}
                <button 
                    onClick={() => handleNavClick('home')}
                    className="group flex items-center gap-3 transition-all duration-300 hover:scale-105"
                >
                    <div className="relative">
                        <svg className="h-8 w-8 text-primary transition-all duration-300 group-hover:text-accent" fill="none" viewBox="0 0 48 48">
                            <path clipRule="evenodd" d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z" fill="currentColor" fillRule="evenodd" />
                        </svg>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm" />
                    </div>
                    <h1 className="text-2xl font-display font-bold text-text-primary group-hover:text-primary transition-colors duration-300">
                        BioSync
                    </h1>
                </button>

                {/* Enhanced Desktop Navigation */}
                <div className="hidden md:flex items-center gap-2 font-body">
                    {navItems.map((item) => (
                        <button 
                            key={item.name}
                            onClick={() => handleNavClick(item.page)}
                            onMouseEnter={() => setHoveredItem(item.page)}
                            onMouseLeave={() => setHoveredItem(null)}
                            className={`group relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                                currentPage === item.page
                                    ? 'text-primary bg-primary/10'
                                    : 'text-text-primary hover:text-primary hover:bg-primary/5'
                            }`}
                        >
                            <svg className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                            </svg>
                            <span className="font-medium">{item.name}</span>
                            
                            {/* Active indicator */}
                            {currentPage === item.page && (
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                            )}
                            
                            {/* Hover indicator */}
                            {hoveredItem === item.page && currentPage !== item.page && (
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent rounded-full animate-pulse" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Enhanced Action Button */}
                <button className={getButtonStyle()}>
                    <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        {getButtonText()}
                    </span>
                </button>

                {/* Enhanced Mobile Menu Button */}
                <button 
                    className="md:hidden text-text-primary hover:text-primary transition-colors duration-300 p-2"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg className="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </nav>

            {/* Enhanced Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-background/95 backdrop-blur-lg border-t border-primary/20 animate-slideDown">
                    <div className="px-6 py-4 space-y-2">
                        {navItems.map((item) => (
                            <button 
                                key={item.name}
                                onClick={() => handleNavClick(item.page)}
                                className={`group flex items-center gap-3 w-full text-left p-3 rounded-lg transition-all duration-300 ${
                                    currentPage === item.page
                                        ? 'text-primary bg-primary/10'
                                        : 'text-text-primary hover:text-primary hover:bg-primary/5'
                                }`}
                            >
                                <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                </svg>
                                <span className="font-medium">{item.name}</span>
                                {currentPage === item.page && (
                                    <div className="ml-auto w-2 h-2 bg-primary rounded-full" />
                                )}
                            </button>
                        ))}
                        
                        <div className="pt-4 border-t border-primary/20">
                            <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-background rounded-lg hover:scale-105 transition-all duration-300">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                                {getButtonText()}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header