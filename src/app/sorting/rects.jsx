import React from 'react';
// Removed FlipMove to avoid UNSAFE lifecycle warnings in StrictMode
import Rect from "./rect";

const Rects = ({ rects, speed }) => {

    let margin = 5;
    if (rects.length > 50) {
        margin = 1;
    }
    return (
        <div>
                <div className="flex justify-center items-end">
                    {rects.map((rect, rectidx) => {
                        return (
                            <div key={rectidx}>
                                <Rect
                                    marg={margin}
                                    rect={rect}
                                />
                            </div>
                        );
                    })}
                </div>
        </div>
    );

}

export default Rects;