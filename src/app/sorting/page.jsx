"use client";
import React, { Component } from 'react';

import { quickSort } from "@/lib/algorithms/quickSort";
import { bubbleSort, insertionSort, selectionSort } from "@/lib/algorithms/sortingAlgorithms";
import Rects from "./rects";

import Navbar from '@/components/navbar';
import Menu from "./menu";
import CodeTrace from "./code-trace";

class Sort extends Component {
    state = {
        count: 20,
        rects: [],
        rects2: [],
        doubles: false,
        speed: 50,
        sliderValue: 50,
        isRunning: false,
        isRunning1: false,
        isRunning2: false,
        algo1: 0,
        algo2: 0,
        currentStep: 0,
        currentStep2: 0,
        highlightedLines: [],
        highlightedLines2: [],
        steps1: [],
        steps2: []
    }

    componentDidMount() {
        const rect = getInitialRects(this.state.count);
        const rect2 = rect.slice();
        this.setState({ rects: rect, rects2: rect2 });
    }

    render() {
        return (
            <div className="flex flex-col h-screen algo-page-wrapper">
                <Navbar title="Sorting Visualizer" />

                <div className="flex flex-1 overflow-hidden algo-content-panel">
                    <div className="flex flex-col">
                        <Menu
                            disable={this.state.isRunning}
                            onDoubleChange={this.handleDouble}
                            onViusalize={this.handleSort}
                            onRandomize={this.handleRandomize}
                            onRefresh={this.handleRefresh}
                            onCountChange={this.handleCountChange}
                            onAlgoChanged1={this.handleAlgoChanged1}
                            onAlgoChanged2={this.handleAlgoChanged2}
                            onSpeedChange={this.handleSpeedChanged}
                            onPresetSelect={this.handlePresetSelect}
                            countValue={this.state.count}
                            speedValue={this.state.sliderValue}
                        />
                    </div>
                    <div className="flex flex-1 flex-col items-center justify-center overflow-auto relative">
                        <Rects
                            speed={this.state.speed}
                            rects={this.state.rects}
                        />
                        {this.state.doubles && <hr style={{ width: "90%" }} />}
                        {this.state.doubles &&
                            <Rects
                                rects={this.state.rects2}
                            />}
                        <CodeTrace 
                            currentStep={this.state.currentStep}
                            currentStep2={this.state.currentStep2}
                            totalSteps={0}
                            algorithmCode={this.getAlgorithmCode()}
                            highlightedLines={this.state.highlightedLines}
                            algorithmCode2={this.state.doubles ? this.getAlgorithmCode2() : null}
                            highlightedLines2={this.state.highlightedLines2}
                            isDual={this.state.doubles}
                        />
                    </div>
                </div>
            </div>
        );
    }
    handleRandomize = () => {
        const rect = getInitialRects(this.state.count);
        const rect2 = rect.slice();
        this.setState({ rects: rect, rects2: rect2 });
    }
    handleRefresh = () => {
        const rects = this.state.rects;
        for (let i = 0; i < rects.length; i++) {
            const rect = { ...rects[i], isSorted: false, isSorting: false }
            rects[i] = rect;
        }
        const rects2 = rects.slice();
        this.setState({ rects, rects2 });
    }

    handleDouble = (val) => {
        this.setState({ doubles: val });
    }
    handleCountChange = (val) => {
        this.setState({ count: val });
        this.handleRandomize();
    }
    handleAlgoChanged1 = (val) => {
        this.setState({ algo1: val });
    }
    handleAlgoChanged2 = (val) => {
        this.setState({ algo2: val });
    }
    handleSpeedChanged = (val) => {
        const speed = (760 - val * 7.5);
        this.setState({ speed, sliderValue: val });
    }

    handlePresetSelect = (preset) => {
        if (!preset) return;
        if (preset.arraySize) {
            this.setState({ count: preset.arraySize }, () => this.handleRandomize());
        }
        if (typeof preset.speedSlider !== 'undefined') {
            // map speedSlider (0-100) to internal slider value expected by handleSpeedChanged
            this.handleSpeedChanged(preset.speedSlider);
        }
    }
    getAlgorithmCode = () => {
        const algorithms = {
            0: [ // Bubble Sort
                'for (let i = 0; i < arr.length; i++) {',
                '  for (let j = 0; j < arr.length - i - 1; j++) {',
                '    if (arr[j] > arr[j + 1]) {',
                '      [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]',
                '    }',
                '  }',
                '}'
            ],
            1: [ // Selection Sort
                'for (let i = 0; i < arr.length; i++) {',
                '  let minIdx = i;',
                '  for (let j = i + 1; j < arr.length; j++) {',
                '    if (arr[j] < arr[minIdx]) {',
                '      minIdx = j;',
                '    }',
                '  }',
                '  [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]',
                '}'
            ],
            2: [ // Insertion Sort
                'for (let i = 1; i < arr.length; i++) {',
                '  let key = arr[i];',
                '  let j = i - 1;',
                '  while (j >= 0 && arr[j] > key) {',
                '    arr[j + 1] = arr[j];',
                '    j--;',
                '  }',
                '  arr[j + 1] = key;',
                '}'
            ],
            3: [ // Quick Sort
                'function quickSort(arr, low, high) {',
                '  if (low < high) {',
                '    let pi = partition(arr, low, high);',
                '    quickSort(arr, low, pi - 1);',
                '    quickSort(arr, pi + 1, high);',
                '  }',
                '}'
            ]
        };
        return algorithms[this.state.algo1] || algorithms[0];
    }
    getAlgorithmCode2 = () => {
        const algorithms = {
            0: [ // Bubble Sort
                'for (let i = 0; i < arr.length; i++) {',
                '  for (let j = 0; j < arr.length - i - 1; j++) {',
                '    if (arr[j] > arr[j + 1]) {',
                '      [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]',
                '    }',
                '  }',
                '}'
            ],
            1: [ // Selection Sort
                'for (let i = 0; i < arr.length; i++) {',
                '  let minIdx = i;',
                '  for (let j = i + 1; j < arr.length; j++) {',
                '    if (arr[j] < arr[minIdx]) {',
                '      minIdx = j;',
                '    }',
                '  }',
                '  [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]',
                '}'
            ],
            2: [ // Insertion Sort
                'for (let i = 1; i < arr.length; i++) {',
                '  let key = arr[i];',
                '  let j = i - 1;',
                '  while (j >= 0 && arr[j] > key) {',
                '    arr[j + 1] = arr[j];',
                '    j--;',
                '  }',
                '  arr[j + 1] = key;',
                '}'
            ],
            3: [ // Quick Sort
                'function quickSort(arr, low, high) {',
                '  if (low < high) {',
                '    let pi = partition(arr, low, high);',
                '    quickSort(arr, low, pi - 1);',
                '    quickSort(arr, pi + 1, high);',
                '  }',
                '}'
            ]
        };
        return algorithms[this.state.algo2] || algorithms[0];
    }
    handleSort = () => {

        this.setState({ isRunning: true });
        let steps1;
        switch (this.state.algo1) {
            case 0:
                steps1 = bubbleSort(this.state.rects);
                break;
            case 1:
                steps1 = selectionSort(this.state.rects);
                break;
            case 2:
                steps1 = insertionSort(this.state.rects);
                break;
            case 3:
                steps1 = quickSort(this.state.rects2);
                console.log(steps1)
                break;
            default:
                steps1 = bubbleSort(this.state.rects);
                break;
        }
        let steps2;
        if (this.state.doubles) {

            switch (this.state.algo2) {
                case 0:
                    steps2 = bubbleSort(this.state.rects2);
                    break;
                case 1:
                    steps2 = selectionSort(this.state.rects2);
                    break;
                case 2:
                    steps2 = insertionSort(this.state.rects2);
                    break;
                case 3:
                    steps2 = quickSort(this.state.rects2);
                    break;
                default:
                    steps2 = bubbleSort(this.state.rects2);
                    break;
            }

        }
        this.setState({ steps1, steps2, currentStep: 0, currentStep2: 0 });
        this.handleFirst(steps1);
        if (this.state.doubles) this.handleSecond(steps2);
    }
    handleFirst = async (steps) => {
        // console.log("fsdfsdfsdfasdf");
        this.setState({ isRunning1: true });

        // const steps = bubbleSort(this.state.rects);
        //  console.log(steps.length);
        const prevRect = this.state.rects;
        for (let i = 0; i < steps.length; i++) {
            //   setTimeout(()=>{
            if (i !== 0) {
                prevRect[steps[i - 1].xx] = { ...prevRect[steps[i - 1].xx], isSorting: false };
                prevRect[steps[i - 1].yy] = { ...prevRect[steps[i - 1].yy], isSorting: false };
            }
            if (steps[i].xx === steps[i].yy) {
                prevRect[steps[i].xx] = { ...prevRect[steps[i].xx], isSorted: true, isSorting: false };
            } else if (steps[i].changed) {
                // Instead of swapping array positions, swap the height values so bars animate their sizes
                const idxA = steps[i].xx;
                const idxB = steps[i].yy;
                const heightA = prevRect[idxA].width;
                const heightB = prevRect[idxB].width;
                prevRect[idxA] = { ...prevRect[idxA], width: heightB, isSorting: true };
                prevRect[idxB] = { ...prevRect[idxB], width: heightA, isSorting: true };
            } else {
                prevRect[steps[i].xx] = { ...prevRect[steps[i].xx], isSorting: true };
                prevRect[steps[i].yy] = { ...prevRect[steps[i].yy], isSorting: true };
            }
            if (i === steps.length - 1) {
                this.setState({ isRunning1: false });
                if (this.state.isRunning2 === false) {
                    this.setState({ isRunning: false });
                }
            }
            // Update code trace
            this.setState({ 
                rects: prevRect,
                currentStep: i + 1,
                highlightedLines: this.getHighlightedLines(i, steps.length)
            });
            await sleep(this.state.speed);
            // },i*speed);
        }
    }
    getHighlightedLines = (currentStep, totalSteps) => {
        // Get the actual line number from the step data
        const steps = this.state.steps1;
        if (!steps || steps.length === 0 || currentStep >= steps.length) return [0];
        
        const step = steps[currentStep];
        if (step && step.lineNum !== undefined) {
            return [step.lineNum];
        }
        return [0];
    }
    getHighlightedLines2 = (currentStep, totalSteps) => {
        // Get the actual line number from the step data for second algorithm
        const steps = this.state.steps2;
        if (!steps || steps.length === 0 || currentStep >= steps.length) return [0];
        
        const step = steps[currentStep];
        if (step && step.lineNum !== undefined) {
            return [step.lineNum];
        }
        return [0];
    }
    handleSecond = async (steps) => {
        this.setState({ isRunning2: true });
        const prevRect = this.state.rects2;
        for (let i = 0; i < steps.length; i++) {
            //   setTimeout(()=>{
            if (i !== 0) {
                prevRect[steps[i - 1].xx] = { ...prevRect[steps[i - 1].xx], isSorting: false };
                prevRect[steps[i - 1].yy] = { ...prevRect[steps[i - 1].yy], isSorting: false };
            }
            if (steps[i].xx === steps[i].yy) {
                prevRect[steps[i].xx] = { ...prevRect[steps[i].xx], isSorted: true, isSorting: false };
            } else if (steps[i].changed) {
                const idxA = steps[i].xx;
                const idxB = steps[i].yy;
                const heightA = prevRect[idxA].width;
                const heightB = prevRect[idxB].width;
                prevRect[idxA] = { ...prevRect[idxA], width: heightB, isSorting: true };
                prevRect[idxB] = { ...prevRect[idxB], width: heightA, isSorting: true };
            } else {
                prevRect[steps[i].xx] = { ...prevRect[steps[i].xx], isSorting: true };
                prevRect[steps[i].yy] = { ...prevRect[steps[i].yy], isSorting: true };
            }
            if (i === steps.length - 1) {
                this.setState({ isRunning2: false });
                if (this.state.isRunning1 === false) {
                    this.setState({ isRunning: false });
                }
            }
            /* if( i === (steps.length)-2 ){
                 prevRect[steps[i].xx] = {...prevRect[steps[i].xx],isSorting:false,isSorted:true};
                 prevRect[steps[i].yy] = {...prevRect[steps[i].yy],isSorting:false,isSorted:true};
                 this.setState({isRunning2:false});
                 if( this.state.isRunning1 === false ){
                     this.setState({isRunning:false});
                 }
             }*/
            this.setState({ 
                rects2: prevRect,
                currentStep2: i + 1,
                highlightedLines2: this.getHighlightedLines2(i, steps.length)
            });
            await sleep(this.state.speed);
            // },i*speed);
        }
    }
    getHighlightedLines2 = (currentStep, totalSteps) => {
        // More intelligent line highlighting based on algorithm state for algo2
        const steps = this.state.steps2;
        if (!steps || steps.length === 0) return [0];
        // If steps carry explicit `lineNum` information, prefer that for accurate tracing
        const step = steps[currentStep];
        if (step && step.lineNum !== undefined) {
            return [step.lineNum];
        }

        const algo = this.state.algo2;
        if (algo === 0) { // Bubble Sort
            if (currentStep < steps.length / 2) return [0, 1, 2]; // Outer and inner loop check, comparison
            return [3, 4, 5]; // After comparison, closing braces
        } else if (algo === 1) { // Selection Sort
            if (currentStep < steps.length / 3) return [0, 1, 2]; // Outer loop, minIdx
            if (currentStep < (steps.length * 2) / 3) return [2, 3, 4]; // Inner loop, comparison
            return [7, 8]; // Swap section
        } else if (algo === 2) { // Insertion Sort
            if (currentStep < steps.length / 3) return [0, 1, 2]; // Outer loop, key assignment
            if (currentStep < (steps.length * 2) / 3) return [3, 4, 5]; // While loop condition and shift
            return [6]; // Insert key
        }
        return [0];
    }

}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const getInitialRects = (tot) => {
    const rects = [];
    for (let i = 0; i < tot; i++) {
        rects.push(getRect(i));
    }
    return rects;
}
const getRect = (kk) => {
    return {
        width: Math.floor(Math.random() * 200) + 50,
        isSorted: false,
        isSorting: false,
        kk: kk
    }
}
export default Sort;
