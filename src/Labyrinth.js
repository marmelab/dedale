import React from 'react';

const cellSize = 100;
const ballSize = 40;

export default ({
    width,
    height,
    maze,
    x,
    y,
    goal,
    holes,
}) => {
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
            {holes.map(hole => {
                return (
                    <div
                        key={`${hole.x}-${hole.y}`}
                        style={{
                            position: 'absolute',
                            width: ballSize + 10,
                            height: ballSize + 10,
                            left: hole.x * cellSize + 25,
                            top: hole.y * cellSize + 25,
                            backgroundColor: 'black',
                            borderRadius: ballSize,
                        }}
                    ></div>
                );
            })}
            <div
                style={{
                    position: 'absolute',
                    width: ballSize + 10,
                    height: ballSize + 10,
                    left: goal.x * cellSize + 25,
                    top: goal.y * cellSize + 25,
                    backgroundColor: 'green',
                    borderRadius: ballSize + 10,
                }}
            ></div>
        </div>
    );
};
