import { useState, useEffect } from 'react'
import BioSyncAPI from '../services/api'

const Statistics = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadStatistics()
  }, [])

  const loadStatistics = async () => {
    try {
      const response = await BioSyncAPI.getStatistics()
      setStats(response.statistics)
    } catch (err) {
      setError('Failed to load statistics')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-16">
        <div className="text-center text-text-secondary">Loading statistics...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-16">
        <div className="text-center text-red-400">{error}</div>
      </div>
    )
  }

  if (!stats) {
    return null
  }

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-4xl font-bold text-center mb-4 text-primary">
          Model Statistics
        </h2>
        <p className="text-center text-text-secondary mb-12 max-w-3xl mx-auto">
          Insights into our AI model's training data and performance metrics.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 bg-background/30 rounded-lg border border-primary/20 text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {stats.total_samples.toLocaleString()}
            </div>
            <div className="text-text-secondary">Total Samples</div>
          </div>
          
          <div className="p-6 bg-background/30 rounded-lg border border-accent/20 text-center">
            <div className="text-3xl font-bold text-accent mb-2">
              {stats.total_drugs}
            </div>
            <div className="text-text-secondary">Available Drugs</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="p-6 bg-background/30 rounded-lg border border-primary/20">
            <h3 className="font-display text-xl font-bold text-primary mb-4">
              Dataset Overview
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Average Sequence Length</span>
                <span className="text-text-primary font-medium">
                  {stats.avg_sequence_length} bases
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Model Type</span>
                <span className="text-text-primary font-medium">Random Forest</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Features Used</span>
                <span className="text-text-primary font-medium">DNA k-mers + Drug encoding</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-background/30 rounded-lg border border-accent/20">
            <h3 className="font-display text-xl font-bold text-accent mb-4">
              Available Drugs
            </h3>
            <div className="space-y-2">
              {Object.entries(stats.drug_distribution)
                .sort(([,a], [,b]) => b - a)
                .map(([drug, count]) => (
                  <div key={drug} className="flex justify-between items-center p-2 hover:bg-accent/10 rounded transition-colors">
                    <span className="text-text-primary text-sm font-medium">{drug}</span>
                    <span className="text-accent font-bold">{count} samples</span>
                  </div>
                ))}
            </div>
            <div className="text-xs text-text-secondary mt-4 p-2 bg-background/50 rounded">
              <strong>Total:</strong> {Object.keys(stats.drug_distribution).length} unique drugs available for prediction
            </div>
          </div>
        </div>

        <div className="mt-12 p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
          <h3 className="font-display text-xl font-bold text-primary mb-4">
            How It Works
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-medium text-text-primary mb-2">1. DNA Analysis</h4>
              <p className="text-text-secondary">
                DNA sequences are converted into k-mers (3-base sequences) and vectorized for machine learning.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-text-primary mb-2">2. Drug Encoding</h4>
              <p className="text-text-secondary">
                Drug names are encoded as numerical features to train the model on drug-DNA interactions.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-text-primary mb-2">3. AI Prediction</h4>
              <p className="text-text-secondary">
                A Random Forest classifier predicts adverse reaction probability based on combined features.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statistics
