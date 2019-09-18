import React, { useState, useEffect } from 'react';
import generateMaze from 'generate-maze';

const cellSize = 100;
const ballSize = 40;

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
    const [{ x, y }, setCoord] = useState({ x: 0, y: 0 });
    const [maze, setMaze] = useState(generateMaze(width / 100, height / 100));

    useEffect(() => {
        setCoord(
            getPositionFromAcceleration(
                x,
                y,
                xAcceleration,
                yAcceleration,
                width - ballSize,
                height - ballSize,
            ),
        );
    }, [xAcceleration, yAcceleration]);

    return (
        <div style={{ width, height, position: 'absolute' }}>
            {maze.map(row =>
                row.map(({ x, y, top, left, bottom, right }) => {
                    return (
                        <div
                            key={`${x}-${y}`}
                            style={{
                                position: 'absolute',
                                top: y * cellSize,
                                left: x * cellSize,
                                width: cellSize,
                                height: cellSize,
                                borderTop: top ? '2px black solid' : 'none',
                                borderLeft: left ? '2px black solid' : 'none',
                                borderBottom: bottom ? '2px black solid' : 'none',
                                borderRight: right ? '2px black solid' : 'none',
                                boxSizing: 'border-box',
                            }}
                        />
                    );
                }),
            )}
            <div
                style={{
                    position: 'relative',
                    width: ballSize,
                    height: ballSize,
                    top: `${y}px`,
                    left: `${x}px`,
                    backgroundColor: 'red',
                    borderRadius: ballSize,
                }}
            ></div>
        </div>
    );
};
