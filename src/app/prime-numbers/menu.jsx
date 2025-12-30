import { CustomSlider } from '@/components/custom-slider';
import { Button } from '@/components/ui/button';
import { Component } from 'react';
import { PresetSelector } from '@/components/preset-selector';

class Menu extends Component {
    render() {
        return (
            <div className="w-64 bg-white h-full p-4 space-y-6">
                <h2 className="text-lg font-semibold">Settings</h2>
                <CustomSlider
                    onChange={this.props.onChangeSpeed}
                    title="speed"
                    marks={false}
                    defaultValue={this.props.speedValue ?? 10}
                    step={1}
                    min={10}
                    max={50}
                    isDisabled={false}
                />
                <CustomSlider
                    onChange={this.props.onChangeValues}
                    title="Total Number"
                    marks={false}
                    defaultValue={this.props.numberValue ?? 100}
                    step={1}
                    min={10}
                    max={500}
                    isDisabled={this.props.isDisabled}
                />
                <Button
                    className="w-full"
                    onClick={this.props.onReset}
                    disabled={this.props.isDisabled}
                    style={this.isClickable()}
                >
                    Reset
                </Button>
                <Button
                    className="w-full"
                    onClick={this.props.onVisualize}
                    disabled={this.props.isDisabled}
                    style={this.isClickable()}>
                    Visualize
                </Button>

                <div>
                    <PresetSelector algorithmName="prime-numbers" onPresetSelect={this.props.onPresetSelect} />
                </div>

            </div>
        );
    }
    isClickable = () => {
        if (this.props.isDisabled) {
            return { cursor: "not-allowed" };
        } else {
            return {};
        }
    }
}

export default Menu;