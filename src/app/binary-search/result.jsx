import { Button } from '@/components/ui/button';
import React, { Component } from 'react';
class Result extends Component {
    render() {
        return (
            <div className='w-full'>
                <div className='bg-white rounded-lg p-6 shadow-md text-black text-center'>
                    <div className='text-4xl font-extrabold mb-4'>Your number is {this.props.res}</div>
                    <div className='flex justify-center'>
                        <Button
                            onClick={this.props.onRestart}
                            className='bg-black text-white px-6 py-2 rounded-md font-semibold'
                        >
                            Restart
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Result;