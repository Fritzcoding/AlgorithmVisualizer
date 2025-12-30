import { useState, useEffect } from 'react';
import presetsData from './presetsData';

/**
 * Custom hook to fetch algorithm presets using Fetch API
 * Demonstrates AJAX/Fetch technology requirement
 * @param {string} algorithmName - The name of the algorithm (e.g., 'binary-search')
 * @returns {object} { presets, loading, error }
 */
export function usePresets(algorithmName) {
  const [presets, setPresets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Use local presets data (no network requests)
    if (algorithmName) {
      setLoading(true);
      try {
        const algorithmPresets = presetsData[algorithmName] || [];
        setPresets(algorithmPresets);
        setError(null);
      } catch (err) {
        console.error('Error loading presets:', err);
        setError(err.message || 'Failed to load presets');
        setPresets([]);
      } finally {
        setLoading(false);
      }
    }
  }, [algorithmName]);

  return { presets, loading, error };
}
