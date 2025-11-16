// Construct API URL - if VITE_API_URL is set, use it; otherwise default to localhost
const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl) {
    // If URL doesn't end with /api, append it
    return envUrl.endsWith('/api') ? envUrl : `${envUrl}/api`;
  }
  return 'http://localhost:5000/api';
};

const API_BASE_URL = getApiBaseUrl();

class BioSyncAPI {
  async healthCheck() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return await response.json();
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  }

  async getAvailableDrugs(searchQuery = '') {
    try {
      const url = searchQuery 
        ? `${API_BASE_URL}/drugs?search=${encodeURIComponent(searchQuery)}`
        : `${API_BASE_URL}/drugs`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch drugs:', error);
      throw error;
    }
  }

  async predictAdverseReaction(dnaSequence, drug) {
    try {
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dna_sequence: dnaSequence,
          drug: drug
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Prediction failed:', error);
      throw error;
    }
  }

  async simulateMultipleDrugs(dnaSequence, drugs) {
    try {
      const response = await fetch(`${API_BASE_URL}/simulate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dna_sequence: dnaSequence,
          drugs: drugs
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Simulation failed:', error);
      throw error;
    }
  }

  async getStatistics() {
    try {
      const response = await fetch(`${API_BASE_URL}/stats`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch statistics:', error);
      throw error;
    }
  }
}

export default new BioSyncAPI();
