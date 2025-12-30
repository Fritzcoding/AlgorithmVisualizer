import { CustomInput } from '@/components/custom-input';
import { Button } from '@/components/ui/button';
import { Component } from 'react';


class EntryPoint extends Component {
    state = {
        error: false
    }
    render() {
        return (
            <div className='flex flex-col items-center space-y-4'>
                <div className="w-full flex justify-center">
                    <CustomInput
                        title="Upper Number"
                        defaultValue={this.props.upper}
                        type={"number"}
                        onChange={this.setData}
                        placeholder="Enter value..."
                        centerLabel={true}
                        titleSize={'text-lg'}
                    />
                </div>
                <h1 className='text-4xl text-black text-center font-normal'>
                    Guess a number between 0 and {this.props.upper}
                </h1>
                <Button
                    onClick={this.props.startGame}
                    className='bg-black text-white font-semibold px-10 py-4 rounded-md text-xl'
                >
                    Start the game
                </Button>
            </div>
        );
    }

    setData = (val) => {
        if (val === "") {
            val = 0;
        }
        this.props.setUpper(val);
    }
    getData = (e) => {
        if (e.target.value !== "") {
            console.log(e.target.value);
            this.props.setUpper(e.target.value);
        }
        else {
            this.props.setUpper(100)
        }
    }
    validateNumbers = () => {

    }
}

export default EntryPoint;