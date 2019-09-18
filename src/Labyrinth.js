import React, { useState, useEffect } from 'react';

// const maxX = document.body.clientWidth;
// const maxY = document.body.clientHeight;

const boundary = (value, min, max) => {
    if (value < min) {
        return min;
    }
    if (value > max) {
        return max;
    }

    return value;
};

const getPositionFromAcceleration = (
    prevX,
    prevY,
    xAcceleration = 0,
    yAcceleration = 0,
    maxX,
    maxY,
) => {
    const nextX = prevX + xAcceleration;
    const nextY = prevY + yAcceleration;
    return {
        x: boundary(nextX, 0, maxX),
        y: boundary(nextY, 0, maxY),
    };
};

export default ({ xAcceleration, yAcceleration, width, height }) => {
    const [{ x, y }, setCoord] = useState({ x: width / 2, y: height / 2 });

    useEffect(() => {
        setCoord(getPositionFromAcceleration(x, y, xAcceleration, yAcceleration, width, height));
    }, [xAcceleration, yAcceleration]);

    return (
        <div style={{ width, height }}>
            <dl>
                <dt>xAcceleration</dt>
                <dd>{xAcceleration}</dd>
            </dl>
            <dl>
                <dt>yAcceleration</dt>
                <dd>{yAcceleration}</dd>
            </dl>
            <dl>
                <dt>x</dt>
                <dd>{x}</dd>
            </dl>
            <dl>
                <dt>y</dt>
                <dd>{y}</dd>
            </dl>
            <div
                style={{
                    position: 'relative',
                    width: '10px',
                    height: '10px',
                    top: `${y}px`,
                    left: `${x}px`,
                    backgroundColor: 'red',
                }}
            ></div>
        </div>
    );
};
