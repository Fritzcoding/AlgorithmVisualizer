"use client";

import Navbar from '@/components/navbar';
import { seive } from "@/lib/algorithms/prime";
import { Component } from 'react';
import Cells from "./cells";
import Menu from "./menu";

class Seive extends Component {
    state = {
        number: 100,
        cells: [],
        isRunning: false,
        speed: 500,
        sliderValue: 10,
        primes: [],
        maxPrime: 0
    }

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const cells = getCells(this.state.number);
        this.setState({ cells });
    }

    render() {
        return (
            <div className="flex flex-col h-screen algo-page-wrapper">
                <Navbar title="Sieve" />
                <div className="flex flex-1 overflow-hidden algo-content-panel">

                    <div className="flex flex-col">
                        <Menu
                        onChangeSpeed={this.changeSpeed}
                        onChangeValues={this.handleValueIncease}
                        onVisualize={this.startAlgo}
                        onReset={this.handleReset}
                        isDisabled={this.state.isRunning}
                        onPresetSelect={this.handlePresetSelect}
                        numberValue={this.state.number}
                        speedValue={this.state.sliderValue}
                    />
                    </div>
                    <div className="flex flex-1 flex-col overflow-auto">
                        <Cells
                            num={this.state.number}
                            cells={this.state.cells}
                        />
                    </div>
                </div>
            </div>
        );
    }

    changeSpeed = (speed) => {
        //console.log(typeof speed);
        this.setState({ speed: 600 - speed * 10, sliderValue: speed });
    }
    handleValueIncease = (value) => {
        this.setState({ number: value });
        if (this.state.algo === 0) {
            this.setState({ cells: getCells(value), isRunning: false });

        }
        // console.log(value);
    }
    handleRefresh = () => {
        this.setState({ cells: getCells(this.state.number), isRunning: false });
    }

    handleReset = () => {
        // Reset to defaults
        const defaultNumber = 100;
        this.setState({ number: defaultNumber, cells: getCells(defaultNumber), isRunning: false, speed: 500 });
    }

    handlePresetSelect = (preset) => {
        if (!preset) return;
        if (preset.limit) {
            this.setState({ number: preset.limit, cells: getCells(preset.limit), isRunning: false });
        }
        if (typeof preset.speedSlider !== 'undefined') {
            this.changeSpeed(preset.speedSlider);
        }
    }

    startAlgo = () => {
        this.startSeive();
    }
    startSeive = async () => {
        const speed = this.state.speed;
        this.setState({ isRunning: true });
        const prime = [];
        for (let i = 0; i <= this.state.number; i++) {
            prime.push(1);
        }
        prime[0] = prime[1] = 0;
        let changedCells = this.state.cells;
        let prevCheck = -1;
        let counter = 0;
        for (let i = 2; i <= this.state.number; i++) {
            if (prime[i] === 1) {
                //   setTimeout(()=>{
                changedCells = getNewCellPrimeToggled(changedCells, i - 1);
                this.setState({ cells: changedCells });
                //},counter*speed);
                await sleep(this.state.speed);
                counter++;
                for (let j = i * i; j <= this.state.number; j += i) {
                    //setTimeout(()=>{
                    if (prevCheck != -1) {
                        changedCells = getNewCellVisitingToggled(changedCells, prevCheck);
                    }
                    prevCheck = j - 1;
                    changedCells = getNewCellCheckToggled(changedCells, j - 1);
                    changedCells = getNewCellVisitingToggled(changedCells, prevCheck);
                    this.setState({ cells: changedCells });
                    //  },counter*speed);
                    await sleep(this.state.speed);
                    counter++;
                    prime[j] = 0;
                }
            }
        }
        //  setTimeout(()=>{
        changedCells = getNewCellVisitingToggled(changedCells, prevCheck);
        this.setState({ cells: changedCells, isRunning: false });
        // },counter*speed);
    }
}

const getNewCellPrimeToggled = (cells, pos) => {
    const newCells = cells.slice();
    const cell = newCells[pos];
    const newCell = {
        ...cell,
        isPrime: true
    }
    newCells[pos] = newCell;
    return newCells;
}

const getNewCellVisitingToggled = (cells, pos) => {
    const newCells = cells.slice();
    const cell = newCells[pos];
    const newCell = {
        ...cell,
        isVisiting: !cell.isVisiting
    }
    newCells[pos] = newCell;
    return newCells;
}

const getNewCellCheckToggled = (cells, pos) => {
    const newCells = cells.slice();
    const cell = newCells[pos];
    const newCell = {
        ...cell,
        isChecking: true
    }
    newCells[pos] = newCell;
    return newCells;
}

const getCells = (rows) => {
    const cells = [];
    for (let cell = 1; cell <= rows; cell++) {
        cells.push(createCell(cell))
    }
    return cells;
}
const createCell = (val) => {
    return {
        val,
        isChecking: false,
        isVisiting: false,
        isPrime: false
    };
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export default Seive;