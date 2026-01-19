import React from 'react';
import ColorQuiz from './ColorQuiz';

// Wrapper to match the requested import name "ColorTestContainer"
// In a real implementation, this could contain additional layout or logic.
const ColorTestContainer = () => {
    return (
        <div className="w-full h-full">
            <ColorQuiz />
        </div>
    );
};

export default ColorTestContainer;
