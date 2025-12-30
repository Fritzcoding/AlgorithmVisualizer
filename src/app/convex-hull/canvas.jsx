import { convex_hull } from "@/lib/algorithms/grahamScan";
import React, { Component } from 'react';

class Canvas extends Component {
    state = {
        dots: [],
        lines: [],
        canvasWidth: 300,
        canvasHeight: 100
    }
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.canvasLineRef = React.createRef();
    }
    componentDidMount() {
        this.redrawDots();
        this.setState({ canvasWidth: this.props.width });
        this.setState({ canvasHeight: this.props.height });
        // console.log(this.state.canvasWidth);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.dots !== prevProps.dots) {
            this.setState({ dots: this.props.dots });
            this.redrawDots();
        }
        if (this.props.onGoing !== prevProps.onGoing) {
            if (this.props.onGoing === true) {
                this.animateLine();
            }
        }
    }

    render() {
        return (
            <>
                <canvas
                    className='absolute'
                    id='canvas1'
                    // style={{backgroundColor:"whitesmoke"}}
                    ref={this.canvasLineRef} width={this.props.width} height={this.props.height}
                />
                <canvas
                    className='absolute'
                    id='canvas2'
                    // style={{backgroundColor:"grey"}}
                    ref={this.myRef} width={this.props.width} height={this.props.height}
                />

            </>
        );
    }

    redrawDots() {
        const canvas = this.myRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'lightgrey';
        ctx.strokeStyle = 'black';
        for (let i = 0; i < this.props.dots.length; i++) {
            ctx.beginPath();
            // ctx.moveTo(this.props.dots[i].xx, this.props.dots[i].yy)
            ctx.arc(this.props.dots[i].xx, this.props.dots[i].yy, 10, 0, 2 * Math.PI);
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.closePath();

        }
        ctx.closePath();
        const res = convex_hull(this.props.dots);

        const cansvas2 = this.canvasLineRef.current;
        const ctx2 = cansvas2.getContext('2d');
        ctx2.clearRect(0, 0, canvas.width, canvas.height);
        // store both the sequence of lines (operations) and the final hull pairs
        this.setState({ lines: res[1], hullPairs: res[0] });

    }

    animateLine = async () => {
        const { lines } = this.state;
        const canvas2 = this.canvasLineRef.current;
        const ctx2 = canvas2.getContext('2d');
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        // Use glowing cyan for connecting lines
        ctx2.fillStyle = '#ffffff';
        ctx2.strokeStyle = '#00FFFF';
        // build a fast lookup of final hull edges (pairs) so we can color them differently
        const hull = this.state.hullPairs || [];
        const hullEdgeSet = new Set();
        for (let j = 0; j < hull.length; j++) {
            const a = hull[j];
            const b = hull[(j + 1) % hull.length];
            if (a && b) {
                const key1 = `${a.xx},${a.yy}|${b.xx},${b.yy}`;
                const key2 = `${b.xx},${b.yy}|${a.xx},${a.yy}`;
                hullEdgeSet.add(key1);
                hullEdgeSet.add(key2);
            }
        }

        for (let i = 0; i < lines.length; i++) {
            if (!this.props.onGoing) {
                ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
                return;
            }
            ctx2.beginPath();
            // determine whether this edge is part of the final hull
            const edgeKey = `${lines[i].from.xx},${lines[i].from.yy}|${lines[i].to.xx},${lines[i].to.yy}`;
            const isHullEdge = hullEdgeSet.has(edgeKey);

            if (lines[i].add) {
                ctx2.beginPath();
                ctx2.lineWidth = 2;
                ctx2.fillStyle = 'black';
                ctx2.moveTo(lines[i].from.xx, lines[i].from.yy)
                ctx2.arc(lines[i].from.xx, lines[i].from.yy, 14, 0, 2 * Math.PI);
                ctx2.fill();
                ctx2.closePath();

                ctx2.beginPath();
                ctx2.fillStyle = 'red';
                ctx2.moveTo(lines[i].to.xx, lines[i].to.yy)
                ctx2.arc(lines[i].to.xx, lines[i].to.yy, 14, 0, 2 * Math.PI);
                ctx2.fill();
                ctx2.closePath();

                // hull edges should be glowing blue; inner connecting edges should be light gray glow
                if (isHullEdge) {
                    ctx2.beginPath();
                    ctx2.lineWidth = 3;
                    ctx2.strokeStyle = '#00f7ef';
                    ctx2.shadowColor = 'rgba(0,247,239,0.9)';
                    ctx2.shadowBlur = 12;
                } else {
                    ctx2.beginPath();
                    ctx2.lineWidth = 2.5;
                    ctx2.strokeStyle = '#d1d5db'; // light gray
                    ctx2.shadowColor = 'rgba(210,213,219,0.9)';
                    ctx2.shadowBlur = 10;
                }
            } else {
                ctx2.beginPath();
                ctx2.fillStyle = 'whitesmoke';
                ctx2.moveTo(lines[i].from.xx, lines[i].from.yy)
                ctx2.arc(lines[i].from.xx, lines[i].from.yy, 15, 0, 2 * Math.PI);
                ctx2.fill();
                ctx2.closePath();

                ctx2.beginPath();
                ctx2.fillStyle = 'whitesmoke';
                ctx2.moveTo(lines[i].to.xx, lines[i].to.yy)
                ctx2.arc(lines[i].to.xx, lines[i].to.yy, 15, 0, 2 * Math.PI);
                ctx2.fill();
                ctx2.closePath();

                // also respect whether this edge belongs to the outer hull
                if (isHullEdge) {
                    ctx2.lineWidth = 3;
                    ctx2.strokeStyle = '#00f7ef';
                    ctx2.shadowColor = 'rgba(0,200,220,0.8)';
                    ctx2.shadowBlur = 10;
                } else {
                    ctx2.lineWidth = 2.5;
                    ctx2.strokeStyle = '#d1d5db';
                    ctx2.shadowColor = 'rgba(200,200,200,0.8)';
                    ctx2.shadowBlur = 8;
                }
            }

            ctx2.moveTo(lines[i].from.xx, lines[i].from.yy);
            ctx2.lineTo(lines[i].to.xx, lines[i].to.yy);
            ctx2.stroke();
            // reset shadow to avoid affecting other drawings
            ctx2.shadowBlur = 0;
            ctx2.shadowColor = 'transparent';
            ctx2.closePath();
            if (i === lines.length - 1) {
                this.props.onTurnOff();
            }
            await sleep(this.props.speed);
        }
    }

}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export default Canvas;