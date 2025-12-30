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
        isRunning: false
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
        this.setState({ isRunning: true });
    }
    handleRestart = () => {
        // Reset to default bounds when user restarts the game
        this.setState({ isRunning: false, upper: 100, lower: 0, max: 100 });
    }
    handleYes = () => {
        this.setState((state) => {
            // ignore if already determined
            if (state.lower >= state.upper) return null;
            const mid = Math.floor((state.upper + state.lower) / 2);
            return { lower: mid + 1 };
        });
    }
    handleNo = () => {
        this.setState((state) => {
            // ignore if already determined
            if (state.lower >= state.upper) return null;
            const mid = Math.floor((state.upper + state.lower) / 2);
            return { upper: mid };
        });
    }
    handleSetUpper = (up) => {
        let val = parseInt(up);
        if (val <= 0) {
            val = 100;
        }
        this.setState({ upper: val, max: val });
    }
}

export default BinarySearch;