"use client";
import React, { Component } from 'react';
import EntryPoint from "./entryPoint";
import Search from "./search";
import Navbar from '@/components/navbar';
import StreakBadge from '@/components/streak-badge';
import { PresetSelector } from '@/components/preset-selector';

class BinarySearch extends Component {
    state = {
        upper: 100,
        lower: 0,
        max: 100,
        isRunning: false,
        determined: false
    }
    render() {
        return (
            <div className="algo-page-wrapper min-h-screen">
                <Navbar title={"Binary Search"} />
                <div className="flex items-center justify-center min-h-[68vh] px-4">
                    {!this.state.isRunning && (
                        <div className="max-w-4xl w-full mx-auto text-xl">
                            <div className="bg-white rounded-lg p-16 shadow-md space-y-6">
                                <PresetSelector 
                                    algorithmName="binary-search"
                                    onPresetSelect={this.handlePresetSelect}
                                    className="mb-2"
                                />
                                <EntryPoint
                                    startGame={this.handleStartGame}
                                    upper={this.state.upper}
                                    setUpper={this.handleSetUpper}
                                />
                            </div>
                        </div>
                    )}
                    {this.state.isRunning &&
                        <Search
                            yesButton={this.handleYes}
                            noButton={this.handleNo}
                            upper={this.state.upper}
                            lower={this.state.lower}
                            max={this.state.max}
                            onRestart={this.handleRestart}
                            determined={this.state.determined}
                        />
                    }
                </div>
            </div>
        );
    }
    
    handlePresetSelect = (preset) => {
        if (!preset) return;
        const up = parseInt(preset.upper, 10) || 100;
        const low = parseInt(preset.lower, 10) || 0;
        const mx = parseInt(preset.max, 10) || up;
        this.setState({
            upper: up,
            lower: low,
            max: mx
        });
    }
    
    handleStartGame = () => {
        this.setState({ isRunning: true, determined: false });
    }
    handleRestart = () => {
        // Reset to default bounds when user restarts the game
        this.setState({ isRunning: false, upper: 100, lower: 0, max: 100, determined: false });
    }
    handleYes = () => {
        this.setState((state) => {
            if (state.lower >= state.upper) return null;
            const mid = Math.floor((state.upper + state.lower) / 2);
            const size = state.upper - state.lower + 1;
            // If only two numbers remain, answering determines the value immediately
            if (size === 2) {
                // mid will be equal to lower; if user says Yes, pick upper
                return { lower: state.upper, upper: state.upper, determined: true };
            }
            // If three numbers remain and user answers Yes to "Is your number greater than mid?",
            // the only possibility is the upper value — resolve immediately.
            if (size === 3) {
                return { lower: state.upper, upper: state.upper, determined: true };
            }
            const newLower = mid + 1;
            const newUpper = state.upper;
            if (newLower > newUpper) {
                return { lower: mid, upper: mid, determined: true };
            }
            const determined = newLower === newUpper;
            return { lower: newLower, determined };
        });
    }
    handleNo = () => {
        this.setState((state) => {
            if (state.lower >= state.upper) return null;
            const mid = Math.floor((state.upper + state.lower) / 2);
            const size = state.upper - state.lower + 1;
            // If only two numbers remain, answering determines the value immediately
            if (size === 2) {
                // mid will be equal to lower; if user says No, pick lower
                return { lower: state.lower, upper: state.lower, determined: true };
            }
            // If three numbers remain and user answers No to "Is your number greater than mid?",
            // user chooses "not greater than mid" — resolve to the lower value as final per spec.
            if (size === 3) {
                return { lower: state.lower, upper: state.lower, determined: true };
            }
            const newUpper = mid; // standard behavior: include mid in upper when No
            const newLower = state.lower;
            if (newLower > newUpper) {
                return { lower: mid, upper: mid, determined: true };
            }
            const determined = newLower === newUpper;
            return { upper: newUpper, determined };
        });
    }
    handleSetUpper = (up) => {
        let val = parseInt(up);
        if (val <= 0) {
            val = 100;
        }
        this.setState({ upper: val, max: val, determined: false });
    }
}

export default BinarySearch;