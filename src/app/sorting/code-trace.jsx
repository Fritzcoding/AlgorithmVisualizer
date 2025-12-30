import React from 'react';

const CodeTrace = ({ currentStep, currentStep2, totalSteps, algorithmCode, highlightedLines, algorithmCode2, highlightedLines2, isDual }) => {
  return (
    <div className="flex gap-4 p-4 overflow-auto max-h-96 w-full">
      {/* Primary Code Trace */}
      <div className="flex-1 min-w-80 code-panel-dark text-white p-4 space-y-4 border rounded-lg">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-cyan-400">Algorithm 1 - Code Trace</h3>
          <div className="text-sm text-gray-300">
            Step: <span className="text-yellow-400 font-bold">{currentStep}</span>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="text-xs text-gray-400 font-semibold">CODE:</div>
          <div className="bg-gray-800 p-3 rounded font-mono text-xs leading-relaxed max-h-64 overflow-y-auto">
            {algorithmCode.map((line, idx) => (
              <div
                key={idx}
                className={`${
                  highlightedLines.includes(idx)
                    ? 'bg-yellow-900 text-yellow-100'
                    : 'text-gray-300'
                } px-2 py-0.5 rounded transition-colors duration-200`}
              >
                <span className="text-gray-500 mr-2">{idx + 1}</span>
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dual Code Trace (if comparing two algorithms) */}
      {isDual && algorithmCode2 && (
        <div className="flex-1 min-w-80 code-panel-dark text-white p-4 space-y-4 border rounded-lg">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-cyan-400">Algorithm 2 - Code Trace</h3>
            <div className="text-sm text-gray-300">
              Step: <span className="text-yellow-400 font-bold">{currentStep2}</span>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="text-xs text-gray-400 font-semibold">CODE:</div>
            <div className="bg-gray-800 p-3 rounded font-mono text-xs leading-relaxed max-h-64 overflow-y-auto">
              {algorithmCode2.map((line, idx) => (
                <div
                  key={idx}
                  className={`${
                    highlightedLines2.includes(idx)
                      ? 'bg-yellow-900 text-yellow-100'
                      : 'text-gray-300'
                  } px-2 py-0.5 rounded transition-colors duration-200`}
                >
                  <span className="text-gray-500 mr-2">{idx + 1}</span>
                  {line}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeTrace;
