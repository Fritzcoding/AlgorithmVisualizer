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
                    title="Speed"
                    defaultValue={this.props.speedValue ?? 10}
                    min={10}
                    max={50}
                    step={1}
                    onChange={this.props.onChangeSpeed}
                />
                <CustomSlider
                    title="Total Number"
                    defaultValue={this.props.numberValue ?? 50}
                    min={10}
                    max={200}
                    step={1}
                    onChange={this.props.onChangeValues}
                    isDisabled={this.props.isDisabled}
                />
                <Button
                    className="w-full"
                    onClick={this.props.onRefresh}
                    disabled={this.props.isDisabled}
                    style={this.isClickable()}
                >
                    Refresh
                </Button>
                <Button
                    className="w-full"
                    onClick={this.props.onVisualize}
                    disabled={this.props.isDisabled}
                    style={this.isClickable()}
                >
                    Visualize Graham Scan
                </Button>

                <div>
                    <PresetSelector algorithmName="convex-hull" onPresetSelect={this.props.onPresetSelect} />
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