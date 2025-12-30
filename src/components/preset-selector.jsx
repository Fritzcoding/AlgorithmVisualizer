import React from 'react';
import { usePresets } from '@/lib/hooks/usePresets';

/**
 * PresetSelector Component
 * Allows users to select from predefined algorithm presets
 * Fetches presets using Fetch API
 */
export function PresetSelector({ algorithmName, onPresetSelect, className = "" }) {
  const { presets, loading, error } = usePresets(algorithmName);

  if (loading) {
    return <div className={className}>Loading presets...</div>;
  }

  if (error) {
    console.error('Error loading presets:', error);
    return null; // Silently fail if presets don't load
  }

  if (presets.length === 0) {
    return null; // No presets available for this algorithm
  }

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      <div className="bg-white p-3 rounded-md shadow-sm">
        <label className="text-sm font-medium text-gray-700 block text-center mb-2">
          Quick Presets:
        </label>
        <div className="flex gap-3 flex-wrap justify-center">
          {presets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onPresetSelect(preset)}
              className="px-3 py-2 bg-black hover:opacity-90 text-white rounded-md transition-colors font-semibold text-sm"
              title={preset.description}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
