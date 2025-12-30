import { Button } from '@/components/ui/button';
import { Component } from 'react';
import DualHandleSlider from "./custom-dual-slider";
class Guess extends Component {
    render() {
        return (
            <div >
                <div className="w-full">
                    <div className="flex justify-center mb-4">
                        <DualHandleSlider
                            upper={this.props.upper}
                            lower={this.props.lower}
                            max={this.props.max}
                        />
                    </div>

                    <h2 className="text-xl text-black text-center mb-2">
                        Is your number greater than {this.getMid()}?
                    </h2>

                    <div className="flex justify-center mt-2">
                        <Button
                            onClick={this.props.yesButton}
                            variant="outline"
                            className="mx-2 text-black font-bold"
                        >Yes</Button>
                        <Button
                            onClick={this.props.noButton}
                            variant="outline"
                            className="mx-2 text-black font-bold"
                        >No</Button>
                    </div>
                </div>
            </div>
        );
    }
    getMid = () => {
        const mid = Math.floor((this.props.upper + this.props.lower) / 2);
        return mid;
    }
}

export default Guess;