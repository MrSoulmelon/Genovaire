import { useState, useEffect, useRef } from 'react'
import BioSyncAPI from '../services/api'

const Simulation = () => {
    const [dnaSequence, setDnaSequence] = useState('')
    const [selectedDrug, setSelectedDrug] = useState('')
    const [availableDrugs, setAvailableDrugs] = useState([])
    const [filteredDrugs, setFilteredDrugs] = useState([])
    const [drugSearchQuery, setDrugSearchQuery] = useState('')
    const [prediction, setPrediction] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [simulationMode, setSimulationMode] = useState('single') // 'single' or 'multiple'
    const [selectedDrugs, setSelectedDrugs] = useState([])
    const [simulationResults, setSimulationResults] = useState([])
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [analysisProgress, setAnalysisProgress] = useState(0)
    const [showSequenceVisualizer, setShowSequenceVisualizer] = useState(false)
    const sequenceRef = useRef(null)
    const progressIntervalRef = useRef(null)

    useEffect(() => {
        loadDrugs()
    }, [])

    useEffect(() => {
        if (drugSearchQuery) {
            searchDrugs(drugSearchQuery)
        } else {
            setFilteredDrugs(availableDrugs)
        }
    }, [drugSearchQuery, availableDrugs])

    // Cleanup progress interval on unmount
    useEffect(() => {
        return () => {
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current)
            }
        }
    }, [])

    const loadDrugs = async() => {
        try {
            const response = await BioSyncAPI.getAvailableDrugs()
            setAvailableDrugs(response.drugs)
            setFilteredDrugs(response.drugs)
        } catch (err) {
            setError('Failed to load available drugs')
        }
    }

    const searchDrugs = async(query) => {
        try {
            const response = await BioSyncAPI.getAvailableDrugs(query)
            setFilteredDrugs(response.drugs)
        } catch (err) {
            console.error('Search failed:', err)
            setFilteredDrugs(availableDrugs)
        }
    }

    const simulateProgress = () => {
        setAnalysisProgress(0)
        progressIntervalRef.current = setInterval(() => {
            setAnalysisProgress(prev => {
                if (prev >= 90) {
                    clearInterval(progressIntervalRef.current)
                    return 90
                }
                return prev + Math.random() * 15
            })
        }, 200)
    }

    const handleSinglePrediction = async() => {
        if (!dnaSequence || !selectedDrug) {
            setError('Please enter both DNA sequence and select a drug')
            return
        }

        setLoading(true)
        setIsAnalyzing(true)
        setError('')
        setPrediction(null)
        simulateProgress()

        try {
            const result = await BioSyncAPI.predictAdverseReaction(dnaSequence, selectedDrug)
            setAnalysisProgress(100)
            setTimeout(() => {
            setPrediction(result)
                setIsAnalyzing(false)
            }, 500)
        } catch (err) {
            setError(err.message)
            setIsAnalyzing(false)
            clearInterval(progressIntervalRef.current)
        } finally {
            setLoading(false)
        }
    }

    const handleMultipleSimulation = async() => {
        if (!dnaSequence || selectedDrugs.length === 0) {
            setError('Please enter DNA sequence and select at least one drug')
            return
        }

        setLoading(true)
        setError('')
        setSimulationResults([])

        try {
            const result = await BioSyncAPI.simulateMultipleDrugs(dnaSequence, selectedDrugs)
            setSimulationResults(result.results)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const toggleDrugSelection = (drug) => {
        if (selectedDrugs.includes(drug)) {
            setSelectedDrugs(selectedDrugs.filter(d => d !== drug))
        } else {
            setSelectedDrugs([...selectedDrugs, drug])
        }
    }

    const validateDNASequence = (sequence) => {
        const validBases = ['A', 'T', 'G', 'C']
        return sequence.split('').every(base => validBases.includes(base.toUpperCase()))
    }

    const generateRandomSequence = (length = 100) => {
        const bases = ['A', 'T', 'G', 'C']
        return Array.from({ length }, () => bases[Math.floor(Math.random() * bases.length)]).join('')
    }

    const formatSequenceForDisplay = (sequence) => {
        return sequence.match(/.{1,10}/g)?.join(' ') || sequence
    }

    const getSequenceStats = (sequence) => {
        const stats = { A: 0, T: 0, G: 0, C: 0 }
        sequence.split('').forEach(base => {
            if (stats.hasOwnProperty(base.toUpperCase())) {
                stats[base.toUpperCase()]++
            }
        })
        return stats
    }



    const getRiskColor = (riskLevel) => {
        switch (riskLevel) {
            case 'Low':
                return 'text-green-400'
            case 'Medium':
                return 'text-yellow-400'
            case 'High':
                return 'text-red-400'
            default:
                return 'text-text-primary'
        }
    }

    const getRiskBgColor = (riskLevel) => {
        switch (riskLevel) {
            case 'Low':
                return 'bg-green-500/20 border-green-500/50'
            case 'Medium':
                return 'bg-yellow-500/20 border-yellow-500/50'
            case 'High':
                return 'bg-red-500/20 border-red-500/50'
            default:
                return 'bg-primary/20 border-primary/50'
        }
    }

    const sequenceStats = getSequenceStats(dnaSequence)
    const isValidSequence = dnaSequence.length > 0 && validateDNASequence(dnaSequence)

    return (
        <div className="container mx-auto px-6 py-16">
            <div className="max-w-6xl mx-auto">
                {/* Enhanced Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <h2 className="font-display text-4xl font-bold text-primary">
                            AI Drug Response Simulation
                        </h2>
                    </div>
                    <p className="text-center text-text-secondary mb-8 max-w-3xl mx-auto text-lg">
                        Enter a DNA sequence and select drugs to predict adverse reactions using our <span className="text-accent font-semibold">AI digital twin technology</span>.
                    </p>
                    
                </div>

                {/* Enhanced Mode Selection */}
                <div className="flex justify-center mb-8">
                    <div className="bg-background/50 rounded-lg p-1 border border-primary/20 backdrop-blur-sm">
                        <button 
                            onClick={() => setSimulationMode('single')}
                            className={`px-6 py-2 rounded-md transition-all duration-300 ${
                simulationMode === 'single' 
                                  ? 'bg-gradient-to-r from-primary to-accent text-background shadow-lg' 
                                  : 'text-text-primary hover:text-primary hover:bg-primary/10'
                            }`}
                        >
                            <span className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                </svg>
                                Single Drug Prediction
                            </span>
                        </button>
                    </div>
                </div>

                {/* Enhanced DNA Sequence Input */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <label className="block text-text-primary font-medium">
                            DNA Sequence (A, T, G, C only)
                        </label>
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${isValidSequence ? 'bg-green-400' : dnaSequence.length > 0 ? 'bg-red-400' : 'bg-gray-400'}`} />
                            <span className="text-xs text-text-secondary">
                                {isValidSequence ? 'Valid' : dnaSequence.length > 0 ? 'Invalid' : 'Empty'}
                            </span>
                        </div>
                    </div>
                    
                    <div className="relative">
                        <textarea 
                            ref={sequenceRef}
                            value={dnaSequence}
                            onChange={(e) => setDnaSequence(e.target.value.toUpperCase())}
                            placeholder="Enter DNA sequence (e.g., ATGCGATCG...)"
                            className={`w-full bg-background/50 border rounded-lg px-4 py-3 text-text-primary placeholder-text-secondary focus:outline-none transition-all duration-300 ${
                                isValidSequence 
                                    ? 'border-green-400/50 focus:border-green-400' 
                                    : dnaSequence.length > 0 
                                        ? 'border-red-400/50 focus:border-red-400'
                                        : 'border-primary/30 focus:border-primary'
                            }`}
                            rows={4}
                        />
                        
                        {/* Character count indicator */}
                        <div className="absolute top-2 right-2 text-xs text-text-secondary bg-background/80 px-2 py-1 rounded">
                            {dnaSequence.length} bases
                        </div>
                    </div>
                    
                    {/* Sequence Statistics */}
                    {dnaSequence.length > 0 && (
                        <div className="mt-4 grid grid-cols-4 gap-4">
                            {Object.entries(sequenceStats).map(([base, count]) => (
                                <div key={base} className="text-center p-3 bg-background/30 rounded-lg border border-primary/20">
                                    <div className="text-lg font-bold text-primary">{base}</div>
                                    <div className="text-sm text-text-secondary">{count}</div>
                                    <div className="text-xs text-text-secondary">
                                        {dnaSequence.length > 0 ? ((count / dnaSequence.length) * 100).toFixed(1) : 0}%
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </div>

                {/* Enhanced Drug Selection */}
                {simulationMode === 'single' && (
                    <div className="mb-8">
                        <label className="block text-text-primary font-medium mb-4">
                            Select Drug
                        </label>

                        {/* Enhanced Drug Search */}
                        <div className="mb-4">
                            <div className="relative">
                                <input 
                                    type="text"
                                    value={drugSearchQuery}
                                    onChange={(e) => setDrugSearchQuery(e.target.value)}
                                    placeholder="Search drugs... (e.g., 'amox', 'ibu', 'para')"
                                    className="w-full bg-background/50 border border-primary/30 rounded-lg px-4 py-3 pl-10 text-text-primary placeholder-text-secondary focus:border-primary focus:outline-none transition-all duration-300"
                                />
                                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                                <p className="text-sm text-text-secondary">
                                    {filteredDrugs.length} of {availableDrugs.length} drugs found
                                </p>
                                {drugSearchQuery && (
                                    <button 
                                        onClick={() => setDrugSearchQuery('')}
                                        className="text-xs text-accent hover:text-primary transition-colors"
                                    >
                                        Clear search
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Enhanced Drug Dropdown */}
                        <div className="relative">
                            <select 
                                value={selectedDrug}
                                onChange={(e) => setSelectedDrug(e.target.value)}
                                className="w-full bg-background/50 border border-primary/30 rounded-lg px-4 py-3 text-text-primary focus:border-primary focus:outline-none transition-all duration-300 appearance-none cursor-pointer"
                            >
                                <option value="">Choose a drug...</option>
                                {filteredDrugs.map((drug) => (
                                    <option key={drug} value={drug}>{drug}</option>
                                ))}
                            </select>
                            <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>

                        {filteredDrugs.length === 0 && drugSearchQuery && (
                            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                                <p className="text-red-400 text-sm">
                                    No drugs found matching "{drugSearchQuery}"
                                </p>
                            </div>
                        )}

                        {/* Enhanced Prediction Button */}
                        <button 
                            onClick={handleSinglePrediction}
                            disabled={loading || !isValidSequence || !selectedDrug}
                            className="group relative mt-6 mx-auto block px-8 py-2.5 bg-gradient-to-r from-primary via-accent to-secondary text-background font-medium rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(140,82,255,0.6)] overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {loading ? (
                                    <>
                                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Analyzing...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                        Predict Adverse Reaction
                                    </>
                                )}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-secondary via-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>
                    </div>
                )}

                {/* Enhanced Progress Indicator */}
                {isAnalyzing && (
                    <div className="mb-8 p-6 bg-background/30 rounded-lg border border-primary/20 backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-text-primary font-medium">AI Analysis in Progress</h3>
                            <span className="text-primary font-bold">{Math.round(analysisProgress)}%</span>
                        </div>
                        <div className="w-full bg-background/50 rounded-full h-3 mb-4">
                            <div 
                                className="bg-gradient-to-r from-primary via-accent to-secondary h-3 rounded-full transition-all duration-300 ease-out"
                                style={{ width: `${analysisProgress}%` }}
                            />
                        </div>
                        <div className="flex items-center gap-2 text-sm text-text-secondary">
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Processing DNA sequence and drug interaction patterns...
                        </div>
                    </div>
                )}

                {/* Enhanced Error Display */}
                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg backdrop-blur-sm">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-red-400 font-medium">Error</p>
                        </div>
                        <p className="text-red-300 mt-2">{error}</p>
                    </div>
                )}

                {/* Enhanced Prediction Results */}
                {prediction && simulationMode === 'single' && (
                    <div className="mb-8 p-6 bg-background/30 rounded-lg border border-primary/20 backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="font-display text-2xl font-bold text-primary">Prediction Results</h3>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                            {/* Risk Assessment Card */}
                            <div className="space-y-3">
                                <h4 className="font-medium text-text-primary flex items-center gap-2 text-sm">
                                    <svg className="w-3 h-3 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                    Risk Assessment
                                </h4>
                                
                                <div className={`p-4 rounded-lg border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${getRiskBgColor(prediction.prediction.risk_level)}`}>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="font-medium text-text-primary text-sm">Risk Level</span>
                                        <span className={`font-bold px-2 py-1 rounded-full text-xs ${getRiskColor(prediction.prediction.risk_level)}`}>
                                            {prediction.prediction.risk_level}
                                        </span>
                                    </div>
                                    
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-text-primary mb-1">
                                            {prediction.prediction.adverse_probability}%
                                        </div>
                                        <div className="text-xs text-text-secondary mb-3">
                                            Probability of adverse reaction
                                        </div>
                                        
                                        {/* Risk Level Indicator */}
                                        <div className="w-full bg-background/30 rounded-full h-1.5">
                                            <div 
                                                className={`h-1.5 rounded-full transition-all duration-1000 ${
                                                    prediction.prediction.risk_level === 'Low' ? 'bg-green-500' :
                                                    prediction.prediction.risk_level === 'Medium' ? 'bg-yellow-500' :
                                                    'bg-red-500'
                                                }`}
                                                style={{ 
                                                    width: `${prediction.prediction.adverse_probability}%` 
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Details Card */}
                            <div className="space-y-3">
                                <h4 className="font-medium text-text-primary flex items-center gap-2 text-sm">
                                    <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Analysis Details
                                </h4>
                                
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center p-2 bg-background/20 rounded-lg">
                                        <span className="text-text-secondary text-sm">Drug</span>
                                        <span className="text-text-primary font-medium text-sm">{prediction.input.drug}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-2 bg-background/20 rounded-lg">
                                        <span className="text-text-secondary text-sm">Sequence Length</span>
                                        <span className="text-text-primary font-medium text-sm">{prediction.input.sequence_length} bases</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-4 mt-6">
                            <button 
                                onClick={() => {
                                    setPrediction(null)
                                    setDnaSequence('')
                                    setSelectedDrug('')
                                }}
                                className="flex-1 px-4 py-2 bg-primary/20 border border-primary/50 text-primary rounded-lg hover:bg-primary/30 transition-all duration-300"
                            >
                                Run New Analysis
                            </button>
                            <button 
                                onClick={() => {
                                    const data = {
                                        drug: prediction.input.drug,
                                        sequence: dnaSequence,
                                        risk: prediction.prediction.risk_level,
                                        probability: prediction.prediction.adverse_probability
                                    }
                                    navigator.clipboard.writeText(JSON.stringify(data, null, 2))
                                }}
                                className="flex-1 px-4 py-2 bg-accent/20 border border-accent/50 text-accent rounded-lg hover:bg-accent/30 transition-all duration-300"
                            >
                                Copy Results
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
)
}

export default Simulation