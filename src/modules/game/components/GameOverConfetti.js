import React from 'react';
import Confetti from 'react-confetti';

const GameOverConfetti = () => {
    return(
        <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={200}
            colors={['#FFEB3B']}
            drawShape={ctx => {
                ctx.beginPath();
                ctx.moveTo(12, 6);
                ctx.arc(6, 6, 6, 0, 2 * Math.PI);
                ctx.moveTo(46, 6);
                ctx.arc(40, 6, 6, 0, 2 * Math.PI);
                ctx.moveTo(0, 6);
                ctx.bezierCurveTo(6, 36, 46, 36, 46, 6);
                ctx.bezierCurveTo(46, 0, 34, -2, 34, 6);
                ctx.bezierCurveTo(34, 20, 12, 20, 12, 6);
                ctx.bezierCurveTo(12, 0, 0, 0, 0, 6);
                ctx.closePath();
                ctx.stroke();
            }}
            style={{zIndex: 200}}
        />
    )
};

export default GameOverConfetti;
