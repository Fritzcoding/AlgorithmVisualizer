import React, { Component } from 'react';
import DualHandleSlider from './custom-dual-slider';
import { Button } from '@/components/ui/button';

class SearchVisualization extends Component {
    render() {
        const { upper, lower, max } = this.props;
        // Standard binary-search invariant: compute mid only while lower < upper
        const isDetermined = (this.props.determined === true) || (lower === upper);
        const mid = lower < upper ? Math.floor((upper + lower) / 2) : null;
        // final guess will be the current lower when the algorithm concludes
        const finalGuess = lower;
        
        // Create array of numbers from 0 to max
        const numbers = Array.from({ length: max + 1 }, (_, i) => i);
        
        return (
            <div className="w-full bg-gradient-to-b from-gray-50 to-gray-100 p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Binary Search Visualization</h3>
                
                {/* Search Range Display */}
                <div className="mb-8">
                    <div className="text-sm text-gray-600 mb-2">Search Range: {lower} to {upper}</div>
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-semibold text-green-600">Lower: {lower}</span>
                        <span className="text-sm font-semibold text-blue-600">Mid: {isDetermined ? '-' : mid}</span>
                        <span className="text-sm font-semibold text-red-600">Upper: {upper}</span>
                    </div>
                </div>

                {/* Number Line Visualization */}
                <div className="mb-8 overflow-x-auto">
                    <div className="inline-flex gap-1 p-4 bg-white rounded border border-gray-300 whitespace-nowrap">
                        {numbers.map((num) => (
                            <div key={num} className="flex flex-col items-center">
                                <div
                                    className={`
                                        w-8 h-12 flex items-center justify-center rounded font-bold text-sm
                                        transition-all duration-300
                                        ${(!isDetermined && num === mid)
                                            ? 'bg-blue-500 text-white scale-110'
                                            : num < lower || num > upper
                                            ? 'bg-gray-300 text-gray-500'
                                            : (!isDetermined && num < mid)
                                            ? 'bg-green-200 text-green-800'
                                            : 'bg-red-200 text-red-800'
                                        }
                                    `}
                                >
                                    {num}
                                </div>
                                {!isDetermined && num === mid && (
                                    <div className="bg-blue-500 text-white text-xs font-bold rounded-full px-2 py-1 shadow-md whitespace-nowrap mt-2">Current Guess: {mid}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Algorithm Info */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-green-50 p-4 rounded border border-green-200">
                        <div className="text-xs text-gray-600 mb-1">ACTIVE RANGE</div>
                        <div className="text-2xl font-bold text-green-600">{upper - lower + 1}</div>
                        <div className="text-xs text-gray-500">elements</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded border border-blue-200">
                        <div className="text-xs text-gray-600 mb-1">CURRENT GUESS</div>
                        <div className="text-2xl font-bold text-blue-600">{isDetermined ? '-' : mid}</div>
                        <div className="text-xs text-gray-500">mid value</div>
                    </div>
                </div>

                {/* Code Trace */}
                <div className="bg-gray-900 text-white p-4 rounded font-mono text-xs">
                    <div className="text-cyan-400 font-bold mb-2">Algorithm:</div>
                    <div className="space-y-1 text-gray-300">
                        <div>1. mid = floor((lower + upper) / 2)</div>
                        <div className="text-yellow-300">   → mid = floor(({lower} + {upper}) / 2) = {mid}</div>
                            <div className="mt-2">2. If target &gt; mid:</div>
                            <div className="text-gray-500">   lower = mid + 1</div>
                            <div className="mt-2">3. If target &lt;= mid:</div>
                            <div className="text-gray-500">   upper = mid</div>
                            <div className="mt-2">4. Repeat until lower == upper</div>
                    </div>
                </div>

                {/* Statistics */}
                <div className="mt-6 p-4 bg-gray-100 rounded">
                    <div className="text-sm text-gray-700">
                        <span className="font-semibold">Complexity:</span> O(log n) 
                        <span className="ml-6 font-semibold">Estimated steps:</span> {Math.ceil(Math.log2(max))}
                    </div>
                </div>

                {/* Controls moved under Statistics as requested (smaller card) */}
                <div className="mt-4 p-4 bg-white rounded shadow-sm max-w-md mx-auto text-center">
                    <div className="mb-3">
                        <DualHandleSlider upper={upper} lower={lower} max={max} />
                    </div>
                    { (lower < upper) && (
                        <div>
                            <div className="text-md font-semibold mb-3">Is your number greater than {mid}?</div>
                            <div className="flex justify-center">
                                <Button onClick={this.props.yesButton} className="bg-black text-white px-4 py-2 rounded-md font-semibold mx-2">Yes</Button>
                                <Button onClick={this.props.onRestart} className="bg-black text-white px-4 py-2 rounded-md font-semibold mx-2">Restart</Button>
                                <Button onClick={this.props.noButton} className="bg-black text-white px-4 py-2 rounded-md font-semibold mx-2">No</Button>
                            </div>
                        </div>
                    )}
                    { isDetermined && (
                        <div className="mt-4">
                            <div className="text-md font-semibold mb-4">Your number is {finalGuess}</div>
                            <div className="flex justify-center">
                                <Button onClick={this.props.onRestart} className="bg-black text-white px-6 py-2 rounded-md font-semibold">Restart</Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default SearchVisualization;
