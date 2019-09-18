import React, { useState, useEffect } from 'react';
import generateMaze from 'generate-maze';
import { range } from 'ramda';

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

const getCell = (x, y, maze) => {
    const mazeX = Math.floor(x / cellSize);
    const mazeY = Math.floor(y / cellSize);

    try {
        return maze[mazeY][mazeX];
    } catch (e) {
        return null;
    }
};

const getX = (cell, nextCell, nextX) => {
    if (cell.x === nextCell.x) {
        return nextX;
    }
    if (nextCell.x > cell.x) {
        // move to right cell
        if (cell.right) {
            // cannot pass
            return cell.x * 100 + 60;
        }
    }
    if (nextCell.x < cell.x) {
        // move to left cell
        if (cell.left) {
            // cannot pass
            return cell.x * 100;
        }
    }
    return nextX;
};

const getY = (cell, nextCell, nextY) => {
    if (cell.y === nextCell.y) {
        return nextY;
    }
    if (nextCell.y > cell.y) {
        // move to bottom cell
        if (cell.bottom) {
            // cannot pass
            return cell.y * 100 + 60;
        }
    }
    if (nextCell.y < cell.y) {
        // move to top cell
        if (cell.top) {
            // cannot pass
            return cell.y * 100;
        }
    }
    return nextY;
};

const getPositionFromAcceleration = (
    prevX,
    prevY,
    xAcceleration = 0,
    yAcceleration = 0,
    maxX,
    maxY,
    maze,
) => {
    const nextX = boundary(prevX + xAcceleration, 0, maxX);
    const nextY = boundary(prevY + yAcceleration, 0, maxY);

    const cell = getCell(prevX, prevY, maze);
    const nextCell = getCell(
        nextX > prevX ? nextX + 40 : nextX,
        nextY > prevY ? nextY + 40 : nextY,
        maze,
    );
    if (!nextCell) {
        return {
            x: nextX,
            y: nextY,
        };
    }

    return {
        x: getX(cell, nextCell, nextX),
        y: getY(cell, nextCell, nextY),
    };
};

const getRandomCell = (maze, except) => {
    const randomX = Math.floor(Math.random() * maze[0].length);
    const randomY = Math.floor(Math.random() * maze[0].length);

    if (except.find(({ x, y }) => x === randomX && y === randomY)) {
        return getRandomCell(maze, except);
    }

    return {
        x: randomX,
        y: randomY,
    };
};

const getHoles = (maze, quantity, except) => {
    return range(0, quantity).reduce(acc => [...acc, getRandomCell(maze, [except, ...acc])], []);
};

export default ({ xAcceleration, yAcceleration, width, height }) => {
    const [{ x, y }, setCoord] = useState({ x: 0, y: 0 });
    const [maze, setMaze] = useState(generateMaze(width / 100, height / 100));
    const [goal, setGoal] = useState(getRandomCell(maze, [{ x, y }]));
    const [holes, setHoles] = useState(getHoles(maze, 10, [{ x, y }, goal]));
    const [level, setLevel] = useState(0);
    const [lost, setLost] = useState(false);

    useEffect(() => {
        setCoord(
            getPositionFromAcceleration(
                x,
                y,
                xAcceleration,
                yAcceleration,
                width - ballSize,
                height - ballSize,
                maze,
            ),
        );
    }, [xAcceleration, yAcceleration]);

    useEffect(() => {
        if (
            x <= goal.x * cellSize + 90 &&
            x >= goal.x * cellSize + 10 &&
            y <= goal.y * cellSize + 90 &&
            y >= goal.y * cellSize + 10
        ) {
            setMaze(generateMaze(width / 100, height / 100));
            const newGoal = getRandomCell(maze, [{ x, y }]);
            setGoal(newGoal);
            setHoles(getHoles(maze, 10, [{ x, y }, newGoal]));
            setLevel(v => v + 1);
        }
    });

    useEffect(() => {
        if (
            holes.find(hole => {
                return (
                    x <= hole.x * cellSize + 60 &&
                    x >= hole.x * cellSize + 40 &&
                    y <= hole.y * cellSize + 60 &&
                    y >= hole.y * cellSize + 40
                );
            })
        ) {
            setLost(true);
        }
    });

    if (lost) {
        return (
            <div>
                <p>You lost after {level} level</p>;
            </div>
        );
    }

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
            <div
                style={{
                    position: 'absolute',
                    width: ballSize * 2,
                    height: ballSize * 2,
                    left: goal.x * cellSize + 10,
                    top: goal.y * cellSize + 10,
                    backgroundColor: 'green',
                    borderRadius: ballSize * 2,
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
                    right: -120,
                    top: 0,
                }}
            >
                Level: {level}
            </div>
        </div>
    );
};
